#!/usr/bin/env python3
"""Extrai a "Listagem de Empenhos" (Fiorilli) de PDF para JSON.

O relatório é de largura fixa: nomes de fornecedor longos invadem as colunas
de valor e às vezes grudam no primeiro número ("...LTDA33.012,00"), de modo que
a camada de texto não pode ser lida por colunas. Por isso trabalhamos sobre as
caixas de cada palavra (pdftotext -bbox): valores monetários são atribuídos a
uma coluna pela borda direita, o restante pela borda esquerda.

A extração só é dada por boa se as sete colunas somadas baterem com a linha
"Total:" impressa no próprio relatório.

Uso:
    python3 extrair_empenhos.py relatorio.pdf [-o empenhos.json]
"""
from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
import tempfile
from decimal import Decimal
from pathlib import Path

MOEDA = re.compile(r"^\d{1,3}(?:\.\d{3})*,\d{2}$")
GRUDADO = re.compile(r"^(.*?[A-Za-z.])(\d{1,3}(?:\.\d{3})*,\d{2})$")
PALAVRA = re.compile(
    r'<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">(.*?)</word>'
)

Y_TOPO, Y_BASE = 138.0, 545.0          # faixa dos dados: exclui cabeçalho e rodapé
COLUNAS = [
    ("empenhado", 516.5), ("reforcado", 559.4), ("anulado", 603.1),
    ("liquidado", 690.7), ("a_liquidar", 736.7), ("pago", 781.0), ("a_pagar", 825.0),
]
CAMPOS = {                              # borda esquerda de cada coluna de texto
    "tipo": (50, 70), "data": (70, 112), "ficha": (112, 133), "vinc_fonte": (133, 190),
    "ent": (190, 212), "unid_orc": (212, 240), "funcional": (240, 314), "categoria": (314, 353),
}
X_FORNECEDOR = 353.0


def desescapa(s: str) -> str:
    for a, b in (("&amp;", "&"), ("&lt;", "<"), ("&gt;", ">"),
                 ("&quot;", '"'), ("&#39;", "'"), ("&apos;", "'")):
        s = s.replace(a, b)
    return s


def dec(s: str) -> Decimal:
    return Decimal(s.replace(".", "").replace(",", "."))


def br(d: Decimal) -> str:
    return f"{d:,.2f}".replace(",", "\x00").replace(".", ",").replace("\x00", ".")


def paginas_bbox(pdf: Path) -> list[str]:
    with tempfile.TemporaryDirectory() as tmp:
        saida = Path(tmp) / "palavras.xml"
        subprocess.run(["pdftotext", "-bbox", str(pdf), str(saida)], check=True)
        return saida.read_text(encoding="utf-8").split("<page ")[1:]


def cabecalho(paginas: list[str]) -> dict:
    """Identificação do órgão e do relatório, lida do topo da primeira página."""
    linhas: dict[float, list[tuple[float, str]]] = {}
    for a, b, c, d, t in PALAVRA.findall(paginas[0]):
        y = float(b)
        if y < Y_TOPO:
            linhas.setdefault(round(y, 1), []).append((float(a), desescapa(t)))
    texto = [" ".join(t for _, t in sorted(v)) for _, v in sorted(linhas.items())]
    junto = "\n".join(texto)

    def busca(padrao, grupo=1, onde=junto):
        m = re.search(padrao, onde)
        return m.group(grupo).strip() if m else ""

    rodape = ""
    for a, b, c, d, t in PALAVRA.findall(paginas[0]):
        if float(b) > Y_BASE:
            rodape += " " + desescapa(t)
    return {
        "orgao": texto[0].strip() if texto else "",
        "endereco": texto[1].strip() if len(texto) > 1 else "",
        "cnpj": busca(r"(\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2})"),
        "exercicio": busca(r"Exerc[ií]cio:\s*(\d{4})"),
        "situacao": busca(r"SITUA[ÇC][ÃA]O EM:\s*(\d{2}/\d{2}/\d{4})"),
        "emissao": busca(r"(\d{2}/\d{2}/\d{4} \d{2}:\d{2})", onde=rodape),
    }


def palavras(paginas: list[str]) -> list[tuple]:
    cruas = []
    for npag, pag in enumerate(paginas, 1):
        for a, b, c, d, t in PALAVRA.findall(pag):
            y = float(b)
            if Y_TOPO <= y <= Y_BASE:
                cruas.append((npag, y, float(a), float(c), desescapa(t)))
    saida = []
    for npag, y, x0, x1, t in cruas:
        m = GRUDADO.match(t)
        if m and not MOEDA.fullmatch(t):     # "NOME123,45" -> nome + valor
            saida.append((npag, y, x0, x0, m.group(1)))
            saida.append((npag, y, x1, x1, m.group(2)))
        else:
            saida.append((npag, y, x0, x1, t))
    saida.sort(key=lambda w: (w[0], round(w[1], 1), w[2]))
    return saida


def coluna_de(x1: float) -> tuple[str, float]:
    melhor, dist = "", 99.0
    for nome, borda in COLUNAS:
        d = abs(x1 - borda)
        if d < dist:
            melhor, dist = nome, d
    return melhor, dist


def separa(ws: list[tuple]) -> tuple[list[dict], dict, list]:
    problemas: list = []
    # Os valores do total ficam uma fração acima do rótulo "Total:" e cairiam
    # no último empenho; a faixa inteira é reservada antes de qualquer outra coisa.
    pos_total = next(((p, y) for p, y, x0, x1, t in ws if t == "Total:"), None)
    total = {"emp": "TOTAL", "palavras": []} if pos_total else None

    registros: list[dict] = []
    atual = None
    for npag, y, x0, x1, t in ws:
        if pos_total and npag == pos_total[0] and abs(y - pos_total[1]) <= 5:
            if t != "Total:":
                total["palavras"].append((y, x0, x1, t))
            continue
        if x0 < 50 and re.fullmatch(r"\d{5}", t):
            atual = {"emp": t, "palavras": []}
            registros.append(atual)
            continue
        if atual is not None:
            atual["palavras"].append((y, x0, x1, t))

    linhas, totais = [], {}
    for r in registros + ([total] if total else []):
        valores, texto = {}, []
        for y, x0, x1, t in r["palavras"]:
            if MOEDA.fullmatch(t):
                col, d = coluna_de(x1)
                if d > 9:
                    problemas.append((r["emp"], "valor sem coluna", t, x1))
                elif col in valores:
                    problemas.append((r["emp"], "coluna repetida", col, t))
                else:
                    valores[col] = t
            else:
                texto.append((y, x0, t))
        if r["emp"] == "TOTAL":
            totais = valores
            continue

        def pega(campo, padrao=None):
            lo, hi = CAMPOS[campo]
            c = [t for y, x0, t in texto
                 if lo <= x0 < hi and (padrao is None or re.fullmatch(padrao, t))]
            return c[0] if c else ""

        # vínculo (sempre 005.NNN) e fonte às vezes saem como uma palavra só
        vf = [t for y, x0, t in sorted(texto) if CAMPOS["vinc_fonte"][0] <= x0 < CAMPOS["vinc_fonte"][1]]
        if len(vf) == 1 and len(vf[0]) > 7:
            vinc, fonte = vf[0][:7], vf[0][7:]
        elif len(vf) >= 2:
            vinc, fonte = vf[0], vf[1]
        else:
            vinc, fonte = (vf[0] if vf else ""), ""

        forn = " ".join(t for y, x0, t in sorted(texto) if x0 >= X_FORNECEDOR)
        linhas.append({
            "emp": r["emp"], "tipo": pega("tipo", r"[A-Z]{2}"),
            "data": pega("data", r"\d{2}/\d{2}/\d{4}"), "ficha": pega("ficha", r"\d{3,4}"),
            "vinculo": vinc, "fonte": fonte, "ent": pega("ent", r"\d{3}"),
            "unid_orc": pega("unid_orc", r"\d{6}"), "funcional": pega("funcional", r"[\d.]{15,}"),
            "categoria": pega("categoria", r"[\d.]{10,}"),
            "fornecedor": re.sub(r"\s+", " ", forn).strip(),
            **{c: valores.get(c, "0,00") for c, _ in COLUNAS},
        })
    return linhas, totais, problemas


def confere(linhas: list[dict], totais: dict) -> list[str]:
    """Só aceita a extração se ela fechar com os totais impressos."""
    falhas = []
    somas = {c: Decimal(0) for c, _ in COLUNAS}
    for r in linhas:
        v = lambda k: dec(r[k])
        for c, _ in COLUNAS:
            somas[c] += v(c)
        if v("empenhado") + v("reforcado") - v("anulado") - v("liquidado") != v("a_liquidar"):
            falhas.append(f"empenho {r['emp']}: à liquidar não fecha")
        if v("empenhado") + v("reforcado") - v("anulado") - v("pago") != v("a_pagar"):
            falhas.append(f"empenho {r['emp']}: à pagar não fecha")
        for campo in ("tipo", "data", "ficha", "vinculo", "fonte", "unid_orc",
                      "funcional", "categoria", "fornecedor"):
            if not r[campo]:
                falhas.append(f"empenho {r['emp']}: campo '{campo}' vazio")
    if not totais:
        falhas.append('linha "Total:" não encontrada no relatório')
    for c, _ in COLUNAS:
        impresso = dec(totais.get(c, "0,00"))
        if somas[c] != impresso:
            falhas.append(f"coluna {c}: somou {br(somas[c])}, relatório diz {br(impresso)}")
    return falhas


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("pdf", type=Path, help="relatório Listagem de Empenhos em PDF")
    ap.add_argument("-o", "--saida", type=Path, default=Path("empenhos.json"))
    args = ap.parse_args()

    if not args.pdf.is_file():
        print(f"arquivo não encontrado: {args.pdf}", file=sys.stderr)
        return 2

    paginas = paginas_bbox(args.pdf)
    linhas, totais, problemas = separa(palavras(paginas))
    falhas = confere(linhas, totais)

    for p in problemas:
        print("  aviso:", p, file=sys.stderr)
    if falhas:
        print(f"\nExtração recusada — {len(falhas)} inconsistência(s):", file=sys.stderr)
        for f in falhas[:20]:
            print("  -", f, file=sys.stderr)
        print("\nO layout do relatório provavelmente mudou. Confira as bordas de "
              "coluna em COLUNAS/CAMPOS antes de usar o resultado.", file=sys.stderr)
        return 1

    args.saida.write_text(json.dumps(
        {"cabecalho": cabecalho(paginas), "totais": totais, "empenhos": linhas},
        ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"{len(linhas)} empenhos extraídos e conferidos com os totais do relatório.")
    print(f"saldo a liquidar: {br(dec(totais['a_liquidar']))}")
    print(f"gravado em {args.saida}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

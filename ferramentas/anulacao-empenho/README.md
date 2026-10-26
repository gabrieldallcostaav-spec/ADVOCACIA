# Acompanhamento de anulação de empenhos

Ferramenta de apoio à execução orçamentária e financeira: lê o relatório
**Listagem de Empenhos** (sistema Fiorilli, situação "consumo a liquidar") e monta
a planilha de acompanhamento usada para decidir, em conjunto, quais empenhos
antigos ou com sobra de saldo serão anulados.

Não faz parte do site. Nada aqui é importado pelo Next.js nem vai para o build.

## Por que não é só abrir o PDF numa planilha

O relatório é de largura fixa e nomes de fornecedor longos invadem as colunas de
valor — às vezes colando no primeiro número, como em `...LTDA33.012,00`. Lido por
colunas, o resultado sai torto e silenciosamente errado. O extrator trabalha
sobre as coordenadas de cada palavra: valores monetários são atribuídos a uma
coluna pela borda direita, o restante pela borda esquerda.

A extração **só é aceita se fechar com a linha `Total:` impressa no relatório**,
nas sete colunas, e se cada empenho satisfizer
`empenhado + reforçado − anulado − liquidado = à liquidar`. Se o layout do
relatório mudar, o programa recusa a extração em vez de entregar número errado.

## Uso

Requer `pdftotext` (poppler-utils) e `openpyxl`.

```bash
python3 extrair_empenhos.py Consumo_a_Liquidar.pdf -o empenhos.json
python3 gerar_planilha_xlsx.py empenhos.json -o planilha_anulacao.xlsx
```

A data base da idade é a emissão do relatório; use `--referencia DD/MM/AAAA`
para fixar outra.

## O que a planilha traz

A aba **Empenhos** tem os dados do relatório à esquerda e, à direita e em
destaque, as colunas que a equipe preenche: decisão, valor a anular, setor
responsável, justificativa, processo e situação. Decisão, setor e situação são
listas de escolha; o valor a anular é validado contra o saldo da própria linha.
A aba **Resumo** totaliza por prioridade, execução, idade e fonte de recurso.

## Critérios aplicados

| Campo | Regra |
| --- | --- |
| **Saldo a anular** | Coluna `À Liquidar` do relatório: `empenhado + reforçado − anulado − liquidado`. |
| **Execução** | `Sem execução` quando nada foi liquidado; senão `Sobra de saldo`. |
| **Prioridade** | `Alta`: sem execução há mais de 90 dias. `Média`: demais com mais de 60 dias. `Baixa`: até 60 dias. |

Só o saldo a liquidar pode ser anulado. O que já foi liquidado constitui direito
do credor e, se ainda não pago, segue como obrigação a pagar — não entra na
anulação. A prioridade é uma ordenação de trabalho, não uma decisão: quem decide
é a equipe, caso a caso.

Vínculo e fonte são reproduzidos exatamente como no relatório, sem
interpretação. A leitura do código — recurso do exercício ou de exercícios
anteriores, vinculação, convênio — e seus efeitos sobre a anulação ficam com a
equipe.

## Dados ficam fora do repositório

Este repositório é **público**. Os relatórios e tudo o que deles se extrai —
PDF, JSON, XLSX, CSV, HTML — estão no `.gitignore` desta pasta e não devem ser
versionados aqui: o relatório traz nome de servidor e a triagem em andamento é
trabalho interno, ainda não é ato publicado. Guarde esses arquivos fora do
repositório.

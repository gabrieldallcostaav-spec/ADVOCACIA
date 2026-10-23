import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import { modoPrevia } from '@/config/site';

export type Guia = {
  slug: string;
  titulo: string;
  resumo: string;
  /** Área relacionada, quando houver. Usa o slug da área. */
  area: string | null;
  autor: string;
  revisadoPor: string | null;
  publicadoEm: string;
  atualizadoEm: string | null;
  status: 'rascunho' | 'publicado';
  /**
   * Caminho do PDF em /public. Sem arquivo, o botão de download não aparece —
   * nunca um botão que não baixa nada.
   */
  pdf: string | null;
  referencias: { titulo: string; url: string }[];
  markdown: string;
};

const DIRETORIO = path.join(process.cwd(), 'src/content/guias');

function lerFrontMatter(bruto: string): { dados: Record<string, string | string[]>; corpo: string } {
  const casa = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(bruto);
  if (!casa) return { dados: {}, corpo: bruto };

  const dados: Record<string, string | string[]> = {};
  let chaveLista: string | null = null;

  for (const linha of casa[1].split(/\r?\n/)) {
    if (!linha.trim()) continue;

    const item = /^\s+-\s+(.*)$/.exec(linha);
    if (item && chaveLista) {
      (dados[chaveLista] as string[]).push(item[1].trim());
      continue;
    }

    const par = /^([a-zA-Z_]+):\s*(.*)$/.exec(linha);
    if (!par) continue;

    const [, chave, valor] = par;
    if (valor === '') {
      chaveLista = chave;
      dados[chave] = [];
    } else {
      chaveLista = null;
      dados[chave] = valor.replace(/^["']|["']$/g, '').trim();
    }
  }

  return { dados, corpo: casa[2] };
}

function texto(valor: string | string[] | undefined, padrao = ''): string {
  return typeof valor === 'string' ? valor : padrao;
}

function carregar(): Guia[] {
  if (!fs.existsSync(DIRETORIO)) return [];

  return fs
    .readdirSync(DIRETORIO)
    .filter((arquivo) => arquivo.endsWith('.md'))
    .map((arquivo) => {
      const { dados, corpo } = lerFrontMatter(fs.readFileSync(path.join(DIRETORIO, arquivo), 'utf8'));
      const referencias = Array.isArray(dados.referencias)
        ? dados.referencias
            .map((linha) => {
              const [titulo, url] = linha.split('|').map((parte) => parte.trim());
              return { titulo, url: url ?? '' };
            })
            .filter((ref) => ref.titulo && ref.url)
        : [];

      const pdf = texto(dados.pdf);

      return {
        slug: arquivo.replace(/\.md$/, ''),
        titulo: texto(dados.titulo, 'Sem título'),
        resumo: texto(dados.resumo),
        area: texto(dados.area) || null,
        autor: texto(dados.autor),
        revisadoPor: texto(dados.revisadoPor) || null,
        publicadoEm: texto(dados.publicadoEm),
        atualizadoEm: texto(dados.atualizadoEm) || null,
        status: texto(dados.status) === 'publicado' ? 'publicado' : 'rascunho',
        // Só vira botão de download se o arquivo existir de fato.
        pdf: pdf && fs.existsSync(path.join(process.cwd(), 'public', pdf.replace(/^\//, ''))) ? pdf : null,
        referencias,
        markdown: corpo.trim(),
      } satisfies Guia;
    })
    .sort((a, b) => b.publicadoEm.localeCompare(a.publicadoEm));
}

export function guiasPublicados(): Guia[] {
  return carregar().filter((guia) => guia.status === 'publicado');
}

export function guiasVisiveis(): Guia[] {
  return modoPrevia ? carregar() : guiasPublicados();
}

export function todosOsGuias(): Guia[] {
  return carregar();
}

export function buscarGuia(slug: string): Guia | undefined {
  return guiasVisiveis().find((guia) => guia.slug === slug);
}

export function renderizarGuia(markdown: string): string {
  return marked.parse(markdown, { async: false, gfm: true, breaks: false });
}

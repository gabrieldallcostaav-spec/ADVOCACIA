import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import { modoPrevia } from '@/config/site';

export type Referencia = {
  titulo: string;
  url: string;
};

export type Artigo = {
  slug: string;
  titulo: string;
  resumo: string;
  categoria: string;
  autor: string;
  /** ISO 8601, data real de publicação. */
  publicadoEm: string;
  /** ISO 8601, só quando houve revisão efetiva. */
  atualizadoEm: string | null;
  status: 'rascunho' | 'publicado';
  referencias: Referencia[];
  markdown: string;
};

const DIRETORIO = path.join(process.cwd(), 'src/content/articles');

/** Front matter simples: `chave: valor`, listas com `- ` e `- Título | url`. */
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

function carregar(): Artigo[] {
  if (!fs.existsSync(DIRETORIO)) return [];

  return fs
    .readdirSync(DIRETORIO)
    .filter((arquivo) => arquivo.endsWith('.md'))
    .map((arquivo) => {
      const { dados, corpo } = lerFrontMatter(fs.readFileSync(path.join(DIRETORIO, arquivo), 'utf8'));
      const referencias = Array.isArray(dados.referencias)
        ? dados.referencias.map((linha) => {
            const [titulo, url] = linha.split('|').map((parte) => parte.trim());
            return { titulo, url: url ?? '' };
          })
        : [];

      return {
        slug: arquivo.replace(/\.md$/, ''),
        titulo: texto(dados.titulo, 'Sem título'),
        resumo: texto(dados.resumo),
        categoria: texto(dados.categoria, 'Geral'),
        autor: texto(dados.autor),
        publicadoEm: texto(dados.publicadoEm),
        atualizadoEm: texto(dados.atualizadoEm) || null,
        status: texto(dados.status) === 'publicado' ? 'publicado' : 'rascunho',
        referencias: referencias.filter((ref) => ref.titulo && ref.url),
        markdown: corpo.trim(),
      } satisfies Artigo;
    })
    .sort((a, b) => b.publicadoEm.localeCompare(a.publicadoEm));
}

/** Artigos realmente publicados — os únicos que vão ao ar em produção. */
export function artigosPublicados(): Artigo[] {
  return carregar().filter((artigo) => artigo.status === 'publicado');
}

/**
 * O que a rota deve mostrar: em produção, somente publicados. Em prévia,
 * também os rascunhos, sempre identificados na interface.
 */
export function artigosVisiveis(): Artigo[] {
  return modoPrevia ? carregar() : artigosPublicados();
}

/**
 * Todos os arquivos, publicados ou não.
 *
 * Usado só pelo build estático: `output: 'export'` exige que
 * `generateStaticParams` devolva ao menos uma rota. Quando não há nada
 * publicado, a rota é gerada mesmo assim e a página responde 404 — que é
 * exatamente o comportamento desejado para um rascunho.
 */
export function todosOsArtigos(): Artigo[] {
  return carregar();
}

export function buscarArtigo(slug: string): Artigo | undefined {
  return artigosVisiveis().find((artigo) => artigo.slug === slug);
}

export function renderizarMarkdown(markdown: string): string {
  return marked.parse(markdown, { async: false, gfm: true, breaks: false });
}

export function formatarData(iso: string): string {
  if (!iso) return '';
  const data = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(data.getTime())) return '';
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(data);
}

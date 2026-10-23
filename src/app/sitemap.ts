import type { MetadataRoute } from 'next';
import { areasPublicadas } from '@/content/areas';
import { artigosPublicados } from '@/lib/articles';
import { guiasPublicados } from '@/lib/guias';
import { revisoes } from '@/content/revisoes';
import { modoPrevia } from '@/config/site';
import { url } from '@/lib/seo';

/**
 * Somente URLs públicas, canônicas e com conteúdo aprovado.
 * Rascunhos ficam de fora, e a prévia não publica sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (modoPrevia) return [];

  const artigos = artigosPublicados();
  const guias = guiasPublicados();
  const caminhos: string[] = ['/', '/sobre', '/contato', '/cartao', '/canais-oficiais', '/privacidade'];

  if (areasPublicadas.length > 0) {
    caminhos.push('/atuacao', ...areasPublicadas.map((area) => `/atuacao/${area.slug}`));
  }
  if (artigos.length > 0) {
    caminhos.push('/conteudos');
  }
  if (guias.length > 0) {
    caminhos.push('/guias');
  }

  const paginas = caminhos.map((caminho) => ({
    url: url(caminho),
    lastModified: revisoes[caminho] ?? revisoes['/'],
    changeFrequency: (caminho === '/' ? 'monthly' : 'yearly') as 'monthly' | 'yearly',
    priority: caminho === '/' ? 1 : 0.7,
  }));

  const publicacoes = artigos.map((artigo) => ({
    url: url(`/conteudos/${artigo.slug}`),
    lastModified: artigo.atualizadoEm ?? artigo.publicadoEm,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  const materiais = guias.map((guia) => ({
    url: url(`/guias/${guia.slug}`),
    lastModified: guia.atualizadoEm ?? guia.publicadoEm,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...paginas, ...publicacoes, ...materiais];
}

// Necessário para o build estático (`output: 'export'`).
export const dynamic = 'force-static';

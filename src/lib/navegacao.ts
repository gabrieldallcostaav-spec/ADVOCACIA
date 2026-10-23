import { areasPublicadas } from '@/content/areas';
import { artigosVisiveis } from '@/lib/articles';
import type { ItemNavegacao } from '@/components/layout/SiteHeader';

/** A navegação só mostra seções que existem de fato. */
export function navegacaoPrincipal(): ItemNavegacao[] {
  const itens: ItemNavegacao[] = [{ href: '/sobre', rotulo: 'Sobre' }];

  if (areasPublicadas.length > 0) itens.push({ href: '/atuacao', rotulo: 'Atuação' });
  if (artigosVisiveis().length > 0) itens.push({ href: '/conteudos', rotulo: 'Conteúdos' });

  return itens;
}

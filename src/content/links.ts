import { areasPublicadas } from '@/content/areas';
import { artigosPublicados } from '@/lib/articles';
import { guiasPublicados } from '@/lib/guias';
import { site } from '@/config/site';

/**
 * Página /links — a entrada curta usada em redes sociais, dentro do próprio
 * domínio da advocacia.
 *
 * A ordem abaixo é a ordem exibida: para destacar outra coisa, mova a entrada.
 * Nada aparece sem destino real — links vazios não entram.
 */
export type ItemDeLink = {
  rotulo: string;
  descricao: string;
  href: string;
  externo?: boolean;
  /** Linha de destaque acima do rótulo. */
  destaque?: string;
};

export function itensDeLink(): ItemDeLink[] {
  const itens: ItemDeLink[] = [];

  if (site.whatsapp) {
    itens.push({
      rotulo: 'Falar pelo WhatsApp',
      descricao: 'Informações sobre o atendimento.',
      href: '/contato',
    });
  }

  if (areasPublicadas.length > 0) {
    itens.push({
      rotulo: 'Áreas de atuação',
      descricao: `${areasPublicadas.length} frentes atendidas diretamente em ${site.cidadeBase}.`,
      href: '/atuacao',
    });
  }

  itens.push({
    rotulo: 'Perfil profissional',
    descricao: `${site.nomeCompleto} · ${site.oab}.`,
    href: '/sobre',
  });

  // Destaque editorial: o texto mais recente, quando houver publicação.
  const ultimoArtigo = artigosPublicados()[0];
  if (ultimoArtigo) {
    itens.push({
      destaque: 'Publicação recente',
      rotulo: ultimoArtigo.titulo,
      descricao: ultimoArtigo.resumo,
      href: `/conteudos/${ultimoArtigo.slug}`,
    });
  }

  if (guiasPublicados().length > 0) {
    itens.push({
      rotulo: 'Guias práticos',
      descricao: 'Materiais para ler antes de uma consulta.',
      href: '/guias',
    });
  }

  itens.push({
    rotulo: 'Canais oficiais',
    descricao: 'Como confirmar que uma mensagem é mesmo do escritório.',
    href: '/canais-oficiais',
  });

  itens.push({
    rotulo: 'Cartão profissional',
    descricao: 'Salvar o contato no celular.',
    href: '/cartao',
  });

  // Redes sociais confirmadas entram ao final, se houver.
  for (const rede of site.redes) {
    itens.push({
      rotulo: rede.nome,
      descricao: 'Perfil profissional.',
      href: rede.url,
      externo: true,
    });
  }

  return itens;
}

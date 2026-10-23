import type { Metadata } from 'next';
import { modoPrevia, site } from '@/config/site';
import { areasPublicadas } from '@/content/areas';

export const urlBase = site.dominio.replace(/\/$/, '');

export function url(caminho = '/'): string {
  return `${urlBase}${caminho === '/' ? '' : caminho}`;
}

type DadosPagina = {
  titulo: string;
  descricao: string;
  caminho: string;
};

export function metadadosDaPagina({ titulo, descricao, caminho }: DadosPagina): Metadata {
  return {
    title: titulo,
    description: descricao,
    alternates: { canonical: url(caminho) },
    openGraph: {
      title: titulo,
      description: descricao,
      url: url(caminho),
      siteName: site.marca,
      locale: 'pt_BR',
      type: 'website',
      images: [
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: `${site.marca} — ${site.nomeCompleto}, ${site.oab}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titulo,
      description: descricao,
      images: ['/opengraph-image.png'],
    },
  };
}

/**
 * JSON-LD. Só entram fatos confirmados: nome, inscrição, cidade e as áreas
 * efetivamente publicadas. Sem avaliações, prêmios ou número de clientes.
 */
export function dadosEstruturadosDoSite() {
  const pessoa: Record<string, unknown> = {
    '@type': 'Person',
    '@id': url('/#pessoa'),
    name: site.nomeCompleto,
    alternateName: site.nomeApresentacao,
    jobTitle: 'Advogado',
    identifier: site.oab,
    url: url('/sobre'),
    worksFor: { '@id': url('/#advocacia') },
  };

  const servico: Record<string, unknown> = {
    '@type': 'LegalService',
    '@id': url('/#advocacia'),
    name: site.marca,
    url: url('/'),
    areaServed: { '@type': 'City', name: `${site.cidadeBase}, ${site.uf}` },
    founder: { '@id': url('/#pessoa') },
    knowsAbout: areasPublicadas.map((area) => area.titulo),
  };

  if (site.email) servico.email = site.email;
  if (site.telefone) servico.telephone = site.telefone;
  if (site.redes.length > 0) servico.sameAs = site.redes.map((rede) => rede.url);

  if (site.endereco) {
    servico.address = {
      '@type': 'PostalAddress',
      streetAddress: site.endereco.logradouro,
      addressLocality: site.endereco.cidade,
      addressRegion: site.endereco.uf,
      postalCode: site.endereco.cep,
      addressCountry: 'BR',
    };
  }

  if (site.horarios) servico.openingHours = site.horarios;

  return {
    '@context': 'https://schema.org',
    '@graph': [pessoa, servico],
  };
}

export function migalhas(itens: { nome: string; caminho: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itens.map((item, indice) => ({
      '@type': 'ListItem',
      position: indice + 1,
      name: item.nome,
      item: url(item.caminho),
    })),
  };
}

export function JsonLd({ dados }: { dados: unknown }) {
  return (
    <script
      type="application/ld+json"
      // Conteúdo próprio e estático; nenhum dado de visitante entra aqui.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, '\\u003c') }}
    />
  );
}

/** Em prévia o site inteiro é noindex; em produção, indexável. */
export const robosDaPagina = modoPrevia
  ? { index: false, follow: false }
  : { index: true, follow: true };

import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { AvisoPrevia } from '@/components/layout/AvisoPrevia';
import { navegacaoPrincipal } from '@/lib/navegacao';
import { JsonLd, dadosEstruturadosDoSite, robosDaPagina, urlBase } from '@/lib/seo';
import { site } from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(urlBase),
  title: {
    default: `Advocacia em ${site.cidadeBase} | ${site.nomeApresentacao}`,
    template: `%s | ${site.marca}`,
  },
  description: `Advocacia em ${site.cidadeBase}/${site.uf}. ${site.nomeCompleto}, ${site.oab}. Atuação com análise individual de cada caso e comunicação direta.`,
  applicationName: site.marca,
  authors: [{ name: site.nomeCompleto }],
  creator: site.nomeCompleto,
  robots: robosDaPagina,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: site.marca,
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: site.marca }],
  },
  twitter: { card: 'summary_large_image', images: ['/opengraph-image.png'] },
  icons: {
    icon: [{ url: '/icone.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#f6f5f1',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="/fonts/playfair-display-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-dvh overflow-x-hidden antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-verde focus:px-5 focus:py-3 focus:text-papel"
        >
          Pular para o conteúdo
        </a>
        <AvisoPrevia />
        <SiteHeader navegacao={navegacaoPrincipal()} />
        <main id="conteudo">{children}</main>
        <SiteFooter />
        <JsonLd dados={dadosEstruturadosDoSite()} />
      </body>
    </html>
  );
}

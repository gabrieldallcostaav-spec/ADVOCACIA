import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Botao } from '@/components/ui/Botao';
import { Secao } from '@/components/ui/Secao';
import { SeloModelo } from '@/components/ui/Selo';
import { BlocoContato } from '@/components/sections/BlocoContato';
import { JsonLd, metadadosDaPagina, migalhas, url } from '@/lib/seo';
import {
  artigosPublicados,
  artigosVisiveis,
  buscarArtigo,
  formatarData,
  renderizarMarkdown,
} from '@/lib/articles';
import { site } from '@/config/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return artigosVisiveis().map((artigo) => ({ slug: artigo.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artigo = buscarArtigo(slug);
  if (!artigo) return {};

  const base = metadadosDaPagina({
    titulo: artigo.titulo,
    descricao: artigo.resumo,
    caminho: `/conteudos/${artigo.slug}`,
  });

  // Rascunho nunca entra no índice, mesmo em um ambiente indexável.
  return artigo.status === 'rascunho' ? { ...base, robots: { index: false, follow: false } } : base;
}

export default async function PaginaArtigo({ params }: Props) {
  const { slug } = await params;
  const artigo = buscarArtigo(slug);
  if (!artigo) notFound();

  const html = renderizarMarkdown(artigo.markdown);
  const outros = artigosVisiveis().filter((item) => item.slug !== artigo.slug).slice(0, 3);
  const ehPublicado = artigosPublicados().some((item) => item.slug === artigo.slug);

  return (
    <>
      <Secao>
        <div className="mx-auto max-w-leitura">
          <nav aria-label="Trilha de navegação" className="capitular text-tinta-tenue">
            <Link href="/" className="transition-colors hover:text-verde">
              Início
            </Link>
            <span aria-hidden className="mx-2">·</span>
            <Link href="/conteudos" className="transition-colors hover:text-verde">
              Conteúdos
            </Link>
          </nav>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <span className="capitular text-verde">{artigo.categoria}</span>
            {!ehPublicado ? <SeloModelo /> : null}
          </div>

          <h1 className="mt-5 text-[clamp(2rem,1.4rem+2.6vw,3.25rem)]">{artigo.titulo}</h1>
          <p className="mt-6 max-w-[54ch] text-[1.0625rem] leading-relaxed text-tinta-suave">{artigo.resumo}</p>

          <p className="mt-8 border-t border-linha pt-6 text-nota text-tinta-tenue">
            {artigo.autor} · {formatarData(artigo.publicadoEm)}
            {artigo.atualizadoEm ? ` · atualizado em ${formatarData(artigo.atualizadoEm)}` : ''}
          </p>

          <div className="prosa mt-12" dangerouslySetInnerHTML={{ __html: html }} />

          {artigo.referencias.length > 0 ? (
            <section className="mt-16 border-t border-linha pt-8">
              <h2 className="capitular font-sans text-tinta-tenue">Referências</h2>
              <ul className="mt-5 space-y-3 text-[0.9375rem]">
                {artigo.referencias.map((referencia) => (
                  <li key={referencia.url} className="flex gap-3">
                    <span aria-hidden className="mt-[0.75em] h-px w-3 shrink-0 bg-verde" />
                    <a
                      href={referencia.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-tinta-suave underline decoration-verde underline-offset-[0.3em] transition-colors hover:text-verde"
                    >
                      {referencia.titulo}
                      <span className="sr-only"> (abre em nova aba)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <p className="mt-10 rounded-2xl bg-papel-fundo p-6 text-nota text-tinta-tenue">
            Texto de caráter informativo. Não constitui orientação sobre uma situação específica, que
            depende de análise individual dos documentos e dos fatos.
          </p>

          {outros.length > 0 ? (
            <section className="mt-16 border-t border-linha pt-10">
              <h2 className="capitular font-sans text-tinta-tenue">Outros conteúdos</h2>
              <ul className="mt-6 space-y-4">
                {outros.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/conteudos/${item.slug}`}
                      className="font-display text-lg leading-snug transition-colors hover:text-verde"
                    >
                      {item.titulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="mt-10">
            <Botao href="/sobre" variante="texto">
              Perfil profissional
            </Botao>
          </div>
        </div>
      </Secao>

      <BlocoContato />

      {ehPublicado ? (
        <JsonLd
          dados={{
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: artigo.titulo,
            description: artigo.resumo,
            datePublished: artigo.publicadoEm,
            ...(artigo.atualizadoEm ? { dateModified: artigo.atualizadoEm } : {}),
            author: { '@type': 'Person', name: artigo.autor, url: url('/sobre') },
            publisher: { '@type': 'Organization', name: site.marca, url: url('/') },
            mainEntityOfPage: url(`/conteudos/${artigo.slug}`),
            inLanguage: 'pt-BR',
          }}
        />
      ) : null}

      <JsonLd
        dados={migalhas([
          { nome: 'Início', caminho: '/' },
          { nome: 'Conteúdos', caminho: '/conteudos' },
          { nome: artigo.titulo, caminho: `/conteudos/${artigo.slug}` },
        ])}
      />
    </>
  );
}

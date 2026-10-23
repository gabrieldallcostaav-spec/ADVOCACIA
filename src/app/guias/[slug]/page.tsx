import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlocoContato } from '@/components/sections/BlocoContato';
import { Botao } from '@/components/ui/Botao';
import { Migalhas } from '@/components/ui/Migalhas';
import { Secao } from '@/components/ui/Secao';
import { SeloModelo } from '@/components/ui/Selo';
import { JsonLd, metadadosDaPagina, migalhas } from '@/lib/seo';
import { formatarData } from '@/lib/articles';
import { buscarGuia, guiasPublicados, guiasVisiveis, renderizarGuia, todosOsGuias } from '@/lib/guias';
import { buscarArea } from '@/content/areas';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const visiveis = guiasVisiveis();
  // O build estático exige ao menos uma rota; sem guia publicado, a página
  // gerada responde 404 — que é o comportamento certo para um rascunho.
  const base = visiveis.length > 0 ? visiveis : todosOsGuias();
  return base.map((guia) => ({ slug: guia.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guia = buscarGuia(slug);
  if (!guia) return {};

  const base = metadadosDaPagina({
    titulo: guia.titulo,
    descricao: guia.resumo,
    caminho: `/guias/${guia.slug}`,
  });

  return guia.status === 'rascunho' ? { ...base, robots: { index: false, follow: false } } : base;
}

export default async function PaginaGuia({ params }: Props) {
  const { slug } = await params;
  const guia = buscarGuia(slug);
  if (!guia) notFound();

  const html = renderizarGuia(guia.markdown);
  const area = guia.area ? buscarArea(guia.area) : undefined;
  const ehPublicado = guiasPublicados().some((item) => item.slug === guia.slug);

  return (
    <>
      <Secao>
        <div className="mx-auto max-w-leitura">
          <Migalhas itens={[
              { rotulo: 'Início', href: '/' },
              { rotulo: 'Guias', href: '/guias' },
              { rotulo: guia.titulo },
            ]} />

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <span className="capitular text-verde">Guia</span>
            {!ehPublicado ? <SeloModelo /> : null}
          </div>

          <h1 className="mt-5 text-[clamp(2rem,1.4rem+2.6vw,3.25rem)]">{guia.titulo}</h1>
          <p className="mt-6 max-w-[54ch] text-[1.0625rem] leading-relaxed text-tinta-suave">{guia.resumo}</p>

          <p className="mt-8 border-t border-linha pt-6 text-nota text-tinta-tenue">
            {guia.autor} · {formatarData(guia.publicadoEm)}
            {guia.atualizadoEm ? ` · atualizado em ${formatarData(guia.atualizadoEm)}` : ''}
            {guia.revisadoPor ? ` · revisão de ${guia.revisadoPor}` : ''}
          </p>

          {/* O botão só existe quando o arquivo existe de fato em /public. */}
          {guia.pdf ? (
            <p className="mt-6">
              <a
                href={guia.pdf}
                download
                className="inline-flex min-h-[2.875rem] items-center gap-2 rounded-full border border-linha-forte px-6 text-[0.9375rem] transition-colors hover:border-verde hover:text-verde"
              >
                Baixar em PDF
                <span aria-hidden>↓</span>
              </a>
            </p>
          ) : null}

          <div className="prosa mt-12" dangerouslySetInnerHTML={{ __html: html }} />

          {guia.referencias.length > 0 ? (
            <section className="mt-16 border-t border-linha pt-8">
              <h2 className="capitular font-sans text-tinta-tenue">Referências</h2>
              <ul className="mt-5 space-y-3 text-[0.9375rem]">
                {guia.referencias.map((referencia) => (
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
            Material informativo e de caráter geral. Não substitui a análise individual de uma
            situação concreta.
          </p>

          <div className="mt-10 flex flex-wrap gap-6">
            {area ? (
              <Botao href={`/atuacao/${area.slug}`} variante="texto">
                {area.titulo}
              </Botao>
            ) : null}
            <Botao href="/guias" variante="texto">
              Todos os guias
            </Botao>
          </div>
        </div>
      </Secao>

      <BlocoContato />
      <JsonLd
        dados={migalhas([
          { nome: 'Início', caminho: '/' },
          { nome: 'Guias', caminho: '/guias' },
          { nome: guia.titulo, caminho: `/guias/${guia.slug}` },
        ])}
      />
    </>
  );
}

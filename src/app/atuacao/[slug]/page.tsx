import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Acordeao } from '@/components/ui/Acordeao';
import { BlocoContato } from '@/components/sections/BlocoContato';
import { Botao } from '@/components/ui/Botao';
import { BotaoWhatsapp } from '@/components/ui/BotaoWhatsapp';
import { Migalhas } from '@/components/ui/Migalhas';
import { Secao } from '@/components/ui/Secao';
import { JsonLd, metadadosDaPagina, migalhas } from '@/lib/seo';
import { areasPublicadas, buscarArea } from '@/content/areas';
import { site } from '@/config/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return areasPublicadas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = buscarArea(slug);
  if (!area) return {};

  return metadadosDaPagina({
    titulo: `${area.titulo} em ${site.cidadeBase}`,
    descricao: area.resumo,
    caminho: `/atuacao/${area.slug}`,
  });
}

export default async function PaginaArea({ params }: Props) {
  const { slug } = await params;
  const area = buscarArea(slug);
  if (!area) notFound();

  const outras = areasPublicadas.filter((item) => item.slug !== area.slug);

  return (
    <>
      <Secao>
        <Migalhas itens={[
            { rotulo: 'Início', href: '/' },
            { rotulo: 'Atuação', href: '/atuacao' },
            { rotulo: area.titulo },
          ]} />

        <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-7">
            <h1 className="text-[clamp(2.25rem,1.5rem+3vw,3.5rem)]">
              {area.titulo} em {site.cidadeBase}
            </h1>
            <p className="mt-8 max-w-[56ch] text-[1.0625rem] leading-relaxed text-tinta-suave">
              {area.descricao}
            </p>
            <div className="mt-6 max-w-[56ch] space-y-5 text-tinta-suave">
              {area.corpo.map((paragrafo) => (
                <p key={paragrafo}>{paragrafo}</p>
              ))}
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-[2rem] bg-papel-fundo p-8 md:p-10">
              <h2 className="capitular font-sans text-tinta-tenue">Situações abrangidas</h2>
              <ul className="mt-6 space-y-4 text-[0.9375rem] leading-relaxed text-tinta-suave">
                {area.situacoes.map((situacao) => (
                  <li key={situacao} className="flex gap-3">
                    <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-verde" />
                    <span>{situacao}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-7 text-[0.875rem] leading-relaxed text-tinta-tenue">
                A lista é informativa. O enquadramento de uma situação concreta depende de análise
                individual.
              </p>
              <div className="mt-7 border-t border-linha pt-7">
                <BotaoWhatsapp variante="contorno" />
              </div>
            </div>
          </div>
        </div>
      </Secao>

      {area.perguntas.length > 0 ? (
        <Secao className="bg-papel-fundo/50">
          <div className="grid gap-12 md:grid-cols-12 md:gap-14">
            <div className="md:col-span-5">
              <h2 className="text-[clamp(1.75rem,1.3rem+2vw,2.5rem)]">Perguntas frequentes</h2>
              <p className="mt-5 max-w-[40ch] text-nota text-tinta-tenue">
                Respostas de caráter geral sobre o tema desta área.
              </p>
            </div>
            <div className="md:col-span-7">
              <Acordeao itens={area.perguntas} />
            </div>
          </div>
        </Secao>
      ) : null}

      {outras.length > 0 ? (
        <Secao espacamento="compacto">
          <h2 className="capitular font-sans text-tinta-tenue">Outras áreas</h2>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {outras.map((item) => (
              <li key={item.slug}>
                <Link href={`/atuacao/${item.slug}`} className="text-[0.9375rem] transition-colors hover:text-verde">
                  {item.titulo}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Botao href="/sobre" variante="texto">
              Perfil profissional
            </Botao>
          </div>
        </Secao>
      ) : null}

      <BlocoContato />
      <JsonLd
        dados={migalhas([
          { nome: 'Início', caminho: '/' },
          { nome: 'Atuação', caminho: '/atuacao' },
          { nome: area.titulo, caminho: `/atuacao/${area.slug}` },
        ])}
      />
    </>
  );
}

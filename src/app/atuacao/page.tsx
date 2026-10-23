import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BlocoContato } from '@/components/sections/BlocoContato';
import { PorNecessidade } from '@/components/sections/PorNecessidade';
import { Secao } from '@/components/ui/Secao';
import { JsonLd, metadadosDaPagina, migalhas } from '@/lib/seo';
import { areasPublicadas, notaParcerias } from '@/content/areas';
import { site } from '@/config/site';

export const metadata: Metadata = metadadosDaPagina({
  titulo: `Áreas de atuação em ${site.cidadeBase}`,
  descricao: `Áreas atendidas por ${site.nomeApresentacao}, ${site.oab}, em ${site.cidadeBase}/${site.uf}: direito civil e contratos, família e sucessões, administrativo e consumidor.`,
  caminho: '/atuacao',
});

export default function Atuacao() {
  if (areasPublicadas.length === 0) notFound();

  return (
    <>
      <Secao>
        <nav aria-label="Trilha de navegação" className="capitular text-tinta-tenue">
          <Link href="/" className="transition-colors hover:text-verde">
            Início
          </Link>
          <span aria-hidden className="mx-2">·</span>
          <span aria-current="page">Atuação</span>
        </nav>

        <div className="mt-12 max-w-[46rem]">
          <h1 className="text-[clamp(2.25rem,1.5rem+3vw,3.75rem)]">
            Áreas de atuação em {site.cidadeBase}
          </h1>
          <p className="mt-7 max-w-[54ch] text-[1.0625rem] leading-relaxed text-tinta-suave">
            Cada área abaixo é atendida diretamente, com escopo definido antes do início do trabalho.
            As páginas explicam o alcance da atuação e as situações mais comuns.
          </p>
        </div>

        <ul className="mt-16 border-t border-linha">
          {areasPublicadas.map((area, indice) => (
            <li key={area.slug} className="border-b border-linha">
              <Link href={`/atuacao/${area.slug}`} className="group grid gap-4 py-10 md:grid-cols-12 md:gap-8">
                <span className="capitular text-verde tabular-nums md:col-span-1">
                  {String(indice + 1).padStart(2, '0')}
                </span>
                <h2 className="font-display text-[clamp(1.5rem,1.2rem+1.4vw,2.125rem)] leading-tight transition-colors group-hover:text-verde md:col-span-5">
                  {area.titulo}
                </h2>
                <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-tinta-suave md:col-span-5">
                  {area.resumo}
                </p>
                <span
                  aria-hidden
                  className="text-tinta-tenue transition-transform duration-300 group-hover:translate-x-1 group-hover:text-verde md:col-span-1 md:text-right"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-[58ch] text-nota text-tinta-tenue">{notaParcerias}</p>
      </Secao>

      <Secao className="bg-papel-fundo/50" espacamento="normal">
        <PorNecessidade />
      </Secao>

      <BlocoContato />
      <JsonLd
        dados={migalhas([
          { nome: 'Início', caminho: '/' },
          { nome: 'Atuação', caminho: '/atuacao' },
        ])}
      />
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BlocoContato } from '@/components/sections/BlocoContato';
import { Secao } from '@/components/ui/Secao';
import { SeloModelo } from '@/components/ui/Selo';
import { JsonLd, metadadosDaPagina, migalhas } from '@/lib/seo';
import { formatarData } from '@/lib/articles';
import { guiasVisiveis } from '@/lib/guias';
import { site } from '@/config/site';

export const metadata: Metadata = metadadosDaPagina({
  titulo: 'Guias práticos',
  descricao: `Materiais de leitura preparados por ${site.nomeCompleto}, ${site.oab}, sobre como se organizar antes de tratar de uma questão jurídica.`,
  caminho: '/guias',
});

export default function Guias() {
  const guias = guiasVisiveis();
  if (guias.length === 0) notFound();

  return (
    <>
      <Secao>
        <nav aria-label="Trilha de navegação" className="capitular text-tinta-tenue">
          <Link href="/" className="transition-colors hover:text-verde">
            Início
          </Link>
          <span aria-hidden className="mx-2">·</span>
          <span aria-current="page">Guias</span>
        </nav>

        <div className="mt-12 max-w-[46rem]">
          <h1 className="text-[clamp(2.25rem,1.5rem+3vw,3.75rem)]">Guias práticos</h1>
          <p className="mt-7 max-w-[54ch] text-[1.0625rem] leading-relaxed text-tinta-suave">
            Materiais curtos sobre como se preparar, o que separar e o que perguntar. Leitura livre,
            sem cadastro.
          </p>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-[2rem] bg-linha sm:grid-cols-2">
          {guias.map((guia) => (
            <li key={guia.slug} className="bg-papel">
              <Link href={`/guias/${guia.slug}`} className="group block h-full p-8 md:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="capitular text-verde">Guia</span>
                  {guia.status === 'rascunho' ? <SeloModelo /> : null}
                </div>
                <h2 className="mt-4 font-display text-[clamp(1.375rem,1.15rem+1vw,1.75rem)] font-medium leading-snug transition-colors group-hover:text-verde">
                  {guia.titulo}
                </h2>
                <p className="mt-3 max-w-[44ch] text-[0.9375rem] leading-relaxed text-tinta-suave">
                  {guia.resumo}
                </p>
                <p className="mt-5 text-nota text-tinta-tenue">
                  {formatarData(guia.publicadoEm)}
                  {guia.pdf ? ' · PDF disponível' : ''}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Secao>

      <BlocoContato />
      <JsonLd
        dados={migalhas([
          { nome: 'Início', caminho: '/' },
          { nome: 'Guias', caminho: '/guias' },
        ])}
      />
    </>
  );
}

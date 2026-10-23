import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BlocoContato } from '@/components/sections/BlocoContato';
import { Migalhas } from '@/components/ui/Migalhas';
import { Secao } from '@/components/ui/Secao';
import { SeloModelo } from '@/components/ui/Selo';
import { JsonLd, metadadosDaPagina, migalhas } from '@/lib/seo';
import { artigosVisiveis, formatarData } from '@/lib/articles';
import { site } from '@/config/site';

export const metadata: Metadata = metadadosDaPagina({
  titulo: 'Conteúdos jurídicos',
  descricao: `Textos informativos sobre procedimentos e critérios jurídicos, escritos por ${site.nomeCompleto}, ${site.oab}.`,
  caminho: '/conteudos',
});

export default function Conteudos() {
  const artigos = artigosVisiveis();
  if (artigos.length === 0) notFound();

  return (
    <>
      <Secao>
        <Migalhas itens={[{ rotulo: 'Início', href: '/' }, { rotulo: 'Conteúdos' }]} />

        <div className="mt-12 max-w-[46rem]">
          <h1 className="text-[clamp(2.25rem,1.5rem+3vw,3.75rem)]">Conteúdos jurídicos</h1>
          <p className="mt-7 max-w-[54ch] text-[1.0625rem] leading-relaxed text-tinta-suave">
            Textos informativos sobre procedimentos, documentos e critérios jurídicos. Não substituem
            a análise individual de um caso concreto.
          </p>
        </div>

        <ul className="mt-16 border-t border-linha">
          {artigos.map((artigo) => (
            <li key={artigo.slug} className="border-b border-linha">
              <Link href={`/conteudos/${artigo.slug}`} className="group grid gap-4 py-9 md:grid-cols-12 md:gap-8">
                <div className="flex flex-wrap items-center gap-3 md:col-span-3 md:block">
                  <span className="capitular text-verde">{artigo.categoria}</span>
                  <p className="text-nota text-tinta-tenue md:mt-2">{formatarData(artigo.publicadoEm)}</p>
                  {artigo.status === 'rascunho' ? (
                    <span className="md:mt-3 md:block">
                      <SeloModelo />
                    </span>
                  ) : null}
                </div>
                <div className="md:col-span-9">
                  <h2 className="font-display text-[clamp(1.375rem,1.15rem+1.2vw,1.875rem)] leading-tight transition-colors group-hover:text-verde">
                    {artigo.titulo}
                  </h2>
                  <p className="mt-3 max-w-[60ch] text-[0.9375rem] leading-relaxed text-tinta-suave">
                    {artigo.resumo}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Secao>

      <BlocoContato />
      <JsonLd
        dados={migalhas([
          { nome: 'Início', caminho: '/' },
          { nome: 'Conteúdos', caminho: '/conteudos' },
        ])}
      />
    </>
  );
}

import Link from 'next/link';
import { Botao } from '@/components/ui/Botao';
import { Secao, TituloSecao } from '@/components/ui/Secao';
import { SeloModelo } from '@/components/ui/Selo';
import { formatarData, type Artigo } from '@/lib/articles';

/**
 * Destaques editoriais: um texto maior e os seguintes em lista.
 * A seção inteira desaparece quando não há nada a exibir.
 */
export function Conteudos({ artigos }: { artigos: Artigo[] }) {
  if (artigos.length === 0) return null;

  const [destaque, ...demais] = artigos.slice(0, 3);

  return (
    <Secao>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <TituloSecao capitular="Conteúdos" descricao="Textos informativos sobre procedimentos e critérios jurídicos.">
          Para compreender
          <br className="hidden sm:block" /> antes de decidir.
        </TituloSecao>
        <Botao href="/conteudos" variante="texto">
          Ver todos os conteúdos
        </Botao>
      </div>

      <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-12">
        <article className="md:col-span-7">
          <Link href={`/conteudos/${destaque.slug}`} className="group block">
            <div className="flex flex-wrap items-center gap-4">
              <span className="capitular text-verde">{destaque.categoria}</span>
              {destaque.status === 'rascunho' ? <SeloModelo /> : null}
            </div>
            <h3 className="mt-4 font-display text-[clamp(1.5rem,1.2rem+1.6vw,2.25rem)] leading-tight transition-colors group-hover:text-verde">
              {destaque.titulo}
            </h3>
            <p className="mt-4 max-w-[52ch] text-tinta-suave">{destaque.resumo}</p>
            <p className="mt-5 text-nota text-tinta-tenue">{formatarData(destaque.publicadoEm)}</p>
          </Link>
        </article>

        {demais.length > 0 ? (
          <ul className="border-t border-linha md:col-span-5">
            {demais.map((artigo) => (
              <li key={artigo.slug} className="border-b border-linha">
                <Link href={`/conteudos/${artigo.slug}`} className="group block py-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="capitular text-verde">{artigo.categoria}</span>
                    {artigo.status === 'rascunho' ? <SeloModelo /> : null}
                  </div>
                  <h3 className="mt-3 font-display text-xl leading-snug transition-colors group-hover:text-verde">
                    {artigo.titulo}
                  </h3>
                  <p className="mt-2 text-nota text-tinta-tenue">{formatarData(artigo.publicadoEm)}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Secao>
  );
}

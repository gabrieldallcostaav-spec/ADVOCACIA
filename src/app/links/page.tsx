import type { Metadata } from 'next';
import Link from 'next/link';
import { Marca } from '@/components/ui/Marca';
import { itensDeLink } from '@/content/links';
import { JsonLd, metadadosDaPagina, migalhas } from '@/lib/seo';
import { site } from '@/config/site';

export const metadata: Metadata = {
  ...metadadosDaPagina({
    titulo: `Links — ${site.marca}`,
    descricao: `Acessos rápidos para atuação, perfil, conteúdos e contato de ${site.nomeCompleto}, ${site.oab}.`,
    caminho: '/links',
  }),
  // Página de entrada vinda de redes sociais: útil para quem clica, não para
  // a busca. Fora do índice para não concorrer com as páginas de conteúdo.
  robots: { index: false, follow: true },
};

export default function Links() {
  const itens = itensDeLink();

  return (
    <>
      <section className="px-gutter py-14 md:py-20">
        <div className="mx-auto max-w-[32rem]">
          <div className="text-center">
            <Marca versao="vertical" altura={118} className="mx-auto" />
            <p className="mt-7 text-nota text-tinta-tenue">
              {site.nomeCompleto} · {site.oab} · {site.cidadeBase}/{site.uf}
            </p>
          </div>

          <ul className="mt-10 grid gap-3">
            {itens.map((item) => {
              const conteudo = (
                <>
                  {item.destaque ? (
                    <span className="capitular block text-verde">{item.destaque}</span>
                  ) : null}
                  <span className="mt-1 flex items-center justify-between gap-4">
                    <span className="font-display text-lg font-medium leading-snug">{item.rotulo}</span>
                    <span
                      aria-hidden
                      className="shrink-0 text-tinta-tenue transition-transform duration-300 group-hover:translate-x-1 group-hover:text-verde"
                    >
                      →
                    </span>
                  </span>
                  <span className="mt-1 block text-[0.9375rem] leading-relaxed text-tinta-suave">
                    {item.descricao}
                  </span>
                </>
              );

              const classe =
                'group block rounded-[1.5rem] border border-linha bg-papel-fundo/50 px-6 py-5 transition-colors hover:border-verde/50';

              return (
                <li key={item.href + item.rotulo}>
                  {item.externo ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className={classe}>
                      {conteudo}
                      <span className="sr-only"> (abre em nova aba)</span>
                    </a>
                  ) : (
                    <Link href={item.href} className={classe}>
                      {conteudo}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <p className="mt-10 text-center text-nota text-tinta-tenue">
            <Link href="/" className="underline decoration-verde underline-offset-[0.3em] hover:text-verde">
              Ir para o site completo
            </Link>
          </p>
        </div>
      </section>

      <JsonLd
        dados={migalhas([
          { nome: 'Início', caminho: '/' },
          { nome: 'Links', caminho: '/links' },
        ])}
      />
    </>
  );
}

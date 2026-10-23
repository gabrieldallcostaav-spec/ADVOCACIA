import type { Metadata } from 'next';
import Link from 'next/link';
import { Botao } from '@/components/ui/Botao';
import { Marca } from '@/components/ui/Marca';
import { Secao } from '@/components/ui/Secao';
import { BlocoContato } from '@/components/sections/BlocoContato';
import { JsonLd, metadadosDaPagina, migalhas } from '@/lib/seo';
import { perfil } from '@/content/perfil';
import { areasPublicadas } from '@/content/areas';
import { site } from '@/config/site';

export const metadata: Metadata = metadadosDaPagina({
  titulo: `${site.nomeApresentacao} — advogado em ${site.cidadeBase}`,
  descricao: `Perfil profissional de ${site.nomeCompleto}, ${site.oab}, advogado em ${site.cidadeBase}/${site.uf}.`,
  caminho: '/sobre',
});

export default function Sobre() {
  const retrato = site.fotos.sobreRetrato ?? site.fotos.heroRetrato;

  return (
    <>
      <Secao>
        <nav aria-label="Trilha de navegação" className="capitular text-tinta-tenue">
          <Link href="/" className="transition-colors hover:text-verde">
            Início
          </Link>
          <span aria-hidden className="mx-2">·</span>
          <span aria-current="page">Perfil</span>
        </nav>

        <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-7">
            <h1 className="text-[clamp(2.25rem,1.5rem+3vw,3.75rem)]">{site.nomeApresentacao}</h1>
            <p className="mt-4 text-nota text-tinta-tenue">
              {site.nomeCompleto} · {site.oab} · {site.cidadeBase}/{site.uf}
            </p>
            <div className="mt-9 max-w-[58ch] space-y-5 text-[1.0625rem] leading-relaxed text-tinta-suave">
              {perfil.biografia.map((paragrafo) => (
                <p key={paragrafo}>{paragrafo}</p>
              ))}
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="relative aspect-[5/6] w-full max-w-[20rem] overflow-hidden rounded-[2rem] bg-papel-fundo md:max-w-none">
              {retrato ? (
                // eslint-disable-next-line @next/next/no-img-element -- retrato otimizado na origem.
                <img
                  src={retrato}
                  alt={`${site.nomeApresentacao}, advogado`}
                  width={1066}
                  height={1600}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-escuro px-10">
                  <Marca versao="vertical-branco" altura={150} className="max-w-full" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Secao>

      <Secao className="bg-papel-fundo/50">
        <h2 className="text-[clamp(1.75rem,1.3rem+2vw,2.5rem)]">Como o trabalho é conduzido</h2>
        <dl className="mt-12 grid gap-10 sm:grid-cols-2 md:gap-12">
          {perfil.comoTrabalho.map((item) => (
            <div key={item.titulo}>
              <dt className="flex items-center gap-3 font-display text-xl">
                <span aria-hidden className="h-px w-6 bg-verde" />
                {item.titulo}
              </dt>
              <dd className="mt-3 max-w-[42ch] text-[0.9375rem] leading-relaxed text-tinta-suave">
                {item.texto}
              </dd>
            </div>
          ))}
        </dl>
      </Secao>

      {areasPublicadas.length > 0 ? (
        <Secao>
          <h2 className="text-[clamp(1.75rem,1.3rem+2vw,2.5rem)]">Áreas atendidas</h2>
          <ul className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {areasPublicadas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/atuacao/${area.slug}`}
                  className="flex items-baseline gap-3 py-2 text-[1.0625rem] transition-colors hover:text-verde"
                >
                  <span aria-hidden className="h-px w-5 shrink-0 translate-y-[-0.3em] bg-verde" />
                  {area.titulo}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Botao href="/atuacao" variante="contorno">
              Ver detalhamento das áreas
            </Botao>
          </div>
        </Secao>
      ) : null}

      <BlocoContato />
      <JsonLd
        dados={migalhas([
          { nome: 'Início', caminho: '/' },
          { nome: 'Perfil', caminho: '/sobre' },
        ])}
      />
    </>
  );
}

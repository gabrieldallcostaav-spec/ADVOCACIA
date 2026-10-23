import { Botao } from '@/components/ui/Botao';
import { Secao } from '@/components/ui/Secao';
import { perfil } from '@/content/perfil';
import { site } from '@/config/site';

/**
 * Apresentação pessoal na home.
 *
 * Com retrato aprovado, a seção usa a composição em duas colunas com imagem.
 * Sem retrato, usa uma composição editorial de texto — em vez de uma moldura
 * vazia esperando por uma fotografia.
 */
export function Perfil() {
  const retrato = site.fotos.perfilRetrato ?? site.fotos.sobreRetrato;

  return (
    <Secao>
      <div className="grid gap-10 md:grid-cols-12 md:gap-14">
        {retrato ? (
          <div className="md:col-span-5">
            <div className="relative aspect-[5/6] w-full max-w-[20rem] overflow-hidden rounded-[2rem] bg-papel-fundo md:max-w-none">
              {/* eslint-disable-next-line @next/next/no-img-element -- retrato otimizado na origem. */}
              <img
                src={retrato}
                alt={`${site.nomeApresentacao}, advogado`}
                width={1066}
                height={1600}
                loading="lazy"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        ) : (
          <div className="md:col-span-4">
            <span className="capitular inline-flex items-center gap-3 text-tinta-tenue">
              <span aria-hidden className="h-px w-8 bg-verde" />
              Perfil
            </span>
            <h2 className="mt-5 text-[clamp(1.875rem,1.3rem+2.3vw,2.75rem)]">
              {site.nomeApresentacao}
            </h2>
            <p className="mt-4 text-nota text-tinta-tenue">
              {site.oab}
              <br />
              {site.cidadeBase}/{site.uf}
            </p>
          </div>
        )}

        <div className={retrato ? 'md:col-span-7' : 'md:col-span-7 md:col-start-6'}>
          {retrato ? (
            <>
              <span className="capitular inline-flex items-center gap-3 text-tinta-tenue">
                <span aria-hidden className="h-px w-8 bg-verde" />
                Perfil
              </span>
              <h2 className="mt-5 text-[clamp(1.875rem,1.3rem+2.3vw,3rem)]">{site.nomeApresentacao}</h2>
              <p className="mt-3 text-nota text-tinta-tenue">
                {site.oab} · {site.cidadeBase}/{site.uf}
              </p>
            </>
          ) : null}

          <div className={`${retrato ? 'mt-7' : ''} space-y-5 text-[1.0625rem] leading-relaxed text-tinta-suave`}>
            {perfil.resumoCurto.map((paragrafo) => (
              <p key={paragrafo} className="max-w-[58ch]">
                {paragrafo}
              </p>
            ))}
          </div>

          <div className="mt-9">
            <Botao href="/sobre" variante="texto">
              Conheça o perfil profissional
            </Botao>
          </div>
        </div>
      </div>
    </Secao>
  );
}

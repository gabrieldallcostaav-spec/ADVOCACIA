import { Botao } from '@/components/ui/Botao';
import { Marca } from '@/components/ui/Marca';
import { site } from '@/config/site';

/**
 * Primeira dobra. Sem fotografia aprovada, a coluna visual usa a composição
 * da própria marca sobre fundo escuro — nunca um retrato genérico no lugar
 * de Gabriel. Quando `site.fotos.heroRetrato` for preenchido, o retrato
 * assume o mesmo espaço.
 */
export function Hero() {
  const retrato = site.fotos.heroRetrato;

  return (
    <section className="relative">
      <div className="mx-auto max-w-site px-gutter pt-10 pb-16 md:pt-16 md:pb-24 lg:pt-20">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-10 lg:gap-14">
          <div className="md:col-span-7">
            <h1 className="entrada entrada-1 font-sans text-[0.875rem] font-medium tracking-[0.16em] text-tinta-suave uppercase md:text-[0.9375rem]">
              <span aria-hidden className="mr-3 inline-block h-px w-8 translate-y-[-0.3em] bg-verde" />
              Advocacia em {site.cidadeBase}/{site.uf}
            </h1>

            <p className="entrada entrada-2 mt-7 font-display text-[clamp(2.25rem,1.45rem+2.9vw,3.375rem)] leading-[1.08] tracking-[-0.02em]">
              Clareza para compreender.
              <br />
              <span className="text-verde">Critério</span> para decidir.
            </p>

            <p className="entrada entrada-3 mt-8 max-w-[44ch] text-[1.0625rem] leading-relaxed text-tinta-suave md:text-[1.125rem]">
              Atuação jurídica com análise individual de cada caso e comunicação direta, do primeiro
              contato até a conclusão da questão.
            </p>

            <div className="entrada entrada-3 mt-10 flex flex-wrap items-center gap-4">
              <Botao href="/atuacao">Conheça a atuação</Botao>
              <Botao href="/contato" variante="contorno">
                Contato
              </Botao>
            </div>

            <p className="entrada entrada-3 mt-10 border-t border-linha pt-6 text-nota text-tinta-tenue">
              {site.nomeCompleto} · {site.oab}
            </p>
          </div>

          <div className="entrada entrada-3 md:col-span-5">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[20rem] md:max-w-none">
              {retrato ? (
                // eslint-disable-next-line @next/next/no-img-element -- retrato otimizado na origem; sem loader remoto.
                <img
                  src={retrato}
                  alt={`Retrato de ${site.nomeApresentacao}, advogado`}
                  width={1066}
                  height={1600}
                  fetchPriority="high"
                  className="h-full w-full rounded-[2.5rem] bg-escuro object-cover object-center"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-[2.5rem] bg-escuro px-10">
                  <Marca versao="vertical-branco" altura={170} className="max-w-full" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

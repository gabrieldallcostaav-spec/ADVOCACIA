import { Botao } from '@/components/ui/Botao';
import { BotaoWhatsapp } from '@/components/ui/BotaoWhatsapp';
import { Marca } from '@/components/ui/Marca';
import { areasPublicadas } from '@/content/areas';
import { site } from '@/config/site';

/**
 * Primeira dobra.
 *
 * Ordem deliberada: quem é, o que atende, onde e como falar. O slogan saiu
 * daqui para a faixa de assinatura mais abaixo — a abertura precisa explicar
 * o escopo, não só dar o tom.
 */
export function Hero() {
  const retrato = site.fotos.heroRetrato;
  const nomesDasAreas = areasPublicadas.map((area) => area.titulo);
  const modalidade =
    site.atendimentoAtivo && site.atendimentoPorVideoconferencia
      ? 'Consultas presenciais e por videoconferência, com análise individual da questão apresentada.'
      : 'Análise individual da questão apresentada.';

  return (
    <section className="relative">
      <div className="mx-auto max-w-site px-gutter pt-10 pb-16 md:pt-14 md:pb-24">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-10 lg:gap-14">
          <div className="md:col-span-7">
            <p className="entrada entrada-1 text-[0.875rem] font-medium tracking-[0.1em] text-tinta-suave uppercase">
              <span aria-hidden className="mr-3 inline-block h-px w-8 translate-y-[-0.3em] bg-verde" />
              {site.nomeApresentacao} · {site.oab}
            </p>

            <h1 className="entrada entrada-2 mt-6 text-[clamp(2rem,1.35rem+2.1vw,2.75rem)] leading-[1.12]">
              Advocacia em {site.cidadeBase}.
              <br />
              <span className="text-verde">Atendimento direto</span> com o advogado.
            </h1>

            <p className="entrada entrada-3 mt-7 max-w-[48ch] text-[1.0625rem] leading-relaxed text-tinta-suave md:text-[1.125rem]">
              Atuação em {nomesDasAreas.slice(0, -1).join(', ')} e {nomesDasAreas.at(-1)}.
            </p>
            <p className="entrada entrada-3 mt-3 max-w-[48ch] text-[1.0625rem] leading-relaxed text-tinta-suave md:text-[1.125rem]">
              {modalidade}
            </p>

            <div className="entrada entrada-3 mt-9 flex flex-wrap items-center gap-4">
              <BotaoWhatsapp />
              <Botao href="/atuacao" variante="contorno">
                Áreas de atuação
              </Botao>
            </div>
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

import { Secao, TituloSecao } from '@/components/ui/Secao';
import { site } from '@/config/site';

/**
 * Vídeo de apresentação.
 *
 * Sem arquivo aprovado, a seção inteira não é renderizada — nada de player
 * quebrado ou botão que não reproduz. Quando houver vídeo, ele é servido pelo
 * próprio domínio: sem player de terceiro, sem autoplay e sem som automático.
 * Legenda e transcrição são obrigatórias para publicar.
 */
export function VideoApresentacao() {
  const { arquivo, capa, legendas, transcricao } = site.video;
  if (!arquivo || !legendas) return null;

  return (
    <Secao>
      <div className="grid gap-12 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-4">
          <TituloSecao capitular="Apresentação">Em menos de um minuto.</TituloSecao>
          <p className="mt-6 max-w-[40ch] text-nota text-tinta-tenue">
            Quem sou, o que atendo e como funciona o atendimento.
          </p>
        </div>

        <div className="md:col-span-8">
          <video
            controls
            preload="none"
            poster={capa ?? undefined}
            className="w-full rounded-[2rem] bg-escuro"
            // Sem reprodução e sem som automáticos: quem decide é o visitante.
          >
            <source src={arquivo} type="video/mp4" />
            <track kind="captions" src={legendas} srcLang="pt-BR" label="Português (Brasil)" default />
            Seu navegador não reproduz este vídeo.
          </video>

          {transcricao ? (
            <p className="mt-5">
              <a
                href={transcricao}
                className="text-[0.9375rem] underline decoration-verde underline-offset-[0.3em] transition-colors hover:text-verde"
              >
                Ler a transcrição completa
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </Secao>
  );
}

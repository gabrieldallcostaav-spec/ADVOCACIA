import { BotaoWhatsapp } from '@/components/ui/BotaoWhatsapp';
import { Botao } from '@/components/ui/Botao';
import { Secao } from '@/components/ui/Secao';
import { Marca } from '@/components/ui/Marca';
import { modoPrevia, site, whatsappFormatado } from '@/config/site';

/**
 * Encerramento das páginas.
 *
 * A ação vem antes do texto, e a orientação de cautela fica curta: a versão
 * completa vive na página de contato, perto de onde ela importa. Repetir o
 * mesmo aviso em todo bloco só empurrava a leitura para baixo.
 */
export function BlocoContato() {
  const numero = whatsappFormatado();

  return (
    <Secao escuro espacamento="amplo">
      <div className="grid gap-12 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-6">
          <span className="capitular inline-flex items-center gap-3 text-papel/60">
            <span aria-hidden className="h-px w-8 bg-verde-claro" />
            Contato
          </span>
          <h2 className="mt-5 text-[clamp(1.875rem,1.3rem+2.3vw,3rem)]">
            Informe o assunto.
            <br />O resto a gente combina.
          </h2>
          <p className="mt-6 max-w-[46ch] text-papel/70">
            Atendimento em {site.cidadeBase}/{site.uf}
            {site.atendimentoPorVideoconferencia ? ' e por videoconferência' : ''}, conduzido
            diretamente pelo advogado.
          </p>
        </div>

        <div className="md:col-span-6 md:pt-2">
          <div className="flex flex-wrap items-center gap-4">
            <BotaoWhatsapp escuro />
            <Botao href="/contato" variante="contorno" escuro>
              Informações de atendimento
            </Botao>
          </div>

          {numero ? <p className="mt-6 text-[1.0625rem] text-papel/80">{numero}</p> : null}

          {!numero && modoPrevia ? (
            <p className="mt-6 max-w-[46ch] rounded-2xl border border-dashed border-papel/30 p-5 text-[0.9375rem] text-papel/60">
              <strong className="font-medium">Canal pendente.</strong> Sem número em
              `src/config/site.ts`, nenhum link de WhatsApp é gerado.
            </p>
          ) : null}

          <div className="mt-10 flex items-end justify-between gap-6 border-t border-linha-escura pt-7">
            <p className="text-[0.875rem] leading-relaxed text-papel/60">
              {site.nomeCompleto}
              <br />
              {site.oab} · {site.cidadeBase}/{site.uf}
            </p>
            <Marca versao="simbolo-branco" altura={52} className="opacity-45" />
          </div>
        </div>
      </div>
    </Secao>
  );
}

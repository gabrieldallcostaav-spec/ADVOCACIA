import { CanaisDeContato } from '@/components/ui/CanaisDeContato';
import { Secao } from '@/components/ui/Secao';
import { Marca } from '@/components/ui/Marca';
import { site } from '@/config/site';

export function BlocoContato() {
  return (
    <Secao escuro espacamento="amplo">
      <div className="grid gap-12 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-6">
          <span className="capitular inline-flex items-center gap-3 text-papel/60">
            <span aria-hidden className="h-px w-8 bg-verde-claro" />
            Contato
          </span>
          <h2 className="mt-5 text-[clamp(1.875rem,1.3rem+2.3vw,3rem)]">
            Informações sobre atendimento.
          </h2>
          <p className="mt-6 max-w-[46ch] text-papel/70">
            Descreva a questão em linhas gerais. O retorno traz a orientação sobre o agendamento da
            consulta e sobre quais documentos serão úteis.
          </p>
          <p className="mt-6 max-w-[48ch] text-nota text-papel/60">
            Neste primeiro contato, evite enviar documentos, senhas ou informações sensíveis. O envio
            de uma mensagem não formaliza a contratação nem o acompanhamento de prazos.
          </p>
        </div>

        <div className="md:col-span-6">
          <CanaisDeContato escuro />
          <div className="mt-10 flex items-end justify-between gap-6">
            <p className="text-nota text-papel/60">
              {site.nomeCompleto}
              <br />
              {site.oab} · {site.cidadeBase}/{site.uf}
            </p>
            <Marca versao="simbolo-branco" altura={56} className="opacity-45" />
          </div>
        </div>
      </div>
    </Secao>
  );
}

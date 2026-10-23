import { Acordeao } from '@/components/ui/Acordeao';
import { Secao, TituloSecao } from '@/components/ui/Secao';
import { perguntasFrequentes } from '@/content/perfil';

export function Perguntas() {
  return (
    <Secao className="bg-papel-fundo/50">
      <div className="grid gap-12 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-5">
          <TituloSecao capitular="Perguntas frequentes">
            Sobre o
            <br className="hidden sm:block" /> atendimento.
          </TituloSecao>
          <p className="mt-6 max-w-[40ch] text-nota text-tinta-tenue">
            As respostas tratam do funcionamento do atendimento. Questões sobre um caso concreto
            dependem de análise individual e não são respondidas por aqui.
          </p>
        </div>
        <div className="md:col-span-7">
          <Acordeao itens={perguntasFrequentes} />
        </div>
      </div>
    </Secao>
  );
}

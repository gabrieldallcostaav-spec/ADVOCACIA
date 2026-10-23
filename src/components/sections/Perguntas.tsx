import { Acordeao } from '@/components/ui/Acordeao';
import { Botao } from '@/components/ui/Botao';
import { Secao, TituloSecao } from '@/components/ui/Secao';
import { perguntasFrequentes } from '@/content/perfil';

/** Na home ficam as três primeiras; o restante vive em /contato. */
export function Perguntas() {
  return (
    <Secao className="bg-papel-fundo/50">
      <div className="grid gap-12 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-5">
          <TituloSecao capitular="Perguntas frequentes">
            Sobre o atendimento.
          </TituloSecao>
          <p className="mt-6 max-w-[40ch] text-[0.9375rem] leading-relaxed text-tinta-suave">
            Questões sobre um caso concreto dependem de análise individual e não são respondidas por
            aqui.
          </p>
          <div className="mt-7">
            <Botao href="/contato" variante="texto">
              Ver todas as perguntas
            </Botao>
          </div>
        </div>
        <div className="md:col-span-7">
          <Acordeao itens={perguntasFrequentes.slice(0, 3)} />
        </div>
      </div>
    </Secao>
  );
}

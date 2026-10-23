import { Secao, TituloSecao } from '@/components/ui/Secao';
import { etapasAtendimento } from '@/content/perfil';
import { site } from '@/config/site';

/** Só é exibido quando o atendimento está confirmado na configuração. */
export function Atendimento() {
  if (!site.atendimentoAtivo) return null;

  return (
    <Secao>
      <TituloSecao
        capitular="Como funciona"
        descricao="Uma sequência simples, para que você saiba o que esperar antes de entrar em contato."
      >
        Do primeiro contato
        <br className="hidden sm:block" /> à definição do escopo.
      </TituloSecao>

      <ol className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-linha sm:grid-cols-2">
        {etapasAtendimento.map((etapa, indice) => (
          <li key={etapa.titulo} className="bg-papel p-8 md:p-10">
            <span className="capitular text-verde tabular-nums">{String(indice + 1).padStart(2, '0')}</span>
            <h3 className="mt-4 font-display text-xl leading-snug">{etapa.titulo}</h3>
            <p className="mt-3 max-w-[42ch] text-[0.9375rem] leading-relaxed text-tinta-suave">{etapa.texto}</p>
          </li>
        ))}
      </ol>

      <p className="mt-8 max-w-[62ch] text-nota text-tinta-tenue">
        As etapas descrevem o procedimento de atendimento. Não representam promessa de resultado,
        de prazo de resposta ou de êxito em qualquer medida judicial.
      </p>
    </Secao>
  );
}

import { site } from '@/config/site';

/**
 * Faixa de dados objetivos. Substitui contadores promocionais: nenhum número
 * de causas, clientes ou êxito aparece no site.
 */
export function FaixaIdentificacao() {
  const itens = [site.nomeCompleto, site.oab, `${site.cidadeBase}/${site.uf}`];

  if (site.atendimentoAtivo && site.atendimentoPorVideoconferencia) {
    itens.push('Atendimento presencial e por videoconferência');
  }

  return (
    <div className="border-y border-linha bg-papel-fundo/60">
      <div className="mx-auto max-w-site px-gutter">
        <ul className="flex flex-col gap-2 py-5 text-[0.875rem] text-tinta-suave md:flex-row md:flex-wrap md:items-center md:gap-x-5 md:gap-y-2">
          {itens.map((item, indice) => (
            <li key={item} className="flex items-center gap-5">
              {indice > 0 ? <span aria-hidden className="hidden h-1 w-1 rounded-full bg-verde md:block" /> : null}
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

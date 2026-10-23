'use client';

import { useId, useState } from 'react';

export type ItemAcordeao = {
  pergunta: string;
  resposta: string;
};

/**
 * Perguntas frequentes. O conteúdo está sempre no HTML; a animação apenas
 * acompanha a mudança de estado e some em `prefers-reduced-motion`.
 */
export function Acordeao({ itens, escuro = false }: { itens: ItemAcordeao[]; escuro?: boolean }) {
  const base = useId();
  const [aberto, setAberto] = useState<number | null>(0);

  const corLinha = escuro ? 'border-linha-escura' : 'border-linha';
  const corTitulo = escuro ? 'text-papel' : 'text-tinta';
  const corTexto = escuro ? 'text-papel/70' : 'text-tinta-suave';

  return (
    <div className={`border-t ${corLinha}`}>
      {itens.map((item, indice) => {
        const estaAberto = aberto === indice;
        const idBotao = `${base}-botao-${indice}`;
        const idPainel = `${base}-painel-${indice}`;

        return (
          <div key={item.pergunta} className={`border-b ${corLinha}`}>
            <h3 className="m-0">
              <button
                type="button"
                id={idBotao}
                aria-expanded={estaAberto}
                aria-controls={idPainel}
                onClick={() => setAberto(estaAberto ? null : indice)}
                className={`flex w-full items-start justify-between gap-6 py-5 text-left font-sans text-[1.0625rem] leading-snug ${corTitulo} transition-colors hover:text-verde ${escuro ? 'hover:text-verde-claro' : ''}`}
              >
                <span className="font-normal">{item.pergunta}</span>
                <span
                  aria-hidden
                  className={`relative mt-2 block h-3 w-3 shrink-0 transition-transform duration-300 ${estaAberto ? 'rotate-45' : ''}`}
                >
                  <span className={`absolute top-1/2 left-0 h-px w-3 ${escuro ? 'bg-verde-claro' : 'bg-verde'}`} />
                  <span className={`absolute top-0 left-1/2 h-3 w-px ${escuro ? 'bg-verde-claro' : 'bg-verde'}`} />
                </span>
              </button>
            </h3>
            <div
              id={idPainel}
              role="region"
              aria-labelledby={idBotao}
              hidden={!estaAberto}
              className={`max-w-[60ch] pb-6 text-[0.9375rem] leading-relaxed ${corTexto}`}
            >
              {item.resposta}
            </div>
          </div>
        );
      })}
    </div>
  );
}

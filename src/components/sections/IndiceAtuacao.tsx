'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Area } from '@/content/areas';

/**
 * Lista editorial numerada. O painel lateral do desktop é acompanhamento
 * visual: tudo o que ele mostra já está visível na própria linha.
 */
export function IndiceAtuacao({ areas }: { areas: Area[] }) {
  const [ativo, setAtivo] = useState(0);
  const areaAtiva = areas[ativo] ?? areas[0];

  return (
    <div className="mt-14 grid gap-12 md:grid-cols-12 md:gap-10">
      <ul className="border-t border-linha md:col-span-7">
        {areas.map((area, indice) => (
          <li key={area.slug} className="border-b border-linha">
            <Link
              href={`/atuacao/${area.slug}`}
              onMouseEnter={() => setAtivo(indice)}
              onFocus={() => setAtivo(indice)}
              className="group flex items-start gap-5 py-7 transition-colors md:gap-8"
            >
              <span className="capitular mt-2 w-6 shrink-0 text-verde tabular-nums">
                {String(indice + 1).padStart(2, '0')}
              </span>
              <span className="flex-1">
                <span className="block font-display text-[clamp(1.375rem,1.1rem+1.1vw,1.875rem)] leading-tight transition-colors group-hover:text-verde">
                  {area.titulo}
                </span>
                <span className="mt-2 block max-w-[46ch] text-[0.9375rem] leading-relaxed text-tinta-suave">
                  {area.resumo}
                </span>
              </span>
              <span
                aria-hidden
                className="mt-3 shrink-0 text-tinta-tenue transition-transform duration-300 group-hover:translate-x-1 group-hover:text-verde"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div aria-hidden className="hidden md:col-span-5 md:block">
        <div className="sticky top-28 rounded-[2rem] bg-papel-fundo p-9">
          <span className="capitular text-tinta-tenue">Em resumo</span>
          <p className="mt-5 font-display text-2xl leading-tight">{areaAtiva.titulo}</p>
          <ul className="mt-6 space-y-3 text-[0.9375rem] text-tinta-suave">
            {areaAtiva.situacoes.slice(0, 4).map((situacao) => (
              <li key={situacao} className="flex gap-3">
                <span className="mt-[0.7em] h-px w-3 shrink-0 bg-verde" />
                <span>{situacao}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';

/** Número visível com cópia em um toque — útil para quem prefere ligar. */
export function NumeroCopiavel({ numero, rotulo }: { numero: string; rotulo: string }) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(numero);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      setCopiado(false);
    }
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-3">
      <span className="text-[1.0625rem]">{numero}</span>
      <button
        type="button"
        onClick={copiar}
        className="inline-flex min-h-[2.25rem] items-center rounded-full border border-linha px-4 text-[0.8125rem] text-tinta-suave transition-colors hover:border-verde hover:text-verde"
      >
        {copiado ? 'Copiado' : 'Copiar'}
        <span className="sr-only"> {rotulo}</span>
      </button>
    </span>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { linkWhatsapp } from '@/config/site';

/**
 * Barra discreta de contato no celular, exibida após a primeira dobra.
 * Não existe quando não há número real, e não se acumula com outro botão
 * flutuante — é o único elemento fixo do site.
 */
export function BarraContatoMobile() {
  const href = linkWhatsapp();
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    if (!href) return;
    const aoRolar = () => setVisivel(window.scrollY > window.innerHeight * 0.85);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, [href]);

  if (!href) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-linha bg-papel transition-transform duration-300 md:hidden ${
        visivel ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center justify-between gap-4 px-gutter py-3">
        <p className="text-[0.8125rem] leading-snug text-tinta-suave">Informações sobre atendimento</p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[2.75rem] items-center rounded-full bg-verde px-5 text-[0.9375rem] font-medium text-papel"
        >
          WhatsApp
          <span className="sr-only"> (abre em nova aba)</span>
        </a>
      </div>
    </div>
  );
}

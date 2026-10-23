import type { ReactNode } from 'react';

/** Linha de apoio em versalete, derivada do "ADVOCACIA" do logotipo. */
export function Capitular({
  children,
  className = '',
  comTraco = false,
}: {
  children: ReactNode;
  className?: string;
  comTraco?: boolean;
}) {
  return (
    <span className={`capitular inline-flex items-center gap-3 ${className}`}>
      {comTraco ? <span aria-hidden className="h-px w-8 bg-verde" /> : null}
      {children}
    </span>
  );
}

import Link from 'next/link';
import type { ReactNode } from 'react';

type Variante = 'solido' | 'contorno' | 'texto';

const base =
  'inline-flex items-center justify-center gap-2 min-h-[2.875rem] px-6 text-[0.9375rem] font-medium ' +
  'transition-colors duration-200 rounded-full';

const variantes: Record<Variante, string> = {
  solido: 'bg-verde text-papel hover:bg-verde-escuro',
  contorno: 'border border-linha-forte text-tinta hover:border-verde hover:text-verde',
  texto: 'px-0 text-tinta underline decoration-verde underline-offset-[0.35em] hover:text-verde',
};

const variantesEscuras: Record<Variante, string> = {
  solido: 'bg-papel text-escuro hover:bg-verde-claro',
  contorno: 'border border-linha-escura text-papel hover:border-verde-claro hover:text-verde-claro',
  texto: 'px-0 text-papel underline decoration-verde-claro underline-offset-[0.35em] hover:text-verde-claro',
};

export function Botao({
  href,
  children,
  variante = 'solido',
  escuro = false,
  externo = false,
  className = '',
}: {
  href: string;
  children: ReactNode;
  variante?: Variante;
  escuro?: boolean;
  externo?: boolean;
  className?: string;
}) {
  const classes = `${base} ${(escuro ? variantesEscuras : variantes)[variante]} ${className}`;

  if (externo) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

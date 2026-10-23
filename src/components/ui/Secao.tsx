import type { ReactNode } from 'react';

export function Secao({
  children,
  id,
  escuro = false,
  className = '',
  espacamento = 'normal',
}: {
  children: ReactNode;
  id?: string;
  escuro?: boolean;
  className?: string;
  espacamento?: 'normal' | 'amplo' | 'compacto';
}) {
  const padding =
    espacamento === 'amplo'
      ? 'py-24 md:py-36'
      : espacamento === 'compacto'
        ? 'py-12 md:py-16'
        : 'py-20 md:py-28';

  return (
    <section
      id={id}
      className={`${escuro ? 'escuro bg-escuro text-papel' : ''} ${padding} ${className}`}
    >
      <div className="mx-auto max-w-site px-gutter">{children}</div>
    </section>
  );
}

export function TituloSecao({
  capitular,
  children,
  descricao,
  escuro = false,
}: {
  capitular: string;
  children: ReactNode;
  descricao?: string;
  escuro?: boolean;
}) {
  return (
    <div className="max-w-[46rem]">
      <span className={`capitular inline-flex items-center gap-3 ${escuro ? 'text-papel/60' : 'text-tinta-tenue'}`}>
        <span aria-hidden className={`h-px w-8 ${escuro ? 'bg-verde-claro' : 'bg-verde'}`} />
        {capitular}
      </span>
      <h2 className="mt-5 text-[clamp(1.875rem,1.3rem+2.3vw,3rem)]">{children}</h2>
      {descricao ? (
        <p className={`mt-5 max-w-[52ch] ${escuro ? 'text-papel/70' : 'text-tinta-suave'}`}>{descricao}</p>
      ) : null}
    </div>
  );
}

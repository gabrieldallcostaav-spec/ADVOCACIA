import Link from 'next/link';
import { Fragment } from 'react';

export type Migalha = { rotulo: string; href?: string };

/**
 * Trilha de navegação.
 *
 * Em caixa normal e 14 px — antes era versalete de 12 px, pouco confortável
 * para uma informação que serve justamente para se localizar.
 */
export function Migalhas({ itens }: { itens: Migalha[] }) {
  return (
    <nav aria-label="Trilha de navegação" className="text-[0.875rem] text-tinta-tenue">
      {itens.map((item, indice) => (
        <Fragment key={item.rotulo}>
          {indice > 0 ? (
            <span aria-hidden className="mx-2">
              /
            </span>
          ) : null}
          {item.href ? (
            <Link href={item.href} className="transition-colors hover:text-verde">
              {item.rotulo}
            </Link>
          ) : (
            <span aria-current="page" className="text-tinta-suave">
              {item.rotulo}
            </span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}

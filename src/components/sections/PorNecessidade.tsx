import Link from 'next/link';
import { necessidades } from '@/content/necessidades';

/**
 * Acesso por assunto, na linguagem de quem procura.
 *
 * Complementa o índice de áreas e leva para as mesmas páginas — nenhuma página
 * nova é criada só porque o visitante pode chegar por outro caminho.
 */
export function PorNecessidade() {
  if (necessidades.length === 0) return null;

  return (
    <div>
      <h2 className="capitular font-sans text-tinta-tenue">Ou comece pelo seu assunto</h2>
      <ul className="mt-6 flex flex-wrap gap-3">
        {necessidades.map((item) => (
          <li key={item.rotulo}>
            <Link
              href={`/atuacao/${item.area}`}
              className="group flex min-h-[2.875rem] flex-col justify-center rounded-[1.25rem] border border-linha bg-papel-fundo/50 px-5 py-3 transition-colors hover:border-verde/50"
            >
              <span className="text-[0.9375rem] leading-snug transition-colors group-hover:text-verde">
                {item.rotulo}
              </span>
              <span className="mt-0.5 text-nota text-tinta-tenue">{item.descricao}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-6 max-w-[58ch] text-nota text-tinta-tenue">
        Cada assunto leva à página da área correspondente. As descrições são informativas e não
        avaliam o direito de ninguém — isso depende de análise individual.
      </p>
    </div>
  );
}

import { Marca } from '@/components/ui/Marca';

/**
 * Faixa de assinatura.
 *
 * O slogan saiu da primeira dobra, que agora explica o escopo, e vive aqui
 * como o momento tipográfico da marca — sem disputar espaço com a informação.
 */
export function Assinatura() {
  return (
    <section className="border-y border-linha bg-papel-fundo/50">
      <div className="mx-auto flex max-w-site flex-col items-center gap-6 px-gutter py-16 text-center md:py-20">
        <Marca versao="simbolo" altura={54} className="opacity-80" />
        <p className="font-display text-[clamp(1.5rem,1.1rem+1.8vw,2.25rem)] leading-[1.25] font-medium text-balance">
          Clareza para compreender.
          <br />
          <span className="text-verde">Critério</span> para decidir.
        </p>
      </div>
    </section>
  );
}

import { modoPrevia } from '@/config/site';

/**
 * Faixa exibida apenas em prévia privada. Deixa explícito que há conteúdo
 * demonstrativo e que o endereço não está indexado.
 */
export function AvisoPrevia() {
  if (!modoPrevia) return null;

  return (
    <div className="bg-escuro text-papel">
      <p className="mx-auto max-w-site px-gutter py-2 text-nota text-papel/75">
        <strong className="font-medium text-papel">Prévia privada.</strong> Blocos marcados como
        “modelo” contêm conteúdo demonstrativo e não estão publicados. Esta versão não é indexada por
        mecanismos de busca.
      </p>
    </div>
  );
}

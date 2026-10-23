/** Marca visual para conteúdo demonstrativo exibido apenas em prévia. */
export function SeloModelo({ escuro = false }: { escuro?: boolean }) {
  return (
    <span
      className={`capitular inline-flex items-center gap-2 rounded-full border px-3 py-1 ${
        escuro ? 'border-papel/30 text-papel/70' : 'border-linha-forte text-tinta-tenue'
      }`}
    >
      Modelo · não publicado
    </span>
  );
}

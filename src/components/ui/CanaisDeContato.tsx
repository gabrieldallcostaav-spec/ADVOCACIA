import { linkWhatsapp, modoPrevia, site } from '@/config/site';

type Canal = {
  rotulo: string;
  valor: string;
  href: string;
  externo: boolean;
};

export function canaisDisponiveis(): Canal[] {
  const canais: Canal[] = [];
  const whatsapp = linkWhatsapp();

  if (whatsapp) {
    canais.push({ rotulo: 'WhatsApp', valor: 'Abrir conversa', href: whatsapp, externo: true });
  }
  if (site.email) {
    canais.push({ rotulo: 'E-mail', valor: site.email, href: `mailto:${site.email}`, externo: false });
  }
  if (site.telefone) {
    canais.push({
      rotulo: 'Telefone',
      valor: site.telefone,
      href: `tel:${site.telefone.replace(/\D/g, '')}`,
      externo: false,
    });
  }

  return canais;
}

/**
 * Lista de canais. Nenhum link é gerado sem destinatário real; na prévia,
 * a ausência é declarada em vez de preenchida com um exemplo.
 */
export function CanaisDeContato({ escuro = false }: { escuro?: boolean }) {
  const canais = canaisDisponiveis();

  if (canais.length === 0) {
    if (!modoPrevia) return null;
    return (
      <p
        className={`max-w-[46ch] rounded-2xl border border-dashed p-5 text-[0.9375rem] ${
          escuro ? 'border-papel/25 text-papel/60' : 'border-linha-forte text-tinta-tenue'
        }`}
      >
        <strong className="font-medium">Canais pendentes.</strong> WhatsApp e e-mail ainda não foram
        informados, por isso nenhum link é exibido. Preencha `src/config/site.ts` para ativá-los.
      </p>
    );
  }

  return (
    <ul className={`divide-y ${escuro ? 'divide-linha-escura border-y border-linha-escura' : 'divide-linha border-y border-linha'}`}>
      {canais.map((canal) => (
        <li key={canal.rotulo}>
          <a
            href={canal.href}
            {...(canal.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="group flex min-h-[3.5rem] items-center justify-between gap-6 py-5"
          >
            <span className={`capitular ${escuro ? 'text-papel/60' : 'text-tinta-tenue'}`}>{canal.rotulo}</span>
            <span
              className={`flex items-center gap-3 text-[1.0625rem] transition-colors ${
                escuro ? 'text-papel group-hover:text-verde-claro' : 'text-tinta group-hover:text-verde'
              }`}
            >
              {canal.valor}
              {canal.externo ? <span className="sr-only">(abre em nova aba)</span> : null}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

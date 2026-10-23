import { linkWhatsapp } from '@/config/site';
import { Botao } from '@/components/ui/Botao';

/**
 * Acesso informativo ao WhatsApp — o mesmo rótulo em todo o site.
 *
 * Sem número configurado, cai para a página de contato em vez de sumir: o
 * visitante nunca fica sem caminho. Nenhum conteúdo do caso vai na URL.
 */
export function BotaoWhatsapp({
  variante = 'solido',
  escuro = false,
  className = '',
  rotulo = 'Falar pelo WhatsApp',
}: {
  variante?: 'solido' | 'contorno' | 'texto';
  escuro?: boolean;
  className?: string;
  rotulo?: string;
}) {
  const href = linkWhatsapp();

  if (!href) {
    return (
      <Botao href="/contato" variante={variante} escuro={escuro} className={className}>
        Informações sobre atendimento
      </Botao>
    );
  }

  return (
    <Botao href={href} externo variante={variante} escuro={escuro} className={className}>
      {rotulo}
      <span className="sr-only"> (abre em nova aba)</span>
    </Botao>
  );
}

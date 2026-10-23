import Link from 'next/link';
import { site } from '@/config/site';

type Versao =
  | 'horizontal'
  | 'horizontal-branco'
  | 'vertical'
  | 'vertical-branco'
  | 'simbolo'
  | 'simbolo-branco';

/** Proporções reais dos arquivos vetoriais da identidade. */
const proporcoes: Record<Versao, { w: number; h: number; arquivo: string }> = {
  horizontal: { w: 567, h: 185, arquivo: '/brand/logo-horizontal.svg' },
  'horizontal-branco': { w: 567, h: 185, arquivo: '/brand/logo-horizontal-branco.svg' },
  vertical: { w: 540, h: 315, arquivo: '/brand/logo-vertical.svg' },
  'vertical-branco': { w: 540, h: 315, arquivo: '/brand/logo-vertical-branco.svg' },
  simbolo: { w: 177, h: 181, arquivo: '/brand/simbolo.svg' },
  'simbolo-branco': { w: 177, h: 181, arquivo: '/brand/simbolo-branco.svg' },
};

export function Marca({
  versao = 'horizontal',
  altura = 40,
  className = '',
}: {
  versao?: Versao;
  altura?: number;
  className?: string;
}) {
  const { w, h, arquivo } = proporcoes[versao];
  const largura = Math.round((w / h) * altura);

  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG da marca: sem otimização nem reprocessamento de cor.
    <img
      src={arquivo}
      alt={site.marca}
      width={largura}
      height={altura}
      className={className}
      style={{ height: altura, width: largura }}
    />
  );
}

export function MarcaLink({
  versao = 'horizontal',
  altura = 40,
  className = '',
}: {
  versao?: Versao;
  altura?: number;
  className?: string;
}) {
  return (
    <Link href="/" aria-label={`${site.marca} — página inicial`} className={`inline-flex ${className}`}>
      <Marca versao={versao} altura={altura} />
    </Link>
  );
}

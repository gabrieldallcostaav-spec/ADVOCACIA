import QRCode from 'qrcode';

/**
 * QR Code gerado no build, como SVG inline.
 *
 * Nenhum serviço externo é chamado e nenhum redirecionador entra no caminho:
 * o código aponta direto para a URL do próprio domínio.
 */
export async function QrCode({
  valor,
  tamanho = 180,
  rotulo,
}: {
  valor: string;
  tamanho?: number;
  rotulo: string;
}) {
  const svg = await QRCode.toString(valor, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    // Margem (quiet zone) de 4 módulos, como manda a especificação.
    margin: 4,
    color: { dark: '#14160FFF', light: '#FFFFFFFF' },
  });

  const semDimensoes = svg
    .replace(/width="[^"]*"/, '')
    .replace(/height="[^"]*"/, '')
    .replace('<svg', `<svg role="img" aria-label="${rotulo}" style="width:100%;height:100%"`);

  return (
    <div
      style={{ width: tamanho, height: tamanho }}
      className="overflow-hidden rounded-2xl bg-white p-2"
      dangerouslySetInnerHTML={{ __html: semDimensoes }}
    />
  );
}

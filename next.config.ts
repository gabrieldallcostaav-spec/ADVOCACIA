import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Next.js injeta estilos inline no App Router; nenhum script externo é carregado.
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      "connect-src 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "object-src 'none'",
    ].join('; '),
  },
];

/**
 * Build estático para Cloudflare Workers (`npm run build:cloudflare`).
 *
 * No modo export o Next não executa `headers()` — quem aplica os cabeçalhos de
 * segurança é o arquivo `cloudflare/_headers`, copiado para `out/` pelo script
 * de build. Os dois precisam ser mantidos em sincronia.
 */
const exportarEstatico = process.env.EXPORTAR_ESTATICO === 'true';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(exportarEstatico
    ? { output: 'export' as const, images: { unoptimized: true } }
    : { headers: async () => [{ source: '/:path*', headers: securityHeaders }] }),
};

export default nextConfig;

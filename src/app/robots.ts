import type { MetadataRoute } from 'next';
import { modoPrevia } from '@/config/site';
import { url } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  // Em prévia, nada é liberado para rastreamento. O `noindex` dos metadados
  // continua valendo; nenhum dos dois serve como controle de acesso.
  if (modoPrevia) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: url('/sitemap.xml'),
    host: url('/'),
  };
}

import Link from 'next/link';
import { Marca } from '@/components/ui/Marca';
import { areasPublicadas } from '@/content/areas';
import { linkEmail, linkWhatsapp, site } from '@/config/site';

export function SiteFooter() {
  const ano = new Date().getFullYear();
  const whatsapp = linkWhatsapp();
  const email = linkEmail();

  return (
    <footer className="escuro border-t border-linha-escura bg-escuro text-papel">
      <div className="mx-auto max-w-site px-gutter py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Marca versao="horizontal-branco" altura={46} />
            <p className="mt-6 max-w-[34ch] text-[0.9375rem] leading-relaxed text-papel/60">
              {site.nomeCompleto}
              <br />
              {site.oab}
              <br />
              {site.cidadeBase}/{site.uf}
            </p>
          </div>

          {areasPublicadas.length > 0 ? (
            <nav aria-label="Áreas de atuação" className="md:col-span-4">
              <h2 className="capitular font-sans text-papel/60">Atuação</h2>
              <ul className="mt-5 space-y-3">
                {areasPublicadas.map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={`/atuacao/${area.slug}`}
                      className="text-[0.9375rem] text-papel/80 transition-colors hover:text-verde-claro"
                    >
                      {area.titulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          <nav aria-label="Links do site" className="md:col-span-3">
            <h2 className="capitular font-sans text-papel/60">Site</h2>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              <li>
                <Link href="/sobre" className="text-papel/80 transition-colors hover:text-verde-claro">
                  Perfil profissional
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-papel/80 transition-colors hover:text-verde-claro">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-papel/80 transition-colors hover:text-verde-claro">
                  Privacidade
                </Link>
              </li>
              {whatsapp ? (
                <li>
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-papel/80 transition-colors hover:text-verde-claro"
                  >
                    WhatsApp (abre em nova aba)
                  </a>
                </li>
              ) : null}
              {email ? (
                <li>
                  <a href={email} className="text-papel/80 transition-colors hover:text-verde-claro">
                    {site.email}
                  </a>
                </li>
              ) : null}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-linha-escura pt-7 text-nota text-papel/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {ano} {site.nomeCompleto}. {site.oab}.
          </p>
          <p>Conteúdo informativo. Não substitui a análise individual de cada caso.</p>
        </div>
      </div>
    </footer>
  );
}

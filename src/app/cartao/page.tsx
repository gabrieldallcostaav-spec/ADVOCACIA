import type { Metadata } from 'next';
import Link from 'next/link';
import { AcoesCartao } from '@/components/ui/AcoesCartao';
import { Marca } from '@/components/ui/Marca';
import { QrCode } from '@/components/ui/QrCode';
import { canaisDisponiveis } from '@/components/ui/CanaisDeContato';
import { JsonLd, metadadosDaPagina, migalhas, url } from '@/lib/seo';
import { site } from '@/config/site';

export const metadata: Metadata = metadadosDaPagina({
  titulo: `Cartão profissional — ${site.nomeApresentacao}`,
  descricao: `Contato de ${site.nomeCompleto}, ${site.oab}, advogado em ${site.cidadeBase}/${site.uf}.`,
  caminho: '/cartao',
});

export default async function Cartao() {
  const canais = canaisDisponiveis();
  const retrato = site.fotos.cartaoRetrato;
  const enderecoDoCartao = url('/cartao');

  return (
    <>
      <section className="px-gutter py-14 md:py-20">
        <div className="mx-auto max-w-[32rem]">
          <div className="overflow-hidden rounded-[2rem] border border-linha bg-papel-fundo/60">
            <div className="flex items-center gap-5 bg-escuro px-7 py-6">
              {retrato ? (
                // eslint-disable-next-line @next/next/no-img-element -- retrato otimizado na origem.
                <img
                  src={retrato}
                  alt={`${site.nomeApresentacao}, advogado`}
                  width={160}
                  height={160}
                  className="h-20 w-20 shrink-0 rounded-full object-cover object-top"
                />
              ) : null}
              <Marca versao="horizontal-branco" altura={44} />
            </div>

            <div className="px-7 py-8">
              <h1 className="text-[clamp(1.75rem,1.4rem+1.6vw,2.25rem)]">{site.nomeCompleto}</h1>
              <p className="mt-3 text-nota text-tinta-tenue">
                Advogado · {site.oab}
                <br />
                {site.cidadeBase}/{site.uf}
                {site.atendimentoAtivo && site.atendimentoPorVideoconferencia
                  ? ' · atendimento presencial e por videoconferência'
                  : ''}
              </p>

              {canais.length > 0 ? (
                <ul className="mt-7 grid gap-3">
                  {canais.map((canal) => (
                    <li key={canal.rotulo}>
                      <a
                        href={canal.href}
                        {...(canal.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="flex min-h-[3.25rem] items-center justify-between gap-4 rounded-2xl bg-papel px-5 transition-colors hover:text-verde"
                      >
                        <span className="capitular text-tinta-tenue">{canal.rotulo}</span>
                        <span className="flex items-center gap-2 text-[0.9375rem]">
                          {canal.valor}
                          {canal.externo ? <span className="sr-only"> (abre em nova aba)</span> : null}
                          <span aria-hidden>→</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}

              {site.endereco ? (
                <a
                  href={site.endereco.linkMapa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex min-h-[3.25rem] items-center justify-between gap-4 rounded-2xl bg-papel px-5 transition-colors hover:text-verde"
                >
                  <span className="capitular text-tinta-tenue">Endereço</span>
                  <span className="flex items-center gap-2 text-right text-[0.9375rem]">
                    Abrir no mapa<span className="sr-only"> (abre em nova aba)</span>
                    <span aria-hidden>→</span>
                  </span>
                </a>
              ) : null}

              <div className="mt-8">
                <AcoesCartao url={enderecoDoCartao} />
              </div>
            </div>

            <div className="flex items-center gap-6 border-t border-linha px-7 py-7">
              <QrCode valor={enderecoDoCartao} tamanho={128} rotulo="QR Code do cartão profissional" />
              <div>
                <p className="capitular text-tinta-tenue">Aponte a câmera</p>
                <p className="mt-2 max-w-[22ch] text-[0.9375rem] leading-relaxed text-tinta-suave">
                  O código leva a este cartão, no domínio da advocacia.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-nota text-tinta-tenue">
            <Link href="/canais-oficiais" className="underline decoration-verde underline-offset-[0.3em] hover:text-verde">
              Conferir os canais oficiais
            </Link>
            <span aria-hidden className="mx-3">·</span>
            <Link href="/" className="underline decoration-verde underline-offset-[0.3em] hover:text-verde">
              Ir para o site
            </Link>
          </p>
        </div>
      </section>

      <JsonLd
        dados={migalhas([
          { nome: 'Início', caminho: '/' },
          { nome: 'Cartão', caminho: '/cartao' },
        ])}
      />
    </>
  );
}

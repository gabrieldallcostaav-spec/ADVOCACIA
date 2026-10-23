import type { Metadata } from 'next';
import Link from 'next/link';
import { Acordeao } from '@/components/ui/Acordeao';
import { BotaoWhatsapp } from '@/components/ui/BotaoWhatsapp';
import { Marca } from '@/components/ui/Marca';
import { Migalhas } from '@/components/ui/Migalhas';
import { NumeroCopiavel } from '@/components/ui/NumeroCopiavel';
import { Secao } from '@/components/ui/Secao';
import { JsonLd, metadadosDaPagina, migalhas } from '@/lib/seo';
import { perguntasFrequentes } from '@/content/perfil';
import { modoPrevia, site, whatsappFormatado } from '@/config/site';

export const metadata: Metadata = metadadosDaPagina({
  titulo: `Contato — advocacia em ${site.cidadeBase}`,
  descricao: `Canais de contato de ${site.nomeCompleto}, ${site.oab}. Atendimento em ${site.cidadeBase}/${site.uf} e por videoconferência.`,
  caminho: '/contato',
});

export default function Contato() {
  const endereco = site.endereco;
  const numero = whatsappFormatado();

  return (
    <>
      <Secao>
        <Migalhas itens={[{ rotulo: 'Início', href: '/' }, { rotulo: 'Contato' }]} />

        <div className="mt-10 grid gap-12 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-6">
            <h1 className="text-[clamp(2rem,1.4rem+2.6vw,3.25rem)]">Falar com o advogado</h1>
            <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-tinta-suave">
              Informe o assunto em linhas gerais. O retorno traz a orientação sobre o agendamento da
              consulta e sobre quais documentos serão úteis.
            </p>

            {/* A ação fica antes de qualquer texto de cautela: quem já decidiu
                falar não precisa ler a página inteira para achar o canal. */}
            <div className="mt-9">
              <BotaoWhatsapp />
            </div>

            {numero ? (
              <div className="mt-7">
                <p className="capitular text-tinta-tenue">Número</p>
                <div className="mt-2">
                  <NumeroCopiavel numero={numero} rotulo="número de WhatsApp" />
                </div>
              </div>
            ) : null}

            {site.email ? (
              <div className="mt-7">
                <p className="capitular text-tinta-tenue">E-mail</p>
                <p className="mt-2">
                  <a
                    href={`mailto:${site.email}`}
                    className="text-[1.0625rem] underline decoration-verde underline-offset-[0.3em] transition-colors hover:text-verde"
                  >
                    {site.email}
                  </a>
                </p>
              </div>
            ) : modoPrevia ? (
              <p className="mt-7 max-w-[46ch] rounded-2xl border border-dashed border-linha-forte p-5 text-[0.9375rem] text-tinta-tenue">
                <strong className="font-medium">E-mail pendente.</strong> Enquanto não for informado em
                `src/config/site.ts`, nenhum endereço é exibido.
              </p>
            ) : null}

            <p className="mt-9 max-w-[50ch] text-[0.9375rem] leading-relaxed text-tinta-suave">
              No primeiro contato, informe apenas o assunto geral. Evite enviar documentos ou
              informações sensíveis. O envio de mensagem não formaliza a contratação nem o
              acompanhamento de prazos.
            </p>
          </div>

          <div className="md:col-span-6">
            <div className="rounded-[2rem] bg-papel-fundo p-8 md:p-10">
              <h2 className="capitular font-sans text-tinta-tenue">Atendimento</h2>

              <dl className="mt-6 space-y-6">
                {site.atendimentoAtivo ? (
                  <div>
                    <dt className="text-[0.875rem] text-tinta-tenue">Modalidades</dt>
                    <dd className="mt-1 text-[1.0625rem] leading-relaxed">
                      Presencial em {site.cidadeBase}/{site.uf}
                      {site.atendimentoPorVideoconferencia ? ' e por videoconferência' : ''}.
                    </dd>
                  </div>
                ) : null}

                {endereco ? (
                  <div>
                    <dt className="text-[0.875rem] text-tinta-tenue">Endereço</dt>
                    <dd className="mt-1 text-[1.0625rem] leading-relaxed">
                      {endereco.logradouro}
                      {endereco.complemento ? `, ${endereco.complemento}` : ''}
                      <br />
                      {endereco.bairro} · {endereco.cidade}/{endereco.uf} · CEP {endereco.cep}
                      <br />
                      <a
                        href={endereco.linkMapa}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[0.9375rem] underline decoration-verde underline-offset-[0.3em] transition-colors hover:text-verde"
                      >
                        Abrir no mapa<span className="sr-only"> (abre em nova aba)</span>
                      </a>
                    </dd>
                  </div>
                ) : null}

                {site.horarios ? (
                  <div>
                    <dt className="text-[0.875rem] text-tinta-tenue">Horários</dt>
                    <dd className="mt-1 space-y-1 text-[1.0625rem]">
                      {site.horarios.map((horario) => (
                        <p key={horario}>{horario}</p>
                      ))}
                    </dd>
                  </div>
                ) : null}

                <div>
                  <dt className="text-[0.875rem] text-tinta-tenue">O que acontece depois</dt>
                  <dd className="mt-1 text-[1.0625rem] leading-relaxed">
                    O retorno indica como a consulta é agendada e quais documentos separar. A consulta
                    não obriga a contratar.
                  </dd>
                </div>
              </dl>

              <div className="mt-9 flex items-end justify-between gap-6 border-t border-linha pt-7">
                <p className="text-[0.875rem] leading-relaxed text-tinta-tenue">
                  {site.nomeCompleto}
                  <br />
                  {site.oab} · {site.cidadeBase}/{site.uf}
                </p>
                <Marca versao="simbolo" altura={48} className="opacity-60" />
              </div>
            </div>

            <div className="mt-6 space-y-3 text-[0.875rem] leading-relaxed text-tinta-tenue">
              <p>
                Recebeu uma mensagem em nome do escritório e quer confirmar?{' '}
                <Link
                  href="/canais-oficiais"
                  className="underline decoration-verde underline-offset-[0.3em] transition-colors hover:text-verde"
                >
                  Veja os canais oficiais
                </Link>
                .
              </p>
              {/* O link de privacidade desemboca aqui: o destino precisa acolher
                  esse tipo de pedido, não só falar de consulta. */}
              <p>
                Para assuntos de proteção de dados, use o mesmo canal e informe que se trata de uma
                solicitação de privacidade.{' '}
                <Link
                  href="/privacidade"
                  className="underline decoration-verde underline-offset-[0.3em] transition-colors hover:text-verde"
                >
                  Como funciona
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </Secao>

      <Secao className="bg-papel-fundo/50">
        <div className="grid gap-12 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-5">
            <h2 className="text-[clamp(1.75rem,1.3rem+2vw,2.5rem)]">Perguntas frequentes</h2>
            <p className="mt-6 max-w-[40ch] text-[0.9375rem] leading-relaxed text-tinta-suave">
              As respostas tratam do funcionamento do atendimento. Questões sobre um caso concreto
              dependem de análise individual.
            </p>
          </div>
          <div className="md:col-span-7">
            <Acordeao itens={perguntasFrequentes} />
          </div>
        </div>
      </Secao>

      <JsonLd
        dados={migalhas([
          { nome: 'Início', caminho: '/' },
          { nome: 'Contato', caminho: '/contato' },
        ])}
      />
    </>
  );
}

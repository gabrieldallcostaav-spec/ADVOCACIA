import type { Metadata } from 'next';
import Link from 'next/link';
import { Acordeao } from '@/components/ui/Acordeao';
import { CanaisDeContato } from '@/components/ui/CanaisDeContato';
import { Marca } from '@/components/ui/Marca';
import { Secao } from '@/components/ui/Secao';
import { JsonLd, metadadosDaPagina, migalhas } from '@/lib/seo';
import { perguntasFrequentes } from '@/content/perfil';
import { site } from '@/config/site';

export const metadata: Metadata = metadadosDaPagina({
  titulo: `Contato — advocacia em ${site.cidadeBase}`,
  descricao: `Canais de contato de ${site.nomeCompleto}, ${site.oab}. Atendimento em ${site.cidadeBase}/${site.uf} e por videoconferência.`,
  caminho: '/contato',
});

export default function Contato() {
  const endereco = site.endereco;

  return (
    <>
      <Secao espacamento="amplo">
        <nav aria-label="Trilha de navegação" className="capitular text-tinta-tenue">
          <Link href="/" className="transition-colors hover:text-verde">
            Início
          </Link>
          <span aria-hidden className="mx-2">·</span>
          <span aria-current="page">Contato</span>
        </nav>

        <div className="mt-12 grid gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <h1 className="text-[clamp(2.25rem,1.5rem+3vw,3.75rem)]">Informações sobre atendimento</h1>
            <p className="mt-7 max-w-[48ch] text-[1.0625rem] leading-relaxed text-tinta-suave">
              Descreva a questão em linhas gerais. O retorno traz a orientação sobre o agendamento da
              consulta e sobre quais documentos serão úteis.
            </p>

            {site.atendimentoAtivo ? (
              <dl className="mt-10 space-y-6">
                <div>
                  <dt className="capitular text-tinta-tenue">Modalidades</dt>
                  <dd className="mt-2 text-[1.0625rem]">
                    Atendimento presencial em {site.cidadeBase}/{site.uf}
                    {site.atendimentoPorVideoconferencia ? ' e por videoconferência' : ''}.
                  </dd>
                </div>

                {endereco ? (
                  <div>
                    <dt className="capitular text-tinta-tenue">Endereço</dt>
                    <dd className="mt-2 text-[1.0625rem] leading-relaxed">
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
                    <dt className="capitular text-tinta-tenue">Horários</dt>
                    <dd className="mt-2 space-y-1 text-[1.0625rem]">
                      {site.horarios.map((horario) => (
                        <p key={horario}>{horario}</p>
                      ))}
                    </dd>
                  </div>
                ) : null}
              </dl>
            ) : null}

            <p className="mt-10 max-w-[50ch] rounded-2xl bg-papel-fundo p-6 text-nota text-tinta-tenue">
              Neste primeiro contato, evite enviar documentos, senhas ou informações sensíveis. O
              envio de uma mensagem não formaliza a contratação nem o acompanhamento de prazos, e o
              site não garante resposta imediata.
            </p>
          </div>

          <div className="md:col-span-6">
            <h2 className="capitular font-sans text-tinta-tenue">Canais</h2>
            <div className="mt-6">
              <CanaisDeContato />
            </div>

            <div className="mt-12 flex items-end justify-between gap-6 border-t border-linha pt-8">
              <p className="text-nota text-tinta-tenue">
                {site.nomeCompleto}
                <br />
                {site.oab} · {site.cidadeBase}/{site.uf}
              </p>
              <Marca versao="simbolo" altura={52} className="opacity-60" />
            </div>
          </div>
        </div>
      </Secao>

      <Secao className="bg-papel-fundo/50">
        <div className="grid gap-12 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-5">
            <h2 className="text-[clamp(1.75rem,1.3rem+2vw,2.5rem)]">Perguntas frequentes</h2>
            <p className="mt-6 max-w-[40ch] text-nota text-tinta-tenue">
              As respostas tratam do funcionamento do atendimento. Questões sobre um caso concreto
              dependem de análise individual e não são respondidas por aqui.
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

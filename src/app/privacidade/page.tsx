import type { Metadata } from 'next';
import Link from 'next/link';
import { Botao } from '@/components/ui/Botao';
import { Migalhas } from '@/components/ui/Migalhas';
import { Secao } from '@/components/ui/Secao';
import { metadadosDaPagina } from '@/lib/seo';
import { canaisDisponiveis } from '@/components/ui/CanaisDeContato';
import { linkWhatsapp, mensagemPrivacidade, site } from '@/config/site';

export const metadata: Metadata = metadadosDaPagina({
  titulo: 'Privacidade',
  descricao:
    'O que fica registrado quando você navega neste site, o que acontece com as informações enviadas no contato e como falar sobre os seus dados.',
  caminho: '/privacidade',
});

/**
 * Política de privacidade.
 *
 * Regra desta página: só entra o que é sustentado por evidência. O que depende
 * da rotina do escritório e ainda não foi confirmado é explicado pelo critério
 * aplicável, nunca por um prazo ou uma garantia inventados. Quando
 * `site.privacidade` for preenchido, a precisão aumenta sozinha.
 */
export default function Privacidade() {
  const atualizacao = '23 de outubro de 2026';
  const canais = canaisDisponiveis();
  const nomesDosCanais = canais.map((canal) => canal.rotulo);
  const linkPrivacidade = linkWhatsapp(mensagemPrivacidade);
  const { prazosDeConservacao, quemTemAcesso } = site.privacidade;

  const resumo = [
    { href: '#registros', titulo: 'Quais informações ficam registradas?' },
    { href: '#contato', titulo: 'O que acontece quando entro em contato?' },
    { href: '#solicitacao', titulo: 'Como faço uma solicitação sobre meus dados?' },
  ];

  return (
    <Secao espacamento="amplo">
      <div className="mx-auto max-w-leitura">
        <Migalhas itens={[{ rotulo: 'Início', href: '/' }, { rotulo: 'Privacidade' }]} />

        <h1 className="mt-10 text-[clamp(2rem,1.4rem+2.6vw,3.25rem)]">Privacidade</h1>
        <p className="mt-4 text-[0.875rem] text-tinta-tenue">Última revisão: {atualizacao}</p>

        <p className="mt-8 max-w-[54ch] text-[1.125rem] leading-relaxed text-tinta-suave">
          Sua privacidade faz parte do cuidado no atendimento. Aqui está o que pode ficar registrado
          enquanto você navega, o que acontece com as informações que você envia no contato e como
          falar comigo sobre os seus dados.
        </p>

        <nav aria-label="Resumo" className="mt-10 rounded-[1.75rem] bg-papel-fundo p-7">
          <p className="capitular text-tinta-tenue">Resumo</p>
          <ul className="mt-5 grid gap-3">
            {resumo.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group flex items-center justify-between gap-4 text-[1.0625rem] transition-colors hover:text-verde"
                >
                  {item.titulo}
                  <span aria-hidden className="shrink-0 text-tinta-tenue transition-transform group-hover:translate-x-1 group-hover:text-verde">
                    ↓
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="prosa mt-14">
          <h2>Quem é o responsável</h2>
          <p>
            {site.nomeCompleto}, advogado inscrito na {site.oab}, com atuação em {site.cidadeBase}/
            {site.uf}. É ele quem recebe e responde as mensagens enviadas pelos canais publicados no
            site.
          </p>

          <h2 id="registros">Quais informações ficam registradas</h2>
          <p>
            Este site não tem formulário de contato, cadastro, login nem qualquer campo para você
            preencher. Para ler qualquer página, você não precisa informar nada sobre si.
          </p>
          <p>
            Duas coisas, porém, acontecem em qualquer site da internet e também aqui:
          </p>
          <ul>
            <li>
              <strong>Registros técnicos de acesso.</strong> Para entregar uma página, o servidor
              precisa receber o endereço de IP de quem pediu. O serviço de hospedagem processa esse
              endereço para identificar o país de origem, contar visitantes e proteger a aplicação
              contra abuso. Isso é feito do lado do servidor, sem nenhum script no seu navegador.
            </li>
            <li>
              <strong>Cookie técnico de segurança.</strong> O site não grava cookie algum. O serviço
              de hospedagem pode gravar um cookie estritamente técnico se a proteção contra robôs
              estiver ativada — por exemplo, para registrar que uma verificação de segurança já foi
              feita naquele navegador. Ele não acompanha você por outros sites e não serve a
              publicidade.
            </li>
          </ul>
          <p>
            Fora isso, não há nada: nenhuma ferramenta de medição de audiência, nenhum rastreador de
            publicidade, nenhum botão ou vídeo incorporado de outro serviço. As fontes tipográficas
            são servidas pelo próprio domínio, então nem elas geram requisição a terceiros.
          </p>

          <h2>Cookies e escolhas</h2>
          <p>
            Como não existe cookie de publicidade, de audiência ou de personalização, não há
            finalidade opcional a consentir — e por isso não existe banner de cookies nesta página.
            Um aviso que não corresponda a nada seria apenas decoração.
          </p>
          <p>
            Se algum dia uma ferramenta de medição for adotada, esta seção será atualizada antes da
            ativação, com a descrição da ferramenta, da finalidade e das escolhas disponíveis.
          </p>

          <h2 id="contato">O que acontece quando você entra em contato</h2>
          <p>
            {canais.length > 0
              ? `O contato acontece por ${nomesDosCanais.join(' e ')}. `
              : 'O contato acontece pelos canais publicados na página de contato. '}
            Esse canal é operado por uma empresa de fora do escritório e funciona sob a política de
            privacidade dela: ao escrever, sua mensagem transita por esse serviço antes de chegar a
            mim.
          </p>
          <p>
            O que você escreve é usado para responder ao seu contato, entender se a questão
            corresponde às áreas atendidas e organizar o agendamento de uma consulta. Se houver
            contratação, as informações passam a ser tratadas no âmbito do próprio serviço jurídico
            — o que é outra coisa, com outra finalidade e com os deveres próprios da advocacia.
          </p>
          <p>
            {quemTemAcesso
              ? `Têm acesso às mensagens: ${quemTemAcesso}.`
              : 'As mensagens chegam ao aparelho e às contas usadas profissionalmente por mim. Se você quiser saber exatamente quem teve acesso a uma informação sua, pode perguntar — essa resposta é sua por direito.'}
          </p>
          <p>
            No primeiro contato, informe apenas o assunto em linhas gerais. Evite enviar documentos,
            senhas ou informações sensíveis antes da consulta: quanto menos informação desnecessária
            circular, melhor para você.
          </p>

          <h2>Por quanto tempo as informações ficam guardadas</h2>
          {prazosDeConservacao ? (
            <ul>
              {prazosDeConservacao.map((prazo) => (
                <li key={prazo}>{prazo}</li>
              ))}
            </ul>
          ) : (
            <>
              <p>
                O critério é este: cada informação é conservada enquanto for necessária à finalidade
                que motivou o contato e, depois disso, pelo tempo em que a lei ou o dever
                profissional obrigarem a guardá-la.
              </p>
              <p>
                Na prática isso significa que nem tudo pode ser apagado a pedido. Documentos de um
                atendimento efetivamente realizado, por exemplo, precisam ser conservados para
                cumprimento de obrigações legais e para o exercício regular de direitos — inclusive
                os seus. Uma mensagem de quem não chegou a contratar tem outra situação. Se quiser
                saber o que se aplica ao seu caso, pergunte e eu explico.
              </p>
            </>
          )}

          <h2>Sigilo profissional</h2>
          <p>
            O que você compartilha em uma consulta ou durante um atendimento está protegido pelo
            sigilo profissional do advogado, previsto no Estatuto da Advocacia e no Código de Ética e
            Disciplina. Esse dever é mais amplo que qualquer política de site: ele vale
            independentemente de contratação e não se encerra quando o caso acaba.
          </p>

          <h2 id="solicitacao">Seus direitos e como fazer uma solicitação</h2>
          <p>
            A legislação brasileira de proteção de dados garante a você, entre outros, o direito de
            saber se há tratamento dos seus dados, de acessá-los, de corrigir o que estiver errado,
            de pedir a eliminação do que não for necessário, de solicitar a{' '}
            <strong>portabilidade</strong> (receber seus dados em formato que permita levá-los a
            outro prestador) e a <strong>anonimização</strong> (que os dados deixem de permitir
            identificar você).
          </p>
          <p>
            Para exercer qualquer um deles, use o contato abaixo e diga que se trata de um assunto de
            privacidade. Você não precisa enviar documentos de imediato: se alguma conferência de
            identidade for necessária para proteger seus próprios dados, eu oriento como fazer. A
            resposta é dada dentro do prazo legal, e quando alguma informação precisar ser conservada
            por obrigação legal ou profissional, isso é explicado com o motivo.
          </p>

          <h2>Alterações desta página</h2>
          <p>
            Qualquer mudança no funcionamento do site que afete o tratamento de dados é refletida
            aqui, com atualização da data de revisão no topo. A data acima corresponde a uma revisão
            real do conteúdo, não à data da última publicação do site.
          </p>
        </div>

        <div className="mt-14 rounded-[1.75rem] border border-linha bg-papel-fundo/60 p-7 md:p-9">
          <h2 className="font-display text-[clamp(1.375rem,1.15rem+1vw,1.75rem)] font-medium">
            Tirar uma dúvida sobre meus dados
          </h2>
          <p className="mt-3 max-w-[48ch] text-[0.9375rem] leading-relaxed text-tinta-suave">
            É o mesmo canal do atendimento. A mensagem já vai preenchida identificando o assunto como
            privacidade — e nada é enviado até você tocar em enviar no aplicativo.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            {linkPrivacidade ? (
              <Botao href={linkPrivacidade} externo>
                Falar pelo WhatsApp
                <span className="sr-only"> (abre o WhatsApp, um serviço externo, em nova aba)</span>
              </Botao>
            ) : null}
            <Botao href="/contato" variante="contorno">
              Ver todos os canais
            </Botao>
          </div>
          <p className="mt-6 text-[0.875rem] leading-relaxed text-tinta-tenue">
            Quer confirmar se uma mensagem recebida é mesmo minha?{' '}
            <Link
              href="/canais-oficiais"
              className="underline decoration-verde underline-offset-[0.3em] transition-colors hover:text-verde"
            >
              Veja os canais oficiais
            </Link>
            .
          </p>
        </div>
      </div>
    </Secao>
  );
}

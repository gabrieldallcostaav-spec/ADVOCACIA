import type { Metadata } from 'next';
import Link from 'next/link';
import { Secao } from '@/components/ui/Secao';
import { metadadosDaPagina } from '@/lib/seo';
import { canaisDisponiveis } from '@/components/ui/CanaisDeContato';
import { site } from '@/config/site';

export const metadata: Metadata = metadadosDaPagina({
  titulo: 'Política de privacidade',
  descricao: 'Como os dados pessoais são tratados neste site e nos canais de contato.',
  caminho: '/privacidade',
});

export default function Privacidade() {
  const canais = canaisDisponiveis();
  const atualizacao = '23 de outubro de 2026';

  return (
    <Secao espacamento="amplo">
      <div className="mx-auto max-w-leitura">
        <nav aria-label="Trilha de navegação" className="capitular text-tinta-tenue">
          <Link href="/" className="transition-colors hover:text-verde">
            Início
          </Link>
          <span aria-hidden className="mx-2">·</span>
          <span aria-current="page">Privacidade</span>
        </nav>

        <h1 className="mt-10 text-[clamp(2rem,1.4rem+2.6vw,3.25rem)]">Política de privacidade</h1>
        <p className="mt-5 text-nota text-tinta-tenue">Última atualização: {atualizacao}</p>

        <div className="prosa mt-12">
          <p>
            Esta política descreve o que este site efetivamente faz com dados pessoais. Ela
            corresponde à implementação atual e será atualizada se algum recurso novo for habilitado.
          </p>

          <h2>Quem é o responsável</h2>
          <p>
            {site.nomeCompleto}, {site.oab}, {site.cidadeBase}/{site.uf}.
            {canais.length > 0
              ? ' O contato para assuntos relacionados a dados pessoais é o mesmo canal de atendimento indicado na página de contato.'
              : ''}
          </p>

          <h2>O que o site coleta</h2>
          <p>
            Este site é institucional e não possui formulário de contato, área de cadastro, login ou
            qualquer campo em que você digite informações. Nenhum dado pessoal é coletado pelas
            páginas.
          </p>

          <h2>Cookies e medição</h2>
          <p>
            O site não utiliza cookies de publicidade, não instala ferramentas de análise de
            audiência e não incorpora conteúdo de terceiros que rastreie a navegação. As fontes
            tipográficas são servidas pelo próprio domínio, sem requisição a serviços externos. Por
            isso não há banner de consentimento: não existe finalidade opcional a consentir.
          </p>
          {!site.analyticsHabilitado ? null : (
            <p>
              Caso a medição de navegação seja habilitada no futuro, esta seção será atualizada antes
              da ativação, com a descrição da ferramenta, da finalidade e das escolhas disponíveis.
            </p>
          )}

          <h2>Registros técnicos de acesso</h2>
          <p>
            Como ocorre em qualquer site, o servidor de hospedagem pode registrar dados técnicos de
            acesso, como endereço IP, data, hora e tipo de navegador, para operação e segurança da
            aplicação. Esses registros são tratados conforme a legislação aplicável, inclusive o
            Marco Civil da Internet.
            {site.provedorHospedagem
              ? ` A hospedagem é prestada por ${site.provedorHospedagem}.`
              : ''}
          </p>

          <h2>Quando você entra em contato</h2>
          <p>
            Ao escrever por WhatsApp, e-mail ou telefone, você envia seus dados diretamente por esses
            canais, que são operados por terceiros e regidos pelas políticas de privacidade dos
            respectivos provedores. As informações recebidas são utilizadas exclusivamente para
            responder ao contato e avaliar o atendimento solicitado.
          </p>
          <p>
            Evite enviar documentos, senhas ou informações sensíveis em um primeiro contato. O envio
            de uma mensagem não formaliza contratação nem acompanhamento de prazos.
          </p>

          <h2>Sigilo profissional</h2>
          <p>
            As informações compartilhadas no contexto de consulta ou de atendimento estão protegidas
            pelo sigilo profissional do advogado, nos termos do Estatuto da Advocacia e do Código de
            Ética e Disciplina. Esse dever é mais amplo que esta política e prevalece sobre ela.
          </p>

          <h2>Seus direitos</h2>
          <p>
            A legislação brasileira de proteção de dados assegura, entre outros, os direitos de
            confirmação de tratamento, acesso, correção, anonimização, portabilidade e eliminação de
            dados pessoais. Para exercê-los, utilize os canais indicados na página de contato. O
            pedido é respondido no prazo legal, observadas as hipóteses em que a guarda da informação
            é obrigatória por dever profissional ou legal.
          </p>

          <h2>Alterações</h2>
          <p>
            Qualquer mudança no funcionamento do site que afete o tratamento de dados será refletida
            nesta página, com atualização da data acima.
          </p>
        </div>

        <p className="mt-12">
          <Link
            href="/contato"
            className="underline decoration-verde underline-offset-[0.3em] transition-colors hover:text-verde"
          >
            Ir para a página de contato
          </Link>
        </p>
      </div>
    </Secao>
  );
}

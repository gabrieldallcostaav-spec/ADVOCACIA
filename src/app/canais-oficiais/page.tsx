import type { Metadata } from 'next';
import { CanaisDeContato } from '@/components/ui/CanaisDeContato';
import { Migalhas } from '@/components/ui/Migalhas';
import { Secao } from '@/components/ui/Secao';
import { JsonLd, metadadosDaPagina, migalhas } from '@/lib/seo';
import { site } from '@/config/site';

export const metadata: Metadata = metadadosDaPagina({
  titulo: 'Canais oficiais e verificação',
  descricao: `Quais são os canais oficiais de ${site.nomeCompleto}, ${site.oab}, e como confirmar a identidade de quem entra em contato em nome da advocacia.`,
  caminho: '/canais-oficiais',
});

/** Links oficiais conferidos em 23/10/2026. */
const verificacao = [
  {
    titulo: 'Cadastro Nacional dos Advogados (CNA)',
    descricao:
      'Consulta pública mantida pelo Conselho Federal da OAB. Permite conferir nome, número de inscrição e seccional de um advogado.',
    url: 'https://cna.oab.org.br/',
  },
  {
    titulo: 'ConfirmADV',
    descricao:
      'Plataforma da OAB para verificação de identidade profissional, criada no contexto da campanha nacional contra o golpe do falso advogado.',
    url: 'https://confirmadv.oab.org.br/',
  },
  {
    titulo: 'Campanha da OAB sobre o golpe do falso advogado',
    descricao: 'Orientações oficiais do Conselho Federal sobre como a fraude costuma ser aplicada.',
    url: 'https://www.oab.org.br/noticia/63063/oab-lanca-campanha-nacional-e-plataforma-de-verificacao-contra-golpe-do-falso-advogado',
  },
  {
    titulo: 'Orientações da OAB Rondônia',
    descricao: 'Alerta da seccional sobre falsos advogados e o fluxo de denúncia no estado.',
    url: 'https://www.oab-ro.org.br/oab-rondonia-alerta-sociedade-sobre-golpes-de-falsos-advogados-e-orienta-sobre-fluxo-de-denuncias/',
  },
];

export default function CanaisOficiais() {
  return (
    <>
      <Secao>
        <Migalhas itens={[{ rotulo: 'Início', href: '/' }, { rotulo: 'Canais oficiais' }]} />

        <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-7">
            <h1 className="text-[clamp(2.25rem,1.5rem+3vw,3.5rem)]">Canais oficiais e verificação</h1>
            <p className="mt-7 max-w-[56ch] text-[1.0625rem] leading-relaxed text-tinta-suave">
              Esta página reúne os canais pelos quais a advocacia se comunica e mostra como qualquer
              pessoa pode confirmar, em fontes da própria OAB, a identidade de um advogado.
            </p>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-[2rem] bg-papel-fundo p-8">
              <h2 className="capitular font-sans text-tinta-tenue">Identificação</h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed">
                {site.nomeCompleto}
                <br />
                {site.oab}
                <br />
                {site.cidadeBase}/{site.uf}
              </p>
              <p className="mt-5 text-nota text-tinta-tenue">
                Domínio oficial: <span className="text-tinta">{site.dominio.replace(/^https?:\/\//, '')}</span>
              </p>
            </div>
          </div>
        </div>
      </Secao>

      <Secao className="bg-papel-fundo/50" espacamento="normal">
        <div className="grid gap-12 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-5">
            <h2 className="text-[clamp(1.75rem,1.3rem+2vw,2.5rem)]">Os canais em uso</h2>
            <p className="mt-6 max-w-[42ch] text-[0.9375rem] leading-relaxed text-tinta-suave">
              São estes os meios pelos quais a advocacia entra em contato e recebe mensagens. Qualquer
              outro número, endereço ou perfil que se apresente em nome do escritório deve ser
              conferido antes de qualquer providência.
            </p>
          </div>
          <div className="md:col-span-7">
            <CanaisDeContato />
          </div>
        </div>
      </Secao>

      <Secao espacamento="normal">
        <div className="max-w-[46rem]">
          <h2 className="text-[clamp(1.75rem,1.3rem+2vw,2.5rem)]">Como confirmar uma comunicação</h2>
          <div className="mt-7 space-y-5 text-[1.0625rem] leading-relaxed text-tinta-suave">
            <p>
              Se você recebeu uma mensagem, uma ligação ou um pedido de pagamento apresentado como
              sendo deste escritório e tem qualquer dúvida, o caminho seguro é o mesmo em todos os
              casos: <strong className="font-medium text-tinta">não responda pelo canal que recebeu</strong> e
              procure a confirmação por um contato que você já conhecia antes — o número registrado na
              sua agenda, o endereço de e-mail do contrato ou os canais publicados nesta página.
            </p>
            <p>
              Desconfie de urgência. Pressa para decidir, prazo que vence hoje e insistência para
              tratar de dinheiro por mensagem são as características mais comuns da fraude conhecida
              como golpe do falso advogado, em que alguém se apresenta como o advogado de uma pessoa
              para obter transferências.
            </p>
            <p>
              Antes de qualquer pagamento, confirme diretamente comigo os dados e a finalidade,
              usando um canal conhecido. Nenhuma instrução financeira deve ser cumprida apenas
              porque chegou por mensagem.
            </p>
            <p>
              Você também pode conferir, de forma independente, se a pessoa que falou com você é
              mesmo advogada inscrita, nos serviços oficiais abaixo.
            </p>
          </div>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-[2rem] bg-linha sm:grid-cols-2">
          {verificacao.map((item) => (
            <li key={item.url} className="bg-papel p-8">
              <h3 className="font-display text-xl font-medium leading-snug">{item.titulo}</h3>
              <p className="mt-3 max-w-[42ch] text-[0.9375rem] leading-relaxed text-tinta-suave">
                {item.descricao}
              </p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-[0.9375rem] underline decoration-verde underline-offset-[0.3em] transition-colors hover:text-verde"
              >
                Abrir a página oficial
                <span className="sr-only">(abre em nova aba)</span>
                <span aria-hidden>→</span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-[62ch] text-nota text-tinta-tenue">
          Os serviços acima são mantidos pela OAB e funcionam de forma independente deste site.
          Consultá-los é uma conferência feita por você, não uma certificação emitida aqui. Esta
          página não publica dados bancários, contratos ou informações de clientes.
        </p>
      </Secao>

      <JsonLd
        dados={migalhas([
          { nome: 'Início', caminho: '/' },
          { nome: 'Canais oficiais', caminho: '/canais-oficiais' },
        ])}
      />
    </>
  );
}

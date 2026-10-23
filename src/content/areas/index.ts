/**
 * Áreas de atuação.
 *
 * Fonte única para a home, o índice `/atuacao`, as páginas `/atuacao/[slug]`
 * e os dados estruturados. Para desabilitar uma área, troque `status` para
 * 'rascunho' — ela sai da navegação, do sitemap e do site público.
 */

export type PerguntaFrequente = {
  pergunta: string;
  resposta: string;
};

export type Area = {
  slug: string;
  titulo: string;
  /** Até duas linhas; aparece na home e no índice. */
  resumo: string;
  /** Abertura da página da área. */
  descricao: string;
  /** Situações abrangidas, em linguagem comum. */
  situacoes: string[];
  /** Parágrafos do corpo da página. */
  corpo: string[];
  perguntas: PerguntaFrequente[];
  ordem: number;
  status: 'publicado' | 'rascunho';
  /** Aparece no resumo da home quando true. */
  destaqueNaHome: boolean;
};

export const areas: Area[] = [
  {
    slug: 'direito-civil-e-contratos',
    titulo: 'Direito Civil e Contratos',
    resumo:
      'Relações patrimoniais, obrigações e responsabilidade civil, da redação do contrato à discussão judicial.',
    descricao:
      'A maior parte das questões civis começa antes do conflito: num contrato mal redigido, numa obrigação sem prova de cumprimento, num prejuízo que ninguém documentou. A atuação cobre as duas pontas — organizar o documento para evitar a disputa e conduzir a disputa quando ela já existe.',
    situacoes: [
      'Elaboração, revisão e rescisão de contratos entre particulares e empresas',
      'Cobrança de valores e discussão de dívidas',
      'Responsabilidade civil e pedidos de reparação por dano material ou moral',
      'Questões de propriedade, posse e negócios imobiliários',
      'Descumprimento de obrigações e execução de títulos',
    ],
    corpo: [
      'O trabalho começa pela leitura dos documentos e pela reconstituição do que de fato aconteceu: o que foi combinado, o que foi cumprido, o que ficou registrado. Só depois disso é possível dizer o que o direito permite pedir e com que chance de êxito.',
      'Quando a via judicial é necessária, o pedido é delimitado com o que a prova disponível sustenta. Quando não é, a solução costuma ser mais rápida e mais barata por acordo, notificação ou renegociação — e isso também é dito com clareza.',
    ],
    perguntas: [
      {
        pergunta: 'Posso revisar um contrato que já assinei?',
        resposta:
          'A revisão de um contrato em vigor depende do que foi pactuado e do motivo invocado. É uma análise individual: o ponto de partida é a leitura do contrato e dos documentos da negociação.',
      },
      {
        pergunta: 'Quais documentos levar na primeira consulta?',
        resposta:
          'O contrato ou o documento que originou a questão, comprovantes de pagamento e a correspondência trocada entre as partes. Se não houver contrato escrito, mensagens e recibos ajudam a reconstituir o combinado.',
      },
    ],
    ordem: 1,
    status: 'publicado',
    destaqueNaHome: true,
  },
  {
    slug: 'direito-de-familia-e-sucessoes',
    titulo: 'Direito de Família e Sucessões',
    resumo:
      'Divórcio, guarda, alimentos, inventário e partilha, com atenção ao que a decisão significa para a família.',
    descricao:
      'São processos em que a técnica jurídica resolve uma parte do problema e a condução resolve a outra. A orientação é explicar as alternativas com honestidade, inclusive quando o caminho mais sensato é o acordo, e conduzir o procedimento sem ampliar o desgaste entre as pessoas envolvidas.',
    situacoes: [
      'Divórcio e dissolução de união estável, consensual ou litigioso',
      'Guarda, convivência e regulamentação de visitas',
      'Fixação, revisão e execução de alimentos',
      'Reconhecimento e dissolução de união estável',
      'Inventário, partilha e planejamento sucessório',
      'Testamento e questões entre herdeiros',
    ],
    corpo: [
      'Cada caso começa com uma conversa sobre o que já está definido entre as partes e o que ainda está em disputa. Quando há consenso, o procedimento pode ser extrajudicial e bem mais rápido; quando não há, o processo judicial é organizado em torno do que efetivamente precisa ser decidido.',
      'Em questões que envolvem crianças e adolescentes, o critério de condução é a estabilidade da rotina deles. Isso orienta tanto o que se pede quanto o que se evita pedir.',
    ],
    perguntas: [
      {
        pergunta: 'Divórcio consensual precisa de processo judicial?',
        resposta:
          'Nem sempre. Havendo acordo entre as partes e atendidos os requisitos legais, o divórcio pode ser feito por escritura pública em cartório. A existência de filhos menores ou incapazes e a forma da partilha influenciam essa definição.',
      },
      {
        pergunta: 'Quanto tempo leva um inventário?',
        resposta:
          'Depende do consenso entre os herdeiros, da natureza dos bens e da regularidade da documentação. O inventário extrajudicial, quando cabível, costuma ser mais rápido que o judicial. A estimativa só é possível depois de examinar a documentação.',
      },
    ],
    ordem: 2,
    status: 'publicado',
    destaqueNaHome: true,
  },
  {
    slug: 'direito-administrativo',
    titulo: 'Direito Administrativo',
    resumo:
      'Relações entre o cidadão, a empresa e a administração pública: atos, contratos, licitações e processos.',
    descricao:
      'A administração pública decide por procedimento, e procedimento tem forma, prazo e motivação. Boa parte das questões administrativas se resolve demonstrando onde a forma não foi observada — no processo administrativo, antes de chegar ao Judiciário.',
    situacoes: [
      'Defesa em processos administrativos e disciplinares',
      'Questões de servidores públicos: posse, remuneração, enquadramento e penalidades',
      'Licitações e contratos administrativos: impugnação, recurso e execução contratual',
      'Revisão de atos administrativos, multas e sanções',
      'Pedidos de informação e acesso a documentos públicos',
    ],
    corpo: [
      'O exame começa pelo processo administrativo e pela decisão impugnada: qual a competência de quem decidiu, qual a motivação apresentada, qual o prazo em curso. Prazo administrativo perdido limita muito o que ainda é possível fazer, então a primeira providência costuma ser identificá-lo.',
      'Sempre que a via administrativa ainda estiver aberta, ela é esgotada antes de propor ação. É mais rápido, custa menos e, com frequência, resolve.',
    ],
    perguntas: [
      {
        pergunta: 'Recebi uma notificação de processo administrativo. O que fazer?',
        resposta:
          'Verificar imediatamente o prazo de defesa indicado na notificação e obter cópia integral do processo. A defesa precisa ser apresentada dentro do prazo e endereçada ao que consta da acusação, não ao que se imagina sobre ela.',
      },
      {
        pergunta: 'Preciso esgotar a via administrativa antes de ir ao Judiciário?',
        resposta:
          'Como regra, o acesso ao Judiciário não depende disso. Ainda assim, a via administrativa costuma ser mais rápida e pode resolver a questão — a escolha entre as duas é analisada caso a caso.',
      },
    ],
    ordem: 3,
    status: 'publicado',
    destaqueNaHome: true,
  },
  {
    slug: 'direito-do-consumidor',
    titulo: 'Direito do Consumidor',
    resumo:
      'Produtos, serviços, bancos, planos de saúde e contratos de consumo com cláusulas discutíveis.',
    descricao:
      'A relação de consumo tem regras próprias de prova, prazo e responsabilidade. Saber qual delas se aplica à situação muda o que se pode exigir e de quem — do fornecedor direto, da instituição financeira ou da operadora.',
    situacoes: [
      'Produto com defeito, serviço mal prestado e descumprimento de oferta',
      'Cobranças indevidas, negativação e inscrição em cadastros de inadimplentes',
      'Contratos bancários, financiamentos e cláusulas abusivas',
      'Planos de saúde: negativa de cobertura e reajustes',
      'Serviços essenciais e contratos de prestação continuada',
    ],
    corpo: [
      'O primeiro passo é reunir o registro da reclamação: protocolo, contrato, faturas e a resposta do fornecedor. É isso que diferencia um pedido sustentável de uma alegação sem prova.',
      'Nem toda frustração em uma compra gera direito a indenização, e dizer isso faz parte do trabalho. Quando há fundamento, o pedido é dimensionado com base no que ocorreu e no que a documentação demonstra — sem estimativas de valor feitas antes da análise.',
    ],
    perguntas: [
      {
        pergunta: 'Fui negativado por uma dívida que não reconheço. O que fazer?',
        resposta:
          'Solicitar o extrato do cadastro de inadimplentes e a origem da dívida ao credor. A documentação da cobrança define se o caso é de inexistência do débito, de cobrança irregular ou de dívida legítima em discussão.',
      },
      {
        pergunta: 'O plano de saúde negou um procedimento. Isso pode ser discutido?',
        resposta:
          'A negativa precisa ser analisada junto ao contrato, à prescrição médica e à norma aplicável à cobertura. Peça sempre a negativa por escrito com a justificativa — ela é o documento central da análise.',
      },
    ],
    ordem: 4,
    status: 'publicado',
    destaqueNaHome: true,
  },
];

/**
 * Nota aprovada pelo responsável: demandas fora das áreas acima podem ser
 * conduzidas em parceria. Texto informativo, sem afirmação de especialidade.
 */
export const notaParcerias =
  'Demandas de outras áreas são avaliadas individualmente e, quando pertinente, conduzidas em conjunto com advogados parceiros.';

export const areasPublicadas = areas
  .filter((area) => area.status === 'publicado')
  .sort((a, b) => a.ordem - b.ordem);

export const areasDaHome = areasPublicadas.filter((area) => area.destaqueNaHome);

export function buscarArea(slug: string): Area | undefined {
  return areasPublicadas.find((area) => area.slug === slug);
}

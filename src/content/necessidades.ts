import { areasPublicadas } from '@/content/areas';

/**
 * Navegação por necessidades.
 *
 * Mesma informação das áreas, dita na linguagem de quem procura. Cada entrada
 * aponta para uma página de área que já existe — não há conteúdo duplicado nem
 * página criada só para captar busca.
 *
 * Regras: rótulo curto e concreto; nenhum diagnóstico sobre o direito do
 * visitante; nenhuma estimativa de êxito; nenhuma coleta de dados para navegar.
 */
export type Necessidade = {
  rotulo: string;
  descricao: string;
  /** Slug de uma área publicada. */
  area: string;
};

const todas: Necessidade[] = [
  {
    rotulo: 'Vou me separar',
    descricao: 'Divórcio, união estável, guarda dos filhos e divisão de bens.',
    area: 'direito-de-familia-e-sucessoes',
  },
  {
    rotulo: 'Alguém da família faleceu',
    descricao: 'Inventário, partilha e as dúvidas entre herdeiros.',
    area: 'direito-de-familia-e-sucessoes',
  },
  {
    rotulo: 'Pensão de alimentos',
    descricao: 'Fixação, revisão e cobrança do valor combinado ou decidido.',
    area: 'direito-de-familia-e-sucessoes',
  },
  {
    rotulo: 'Vou assinar um contrato',
    descricao: 'Elaboração e revisão antes de assinar, para saber a que você se obriga.',
    area: 'direito-civil-e-contratos',
  },
  {
    rotulo: 'Estão me cobrando algo',
    descricao: 'Cobrança, dívida em discussão, negativação e protesto.',
    area: 'direito-do-consumidor',
  },
  {
    rotulo: 'Comprei e deu problema',
    descricao: 'Produto com defeito, serviço mal prestado e oferta não cumprida.',
    area: 'direito-do-consumidor',
  },
  {
    rotulo: 'O plano de saúde negou',
    descricao: 'Negativa de cobertura, reajuste e cláusulas do contrato.',
    area: 'direito-do-consumidor',
  },
  {
    rotulo: 'Recebi uma notificação do poder público',
    descricao: 'Processo administrativo, multa, sanção ou questão de servidor público.',
    area: 'direito-administrativo',
  },
];

/** Só aparecem as necessidades cuja área está efetivamente publicada. */
export const necessidades = todas.filter((item) =>
  areasPublicadas.some((area) => area.slug === item.area),
);

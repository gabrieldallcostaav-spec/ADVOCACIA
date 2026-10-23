/**
 * Configuração central do site.
 *
 * Este é o único lugar que precisa ser editado para trocar contatos, habilitar
 * áreas de atuação, publicar o site ou ajustar a identificação profissional.
 *
 * Regra do projeto: campo ausente é `null`, nunca uma string como "a definir".
 * Os componentes só renderizam o que existe de verdade.
 */

export type Endereco = {
  logradouro: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  /** Link externo para abrir o mapa (não há mapa embutido no site). */
  linkMapa: string;
};

export type RedeSocial = {
  nome: string;
  url: string;
};

export type SiteConfig = {
  marca: string;
  nomeCompleto: string;
  nomeApresentacao: string;
  /** Sobrenome de família, usado no campo N da vCard. */
  nomeFamilia: string;
  oab: string;
  cidadeBase: string;
  uf: string;
  /** Domínio definitivo, sem barra final. Usado em canonical, sitemap e OG. */
  dominio: string;
  /** Somente dígitos, formato internacional (ex.: '5569999999999'). */
  whatsapp: string | null;
  mensagemWhatsapp: string;
  email: string | null;
  telefone: string | null;
  endereco: Endereco | null;
  horarios: string[] | null;
  redes: RedeSocial[];
  /**
   * Retratos profissionais. Enquanto null, o site usa a composição
   * tipográfica da marca no lugar da fotografia — sem rosto genérico.
   */
  fotos: {
    /** Primeira dobra da home. */
    heroRetrato: string | null;
    /** Seção de apresentação na home. */
    perfilRetrato: string | null;
    /** Página /sobre. */
    sobreRetrato: string | null;
    /** Cartão profissional digital. */
    cartaoRetrato: string | null;
  };
  /**
   * Vídeo de apresentação. Enquanto `arquivo` for null, o player não é
   * renderizado — nada de controle quebrado na tela.
   */
  video: {
    arquivo: string | null;
    capa: string | null;
    /** Faixa de legendas WebVTT. Obrigatória para publicar o vídeo. */
    legendas: string | null;
    /** Caminho da transcrição em texto, exibida junto ao vídeo. */
    transcricao: string | null;
    duracaoSegundos: number | null;
  };
  /**
   * Assistente de navegação (fase 3). Desativado até revisão do responsável.
   * Quando ligado, responde apenas com conteúdo já publicado no site.
   */
  assistenteDeNavegacao: boolean;
  /**
   * Confirmações do responsável. Enquanto falsas, o site não afirma
   * atendimento ativo nem anuncia modalidades não verificadas.
   */
  atendimentoAtivo: boolean;
  atendimentoPorVideoconferencia: boolean;
  /** Formulário só aparece quando houver provedor de e-mail configurado. */
  formularioHabilitado: boolean;
  /** Nome do provedor de hospedagem, citado na política de privacidade. */
  provedorHospedagem: string | null;
  /** Analytics: desabilitado nesta versão. */
  analyticsHabilitado: boolean;
  /**
   * Fatos operacionais citados na política de privacidade.
   *
   * Enquanto forem null, a página explica o critério aplicável sem afirmar
   * prazos ou pessoas que não foram confirmados. Preenchidos, passam a aparecer
   * com a precisão informada. Nunca preencher com exemplo.
   */
  privacidade: {
    /** Prazos concretos de conservação, um por linha. */
    prazosDeConservacao: string[] | null;
    /** Quem, além do advogado, tem acesso às mensagens recebidas. */
    quemTemAcesso: string | null;
  };
};

export const site: SiteConfig = {
  marca: 'Dalla Costa Advocacia',
  nomeCompleto: 'Gabriel Santos Dalla Costa',
  nomeApresentacao: 'Gabriel Dalla Costa',
  nomeFamilia: 'Dalla Costa',
  oab: 'OAB/RO 13.552',
  cidadeBase: 'Ariquemes',
  uf: 'RO',

  dominio: 'https://advocaciadallacosta.com.br',

  // 55 (país) + 69 (DDD) + número.
  whatsapp: '5569981043945',
  mensagemWhatsapp: 'Olá, gostaria de informações sobre o atendimento.',
  // PENDENTE: e-mail profissional. Enquanto for null, o canal não aparece.
  email: null,
  telefone: null,
  endereco: null,
  horarios: null,
  redes: [],

  fotos: {
    heroRetrato: '/images/retrato-hero.jpg',
    perfilRetrato: '/images/retrato-alternativo.jpg',
    sobreRetrato: '/images/retrato-sobre.jpg',
    cartaoRetrato: '/images/retrato-sobre.jpg',
  },

  // PENDENTE: vídeo real aprovado. Roteiro em docs/MIDIA_E_ROTEIRO.md.
  video: {
    arquivo: null,
    capa: null,
    legendas: null,
    transcricao: null,
    duracaoSegundos: null,
  },

  assistenteDeNavegacao: false,

  atendimentoAtivo: true,
  atendimentoPorVideoconferencia: true,
  formularioHabilitado: false,

  // PENDENTE: informar o provedor escolhido (ex.: 'Vercel') ao publicar.
  provedorHospedagem: null,
  analyticsHabilitado: false,

  // PENDENTE: confirmar com o responsável. Ver docs/PRIVACIDADE_PENDENCIAS.md.
  privacidade: {
    prazosDeConservacao: null,
    quemTemAcesso: null,
  },
};

/**
 * Modo prévia: exibe conteúdo demonstrativo identificado e aplica `noindex`.
 * Em produção, defina NEXT_PUBLIC_MODO_PREVIA=false.
 */
export const modoPrevia = process.env.NEXT_PUBLIC_MODO_PREVIA !== 'false';

export const identificacao = `${site.nomeCompleto} · ${site.oab} · ${site.cidadeBase}/${site.uf}`;

/**
 * Link do WhatsApp. A mensagem inicial é sempre neutra: nunca entra relato do
 * caso, dado pessoal ou conteúdo de formulário na URL.
 */
export function linkWhatsapp(mensagem: string = site.mensagemWhatsapp): string | null {
  if (!site.whatsapp) return null;
  const numero = site.whatsapp.replace(/\D/g, '');
  if (numero.length < 12) return null;
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

/** Mensagem inicial para assuntos de proteção de dados. */
export const mensagemPrivacidade =
  'Olá. Gostaria de informações sobre o tratamento dos meus dados pessoais.';

/** (69) 9 8104-3945 — formato legível para exibir ao visitante. */
export function whatsappFormatado(): string | null {
  if (!site.whatsapp) return null;
  const numero = site.whatsapp.replace(/\D/g, '');
  const casa = /^55(\d{2})(\d{4,5})(\d{4})$/.exec(numero);
  if (!casa) return null;
  const [, ddd, prefixo, sufixo] = casa;
  return prefixo.length === 5
    ? `(${ddd}) ${prefixo[0]} ${prefixo.slice(1)}-${sufixo}`
    : `(${ddd}) ${prefixo}-${sufixo}`;
}

export function linkEmail(): string | null {
  return site.email ? `mailto:${site.email}` : null;
}

/** Há pelo menos um canal real publicável? */
export function temCanalDeContato(): boolean {
  return Boolean(linkWhatsapp() || site.email || site.telefone);
}

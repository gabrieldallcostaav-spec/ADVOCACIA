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
    heroRetrato: string | null;
    sobreRetrato: string | null;
  };
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
};

export const site: SiteConfig = {
  marca: 'Dalla Costa Advocacia',
  nomeCompleto: 'Gabriel Santos Dalla Costa',
  nomeApresentacao: 'Gabriel Dalla Costa',
  oab: 'OAB/RO 13.552',
  cidadeBase: 'Ariquemes',
  uf: 'RO',

  // PENDENTE: substituir pelo domínio definitivo antes de publicar.
  dominio: 'https://www.dallacostaadvocacia.com.br',

  // PENDENTE: informar os canais reais. Enquanto forem null, o site não
  // exibe link de WhatsApp nem endereço de e-mail.
  whatsapp: null,
  mensagemWhatsapp: 'Olá, gostaria de informações sobre o atendimento.',
  email: null,
  telefone: null,
  endereco: null,
  horarios: null,
  redes: [],

  // PENDENTE: fotografia profissional real. Ver docs/CONTEUDO_E_PENDENCIAS.md.
  fotos: {
    heroRetrato: null,
    sobreRetrato: null,
  },

  atendimentoAtivo: true,
  atendimentoPorVideoconferencia: true,
  formularioHabilitado: false,

  // PENDENTE: informar o provedor escolhido (ex.: 'Vercel') ao publicar.
  provedorHospedagem: null,
  analyticsHabilitado: false,
};

/**
 * Modo prévia: exibe conteúdo demonstrativo identificado e aplica `noindex`.
 * Em produção, defina NEXT_PUBLIC_MODO_PREVIA=false.
 */
export const modoPrevia = process.env.NEXT_PUBLIC_MODO_PREVIA !== 'false';

export const identificacao = `${site.nomeCompleto} · ${site.oab} · ${site.cidadeBase}/${site.uf}`;

export function linkWhatsapp(): string | null {
  if (!site.whatsapp) return null;
  const numero = site.whatsapp.replace(/\D/g, '');
  if (numero.length < 12) return null;
  return `https://wa.me/${numero}?text=${encodeURIComponent(site.mensagemWhatsapp)}`;
}

export function linkEmail(): string | null {
  return site.email ? `mailto:${site.email}` : null;
}

/** Há pelo menos um canal real publicável? */
export function temCanalDeContato(): boolean {
  return Boolean(linkWhatsapp() || site.email || site.telefone);
}

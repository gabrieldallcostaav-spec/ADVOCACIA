import { areasPublicadas } from '@/content/areas';
import { guiasPublicados } from '@/lib/guias';
import { artigosPublicados } from '@/lib/articles';
import { canaisDisponiveis } from '@/components/ui/CanaisDeContato';
import { site } from '@/config/site';

/**
 * Conteúdo do assistente de navegação.
 *
 * Tudo aqui é derivado da configuração e do conteúdo já publicado. O assistente
 * não interpreta texto livre, não opina sobre casos e não inventa fatos: ele
 * encontra páginas que existem. Cada resposta carrega a origem da informação.
 */
export type OpcaoAssistente = {
  id: string;
  pergunta: string;
  resposta: string;
  destinos: { rotulo: string; href: string; externo?: boolean }[];
  /** Página de onde a informação vem, mostrada ao visitante. */
  origem: { rotulo: string; href: string };
};

export function opcoesDoAssistente(): OpcaoAssistente[] {
  const opcoes: OpcaoAssistente[] = [];

  if (areasPublicadas.length > 0) {
    opcoes.push({
      id: 'areas',
      pergunta: 'Quais áreas são atendidas?',
      resposta: `São ${areasPublicadas.length} áreas atendidas diretamente. Escolha uma para ler o escopo e as situações abrangidas.`,
      destinos: areasPublicadas.map((area) => ({
        rotulo: area.titulo,
        href: `/atuacao/${area.slug}`,
      })),
      origem: { rotulo: 'Áreas de atuação', href: '/atuacao' },
    });
  }

  const canais = canaisDisponiveis();
  if (canais.length > 0) {
    const modalidade = site.atendimentoPorVideoconferencia
      ? `Atendimento presencial em ${site.cidadeBase}/${site.uf} e por videoconferência.`
      : `Atendimento em ${site.cidadeBase}/${site.uf}.`;
    const horarios = site.horarios ? ` Horários: ${site.horarios.join('; ')}.` : '';

    opcoes.push({
      id: 'contato',
      pergunta: 'Como entro em contato?',
      resposta: `${modalidade}${horarios}`,
      destinos: [
        ...canais.map((canal) => ({ rotulo: canal.rotulo, href: canal.href, externo: canal.externo })),
        { rotulo: 'Página de contato', href: '/contato' },
      ],
      origem: { rotulo: 'Contato', href: '/contato' },
    });
  }

  opcoes.push({
    id: 'agendamento',
    pergunta: 'Como marco uma consulta?',
    resposta:
      'A consulta é combinada pelos canais de contato: você descreve a questão em linhas gerais e recebe a orientação sobre o agendamento e os documentos úteis. Não há reserva automática neste site.',
    destinos: [{ rotulo: 'Ver os canais de contato', href: '/contato' }],
    origem: { rotulo: 'Contato', href: '/contato' },
  });

  const materiais = [
    ...guiasPublicados().map((guia) => ({ rotulo: guia.titulo, href: `/guias/${guia.slug}` })),
    ...artigosPublicados().map((artigo) => ({ rotulo: artigo.titulo, href: `/conteudos/${artigo.slug}` })),
  ].slice(0, 6);

  if (materiais.length > 0) {
    opcoes.push({
      id: 'materiais',
      pergunta: 'Tem algum material para ler?',
      resposta: 'Estes são os textos e guias publicados.',
      destinos: materiais,
      origem: { rotulo: 'Guias', href: '/guias' },
    });
  }

  opcoes.push({
    id: 'identificacao',
    pergunta: 'Quem é o advogado responsável?',
    resposta: `${site.nomeCompleto}, inscrito na ${site.oab}, com atuação em ${site.cidadeBase}/${site.uf}.`,
    destinos: [
      { rotulo: 'Perfil profissional', href: '/sobre' },
      { rotulo: 'Canais oficiais e verificação', href: '/canais-oficiais' },
    ],
    origem: { rotulo: 'Perfil profissional', href: '/sobre' },
  });

  opcoes.push({
    id: 'caso',
    pergunta: 'Tenho uma dúvida sobre o meu caso',
    resposta:
      'Uma questão concreta depende de análise individual dos documentos e dos fatos — não é algo que eu possa avaliar por aqui. O caminho é falar diretamente com o advogado.',
    destinos: [{ rotulo: 'Ir para o contato', href: '/contato' }],
    origem: { rotulo: 'Contato', href: '/contato' },
  });

  return opcoes;
}

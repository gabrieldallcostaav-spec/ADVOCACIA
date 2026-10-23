/**
 * Perfil profissional.
 *
 * Contém apenas o que foi confirmado pelo responsável: nome, inscrição,
 * cidade-base e a descrição da forma de trabalho. Formação, titulação e
 * atividade acadêmica permanecem fora do site até conferência documental
 * (ver docs/CONTEUDO_E_PENDENCIAS.md).
 */

export const perfil = {
  resumoCurto: [
    'Advogado inscrito na OAB/RO, com atuação em Ariquemes e região. O trabalho é conduzido pessoalmente, da primeira conversa à conclusão da questão: quem analisa o caso é quem acompanha o processo.',
    'A orientação é explicar o que está em discussão em linguagem compreensível, dizer com honestidade o que a documentação sustenta e delimitar o que pode ser feito — inclusive quando a resposta é que não vale a pena litigar.',
  ],

  biografia: [
    'Gabriel Santos Dalla Costa é advogado inscrito na Ordem dos Advogados do Brasil, Seção de Rondônia, sob o nº 13.552, com atuação em Ariquemes e região.',
    'A prática é individual e conduzida diretamente pelo advogado. Cada questão começa pela leitura dos documentos e pela reconstituição dos fatos antes de qualquer definição de estratégia — é esse exame que determina o que se pode pedir, com que fundamento e com que grau de segurança.',
    'A comunicação com quem contrata é parte do trabalho, não um acessório dele. Termos técnicos são explicados, prazos são informados, e a avaliação sobre as chances de um pedido é apresentada como ela é, sem promessa de resultado. Quando a solução mais sensata não é a judicial, essa também é a orientação dada.',
    'Demandas que excedem as áreas atendidas diretamente são avaliadas caso a caso e, quando pertinente, conduzidas em conjunto com advogados parceiros.',
  ],

  comoTrabalho: [
    {
      titulo: 'Análise antes de estratégia',
      texto:
        'Documentos primeiro. A definição do que pedir vem depois de entender o que a prova disponível sustenta.',
    },
    {
      titulo: 'Linguagem compreensível',
      texto:
        'O cliente precisa entender a própria questão. Explicar o que está em jogo faz parte do serviço.',
    },
    {
      titulo: 'Escopo delimitado',
      texto:
        'O que será feito, em que prazo e com que limites fica combinado por escrito antes de começar.',
    },
    {
      titulo: 'Condução direta',
      texto:
        'Quem recebe o caso é quem o acompanha. Não há intermediação entre o cliente e o advogado.',
    },
  ],
};

export const etapasAtendimento = [
  {
    titulo: 'Contato inicial',
    texto:
      'Você entra em contato pelos canais disponíveis e informa, em linhas gerais, qual é a questão. Nesse momento não é necessário enviar documentos.',
  },
  {
    titulo: 'Consulta',
    texto:
      'A consulta é agendada, presencial em Ariquemes ou por videoconferência, e os documentos pertinentes são indicados previamente.',
  },
  {
    titulo: 'Análise individual',
    texto:
      'Os documentos e os fatos são examinados para identificar o que está em discussão, quais caminhos existem e quais são os limites de cada um.',
  },
  {
    titulo: 'Escopo e próximos passos',
    texto:
      'Havendo contratação, o que será feito, os prazos e as responsabilidades de cada parte são alinhados por escrito.',
  },
];

export const perguntasFrequentes = [
  {
    pergunta: 'Como funciona o primeiro contato?',
    resposta:
      'Você descreve a questão em linhas gerais pelos canais de contato e recebe a orientação sobre como a consulta é agendada e quais documentos serão úteis. O primeiro contato não exige envio de documentos nem detalhamento do caso.',
  },
  {
    pergunta: 'O atendimento é presencial ou por videoconferência?',
    resposta:
      'As duas modalidades estão disponíveis. O atendimento presencial é feito em Ariquemes/RO e a videoconferência atende quem está em outra cidade ou prefere a modalidade remota.',
  },
  {
    pergunta: 'Quais documentos devo separar para a consulta?',
    resposta:
      'Depende da questão. Como regra, o documento que originou o problema (contrato, notificação, decisão, fatura), comprovantes relacionados e a correspondência trocada entre as partes. A lista específica é indicada no agendamento.',
  },
  {
    pergunta: 'Posso enviar documentos no primeiro contato?',
    resposta:
      'Prefira não enviar. Documentos, senhas e informações sensíveis devem ser tratados na consulta, não em uma mensagem inicial. O envio de uma mensagem também não formaliza contratação nem acompanhamento de prazos.',
  },
  {
    pergunta: 'É possível saber o resultado antes de contratar?',
    resposta:
      'Não. Nenhum advogado pode garantir resultado. O que a consulta oferece é a análise do que a documentação sustenta, quais são os caminhos possíveis e quais riscos cada um envolve.',
  },
  {
    pergunta: 'Em quanto tempo recebo retorno?',
    resposta:
      'O retorno é dado assim que possível dentro do horário de atendimento. O site não garante resposta imediata e os canais de contato não devem ser usados para questões com prazo em curso sem a confirmação de que a mensagem foi recebida.',
  },
];

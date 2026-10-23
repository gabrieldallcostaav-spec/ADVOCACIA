# Agendamento e controle de contatos — fase 2

**Estado: especificado, não implementado.** Nenhuma interface de agendamento foi construída, nenhum horário é oferecido e nenhuma reserva existe. O site diz, na página de contato e no assistente, que a consulta é combinada pelos canais de contato — que é exatamente o que acontece hoje.

Esta decisão é deliberada: construir a tela sem a base por trás produziria um formulário que não entrega nada ou um horário que o visitante acha que reservou e não reservou.

## 1. O que falta, concretamente

| # | Dependência | Por que é necessária | Quem resolve |
| --- | --- | --- | --- |
| 1 | **Um servidor.** Hoje o site é estático, publicado como arquivos no Cloudflare. Não existe nada que receba um envio. | Qualquer solicitação precisa chegar a algum lugar. | Decisão técnica: Cloudflare Worker com D1 (SQLite gerenciado) é o caminho natural, já que a hospedagem é Cloudflare. |
| 2 | **Banco de dados.** | Guardar solicitações e reservas. `localStorage` não serve: é do navegador de quem visitou, some e não é visto por você. | Cloudflare D1, a ser criado na sua conta. |
| 3 | **Provedor de envio de e-mail** com domínio autorizado (SPF/DKIM). | Confirmar a solicitação a quem pediu e avisar você. Sem isso, o envio cai em spam ou nem sai. | Contratação/configuração sua. |
| 4 | **Autenticação** para a área interna. | `/gestao` guarda dados pessoais de quem procurou o escritório. Esconder o link não é proteção. | Provedor a escolher. |
| 5 | **As regras operacionais.** | Duração da consulta, dias, horários, intervalos, antecedência mínima, política de cancelamento, se há confirmação manual. | **Só você pode definir.** Não serão inventadas. |
| 6 | **Decisão de calendário.** | Se a agenda deve sincronizar com Google Calendar ou viver só no banco. | Sua decisão. |

Enquanto 5 não existir, nem o modo mais simples pode ir ao ar: não há como oferecer horário sem saber que horários existem.

## 2. Os dois modos, quando houver base

| Modo | Comportamento | O que o visitante lê |
| --- | --- | --- |
| **Solicitação** | A pessoa informa preferências; você retorna e confirma. | “Solicitação recebida. O horário depende de confirmação.” |
| **Reserva confirmada** | O sistema consulta disponibilidade real e grava a reserva. | Confirmação só **depois** de gravada. |

Sem calendário e regras prontos, usar o modo de solicitação. Em nenhum dos dois casos uma preferência de horário pode ser chamada de consulta marcada.

## 3. Fluxo público previsto

1. Escolher modalidade (presencial ou videoconferência) e tema geral, entre as áreas habilitadas.
2. Ver horários reais ou informar preferência, conforme o modo.
3. Informar nome e **um** canal de retorno.
4. Conferir os dados e ler a informação de privacidade.
5. Enviar.
6. Receber um estado claro — e a comunicação transacional, quando configurada.

O fluxo não pede relato do caso, documentos, CPF nem dados sensíveis, e não cria conta de cliente. O texto deve deixar explícito que agendar **não** formaliza contratação nem acompanhamento de prazos. Nenhuma menção a consulta gratuita ou condição promocional.

## 4. Integridade — requisitos não negociáveis

- Disponibilidade vinda do servidor, nunca de uma lista montada no navegador.
- Revalidação do horário no servidor no instante de confirmar.
- Duas tentativas simultâneas não podem ocupar a mesma vaga: gravação atômica, com restrição de unicidade no banco.
- Repetição após falha de rede não pode duplicar a reserva: chave de idempotência por tentativa.
- Fuso horário explícito: `America/Porto_Velho` para Ariquemes, exibido ao visitante.
- Duração, intervalos e bloqueios administrativos considerados no cálculo.
- Cancelamento e reagendamento liberam a vaga.
- Falha de calendário ou de e-mail **nunca** gera confirmação. O registro é mantido e a falha é sinalizada a você.
- Link de cancelamento, se existir: token opaco, de uso único, com validade e revogação. Nada de nome, telefone ou assunto na URL.
- Sem envio automático por WhatsApp. Um link que abre o aplicativo não é um serviço de notificação.

## 5. Área interna `/gestao`

Autenticação e autorização no servidor, sessões protegidas, sem cadastro público de administradores. Cada permissão limita o que a pessoa lê e altera.

Estados do contato: **recebido → retorno realizado → consulta agendada → encerrado**.

Campos mínimos: identificador gerado pelo sistema; nome e canal de retorno; assunto geral (categoria aprovada, sem narrativa processual); origem (formulário, agendamento, indicação, Google, redes, ou **não informado** — nunca inferida como certeza); estado; responsável; datas de recebimento, atualização e próximo retorno; nota interna breve.

Regras de integração: uma solicitação válida cria o registro; um clique em WhatsApp **não** cria pessoa alguma, porque clique não é conversa; contatos por telefone ou indicação entram manualmente; nomes iguais não fundem registros sem conferência.

Proteção: notas internas nunca vão para analytics, logs ou mensagens públicas. Exportação, se existir, tem acesso restrito e neutraliza fórmulas em planilha (`=`, `+`, `-`, `@` no início da célula). Retenção e exclusão definidas por você antes de ligar a coleta.

Escopo fechado: contatos e agenda. **Não** evolui para autos, consulta processual ou portal de documentos.

## 6. Esforço estimado

Estimativa de trabalho, não de calendário — depende de quando as dependências acima forem resolvidas.

| Etapa | Estimativa |
| --- | --- |
| Infraestrutura: Worker, D1, migrações, ambiente | 1 a 2 dias |
| Agendamento em modo solicitação, com integridade e testes de concorrência | 2 a 3 dias |
| Envio transacional e tratamento de falha | 1 dia |
| Área interna com autenticação, estados e filtros | 3 a 4 dias |
| Modo reserva confirmada e sincronização de calendário | 2 a 3 dias adicionais |

## 7. Como destravar

1. Defina as regras operacionais da consulta (item 5 da tabela 1). É o único item que ninguém pode resolver por você.
2. Diga se quer começar pelo modo solicitação — é o mais simples e já resolve a maior parte.
3. Autorize a criação do banco D1 na sua conta Cloudflare e escolha o provedor de e-mail.

Com isso em mãos, a fase 2 é implementada e testada.

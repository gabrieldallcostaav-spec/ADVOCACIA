# Privacidade: o que foi verificado e o que depende de você

Resposta à análise de 23 de outubro de 2026.

## 1. O que foi verificado tecnicamente

Rodei a auditoria antes de escrever qualquer afirmação na página. Resultados, nesta data e nesta versão do código:

| Verificação | Método | Resultado |
| --- | --- | --- |
| Cookies gravados pelo site | Navegação por seis páginas em navegador real, leitura do cookie jar do contexto | **Nenhum.** Lista vazia. |
| `localStorage` e `sessionStorage` | Leitura das chaves após navegar | **Vazios.** |
| Uso de armazenamento no código | Busca por `document.cookie`, `localStorage`, `sessionStorage`, `indexedDB` em `src/` | **Nenhuma ocorrência.** |
| Requisições a terceiros | Interceptação de todas as requisições em `/`, `/privacidade`, `/contato`, `/cartao`, `/sobre` e uma página de área | **Somente o próprio domínio.** Nenhum outro host contactado. |
| Dependências que chegam ao navegador | `package.json` | `next`, `react`, `react-dom`, `marked` e `qrcode` — nenhuma de analytics, publicidade ou rastreamento. |
| Fontes tipográficas | `public/fonts/` e `@font-face` em `globals.css` | Hospedadas no próprio domínio. Nenhuma requisição a servidor de fontes. |
| Formulário, login, cadastro | Estrutura das rotas | Não existem. |

Com isso, a contradição apontada como **P0** deixou de existir: a página não afirma mais que “nenhum dado pessoal é coletado”. Ela separa explicitamente a ausência de campos para preencher dos registros técnicos que a hospedagem gera.

### Sobre os registros da hospedagem

A documentação do Cloudflare informa que o endereço de IP de cada requisição é processado para determinar o país de origem e identificar visitantes únicos, sem script no navegador. A mesma documentação indica que, para um site estático sem proteção contra robôs ativada, nenhum cookie é gravado por padrão — o cookie técnico aparece quando a proteção contra robôs ou uma verificação de segurança está ativa.

É por isso que a página fala em cookie técnico **condicionado à configuração**: essa é a situação real, e ela depende de uma opção que fica na sua conta Cloudflare.

**O que não foi verificado:** quanto tempo o Cloudflare conserva esses registros. A documentação consultada não informa, e eu não vou inventar um prazo. Se você quiser essa precisão na política, é uma pergunta a fazer ao provedor depois que a conta for sua.

## 2. O que depende de você antes de publicar

Estes são fatos da sua rotina. Não há como eu verificá-los lendo código, e a página foi escrita para não afirmar nenhum deles sem confirmação.

| # | O que precisa confirmar | Como a página se comporta hoje | Onde preencher |
| --- | --- | --- | --- |
| 1 | **Quem tem acesso às mensagens** além de você: secretária, estagiário, outra pessoa, WhatsApp Web em computador compartilhado. | A página diz que as mensagens chegam ao aparelho e às contas usadas profissionalmente por você, e convida a pessoa a perguntar quem teve acesso. **Não afirma que só você acessa.** | `site.privacidade.quemTemAcesso` |
| 2 | **Prazos concretos de conservação** de mensagens de quem não contratou, de documentos de atendimentos realizados e de registros administrativos. | A página explica o critério — enquanto necessário à finalidade e pelo tempo que a lei ou o dever profissional exigirem — sem citar número algum. | `site.privacidade.prazosDeConservacao` |
| 3 | **Ferramentas de terceiros** que você usa para tratar mensagens ou documentos: e-mail (qual provedor), armazenamento em nuvem, software de gestão. | Hoje a página cita apenas o WhatsApp, porque é o único canal publicado. | A seção “O que acontece quando você entra em contato” precisa citá-las. |
| 4 | **E-mail profissional** e seu provedor. | Nenhum e-mail é exibido em lugar nenhum do site. | `site.email` e `site.provedorHospedagem` |

**Nenhum desses campos deve ser preenchido com exemplo.** Enquanto forem `null`, a página mostra a redação baseada em critério, que é verdadeira. Preenchidos, ela passa a mostrar a informação precisa automaticamente.

Por que isso importa mais do que parece: a análise alertou para não prometer “somente o advogado tem acesso” sem verificar dispositivos, contas e colaboradores. Se você usa WhatsApp Web num computador do escritório ao qual outra pessoa tem acesso físico, a afirmação seria falsa — e uma política falsa é pior que uma política genérica.

## 3. Ajustes feitos na página

| Prioridade | Ajuste |
| --- | --- |
| **P0** | Removida a afirmação absoluta sobre coleta. A seção “Quais informações ficam registradas” distingue a ausência de campos dos registros técnicos e do cookie de segurança condicionado à configuração. |
| **P1** | Acrescentada explicação de acesso, uso e conservação, com o alcance delimitado: a finalidade do primeiro contato é separada do tratamento posterior à contratação. |
| **P1** | Canais alinhados: a página cita exatamente os canais publicados, derivados da mesma configuração do site. Como só há WhatsApp, só o WhatsApp é citado. |
| **P1** | Criado um caminho próprio — **“Tirar uma dúvida sobre meus dados”** — com mensagem inicial neutra (“Olá. Gostaria de informações sobre o tratamento dos meus dados pessoais.”) e aviso de que abre um serviço externo. Nada é enviado automaticamente. A página de contato ganhou uma orientação visível para solicitações de privacidade. |
| **P2** | Abertura reescrita em linguagem comum, sem “implementação atual”. Acrescentado um resumo com três perguntas e links internos. Detalhe técnico de fontes tipográficas saiu da abertura e virou uma frase na seção certa. |
| **P2** | “Portabilidade” e “anonimização” passaram a vir explicadas entre parênteses. |
| **UI** | Âncoras ganharam `scroll-margin-top`, para o cabeçalho fixo não cobrir o título da seção. |

## 4. Verificações de interface

| Item | Resultado |
| --- | --- |
| Larguras 320, 360, 390, 768, 1024 e 1440 px | Sem rolagem horizontal. |
| Links internos do resumo | Os três levam às seções correspondentes, com o título visível abaixo do cabeçalho. |
| Navegação por teclado | Links do resumo e botões alcançáveis por Tab, com foco visível. |
| Política acessível sem preencher nada | Sim — não há campo algum na página. |

**Não verificado:** leitura em aparelho real. Continua pendente, junto com os demais testes de `docs/TESTES_COM_USUARIOS.md`.

## 5. O que a página deliberadamente não faz

- Não declara conformidade com a LGPD nem exibe selo de segurança.
- Não promete exclusividade de acesso, prazo de eliminação ou garantia de segurança.
- Não inventa fornecedor, encarregado, prazo de retenção ou procedimento interno.
- Não inclui banner de cookies, porque não há finalidade opcional a consentir.
- Não contém placeholder: tudo que está escrito é sustentado por evidência ou é um critério verdadeiro.

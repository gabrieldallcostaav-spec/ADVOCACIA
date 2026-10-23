# Assistente de navegação

**Estado: implementado e desativado.** `site.assistenteDeNavegacao = false` em `src/config/site.ts`. Para ligar, troque para `true` e publique.

## 1. O que ele é

Um painel que ajuda a encontrar páginas deste site. Só isso.

**Não há campo de texto livre.** O visitante escolhe entre perguntas aprovadas e recebe respostas montadas a partir do conteúdo já publicado. Essa escolha é o que garante os limites: sem entrada livre, não há como o componente inventar um fato, opinar sobre um caso ou receber instruções escondidas numa mensagem.

**Não há modelo generativo**, e não é necessário: localizar uma página de área e informar os canais oficiais é trabalho determinístico. Nenhuma chamada sai do navegador, nenhum dado de visitante é coletado, nenhum custo por uso.

## 2. Perguntas disponíveis

Vêm de `src/content/assistente.ts`, derivadas da configuração e do conteúdo publicado:

| Pergunta | Resposta | Origem declarada |
| --- | --- | --- |
| Quais áreas são atendidas? | Lista das áreas publicadas, com link para cada uma | `/atuacao` |
| Como entro em contato? | Modalidades e canais reais | `/contato` |
| Como marco uma consulta? | Explica que a consulta é combinada pelos canais, sem reserva automática | `/contato` |
| Tem algum material para ler? | Guias e artigos publicados (some quando não há nenhum) | `/guias` |
| Quem é o advogado responsável? | Nome, inscrição e cidade | `/sobre` |
| Tenho uma dúvida sobre o meu caso | Diz que depende de análise individual e encaminha ao contato | `/contato` |

Cada resposta mostra **de onde a informação veio**, com link para a página.

## 3. Limites

O componente não se apresenta como Gabriel nem como advogado — ele se identifica como assistente de navegação, e o cabeçalho do painel diz que não analisa casos.

Por construção, ele não oferece diagnóstico jurídico, chance de êxito, estratégia, cálculo de indenização, prazo de situação concreta ou garantia de resultado. Também não pede documento, número de processo, dado bancário, senha ou relato de caso — não pede nada, porque não tem campo de entrada.

Pergunta sobre caso concreto cai na última opção: resposta breve, sem alarme e sem promessa, com encaminhamento ao contato humano.

## 4. Onde aparece

Botão discreto no canto inferior direito, **apenas no desktop**. No celular ele é ocultado de propósito, para não se acumular com a barra fixa de contato — o site tem no máximo um elemento fixo por vez.

## 5. Verificado

- Abre e fecha pelo botão; fecha com `Escape` e devolve o foco a quem abriu.
- Navegável por teclado; o painel tem `role="dialog"` e rótulo acessível.
- Os links levam às páginas que anunciam (conferido: as quatro áreas e o índice).
- Com nenhum guia ou artigo publicado, a opção de materiais não aparece.
- Sem canal de contato configurado, a opção de contato não aparece.

## 6. Se um dia usar um modelo generativo

Não é o caso hoje e não é recomendado para este escopo. Se for adotado, valeriam: credenciais só no servidor; base restrita ao conteúdo publicado; limites de uso; defesa contra instruções embutidas nas mensagens; **sem acesso** a contatos internos, agenda ou documentos; nenhuma criação ou cancelamento de reserva por linguagem livre; tratamento de mensagens descrito na política de privacidade; e resposta segura para indisponibilidade do provedor.

O ganho seria pequeno e o risco, desproporcional: o trabalho que ele faria já é feito de forma determinística e auditável.

## 7. Antes de ligar

- [ ] Ler as seis perguntas e respostas em `src/content/assistente.ts` e aprová-las.
- [ ] Conferir se o tom corresponde ao que você diria.
- [ ] Trocar `assistenteDeNavegacao` para `true` e publicar.

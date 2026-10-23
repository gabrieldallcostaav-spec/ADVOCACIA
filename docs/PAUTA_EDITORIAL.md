# Pauta editorial

Pauta inicial de oito textos para as áreas publicadas. Cadência proposta como
ponto de partida de capacidade: **dois textos revisados por mês**. É ajustável, e
publicar mais não melhora ranqueamento por si.

Cada texto precisa de revisão jurídica sua antes de sair do rascunho. IA pode
apoiar pesquisa e primeira versão; a responsabilidade pelo conteúdo é do
advogado que o assina.

## Critérios comuns

- **Autor:** Gabriel Santos Dalla Costa, com data real de publicação.
- **Fontes:** legislação no Planalto, jurisprudência nos sites oficiais do STF,
  STJ ou do tribunal competente, atos normativos no órgão de origem. Nada de
  citação sem link conferido.
- **Contribuição própria:** cada texto precisa acrescentar compreensão ao que a
  fonte já diz — o que costuma dar errado, qual documento falta, qual prazo passa
  despercebido. Resumo de lei sem leitura própria não serve.
- **Limites:** todo texto diz explicitamente que não substitui análise individual.
- **Títulos:** explicam o tema. Nunca prometem resultado, valor de indenização ou
  estimulam litígio.
- **Links:** cada texto aponta para a página da área correspondente e para o
  perfil profissional.

## Pautas

| # | Título provisório | Dúvida que atende | Leitor | Área | Fontes | Destino dos links | Prazo |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | O prazo de defesa em processo administrativo e por que ele decide o caso | Recebi uma notificação, quanto tempo tenho? | Servidor ou empresa notificada | Administrativo | Lei 9.784/1999; CF art. 5º, LV; norma local aplicável | `/atuacao/direito-administrativo` | Mês 1 |
| 2 | Nome negativado por dívida que você não reconhece: o que pedir e em que ordem | Fui negativado indevidamente, o que faço primeiro? | Consumidor pessoa física | Consumidor | CDC arts. 43 e 73; Súmula 385 do STJ | `/atuacao/direito-do-consumidor` | Mês 1 |
| 3 | Negativa de cobertura pelo plano de saúde: quais documentos pedir antes de discutir | O plano negou, como me preparo? | Beneficiário de plano | Consumidor | Lei 9.656/1998; normas da ANS; CDC | `/atuacao/direito-do-consumidor` | Mês 2 |
| 4 | Guarda compartilhada: o que a lei define e o que fica para o acordo | Como funciona na prática? | Pai ou mãe em separação | Família | CC arts. 1.583–1.584; ECA | `/atuacao/direito-de-familia-e-sucessoes` | Mês 2 |
| 5 | Inventário judicial ou extrajudicial: o que define o caminho | Qual dos dois serve para o meu caso? | Herdeiro | Família | CPC arts. 610 e ss.; Res. CNJ 35/2007 | `/atuacao/direito-de-familia-e-sucessoes` | Mês 3 |
| 6 | Quais documentos levar na primeira consulta com um advogado | O que preciso separar? | Qualquer pessoa antes da consulta | Geral | Experiência própria de atendimento | `/contato` e todas as áreas | Mês 3 |
| 7 | Cláusulas que merecem atenção em um contrato de prestação de serviços | O que ler antes de assinar? | Pequeno empresário ou profissional autônomo | Civil | CC arts. 421, 422 e 593 e ss. | `/atuacao/direito-civil-e-contratos` | Mês 4 |
| 8 | Rescisão de contrato: multa, aviso prévio e o que costuma ser discutido | Posso sair do contrato e quanto custa? | Contratante ou contratado | Civil | CC arts. 472–480; cláusulas usuais | `/atuacao/direito-civil-e-contratos` | Mês 4 |

Responsável pela revisão de todos os textos: Gabriel Santos Dalla Costa.

## Fluxo de publicação

1. Criar `src/content/articles/<slug>.md` com `status: rascunho`.
2. Escrever com fontes conferidas e links verificados um a um.
3. Revisar como advogado responsável — conteúdo, enquadramento e tom.
4. Trocar para `status: publicado` e ajustar `publicadoEm` para a data real.
5. Atualizar `src/content/revisoes.ts` e publicar.

Detalhes do formato: `docs/MANUTENCAO.md`, seção 4.

## O que não entra na pauta

Textos que prometam resultado, estimem valor de indenização, afirmem que alguém
“tem direito a receber”, ou que existam apenas para repetir uma palavra-chave.
Também não entram comentários sobre casos patrocinados, mesmo sem identificar as
partes.

# Testes com pessoas

**Estado: não realizados.** Nenhuma pessoa testou este site até agora. O roteiro abaixo está pronto para ser aplicado antes do lançamento. Não trate nada daqui como resultado — não há resultado.

## 1. Como fazer

Três pessoas que **não** participaram da criação do site. Três é uma escolha prática para achar os problemas mais evidentes, não uma amostra estatística.

Procure perfis parecidos com quem vai procurar o site de verdade: alguém que já contratou advogado, alguém que nunca contratou, alguém com menos familiaridade com celular.

**No celular, não no computador** — é de lá que a maioria vai chegar.

Regras durante o teste:

- Entregue o telefone com o site aberto na home e leia a tarefa.
- **Não ensine o caminho.** A tentação de ajudar é grande; resista.
- Peça para a pessoa falar em voz alta o que está pensando.
- Anote hesitações, toques errados, voltas atrás e o que ela lê em voz alta sem entender.
- Se travar por mais de um minuto, anote onde e só então ajude.
- Use dados fictícios em qualquer fluxo com envio.

Tempo total por pessoa: 10 a 15 minutos.

## 2. Tarefas

| # | Tarefa | O que observar | Concluiu? |
| --- | --- | --- | --- |
| 1 | “Descubra quem é o advogado e em que cidade ele atende.” | Encontra na primeira dobra ou precisa rolar/navegar? | |
| 2 | “Você tem um problema com um plano de saúde. Veja se ele atende isso.” | Usa o índice de áreas ou a navegação por assunto? Os rótulos fazem sentido? | |
| 3 | “Encontre como falar com ele.” | Quantos toques? Acha o WhatsApp? | |
| 4 | “Salve o contato dele no seu celular.” | Encontra `/cartao`? O botão “Salvar contato” é compreendido? | |
| 5 | “Você recebeu uma mensagem suspeita em nome dele. Como confirmar se é verdadeira?” | Chega em `/canais-oficiais`? O texto responde? | |
| 6 | “Encontre algum material para ler antes de uma consulta.” | Só aplicável quando houver guia publicado. | |

Tarefa de agendamento: **não se aplica** — não existe fluxo de agendamento (ver `docs/AGENDAMENTO_E_CONTATOS.md`).

## 3. Pontos de atenção já identificados

Sem teste, são hipóteses minhas — valem como coisas a observar, não como achados:

- Os rótulos de assunto em `/atuacao` (“Vou me separar”, “Estão me cobrando algo”) foram escritos para serem reconhecíveis, mas nunca foram lidos por ninguém de fora. É o item mais importante a validar.
- O botão “Salvar contato” pode não ser óbvio para quem nunca baixou um vCard.
- A barra de contato no rodapé do celular aparece depois da primeira dobra; verificar se é notada.

## 4. Registro

Preencha após aplicar:

| Pessoa | Data | Tarefas concluídas | Onde travou | Observações |
| --- | --- | --- | --- | --- |
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

### Problemas encontrados e correções

| # | Problema | Quantas pessoas | Correção aplicada | Retestado? |
| --- | --- | --- | --- | --- |
| | | | | |

Corrija o que aparecer em duas ou três pessoas — isso é padrão, não acaso. O que apareceu em uma só, avalie. Depois de corrigir, repita **apenas** as tarefas afetadas.

## 5. Enquanto não houver teste

A pendência fica registrada aqui e em `docs/ESCOPO_E_FASES.md`. Em nenhum lugar deste projeto se afirma que o site foi validado com usuários, porque não foi.

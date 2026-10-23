# Conteúdo e pendências

Situação em 23 de outubro de 2026.

## 1. Confirmado pelo responsável

| Item | Valor |
| --- | --- |
| Nome completo | Gabriel Santos Dalla Costa |
| Nome de apresentação | Gabriel Dalla Costa |
| Inscrição | OAB/RO 13.552 |
| Cidade-base | Ariquemes/RO |
| Áreas de atuação | Direito Civil e Contratos; Direito de Família e Sucessões; Direito Administrativo; Direito do Consumidor |
| Outras áreas | Avaliadas caso a caso e conduzidas em parceria — publicado como nota discreta, sem anunciar especialidade |
| Disponibilidade | Apto e disponível para atender |
| Modalidades | Presencial em Ariquemes/RO e por videoconferência |

## 2. Pendências que impedem a publicação

| # | Pendência | Onde entra | Por que trava |
| --- | --- | --- | --- |
| 1 | **Número de WhatsApp** (formato internacional, ex.: `5569999999999`) | `src/config/site.ts` → `whatsapp` | Sem ele nenhum link é gerado. O site não inventa destinatário: a página de contato fica sem canal. |
| 2 | **E-mail profissional** | `src/config/site.ts` → `email` | Mesmo motivo. |
| 3 | **Domínio definitivo** | `src/config/site.ts` → `dominio` | Alimenta canonical, sitemap e imagem de compartilhamento. O valor atual é um palpite e precisa ser corrigido antes do build de produção. |
| 4 | **Provedor de hospedagem** | `src/config/site.ts` → `provedorHospedagem` | Citado na política de privacidade. Enquanto `null`, a frase correspondente não aparece. |

Sem os itens 1 e 2 o site não deve ir ao ar: um site de advocacia sem canal de
contato válido não cumpre a própria função.

## 3. Pendências que não travam, mas melhoram muito

| # | Pendência | Observação |
| --- | --- | --- |
| 5 | **Retrato profissional** | Dois enquadramentos verticais 4:5: um para a primeira dobra (maior) e um para a página de perfil. Ver `docs/DIRECAO_VISUAL.md`, seção 5. Nenhum rosto foi gerado nem substituído. |
| 6 | **Endereço do escritório** | Só preencher se houver atendimento presencial em endereço próprio e verificável. Endereço de correspondência ou coworking sem operação real não deve ser publicado — compromete também o Perfil da Empresa no Google. |
| 7 | **Horários de atendimento** | Exibidos na página de contato quando preenchidos. |
| 8 | **Telefone fixo ou celular para ligação** | Opcional; entra como terceiro canal. |
| 9 | **Perfis oficiais** (ex.: LinkedIn) | Entram em `redes` e no `sameAs` do JSON-LD. Só perfis reais e atualizados. |

## 4. Conteúdo escrito que precisa da sua revisão

Todos os textos do site foram redigidos para este projeto e **precisam de leitura
e aprovação sua antes da publicação** — você é o responsável pelo conteúdo
perante a OAB.

| Arquivo | O que contém |
| --- | --- |
| `src/content/areas/index.ts` | Descrição, situações abrangidas e perguntas frequentes das quatro áreas. |
| `src/content/perfil.ts` | Biografia, “como o trabalho é conduzido”, etapas do atendimento, perguntas frequentes gerais. |
| `src/components/sections/Hero.tsx` | Slogan e parágrafo de abertura. |
| `src/app/privacidade/page.tsx` | Política de privacidade, escrita para corresponder exatamente ao que o site faz. |

## 5. O que deliberadamente **não** está no site

Decisões tomadas para manter a apresentação sóbria e compatível com as normas de
publicidade da advocacia:

- Nenhum depoimento, avaliação, estrela, selo ou nome de cliente.
- Nenhum número de causas, de clientes, de êxito ou de valores recuperados.
- Nenhuma menção a cargos ou funções públicas, atuais ou anteriores.
- Nenhuma afirmação de especialidade, titulação, docência ou tempo de experiência
  — inclusive formação acadêmica, que ficou fora até conferência documental.
- Nenhuma promessa de resultado, prazo de resposta, gratuidade ou preço.
- Nenhuma calculadora de indenização, teste de elegibilidade ou chamada que
  estimule litígio.
- Nenhum pop-up, contagem regressiva ou mensagem de urgência.

Se você quiser incluir formação acadêmica, envie a documentação (diploma,
certificado ou histórico) e a qualificação exata — “especialista em X pela
instituição Y, concluído em AAAA”. O texto só entra com a formulação correta.

## 6. Situação profissional antes de anunciar

Você confirmou que está apto e disponível, e o site foi configurado assim
(`atendimentoAtivo: true`). Vale registrar, para o seu controle, que o retorno à
advocacia privada depois de atuação na administração pública envolve os arts. 27
a 30 do Estatuto da Advocacia — em especial o art. 28, III e §§ 1º e 2º, sobre
incompatibilidade. A conferência da situação cadastral junto à OAB/RO é o último
item antes de tirar o site do modo prévia.

## 7. Artigo em rascunho

`src/content/articles/prazo-para-defesa-em-processo-administrativo.md` existe
apenas para demonstrar a estrutura editorial. Está com `status: rascunho`: não vai
ao ar em produção, não entra no sitemap e a URL direta devolve 404. O texto
**não** está revisado e não deve ser publicado como está.

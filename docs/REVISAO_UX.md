# Revisão de UI/UX e marketing jurídico — o que foi implementado

Resposta ao diagnóstico de 23 de outubro de 2026. A primeira rodada está completa; a segunda, parcialmente — os itens que dependem de dado operacional ou de aparelho real ficaram registrados como pendência.

## Primeira rodada

| Item do diagnóstico | O que mudou |
| --- | --- |
| **Primeira dobra explica pouco o escopo** | Reescrita. Agora abre com identificação (nome · OAB), H1 “Advocacia em Ariquemes. Atendimento direto com o advogado.”, as quatro áreas por extenso e a modalidade. O slogan saiu daqui. |
| **Slogan ocupava o destaque principal** | Virou uma faixa de assinatura própria, entre as áreas e o perfil, com o monograma. Continua sendo o momento tipográfico da marca, sem disputar espaço com a informação. |
| **WhatsApp como ação secundária** | Passou a ação principal, com o mesmo rótulo em todo o site: “Falar pelo WhatsApp”. Está na primeira dobra, no cabeçalho (“WhatsApp”), em cada página de área junto ao resumo, no perfil, no cartão e no bloco de encerramento. Componente único: `BotaoWhatsapp`. |
| **Contato exigia abrir uma página para achar o canal** | Deixou de exigir: o link do cabeçalho vai direto para o WhatsApp. |
| **Canal discreto na página de contato** | Refeita. Título “Falar com o advogado”, botão em destaque antes de qualquer texto de cautela, número visível `(69) 9 8104-3945` com botão de copiar, e um painel de atendimento com modalidades e o que acontece depois. |
| **Avisos repetidos em vários blocos** | Reorganizados. A orientação completa ficou na página de contato, perto da ação. O bloco de encerramento agora traz a ação primeiro e só a identificação; a seção de perguntas da home perdeu o aviso duplicado. |
| **Rolagem suave global animava a troca de rota** | `scroll-behavior: smooth` removido do `html`. A troca de página passa a posicionar no topo sem animação. |

## Segunda rodada

| Item | O que mudou |
| --- | --- |
| **Resumos de área técnicos demais** | Reescritos conforme a tabela do diagnóstico: “Contratos, obrigações, dívidas e responsabilidade civil”, “Divórcio, guarda, alimentos, inventário e partilha”, “Licitações, contratos públicos e processos administrativos”, “Compras, serviços, cobranças e relações de consumo”. |
| **Painel lateral só no hover** | Já respondia a foco por teclado (`onFocus`), e a informação essencial sempre esteve na própria linha. Mantido. |
| **Abertura de Sobre longa demais** | Reduzida de quatro para três parágrafos curtos. O detalhamento do método continua logo abaixo, em blocos. |
| **Conferência da identificação em fonte oficial** | Acrescentado link de `/sobre` para `/canais-oficiais`, onde estão CNA e ConfirmADV. |
| **Tipografia de apoio em 12 px** | Base pequena subiu para 13 px. As informações que importam — identificação profissional, faixa de identidade, trilhas de navegação — passaram a 14 px. As trilhas saíram do versalete para caixa normal, bem mais legíveis. Componente único: `Migalhas`. |
| **Página ativa indicada só pela cor** | Ganhou um filete verde sob o item ativo, somado ao `aria-current` que já existia. |
| **Etapas do atendimento** | De quatro para três: contato inicial; consulta e análise; escopo, se houver contratação. A separação entre consulta, análise e contratação permanece explícita no texto. |
| **Perguntas repetidas entre home e contato** | A home mostra três, com link para o restante em `/contato`. |
| **Cartão com utilidades disputando a ação** | WhatsApp virou botão principal de largura cheia; salvar contato, compartilhar e copiar link foram agrupados abaixo, sob o rótulo “Utilidades”. O QR Code continua no rodapé do cartão. |

## Pendências do diagnóstico

| Item | Situação |
| --- | --- |
| **Horários reais** | Não publicados, porque não foram definidos. Enquanto `site.horarios` for `null`, nenhum horário aparece — e nenhum foi inventado. A resposta sobre tempo de retorno foi reescrita: não cita mais um horário de atendimento que o site não informa, e não promete prazo. |
| **Expectativa de retorno** | Não publicada. Defina a rotina primeiro; só então publicamos. |
| **Formação acadêmica** | Continua fora do site até conferência documental. Ver `docs/CONTEUDO_E_PENDENCIAS.md`. |
| **E-mail profissional** | Pendente. |
| **Teste em aparelho real** | **Não feito.** Verifiquei 320, 360, 390, 768, 1024 e 1440 px em navegador headless — sem rolagem horizontal e sem sobreposição. Isso não substitui um celular na mão. Roteiro em `docs/TESTES_COM_USUARIOS.md`. |
| **Coerência de domínio** | Corrigida na orientação de publicação: enquanto o site estiver em `workers.dev`, publique com `NEXT_PUBLIC_MODO_PREVIA=true`, que marca a prévia e bloqueia indexação. O domínio divulgado em `/canais-oficiais` e no QR Code é o definitivo — publicar sem a flag faz o endereço anunciado divergir do endereço servido, que foi exatamente o que a revisão apontou. |

## O que não foi adotado, e por quê

- **Rótulo “Contato” no cabeçalho** foi substituído por “WhatsApp”, conforme o diagnóstico. A página `/contato` continua acessível pelo rodapé, pelo bloco de encerramento e pelo botão secundário.
- **Novos recursos (agenda, assistente)** permanecem onde estavam: o assistente segue desativado e o agendamento, especificado e bloqueado. O diagnóstico recomendou exatamente isso.

## Medição

Nada foi medido. Não há analytics instalado e não houve nenhum teste com pessoas. Nenhum ganho de contato, de compreensão ou de contratação pode ser atribuído a estas mudanças — elas são hipóteses de melhoria de experiência, como o próprio diagnóstico registra.

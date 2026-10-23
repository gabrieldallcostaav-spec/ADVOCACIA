# Escopo e fases

Situação em 23 de outubro de 2026.

## Matriz de entrega

| Recurso | Estado | Observação |
| --- | --- | --- |
| Site institucional, SEO técnico, acessibilidade | **Implementado e verificado** | Navegação, 404, metadados, sitemap, robots e cabeçalhos testados no runtime do Cloudflare. |
| Fotografia profissional | **Implementado e verificado** | Três retratos aplicados em posições distintas. |
| Vídeo de apresentação | **Desativado** | Componente pronto (`VideoApresentacao`); fica oculto enquanto `site.video.arquivo` for `null`. Roteiro em `docs/MIDIA_E_ROTEIRO.md`. |
| Cartão profissional `/cartao` | **Implementado e verificado** | vCard, QR Code, compartilhamento e cópia de link testados no navegador. |
| Página de links `/links` | **Implementado e verificado** | Ordem editável em `src/content/links.ts`. |
| Canais oficiais `/canais-oficiais` | **Implementado e verificado** | Links da OAB conferidos em 23/10/2026 (resposta 200). |
| Navegação por necessidades | **Implementado e verificado** | Oito entradas, todas apontando para áreas publicadas. Rótulos pendentes de validação com pessoas. |
| Guias `/guias` | **Implementado**, conteúdo em rascunho | Um guia de demonstração, marcado como modelo e fora do ar em produção. |
| Agendamento `/agendamento` | **Dependente de dado real** | Não implementado. Dependências concretas em `docs/AGENDAMENTO_E_CONTATOS.md`. |
| Controle interno de contatos `/gestao` | **Dependente de dado real** | Não implementado. Mesma referência. |
| Assistente de navegação | **Implementado, desativado** | Determinístico, só menus. `site.assistenteDeNavegacao = false` até sua revisão. |
| Autonomia de contas | **Documentado** | Inventário em `docs/CONTAS_E_RECUPERACAO.md`, sem segredos. |
| Monitoramento e backup | **Documentado**, procedimento manual | `docs/MONITORAMENTO_E_BACKUP.md`. Nenhuma ferramenta paga foi contratada. |
| Testes com três pessoas | **Pendente** | Roteiro pronto em `docs/TESTES_COM_USUARIOS.md`. **Ninguém testou ainda.** |

**Modo de agendamento em uso: nenhum.** A consulta é combinada pelos canais de contato, e o site diz exatamente isso.

**Notificações simuladas: nenhuma.** Não há envio de e-mail, SMS ou mensagem automática em lugar algum do projeto. Não existe formulário.

## Fase 1 — Apresentação e descoberta · concluída

Site completo, SEO técnico, fotografia, cartão digital, página de links, canais oficiais, navegação por necessidades, estrutura de guias, documentação de contas e roteiro de testes. O vídeo tem o componente pronto e aguarda o arquivo.

## Fase 2 — Atendimento organizado · especificada, bloqueada

Agendamento e controle interno de contatos exigem infraestrutura que o projeto ainda não tem: persistência de dados, autenticação e um provedor de envio de e-mail. Hoje o site é totalmente estático e publicado como arquivos no Cloudflare — não há servidor que receba uma solicitação.

Construir a interface sem essa base produziria um formulário que não entrega nada ou um horário que não está reservado. A especificação completa, as decisões que dependem de você e o esforço estimado estão em `docs/AGENDAMENTO_E_CONTATOS.md`.

## Fase 3 — Apoio à navegação · implementada, desativada

O assistente está pronto e funciona sem modelo generativo: menus com perguntas aprovadas, respostas montadas a partir do conteúdo publicado, origem de cada informação declarada. Testado por teclado. Fica desligado até sua revisão — ligar é mudar uma linha. Ver `docs/ASSISTENTE_DE_NAVEGACAO.md`.

## Rotas do site

| Rota | Estado |
| --- | --- |
| `/` | No ar |
| `/sobre` | No ar |
| `/atuacao` e `/atuacao/[área]` | No ar, 4 áreas |
| `/conteudos` e `/conteudos/[texto]` | 404 em produção: nada publicado ainda |
| `/guias` e `/guias/[guia]` | 404 em produção: um rascunho apenas |
| `/contato` | No ar |
| `/cartao` | No ar |
| `/links` | No ar, fora do índice de busca |
| `/canais-oficiais` | No ar |
| `/privacidade` | No ar |
| 404 | No ar |

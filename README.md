# Dalla Costa Advocacia — site institucional

Site de **Gabriel Santos Dalla Costa**, OAB/RO 13.552, Ariquemes/RO.

Next.js (App Router) + TypeScript + Tailwind CSS. Conteúdo estático, sem banco de
dados, sem painel administrativo e sem rastreadores.

## Requisitos

- Node.js 20 ou superior
- npm

## Instalação e execução

```bash
npm install
npm run dev     # desenvolvimento em http://localhost:3000
npm run build   # build de produção
npm run start   # sobe o build de produção
npm run lint    # ESLint
npm run typecheck
```

## Modo prévia e modo produção

O site nasce em **modo prévia**: conteúdo demonstrativo aparece identificado
como “modelo”, todas as páginas recebem `noindex` e o `robots.txt` bloqueia o
rastreamento.

Para publicar de verdade, defina no ambiente de produção:

```
NEXT_PUBLIC_MODO_PREVIA=false
```

Com isso, rascunhos saem do ar (inclusive pela URL direta), o sitemap passa a ser
gerado e o site fica indexável. Veja `.env.example`.

## Onde mexer

| Arquivo | O que controla |
| --- | --- |
| `src/config/site.ts` | Contatos, domínio, endereço, horários, retratos, flags de atendimento. **É aqui que quase tudo é editado.** |
| `src/content/areas/index.ts` | Áreas de atuação: textos, situações, perguntas, ordem e status. |
| `src/content/perfil.ts` | Biografia, etapas do atendimento e perguntas frequentes. |
| `src/content/articles/*.md` | Artigos, em Markdown com front matter. |
| `src/content/revisoes.ts` | Datas de última revisão usadas no `lastmod` do sitemap. |
| `src/styles/globals.css` | Tokens de cor, tipografia e espaçamento. |
| `public/brand/` | Versões do logotipo em SVG, extraídas dos vetores originais. |

Passo a passo das edições mais comuns: `docs/MANUTENCAO.md`.

## Publicação

1. Preencher WhatsApp, e-mail e domínio em `src/config/site.ts`.
2. Conferir `docs/CONTEUDO_E_PENDENCIAS.md` — nada pendente deve ir ao ar.
3. Definir `NEXT_PUBLIC_MODO_PREVIA=false` no ambiente de produção.
4. `npm run build` e publicar em qualquer hospedagem com suporte a Next.js
   (Vercel é o caminho mais direto; a aplicação não exige configuração especial).
5. Apontar o domínio definitivo, confirmar HTTPS e checar `/<domínio>/robots.txt`
   e `/<domínio>/sitemap.xml`.
6. Verificar o domínio no Google Search Console e enviar o sitemap
   (`docs/SEO_E_BUSCA_LOCAL.md`).

## Documentação

- `docs/DIRECAO_VISUAL.md` — identidade aplicada, cores, tipografia, uso da marca.
- `docs/CONTEUDO_E_PENDENCIAS.md` — o que ainda falta fornecer ou revisar.
- `docs/MANUTENCAO.md` — como editar o site no dia a dia.
- `docs/SEO_E_BUSCA_LOCAL.md` — estratégia de busca, plano de 90 dias e checklist.
- `docs/MAPA_DE_CONSULTAS.md` — matriz de consultas e páginas de destino.
- `docs/PAUTA_EDITORIAL.md` — pauta inicial de conteúdos.

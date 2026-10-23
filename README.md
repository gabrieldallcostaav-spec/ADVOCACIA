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

npm run build:cloudflare    # build estático em out/, pronto para o Cloudflare
npm run preview:cloudflare  # serve esse build no runtime real do Cloudflare
npm run deploy              # build + publicação no Cloudflare Workers
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
| `cloudflare/_headers` | Cabeçalhos de segurança e cache aplicados pelo Cloudflare. |
| `wrangler.jsonc` | Configuração do deploy no Cloudflare Workers. |

Passo a passo das edições mais comuns: `docs/MANUTENCAO.md`.

## Publicação

1. Conferir contatos e domínio em `src/config/site.ts` (WhatsApp e domínio já
   preenchidos; e-mail ainda pendente).
2. Conferir `docs/CONTEUDO_E_PENDENCIAS.md` — nada pendente deve ir ao ar.
3. Definir `NEXT_PUBLIC_MODO_PREVIA=false` no ambiente de produção.
4. Publicar. O site é totalmente estático, então o caminho configurado neste
   repositório é o **Cloudflare Workers**: `npm run deploy`, ou o deploy
   automático a cada push. Passo a passo em `docs/DEPLOY_CLOUDFLARE.md`.
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
- `docs/DEPLOY_CLOUDFLARE.md` — publicação no Cloudflare e domínio próprio.

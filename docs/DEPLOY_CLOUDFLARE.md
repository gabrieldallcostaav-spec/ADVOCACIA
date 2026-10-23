# Deploy no Cloudflare

O site é 100% estático: todas as páginas são geradas no build, não há banco de
dados, formulário, API nem código rodando por requisição. Isso permite servi-lo
como **arquivos estáticos no Cloudflare Workers** — sem adaptador, sem servidor
Node e sem custo por requisição nas respostas de arquivo.

Tudo o que o deploy precisa já está no repositório:

| Arquivo | Para que serve |
| --- | --- |
| `wrangler.jsonc` | Diz ao Cloudflare que o projeto é só de arquivos e que a pasta a publicar é `out/`. |
| `cloudflare/_headers` | Cabeçalhos de segurança e de cache. No build estático o Next não executa `headers()`, então são estes que valem. |
| `cloudflare/limpar-rotas-404.mjs` | Remove do build as rotas sem conteúdo publicado, para que respondam 404 de verdade. |
| `npm run build:cloudflare` | Gera `out/` e aplica os dois itens acima. |

## Antes de publicar

1. Confira `docs/CONTEUDO_E_PENDENCIAS.md`.
2. O domínio `advocaciadallacosta.com.br` precisa estar registrado e sob sua
   conta Cloudflare (seção *Domínio próprio*, mais abaixo).
3. A variável `NEXT_PUBLIC_MODO_PREVIA` precisa valer `false` no build de
   produção. **É o passo que mais passa despercebido:** sem ele o site publicado
   fica com a faixa de prévia e com `noindex` em todas as páginas.

## Caminho A — pelo painel, conectado ao GitHub (recomendado)

É o caminho mais prático: cada `git push` republica o site sozinho, e você não
precisa de terminal no dia a dia.

1. Entre em **dash.cloudflare.com** → **Workers & Pages** → **Create**.
2. Escolha importar um repositório do **GitHub** e autorize o acesso ao
   repositório `gabrieldallcostaav-spec/ADVOCACIA`.
3. Selecione o branch que deve ir ao ar (`main`, depois que a alteração for
   mesclada).
4. Nas configurações de build, informe:

   | Campo | Valor |
   | --- | --- |
   | Comando de build | `npm run build:cloudflare` |
   | Diretório de saída / assets | `out` |
   | Comando de deploy | `npx wrangler deploy` |

   Se o painel preencher algo diferente sozinho, sobrescreva com os valores
   acima. O `wrangler.jsonc` do repositório já define o resto.

5. Em variáveis de ambiente do build, adicione:

   ```
   NEXT_PUBLIC_MODO_PREVIA = false
   ```

6. Conclua. O primeiro deploy publica o site numa URL `*.workers.dev`.

> Se o painel sugerir instalar um adaptador de Next.js (OpenNext) ou detectar o
> projeto como aplicação com servidor, recuse. Este site é um export estático; o
> adaptador falha justamente nesse caso. O `wrangler.jsonc` versionado evita essa
> detecção automática.

## Caminho B — pelo terminal

```bash
npx wrangler login                          # abre o navegador uma vez
NEXT_PUBLIC_MODO_PREVIA=false npm run deploy
```

O script `deploy` roda o build estático e em seguida `wrangler deploy`.

Para conferir antes de publicar, com o runtime real do Cloudflare rodando na sua
máquina:

```bash
NEXT_PUBLIC_MODO_PREVIA=false npm run preview:cloudflare
```

Abra o endereço que o Wrangler imprimir. Vale navegar pelas páginas, testar o
menu no celular e clicar no WhatsApp.

## Domínio próprio

`advocaciadallacosta.com.br` é um domínio `.com.br`, registrado no **Registro.br**.
Para usá-lo no Cloudflare:

1. No painel do Cloudflare, **Add a domain** e informe `advocaciadallacosta.com.br`.
2. O Cloudflare mostra dois servidores de nome (algo como `xxx.ns.cloudflare.com`).
3. Entre em **registro.br**, abra o domínio e troque os servidores DNS para os
   dois endereços que o Cloudflare informou.
4. A propagação costuma levar de alguns minutos a algumas horas. O Cloudflare
   avisa quando o domínio fica ativo.
5. Com o domínio ativo, volte ao seu Worker → **Settings** → **Domains & Routes**
   → **Add custom domain** e informe `advocaciadallacosta.com.br`. Repita para
   `www.advocaciadallacosta.com.br` se quiser que o `www` também responda.

O certificado HTTPS é emitido automaticamente pelo Cloudflare.

**Escolha uma versão principal.** O site está configurado com canonical em
`https://advocaciadallacosta.com.br` (sem `www`). Se preferir manter o `www`,
mude `dominio` em `src/config/site.ts` **e** configure, em *Rules* → *Redirects*,
um redirecionamento permanente da versão secundária para a principal. Manter as
duas respondendo sem redirecionamento divide o sinal de busca.

## Depois do primeiro deploy

- [ ] Abrir o domínio e confirmar que **não** aparece a faixa de prévia.
- [ ] Abrir `https://advocaciadallacosta.com.br/robots.txt` — deve dizer
      `Allow: /` e apontar o sitemap.
- [ ] Abrir `/sitemap.xml` e conferir que não há rascunho na lista.
- [ ] Abrir uma rota inexistente e confirmar a página 404 do site.
- [ ] Clicar no WhatsApp pelo celular e ver se abre a conversa certa.
- [ ] Compartilhar o link num aplicativo de mensagens e conferir a prévia com o
      logotipo e o retrato.
- [ ] Verificar o domínio no Google Search Console e enviar o sitemap
      (`docs/SEO_E_BUSCA_LOCAL.md`, seção 8).

## O que muda se o site deixar de ser estático

Se um dia o site ganhar formulário com envio de e-mail, área restrita ou
qualquer coisa que rode por requisição, o export estático deixa de servir. Nesse
caso o caminho no Cloudflare passa a ser um adaptador de Next.js para Workers, e
a documentação oficial deve ser consultada na data — essa parte do ecossistema
muda com frequência. Nada no projeto atual depende disso.

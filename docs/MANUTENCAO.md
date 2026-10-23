# Manutenção

Tudo o que muda no dia a dia está em dois lugares: `src/config/site.ts` e
`src/content/`. Depois de qualquer alteração, rode `npm run build` e publique.

## 1. Trocar WhatsApp ou e-mail

`src/config/site.ts`:

```ts
whatsapp: '5569999999999',   // só dígitos, com 55 + DDD
email: 'contato@exemplo.com.br',
```

O link do WhatsApp é montado sozinho, com a mensagem de `mensagemWhatsapp`
codificada corretamente. Para mudar a mensagem inicial:

```ts
mensagemWhatsapp: 'Olá, gostaria de informações sobre o atendimento.',
```

Voltar o campo para `null` remove o canal do site inteiro — nenhum link quebrado
fica para trás. Nunca escreva um número de exemplo.

## 2. Colocar o retrato e ajustar o enquadramento

1. Salve as imagens em `public/images/`, por exemplo `retrato-hero.jpg` e
   `retrato-sobre.jpg`. Exporte em torno de 1440 px de largura, qualidade 80.
2. Em `src/config/site.ts`:

```ts
fotos: {
  heroRetrato: '/images/retrato-hero.jpg',
  sobreRetrato: '/images/retrato-sobre.jpg',
},
```

O painel de marca sai e a fotografia entra no mesmo espaço. O recorte usa
`object-top` para não cortar o rosto em telas estreitas. Para mudar o
enquadramento, troque `object-top` por `object-center` em
`src/components/sections/Hero.tsx` e `src/app/sobre/page.tsx`.

## 3. Adicionar ou remover uma área de atuação

Em `src/content/areas/index.ts`, acrescente um objeto ao array `areas`:

```ts
{
  slug: 'direito-empresarial',          // vira a URL /atuacao/direito-empresarial
  titulo: 'Direito Empresarial',
  resumo: 'Até duas linhas. Aparece na home e no índice.',
  descricao: 'Parágrafo de abertura da página da área.',
  situacoes: ['Situação um', 'Situação dois'],
  corpo: ['Primeiro parágrafo.', 'Segundo parágrafo.'],
  perguntas: [{ pergunta: '…', resposta: '…' }],
  ordem: 5,
  status: 'publicado',                  // 'rascunho' esconde em produção
  destaqueNaHome: true,
}
```

Para tirar uma área do ar sem apagar o texto, troque `status` para `'rascunho'`.
Ela some da home, do índice, do menu, do rodapé e do sitemap.

Acrescente também a linha correspondente em `src/content/revisoes.ts`.

## 4. Criar, revisar e publicar um artigo

Crie `src/content/articles/<slug>.md`:

```markdown
---
titulo: Título do texto
resumo: Uma ou duas frases que resumem o conteúdo.
categoria: Direito do Consumidor
autor: Gabriel Santos Dalla Costa
publicadoEm: 2026-11-04
status: rascunho
referencias:
  - Nome da fonte oficial | https://www.planalto.gov.br/...
---

## Primeiro subtítulo

Texto em Markdown.
```

Fluxo: escreva com `status: rascunho`; o texto aparece no modo prévia marcado
como “modelo · não publicado”. Depois da sua revisão, troque para
`status: publicado`. Só então ele entra no site público, no sitemap e nos dados
estruturados `Article`.

Se houve revisão de verdade depois da publicação, acrescente
`atualizadoEm: 2026-12-01`. Não mude a data só para o texto parecer novo.

## 5. Atualizar horários, endereço e modalidade

```ts
horarios: ['Segunda a sexta, das 8h às 18h'],
endereco: {
  logradouro: 'Avenida Exemplo, 1000',
  complemento: 'Sala 4',
  bairro: 'Centro',
  cidade: 'Ariquemes',
  uf: 'RO',
  cep: '76870-000',
  linkMapa: 'https://maps.google.com/?q=...',
},
atendimentoPorVideoconferencia: true,
```

O endereço aparece na página de contato com um link externo para o mapa — não há
mapa de terceiro carregado automaticamente. Só preencha com endereço real e
verificável.

## 6. Trocar cores e tipografia

`src/styles/globals.css`, bloco `@theme`. Alterar um token muda o site inteiro.
Antes de mudar uma cor de texto, confira o contraste (mínimo 4,5:1 para texto
normal) — a tabela atual está em `docs/DIRECAO_VISUAL.md`.

Para trocar uma fonte: coloque o `.woff2` em `public/fonts/`, ajuste os blocos
`@font-face` no topo do mesmo arquivo, atualize `--font-display` ou
`--font-sans` e o `<link rel="preload">` em `src/app/layout.tsx`. Use apenas
fontes cuja licença permita hospedagem própria.

## 7. Tirar o site do modo prévia

No ambiente de produção, defina `NEXT_PUBLIC_MODO_PREVIA=false`. Isso remove a
faixa de prévia, esconde rascunhos, libera o `robots.txt` e passa a gerar o
sitemap. Confira `docs/CONTEUDO_E_PENDENCIAS.md` antes.

## 8. Manter o `lastmod` honesto

`src/content/revisoes.ts` guarda a data de última revisão de cada rota. Atualize
a linha quando o conteúdo mudar de fato. O sitemap não usa a data do build
justamente para não anunciar mudança que não houve.

# Direção visual

Registro do que foi efetivamente aplicado no site, a partir dos arquivos de
marca enviados (`Logotipo l Vetor.pdf` e `Logotipo Secundária.pdf`, ambos
exportados do Illustrator em abril de 2023).

## 1. Versões da marca

Os vetores originais vieram em PDF com 4 páginas cada, sobre fundos quadrados de
1080 × 1080 pt. Foram convertidos para SVG, recortados na caixa real do desenho e
salvos em `public/brand/`. Nenhum traço, proporção ou cor foi alterado.

| Arquivo | Uso |
| --- | --- |
| `logo-horizontal.svg` | Versão principal, colorida. Cabeçalho e fundos claros. |
| `logo-horizontal-branco.svg` | Negativo monocromático para fundos escuros. Rodapé. |
| `logo-horizontal-preto.svg` | Monocromático escuro, para impressão ou fundo sem cor. |
| `logo-vertical.svg` | Lockup secundário empilhado, colorido. |
| `logo-vertical-branco.svg` | Lockup empilhado em negativo. Painel da primeira dobra. |
| `simbolo.svg` / `simbolo-branco.svg` | Monograma isolado. Ícone, 404, encerramentos. |
| `public/icone.svg` | Favicon: monograma com área de proteção e fundo papel. |
| `public/apple-icon.png` | Ícone 180 × 180 para iOS, gerado do mesmo vetor. |
| `public/opengraph-image.png` | Imagem de compartilhamento 1200 × 630, montada com o logotipo real. |

As versões em negativo são o desenho monocromático da própria identidade com a
tinta trocada por branco — não há filtro CSS alterando cor de logotipo em
lugar nenhum do site.

**Área de proteção:** uma vez a largura do traço do monograma em volta de todo o
lockup. **Tamanho mínimo:** 120 px de largura para a versão horizontal, 40 px de
altura para o símbolo isolado. O componente `Marca` recebe altura e calcula a
largura pela proporção original, de modo que a marca nunca distorce.

## 2. Cores

Extraídas diretamente dos vetores:

| Token | Valor | Origem | Papel |
| --- | --- | --- | --- |
| `--color-verde` | `#457134` | verde do logotipo | Acento único: filetes, numeração, links, botão principal. |
| `--color-tinta` | `#14160F` | derivado do preto `#050606` | Texto principal. |
| `--color-tinta-suave` | `#4B4F44` | — | Corpo de texto longo. |
| `--color-tinta-tenue` | `#676B61` | — | Legendas e versaletes. |
| `--color-papel` | `#F6F5F1` | fundo claro dos arquivos | Superfície principal. |
| `--color-papel-fundo` | `#EFEEE8` | — | Blocos de apoio. |
| `--color-escuro` | `#151A10` | derivado do verde | Superfície escura: contato e rodapé. |
| `--color-verde-claro` | `#86A874` | — | Acento sobre fundo escuro. |

O acento é o verde da marca. Não há dourado, metálico ou gradiente decorativo.
O verde aparece pouco e sempre com função: hierarquia, direção ou estado.

**Contraste verificado** (WCAG 2.2, texto normal exige 4,5:1):

| Par | Razão |
| --- | --- |
| tinta / papel | 16,7:1 |
| tinta-suave / papel | 7,7:1 |
| tinta-tenue / papel-fundo | 4,7:1 |
| verde / papel | 5,3:1 |
| papel / verde (botão sólido) | 5,3:1 |
| verde-claro / escuro | 6,6:1 |
| papel a 60% / escuro | 6,5:1 |

## 3. Tipografia

O wordmark é uma didone de alto contraste. Para manter a mesma família de
sensação sem imitar o logotipo:

- **Títulos — Bodoni Moda** (SIL Open Font License). Didone de contraste alto,
  parente próxima do desenho do wordmark.
- **Texto, navegação e interface — Inter** (SIL Open Font License). Sem serifa
  humanista, boa leitura em telas pequenas.

Ambas são **hospedadas localmente** em `public/fonts/`, subsets latin e
latin-ext, em arquivos variáveis `woff2` (4 arquivos, 205 KB no total). Não há
requisição a servidores de fonte de terceiros. Os dois subsets latinos são
pré-carregados no `<head>`.

Escala: corpo entre 16 e 17 px, entrelinha 1,65, linhas em torno de 58–62
caracteres. Títulos fluidos com `clamp()`. Versaletes com `0.16em` de
entreletra, ecoando o “ADVOCACIA” do logotipo.

## 4. Composição

- Grade de 12 colunas, largura máxima de 1280 px.
- Margens fluidas: `clamp(1.25rem, 5vw, 5rem)`.
- Separação por espaço, alinhamento e filete de 1 px — quase nenhuma sombra,
  nenhuma borda pesada, nenhum cartão repetido seção após seção.
- Alternância de superfícies: papel → papel de apoio → escuro no encerramento.
- Elemento de assinatura derivado da marca: o filete curto antes de cada
  versalete e o raio de canto generoso dos painéis, que repete o canto
  arredondado do monograma.

## 5. Fotografia

Três retratos profissionais, todos em fundo escuro, distribuídos em posições
distintas para não repetir a mesma imagem:

- **Primeira dobra:** retrato em preto e branco, mãos entrelaçadas, proporção
  3:4. O preto e branco conversa com a tinta quase preta da marca e deixa o
  verde como único ponto de cor da tela — foi escolhido por isso.
- **Apresentação na home:** retrato sentado, terno azul, proporção 5:6.
- **Página de perfil:** retrato sorrindo, terno azul, proporção 5:6, ancorado
  no topo para preservar o rosto em telas estreitas.

O mesmo retrato em preto e branco compõe a imagem de compartilhamento
(`public/opengraph-image.png`), ao lado do logotipo e do slogan.

Os campos ficam em `site.fotos`. Qualquer um em `null` devolve aquela posição ao
painel escuro com o lockup vertical em negativo — nenhuma moldura vazia e nenhum
rosto genérico em lugar nenhum.

## 6. Movimento

Entrada curta da primeira dobra em CSS puro (opacidade e 14 px de deslocamento,
600 ms, três atrasos escalonados). Transições de estado entre 150 e 300 ms.
Nenhuma biblioteca de animação, nenhum observador de rolagem: sem JavaScript o
conteúdo aparece igual. `prefers-reduced-motion: reduce` elimina a animação.

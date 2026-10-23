# SEO, busca local e presença no Google

Documento de decisões, hipóteses e plano. Atualizado em 23 de outubro de 2026.

> **O que este documento não promete.** Nenhuma implementação garante primeiro
> lugar no Google, e mudanças podem levar meses para surtir efeito. Investir em
> anúncios não compra posição orgânica. As metas aqui são de trabalho
> verificável, não de posição.

## 1. Objetivo

Ser encontrado por quem procura advocacia em Ariquemes e região nas quatro áreas
atendidas, e por quem procura o nome de Gabriel Dalla Costa. O sucesso é medido
por páginas indexadas, impressões e cliques por consulta, e contatos compatíveis
com a atuação — não por uma posição isolada.

## 2. O que já está implementado no código

| Item | Estado |
| --- | --- |
| Conteúdo essencial no HTML, sem depender de clique ou script | Feito. As páginas são estáticas; o texto está no HTML entregue. |
| Títulos e metadescrições próprios por página | Feito. `src/lib/seo.tsx` e o `metadata` de cada rota. |
| `canonical` por página | Feito, derivado de `site.dominio`. |
| URLs descritivas e estáveis | Feito (`/atuacao/direito-civil-e-contratos`). |
| Sitemap só com URLs públicas e canônicas | Feito. `src/app/sitemap.ts`. Rascunhos ficam fora. |
| `lastmod` refletindo revisão real | Feito. `src/content/revisoes.ts` — não usa a data do build. |
| `robots.txt` por ambiente | Feito. Prévia bloqueia tudo; produção libera e aponta o sitemap. |
| `noindex` em prévia e em rascunhos | Feito, nos metadados. Não é controle de acesso: em produção o rascunho devolve 404. |
| 404 com status correto | Feito. |
| Links internos com texto descritivo | Feito. Home → áreas; áreas → outras áreas e perfil; artigos → área e perfil; rodapé liga tudo. |
| Dados estruturados `Person`, `LegalService`, `Article`, `BreadcrumbList` | Feito. Só fatos confirmados; sem `AggregateRating`, prêmios ou contagem de clientes. |
| Open Graph e favicon a partir dos ativos reais | Feito. |
| Versão mobile e desempenho | Ver `docs/DIRECAO_VISUAL.md` e seção 7 deste documento. |

Endereço, horários e `sameAs` entram no JSON-LD **somente** quando preenchidos em
`src/config/site.ts` com dados reais.

## 3. Pesquisa de demanda — o que foi e o que não foi medido

**Não há dados de volume.** Não houve acesso ao Google Keyword Planner nem a
outra fonte de volume de busca. Toda a coluna de volume do
`docs/MAPA_DE_CONSULTAS.md` está marcada como **volume não medido**. Nenhum
número foi estimado.

**Amostra de concorrência — limitações declaradas.** Foi feita uma consulta na
web em 23/10/2026 a partir de um servidor fora do Brasil, em desktop, sem
localização em Ariquemes. Isso **não** equivale a uma busca feita por um morador
de Ariquemes no celular, e **não** substitui uma auditoria do Google Maps na
cidade. O que a amostra mostrou, como hipótese a confirmar:

| Tipo de resultado | Exemplos observados | Leitura |
| --- | --- | --- |
| Escritórios nacionais com página por cidade e por área | `vlvadvogados.com/advogado-familia-ariquemes-ro/` e congêneres | Ocupam consultas “advogado de [área] em Ariquemes” com páginas geradas em escala. Não dá para competir por volume de páginas — e nem se deve. |
| Diretórios jurídicos | JusBrasil, JurídicoCerto, Previdenciarista | Capturam muito da busca por nome e por área + cidade. |
| Escritórios locais com presença própria fraca | perfis em diretórios, sem site próprio | Oportunidade: um site próprio, com conteúdo específico e identificação clara, se diferencia pela substância. |

**Observação relevante:** parte dessas páginas concorrentes usa recursos que este
projeto deliberadamente não usa (contagem de clientes atendidos, linguagem
promocional). Não copie. A diferenciação aqui é conteúdo próprio, identificação
profissional e clareza — que também é o que as normas de publicidade pedem.

**A executar antes da fase de conteúdo** (itens que dependem de acesso ou de
estar na região):

1. Buscar, do celular e em Ariquemes, as consultas do mapa de consultas, e
   registrar o que aparece: resultados locais, diretórios, escritórios locais.
2. Se houver conta Google Ads, abrir o Keyword Planner com localização Ariquemes
   e registrar volume, período e abrangência dos dados.
3. Examinar 3 a 5 sites que aparecerem de fato, anotando URL, escopo e clareza do
   atendimento.

## 4. Foco inicial

Concentrar a primeira fase em **duas áreas prioritárias**, entre as quatro
publicadas — decisão de projeto, não regra do Google. Sugestão a confirmar com
base no que você quer atrair: **Direito de Família e Sucessões** e **Direito do
Consumidor**, por serem as de demanda mais pulverizada e busca mais direta do
cidadão. Se o interesse for carteira empresarial, troque por **Civil e
Contratos**.

Uma página por intenção. Não criar páginas separadas para “advogado Ariquemes”,
“advogado em Ariquemes” e “advocacia Ariquemes” — é a mesma intenção.

## 5. Títulos em uso

| Página | Title |
| --- | --- |
| Home | `Advocacia em Ariquemes \| Gabriel Dalla Costa` |
| Área | `[Área] em Ariquemes \| Dalla Costa Advocacia` |
| Perfil | `Gabriel Dalla Costa — advogado em Ariquemes \| Dalla Costa Advocacia` |
| Contato | `Contato — advocacia em Ariquemes \| Dalla Costa Advocacia` |
| Artigo | `[Título do texto] \| Dalla Costa Advocacia` |

O H1 da home é **“Advocacia em Ariquemes/RO”**, visível e legível; o slogan
continua sendo o destaque tipográfico, em outro elemento. Nada está escondido
para mecanismo de busca. O Google pode escolher outro título ou trecho para
exibir — o que está configurado é uma preferência, não uma garantia.

## 6. Google Perfil da Empresa e Maps

**Condicionado à elegibilidade.** Só criar perfil se houver operação real
compatível com as regras do Google:

- Com **endereço próprio** de atendimento: perfil com endereço.
- Sem endereço próprio, atendendo presencialmente na região: perfil com **área de
  cobertura**, sem endereço exibido.
- Atuação apenas on-line: **não** apresentar como escritório físico.

Não usar endereço de correspondência, caixa postal ou escritório virtual sem
operação. Para coworking, conferir as regras específicas antes de cadastrar.

Ao configurar: nome exatamente como a marca é reconhecida (“Dalla Costa
Advocacia”), **sem acrescentar áreas ou cidades ao nome**; categoria pertinente
(advogado / escritório de advocacia); telefone, site e horários reais; um perfil
só — não criar um por especialidade. Revisar duplicidades e manter o controle da
conta com você.

Relevância, distância e destaque influenciam os resultados locais. Adicionar
cidades à área de cobertura não elimina a distância nem garante aparecer nelas.

**Avaliações:** este projeto não inclui campanha de solicitação de avaliações nem
incentivo. Se houver manifestação espontânea, não confirmar representação, não
expor fatos do atendimento e não transformar o relato em propaganda de resultado
— o sigilo profissional vale também ali.

## 7. Desempenho — o que foi verificado

Build de produção estático; nenhuma biblioteca de animação, nenhum script de
terceiro, nenhum embed. Fontes locais, 4 arquivos `woff2`, 205 KB no total, com
preload dos subsets latinos. Imagens: apenas SVGs de marca, com `width`/`height`
declarados.

**Medições de campo (LCP, INP, CLS no percentil 75) não foram realizadas** — elas
exigem tráfego real no domínio definitivo. As metas de projeto são LCP ≤ 2,5 s,
INP ≤ 200 ms e CLS ≤ 0,1, a serem verificadas depois da publicação pelo relatório
de Core Web Vitals do Search Console. Nenhuma pontuação de Lighthouse é
apresentada aqui porque nenhuma foi executada no ambiente desta entrega.

## 8. Medição

**Google Search Console — pendente.** Não houve acesso à conta nem ao DNS, então
a verificação **não foi feita**. Passo a passo depois da publicação:

1. Acessar o Search Console e adicionar a propriedade de **domínio** (verificação
   por registro TXT no DNS) — cobre `http`, `https`, `www` e subdomínios.
2. Publicar o registro TXT no painel do provedor do domínio e confirmar.
3. Enviar `https://SEU-DOMINIO/sitemap.xml` em “Sitemaps”.
4. Pedir indexação da home e das páginas de área em “Inspeção de URL”.

Indicadores a acompanhar mensalmente: páginas prioritárias indexadas; impressões
e cliques por consulta e por página; buscas pela marca versus buscas por tema;
CTR lido junto da consulta e da posição; tendência de posição por grupo de
consultas; cliques em contato, se forem medidos.

Analytics com script no site continua **desabilitado** nesta versão
(`analyticsHabilitado: false`). O Search Console não depende disso.

## 9. Google Ads — plano de teste, não ativado

Nada foi criado nem veiculado. A OAB admite aquisição de palavras-chave em
resposta à busca do interessado, observados os limites éticos; revise textos,
destino e situação profissional antes de qualquer veiculação.

Hipótese de teste: campanhas **só de Pesquisa**, geografia restrita a Ariquemes e
municípios realmente atendidos; grupos pequenos por intenção; correspondência de
frase ou exata como ponto de partida; página de destino = a página da área
correspondente, nunca a home genérica.

Negativas sugeridas: `emprego`, `vaga`, `estágio`, `concurso`, `OAB`, `curso`,
`modelo de petição`, `grátis`, `download`, `salário`. São hipóteses de campanha,
não regras para o conteúdo orgânico.

**Orçamento: a definir.** Nenhuma estimativa de custo por clique é apresentada —
ela exigiria fonte, período e localidade medidos. Medir consultas de pesquisa,
gasto e contatos pertinentes, distinguindo clique em WhatsApp de mensagem
recebida. Sem remarketing e sem públicos baseados em questões pessoais sensíveis.

## 10. Plano de 90 dias

Organiza o trabalho. **Não é promessa de posição em 90 dias.**

| Período | Ações | Evidência |
| --- | --- | --- |
| Dias 1–15 | Registrar e apontar o domínio; revisar e aprovar os textos; conferir situação cadastral na OAB/RO; executar a pesquisa de consultas localmente. | Domínio no ar, textos aprovados, mapa de consultas com evidência. |
| Dias 16–30 | Publicar com `NEXT_PUBLIC_MODO_PREVIA=false`; verificar domínio no Search Console; enviar sitemap; avaliar elegibilidade do Perfil da Empresa. | Build publicado, URLs respondendo, sitemap aceito, perfil criado ou pendência registrada. |
| Dias 31–60 | Publicar 2 textos revisados das áreas prioritárias; reforçar links internos; corrigir o que o Search Console apontar. | URLs publicadas e primeiro relatório de impressões. |
| Dias 61–90 | Revisar consultas e páginas; atualizar textos fracos; decidir sobre teste pago só com orçamento aprovado. | Relatório de achados e lista priorizada. |
| Depois | Manter 2 textos/mês, dados locais corretos e acompanhamento técnico. | Registro mensal de mudanças. |

## 11. Presença externa

Manter os dados corretos onde já existem (perfis profissionais oficiais,
publicações jurídicas legítimas) e incluir o link do site quando a plataforma
permitir. Avaliar diretórios antes de cadastrar — nem todos ajudam.

Não comprar backlinks, não participar de redes de troca, não distribuir
comentários com link, não comprar domínio antigo para simular reputação. Não
criar vínculo com a administração pública para promover a advocacia.

## 12. Respostas com IA do Google

As boas práticas de SEO valem igualmente: páginas acessíveis, informação
consistente, autoria e fontes. O Google **não** exige schema exclusivo,
`llms.txt` ou qualquer “otimização para IA” para aparecer nesses recursos, e
ninguém pode prometer citação. Nada disso foi implementado como requisito.

## 13. Checklist de publicação

- [x] WhatsApp real preenchido em `src/config/site.ts`.
- [ ] E-mail profissional preenchido (opcional, mas recomendado).
- [x] `dominio` apontando para `https://advocaciadallacosta.com.br`.
- [ ] Domínio registrado, apontado para a hospedagem e com HTTPS ativo.
- [ ] Textos de áreas, perfil, FAQ e privacidade revisados e aprovados por você.
- [ ] Situação cadastral na OAB/RO conferida.
- [ ] `NEXT_PUBLIC_MODO_PREVIA=false` no ambiente de produção.
- [ ] `npm run build`, `npm run lint` e `npm run typecheck` passando.
- [ ] HTTPS ativo e versão principal do domínio definida (com ou sem `www`).
- [ ] `/robots.txt` liberando e apontando o sitemap.
- [ ] `/sitemap.xml` sem rascunhos e com `lastmod` coerente.
- [ ] Domínio verificado no Search Console e sitemap enviado.
- [ ] Perfil da Empresa criado **ou** pendência registrada com o motivo.
- [ ] Compartilhamento testado (prévia do link em WhatsApp e LinkedIn).

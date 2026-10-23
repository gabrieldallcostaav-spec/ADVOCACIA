# Monitoramento e backup

**Nenhuma ferramenta de monitoramento foi contratada.** Nada está sendo monitorado automaticamente hoje. Abaixo está o procedimento manual e a configuração proposta para quando houver aprovação de custo.

## 1. O que verificar

| # | Verificação | Como | Frequência |
| --- | --- | --- | --- |
| 1 | O site responde | Abrir `https://advocaciadallacosta.com.br` | Semanal |
| 2 | Páginas principais | Home, `/atuacao`, `/contato`, `/cartao` | Mensal |
| 3 | Links de contato | Clicar no WhatsApp e confirmar que abre o número certo | Mensal |
| 4 | Rota inexistente devolve 404 | Abrir `/teste-404` | A cada publicação |
| 5 | `robots.txt` e `sitemap.xml` | Abrir os dois e conferir o conteúdo | A cada publicação |
| 6 | Certificado HTTPS | Cadeado no navegador | Mensal (o Cloudflare renova sozinho) |
| 7 | Vencimento do domínio | Registro.br | Anual — anote a data |
| 8 | Indexação | Search Console, após verificado | Mensal |

Como não há formulário, envio de e-mail nem integração de agenda nesta fase, os itens 3, 4 e 5 da lista pedida pelo briefing (erros de formulário, falhas de integração) **não se aplicam ainda**. Passam a valer com a fase 2.

## 2. Configuração proposta, quando houver aprovação

O Cloudflare oferece verificação de disponibilidade na própria conta onde o site está hospedado — é o caminho mais direto, sem contratar outro fornecedor. Proposta:

- Verificação da home a cada 5 minutos, de pelo menos duas regiões.
- Alerta por e-mail para o endereço profissional, quando ele existir.
- Critério: duas falhas consecutivas, para não disparar por oscilação de rede.

**Distinguir falha sua de falha do provedor.** Se o Cloudflare estiver com problema geral, o site cai junto e não há o que corrigir no código. Confira o painel de status do provedor antes de mexer em qualquer coisa.

Nada disso promete disponibilidade: o site não tem garantia de funcionamento ininterrupto, e o site não anuncia atendimento permanente.

## 3. Cuidados com verificações automáticas

Quando o monitoramento existir, ele **não pode**:

- Enviar e-mails reais a visitantes.
- Criar solicitações ou agendamentos fictícios no sistema real.
- Registrar dados pessoais ou relatos jurídicos em logs e ferramentas de erro.

Use ambiente e dados de teste, com limpeza controlada.

## 4. Backup

| O que | Onde está | Como recuperar |
| --- | --- | --- |
| Código e conteúdo | Git, no GitHub | `git clone` |
| Marca (SVG) | `public/brand/`, versionado | Git. Os PDFs originais continuam sendo a fonte — guarde-os à parte. |
| Fotografias otimizadas | `public/images/`, versionado | Git. Guarde os originais fora do repositório. |
| Site publicado | Reconstruído do código | `npm run deploy` |
| Dados operacionais | Não existem nesta fase | — |

Mantenha um clone do repositório em outra máquina ou disco. É o backup real do projeto.

**Restauração testada: não aplicável.** Não há banco. Quando a fase 2 existir, faça uma restauração de teste e registre o resultado aqui — um backup nunca restaurado não deve ser apresentado como recuperação verificada.

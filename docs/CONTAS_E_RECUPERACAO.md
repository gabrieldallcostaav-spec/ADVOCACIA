# Contas, autonomia e recuperação

**Nenhuma senha, chave ou código de recuperação está neste repositório ou neste documento.** Guarde-os num gerenciador de senhas sob seu controle.

## 1. Inventário

Preencha a coluna *Titular* conforme for criando as contas. Tudo deve ficar no seu nome.

| Item | Serviço | Titular | Acesso de terceiros | Situação |
| --- | --- | --- | --- | --- |
| Domínio `advocaciadallacosta.com.br` | Registro.br | **a confirmar** | — | A registrar/apontar |
| DNS | Cloudflare | **a confirmar** | — | Pendente da troca de servidores de nome |
| Hospedagem | Cloudflare Workers | **a confirmar** | — | Publicado em conta temporária; aguarda reivindicação |
| Repositório | GitHub — `gabrieldallcostaav-spec/ADVOCACIA` | Gabriel | — | Ativo |
| E-mail profissional | a definir | — | — | **Pendente** |
| Google Search Console | Google | — | — | **Não verificado** |
| Google Perfil da Empresa | Google | — | — | Não criado; elegibilidade a avaliar |
| Calendário | — | — | — | Não aplicável (fase 2) |
| Banco de dados | — | — | — | Não aplicável (fase 2) |
| Analytics | — | — | — | Desabilitado por decisão de projeto |

## 2. Regras de acesso

- Cada pessoa com acesso usa **a própria conta**, nomeada. Nunca uma senha compartilhada.
- Ative autenticação em duas etapas onde o serviço oferecer, principalmente no Registro.br, no Cloudflare, no GitHub e no e-mail.
- Guarde os códigos de recuperação fora do computador de trabalho.
- Ao contratar um prestador, dê acesso ao que ele precisa e **remova ao terminar**.
- O e-mail de recuperação dessas contas deve ser um endereço que só você controla.

### Como revogar o acesso de um prestador

1. **Cloudflare:** Manage Account → Members → remover a pessoa.
2. **GitHub:** Settings do repositório → Collaborators → remover.
3. **Registro.br:** trocar a senha e revisar contatos do domínio.
4. **Search Console:** Configurações → Usuários e permissões → remover.
5. Troque qualquer senha que tenha sido compartilhada, mesmo que verbalmente.

## 3. Custos

Nenhum serviço pago foi contratado neste projeto.

| Item | Situação |
| --- | --- |
| Registro `.com.br` | Tarifa anual do Registro.br — consulte o valor vigente no site deles. |
| Cloudflare Workers | O site cabe no plano gratuito. Não verifiquei limites e preços do plano pago; consulte a página oficial antes de assumir qualquer valor. |
| GitHub | Repositório privado em plano gratuito. |

**Nenhum preço foi inventado aqui.** Confirme valores nas páginas oficiais na data da contratação.

## 4. O que já está entregue

- **Código completo** no repositório, com instruções no `README.md`.
- **Publicação e recuperação**: `docs/DEPLOY_CLOUDFLARE.md`.
- **Ativos de marca**: os SVGs em `public/brand/` foram derivados dos seus PDFs vetoriais, que continuam sendo a fonte original — guarde-os.
- **Fotografias**: as versões otimizadas estão em `public/images/`. Guarde os originais fora do repositório.
- **Conteúdo**: todo o texto do site está em `src/content/` e `src/config/site.ts`, em arquivos legíveis.

## 5. Independência

O site pode ser mantido por qualquer outro profissional a partir deste repositório: é um projeto Next.js padrão, sem dependência de serviço proprietário, sem banco de dados e sem painel. Quem assumir precisa de Node.js, do repositório e do acesso ao Cloudflare.

## 6. Recuperação

| Cenário | O que fazer |
| --- | --- |
| Site fora do ar | `npm run deploy` reconstrói e republica a partir do repositório. |
| Deploy ruim publicado | No painel do Cloudflare, reverter para a versão anterior do Worker. |
| Repositório perdido | Qualquer clone local serve para recriar; mantenha um clone em outra máquina. |
| Conteúdo perdido | Está versionado no Git — recupere pelo histórico. |
| Domínio expirado | Renove no Registro.br. Anote a data de vencimento. |

Não há banco de dados nesta fase, portanto não há restauração a testar. Quando a fase 2 existir, a restauração precisa ser testada de verdade e o resultado registrado — um backup nunca restaurado não conta como recuperação verificada.

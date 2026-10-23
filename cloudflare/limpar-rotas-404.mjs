/**
 * Remove de `out/` as páginas que o build gerou chamando `notFound()`.
 *
 * No build estático, uma rota que chama `notFound()` ainda vira um arquivo
 * HTML. Servido assim, o Cloudflare devolveria status 200 com uma página de
 * erro — um rascunho apareceria como "existente" para o visitante e para os
 * mecanismos de busca.
 *
 * Apagando esses arquivos, a URL deixa de existir e o `not_found_handling`
 * configurado em wrangler.jsonc devolve a página 404 com status 404.
 */
import { readdir, readFile, rm, stat } from 'node:fs/promises';
import path from 'node:path';

const RAIZ = path.join(process.cwd(), 'out');
const MARCA_DE_ERRO = '__next_error__';
const PRESERVAR = new Set(['404.html']);

async function listarHtml(diretorio) {
  const entradas = await readdir(diretorio, { withFileTypes: true });
  const arquivos = [];

  for (const entrada of entradas) {
    const caminho = path.join(diretorio, entrada.name);
    if (entrada.isDirectory()) {
      if (entrada.name === '_next') continue;
      arquivos.push(...(await listarHtml(caminho)));
    } else if (entrada.name.endsWith('.html')) {
      arquivos.push(caminho);
    }
  }

  return arquivos;
}

async function removerSeExistir(caminho) {
  try {
    await stat(caminho);
    await rm(caminho, { recursive: true, force: true });
    return true;
  } catch {
    return false;
  }
}

const removidas = [];

for (const arquivo of await listarHtml(RAIZ)) {
  const relativo = path.relative(RAIZ, arquivo);
  if (PRESERVAR.has(relativo)) continue;

  const conteudo = await readFile(arquivo, 'utf8');
  if (!conteudo.includes(MARCA_DE_ERRO)) continue;

  const semExtensao = arquivo.slice(0, -'.html'.length);
  await removerSeExistir(arquivo);
  // Payload de navegação do cliente e diretório de segmentos da mesma rota.
  await removerSeExistir(`${semExtensao}.txt`);
  await removerSeExistir(semExtensao);

  removidas.push('/' + relativo.slice(0, -'.html'.length));
}

// Artefato interno do Next; não é uma rota do site.
await removerSeExistir(path.join(RAIZ, '_not-found.html'));
await removerSeExistir(path.join(RAIZ, '_not-found.txt'));
await removerSeExistir(path.join(RAIZ, '_not-found'));

if (removidas.length > 0) {
  console.log(`Rotas sem conteúdo publicado removidas do build (passam a responder 404): ${removidas.join(', ')}`);
} else {
  console.log('Nenhuma rota precisou ser removida do build.');
}

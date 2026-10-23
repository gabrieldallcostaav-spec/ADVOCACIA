'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import type { OpcaoAssistente } from '@/content/assistente';

/**
 * Assistente de navegação — determinístico, só com menus.
 *
 * Não há campo de texto livre: o visitante escolhe entre perguntas aprovadas e
 * recebe respostas montadas a partir do conteúdo publicado. Por construção, não
 * há como ele inventar um fato, opinar sobre um caso ou receber instruções
 * embutidas numa mensagem. Nenhum dado do visitante é coletado ou enviado.
 *
 * Fica oculto no celular para não se acumular com a barra fixa de contato.
 */
export function AssistenteDeNavegacao({ opcoes }: { opcoes: OpcaoAssistente[] }) {
  const [aberto, setAberto] = useState(false);
  const [selecionada, setSelecionada] = useState<string | null>(null);
  const botao = useRef<HTMLButtonElement>(null);
  const painel = useRef<HTMLDivElement>(null);
  const idPainel = useId();

  useEffect(() => {
    if (!aberto) return;

    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') {
        setAberto(false);
        botao.current?.focus();
      }
    };

    document.addEventListener('keydown', aoTeclar);
    painel.current?.querySelector<HTMLElement>('button, a')?.focus();
    return () => document.removeEventListener('keydown', aoTeclar);
  }, [aberto]);

  if (opcoes.length === 0) return null;

  const atual = opcoes.find((opcao) => opcao.id === selecionada);

  return (
    <div className="pointer-events-none fixed right-6 bottom-6 z-40 hidden md:block">
      <div
        id={idPainel}
        ref={painel}
        role="dialog"
        aria-label="Assistente de navegação"
        hidden={!aberto}
        className="pointer-events-auto mb-3 w-[22rem] overflow-hidden rounded-[1.75rem] border border-linha bg-papel shadow-[0_18px_48px_-24px_rgba(20,22,15,0.35)]"
      >
        <div className="border-b border-linha px-6 py-4">
          <p className="capitular text-verde">Assistente de navegação</p>
          <p className="mt-2 text-nota text-tinta-tenue">
            Ajuda a encontrar páginas deste site. Não analisa casos nem substitui o contato com o
            advogado.
          </p>
        </div>

        <div className="max-h-[26rem] overflow-y-auto px-6 py-5">
          {atual ? (
            <div>
              <button
                type="button"
                onClick={() => setSelecionada(null)}
                className="capitular text-tinta-tenue transition-colors hover:text-verde"
              >
                ← Voltar
              </button>
              <p className="mt-5 font-display text-lg font-medium leading-snug">{atual.pergunta}</p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-tinta-suave">{atual.resposta}</p>

              <ul className="mt-5 grid gap-2">
                {atual.destinos.map((destino) => (
                  <li key={destino.href + destino.rotulo}>
                    {destino.externo ? (
                      <a
                        href={destino.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-[2.75rem] items-center justify-between gap-3 rounded-2xl bg-papel-fundo px-4 text-[0.9375rem] transition-colors hover:text-verde"
                      >
                        {destino.rotulo}
                        <span aria-hidden>→</span>
                        <span className="sr-only">(abre em nova aba)</span>
                      </a>
                    ) : (
                      <Link
                        href={destino.href}
                        onClick={() => setAberto(false)}
                        className="flex min-h-[2.75rem] items-center justify-between gap-3 rounded-2xl bg-papel-fundo px-4 text-[0.9375rem] transition-colors hover:text-verde"
                      >
                        {destino.rotulo}
                        <span aria-hidden>→</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-nota text-tinta-tenue">
                Informação retirada de{' '}
                <Link
                  href={atual.origem.href}
                  onClick={() => setAberto(false)}
                  className="underline decoration-verde underline-offset-[0.3em] hover:text-verde"
                >
                  {atual.origem.rotulo}
                </Link>
                .
              </p>
            </div>
          ) : (
            <ul className="grid gap-2">
              {opcoes.map((opcao) => (
                <li key={opcao.id}>
                  <button
                    type="button"
                    onClick={() => setSelecionada(opcao.id)}
                    className="flex min-h-[2.75rem] w-full items-center justify-between gap-3 rounded-2xl bg-papel-fundo px-4 text-left text-[0.9375rem] transition-colors hover:text-verde"
                  >
                    {opcao.pergunta}
                    <span aria-hidden>→</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button
        ref={botao}
        type="button"
        onClick={() => {
          setAberto((estado) => !estado);
          setSelecionada(null);
        }}
        aria-expanded={aberto}
        aria-controls={idPainel}
        className="pointer-events-auto ml-auto flex min-h-[2.875rem] items-center gap-2 rounded-full bg-escuro px-6 text-[0.9375rem] text-papel transition-colors hover:bg-verde-escuro"
      >
        {aberto ? 'Fechar' : 'Encontrar no site'}
      </button>
    </div>
  );
}

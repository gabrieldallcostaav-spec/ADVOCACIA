'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { MarcaLink } from '@/components/ui/Marca';
import { Botao } from '@/components/ui/Botao';

export type ItemNavegacao = {
  href: string;
  rotulo: string;
};

export function SiteHeader({ navegacao }: { navegacao: ItemNavegacao[] }) {
  const caminho = usePathname();
  const [rolou, setRolou] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const botaoMenu = useRef<HTMLButtonElement>(null);
  const painelMenu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  // Escape fecha e devolve o foco ao botão que abriu.
  useEffect(() => {
    if (!menuAberto) return;

    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') {
        setMenuAberto(false);
        botaoMenu.current?.focus();
      }
    };

    document.addEventListener('keydown', aoTeclar);
    painelMenu.current?.querySelector<HTMLElement>('a, button')?.focus();
    return () => document.removeEventListener('keydown', aoTeclar);
  }, [menuAberto]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        rolou || menuAberto ? 'bg-papel border-b border-linha' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-site items-center justify-between gap-6 px-gutter py-4 md:py-5">
        <MarcaLink altura={42} className="shrink-0" />

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 md:flex">
          {navegacao.map((item) => {
            const ativo = caminho === item.href || caminho.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={ativo ? 'page' : undefined}
                className={`text-[0.9375rem] transition-colors hover:text-verde ${
                  ativo ? 'text-verde' : 'text-tinta-suave'
                }`}
              >
                {item.rotulo}
              </Link>
            );
          })}
          <Botao href="/contato" variante="contorno" className="min-h-[2.5rem] px-5 text-sm">
            Contato
          </Botao>
        </nav>

        <button
          ref={botaoMenu}
          type="button"
          onClick={() => setMenuAberto((atual) => !atual)}
          aria-expanded={menuAberto}
          aria-controls="menu-mobile"
          className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
        >
          <span className="sr-only">{menuAberto ? 'Fechar menu' : 'Abrir menu'}</span>
          <span aria-hidden className="relative block h-3 w-6">
            <span
              className={`absolute left-0 block h-px w-6 bg-tinta transition-transform duration-300 ${
                menuAberto ? 'top-1.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-tinta transition-transform duration-300 ${
                menuAberto ? 'top-1.5 -rotate-45' : 'top-3'
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="menu-mobile"
        ref={painelMenu}
        hidden={!menuAberto}
        className="border-t border-linha bg-papel md:hidden"
      >
        {/* Qualquer link fecha o menu: delegação em vez de efeito por rota. */}
        <nav
          aria-label="Navegação principal"
          className="flex flex-col px-gutter py-2"
          onClick={() => setMenuAberto(false)}
        >
          {navegacao.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-linha py-4 text-lg text-tinta last:border-b-0"
            >
              {item.rotulo}
            </Link>
          ))}
          <Botao href="/contato" className="my-4 self-start">
            Contato
          </Botao>
        </nav>
      </div>
    </header>
  );
}

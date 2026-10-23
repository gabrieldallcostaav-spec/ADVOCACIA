import Link from 'next/link';
import { Botao } from '@/components/ui/Botao';
import { Marca } from '@/components/ui/Marca';
import { Secao } from '@/components/ui/Secao';
import { areasPublicadas } from '@/content/areas';

export default function NaoEncontrado() {
  return (
    <Secao espacamento="amplo">
      <div className="mx-auto max-w-leitura text-center">
        <Marca versao="simbolo" altura={76} className="mx-auto opacity-80" />
        <p className="capitular mt-10 text-verde">Erro 404</p>
        <h1 className="mt-5 text-[clamp(2rem,1.4rem+2.6vw,3.25rem)]">Esta página não existe.</h1>
        <p className="mx-auto mt-6 max-w-[46ch] text-tinta-suave">
          O endereço pode ter mudado ou o conteúdo pode não estar publicado. Os caminhos abaixo levam
          ao que está disponível no site.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Botao href="/">Página inicial</Botao>
          <Botao href="/contato" variante="contorno">
            Contato
          </Botao>
        </div>

        {areasPublicadas.length > 0 ? (
          <ul className="mx-auto mt-12 flex max-w-[34rem] flex-wrap justify-center gap-x-7 gap-y-3 border-t border-linha pt-8">
            {areasPublicadas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/atuacao/${area.slug}`}
                  className="text-[0.9375rem] text-tinta-suave transition-colors hover:text-verde"
                >
                  {area.titulo}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Secao>
  );
}

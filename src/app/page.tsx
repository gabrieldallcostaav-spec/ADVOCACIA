import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { FaixaIdentificacao } from '@/components/sections/FaixaIdentificacao';
import { Assinatura } from '@/components/sections/Assinatura';
import { IndiceAtuacao } from '@/components/sections/IndiceAtuacao';
import { Perfil } from '@/components/sections/Perfil';
import { Atendimento } from '@/components/sections/Atendimento';
import { VideoApresentacao } from '@/components/sections/VideoApresentacao';
import { Conteudos } from '@/components/sections/Conteudos';
import { Perguntas } from '@/components/sections/Perguntas';
import { BlocoContato } from '@/components/sections/BlocoContato';
import { BarraContatoMobile } from '@/components/layout/BarraContatoMobile';
import { Botao } from '@/components/ui/Botao';
import { Secao, TituloSecao } from '@/components/ui/Secao';
import { areasDaHome, areasPublicadas, notaParcerias } from '@/content/areas';
import { artigosVisiveis } from '@/lib/articles';
import { metadadosDaPagina } from '@/lib/seo';
import { site } from '@/config/site';

export const metadata: Metadata = {
  ...metadadosDaPagina({
    titulo: `Advocacia em ${site.cidadeBase} | ${site.nomeApresentacao}`,
    descricao: `${site.nomeCompleto}, ${site.oab}. Advocacia em ${site.cidadeBase}/${site.uf} em direito civil e contratos, família e sucessões, administrativo e consumidor.`,
    caminho: '/',
  }),
  title: `Advocacia em ${site.cidadeBase} | ${site.nomeApresentacao}`,
};

export default function Home() {
  const artigos = artigosVisiveis();

  return (
    <>
      <Hero />
      <FaixaIdentificacao />

      {areasPublicadas.length > 0 ? (
        <Secao>
          <div className="flex flex-wrap items-end justify-between gap-6">
              <TituloSecao
                capitular="Atuação"
                descricao="Quatro frentes atendidas diretamente, com escopo definido antes do início do trabalho."
              >
                Áreas em que atuo.
              </TituloSecao>
              <Botao href="/atuacao" variante="texto">
                Ver o índice completo
              </Botao>
          </div>

          <IndiceAtuacao areas={areasDaHome} />

          <p className="mt-10 max-w-[58ch] text-nota text-tinta-tenue">{notaParcerias}</p>
        </Secao>
      ) : null}

      <Assinatura />
      <Perfil />
      <VideoApresentacao />
      <Atendimento />
      <Conteudos artigos={artigos} />
      <Perguntas />
      <BlocoContato />
      <BarraContatoMobile />
    </>
  );
}

# Mídia: fotografia e vídeo

## 1. Fotografia — entregue

Três retratos profissionais foram recebidos e aplicados:

| Arquivo | Uso | Proporção e ancoragem |
| --- | --- | --- |
| `public/images/retrato-hero.jpg` | Primeira dobra da home | 3:4, centro |
| `public/images/retrato-alternativo.jpg` | Apresentação na home | 5:6, centro |
| `public/images/retrato-sobre.jpg` | Página `/sobre` e cartão | 5:6, topo |

Para uma próxima sessão, o que falta no acervo atual:

- **Enquadramento horizontal.** Os três arquivos são verticais. Uma versão horizontal daria mais liberdade para composições largas e para a imagem de compartilhamento.
- **Espaço de respiro nas bordas**, para recortes responsivos sem risco de cortar o rosto.
- **Um retrato de meio-corpo em ambiente de trabalho real**, se houver escritório.

Cuidados a manter: nada de documentos de clientes, telas com processos ou qualquer terceiro identificável sem autorização. Guardar os arquivos originais fora do repositório.

## 2. Vídeo — pendente

O componente `VideoApresentacao` está pronto e **não aparece no site** enquanto não houver arquivo. Para publicar, preencha em `src/config/site.ts`:

```ts
video: {
  arquivo: '/videos/apresentacao.mp4',
  capa: '/images/capa-video.jpg',
  legendas: '/videos/apresentacao.pt-BR.vtt',   // obrigatório
  transcricao: '/videos/apresentacao-transcricao.txt',
  duracaoSegundos: 52,
},
```

Sem `arquivo` **ou** sem `legendas`, a seção continua oculta: um vídeo sem legenda não é publicável por acessibilidade.

O player é nativo, servido pelo próprio domínio, sem reprodução automática, sem som automático e com `preload="none"` — o arquivo pesado só é buscado quando a pessoa aperta play. Não há player de terceiro e, portanto, nenhum dado de visitante enviado para fora.

### 2.1 Roteiro — rascunho para sua revisão

Duração alvo: 45 a 60 segundos. É uma orientação de produção deste projeto, não uma exigência de plataforma.

> **Cena 1 — identificação (0:00–0:10)**
> Plano médio, fundo neutro.
> “Meu nome é Gabriel Santos Dalla Costa, sou advogado inscrito na OAB de Rondônia sob o número 13.552 e atendo em Ariquemes.”
>
> **Cena 2 — áreas e público (0:10–0:25)**
> Mesmo plano, corte seco.
> “Atendo diretamente questões de direito civil e contratos, família e sucessões, direito administrativo e direito do consumidor — de pessoas e de empresas.”
>
> **Cena 3 — como funciona (0:25–0:45)**
> Plano um pouco mais fechado.
> “O trabalho começa pela leitura dos documentos e pela reconstituição do que aconteceu. Só depois disso dá para dizer o que o direito permite pedir e com que grau de segurança. Eu explico isso em linguagem compreensível, e o escopo do que será feito fica combinado por escrito antes de começar.”
>
> **Cena 4 — canais (0:45–0:55)**
> Volta ao plano médio.
> “As informações sobre atendimento estão neste site, junto com os canais oficiais. Até logo.”

**Limites a respeitar na gravação:** nenhum resultado, nenhum caso, nenhum cliente, nenhuma comparação com outros profissionais, nenhuma promessa. O texto acima precisa da sua revisão antes de virar gravação — é uma proposta de redação, não um roteiro aprovado.

**Nada foi sintetizado.** Não há vídeo, voz ou imagem gerada que se apresente como você. A gravação tem que ser real.

### 2.2 Verificações antes de publicar

- [ ] Legenda WebVTT sincronizada e revisada.
- [ ] Transcrição completa acessível por link.
- [ ] Controles operáveis por teclado.
- [ ] Legibilidade da legenda sobre a imagem.
- [ ] Peso do arquivo compatível com conexão móvel (alvo: abaixo de 15 MB para um minuto).
- [ ] Capa (`poster`) definida, para não abrir um retângulo preto.

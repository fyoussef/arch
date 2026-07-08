# Briefing para post no LinkedIn — Hero Section "Architects & Interiores"

> Este arquivo é um briefing/contexto para alimentar o Fable 5 (ou outro
> modelo) na hora de escrever o post. Não é o texto final da postagem.

## Objetivo do post

Anunciar/mostrar no LinkedIn a hero section interativa que foi construída,
destacando tanto o resultado visual quanto as decisões técnicas por trás da
navegação por vídeo com scroll.

**Tom desejado:** profissional, mas acessível — post técnico de
desenvolvimento front-end, sem soar como propaganda de produto. Pode
mencionar o processo de construção e os problemas resolvidos no caminho.

## Contexto do projeto

- Landing page de uma marca fictícia de arquitetura e interiores
  ("Architects & Interiores"), a partir de um mockup de design (Claude
  Design / `.dc.html`) transformado em um componente React de produção.
- Stack: Vite + React puro (sem framework de UI), CSS "vanilla" com
  variáveis fluidas (`clamp()`), sem dependências externas de animação.
- O projeto inteiro vive num único componente `HeroSection.jsx` +
  `HeroSection.css`.

## Funcionalidades técnicas implementadas

- **Hero em tela cheia** com nav flutuante, título, texto de introdução e
  CTAs, replicando fielmente o mockup original em qualquer largura de tela.
- **Responsividade completa**: tipografia fluida (`clamp()`), nav que
  colapsa em mobile, conteúdo que empilha em coluna em telas pequenas — sem
  media queries redundantes, ajustado pixel a pixel comparando com o
  design original.
- **Galeria de vídeos em scroll horizontal**: 3 vídeos de fundo diferentes
  que trocam conforme o usuário rola a página, cada um ocupando 100% da
  tela no repouso.
- **Navegação por "snap" em vez de scrubbing contínuo**: cada gesto de
  scroll (roda do mouse/trackpad) avança exatamente um vídeo por vez, com
  uma transição suave (`cubic-bezier`, ~700ms) — em vez de arrastar o vídeo
  proporcionalmente ao scroll, que deixava o vídeo do meio nunca em tela
  cheia.
- **Lock anti-double-trigger**: uma rajada de eventos `wheel` de um único
  gesto de trackpad não pula mais de um vídeo por vez.
- **Ciclo de vida de vídeo otimizado**: cada vídeo só começa a tocar quando
  entra em cena, sempre reinicia do zero (`currentTime = 0`) ao ser
  exibido, e o vídeo anterior é pausado (não fica tocando escondido em
  loop, economizando CPU/bateria).
- **Indicador de progresso animado**: os 3 pontinhos no canto inferior
  direito indicam visualmente qual vídeo está em exibição, com transição
  suave de largura/cor.

## Detalhes/curiosidades técnicas que renderiam um bom parágrafo

- Bug interessante encontrado e corrigido: ao empilhar os elementos em
  mobile (`position: static`), o texto sumia por trás do vídeo — motivo é
  a ordem de pintura do CSS (elementos posicionados pintam depois dos não
  posicionados, independente da ordem no DOM). Resolvido trocando para
  `position: relative` + `z-index`.
- A troca do modelo de "scroll scrubbing" para "scroll snap" resolveu dois
  problemas de uma vez: a sensação de "arrasto" ficou mais imediata/fluida,
  e o vídeo do meio passou a ocupar a largura inteira da tela (antes ele
  só aparecia de passagem, dividindo espaço com o vizinho).

## Call to action sugerido

- Convidar para ver a página ao vivo (adicionar link quando publicado).
- Perguntar o que acharam da transição de vídeo / pedir feedback.

## Hashtags sugeridas

`#frontend` `#react` `#webdev` `#ui` `#desenvolvimentoweb` `#css`

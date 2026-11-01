# Mundo Vivo v24: 50% mais pixels

Arquivo do jogo: `mundo-vivo-v24.html`. É um arquivo único que abre no navegador ou no Acode. Tudo da v23 continua igual; só os gráficos mudaram.

Comparação lado a lado: `v24-antes-depois.png`.

## O que mudou

Cada imagem do jogo agora tem 1,5 vez mais pixels de largura e de altura (2,25 vezes mais pixels no total). Não é só esticar a imagem: o aumento usa um método que olha os pixels vizinhos e arredonda as bordas em escada. Diagonais, curvas, chamas, crinas e copas de árvore ficam mais suaves, e as cores continuam nítidas, sem borrar.

| Parte do jogo | Como ficou |
|---|---|
| Pessoas e animais | Todos os quadros de animação ficaram com 50% mais pixels: andar, correr, atacar, nadar, voar, montar, o dragão cuspindo fogo e as poses de combate. Ganharam também um brilho leve na borda de cima e uma sombra leve na de baixo, para dar volume. |
| Árvores | Todas as espécies, incluindo a árvore com frutas, o pinheiro com neve e as mudas. |
| Terreno | O mapa passou de 16 para 24 pixels por quadrado. Isso inclui grama, areia, água, montanhas, minérios, estradas, pontes, cercas, muros, portões, casas, plantações e o desenho das fazendas. |
| Torres e castelos | A torre de vigia e o castelo do rei, com a cor da vila. |
| Dentro das casas | Os móveis também têm 50% mais pixels. Os animados (lareira, fogão, banheira e candelabro) guardam 12 quadros por ciclo, então o fogo e o vapor continuam se mexendo. |
| Galeria de animações | Mostra os quadros novos. |

O mapa só usa os 24 pixels quando você está perto o bastante para a tela mostrar a diferença. De longe, quando cada quadrado ocupa menos de 16 pixels na tela, o jogo mostra o mapa normal, porque nessa distância os dois ficam iguais.

## Desempenho

Não precisei cortar nada, por isso não houve nada para te perguntar.

- O terreno aumentado é feito em blocos de 16×16 quadrados, só dos blocos que aparecem na tela.
- Quando algo muda no mapa, o jogo refaz só os blocos daquela região, com um limite de tempo por quadro para não travar.
- Cada desenho de personagem é aumentado uma vez só e guardado.

Medi num navegador simulando um celular com o processador 4 vezes mais lento (390×844):

| Situação | v23 | v24 |
|---|---|---|
| Mapa inteiro de longe | 59 quadros/s | 58 quadros/s |
| De perto, parado | 60 quadros/s | 60 quadros/s |
| De perto, com a câmera andando (blocos novos sendo feitos) | 60 quadros/s | 59 quadros/s |

Cada bloco de terreno leva cerca de 3 ms num computador e cerca de 14 ms no celular simulado. O jogo faz poucos blocos por quadro, então não aparece engasgo.

## O que foi testado de verdade

Os testes rodaram num navegador Chromium automático.

- **Comparação visual:** o mesmo mundo (mesma semente) foi aberto na v23 e na v24, de perto e de longe, por fora e dentro de uma casa com 11 móveis. As emendas entre os blocos do terreno não aparecem, nem na cidade com muralhas, portões e estradas.
- **Testes da v23 repetidos na v24,** em celular em pé (390×844), celular deitado (844×390) e computador (900×700):
  - abas de ícones do chefe, do fazendeiro, do rei e da pessoa comum;
  - botão ⚔️;
  - contratar trabalhador;
  - começar uma guerra;
  - XP ×10 por assassinato (100 de XP).

  Tudo passou, com 0 erros. Num dos mundos sorteados a guilda não tinha aventureiros prontos, e o jogo mostrou o aviso certo ("Precisa de pelo menos 2 aventureiros prontos").
- **Simulação longa:** no mapa enorme, com zoom de perto e a câmera andando pela cidade, o jogo rodou 38 dias com 0 erros e 0 avisos.
- **O arquivo final** (`mundo-vivo-v24.html`, sem os ganchos de teste) abre e cria um mundo sem erros.

## Limitações

- **A diferença aparece mais de perto.** Com o zoom bem afastado, a tela não tem pixels suficientes para mostrar o detalhe novo.
- **A arte continua desenhada na grade antiga.** Os desenhos foram feitos em quadrados de 16 pixels e o aumento arredonda as bordas, mas não inventa detalhes novos (como olhos maiores ou mais fios de cabelo). Redesenhar tudo à mão em 24 pixels seria um trabalho muito maior.
- **Algumas formas pequenas mudaram um pouco com o arredondamento.** Exemplos: o losango do tapete ficou mais oval e o prato da mesa ficou mais redondo.
- **Continuam como antes:** o estandarte da vila, o ovo de dragão chocando e os efeitos (poeira, faíscas, magias e as janelas das casas com céu). Esses já eram desenhados direto na resolução da tela, então não têm pixels para aumentar.
- **O teste foi feito em navegador automático,** não num celular físico.

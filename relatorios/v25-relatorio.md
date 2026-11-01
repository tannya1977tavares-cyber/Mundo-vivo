# Mundo Vivo v25: 300% mais pixels

Arquivo do jogo: `mundo-vivo-v25.html`. É um arquivo único que abre no navegador ou no Acode. Tudo da v24 continua igual; só os gráficos mudaram.

Para comparar v23, v24 e v25 lado a lado, veja `v25-antes-depois.png`.

## O que mudou

Cada imagem agora pode ter **4 vezes mais pixels de largura e de altura** que o desenho original, ou seja, 300% a mais por lado e 16 vezes mais pixels no total. Na v24 eram 1,5 vez.

O aumento usa o método Scale4x (o Scale2x aplicado duas vezes). Ele olha os pixels vizinhos e transforma as bordas em escada em curvas e diagonais limpas, sem borrar as cores.

Isso vale para:
- pessoas e animais, em todos os quadros de animação;
- árvores;
- torre de vigia e castelo;
- móveis de dentro das casas, incluindo os animados;
- terreno: grama, água, montanhas, estradas, muros, cercas, casas e plantações;
- galeria de animações.

## Como o jogo escolhe a resolução

O 4x só aparece quando a imagem está grande na tela. Mais longe, o próprio celular não teria pixels para mostrar 4x.

| Distância | O que o jogo usa |
|---|---|
| Bem de perto (cada quadrado do mapa com mais de ~42 pixels reais na tela) | 4x em tudo: personagens, árvores, prédios e terreno |
| Média distância | 1,5x, como na v24 |
| Mapa inteiro de longe | O desenho normal, que nessa distância fica igual |

Não há perda de qualidade com isso: em cada distância você vê o máximo que a tela consegue mostrar.

## Por que não fiz tudo 4x o tempo todo

O mapa enorme inteiro em 4x teria 8.960 × 6.720 pixels, cerca de 60 milhões. Isso passa do limite de tamanho de imagem dos navegadores de celular (por volta de 16 milhões) e usaria uns 240 MB só para o chão.

Por isso o terreno 4x é feito em blocos de 8×8 quadrados, só onde a câmera está olhando. Os blocos que saem da tela há muito tempo são descartados e refeitos se você voltar. As imagens 4x dos personagens também têm um limite de memória (cerca de 36 MB); as menos usadas são refeitas quando aparecem de novo.

Isso não muda o que você vê. Quando a câmera chega num lugar novo, os blocos e personagens podem aparecer em 1,5x por uma fração de segundo antes de ficarem 4x. Isso acontece porque o jogo faz poucos por quadro para não engasgar.

## Desempenho

Medi num navegador simulando um celular com o processador 4 vezes mais lento (390×844), duas vezes cada:

| Situação | v23 | v25 |
|---|---|---|
| Mapa inteiro de longe | 59–60 quadros/s | 59 quadros/s |
| De perto, parado | 60 quadros/s | 59–60 quadros/s |
| De perto, com a câmera andando (blocos 4x sendo feitos) | 60 quadros/s | 57–58 quadros/s |

A queda é pequena e só acontece enquanto a câmera anda, de perto. Não cortei nada por desempenho.

Cada bloco de terreno 4x leva cerca de 2–4 ms num computador e cerca de 7 ms no celular simulado.

## O que foi testado de verdade

Os testes rodaram num navegador Chromium automático.

- **Comparação visual:** o mesmo mundo (mesma semente) foi aberto na v23, na v24 e na v25, de perto, por fora e dentro de uma casa com 11 móveis. Também conferi uma cidade de perto, com estradas, cercas, plantações e casas. As emendas entre os blocos do terreno 4x não aparecem.
- **Testes da v23 repetidos na v25,** em celular em pé (390×844), celular deitado (844×390) e computador (900×700): abas de ícones do chefe, do fazendeiro, do rei e da pessoa comum, botão ⚔️, contratar trabalhador e começar uma guerra. Tudo passou, com 0 erros.
- **XP ×10 por assassinato:** o golpe do teste automático às vezes erra o alvo, e isso já acontecia na v21. Num teste separado, rodado 2 vezes, o golpe acertou e deu 100 de XP nas duas.
- **Simulação longa:** no mapa enorme, com zoom de perto e a câmera andando, o jogo rodou 37 dias com 0 erros e 0 avisos.
- **Memória:** num teste de 29 dias, alternando entre perto e longe, as imagens 4x ficaram no limite de cerca de 36 MB e os blocos de terreno 4x ficaram limitados.
- **O arquivo final** (`mundo-vivo-v25.html`, sem os ganchos de teste) abre e cria um mundo sem erros.

## Limitações

- **O 4x só aparece de perto.** De longe, a tela não tem pixels para mostrar a diferença.
- **Os desenhos são os mesmos, só mais lisos.** A arte foi desenhada em quadrados de 16 pixels. O Scale4x arredonda as bordas, mas não inventa detalhes novos (mais fios de cabelo, olhos com brilho). Algumas formas pequenas ficaram mais redondas, como o losango do tapete e o prato da mesa.
- **Memória:** o jogo de perto usa mais memória que a v24, mesmo com os limites acima. Num celular muito antigo, isso pode pesar.
- **Continuam como antes:** o estandarte da vila, o ovo de dragão chocando e os efeitos (poeira, faíscas, magias e janelas com céu). Esses já eram desenhados direto na resolução da tela.
- **Teste em navegador automático,** não num celular físico.

# Mundo Vivo v26: proporções revistas

Arquivo do jogo: `mundo-vivo-v26.html`. É um arquivo único que abre no navegador ou no Acode. Partiu da v25, e tudo o que existia continua lá.

Para ver a diferença, abra `v26-antes-depois.png` (mesmo mundo, mesma vila, mesmo horário).

## O que mudou

Escolhi fazer do jeito que você sugeriu: **diminuí as pessoas e os bichos** e deixei o chão, as árvores e as cabanas com pixels do mesmo tamanho que eles. Assim o pixel de uma vaca é igual ao pixel da grama e da parede da cabana.

| Coisa | v25 | v26 |
|---|---|---|
| Pessoa (altura) | ~1,2 quadrado (maior que a cabana) | 0,75 quadrado |
| Vaca, cavalo, ovelha, cachorro, lobo, dragão etc. | tamanho cheio | 62,5% do tamanho anterior |
| Cabana dos NPCs | 1 quadrado, desenho achatado no chão | 1,5 × 1,7 quadrado, desenho novo em pé |
| Árvores | mesmo tamanho na tela | mesmo tamanho, redesenhadas com o dobro de pixels |
| Pixel do chão | 1/16 de quadrado | 1/24 de quadrado (igual ao das pessoas) |

Resultado: uma pessoa agora tem mais ou menos metade da altura da cabana, e as árvores ficam bem maiores que as pessoas.

### Cabana nova

A cabana antiga era um quadradinho desenhado no chão. A nova é um desenho próprio, maior, com:
- paredes de tronco, porta com maçaneta e duas janelas;
- telhado de palha em duas águas, com a cor da profissão do morador;
- a decoração da profissão, como antes;
- estandarte com a cor da vila.

As reformas aparecem no desenho:
- **nível 1:** floreiras;
- **nível 2:** chaminé, base de pedra e lampião;
- **nível 3:** acabamento dourado, janelas de vidro e arbustos.

Cabana abandonada aparece com tábuas e mato.

### Outros ajustes
- **Chão:** os tufos de grama, as pedrinhas e as marcas de trilha agora são desenhados direto na grade fina (24 pixels por quadrado), na mesma escala das pessoas.
- **Nomes das pessoas:** ficam por cima de árvores e casas. Com os corpos menores, as copas estavam tapando os nomes.
- **Combate:** o golpe de espada e o brilho de defesa saem na altura do corpo novo, que é mais baixo.
- **Cavaleiros:** o cavaleiro diminuiu junto com o cavalo.
- **Dragões:** o fogo sai da boca do dragão no tamanho novo.

## O que não mudou (de propósito)

- **Regras do jogo:** a cabana continua ocupando 1 quadrado no mapa. Velocidades, alcance de ataque e área de acerto são os mesmos, então nada fica mais fácil nem mais difícil. Só o desenho mudou.
- Como os bichos agora são menores, eles podem *parecer* andar um pouco mais rápido, mesmo percorrendo a mesma distância por segundo.

## Desempenho

Medi num navegador simulando um celular com o processador 4 vezes mais lento (390×844), alternando v25 e v26, duas vezes cada. Também medi com o jogo pausado, para comparar só o desenho.

| Situação | v25 | v26 |
|---|---|---|
| Mapa inteiro de longe | 59 quadros/s | 60 quadros/s |
| De perto, parado | 60 quadros/s | 60 quadros/s |
| De perto, com a câmera andando | 57–59 quadros/s | 55–57 quadros/s |

Com o jogo rodando, os dois ficaram entre 47 e 58 quadros/s. A variação vem da simulação, que nunca é igual entre uma rodada e outra.

Não precisei cortar nada visível. Fiz só duas otimizações internas:
- **Mapa de longe:** usa o chão simples, como a v25 já fazia. O detalhe fino nem aparece nessa distância.
- **Árvores, cabanas e bichos de longe:** são desenhados a partir de uma cópia reduzida da imagem. O resultado na tela é o mesmo.

## O que foi testado

Os testes rodaram num navegador Chromium automático.
- **Cena de perto:** pessoas, cavaleiro, vaca, ovelha, galinha, cachorro, lobo, dragão e cabanas de várias profissões. Também conferi a cena com combate e o mapa inteiro de longe. Nenhum erro.
- **Testes da v23 repetidos na v26,** em celular em pé (390×844), celular deitado (844×390) e computador (900×700): abas de ícones do fazendeiro, do rei e da pessoa comum, botão ⚔️, contratar e guerras. Tudo passou, com 0 erros.
- **Dentro das casas:** os móveis aparecem, 0 erros.
- **Simulação longa no mapa enorme,** com zoom de perto e a câmera andando: 42 dias, com guerras de guildas, e 0 erros.
- **O arquivo final**, sem os ganchos de teste, abre e cria um mundo sem erros.

## Limitações

- **Casas maiores com a arte antiga.** Casarões, castelo, muralhas, cercas e estradas de pedra continuam com o desenho antigo (pixel de 1/16 de quadrado, aumentado). Por isso o pixel deles é um pouco maior que o das pessoas. Eles já eram grandes, então a proporção está boa, mas dá para redesenhar numa próxima versão.
- **Pessoas menores ficam mais difíceis de ver de longe.** De perto ficam bem nítidas.
- **Teste em navegador automático,** não num celular físico.

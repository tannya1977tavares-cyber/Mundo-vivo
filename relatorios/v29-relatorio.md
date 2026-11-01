# Mundo Vivo v29: navios, portos, mapas novos e combate no mar

O jogo é o arquivo `mundo-vivo-v29.html`, um arquivo único que abre no navegador ou no Acode. Ele partiu da v28 e tudo o que já existia continua funcionando. A v28 não foi alterada.

Esta versão aplica o documento `navios-mapas-design.pdf`.

## Compatível com o jogo

- **Saves da v28 abrem na v29.** O mundo antigo carrega do jeito que estava. Em poucos dias a vila que tem água por perto monta o porto, abre a estrada até ele e os navios começam a aparecer.
- **O save novo ficou bem menor.** Os quadrados do mapa agora são guardados de forma compacta. Um save de teste da v28 caiu de 266 KB para 101 KB.
- **Atenção:** um save feito na v29 não abre na v28. Quem quiser voltar para a v28 deve guardar uma cópia do save antigo.
- Pessoas, vilas, reinos, guerras, deuses, duelos, altares, circo, ajustes e botões editáveis ficaram como estavam.

## Mapas novos (IA cartógrafa)

- Na tela de novo mundo há uma escolha de **modelo de mapa**: Continente de rios, Duas margens, Arquipélago, Mar interior, Costa recortada (o padrão), Estreito entre reinos e Clássico (lagos).
- Também dá para escolher **quantos mapas a IA testa** (1, 3, 6 ou 10). Ela gera vários, dá uma nota para cada um e fica com o melhor. Uma prévia do mapa aparece com a nota.
- Cada reino nasce num lugar escolhido pela IA, com água navegável por perto.
- Rios largos, mares, ilhas e lagos são gerados com profundidade estável, e a água não "escorre" depois que o mundo nasce.

### Escala 50%

Tudo ficou pela metade do tamanho, e o mapa tem o dobro de quadrados em cada lado:

| Tamanho | v28 | v29 |
|---|---|---|
| Pequeno | 48 × 36 | 96 × 72 |
| Médio | 72 × 54 | 144 × 108 |
| Grande | 100 × 75 | 200 × 150 |
| Enorme | 140 × 105 | **240 × 180** |

O documento pedia 280 × 210 para o Enorme. Ficou em 240 × 180 porque, no tamanho do documento, o chão detalhado passava do limite de memória de muitos celulares. O chão agora é desenhado em blocos, e só os blocos perto da câmera ficam na memória.

O número de bichos não cresce na mesma proporção do mapa, para o mundo não ficar lotado.

## Portos e estradas

- Toda vila perto de água navegável monta um **porto**: um píer, depois armazém, guindaste, farol e estaleiro, conforme a vila cresce (nível 1 a 4).
- A vila abre uma **estrada até o porto**, faz ponte quando precisa e depois calça a estrada, igual às estradas entre vilas.
- Trabalhadores aparecem no porto carregando caixas.
- Na ficha da vila aparece a linha do porto, com o nível dele.

## Navios

| Navio | Água mínima | Canhões por lado | Porto que fabrica |
|---|---|---|---|
| ⛵ Escuna | rios médios, lagos e mar | 3 | nível 1 |
| 🚢 Brigue | rios largos e mar | 6 (+2 na proa) | nível 2 |
| 🛳️ Fragata | rios largos e mar | 12 (+2 na proa e 2 na popa) | nível 3 |
| ⚓ Navio de guerra | só mar fundo | 34 | nível 4 |

- Cada navio tem **vida, escudo (amurada), reparos, porão e tripulação**.
- O **vento** muda com o tempo. Navegar contra o vento é lento, e de lado é o mais rápido. Há três posições de vela: recolhida, meia e cheia.
- **Melhorias** no estaleiro, cada uma com 4 níveis: casco, canhões, velas, aríete, porão, leme e escudo.

### Quem navega sozinho
- **Mercantes** levam carga de porto em porto. Compram onde sobra e vendem onde falta, com moedas e estoque das vilas.
- **Piratas** saem de esconderijos longe dos portos, só em mares e lagos grandes. Caçam mercantes, saqueiam e voltam para casa.
- **Marinha** patrulha, caça piratas e prende os que se rendem.
- **Navio fantasma** aparece de noite em alguns lugares e se desfaz quando amanhece.

## Combate no mar

- As balas de canhão voam em arco, com sombra na água, e cada uma mira no alvo a partir da sua portinhola.
- O escudo segura 70% de cada tiro até acabar. Depois o casco leva o dano.
- Os tiros podem pôr fogo, rasgar a vela e matar tripulantes.
- O navio afundado leva alguns segundos para sumir e deixa **boias com carga** boiando, que qualquer navio pode recolher.
- Atacar navios de um reino deixa os navios dele **hostis a você por 4 dias**, e a sua **fama de pirata** sobe.
- Eventos do mar: **tempestade**, **tromba d'água** e **navio fantasma**.

## Jogando com o navio

Chegando perto do píer com o seu personagem, o botão de contexto mostra **⛵ Embarcar** (se você tem navio) ou **⚓ Porto de X**, que abre o painel do porto.

### Painel do porto
- **🔨 Estaleiro:** encomendar navio (moedas, madeira e ferro), que leva um tempo para ficar pronto. Também conserta o casco e vende kits de reparo.
- **⚙️ Melhorias:** subir o nível de cada parte do navio.
- **📦 Mercado:** comprar e vender carga.
- **📜 Frete:** levar a carga dos outros até outro porto e receber na entrega. Com piratas no mar, o frete paga mais.
- **🍺 Taverna:** contratar marujos.
- **⛵ Frota:** ver todos os seus navios e onde estão.

### Controles a bordo

| Ação | Celular | Teclado |
|---|---|---|
| Virar | arrastar o leme (canto inferior esquerdo) | A / D ou setas |
| Mais vela / menos vela | ⬆️ / ⬇️ | W / S |
| Canhões de bombordo / estibordo | 💥 / 💥 | Q / E |
| Canhão da proa | 🎯 | F ou espaço |
| Usar um kit de reparo | 🔧 | R |
| Abordar navio rendido | 🪝 (aparece perto dele) | B |
| Painel do porto (atracado) | 🏛️ (aparece no porto) | T |
| Baixar ou levantar a âncora | ⚓ | |
| Descer do navio | 🏝️ | X |

- No alto da tela ficam as barras de vida, escudo e tripulação, com o vento e a velocidade.
- A bordo, os botões normais do jogo somem para não ficar em cima do leme. Eles voltam quando você desce.
- Se o navio afundar com você, você nada até a margem.
- Passando por cima de boias, o navio recolhe a carga e os náufragos.

### Abordagem
Quando um navio se rende, chegue perto e aborde. Você escolhe: lutar no convés, saquear a carga, tomar o navio para a sua frota, recrutar a tripulação, afundar ou deixar seguir viagem.
- O save guarda o navio com você a bordo.

## Testes feitos

- Os 7 modelos geram mapas com os 4 reinos e um porto cada, em até 0,3 s por mapa, em todos os tamanhos.
- 20 dias de simulação no mapa grande, sem nenhum erro, a cerca de 60 quadros por segundo. Mercantes negociam, piratas saqueiam, a marinha aparece e navios afundam.
- O save da v28 carregou, montou porto e navio e salvou de novo.
- Navegar, atirar, afundar, recolher boias, comprar melhoria, salvar e carregar a bordo e descer do navio funcionaram.
- Telas de celular em pé (390 px) e deitado (844 px).

## Limites conhecidos

- A tripulação é um número. Os marinheiros não andam pelo convés.
- A abordagem é resolvida num painel de escolhas. A luta no convés é calculada, não mostrada com os marujos lutando.
- O mapa Enorme ficou em 240 × 180, e não 280 × 210, pelo motivo da memória explicado acima.

## Arquivos

- `mundo-vivo-v29.html`: o jogo.
- `v29/`: o código novo (`m15` a `m22`), o gerador de mapas do documento (`navios-mapa.js`) e o `build29.py`, que monta a v29 a partir da v28.

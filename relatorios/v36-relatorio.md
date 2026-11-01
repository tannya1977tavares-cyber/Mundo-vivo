# Mundo Vivo v36: sistema de transporte

**Arquivo do jogo:** `mundo-vivo-v36.html`. A v35 continua como estava.
**APK:** `MundoVivo-v36.apk` (e `android/saida/MundoVivo.apk`). Versão 36: instala por cima da v35 sem perder os mundos salvos.

Combinamos dividir em duas partes. Esta v36 traz o transporte. Uma casa por casal, as cidades densas e as fábricas novas ficam para a v37.

## 1. Trilhos que procuram o melhor caminho

- **Traçado de verdade:** cada linha é calculada quadrado a quadrado.
  - Plano é barato; morro, água e mato custam mais.
  - Casa, lote, fazenda, mina, muralha e estação são **proibidos**, e o trilho passa com folga de um quadrado de qualquer construção.
- **Pontes curtas:** até 9 quadrados de água. Se o rio for mais largo, a linha dá a volta. Só quando não existe outro jeito ela aceita uma ponte de até 13.
- **Túnel curto** (até 5 quadrados) em morro alto, com boca de pedra nas duas pontas.
- **Retas e curvas suaves:** a busca prefere seguir reto e só vira de 45 em 45 graus, com curva aberta. Depois a linha é alisada.
- **Uma rede só ligando todas as cidades:**
  - O jogo escolhe a rede mais curta que liga todas as cidades.
  - Cada linha nova aproveita o trilho que já existe, então surgem troncos e ramais, como na vida real.
- **Desvio:** se alguém construir em cima de um trilho, aquela linha é refeita por outro caminho.
- **Construção:**
  - As cidades que têm trilhos (da fábrica de trilhos) constroem um pedaço por dia, e cada uma ajuda a estender a rede.
  - Ponte gasta ferro e túnel gasta pedra.
- As ferrovias retas da v34 viram trilhos guardados e são refeitas no jeito novo.

## 2. Estações

- Prédio de tijolo com telhado de ardósia, **torre do relógio que marca a hora do jogo**, janelas que acendem de noite e o nome da cidade na fachada.
- **Plataforma de embarque** do lado do prédio (com cobertura de ferro, colunas e lampiões) e **plataforma de desembarque** do outro lado do trilho, com as placas ⬆ EMBARQUE e ⬇ DESEMBARQUE.
- Fica do lado de fora da muralha que já existe, perto da cidade.

## 3. Trens

- **Cada vagão da fábrica de trens põe um trem novo na rede.** O dono da fábrica é o dono do trem e recebe as passagens e o frete. Cada trem tem nome (Estrela do Vale, Maria Fumaça...).
- **Linha de mão única:** se um trem vem no sentido contrário, o outro espera na estação.
- O trem acelera, freia antes da estação e apita na saída ("piuííí!").
- **Passageiros:**
  - Gente com dinheiro compra passagem para visitar parentes, vender na praça ou passear.
  - Eles andam até o embarque, esperam o trem, viajam dentro do vagão, descem no desembarque e passeiam na outra cidade.
  - Depois voltam de trem. Quem fica com fome ou ferido desiste.
- **Frete:**
  - O trem leva o que uma cidade tem sobrando para a que tem pouco, inclusive o que as fábricas fizeram (armas, bombas, mochilas, trilhos, carros).
  - A carga é vendida na praça de chegada, e quem vendeu paga o frete ao dono do trem.
- **Carroças das fábricas:**
  - Antes do trem sair, a fábrica manda carroças com cavalo até a estação. Quando a cidade já faz carros, vão caminhõezinhos.
  - Os estivadores passam as caixas para o vagão (as caixas voam da carroça para o trem).
  - Na chegada, outras carroças levam a carga da estação para a cidade.
- **Tropas de trem:**
  - Quando o ataque é longe, os soldados andam até a estação, embarcam num **trem militar** (vagões verde-oliva) e descem na estação mais perto do alvo.
  - O tempo do ataque aumenta para compensar a viagem.
  - Cidades gananciosas agora podem atacar cidades longe que a ferrovia alcança. Antes, o limite era a distância a pé.

## 4. Você na estação

Chegue perto de uma estação e aparece o botão **🚉 Estação de ...**. Nele você pode:
- **🕒 Partidas:** ver os trens na plataforma, quanto falta para sair e quando chega o próximo.
- **🎫 Passagem:** comprar a passagem, esperar na plataforma de embarque e viajar. A câmera vai junto.
- **📜 Despachar carga:** mandar 10 de madeira, pedra, comida ou minério para outra cidade. A carga é vendida lá, e você recebe o dinheiro menos o frete.

## 5. Avenidas entre as cidades

- Começam quando a cidade entra na revolução industrial, gastando pedra.
- **3 quadrados de largura:** faixa de ida, **canteiro de grama no meio com postes de ferro de dois braços**, faixa de volta. Tem meio-fio e faixas tracejadas.
- **Os postes acendem de noite junto com os da cidade**, e um fio liga um poste ao outro.
- O traçado segue as mesmas regras dos trilhos: desvia de toda propriedade e faz **ponte de pedra curta** com mureta.
- Onde a avenida cruza o trilho tem **passagem de nível com cancela**: o braço listrado desce e a luz vermelha pisca quando o trem chega perto.
- Além do caminho mais curto, cidades perto uma da outra ganham um atalho.

## 6. Carros e carroças na estrada

- Quem tem carro sai pelo fim da avenida, vai até outra cidade, passeia e volta. Sempre na faixa da direita, com faróis acesos de noite.
- **Três modelos dos primeiros carros:**
  - o **triciclo de 1886** (rodas grandes de raio, banco de couro e manche);
  - a **carruagem sem cavalo** com capota dobrada;
  - o **"Ford T"**: preto, com capô, radiador de latão, cabine alta e estribo.
- O motorista aparece sentado, de chapéu.
- **Carroças de mercador** com toldo de lona levam comida, madeira ou pedra de uma cidade para a outra.
- No painel ⚙️ há a chave nova **🛣️ Avenidas e carros**. A chave **🚂 Ferrovias e trens** continua lá.

## 7. Visual "3D"

- Trens, carros, carroças, caminhões e a estação são montados com **peças em 3D** (caixas e cilindros com luz e sombra), vistas do mesmo ângulo das casas.
  - A **locomotiva** tem caldeira redonda com faixas de latão, chaminé de boca larga, domo, cabine com janela acesa, limpa-trilhos vermelho, farol, rodas vermelhas e a biela que se mexe.
  - O tender leva carvão. Os vagões têm janelas, teto arredondado e faixa da companhia.
- Rodas com raios que giram, sombra no chão e fumaça que sai mais forte com o trem rápido.
- Os **navios** ganharam casco com altura (bordas que descem até a água, com espuma) e sombra na água.
- Os trilhos novos têm lastro de brita, dormentes e ponte de ferro com treliça.

## Como testei

- Mundos médios e grandes, de 8 a 30 dias, com a revolução industrial forçada:
  - a rede se forma ligando todas as cidades, com pontes e curvas;
  - os trens fazem até 100 viagens e levam até 400 itens cada um;
  - as avenidas ficam prontas.
- **Passageiros:** acompanhei o caminho inteiro (indo, esperando, no trem, passeando, voltando, chegando em casa).
- **Tropas:** um ataque a uma cidade a 147 quadrados embarcou, viajou e desceu a 10 quadrados do alvo.
- **Jogador:** comprei passagem pela tela da estação, viajei e cheguei. Também despachei carga.
- **Salvar e carregar:** os trens, as estações, as linhas e quem estava viajando voltam iguais.
- **População:** comparei 6 mundos na v35 e na v36. Cresce igual (118 contra 142 pessoas no total).
- **Robô apertando botões ao acaso e teste de valores quebrados:** nenhum erro novo.

## O que ainda dá para melhorar

- As avenidas terminam do lado de fora da muralha. Da muralha até a praça continua a rua de terra que a cidade já tinha.
- Dois trens podem se cruzar na parte compartilhada de linhas diferentes (a regra de mão única só vale na mesma linha).
- **Não testei num celular de verdade.** Mapas grandes com muitos trens e carros podem pesar mais no celular. Se pesar, dá para desligar as avenidas ou os trens no painel ⚙️.

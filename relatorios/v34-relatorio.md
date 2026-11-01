# Mundo Vivo v34: a revolução industrial

**Arquivo do jogo:** `mundo-vivo-v34.html`. As versões v31, v32 e v33 continuam como estavam.

**Jogos salvos:** salvei um mundo na v33 e abri na v34. Ele carregou e rodou sem erro. Também salvei e abri de novo na própria v34: o jeito, os genes e o nível de ofício de todo mundo voltaram certinho (antes isso se perdia ao salvar).

**Testes:** muitas rodadas, de 4 a 100 dias, mais testes das telas novas (inventário, poções, painel, voo e rasante). Nenhum erro.

**Um mundo de teste com 100 dias** (forcei a revolução industrial no dia 8 para não esperar):
- 12 minas: 5 chegaram ao nível 5, e 38 pessoas trabalhavam nelas.
- 4 donos de mina ficaram ricos e pararam de trabalhar.
- 12 fábricas fizeram:
  - 455 trilhos
  - 97 armas
  - 47 mochilas
  - 11 vagões de trem
  - 6 carros
- 3 ferrovias ficaram prontas, todas com trem rodando. Os trens levaram 6.800 itens de uma vila para outra.
- 9 pessoas compraram mochila.
- 8 casas viraram tijolo ou vitoriana.
- A população foi para 171.

---

## 1. Casas inglesas de tijolo

- **Duas reformas novas**, que abrem quando a vila entra na revolução industrial:
  - **Reforma 4, "de tijolos":** tijolo vermelho com argamassa, telhado de telha, janelas de guilhotina com caixilho branco, chaminés com potes de barro soltando fumaça e porta com vidro em leque em cima.
  - **Reforma 5, "vitoriana":** telhado de ardósia com janelinhas no telhado, janela saliente no térreo, pórtico com colunas brancas, frisos brancos entre os andares, grade de ferro com lanças e lampião a gás.
- Vale para todos os tipos: a cabana vira chalé de tijolo, a casa vira sobrado e o casarão vira um prédio de três andares.
- De noite as janelas acendem.
- **Casas alinhadas:** os lotes novos de fora da vila caem numa grade, com a mesma distância entre um e outro. As casas que já existiam não mudam de lugar.

## 2. Minas

- **Quem abre a mina:**
  - O mineiro que junta 20 moedas abre a mina fora da vila, de preferência no morro.
  - Pedreiro, ferreiro ou gente gananciosa com mais dinheiro também pode abrir, e vira mineiro.
- **No começo o dono cava sozinho.** Depois contrata 2 funcionários por nível e paga salário.
- **Quanto mais funda, melhor o minério:**

  | Nível | O que sai |
  |---|---|
  | 1 | pedra e ferro |
  | 2 | o dobro de ferro, mais ouro |
  | 3 | ferro, ouro e prata |
  | 4 | tudo isso e diamante |
  | 5 | o máximo de tudo |

- **No nível 3 o dono para de trabalhar.**
  - Se for ambicioso e a vila estiver na revolução industrial, ele abre uma fábrica.
  - Se não, ele vai "curtir a vida" passeando pela praça.
- **O minério é vendido na praça.** Artesão, ferreiro e pedreiro compram lá.
  - As fábricas também compram direto na boca da mina, pagando o preço da praça.
- **Desenho da mina:**
  - monte de terra, boca do túnel com escoras e o vagonete subindo e descendo
  - no nível 2, torre de madeira com a roda girando
  - no nível 3, torre de aço e casa de máquinas a vapor de tijolo, com chaminé fumegando

## 3. Fábricas novas

Cada fábrica tem um ramo e um desenho próprio:

| Fábrica | Usa | Faz |
|---|---|---|
| ⚔️ Armas | ferro e madeira | armas (os guardas e guerreiros ficam mais fortes) |
| 💣 Bombas | ferro e pedra | bombas (a vila usa quando é atacada) |
| 🚗 Carros | ferro e madeira | carros (o rico compra e o carro fica parado na porta de casa) |
| 🚂 Trens | ferro e madeira | vagões (põem o trem para andar) |
| 🛤️ Trilhos | ferro e madeira | trilhos (constroem a ferrovia) |
| 🎒 Mochilas | lã, couro ou pele | mochilas básica, média e boa |

- Cada cidade pode ter até 6 fábricas (antes eram 3).
- O dono da fábrica compra a matéria-prima de quem vendeu. A fábrica de mochilas que fica 4 dias sem lã nem couro muda de ramo.

## 4. Ferrovia, ponte de ferro e trem

- Uma vila com fábrica de trilhos constrói a ferrovia até a vila vizinha, um pedaço por dia.
- Onde a linha passa por cima da água, vira **ponte de ferro com treliça e pilares**, que gasta ferro.
- Os trilhos são contínuos, com dormentes de madeira, e acompanham a diagonal sem degraus.
- Com um vagão da fábrica de trens, **o trem começa a andar**: locomotiva preta com faixa vermelha, dois vagões com janelas acesas e fumaça.
- A cada viagem o trem leva mercadoria da vila que tem sobrando para a vila que tem pouco.

## 5. Inventário estilo Minecraft

- **Cada pessoa tem 10 espaços. Cada espaço guarda até 100 do mesmo item.**
- **Mochilas:** a básica dá +5 espaços, a média +10 e a boa +20. Elas são feitas na fábrica de mochilas e vendidas na praça.
  - O NPC compra quando tem dinheiro.
  - Você veste tocando na mochila dentro do inventário.
- **O NPC agora enche a mochila antes de voltar:**
  - sem mochila, ele junta 8 itens antes de voltar (antes eram 4)
  - com a mochila básica, 12
  - com a média, 18
  - com a boa, 30
- **Para você:** o que não cabe não entra, e aparece o aviso "Inventário cheio".
  - Quem vem de um save antigo com muita coisa não perde nada: o limite só começa a valer quando o inventário cabe nos espaços.
  - O limite pode ser desligado no painel.

## 6. Tela do personagem estilo ARK

- O botão 🎒 (ou a tecla **I**) abre a tela. No cartão de qualquer pessoa também tem o botão **🎒 Inventário e equipamento**.
- **No meio fica a miniatura do personagem**, num pedestal com brilho. Ela respira, dá um passinho e vira de lado.
- **Dos lados ficam os espaços de equipamento:** elmo, peitoral, calças, botas (ou sapatos de couro, sem armadura), arma, escudo, machado e picareta.
  - Tudo sai do que a pessoa tem de verdade (armadura de ferro, prata, ouro ou diamante, espada, arco).
- **Status:** vida, energia, fome, fôlego, XP, defesa, moedas e espaços usados.
- **Embaixo fica a grade do inventário.** Os espaços que só abrem com mochila aparecem com cadeado.

## 7. Poção de um toque

- **Barra fixa ❤️ 💙 💛** do lado esquerdo da tela, com a quantidade de cada poção. Tocou, tomou na hora.
- **Na tela do inventário:** tocou na poção, tomou.
- **O botão 🧪 do combate agora toma direto a poção que você mais precisa.** Segurando o botão, abre o menu antigo.
- **Teclas:** H para vida, J para cansaço e K para fome.

## 8. Painel de controle ⚙️

Fica na barra de baixo, tanto no modo deus quanto jogando. Cada mecanismo tem uma chave de ligar e desligar:

- **Sociedade:** guerras, bandidos, guildas, sonhos e o luxo do rei
- **Indústria:** minas, fábricas, ferrovias e trens, e as compras da indústria
- **Natureza e magia:** natureza viva, toca do dragão, caça ao dragão e cultos
- **Jogador:** limite do inventário e voo do semideus
- **Visual:** fumaça das chaminés e animações extras

Desligar só pausa o mecanismo, não apaga nada. A escolha fica salva no aparelho. Com as guerras desligadas, as suas ordens de ataque como rei continuam valendo.

## 9. Semideus voando como super-herói

- Com o semideus revelado (✨), aparecem 4 botões novos:
  - **🦸 Voar e pousar** (tecla **Y**)
  - **⬆️ Subir** (tecla **U**)
  - **⬇️ Descer** (tecla **N**). Descer no nível mais baixo pousa.
  - **💥 Rasante** (tecla **B**)
- **Voando:**
  - Ele fica deitado no ar, de braços para a frente, com **capa vermelha ondulando** e sombra no chão, que diminui quanto mais alto ele sobe.
  - Aparecem linhas de velocidade e um rastro.
  - É bem mais rápido que correr, passa por cima de muro, casa e água, não cansa, e quem está no chão não alcança.
- **Rasante:**
  - Ele mergulha no inimigo mais perto à frente (ou num ponto adiante), de cabeça, com brilho dourado.
  - Na batida dá **dano em área** num raio de 3 casas, que cresce com o nível.
  - A batida atordoa os inimigos, racha o chão, levanta poeira em volta e treme a tela.
  - Depois ele pousa ali. Se cair na água, volta a subir.

## 10. Animações

**O que mudou:**
- Gente e bicho agora **viram de lado de forma suave** (antes o desenho trocava de lado de uma vez).
- **Respiram** quando estão parados.
- O corpo **sobe e desce um pouco a cada passo**.
- Voo, rasante, trem, fumaça, roda da mina e vagonete são animados.

**O que eu não fiz:** não redesenhei quadro por quadro as animações de cada bicho e de cada poder. Isso pede muito desenho novo, e preferi deixar as coisas novas desta versão bem-feitas.

**Desempenho:** medi o tempo de desenhar a tela.
- Ficou entre 3 e 7 milésimos de segundo por quadro neste computador, bem abaixo do limite para 60 quadros por segundo.
- A v34 ficou tão leve quanto a v33.
- Tudo o que é novo só é desenhado quando está na tela.

## O que ainda dá para melhorar

- **O ritmo muda muito de um mundo para outro.**
  - No mundo do teste acima a indústria explodiu.
  - Em outro mundo, com vilas menores, em 70 dias só apareceu 1 mina e 1 fábrica.
  - A indústria depende de a vila entrar na revolução industrial e de ter mineiro com dinheiro.
- **Sobra ferro.** No mundo que cresceu, cada vila juntou uns 530 de ferro parado na praça. Dá para criar mais coisas que gastem ferro, como pontes na cidade, prédios e navios a vapor.
- **Quase ninguém compra carro.** Foram feitos 6 carros e ninguém teve dinheiro para comprar. Dá para baixar o preço ou criar o táxi.
- **Alguns NPCs carregam coisa demais.** Andarilhos e quem colhe na própria roça às vezes andam com muita coisa na mão sem guardar. Isso já acontecia na v33 (vi um com 29 de madeira) e não mexi.

## Para quem for mexer no código

- Pasta `v34/`: os módulos novos são
  - `m40-casas.js`: casas de tijolo e grade dos lotes
  - `m41-industria.js`: minas, fábricas, ferrovia e trem
  - `m42-inventario.js`: inventário, tela do personagem e poções
  - `m43-painel.js`: painel de controle
  - `m44-semideus.js`: voo e rasante
  - `m45-ligacoes34.js`: ligações diárias, save e animações
- Os números de equilíbrio ficam no começo de cada módulo: `MINA41`, `FAB41`, `INV42`, `VOO44`.

# Mundo Vivo v23: XP de assassinato e menu com ícones

Arquivo do jogo: `mundo-vivo-v23.html`. É a v22 com as duas mudanças abaixo, sem nada removido. Abre no navegador ou no Acode.

## O que mudou

| Pedido | Como ficou |
|---|---|
| XP vezes 10 por assassinato | Matar uma pessoa agora dá 100 de experiência (antes dava 10). Vale para todo mundo: o jogador e os NPCs, com espada, golpes, flecha, fogo ou dragão. Matar bicho continua igual (predador 20, os outros 3). O bônus de chefe e de membro de guilda continua multiplicando por cima. O número fica em `MURDER_XP`, fácil de mudar. |
| Menu da mochila separado em ícones | A 🎒 Mochila virou uma fileira de ícones, só com emoji. Toque num ícone e aparece só aquela parte, com o nome escrito embaixo dos ícones. Os ícones de sempre são 🎒 Mochila, 🐾 Meus bichos, 🧭 Seu caminho, 🧪 Poções, 🥋 Combate e controles, 🏯 Vender e 🛠️ Fabricar. |
| Funções de guerra e de cargo separadas | Cada função de chefe, rei ou fazendeiro tem o próprio ícone. Esses ícones têm borda vermelha e ficam numa fileira separada no celular em pé (no celular deitado e no computador, depois de uma barrinha). Só aparecem os do seu cargo. |
| Botões do canto | "👑 Meu reino", "🌾 Minha fazenda", "🍺 Minha guilda", "🗡️ Meu bando" e "🐉 Meu dragão" saíram do canto do mapa e viraram ícones só de emoji na barra de baixo, ao lado de 🍖 🔨 🎒 👁️. Entrou também o ⚔️, que abre direto as funções de guerra. Assim eles não ficam por cima dos botões de combate. |

Os ícones de cada cargo:

- **Chefe de guilda:** 🧑‍🔧 Trabalhadores · ⚔️ Guerra contra guilda · 🏴 Tomar fazenda à força · 👑 Conquistar reino
- **Rei:** ⛓️ Dominar guilda · 🚜 Fazenda para a coroa · 🐉 Criação de dragões (só se o rei também for chefe de guilda)
- **Fazendeiro:** 💰 Contratar roubo de fazenda · 🔗 Contratar domínio de fazenda · 🏰 Contratar domínio de reino · 🍺 Contratar domínio de guilda
- **Quem tem vassalos:** 📜 Meus vassalos

## O que foi testado de verdade

Os testes rodaram num navegador automático, em celular em pé (390×844), celular deitado (844×390) e computador (900×700).

- **XP:** um jogador sem guilda matou uma pessoa com um corte e ganhou exatamente 100 de experiência (antes eram 10). No teste do computador, isso fez o personagem subir do nível 4 para o 5. Em duas das três rodadas, o golpe de teste não acertou. Isso também acontecia no teste da v21 e não tem relação com o XP.
- **Ícones:**
  - Como chefe de guilda, apareceram os 7 ícones normais e mais 🧑‍🔧 ⚔️ 🏴 👑.
  - Cada ícone mostrou só a sua parte: a lista de guildas, a de fazendas e a de reinos.
  - Contratar trabalhador e declarar guerra pelos ícones funcionou.
- **Fazendeiro e rei:**
  - O fazendeiro viu 💰 🔗 🏰 🍺, cada um com os seus botões.
  - O rei viu ⛓️ e 🚜.
  - Um morador comum vê só os 7 ícones normais, sem o ⚔️.
- **Botão ⚔️:** abre a mochila direto nas funções de guerra. Tocar de novo fecha.
- **Celular deitado:** antes, o botão do canto ficava atrás dos botões de combate e não dava para tocar. Na barra de baixo, todos os toques funcionaram.
- **Sem erros:** nenhum erro de JavaScript nos testes nem na simulação do mapa grande (52 dias de jogo, 91 pessoas no fim, parecido com a v22).

## Limitações

- **No celular em pé, com muitos cargos, os ícones ocupam duas linhas:** uma para os normais e outra para os de guerra.
- **Os painéis grandes não mudaram.** Os painéis que abrem por 👑 🌾 🍺 (reino, fazenda e guilda) continuam como na v22, só que o botão agora é um ícone.

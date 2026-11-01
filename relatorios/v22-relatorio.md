# Mundo Vivo v22: guerra para todo mundo

Arquivo do jogo: `mundo-vivo-v22.html`. É um arquivo único que abre no navegador ou no Acode. Tudo da v21 continua lá; a v22 só acrescenta coisas.

## Como usar (jogando)

Abra a 🎒 Mochila. Aparece uma parte nova, **"⚔️ Guerra e conquista"**, com opções diferentes conforme quem você controla:

- **Chefe de guilda:**
  - "🧑‍🔧 Contratar trabalhador" custa 8🪙 do cofre e 2🪙 por dia de salário. Toque no nome do trabalhador para trocar a função.
  - "⚔️ Guerra contra a guilda X": quem vence ocupa o acampamento do outro.
  - "🏴 Tomar à força a fazenda de X".
  - "👑 Conquistar o reino X": se o rei cair, você vira rei.
- **Rei:**
  - "⛓️ Dominar a guilda X" e "🌾 Tomar a fazenda de X para a coroa".
  - Se você for rei e chefe de guilda ao mesmo tempo, aparece também a criação de dragões, com o botão "🥚 Comprar ovo de dragão".
- **Fazendeiro:** "Contratar guilda para…" roubar outra fazenda, dominar outra fazenda, dominar um reino ou dominar outra guilda.
- Quem tem vassalos vê a lista deles no fim dessa parte.

Os NPCs fazem tudo isso sozinhos também.

## O que mudou

| Pedido | Como ficou |
|---|---|
| Trabalhadores da guilda | Funcionam como os peões da fazenda. As funções são ⛏️ Mineiro (ferro, ouro, prata e pedra), 🪓 Lenhador, 🧺 Coletor (frutas e caça) e ⚒️ Artesão. A guilda contrata andarilhos, gente que já ia sair da vila (só de vilas com 22 moradores ou mais) ou alguém "que veio de longe". Eles comem no acampamento, dormem no casarão e ganham 2🪙 por dia. Sem salário, alguns vão embora. A sobra do estoque é vendida e o dinheiro vai para a guilda. |
| Posto avançado do artesão | O artesão junta 10 madeiras e 4 pedras e ergue o "⚒️ Posto do artesão" perto do acampamento. Lá ele forja armas e armaduras com o estoque da guilda, começando por quem está pior equipado. O membro pega a peça quando passa pelo acampamento ou pelo posto. |
| Guerra entre guildas | A guilda atacante marcha até o acampamento da outra, e os membros da defensora são chamados para lutar. Para vencer, é preciso derrotar todos os defensores, ou estar bem mais forte quando o prazo acaba. A perdedora é ocupada: o acampamento vira **🏴 posto avançado** da vencedora, com 2 vigias. Os sobreviventes podem mudar de lado, e o estoque, os trabalhadores, as fazendas e a loja de poções passam para a vencedora. Cada guilda vigia no máximo 4 postos (o mais antigo é abandonado). As guildas dos NPCs não atacam uma guilda com menos de 4 dias, e quem acabou de levar guerra fica 3 dias em paz. |
| Guilda toma fazenda à força | Os aventureiros atacam a fazenda. Se o dono cair, ficar muito ferido ou se esconder enquanto os atacantes estão bem mais fortes, a fazenda passa para a guilda e o dono vira gerente (o lucro vai para a guilda). Se o dono aguentar, aparece "a fazenda resistiu". |
| Conquistar um reino | A guilda marcha para a cidade. Se o rei cair, ou se a tropa for muito mais forte que a defesa, o **chefe da guilda vira rei** e administra a cidade. A guilda continua no acampamento, sob as ordens dele. Se o rei morrer, o novo chefe da guilda assume o trono. Uma cidade atacada para conquista fica 6 dias sem sofrer outra tentativa. |
| Dragões do rei | O rei que também é chefe de guilda pode comprar ovo de dragão (140🪙 do tesouro). Com dois dragões adultos, eles procriam, e cada membro da guilda que ainda não tem dragão ganha um filhote. Os NPCs-reis fazem isso sozinhos. |
| Domínio cruzado | Um rei domina guilda e toma fazenda para a coroa. Um fazendeiro, contratando uma guilda, rouba ou domina outra fazenda, domina um reino ou domina uma guilda. Quem é dominado vira **vassalo** e paga tributo todo dia: o reino paga 15% do tesouro, e a guilda e a fazenda pagam 30% das moedas. Às vezes um vassalo se rebela. |
| Fazenda contrata guilda | Os preços são: roubar 35🪙, dominar uma fazenda 80🪙, dominar uma guilda 130🪙 e dominar um reino 150🪙. No roubo, 70% do que foi levado vai para quem contratou. |
| Cidade cresce e ganha muralha nova | As casas novas também são construídas do lado de fora do muro. Quando há pelo menos 4 casas fora, o rei planeja uma muralha nova em volta delas, com portões e estradas, e os moradores a constroem. A ordem da muralha só passa na frente de obras menos urgentes. Do lado de uma vila vizinha, a muralha nova para antes do muro dela. |
| Ranking e mapa | O ranking soma os vassalos e os postos ao senhor. No mapa aparecem "⚔️ Guerra!", "🏴 Posto avançado", "⚒️ Posto do artesão", "👑 Reino da guilda" e "⛓️ vassalo de…". O painel de cada pessoa ou guilda mostra trabalhadores, postos, reino, senhor e guerra. |
| Salvar / carregar | Ficam salvos as guerras em andamento, os trabalhadores e suas funções, os postos, o reino da guilda, os vassalos e os tributos. Saves antigos continuam abrindo. |

## O que foi testado de verdade

Os testes rodaram num navegador Chromium automático, em celular em pé (390×844), celular deitado (844×390) e computador (900×700). Cada item abaixo foi forçado num mundo novo e conferido pelo estado do jogo, não só pela mensagem.

- **O jogo abre e roda sozinho sem erros.**
  - Mapa grande: 79 dias, nenhum erro de JavaScript, 94 pessoas no fim e 50 na cidade. Nesse tempo houve 24 guerras entre guildas, 7 acampamentos ocupados, 17 fazendas tomadas à força, 2 roubos contratados, 5 postos do artesão, 61 peças forjadas e uma muralha nova feita pelos moradores (planejada no dia 43, pronta no dia 50).
  - Mapa médio: 159 dias, nenhum erro. Houve 18 guerras, 5 fazendas tomadas por guildas, 5 fazendas tomadas pela coroa e 82 peças forjadas.
- **Trabalhadores:** contratei 4 numa guilda. Mineiros, lenhador e coletor encheram o estoque (num teste, o ferro foi de 12 para 30). O artesão ergueu o posto e forjou de 13 a 41 peças por teste, e os membros receberam armas e armaduras melhores.
- **Guerra entre guildas:** a guilda forte atacou a fraca. A fraca sumiu, o casarão dela virou "posto" da vencedora e entrou na lista de postos.
- **Guilda toma fazenda:** a fazenda passou para a guilda (o dono virou gerente). Antes da última correção, o dono escondido em casa fazia a fazenda "resistir" sempre. Isso foi corrigido e testado de novo.
- **Fazenda contrata guilda para roubar:** quem contratou pagou 35🪙 e recebeu 70% do roubo. As moedas e a comida passaram de uma fazenda para a outra.
- **Rei domina guilda:** a guilda virou vassala do reino. No dia do tributo, a guilda pagou 30🪙 e o tesouro do reino recebeu.
- **Fazendeiro domina reino:** o fazendeiro contratou uma guilda, o rei caiu, e o reino passou a ser "vassalo da fazenda de…".
- **Guilda conquista reino:** com o rei derrubado, o chefe da guilda virou rei (profissão "rei", morando na cidade) e continuou chefe da guilda. Depois de mais um tempo de jogo, ele ainda era rei e chefe, e a guilda seguia no acampamento.
- **Dragões:** o rei comprou 2 ovos. Com os dois adultos, eles procriaram, e os 2 membros sem dragão ganharam um cada (de 2 para 4 dragões).
- **Muralha nova:** num mapa enorme, depois de surgirem 8 casas fora do muro, o rei mandou erguer a muralha. Os moradores construíram todos os trechos sozinhos em cerca de 10 dias de jogo e a cidade ficou com 3 muros. O mesmo aconteceu sem ajuda no mapa grande.
- **Salvar e carregar:** guerras, postos, trabalhadores, rei de guilda, vassalos e guildas dominadas voltaram iguais depois de carregar.
- **Menu:** como chefe de guilda, a parte "⚔️ Guerra e conquista" aparece com contratar trabalhador, trocar função, guerra, tomar fazenda e conquistar reino. O botão de contratar funcionou. Como fazendeiro, aparecem os botões "Contratar guilda para…".
- **Testes da v21:** rodaram de novo e passaram (preços, inventário por NPC, roubo ao matar, venda na fortaleza, botão de poções, salvar e carregar).

## Limitações

- **A muralha nova depende de espaço.** Se outra vila estiver perto, não cabe outro anel: o jogo avisa "não tem espaço para outra muralha" e a cidade fica como está.
- **Conquista de reino pelos NPCs é rara.** Na simulação, as guildas tentaram conquistar várias vezes, mas a cidade costuma ser mais forte. Pelo botão do jogador (ou com uma guilda bem forte), funciona.
- **Mapa pequeno tem só 1 guilda** (como você pediu antes), então lá não há guerra entre guildas. As outras guerras (fazenda e reino) continuam valendo.
- **Os nomes das guildas se repetem com número** ("Machado Velho II") quando muitas já foram criadas e ocupadas.
- **No mapa médio, a cidade às vezes esvazia** quando a primeira geração envelhece toda junta (por volta do dia 30 a 45). Medi a causa das mortes: foi velhice, e isso acontece igual na v21. Não é efeito das guerras.
- **O teste foi feito em navegador automático,** não num celular físico.

# Mundo Vivo v20: guildas elementais, combate, controles e loja de poções

Arquivo do jogo: `mundo-vivo-v20.html`. É um arquivo único que abre no navegador ou no Acode, sem internet e sem outros arquivos.

## Como jogar com os poderes

- **Celular:** os botões aparecem à direita quando você controla uma pessoa: Ataque 1, Ataque 2, Ataque 3, 🛡️ Defesa, Dash, Pulo e Pulo+Dash.
  - Segure o 🛡️ para bloquear. Um toque rápido nele faz a esquiva.
  - Pulo e depois Dash também faz o combo manual.
  - O joystick continua funcionando enquanto você ataca.
- **Seletor de elemento:** a coluna 💧⛰️🌀🔥 ao lado do joystick. Aparece para quem está numa guilda.
- **Teclado:**
  - `1` `2` `3`: ataques. `Q`: dash. `C`: pulo. `X`: pulo+dash.
  - `V`: segure para bloquear; um toque rápido faz a esquiva.
  - `Z`: troca o elemento. `H`: bebe a poção de vida.
  - WASD e as setas continuam como antes.
- **Tamanho dos botões:** 🎒 Mochila → "Tamanho dos botões" (pequeno, médio ou grande). Fica salvo no aparelho.
- **Loja de poções:** cada guilda ganha uma barraca de alquimista 🧪 ao lado da sede. Chegue perto e aperte "🧪 Loja de poções".
  - As poções ficam na 🎒 Mochila, onde também dá para bebê-las.

## Sistemas alterados

| Sistema | O que mudou |
|---|---|
| Guildas | Cada guilda recebe um elemento (Água, Terra, Ar ou Fogo), espalhado entre as guildas. O elemento aparece no nome sobre o mapa e no painel da guilda. Membros vestem a cor do elemento. Tudo é salvo no save. |
| Habilidades (novo) | 24 habilidades elementais e 7 golpes comuns (Corte, Projétil, Arranque, Pulo, Pulo+Arranque, Bloqueio, Esquiva). Tudo fica numa tabela só (`ABIL`), com dano, custo, recarga, alcance e duração de cada fase. |
| Máquina de estados (nova) | Estados idle, walk, attack, dash, jump, defense, hurt e recovery. Cada golpe tem preparação, execução, impacto e recuperação, e tudo roda no passo de tempo do jogo, sem esperas que travam. |
| Combate | Dano só sai na fase de execução ou impacto. Projéteis param em muro, casa e morro alto. O dash e a esquiva deslizam com colisão e não atravessam parede, casa, água funda nem a borda do mapa. Os golpes gastam fôlego e têm recarga. O dano cresce com o nível (o mesmo multiplicador que já existia). |
| Efeitos por elemento | Água deixa lento. Terra atordoa. Ar empurra. Fogo queima (usa o fogo que já existia). O bloqueio de cada elemento tem um extra: Terra reduz mais o dano, Fogo queima quem bate, Ar empurra, Água cura um pouco. |
| Dano (`hurt`) | Antes do dano, passa pela defesa: a esquiva anula e o bloqueio reduz em 70% (85% na Terra). Depois do dano, toca a animação de "levou golpe". |
| NPCs | Membros de guilda lutam com os poderes do próprio elemento. Usam o ataque em área quando cercados, o dash para encostar e o pulo+dash para fugir quando estão mal, e bebem poção com a vida baixa. Lutadores comuns às vezes arremessam pedras. Guerreiros, guardas, bandidos e membros de guilda às vezes bloqueiam ou esquivam sozinhos. O ataque corpo a corpo antigo ganhou o efeito de corte. |
| Desenho | Cada habilidade tem um efeito próprio desenhado em código, como a onda, o redemoinho, o pilar de pedra, a fenda, o tornado, a rajada, a bola de fogo e o meteoro. O corpo também anima: inclina, agacha, sobe no pulo, gira no tornado e treme quando apanha. Há escudos por elemento, carga brilhando antes do golpe, partículas e sombra no pulo. |
| Sons | 7 sons novos sintetizados, sem arquivos: água, vento, pedra, golpe, explosão, bloqueio e poção. |
| Controles de celular | Botões de combate, seletor de elemento e tamanho ajustável. Toques não duplicam: o botão consome o toque e não move o joystick. O layout funciona em pé e deitado. |
| Loja de poções (nova) | A barraca do alquimista é uma construção nova no mapa, ao lado de cada guilda. A tela de compra mostra o preço e confere as moedas. As mensagens são "Compra concluída" e "Saldo insuficiente". Longe da loja não compra. 40% do valor vai para a guilda dona da loja. |
| Poções | Vida 50🪙, Cansaço 40🪙 e Fome 40🪙. Cada uma recupera 50% e nunca passa do máximo. Preço e quantidade ficam no objeto `POT`, fácil de mudar. |
| Salvar / carregar | O save guarda o elemento escolhido pelo jogador, o elemento e a loja de cada guilda e as poções da mochila. Saves antigos continuam abrindo, porque a construção nova foi adicionada no fim da lista. |

## O que foi testado de verdade

Os testes rodaram num navegador Chromium automático, em celular em pé (390×844), celular deitado (844×390) e computador (900×700).

- **O jogo abre e roda sem erros.** Mapa médio por 58 dias de jogo e mapa pequeno por 66 dias, a 100x, sem nenhum erro de JavaScript. A população ficou parecida com a da v19 (mapa médio, comparado lado a lado).
- **As 24 habilidades.** Controlando um membro de guilda, cada uma foi disparada contra um alvo. Todas as 24 dispararam, e todas causaram dano ou moveram o personagem. Todas voltaram ao estado normal no fim. Os pulos sobem e descem (altura medida). As 24 também foram fotografadas quadro a quadro (preparação, execução e impacto), e os efeitos de cada elemento são diferentes entre si.
- **NPCs usando os poderes.** Na simulação do mapa médio, os NPCs usaram as habilidades 1.323 vezes, incluindo bloqueio e esquiva.
- **Golpes comuns sem guilda.** Corte, projétil, arranque, pulo e pulo+arranque funcionaram. Os poderes de elemento ficam bloqueados para quem não tem guilda.
- **Defesa.** Golpe de 40 sem defesa tirou 33 de vida, com bloqueio tirou 10 e com esquiva tirou 0. Depois o personagem volta ao normal.
- **Colisão.** Um dash de 4 casas contra um muro de pedra parou na frente do muro, sem atravessar.
- **Loja de poções.**
  - O botão "🧪 Loja de poções" aparece perto da barraca e abre a tela.
  - Com 60🪙 a compra deu certo (sobraram 10🪙). A segunda compra deu "Saldo insuficiente" e nada mudou.
  - A poção de vida encheu a vida sem passar do máximo. Com a vida cheia, ela não é gasta.
  - A poção de cansaço recuperou a energia e o fôlego, e a de fome recuperou a fome.
  - Sem a poção, aparece a mensagem certa. Longe da loja, não compra.
- **Toque (multitoque real).** O joystick moveu o personagem enquanto o outro dedo apertava o Ataque 1, e saiu um golpe só, sem duplicar. Segurar o 🛡️ deu bloqueio e o toque rápido deu esquiva. O seletor de elemento trocou o elemento e os ícones dos botões.
- **Teclado.** As teclas 1, Q, C e Q (combo) dispararam 4 ações.
- **Salvar e carregar.** Depois de carregar, o elemento do jogador, o elemento da guilda, a loja e as poções voltaram iguais.
- **Funções antigas.** O teste da v18/v19 rodou de novo sem erro: fundar guilda, cobrar proteção, saque, painel de ranking, alertas "Ir ver" e salvar/carregar.

## Limitações

- **Nenhum arquivo externo é necessário.** Os efeitos são desenhados em código (canvas) e os sons são sintetizados. Não há sprites nem áudios novos. Quem quiser trocar por arte desenhada à mão precisaria criar folhas de sprites, que hoje não existem.
- **O personagem não tem quadros novos de animação.** O corpo é o mesmo sprite de antes, e a animação vem de inclinar, esticar, girar e subir esse sprite, mais os efeitos em volta e a pose de ataque que já existia.
- **O pulo é visual.** Como o mapa é visto de cima, o personagem sobe na tela com uma sombra no chão. Ele não passa por cima de muros; o pulo+dash anda pelo chão com colisão.
- **O bloqueio segurado só existe para o jogador.** Os NPCs bloqueiam por reação, em parte das vezes.
- **Ver os 4 elementos ao mesmo tempo depende do mapa.** No mapa pequeno só existe 1 guilda (como você pediu antes), então só um elemento aparece por mundo. O jogador membro de guilda pode trocar de elemento à vontade para experimentar todos.
- **O teste de toque foi feito em navegador automático com multitoque simulado,** não num celular físico.

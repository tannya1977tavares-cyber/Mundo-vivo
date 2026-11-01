# Mundo Vivo v30: andar no convés, tripulação e poderes a bordo

O jogo é o arquivo `mundo-vivo-v30.html`. Ele foi feito a partir da v29, e tudo o que já existia continua funcionando. A v29 não foi alterada.

## Compatível com o jogo

- **Saves da v29 abrem na v30**, inclusive um save feito com você a bordo. O navio ganha uma tripulação com nomes logo que carrega.
- Salvar e carregar no convés volta no convés.
- Um save feito na v30 pode não abrir direito na v29. Se quiser voltar para a v29, guarde uma cópia do save antigo.

## Soltar o leme e andar no convés

| Ação | Celular | Teclado |
|---|---|---|
| Soltar o leme / pegar o timão | botão 🚶 Andar no convés / 🎡 Pegar o timão (no alto) | G |
| Andar no convés | joystick | WASD ou setas |
| Ordens e tripulação | botão 🧭 Ordens (no convés) ou 👥 Tripulação (no leme) | O |
| Soprar a vela com ar | botão 🌬️ Soprar a vela | N |
| Poderes (ataques e defesa) | botões de combate | 1 / 2 / 3, espaço = ataque 1 |
| Falar com um tripulante | chegue perto, botão 💬 Falar | botão de contexto |
| Pegar o timão andando | chegue no timão, botão 🎡 Pegar o timão | G |

- Quando você solta o leme, o **navegador** assume. Sem navegador, o leme fica amarrado e o navio segue reto.
- A câmera se aproxima para você ver o convés, os marujos e você andando.

## Tripulação

- Os marujos aparecem no convés com nome, cargo, roupa e humor. O número que aparece depende do navio: escuna até 5, brigue 8, fragata 12, navio de guerra 16.
- **Cargos:** navegador (leva o navio), artilheiro (vai para o lado do inimigo e atira mais rápido), carpinteiro (conserta o casco sozinho), vigia (avisa piratas e terra por perto), cozinheiro (segura o humor) e marujo.
- No painel da tripulação você conversa com cada um, muda o cargo e promove alguém a navegador.
- **Humor:** sobe com rodada de bebida e comida e cai com o tempo e as batalhas. Uma tripulação animada recarrega os canhões mais rápido.
- Na taverna dá para **contratar um navegador** por 25 🪙.

## Piloto automático (ordens ao navegador)

- **Rumo:** segue em frente e desvia da terra.
- **Ir ao porto:** escolhe um porto e ele leva o navio até lá.
- **Atacar:** escolhe um navio por perto e ele persegue. Os canhões atiram sozinhos, ou você segura o fogo e ataca só com os poderes.
- **Parar.**
- Pelo painel também dá para mexer nas velas, na âncora, atirar, consertar, abrir o porto e descer do navio.

## Semideus com todos os elementos

- O avatar semideus já tem **fogo, água, terra e ar liberados**, sem entrar em guilda. O seletor de elemento (botão ou tecla Z) aparece direto.

## Ar na vela

- Usar um ataque de ar no convés sem navio inimigo na mira **sopra a vela**: o navio fica bem mais rápido por alguns segundos (de 5 a 14, conforme o ataque). Num teste, a velocidade foi de 1,46 para 2,72.
- O botão 🌬️ Soprar a vela (tecla N) aparece para o semideus e para quem usa ar. Ele troca para ar sozinho e sopra.

## Poderes contra outros navios

- Do convés, seus ataques acertam os navios por perto, com mais alcance que em terra.
- **Fogo** pode incendiar o navio. **Água** deixa ele lento. **Terra** faz mais dano no casco e pode derrubar tripulantes. **Ar** empurra o navio e pode rasgar a vela.
- Combina com o piloto automático no modo Atacar. No teste, um navio pirata foi afundado só com poderes.
- Tiros de canhão no seu navio às vezes acertam você no convés. O bloqueio diminui esse dano.

## Navios dos NPCs comprados no estaleiro

- Cada navio mercante e da marinha agora é **encomendado e pago pela vila** (moedas, madeira e ferro) e leva um tempo para ficar pronto. Se faltar ferro, a vila compra ou usa mais madeira.
- Depois a vila vai **melhorando** os navios: mercantes ganham porão e velas, a marinha ganha canhões e casco. A ficha da vila mostra a obra no estaleiro e o nível de cada navio.
- Quando a vila enriquece, ela **troca a escuna por um navio maior**, que fica com o mesmo nome e a carga.
- **Piratas** guardam o saque na enseada e voltam com navios maiores e mais armados.
- No teste de 20 dias, as vilas encomendaram e receberam navios, fizeram 13 melhorias e os piratas apareceram, sem nenhum erro.

## Poderes dentro das cavernas

- Dentro das cavernas todos os ataques e defesas dos 4 elementos funcionam: projéteis, áreas, cones, jatos, explosões, esquiva, salto e bloqueio.
- Os efeitos também valem: queimadura, lentidão, atordoamento e empurrão.
- No teste, o dano recebido foi 126 sem defender, 43 bloqueando e 0 esquivando.

## Limites conhecidos

- Andar no convés é simplificado: não tem escadas nem porão para descer.
- Esquiva e salto no convés não tiram você do navio.
- Os navios dos NPCs não mostram a tripulação andando, só o seu.

## Testes feitos

- Elementos livres, convés, andar, navegador, painel, sopro, poderes contra navios, ir ao porto, salvar e carregar no convés.
- Cavernas com os 4 elementos e as defesas.
- 20 dias de simulação com a frota dos NPCs.
- Save da v29 a bordo carregando na v30.
- Telas de celular em pé (390 px) e deitado (844 px).

## Arquivos

- `mundo-vivo-v30.html`: o jogo.
- `v30/`: o código novo (`m23` a `m26`) e o `build30.py`, que monta a v30 a partir da v29.

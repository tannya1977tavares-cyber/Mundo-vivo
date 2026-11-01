# Mundo Vivo v33: NPCs com os genes dos melhores

**Arquivo do jogo:** `mundo-vivo-v33.html`. A v32 e a v31 continuam como estavam.

## O que eu fiz

1. **Cada NPC ganhou uma "genética" de comportamento.** Ela tem 6 partes:
   - se é ganancioso ou manso
   - o traço: corajoso, preguiçoso, honesto ou trabalhador
   - o sonho
   - a **margem de preço** que cobra na banca (abaixo ou acima do preço da praça)
   - **quanto guarda** antes de gastar na casa
   - a **vontade de ter filhos** (mais ou menos que o normal)
2. **A nota de sucesso** de cada NPC soma:
   - dinheiro
   - nível
   - nível do ofício
   - filhos
   - casa (reformas e móveis)
   - sonho realizado (por exemplo, virar rei)

   Essa soma é dividida pelo tempo de vida adulta, para o mais velho não ganhar só por ter vivido mais.
3. **Rodei 100 sessões de 200 dias cada**, 4 ao mesmo tempo, o que dá 25 gerações.
   - No fim de cada geração separei os melhores de cada ofício: os 20% de nota mais alta, de 2 a 8 por ofício.
   - Os NPCs da geração seguinte nasceram com os genes deles, com uma pequena mutação.
   - Para dar tempo, simulei sem desenhar a tela e com passo de tempo maior.
   - Nenhuma das 100 sessões deu erro de jogo. Uma sessão caiu uma vez por causa de um reinício da máquina, e aquela geração seguiu com as outras 3.
4. **A v33 traz os genes da última geração dentro do jogo.** Todo NPC novo, quando vira adulto e pega o ofício, herda o jeito dos melhores daquele ofício.

## O que os melhores têm em comum

- **Quase todos são trabalhadores.** O traço "trabalhador" dominou em praticamente todos os ofícios.
  - "Preguiçoso" quase sumiu.
  - "Honesto" e "corajoso" sobraram em poucos.
- **Cobram um pouco acima do preço da praça.** A margem média ficou de 10% a 30% acima.
  - Caçador, pastor, lenhador e coletor cobram mais caro (de 27% a 39%).
  - Rei, ferreiro e construtor vendem mais barato.
- **Ganancioso ou manso depende do ofício:**
  - Caçador, fazendeiro e pastor bem-sucedidos são quase todos **mansos**.
  - Coletor, guarda, cozinheiro e mercador bem-sucedidos são **gananciosos**.
- **Sonhos que dão certo:** rei, rico e dragão no geral. O artesão sonha ser mestre, e o peão sonha ter fazenda ou família.
- **Quanto guardam:**
  - Minerador e pastor juntam muito antes de gastar na casa (de 57 a 66 moedas).
  - Lenhador e carpinteiro gastam quase tudo.
- **Filhos:** minerador, pastor, guerreiro e rei querem mais filhos. Fazendeiro e salteador querem menos.

## Os NPCs ficaram melhores de verdade?

Fiz uma comparação no fim: 4 mundos de 100 dias com genes sorteados contra 4 mundos com os genes aprendidos.

| | Genes sorteados (v32) | Genes aprendidos (v33) |
|---|---|---|
| Nota média dos NPCs | 196 | 199 |
| Nível médio | 6,4 | **8,2** |
| Moedas por pessoa | 52 | 44 |
| População no dia 100 | 93 | 57 |

- **O nível subiu bastante**, porque quase todos são trabalhadores.
- **A nota geral quase não mudou.**
- **A população ficou menor** nessas 4 rodadas.
  - O mapa e os acontecimentos de cada mundo (guerra, dragão, fome, onde nasce a vila) pesam muito mais no sucesso do que o jeito da pessoa.
  - Com só 4 mundos de cada lado, essa diferença pode ser sorte.
- Ao longo das 25 gerações a nota média também ficou parecida, sempre perto de 205 a 220. A evolução mudou o *jeito* dos NPCs, mas não deixou a sociedade mais rica.

## Ideias para a evolução fazer mais diferença

- Dar mais coisas para os genes decidirem, que hoje são regra fixa:
  - a hora de trabalhar e de descansar
  - quando trocar de ofício
  - quando casar
  - quanto arriscar em guerra e em caça perigosa
- Rodar todas as sessões de uma geração **no mesmo mapa**. Assim a sorte do mundo pesa menos e dá para ver melhor qual gene é bom.
- Pesar também a vila: um NPC que deixa a vila mais rica soma pontos, e não só quem enriquece sozinho.

## Arquivos

- `mundo-vivo-v33.html`: o jogo.
- Pasta `v33/`:
  - `genes-finais.json`: os genes dos melhores de cada ofício, os que estão dentro do jogo.
  - `geracoes.jsonl`: o resumo de cada uma das 25 gerações.
  - Os scripts da simulação (`evo.py`, `evo-sessao.js`) e os módulos do jogo. O módulo novo é `m37-genes.js`.

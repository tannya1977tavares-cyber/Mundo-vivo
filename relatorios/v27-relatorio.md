# Mundo Vivo v27: roupas, avatar, casas, mercado, calendário e cavernas

Arquivo do jogo: `mundo-vivo-v27.html`. É um arquivo único que abre no navegador ou no Acode. Partiu da v26, e tudo o que existia continua lá. A v26 não foi alterada.

Esta versão coloca no jogo os seis documentos de design que fizemos na conversa: guarda-roupa, avatar, casas por classe, ciclo do mercado, calendário com cultos e poderes, e cavernas.

Para ver a diferença, abra `v27-antes-depois.png`. É o mesmo mundo salvo, aberto na v26 (esquerda) e na v27 (direita), de dia e de noite.

## O que mudou

### Roupas

| Coisa | v26 | v27 |
|---|---|---|
| Roupa | uma por profissão | 3 conjuntos por profissão (pobre, classe média, rico), masculino e feminino |
| Peças | roupa inteira | camisa ou vestido, calça ou saia, sapato, capa e colar, que se misturam entre os conjuntos |
| Quem veste o quê | igual para todos | segue a classe da casa: barraco veste pobre, cabana até sobrado veste classe média, casa de pedra para cima veste rico |
| Armaduras | uma só | seguem o mesmo sistema de peças |
| Troca de roupa | não tinha | cada pessoa escolhe a roupa todo dia de manhã. No cartão da pessoa dá para fixar o visual dela |

### Avatar (o seu personagem)

| Coisa | v26 | v27 |
|---|---|---|
| Personagem próprio | só dava para controlar um NPC | botão **✨ Criar meu personagem**, com editor de corpo, cabelo, pele, roupa e modelos prontos |
| Editar depois | não tinha | botão **🎨 Editar meu visual** e aba **Meu visual** |
| Experiência | não tinha | o avatar ganha XP e sobe de nível |
| Controlar NPCs | sim | continua. Ao sair de um NPC, você volta ao próprio corpo |
| Semideus | não tinha | botão de semideus: o avatar vira o "corpo" do deus, com a aba **Poderes** |

### Casas por classe social

| Classe | Casa | Tamanho no mapa |
|---|---|---|
| Pobre | Barraco | 1 × 1 |
| Classe média baixa | Cabana (a da v26) | 1 × 1 |
| Classe média | Casa | 2 × 1 |
| Classe média alta | Sobrado | 2 × 1 |
| Quase rico | Casa de pedra | 3 × 2 |
| Rico | Casarão | 4 × 2 |
| Muito rico | Palacete | 5 × 3 |

- A família **sobe de casa** quando junta dinheiro e paga o material ao construtor. Se ficar sem dinheiro, **vende a casa e desce** uma classe. As duas coisas aparecem na crônica.
- Cada profissão tem uma faixa de classes (o rei mora sempre no palacete).
- O telhado mantém a cor da profissão, e a porta ganha o enfeite dela.
- O cartão da vila mostra termômetros de riqueza e pobreza. O cartão da casa mostra a classe.

### Ciclo do mercado

| Coisa | v26 | v27 |
|---|---|---|
| Salário | só alguns ofícios | salário diário para todos, pago de manhã, no valor da função |
| Barracas | não tinha | uma barraca por profissão na praça, com preço |
| Preço | fixo | cada cidade tem preço próprio, pela oferta e procura |
| Mascates | não tinha | levam a sobra de uma cidade para onde falta, com mochila nas costas |
| Rei | só cobrava | tem a barraca da coroa, guarda comida no celeiro e abre quando falta, baixa o imposto quando metade da vila está pobre |
| Navio | não tinha | atraca no porto, leva a sobra e traz metais |
| Desgaste | não tinha | ferramentas e armas gastam e precisam de conserto no ferreiro |

### Calendário, folgas, cultos e poderes

| Coisa | v26 | v27 |
|---|---|---|
| Data | só "dia N" | calendário com dia da semana, mês e ano (começa segunda, 1 de janeiro, ano 1). Clique no relógio para abrir o calendário |
| Horário | trabalho o dia todo | trabalho das 6h às 18h, folga à noite e no fim de semana |
| Folga | não tinha | as pessoas passeiam, conversam, dançam, sentam em volta da fogueira |
| Acendedor de lampiões | não tinha | acende os postes ao anoitecer |
| Ladrões | não tinha | roubam à noite, a guarda persegue e prende |
| Cultos | não tinha | todo domingo a vila faz culto em volta da fogueira, com rezas e rituais. Às vezes o povo faz um pedido ao deus, num cartão |
| Fé | não tinha | a fé cresce com os cultos e paga os poderes. A índole do deus (😇 Benevolente, ⚖️ Justo, 🎲 Caprichoso, 😈 Implacável) muda as reações do povo |
| Poderes | os da v26 | 35 novos: 9 bênçãos, 9 maldições, 5 milagres e 12 de elementos (chuva, seca, raio, vento, fogo, dilúvio, terremoto, tormenta, meteoros, eclipse e outros) |
| Lobisomem | não tinha | na lua cheia alguém pode virar lobisomem |

Animações novas (poses): ajoelhar, louvor de joelhos, prostrar, oferenda, reverência, louvor, dança, sentar na fogueira, mãos dadas, acender lampião, espreitar, encolher de medo, levitar, abençoar, amaldiçoar e revelar.

### Cavernas

| Coisa | Como ficou |
|---|---|
| Onde ficam | 6 entradas no pé das montanhas: 3 Grutas Úmidas (começam no nível 1), 2 Minas Abandonadas (nível 6) e 1 Salão Profundo (nível 11). Ao subir de nível, a caverna vira a próxima: Gruta (1–5), Mina (6–10), Salões (11–19), Abismo de Magma (20–30) |
| Entrar | chegue perto e toque em **⛰️ Entrar**. Até 3 lutadores da vila que estejam por perto entram com você |
| Luta | ondas de inimigos de 3 em 3, com um de elite (contorno dourado). Entre as ondas há 8 segundos de descanso que curam 20% |
| Inimigos | 16 tipos, como rato, morcego vampiro, gosma (que se divide), esqueleto (que levanta de novo), aranha (teia que deixa lento), goblin arqueiro, orc, cultista, golem, diabrete (explode), cavaleiro sombrio (escudo), salamandra |
| Chefes | Rei Rato, Aranha-Rainha, Senhor da Guerra Gorr e Senhor das Brasas. Chamam ajudantes na metade da vida e ficam furiosos no fim |
| Prêmios | baú no fim, itens comuns, raros e de chefe, e conjuntos de armadura com bônus. Os itens vão para a aba **Cavernas** e podem ser equipados |
| Progresso | caverna zerada sobe de nível |
| Se perder | quem cai é tirado da caverna. Se todos caem, a expedição acaba |
| NPCs | grupos de NPCs também fazem expedições sozinhos, e o resultado aparece na crônica |

## Desempenho

Medi num navegador simulando um celular com o processador 4 vezes mais lento (390×844), com o mesmo mundo salvo nas duas versões, duas vezes cada.

| Situação | v26 | v27 |
|---|---|---|
| Mapa inteiro de longe | 43–48 quadros/s | 42 quadros/s |
| De perto, parado | 57–58 quadros/s | 54–57 quadros/s |
| De perto, com o jogo rodando | 49–55 quadros/s | 47–52 quadros/s |

A v27 ficou um pouco mais lenta, porque tem muito mais coisa acontecendo (roupas, barracas, postes, mascates, cultos). Na primeira medição a diferença era maior. Para diminuir:
- **Roupas:** o visual de cada pessoa é montado no máximo duas vezes por segundo, e não a cada quadro.
- **Luzes da noite:** os brilhos dos postes, das janelas e da fogueira ficaram menores. Além de mais rápido, a noite ficou menos lavada.

## O que foi testado

Os testes rodaram num navegador Chromium automático, em computador (900×700), celular em pé (390×844) e celular deitado (844×390).
- **Simulação longa:** 12 dias no mapa médio e 40 dias no mapa grande. Apareceram cultos, postes acesos, mascates, ladrões presos, navio, celeiro do rei, famílias subindo e descendo de casa e expedições de NPCs. 0 erros.
- **Avatar:** criar, editar com todas as abas e modelos prontos, virar semideus, usar os 35 poderes.
- **Caverna:** entrar na Gruta Úmida com aliados, limpar o nível 1 (46 inimigos), abrir o baú, ver a caverna subir de nível, equipar os itens.
- **Controlar um NPC e voltar** ao próprio corpo.
- **Culto de domingo** com ritual e o cartão de pedido ao deus.
- **Cartões** da vila, da casa e da pessoa (com os botões de roupa) e o calendário.
- **Salvar e carregar:** o mundo salvo abre com tudo da v27.
- **O arquivo final** abre, cria um mundo e passa no teste completo, com 0 erros.

## Limitações

- **Sacrifício humano ficou de fora** de propósito. Os rituais usam oferendas, rezas e danças.
- **Escolta** (contratar guardas para acompanhar mercadores) ainda não foi feita.
- **A regra dos 70% da fortaleza** do documento das casas ainda não está aplicada.
- **A caverna é uma arena só**, e não vários salões ligados.
- **Expedições de NPCs são resolvidas por sorteio**, sem mostrar a luta.
- **A v27 é um pouco mais lenta** que a v26 (veja a tabela).
- **Casas grandes podem passar um pouco do terreno** delas no desenho, porque o sprite é maior que a área que ocupam no mapa.
- **Teste em navegador automático,** não num celular de verdade.

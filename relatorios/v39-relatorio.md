# Mundo Vivo v39: Querubim, trânsito e ruas

**Arquivo do jogo:** `mundo-vivo-v39.html` (também em `jogar/` e no projeto Android). A v38 continua como estava.
**APK:** o projeto Android já está na versão 39 (`versionCode 39`). O APK precisa ser montado com a sua chave (`./monta-apk.sh`), porque a chave não fica no repositório.

Tudo continua **100% sem internet**.

Os módulos de exemplo que chegaram usavam nomes que o jogo não tem do mesmo jeito (por exemplo `state.ents` com `sp:'cherub'` e `sp:'car'`, `state.nextId`, `D8B` para andar em 4 direções). Por isso a v39 foi escrita direto em cima do código real: o querubim e os veículos ficam fora da lista de seres, para não confundir a IA das pessoas, dos bichos e das guerras.

## 1. 👼 Querubim (substitui o anjo-emoji)

- O anjo agora é um **querubim em pixel art**: cabelo dourado, auréola, bochechas rosadas, asas que batem em dois quadros e um arco quando está em guarda. Tem sombra no chão e um brilho leve.
- Ele **voa atrás do semideus** o tempo todo (não só quando o painel está aberto). Chega rápido quando está longe e plana devagar quando está perto.
- O botão da barra virou **👼 querubim**. O painel ganhou a aba **👼 Querubim**, com ordens pessoais que **não gastam Fé**:

| Ordem | O que faz |
|---|---|
| 🕊️ Seguir | fica logo atrás de você |
| 🏹 Proteger | atira flechas de luz em lobos, ursos, leões, bandidos e em quem te atacou nos últimos segundos |
| 👁️ Vigiar aqui | fica parado no lugar, mostra o círculo de vigia, avisa quando aparece perigo e atira |
| 🪵 Buscar madeira | voa até a árvore mais perto, corta e traz 4 de madeira por viagem (3 viagens) |
| 🪨 Buscar pedra | o mesmo com a rocha mais perto |
| ↩️ Voltar | larga o que está fazendo e volta |
| 💤 Dispensar / 🔔 Chamar | sobe para as nuvens ou desce de novo |

- As ordens também funcionam escritas em **💬 Ordens**: “me segue”, “me protege”, “vigia aqui”, “busca madeira”, “busca pedra”, “volta”, “vai descansar”.
- Os 45 poderes da v38, o interpretador de ordens e o modo administrador continuam iguais.

## 2. 🚦 Trânsito nas cidades

- **Carroças** (e **carros**, quando a cidade entra na era industrial) andam pelas ruas de terra e de pedra da cidade, sempre pela mão direita.
- Andam de quadrado em quadrado nas 4 direções, preferem seguir reto e viram nos cruzamentos.
- Até 7 veículos por cidade (1 para cada 6 moradores) e 48 no mundo.
- De vez em quando **estacionam no quintal** de uma casa: chão livre colado na casa, ao lado da rua. Ficam ali um tempo e voltam para a rua.
- **Freiam** quando veem gente na frente e tocam o sino (🔔) ou a buzina (📯).
- **Atropelamento:** às vezes o motorista se distrai. Se bater, a chance de morte cresce com a velocidade (carro machuca mais que carroça). A pessoa é empurrada para fora da rua. Para não acabar com uma cidade, cada cidade tem **no máximo 1 motorista distraído por dia**.
- O semideus também pode ser atropelado, mas nunca morre disso.
- A ficha da cidade mostra quantos veículos estão nas ruas e quantos atropelamentos já houve.
- À noite os carros acendem os faróis.

## 3. 🛣️ Ruas e casas

- **Ruas sem saída:** uma vez por dia, cada cidade procura becos e abre uma ligação de até 7 quadrados por chão livre (nunca por cima de casa, água, mina, morro alto ou terra de outra cidade). No máximo 3 por dia.
- **Mais casas:** o teto padrão de gente por cidade passou de “Médias (120)” para “Grandes (180)” (quem já escolheu outro no ⚙️ continua com a escolha), e um sobrado fica pronto mais rápido (0,35 dia em vez de 0,5).
- **Vias seguindo os quadrados:** avenidas e trilhos não usam mais a curva suave. A linha passa pelo meio de cada quadrado, em retas de 45°, como na grade do mapa.

## 4. ⚙️ Painel de controle

Novos interruptores no grupo **Cidades**:

- 🚦 Trânsito nas cidades
- 💥 Atropelamentos (desligado, os veículos sempre freiam a tempo)
- 🛣️ Ligar ruas sem saída
- 📐 Vias seguindo os quadrados (desligado, volta a curva suave)

## 5. Testes feitos

- Mundo novo acelerado até ter 3 cidades com 15 ou mais moradores, várias vezes, sem erro no console.
- Veículos nascendo nas três cidades, carros só nas cidades industriais, estacionamento e atropelamentos registrados no histórico.
- Antes do limite diário, um teste mostrou atropelamentos demais numa cidade. Com o limite, ficou em cerca de 1 morte por atropelamento a cada 25 dias de jogo no mundo inteiro.
- Querubim: seguir, proteger (um lobo perdeu metade da vida em 10 segundos), buscar madeira (+8 madeira em 9 segundos), vigiar, ordens escritas, salvar e carregar.
- Ruas sem saída ligadas em duas das três cidades no primeiro teste.

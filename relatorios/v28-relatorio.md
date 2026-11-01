# Mundo Vivo v28: barra recolhível, ajustes, botões editáveis, duelo, altares, praças e circo

O jogo é o arquivo `mundo-vivo-v28.html`, um arquivo único que abre no navegador ou no Acode. Ele partiu da v27 e tudo o que existia continua lá. A v27 não foi alterada.

Esta versão traz os pedidos de tela para celular e os três últimos documentos: combate de espadas, altares e sacrifícios, e cidade com praças e circo.

## Tela do celular

### Barra de baixo recolhível
- No canto superior direito da barra de pincéis tem uma seta **▼**. Tocando nela, a barra abaixa e fica **uma fileira só na horizontal**, com as abas e os pincéis lado a lado. Se não couber tudo, é só arrastar a fileira para o lado.
- Com a barra baixa, a seta vira **▲**. Tocando de novo, a barra sobe normal.
- O jogo lembra se você deixou a barra baixa ou alta.

### Botão ⚙️ Ajustes (no alto da tela)
Dá para mudar tudo quando quiser, no meio do jogo:

| Ajuste | O que faz |
|---|---|
| Avisos | liga ou desliga os cartões de acontecimentos e os avisos rápidos |
| Tipos de aviso | escolhe quais aparecem: guerras, deuses, lazer, obras, vida (nascimentos e mortes) e outros |
| Pensamentos dos NPCs | mostra ou esconde os emojis e falas em cima das pessoas |
| Nomes das pessoas | mostra ou esconde |
| Nomes das vilas | mostra ou esconde |
| Nomes de guildas, postos e reinos | mostra ou esconde |
| Barra de vida | mostra ou esconde |
| Barra recolhida | mesma coisa que a seta ▼▲ |

### Editor dos botões de ação
Quando você controla um NPC ou o seu avatar, os botões de ação (atacar, defender, falar, pegar etc.) podem ser arrumados:
- Em **⚙️ Ajustes → ✋ Mover e mudar o tamanho**, a tela entra no modo de edição.
- **Arraste** um botão para mudar o lugar dele.
- Toque no botão e use **+** e **−** para aumentar ou diminuir.
- **↺ este** volta um botão ao original e **↺ todos** volta todos. **✅ Pronto** salva. No painel também tem **↺ Voltar ao padrão**.
- O jogo lembra o arranjo no aparelho.

## Combate de espadas (documento do combate)

| Coisa | v27 | v28 |
|---|---|---|
| Distância | os dois grudavam um no outro | ficam num **anel** na distância da espada, um de frente para o outro |
| 2 contra 1 | todos batiam ao mesmo tempo | um de cada lado, e **um ataca por vez**. O outro espera em guarda |
| Bloqueio de NPC | sorte | o NPC **lê o golpe**: guardas, guerreiros e cavaleiros bloqueiam mais, e melhora com o nível |
| Choque de espadas | não tinha | às vezes as lâminas se batem, saem faíscas ("clang!") e os dois são empurrados para trás |
| Postura | não tinha | barra amarela embaixo da vida. Cada bloqueio gasta postura. Se ela acaba, a **guarda quebra**: fica tonto 1 segundo e leva golpe mais forte |
| Pelas costas | igual | golpe pelas costas dá **25% a mais** e não dá para bloquear |
| Aparar (jogador) | não tinha | apertar defender bem na hora do golpe (até 0,15 s antes) **apara**: não toma dano e o inimigo fica tonto |

## Altares e sacrifícios (documento dos altares)

- A vila constrói um **altar de pedra** perto do lugar do culto, quando já fez alguns cultos e tem pedra. Depois de vários sacrifícios ele sobe para o nível 2.
- **À noite** (a partir das 21h) às vezes acontece um **ritual**: os devotos se juntam, o mais velho vira sacerdote, levam a oferenda (galinha, ovelha, gado, colheita e, raramente, uma pessoa) e acendem o fogo.
- A **Fé** que cada oferenda dá foi multiplicada por **10** (galinha 30, ovelha 60, gado 100, colheita 20, pessoa 250).
- No **culto de domingo** a Fé dos agradecimentos e oferendas ficou **3 vezes maior**.
- Sacrificar uma pessoa tem risco: a família pode querer **vingança** contra o sacerdote. Isso aparece no cartão da pessoa ("quer vingança contra ...").
- O pedido do ritual vira um cartão para você, como os pedidos de culto da v27.
- Uma vez por semana a crônica mostra um resumo dos rituais (quantos sacrifícios e quanta Fé).

## Cidade: postes, bairros, praças e circo (documento da cidade)

### Postes e bairro
- Os postes ficam **na beira da rua**, e não mais no meio dela.
- Quando a vila tem pelo menos 8 moradores, ela planeja **quarteirões retos**, com ruas em anéis, e as casinhas novas ocupam essas vagas. A roça não é plantada em cima da rua.

### Praças redondas
- Com moradores suficientes, a vila constrói uma **praça redonda do lado de fora do muro**, na saída de um portão. A avenida chega na praça e dá a volta nela.
- A obra tem etapas (marcar, chão, chafariz, bancos, árvores e enfeites). Os moradores trabalham nela, e quando ninguém está lá ela avança devagar sozinha.
- Na praça pronta tem **lazer**: piquenique na toalha xadrez, jogo de damas, banco para namorar, contação de histórias, gangorra, balanço, bola, pega-pega e fazer desejo no chafariz. As crianças brincam muito ali.
- Cada pessoa tem um valor de **😊 Lazer**. Ele aparece no cartão da pessoa, e o cartão da vila mostra a média.

### Circo itinerante
- De tempos em tempos um **circo chega** em carroças, arma a lona listrada fora da vila e fica uns dias.
- À tarde abrem as **lojas** (tiro ao alvo, vidente, doces e brinquedos). No primeiro dia tem **desfile**.
- À noite (19h30 às 22h30) tem **espetáculo**, com números de elementos: fogo, água, bolhas, balé e outros. Os moradores pagam ingresso, entram na lona e ganham lazer. Uma parte do dinheiro fica para a vila.
- Depois o circo desmonta e vai embora.

### Ver as animações
O cartão da vila tem botões **🎬 Ver a praça animada**, **🎬 Ver o ritual animado** e **🎪 Assistir ao espetáculo**. Eles abrem as cenas animadas dos documentos por cima do jogo, com o jogo pausado. Tocar na lona do circo ou no altar também abre a cena.

## Erros que corrigi no caminho
- O circo travava quando um morador ainda guardava o plano do dia anterior.
- A praça nunca começava porque esperava um muro externo que quase nenhuma vila tem. Agora ela usa os portões da cerca quando não há muro.
- A obra da praça ficava parada na primeira etapa. Agora ela avança.
- O circo não achava lugar para armar a lona em mapas apertados.
- O altar podia nascer dentro da praça.
- O espetáculo do circo ficava sem plateia porque os moradores iam dormir antes. Agora eles vão ao show.

## Testes feitos
- **Celular em pé (390 × 844)**: a barra recolhe e abre, o painel ⚙️ funciona, o editor moveu e aumentou um botão e o jogo lembrou depois. Nenhum erro.
- **Celular deitado (844 × 390)**: a barra recolhida vira uma fileira só e a seta funciona.
- **Praça, altar e circo no mesmo mundo**: a praça ficou pronta com piquenique, histórias, gangorra e bola. O ritual passou por todas as fases. O circo chegou, abriu e teve plateia no espetáculo.
- **Salvar e carregar no meio do ritual**: o ritual continuou do ponto onde estava e ninguém ficou preso.
- **20 dias seguidos de jogo** depois disso: nenhum erro no console.

## Observações
- Mapas pequenos ou vilas com pouca gente podem demorar a ter praça e circo, porque os dois pedem um número mínimo de moradores.
- As guerras entre guildas às vezes esvaziam vilas. Isso já acontecia na v27 e não foi mexido.
- Os arquivos-fonte desta versão estão na pasta `v28/`.

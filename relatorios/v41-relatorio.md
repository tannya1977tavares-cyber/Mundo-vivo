# Mundo Vivo v41 · Release das etnias (fases 0 a 10)

Base: a v40 (fases 0 a 10 já feitas), conferida de novo contra o plano da v41. Só foram aplicadas as diferenças.
Sem o visual Town Brush (fica para a v42). Detalhes de cada fase da v40: `relatorios/v40-relatorio.md`.

- Arquivo: `versoes/mundo-vivo-v41.html` (título "Mundo Vivo v41"), copiado em `jogar/index.html` e no projeto Android (`versionCode 41`).
- **Versão do save:** antes **v9** (v39) → depois **v10**. Campo novo `e40` no **fim** do save; `packCell` e a ordem dos campos não mudaram. Os dados novos da v41 (nômade, falida) ficam dentro de `w7.e40`, que já é salvo, então o save continua v10.
- Desempenho: 10x em mapa médio, velocidade real **10,01** (v39: 10,01). Nenhum erro no console.

## Tabela final

Números de linha = `versoes/mundo-vivo-v39.html`.

| Fase | Nomes conferidos (grep) | Diff | Aceite |
|---|---|---|---|
| 0 · Base visual | `drawHouse` (1580), `v27DrawHouse` (12460), `v27HouseSprite` (12447), `castleSprite` (7464), `v27Items` (13673), `setBuild` (1347). **Troca:** `drawHouse(a)` já existia → função nova `drawHouseArt`; marca da casa em `H.povo` (porque `H.cls` já existia) | `HOUSE_ART`, `PEOPLES`, `drawHouseArt`; embrulhos de `v27DrawHouse`, `v27Items`, `drawHouse`; castelo antigo não desenha se tem marca | **PASSOU**: as 72 combinações (6 povos × 4 níveis × 3 variantes) aparecem (`MV40.vitrine()`) |
| 1 · Etnias não aparecem | `spawn` (1806), `foundVillage` (2431), `pairUp` (4106), `setBuild` (1347), chaves de `PEOPLES` sem acento (`ingles`, `cigano`, `judeu`, `russo`, `brasileiro`, `americano`) | Causa: ninguém recebia povo na criação. Mundo novo dá povo por região; filho herda do pai ou da mãe; vila e casa recebem o povo. Log temporário só no script de teste (não ficou no jogo) | **PASSOU**: 4 cidades, cada uma com a arquitetura do seu povo |
| 2 · Migração de save | `save` (10530), `load` (10545), 8 embrulhos de save/load, `packCell` (10518) | `v:10`; `e40` no fim; `load` aceita até v10; save antigo → todos `ingles`, nível pelo dinheiro | **PASSOU**: save v9 da v39 carrega na v41 com as mesmas 4 vilas, 16 pessoas e 19 casas; salva como v10 e recarrega igual |
| 3 · Modelo de etnia | (nome novo) `ETNIAS` | `{id, nome, ativa, paleta, marca, roupas{base, nivel_pobre, nivel_medio, nivel_rico}, layout, ritual, diferencial, construcoes_proprias[]}`; slot 5 = russos `ativa:false` | **PASSOU**: com `ativa=true` (só dado), o mundo novo teve uma cidade russa |
| 4 · Níveis sociais | `classeDe` (11047), `H.cls` (já usado), `coins`, `coinsOf` (3387) | `NIVEIS` (9 faixas do plano → cabana/casa/casarão/castelo), `H.n40`, histerese 10%, venda de casa `E40.VENDA_CASA = 0,7` (ajustável) | **PASSOU**: 200 oscilações de ±8% em volta de cada limite: 0 trocas; sobe de 1 a 8 e desce |
| 5 · Regra do rei | `state.villages`, `v.king`, `rebuildGrid`/`memberMap` (1854) | tolerância é da **pessoa** (intolerante 20%, aceita 40%, neutro 40%, igual para todos os povos); `bairros40` | **PASSOU**: cidade intolerante com moradores de 3 povos ficou com 1 povo; ninguém é expulso |
| 6 · Andar pela rua | `stepCost` (2070), `findPath` (2081), `passable` (1826), `setTask` (2642), `updateWorld` (6903) | **Decisão do Bruno: ruas só dentro das cidades.** Dentro da cidade, o chão público que não é rua fica 20× mais caro; sem caminho pela rua, abre uma trilha que vira rua | **PASSOU com a decisão** (contador, 1000 passos, 25.632 amostras de pessoas dentro das cidades): **1** amostra de alguém andando fora da rua; outras 999 eram um guarda parado no posto do portão |
| 7 · Nômades e acampamentos | `humanThink` (4430), `leaveVillage` (5100), `HERMIT_AFTER` (4582), `chooseSite` (2389), `createPlot` (2452), `REINO32`/`m34Reinos` (20911) | **v41:** só grupos nômades (no mundo novo, um grupo de 4 pessoas de qualquer povo; filho de nômade sem cidade é nômade; quem entra numa cidade deixa de ser). **v41:** família sem casa **na cidade** fica lá como "falida". Pontos ponderados para viajar, acampar ou entrar na cidade; 6 adultos no acampamento → cidade | **PASSOU**: nas simulações aparecem as três escolhas no log (ex.: viajar 2, acampar 1, cidade 2). Acampamento com 5 adultos continua; com 6 vira cidade. Família que perdeu a casa: log "🏚️ … está falida … mas continua morando na cidade" e continua na cidade |
| 8 · Rituais como dados | `cal()` (12145, `wd` 0 = segunda), `CAL_MES`, `celebrate` (4135), `setTask` (2642) | tabela `FESTAS` (id, povo, data ou semanal, efeito) | **PASSOU**: as 7 festas disparam na data e aplicam o efeito; Shabat de sexta 18h a sábado 18h |
| 9 · Corridas | `BUILDS` (359), `BLD` (10516), `drawSmallBuild` (1501), `coinsOf` (3387) | tipo novo `hipodromo` no **fim** de `BUILDS`; corrida sábado 15h, 4 a 6 cavalos, fórmula do plano, aposta ≤ 20%, casa 10% | **PASSOU**: 1000 corridas, dinheiro total igual antes e depois (diferença 0) |
| 10 · Estradas | `hwEnds` (3425), `hwPath` (3431), `hwRoute` (3459), `D8B` (3424), `highwayTick` (3477), avenidas v36 `avFaixa36` (22192) | estradas novas: curva maior que 45° vira duas de 45°; caro andar colado ao lado de outra estrada | **PASSOU**: 0 passos fora da grade, 0 curvas maiores que 45°, 0 pista dupla na rede do jogo; as 10 estradas de um save da v39 ficaram iguais |

## NÃO VERIFICADO (e por quê)

1. **APK num celular de verdade:** não tenho celular aqui. Conferi o nome da tela no manifesto, a classe dentro do APK, a assinatura e que o HTML dentro do APK é a v41.
2. **Saves v2 a v8:** só testei save v9 (feito na v39).
3. **Nível 9 (castelo):** precisa de 15.000 de dinheiro (moedas × 10); ninguém chegou nos testes do jogo. A função foi testada sozinha.
4. **Fase 6, aceite literal "nenhum NPC fora de rua":** não vale no mapa todo (lenhador, mineiro e fazendeiro trabalham fora da rua). Ficou valendo só dentro das cidades, por decisão do Bruno, com a sobra descrita acima.
5. **Fase 7, acampamento virar cidade com 4 reinos no mapa:** o jogo limita a 4 reinos (v32). Nesse caso o acampamento espera vaga e avisa no log. No teste com 4 reinos, subi o limite para 5 só no teste.
6. **Fase 7, saves antigos:** não têm grupo nômade (o grupo nasce só em mundo novo).
7. **Fase 8:** datas que o plano não deu foram escolhidas por mim: torneio 23/abr, carnaval 15/fev, Páscoa judaica 15/abr. Russos (slot 5) ainda sem festa.
8. **Fase 9:** o dinheiro não infla, mas os 10% da casa passam devagar das pessoas para o tesouro da cidade.
9. **Fase 10, conflito:** as avenidas da v36 (era industrial) têm 2 faixas. São estradas existentes e foram preservadas; a pista única vale para as estradas novas. No teste pesado (30 estradas no mesmo mapa) sobrou 0 a 1 bloco de pista dupla, na saída de um portão usado por duas estradas.
10. **Prédios públicos novos** (templo, escola, feira, xerife): o plano lista como decisão, mas nenhuma fase pede. Só o hipódromo foi feito.
11. **Nomes dos bebês** continuam da lista antiga; só os primeiros moradores têm nome do seu povo.

## Extra: casas 2.5D (módulo CASA25 do Bruno)

- Código: `codigo/v41-casa25.js`. O módulo do Bruno entrou **sem mudanças**; em volta dele só tem a ligação com o jogo.
- Vale só para casas que têm marca de povo (`H.povo`) e nível (`H.n40`). O nível 1 a 9 vira o `tier` 0 a 8 do módulo; a variante é a mesma da v40 (`artVariant`). Casas antigas sem marca continuam com o desenho de antes.
- Cada desenho é feito uma vez e guardado (cache por nível, povo, variante e cor do reino). A cor do reino aparece como uma bandeirinha pequena.
- Para desligar e voltar ao desenho da v40: `MV41.casa25=false` (no console).
- Teste: 60 quadros por segundo com e sem o CASA25; 10x = 9,99; nenhum erro no console. Save não muda (continua v10).
- NÃO VERIFICADO: celular de verdade.

## v41.2 · Bairros com pátios internos (módulo BAIRROS do Bruno)

Código: `codigo/v41-bairros.js`. O módulo entrou **sem mudanças**; só a ligação com o jogo é nova. Nada disso vai no save (o save continua v10, `packCell` e a ordem dos campos não mudaram, a construção das casas não mudou).

### Nomes conferidos (grep, linhas da v41)

| O que o pedido chama de | Nome real no jogo |
|---|---|
| onde a cidade é desenhada | `renderWorld` (7518); o chão das vilas é `v28Ground` (14304), chamado antes das casas |
| loop de renderização | `render` (7798) → `renderWorld`; casas e pessoas vão na lista `items` ordenada por Y (`items.sort`, 7584) |
| calendário (mês/dia) | `cal()` (12146) devolve `{m, d, wd, h}`; `m` começa em 0, `d` em 1 |
| lista de rituais | `FESTAS` (24909): datas `{m, d}` e Shabat semanal (`semanalAgora40`, 24924) |
| campo de etnia das casas | `state.houses[a].povo` (chave do `PEOPLES`/`CASA25`: `ingles`, `cigano`, `judeu`…); povo da pessoa em `w7.e40.et` |
| bairros da cidade (fase 5) | `bairros40` (24664), em `v.e40.bairros` |
| desenho da casa | `artDraw` (24512) → `casa25Sprite` (25292) |
| criação / carregamento da cidade | `foundVillage` (2432), `load` (10546) |

### O que foi feito

- **Planejar (passo 3):** cada cidade chama `BAIRROS.planejar(cidade)` ao ser fundada, ao carregar o save e de novo quando a cidade cresce. Fica num `Map` na memória (`bairroPlanos41`). A vila não tem `semente`, então ela vem do id da vila.
- **Entrada do módulo:** `x, y` = centro da vila; `raio` = tamanho da vila arredondado para um número ímpar de blocos (assim a praça cai no meio); `etnias` = os bairros da fase 5, repetidos pelo tamanho de cada bairro (bairro maior = mais blocos).
- **Bloco ativo:** só aparece o bloco que tem casa da vila ou um pedaço da cidade (os outros ficam no mato, sem desenho).
- **Pátio livre:** o módulo põe o pátio no meio do bloco. Como as casas continuam onde o jogo constrói, se tiver casa ali o pátio vai para o lugar livre mais perto do meio (só muda `bloco.patio`, não o módulo).
- **Desenho (passo 4):** antes das casas: chão do bloco (com a cor do povo, bem clara), mureta baixa em volta, ruas de terra entre os blocos e depois `BAIRROS.desenharPatio(...)`. O chão é guardado numa imagem e só é refeito quando muda.
- **Casas (passo 5):** casa dentro de um bloco é desenhada no `CASA25.draw` com `people = bloco.people`. A ordem por Y continua a mesma.
- **Rituais (passo 6):** o jogo não usa `{mes, dia}`, então só a chamada foi adaptada: a tabela é montada a partir de `FESTAS` com `mes = m` e `dia = d` do calendário; o Shabat conta como "hoje" enquanto está acontecendo.
- **Ruas que os NPCs usam:** as ruas e pátios dos blocos contam como rua para a regra da fase 6. Assim os NPCs andam pelas ruas desenhadas, e não pela grama.
- Para desligar tudo: `MV41.BAIRRO41.LIGADO=false`.

### Testes

- **Cidade com 3 bairros de povos diferentes:** rei que aceita todos, moradores judeus, romani e brasileiros. Blocos ativos: 1 judeu, 2 romani, 1 brasileiro. As casas de cada bloco aparecem com o povo do bloco.
- **Pátio vazio fora da data:** em 20/jan, nenhum pátio romani ou brasileiro tinha festa. O pátio judeu tinha, porque era sábado antes das 18h (Shabat), o que está certo.
- **Pátio com festa na data:** em 24/mai (Santa Sara Kali), os 2 pátios romani mostram palco, bandeirola e fogueira. Em 24/jun (festa junina), os 3 pátios brasileiros mostram a festa.
- **10x:** 60 quadros por segundo com e sem as casas 2.5D. Velocidade real em 10x: 10,01. Nenhum erro no console.
- **Save:** o save da v39 carrega na v41 com as mesmas 4 vilas, 17 pessoas e 6 casas.

### Varredura de bugs e comportamento dos NPCs

Foram 3 mundos novos (2 grandes e 1 médio), cada um rodando a 100x por 4 a 5 minutos. Uma foto do estado era tirada a cada 10 segundos.

- **Erros no console:** 0.
- **Problemas de posição:** nenhuma pessoa com posição inválida, fora do mapa ou dentro da água funda sem barco.
- **Fome:** ninguém ficou parado com fome. No máximo 3 pessoas com fome baixa ao mesmo tempo, e elas iam comer.
- **NPC preso:** ninguém ficou parado com caminho por mais de 30 segundos, a não ser os guardas no posto. Eles ficam parados de propósito, vigiando o portão ou a praça.
- **Bug corrigido:** na primeira versão da ligação, todos os blocos saíam do mesmo povo, porque os bairros da fase 5 não guardam peso. Agora o peso é o tamanho do bairro.
- **Comportamento observado (não são bugs):**
  - De dia, 40 a 60% dos adultos ficam "passeando" (idle com rótulo); os outros fazem colheita, lenha, mina, obra e entregas. À noite, quase todos ficam sem tarefa, dormindo em casa (toque de recolher).
  - Os adultos sem cidade são quase todos mercenários de guilda (20 de 29 no teste médio), alguns eremitas e trabalhadores livres. Isso já é do jogo.
  - O grupo de 4 nômades do começo entra numa cidade logo no início: nos 2 mundos em que medi, já não havia nômade sem cidade depois de cerca de 1 minuto e meio a 100x (um deles chegou a montar acampamento antes).
  - Famílias falidas: de 0 a 10 ao mesmo tempo, numa população de até 180 pessoas.

### NÃO VERIFICADO

1. Celular de verdade (o APK de teste foi refeito e conferido, mas não foi instalado).
2. A imagem do Bruno mostra várias casas em volta de um pátio dentro de cada bloco. Isso exigiria mudar onde o jogo constrói as casas, o que o pedido proíbe (passo 7). Hoje as casas continuam nos lotes de sempre, e o bloco se ajusta em volta delas. Por isso, em cidade pequena, pode ter bloco com uma casa só.
3. Os NPCs ainda não vão para o pátio na festa: o pátio só muda o desenho. Os efeitos da festa continuam os da fase 8.
4. A praça redonda da v28 pode ficar por cima de um bloco quando a cidade é grande.
5. Os blocos são sorteados de novo quando os bairros da fase 5 mudam (por exemplo, quando muda o rei). O desenho pode mudar de povo nesse momento.

## Checklist manual (para testar no celular ou no navegador)

1. **Mundo novo:** criar um mundo "Grande". Ver cidades com casas de povos diferentes (bandeirolas Romani, mezuzá judaica, azulejo brasileiro, viga em X inglesa).
2. **Save antigo:** abrir um save feito na v39 ou v40. Conferir que as cidades, as pessoas e as casas continuam lá.
3. **10x sem travar:** pôr a velocidade em 10x por 1 minuto num mapa médio e ver se o quadro continua liso.
4. **Uma cidade de cada etnia:** tocar em cada cidade e ver a linha "🏘️ Povo" no painel.
5. **Família que cai de nível:** tocar numa pessoa e ver "Família: …" no painel. Depois de gastar ou perder dinheiro, a casa desce de tipo (e devolve 70%), sem ficar trocando toda hora.
6. Extra: no log, procurar 🧭 (decisão de nômade), 🎉/🌹/🕯️ (festas), 🏇 (corrida no sábado à tarde) e 🏚️ (família falida).

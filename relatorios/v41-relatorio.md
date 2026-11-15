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

## Checklist manual (para testar no celular ou no navegador)

1. **Mundo novo:** criar um mundo "Grande". Ver cidades com casas de povos diferentes (bandeirolas Romani, mezuzá judaica, azulejo brasileiro, viga em X inglesa).
2. **Save antigo:** abrir um save feito na v39 ou v40. Conferir que as cidades, as pessoas e as casas continuam lá.
3. **10x sem travar:** pôr a velocidade em 10x por 1 minuto num mapa médio e ver se o quadro continua liso.
4. **Uma cidade de cada etnia:** tocar em cada cidade e ver a linha "🏘️ Povo" no painel.
5. **Família que cai de nível:** tocar numa pessoa e ver "Família: …" no painel. Depois de gastar ou perder dinheiro, a casa desce de tipo (e devolve 70%), sem ficar trocando toda hora.
6. Extra: no log, procurar 🧭 (decisão de nômade), 🎉/🌹/🕯️ (festas), 🏇 (corrida no sábado à tarde) e 🏚️ (família falida).

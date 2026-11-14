# Mundo Vivo v40 · Fase 40.1 — Base visual das casas por povo

Só desenho. Não muda `packCell`, o save, a versão do save (continua `v:9`) nem a lógica de construção.

## Nomes conferidos com grep (v39)

| Nome | Achado | Linha na v39 |
|---|---|---|
| `drawHouse(a)` | ✅ desenho da casa **no chão** (mapa de terreno) | 1580, com embrulhos em 13489 e 21311 |
| desenho **em pé** das casas | ✅ `v27DrawHouse(a,H)` + `v27HouseSprite(H,col)` (cabana, casa, casarão) | 12460 / 12447 |
| desenho do castelo | ✅ `castleSprite(col)`, item `k:6` da lista de profundidade | 7464 / 7571 |
| lista de profundidade | ✅ `v27Items(...)` | 13673 |
| `setBuild(x,y,type,owner)` | ✅ cria `state.houses[a]={type,items:[]}` | 1347 |
| `BHP` | ✅ só cercas/muros/portões/torre; casas não usam | 1795 |
| níveis de casa | ✅ `hut`/`house`/`manor`/`castle` (`LEVEL_NAME=['','Cabana','Casa','Casarão','Castelo']`) | 371–375, 404 |
| `mk`, `hqUp`, `hi4`, `shade`, `R` | ✅ ferramentas de sprite usadas | 519, 559, 601, 504, 701 |

Atenção para as próximas fases: as casas **já têm** um campo `H.cls` (classe da casa da v27, 0 a 6). Por isso a marca de povo usa o nome `H.povo`, e o nível social da v40 vai precisar de outro nome.

## O que mudou

1. **Constantes `HOUSE_ART` e `PEOPLES`**, exatamente como você mandou.
2. **`drawHouseArt(g, level, variant, people, sx, sy, k)`**. Usei esse nome porque `drawHouse` já existe no jogo com outro formato (`drawHouse(a)`). Ela pinta cada letra da grade como um quadrado `k×k` com a paleta do povo, põe um sombreado leve e depois a marca do povo:
   - Inglês: viga em X dourada no meio da fachada.
   - Cigano: bandeirolas triangulares na cumeeira e franja na porta.
   - Judeu: mezuzá ao lado da porta e janelas em arco.
   - Russo: cúpula bulbosa vermelha sobre a cumeeira e platibanda entalhada.
   - Brasileiro: barra de azulejo na base e varanda de madeira.
   - Americano: alpendre branco na frente e chaminé de tijolo.
3. **Variante** = `((x*31 + y*17) % 3)`, da célula âncora da casa (`artVariant(a)`).
4. **Só casas com marca** (`state.houses[a].povo = 'russo'` etc.) usam o desenho novo. Casas sem marca continuam iguais. Hoje nenhuma casa recebe marca sozinha; isso vem nas próximas fases.
5. Uma única troca no código antigo: o castelo antigo (item `k:6`) não é desenhado quando o castelo tem marca de povo.

### Onde entrou
- Bloco novo `v40 · 40.1` logo antes de `selectTool('terrain');` no fim do arquivo (`versoes/mundo-vivo-v40.html`).
- Embrulhos: `v27DrawHouse` (cabana/casa/casarão com marca), `v27Items` (castelo com marca), `drawHouse` (só o piso no chão, para a fachada velha não aparecer por baixo).
- Título da página: `Mundo Vivo v40`.
- Projeto Android: `index.html` = v40, `versionCode 40`.

## Como testar no navegador

1. Abra `versoes/mundo-vivo-v40.html` e toque em **Continuar** (ou crie um mundo).
2. Abra o console (F12) e rode `MV40.vitrine()`. Ele põe as **72 combinações** (6 povos × 4 níveis × 3 variantes) a partir do canto de cima à esquerda. **Só para teste**: apaga o que estiver nessa área.
3. Para marcar uma casa que já existe: `MV40.marcar(indiceDaCasa, 'russo')` (e `MV40.marcar(indice)` tira a marca).

## Testes feitos

- Folha com os 72 desenhos gerada com a própria função do jogo: todos aparecem.
- No jogo: `MV40.vitrine()` colocou as 72 casas; nenhum erro no console.
- Rodando a 10x por 20 s com as 72 casas: velocidade real 10,0.

## Riscos conhecidos

- Casas de guilda e de posto avançado não usam o desenho da v27, então a marca de povo não vale para elas (ficam como antes).
- No castelo com marca, aparece o pátio de pedra antigo no chão em volta do desenho novo.
- A marca `H.povo` vai no objeto da casa, que já é salvo; então ela é guardada no save sem mudar a versão. Saves antigos não têm marca e ficam como antes.
- Na sua tabela `PEOPLES` o nome é "Cigano". A especificação original pedia "Ciganos (Romani)" na tela; mantive o seu texto, e dá para trocar só o `name`.

---

# Prompt-mestre v40 · Fases 0 a 10 (execução em sequência)

Alvo: o jogo Mundo Vivo v40 (`versoes/mundo-vivo-v40.html`). O prompt fala em "atelie-civilizacoes.html", mas o histórico mostra que o alvo é o jogo.
Código novo: bloco `v40 · FASES 1 a 5` antes de `selectTool('terrain');` (cópia em `codigo/v40-fases.js`).

## Resumo do status

| Fase | Status |
|---|---|
| 0 · Base visual (40.1) | ⏭️ já aplicada (pulada) |
| 1 · Etnias aparecendo | ✅ passou |
| 2 · Migração de save | ✅ passou |
| 3 · Modelo de dados | ✅ passou |
| 4 · 9 níveis sociais | ✅ passou |
| 5 · Rei e bairros | ✅ passou |
| 6 · Andar só pelas ruas | ❌ falhou → parei aqui |
| 7 a 10 | ⏸️ não feitas (regra: não avançar com falha) |

Desempenho: 10x em mapa médio, velocidade real 9,97 (igual à v39: 9,97). Nenhum erro no console em todos os testes.

## Fase 0
Já aplicada (HOUSE_ART, PEOPLES, `drawHouseArt`). Pulada.

## Fase 1 · Etnias não aparecem
**Grep:** `spawn` (1806), `foundVillage` (2431), `pairUp` (4106), `setBuild` (1347), `v27DrawHouse`/`artDraw`, `PEOPLES` (chaves sem acento: `ingles`, `cigano`, `judeu`, `russo`, `brasileiro`, `americano`).
**Causa confirmada:** atribuição na criação. Nenhuma linha dava povo a rei, família, vila ou casa; só o teste `MV40.vitrine()` marcava casas. O log temporário (no script de teste, não no jogo) mostrou o rei e a família sem povo. Não havia problema de chave, gerador ou desenho.
**Correção:** mundo novo distribui os povos ativos por região (quem está junto fica do mesmo povo); filho herda o povo do pai ou da mãe (50/50); vila nova recebe o povo do rei; casa nova recebe o povo do bairro onde fica (`H.et` e `H.povo`). Pessoas do mundo inicial recebem nomes do seu povo.
**Aceite:** ✅ mapa grande, 4 cidades: Pedra Branca brasileira, Vale Verde romani, Boa Vista judia, Três Rios inglesa, cada uma com a sua arquitetura (imagem `cidades-4povos.png`).
**NÃO VERIFICADO:** nomes dos bebês continuam da lista antiga (só os primeiros moradores ganham nome do povo).

## Fase 2 · Migração de save
**Diff:** `const data={v:10,...` · campo novo `e40` no **fim** do objeto salvo · `load` aceita `data.v>=2&&data.v<=10` · embrulho de `load` para migrar.
**Migração:** save antigo → toda vila e pessoa `ingles`, tolerância `neutro`, nível da casa calculado pelo dinheiro da família. Casas antigas ficam sem marca (desenho antigo); só casas novas recebem a marca.
**Aceite:** ✅ save v9 feito na v39 (3 vilas, 20 pessoas, 10 casas) carregou na v40 com 3 vilas, 20 pessoas e 10 casas; salvou como v10 (último campo `e40`) e recarregou igual.
**NÃO VERIFICADO:** saves v2 a v8 (só testei v9).

## Fase 3 · Modelo de dados
**Diff:** tabela `ETNIAS` com `{id, nome, ativa, povo, paleta, marca, roupas{base, nivel_pobre, nivel_medio, nivel_rico}, layout, ritual, diferencial, construcoes_proprias[], nomes}`. Ativos: ingleses, Ciganos (Romani), judeus, brasileiros. Slot 5 = russos com `ativa:false` (trocar `povo` para `'americano'` vira americanos).
**Aceite:** ✅ só com `MV40.ETNIAS[4].ativa=true` (sem código novo), o mundo novo teve uma cidade russa (Vale Verde, 4 casas russas).
**NÃO VERIFICADO:** `roupas` e `layout` são dados guardados, mas ainda não mudam a roupa das pessoas nem o traçado das ruas.

## Fase 4 · Níveis sociais
**Diff:** `NIVEIS` (9 níveis, faixas do prompt), `nivelTick`, `PRECO_TIPO`, `E40 = {MOEDA_VALOR:10, VENDA_CASA:.7, HISTERESE:.1}`. Nível guardado na casa (`H.n40`); o desenho da casa marcada segue o tipo visual do nível.
**Troca declarada:** as moedas do jogo são pequenas (a família mais rica tinha ~460 moedas depois de 12 dias), então o "dinheiro" da tabela = moedas da família × `MOEDA_VALOR` (10). Ajustável.
**Venda:** subir para um tipo visual maior custa `PRECO_TIPO`; descer devolve 70% (`VENDA_CASA`). Para não pagar duas vezes, a melhoria de casa da v27 não cobra nas casas marcadas.
**Aceite:** ✅ teste da função: sobe de 1 a 8 com o dinheiro e desce até 1; dinheiro oscilando ±8% em volta de cada limite, 200 vezes: **0 trocas**. No jogo (12 dias a 100x): 0 idas-e-voltas em menos de 1 dia.
**NÃO VERIFICADO:** nível 9 (precisa de 23.000 de dinheiro; ninguém chegou no teste do jogo).

## Fase 5 · Rei e bairros
**Diff:** tolerância é traço da **pessoa** (`intolerante` 20%, `aceita` 40%, `neutro` 40%, igual para todos os povos). `bairros40(v)` divide a cidade em fatias em volta do centro: intolerante → 1 povo (o do rei, mesmo com histórico misto, e as casas passam a ter a cara do povo do rei); aceita → um bairro por povo; neutro → povo principal + bairro menor da maior minoria. Rei intolerante não aceita casal de fora de outro povo; **ninguém é expulso**.
**Aceite:** ✅ cidade intolerante com moradores de 3 povos: 1 bairro, 5 casas do mesmo povo. Cidade aceitante: 3 bairros, casas de 3 povos. Casal de outro povo tentando entrar na cidade intolerante: recusado.
**NÃO VERIFICADO:** o mesmo teste com casal do mesmo povo (não havia solteiro disponível). O `layout` do bairro não muda onde as casas são construídas.

## Fase 6 · Andar só pelas ruas ❌
**Medição (1000 quadros, mapa médio, sem mudar nada):** 61% das amostras de pessoas fora de célula de rua. Motivo principal: trabalho que fica fora da rua (colher, minerar, cortar árvore, lutar, fugir, passear). Dentro das cidades: 5,6%.
**Por que parei:** com custo infinito fora da rua, lenhadores, mineiros, fazendeiros, caçadores e soldados não conseguem chegar ao trabalho. O aceite "nenhum NPC fora da rua" não tem como passar sem quebrar o jogo. Pela regra do prompt, parei na fase 6 e não fiz as fases 7 a 10.

## Testes do APK de teste
O app de teste tem o nome completo da tela (`com.bruno.mundovivo.MainActivity`) no manifesto, a classe existe dentro do APK e a assinatura confere. **NÃO VERIFICADO:** abrir num celular de verdade (não tenho um celular aqui).

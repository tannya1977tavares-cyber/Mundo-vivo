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

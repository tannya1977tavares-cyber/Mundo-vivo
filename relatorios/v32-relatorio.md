# Mundo Vivo v32: o que mudou

**Arquivo do jogo:** `mundo-vivo-v32.html`. A v31 ficou intacta, do mesmo jeito que estava.

**Compatível com jogos salvos:** testei abrindo na v32 um mundo salvo na v31. Ele carregou e rodou 4 dias sem nenhum erro. Na hora de abrir, o mundo antigo já ganhou os biomas brasileiros e a economia nova.

**Teste completo:** 25 dias de jogo, várias vezes, em mundos diferentes. Nenhum erro.

---

## 1. Economia: livre mercado (mecanismos 9, 18, 19 e 20)

- **Quem produz é quem vende.** O armazém do rei não compra mais nada.
  - Cada produtor deixa a mercadoria na banca da praça, em consignação, e recebe quando alguém compra.
  - Entre dois vendedores, ganha quem tem preço melhor e qualidade melhor.
- **Nível do ofício aumenta o preço.** Quem tem ofício mais alto cobra mais caro, e mesmo assim é o mais procurado.
- **O rei só cobra imposto.** São 3 impostos:
  - sobre a venda
  - sobre cada casa
  - sobre a terra das fazendas
  - O imposto sobre a poupança acabou.
- **O rei gasta.** O rei e a família real compram luxo todo dia: comida, lã, ouro, peles e escamas.
  - A coroa cunha moeda da mina, com um limite por dia, para pagar salários e compras.
- **Salário só para empregado:** guarda, soldado, peão, operário, marujo e aprendiz.
  - Quem trabalha por conta própria vive do que vende.
- **Os pais pagam a comida dos filhos.**
- **Você também compra e vende:**
  - Perto do centro de uma vila aparece o botão **🛒 Mercado**.
  - Nele você compra o que quiser e **anuncia** o que tem para vender.
  - O dinheiro entra quando alguém compra.
- No cartão da vila aparecem a linha **🛒 Praça**, com o movimento de ontem, e a linha **👑 Coroa**.

**Medido no teste:**
- Cada vila vende de 50 a 280 moedas por dia.
- Salários de 9 a 48 por dia.
- Luxo de 5 a 18 por dia.
- A dívida da coroa com os vendedores ficou pequena (de 0 a 150), e a coroa paga depois.

## 2. Gente (mecanismos 7, 8, 10, 11 e 12)

- **Barra de nível do ofício** no cartão de cada pessoa. Sobe trabalhando.
  - O nível normal agora também dá menos cansaço.
- **XP justo:** um dia de trabalho rende mais ou menos o mesmo XP em qualquer ofício.
  - Matar continua dando muito (100), mas é raro.
  - No teste, quem vive mais chegou ao nível 10.
- **Jeito de cada pessoa:** ganancioso ou manso, mais um destes traços:
  - corajoso
  - preguiçoso
  - honesto (nunca vira ladrão ou salteador)
  - trabalhador (trabalha mais e aprende mais rápido)
  - O ganancioso larga tudo pelo sonho mais cedo. O manso espera mais.
- **10 sonhos novos:** reino, capitão de navio, loja, fábrica, eleito, guilda, caverna, sacerdote, caçador lendário e família grande.
  - Os 6 sonhos antigos continuam.
- **Todo mundo procura par**, inclusive mercenário, gente de guilda e salteador.
  - Depois de casar, sorteiam a vida: mudar para a vila, abrir uma fazendinha ou largar a estrada.
- **Casal novo ganha casa própria** quase sempre (o limite de lotes subiu de 14 para 40).
  - Quem sonha com família grande quer mais filhos.

## 3. Reinos (mecanismos 1 e 17)

- **No máximo 4 reinos no mapa.** Quando um cai, abre a vaga.
- **Qualquer um pode fundar um reino:**
  - O NPC que sonha com reino e chega ao nível 4 com 60 moedas sai com o par e funda o dele.
  - Você também pode: aparece o botão **🏰 Fundar reino (n/4)**. Precisa de 80 moedas e do seu par por perto.
- **Na guerra o povo não morre.** Morrem só guardas, soldados e o rei.
- **Até 3 reis caem.** No 3º, quem conquistou põe um **capitão** para governar.
  - O capitão cobra os impostos e manda tributo para o conquistador.
  - **Testei forçando uma guerra:** caíram 3 reis seguidos, o capitão assumiu e a vila passou a pagar tributo.

## 4. Natureza (mecanismos 2, 3, 4, 5 e 6)

- **4 biomas brasileiros novos**, somados aos 8 antigos. Cada um tem árvore, chão e bichos próprios.

  | Bioma | Árvore | Herbívoro | Espalha semente | Predador |
  |---|---|---|---|---|
  | Mata Atlântica | ipê (rosa ou amarelo) | paca | tucano | jaguatirica |
  | Caatinga | árvore seca | preá | asa-branca | carcará |
  | Cerrado | pequizeiro | veado-campeiro | lobo-guará | onça-parda |
  | Pantanal | carandá | capivara | arara-azul | onça-pintada |

  - Os biomas aparecem sozinhos no mapa, longe das vilas, e também no pincel de natureza do modo deus.
- **Árvore cortada não volta mais.** Árvore nova só nasce:
  - onde o bicho que espalha semente passa
  - onde o lenhador replanta (ele replanta 3 de cada 4 que corta)
  - No teste nunca faltou madeira.
- **A caça vende:**
  - peles: jaguatirica, lobo-guará, onça-parda e onça-pintada
  - couro: veado e capivara
  - penas: tucano, asa-branca, carcará e arara
  - **Quanto mais raro o bicho, mais caro o produto.** Isso aparece no cartão da vila.
  - O caçador vai atrás do bicho que vale mais.
- **Extinção acontece.**
  - Quando uma espécie some, ela não volta sozinha (só pelo modo deus).
  - Sem quem espalha semente, a mata para de crescer. Sem predador, o herbívoro se espalha.
  - Quando sobra pouco de uma presa, fica difícil achá-la, e o predador caça outra coisa.
  - No teste, algumas espécies sumiram e outras se firmaram.
- **Chuva:** as gotas caem do céu e só molham a terra (deixam o capim verde e ajudam a plantação). Não abrem buraco nem fazem lago.
  - As opções de água rasa, média e funda continuam do jeito que eram.
- **Botão 🌕 Lua cheia** no modo deus (na aba da chuva). Algumas pessoas viram lobisomem naquela noite.
- **Culto toda noite**, a qualquer hora, no lugar do culto longe da vila. O culto de domingo continua igual.
- **Dragão selvagem tem toca:** numa caverna perto ou numa clareira que ele mesmo queima.
  - Sai para comer e volta à noite.
  - Quem mata o dragão ganha **escamas** e **ovos de dragão**, que são caros e podem ser vendidos.

## 5. Cidade (mecanismos 14 e 16)

- **As vagas seguem o mercado.** Quando um produto está caro, mais gente vai trabalhar nele. Não existe mais teto fixo de vagas.
- **Descobri por que você nunca via casa reformada.** A reforma já existia, mas ninguém tinha dinheiro: a mediana era umas 10 moedas, e a reforma mais barata custa 23.
  - Com a economia nova, 9 de 16 casas foram reformadas no teste.

---

## O que ficou para a v33

Fiz primeiro o que mexe na vida do mundo inteiro. Estes pontos ainda não estão no jogo:

1. **Quarteirões com quintal**: cerca dividida entre vizinhos, portão para a rua e plantação dentro do quarteirão (mecanismo 13). Isso muda o jeito de montar a cidade e precisa de cuidado para não quebrar as vilas que já existem.
2. **Costureiro e lojas de roupa por classe** (mecanismo 14).
3. **Passeios novos**: acampar, viajar para outra cidade e passeio de barco (mecanismo 15).
4. **Oficina no quintal** para quem está sem emprego (mecanismo 16). Hoje a pessoa vai para o ofício que está pagando melhor.
5. **Dragão: chocar o ovo, caverna maior, dragão como chefão da caverna, guildas caçando o dragão e expedições do rei** (mecanismo 5). Hoje o ovo pode ser vendido, mas ainda não dá para chocar.
6. **Artesão fazendo itens especiais para guardas e guildas** (mecanismo 9).
7. **Rodadas de teste em que o NPC de maior sucesso vira o modelo** (plano de testes).

## Para quem for mexer no código

Arquivos em `jogo/v32/`:
- `build32.py` lê a v31.
- `ancoras.py` aplica os ajustes pontuais.
- Os módulos são `m32-economia`, `m33-gente`, `m34-reinos`, `m35-natureza`, `m36-cidade` e `m39-ligacoes`.
- Todos os números de equilíbrio ficam no começo de cada módulo: `M32`, `REINO32`, `BIOMA35` e `SP35`.

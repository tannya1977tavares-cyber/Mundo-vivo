# Mundo Vivo v21: mudanças sobre a v20

Arquivo: `mundo-vivo-v21.html` (arquivo único; abre no navegador ou no Acode).

## O que mudou

| Pedido | Como ficou |
|---|---|
| Poções mais baratas | Cerca de 30% mais baratas. Vida custa 35🪙 (era 50), Cansaço 28🪙 (era 40) e Fome 28🪙 (era 40). Os preços ficam no objeto `POT`. |
| Dinheiro para o chefe | Tudo o que se paga na loja vai para o chefe da guilda dona da loja. Sem chefe vivo, vai para o caixa da guilda. Os membros com dinheiro também compram poções na loja da própria guilda, e esse dinheiro também vai para o chefe. |
| Roubo ao matar | Quando uma pessoa mata outra, o assassino leva tudo da vítima: moedas, mochila, a carga que ela levava, as poções e a arma/armadura (fica com a melhor). Vale entre NPCs, quando você mata alguém e quando alguém mata você. Morte por velhice, fome ou afogamento não conta como roubo. |
| Vender na fortaleza | Dentro de uma fortaleza (o centro murado de uma vila), qualquer pessoa vende pelo preço atual do mercado daquela vila. O preço é o mesmo do armazém, que sobe e desce com a oferta. Quem paga é o tesouro da vila: se faltar dinheiro, vende só o que der. Uma vila em guerra com você não compra. Os NPCs vendem sozinhos o que têm na mochila quando passam pela fortaleza. |
| Inventário por NPC | Isso já existia, e agora ficou completo. Cada pessoa tem a própria mochila, e o que você pega controlando alguém fica com ele. Ao trocar de pessoa, você passa a usar a mochila da nova. O que o NPC carregava antes também entra na mochila dele quando você o controla. |
| Botão de poções | O botão 🧪 fica nos botões de combate e abre um menu com Vida, Cansaço e Fome (com as quantidades) e um atalho para a loja. A tecla H continua bebendo a poção de vida. |

Para vender: dentro da fortaleza aparece o botão "🏯 Vender itens", que abre a mochila na parte "Vender". Lá dá para vender item por item ou "Vender tudo".

## Testado

Os testes rodaram num navegador automático, com celular em pé (390×844) e deitado (844×390).

- **Preços e chefe:** a loja cobrou 35 e 28. O chefe recebeu 63🪙 (35+28) e a mensagem "O dinheiro foi para Clara, chefe da guilda" apareceu.
- **Inventário por NPC:** controlei A, peguei 7 madeiras, troquei para B (a mochila era a de B) e voltei para A, que ainda tinha as 7 madeiras.
- **Roubo:**
  - NPC matando NPC: o assassino ganhou 50🪙, 5 madeiras, 3 pedras, 1 poção e a arma/armadura. A vítima ficou com 0.
  - Você matando um NPC com um corte de verdade: você ganhou 33🪙 e todos os itens dele.
  - Um NPC matando você: ele levou 77🪙, o diamante e o resto.
- **Venda:**
  - Dentro da fortaleza, "Vender tudo" pagou exatamente o que o tesouro perdeu (96🪙).
  - Com o tesouro vazio aparece "sem moedas", e fora da fortaleza nada é vendido.
  - Um NPC vendeu sozinho a madeira e o ouro que tinha.
- **Botão de poções:** o menu abre, a poção de vida bebida pelo menu curou e o menu fecha ao tocar fora.
- **Mundo rodando sozinho:** mapa médio por 70 dias sem nenhum erro. Houve 75 roubos entre NPCs, 159🪙 de vendas de NPCs em fortalezas e 350🪙 de poções pagos aos chefes.
- **Testes da v20:** rodaram de novo e passaram (24 habilidades, defesa, toque, salvar/carregar). Salvar e carregar mantém a mochila roubada dos NPCs.

## Limitações

- **NPCs não viajam até a fortaleza só para vender.** Eles vendem quando já estão lá.
- **O teste de toque foi simulado,** não feito num celular físico.

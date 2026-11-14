# Mundo Vivo v38: o Anjo 😇

**Arquivo do jogo:** `mundo-vivo-v38.html` (também em `jogar/` e no projeto Android). A v37 continua como estava.
**APK:** o projeto Android já está na versão 38 (`versionCode 38`). O APK precisa ser montado com a sua chave (`./monta-apk.sh`), porque a chave não fica no repositório. Assim ele instala por cima da v37 sem perder os mundos salvos.

Tudo funciona **100% sem internet**. O anjo lê as ordens dentro do próprio jogo.

## 1. Como chamar o anjo

- Crie e controle o seu personagem e **revele-se ✨ (modo semideus)**.
- Aparece o botão **😇 anjo** na barra de baixo. Toque nele e o anjo, **Serafim**, desce voando ao seu lado.
- Na primeira vez, um aviso na tela mostra onde fica o botão.
- O painel tem quatro abas: **✨ Poderes**, **💬 Ordens**, **🔑 Admin** e **❓ Ajuda**.
- Cada poder gasta **Fé 🙏**, a mesma do semideus. Os poderes de visão são grátis. Depois de usar um poder, ele recarrega por 15 segundos.

## 2. ✨ Poderes (o menu)

Toque num poder: aparece o que ele faz, quanto custa e as listas para escolher o alvo (cidade, pessoa ou lugar). Depois é só tocar em **✅ Mandar o anjo fazer**.

| Grupo | Poderes |
|---|---|
| 🗺️ Terra e clima | Chuva, Seca, Dilúvio, Terremoto, Erguer montanha, Abrir lago, Floresta, Virar deserto, Terra fértil, Eclipse |
| 🏗️ Construção e riqueza | Muralha (pronta na hora), Celeiro cheio, Tesouro, Reforma divina, Colheita farta, Fundar cidade |
| 👑 Reis e política | Coroar, Derrubar o rei, Sussurro da ganância, Sussurro da paz, Festa no reino, Recrutar exército |
| ⚔️ Guerra e alianças | Declarar guerra, Aliança, Romper aliança, Paz, Mandar a tropa voltar, Abençoar o exército, Tornar vassala |
| 🔥 Ira divina | Raio, Queimar pessoa, Maldição do lobo, Praga de ratos, Peste, Chuva de fogo, Incendiar cidade, Destruir cidade |
| 💛 Bênçãos e povo | Aurora sagrada, Chuva da fartura, Curar pessoa, Pregação (o povo vira seu fiel), Curar o semideus |
| 👁️ Visão (grátis) | Relatório do mundo, Espiar cidade, Mostrar no mapa |

- A lista de pessoas mostra primeiro os **reis e rainhas** de todas as cidades e depois quem está **perto de você**.
- O lugar pode ser **na sua frente** ou **no meio de uma cidade** (um lago no meio da cidade afunda o que estiver lá).
- Alguns poderes reaproveitam os poderes que o semideus já tinha (chuva, raio, meteoros...), com as mesmas regras de Fé e fiéis.
- Se a cidade não tem soldados para a guerra, o anjo arma alguns moradores antes de marchar.

## 3. 💬 Ordens (o chat)

Escreva do seu jeito, em português. O anjo transforma a frase nos mesmos poderes do menu.

Exemplos:

- “faz chover em Vale Verde”
- “Boa Vista declara guerra a Três Rios”
- “aliança entre Vale Verde e Boa Vista”
- “o rei do norte trai o aliado e depois queima a cidade do sul”
- “recruta um exército em Pedra Branca e depois ataca Vale Verde”
- “derruba o rei de Boa Vista”, “raio no rei de Três Rios”
- “floresta aqui”, “relatório do mundo”, “espia Santa Luz”

O que ele entende:

- **Nomes** de cidades e de pessoas.
- **Jeitos de apontar:** “a cidade do norte/sul/leste/oeste”, “a maior”, “a mais fraca”, “a mais rica”, “a mais pobre”, “a cidade mais perto”, “o rei de …”, “aqui”, “dele/dela”, “o aliado”, “o inimigo”.
- **Várias ordens de uma vez**, com “e depois”, “em seguida”, “quando a guerra começar”.
- **Ordens grandes ou perigosas** (guerra, fogo, peste, destruir, mais de uma ordem) aparecem como **📋 plano**, com o custo total, e só acontecem quando você toca em **✅ Fazer tudo**.
- Se faltar alguma coisa, o anjo diz o que faltou e dá um exemplo. Ele também responde “oi”, “quem é você”, “ajuda” e “obrigado”.
- A aba **❓ Ajuda** tem a lista das palavras que o anjo entende.

## 4. 🔑 Modo administrador

- Na aba **🔑 Admin**, digite a senha e toque em **Entrar**. Maiúsculas e minúsculas não importam.
- No modo administrador: **nada gasta Fé, nada recarrega** e o anjo atende mesmo fora do modo semideus. Só as ordens perigosas ainda mostram o plano antes.
- Aparece o grupo **🔑 Administrador** no fim dos poderes: Encher a Fé, Ouro para mim, Teletransporte, Criar bichos (lobo, urso, leão, dragão, dragão tanque, cavalo, vaca, ovelha, galinha, coelho, cachorro), Matar e Pular meio dia.
- Nas ordens também vale: “fé 500”, “ouro 1000 para mim”, “me leva para Vale Verde”, “cria 2 dragões aqui”, “mata o rei de …”, “pula meio dia”, “sair do modo admin”.
- O modo administrador desliga sozinho quando o jogo fecha.
- A senha não fica escrita no código, só um "resumo" dela. Mesmo assim, quem souber programar consegue pular essa tela, porque o jogo é offline e roda no próprio celular. Serve como código secreto, não como cofre.

## 5. Detalhes técnicos

- Todo o código novo está num bloco só, no fim do jogo: `VERSÃO 38 — O ANJO`.
- O anjo não mexe no jogo por fora: cada ordem vira um poder da tabela `AP`, e o poder usa as funções que o jogo já tinha (`launchRaid`, `dominate`, `freeVassal`, `ensureFence`, `foundVillage`, `abandon`, `v27UsePower`...).
- O histórico da conversa e as recargas ficam salvos junto com o mundo.
- Testado no navegador (computador e tela de celular deitada): todos os 45 poderes, as ordens de exemplo, o plano com confirmação, a senha certa e errada, e salvar e carregar o mundo. Nenhum erro no console.

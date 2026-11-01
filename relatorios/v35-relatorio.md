# Mundo Vivo v35: bugs corrigidos e versão Android

**Arquivo do jogo:** `mundo-vivo-v35.html`. A v34 e as outras versões continuam como estavam.

**APK:** `android/saida/MundoVivo.apk` (instruções em `android/LEIA-ME.md`).

## Como testei

- Simulei mundos pequenos, médios e grandes, de 20 a 60 dias, com a revolução industrial forçada no dia 5.
- Num dos testes um robô apertou botões e teclas ao acaso durante 30 dias (mais de 300 toques).
- Testei voo, rasante, poções, inventário, combate e o painel ⚙️ com todos os mecanismos desligados e religados.
- Procurei números quebrados (vida, fome, moedas, estoque das vilas), gente fora do mapa e gente parada o dia inteiro.
- Salvei e carreguei: todos os bichos e pessoas voltam iguais. Um mundo salvo na v34 abre na v35.
- Tirei fotos da tela como num celular deitado e em pé.

**Erros de código:** nenhum apareceu, nem na v34. Os bugs eram de comportamento e de tela.

## Bugs corrigidos

1. **NPC andando com madeira na mão para sempre.** O fazendeiro que mora sozinho (fora da vila) só guardava comida na cabana. A madeira ficava na mão: vi um com 21. Agora ele guarda tudo no baú da cabana.
2. **Rei e outros andando com a mão cheia.** Quem não passa pelo trabalho normal da vila (o rei, por exemplo) não guardava o que pegava (vi o rei com 17 de comida). Agora, quando está à toa com a mão cheia, leva para o armazém.
   - Depois das duas correções: 0 pessoas com carga demais em 25 dias (antes apareciam toda hora).
3. **Barra de poções ❤️💙💛 em cima do joystick** com o celular deitado. A terceira poção ficava fora da tela. Agora ela fica em fila, ao lado do painel de vida.
4. **Botões de combate cobrindo a madeira, pedra e comida** no canto de cima, com o celular deitado. Desci um pouco os botões.
5. **Ninguém comprava carro.** O NPC precisava de uns 190 moedas. Agora precisa de uns 140, então os ricos compram.

## Versão Android

- O app abre o jogo em tela cheia, sem internet, e a tela não apaga enquanto joga.
- O **botão voltar** do celular faz o mesmo que a tecla Esc: fecha a janela aberta ou abre o menu. Com o menu aberto, ele pergunta se você quer sair.
- Os mundos salvos ficam guardados no celular, como no navegador.
- Precisa de Android 7 ou mais novo.

## O que ainda dá para melhorar

- **Mapa grande fica pesado depois de uns 40 dias** (mais de 200 pessoas). No celular, a velocidade 100x vai rodar mais devagar que no computador.
- **Não testei num celular de verdade.** O APK foi conferido por programa (assinatura, manifesto, ícone e o jogo dentro), mas não instalado num aparelho.
- Se o celular fechar o app sozinho em segundo plano, o que não foi salvo se perde. Salve antes de sair.

# Mundo Vivo para Android

Este é o projeto do aplicativo. O APK pronto está na pasta [`apk/`](../../apk/) do repositório.

## Instalar no celular

1. Passe o `MundoVivo.apk` para o celular (WhatsApp, Drive, cabo USB...).
2. Toque no arquivo. O Android pede para **permitir instalar apps desta fonte**. Permita.
3. Pronto: o ícone **Mundo Vivo** aparece na tela do celular.

Precisa de Android 7 ou mais novo. O jogo funciona sem internet. Os mundos salvos ficam no celular.

## Como mudar o jogo

O jogo inteiro está num arquivo só:

```
app/src/main/assets/index.html
```

É o mesmo HTML do Mundo Vivo (hoje a v37). Você pode:

- abrir esse arquivo no navegador do computador para testar;
- editar com qualquer editor de texto (VS Code, Notepad++...);
- ou trocar ele por uma versão nova do jogo (por exemplo `mundo-vivo-v37.html`), **renomeando para `index.html`**.

Depois é só gerar o APK de novo (abaixo).

Outras coisas fáceis de mudar:

| O que | Onde |
|---|---|
| Nome do app | `app/src/main/res/values/strings.xml` |
| Ícone | as imagens `ic_launcher.png` dentro de `app/src/main/res/mipmap-*` |
| Número da versão | `versionCode` e `versionName` em `app/build.gradle` |
| Botão voltar, tela cheia | `app/src/main/java/com/bruno/mundovivo/MainActivity.java` |

**Importante:** a cada APK novo, aumente o `versionCode` (35, 36, 37...). Assim o celular aceita instalar por cima e **os mundos salvos não se perdem**.

## Gerar o APK de novo

### Jeito 1: Android Studio (mais fácil)

1. Instale o [Android Studio](https://developer.android.com/studio).
2. Abra esta pasta (`File > Open`).
3. Espere ele preparar o projeto e vá em `Build > Build App Bundle(s) / APK(s) > Build APK(s)`.
4. O APK sai em `app/build/outputs/apk/debug/`.

### Jeito 2: sem Android Studio (só Java)

Precisa do Java 17 ou mais novo e de internet na primeira vez.

- Linux ou Mac: `./monta-apk.sh`
- Windows: rode o mesmo comando no **Git Bash**.

O APK sai em `saida/MundoVivo.apk`.

## A chave do app

A chave que assina o APK (`ferramentas/mundovivo-chave.p12`) **não fica neste repositório público**, de propósito: quem tivesse a chave poderia publicar um APK falso que instala por cima do verdadeiro.

Para gerar um APK oficial, coloque a chave em `ferramentas/` e informe a senha numa variável de ambiente antes de montar:

```
export MUNDOVIVO_SENHA='a senha da chave'
./monta-apk.sh
```

Sem a chave, você ainda pode gerar um APK de teste pelo Android Studio (`Build APK(s)` em modo debug).

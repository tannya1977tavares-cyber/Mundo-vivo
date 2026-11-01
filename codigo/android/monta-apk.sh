#!/usr/bin/env bash
# Monta o APK do Mundo Vivo sem Android Studio.
# Precisa só do Java (JDK 17 ou mais novo) e de internet na primeira vez (baixa 4 bibliotecas do Maven Central).
# Uso:  ./monta-apk.sh        ->  cria saida/MundoVivo.apk
set -euo pipefail
cd "$(dirname "$0")"
RAIZ="$(pwd)"
LIBS="$RAIZ/ferramentas/libs"
TMP="$RAIZ/ferramentas/.build"
MAVENS="https://repo1.maven.org/maven2 https://repo.maven.apache.org/maven2"
mkdir -p "$LIBS" "$RAIZ/saida"

baixa() { # caminho-no-maven arquivo
  [ -s "$LIBS/$2" ] && return 0
  echo "Baixando $2 ..."
  for t in 1 2 3; do
    for M in $MAVENS; do
      if curl -fsSL -o "$LIBS/$2.tmp" "$M/$1" 2>/dev/null || wget -q -O "$LIBS/$2.tmp" "$M/$1" 2>/dev/null; then
        mv "$LIBS/$2.tmp" "$LIBS/$2"; return 0
      fi
    done
    sleep $((t*3))
  done
  rm -f "$LIBS/$2.tmp"; echo "Erro: não consegui baixar $2. Confira a internet e rode de novo."; exit 1
}
baixa io/github/reandroid/ARSCLib/1.4.0/ARSCLib-1.4.0.jar ARSCLib-1.4.0.jar
baixa com/jakewharton/android/repackaged/dalvik-dx/16.0.1/dalvik-dx-16.0.1.jar dalvik-dx-16.0.1.jar
baixa com/android/tools/build/apksig/2.3.0/apksig-2.3.0.jar apksig-2.3.0.jar
baixa com/google/android/android/4.1.1.4/android-4.1.1.4.jar android-4.1.1.4.jar

# lê pacote e versão do app/build.gradle (o mesmo arquivo que o Android Studio usa)
G="$RAIZ/app/build.gradle"
PACOTE=$(sed -n "s/.*applicationId *['\"]\([^'\"]*\)['\"].*/\1/p" "$G")
VCODE=$(sed -n "s/.*versionCode *\([0-9]*\).*/\1/p" "$G")
VNOME=$(sed -n "s/.*versionName *['\"]\([^'\"]*\)['\"].*/\1/p" "$G")
MINSDK=$(sed -n "s/.*minSdk *\([0-9]*\).*/\1/p" "$G")
ALVO=$(sed -n "s/.*targetSdk *\([0-9]*\).*/\1/p" "$G")
echo "Pacote $PACOTE, versão $VNOME ($VCODE)"

rm -rf "$TMP"; mkdir -p "$TMP/proj/resources/package_1" "$TMP/proj/root" "$TMP/cls" "$TMP/ferr"
# manifesto com pacote, versão e Android mínimo
sed -e "s#<manifest xmlns:android=\"http://schemas.android.com/apk/res/android\">#<manifest xmlns:android=\"http://schemas.android.com/apk/res/android\" package=\"$PACOTE\" android:versionCode=\"$VCODE\" android:versionName=\"$VNOME\">\n    <uses-sdk android:minSdkVersion=\"$MINSDK\" android:targetSdkVersion=\"$ALVO\" />#" \
    app/src/main/AndroidManifest.xml > "$TMP/proj/AndroidManifest.xml"
grep -q "package=\"$PACOTE\"" "$TMP/proj/AndroidManifest.xml" || { echo "Erro: não consegui ler a tag <manifest>"; exit 1; }
cp -r app/src/main/res "$TMP/proj/resources/package_1/"
printf '{"package_id":127,"package_name":"%s"}' "$PACOTE" > "$TMP/proj/resources/package_1/package.json"
cp -r app/src/main/assets "$TMP/proj/root/assets"

echo "Compilando o código Java ..."
javac --release 8 -nowarn -Xlint:-options -cp "$LIBS/android-4.1.1.4.jar" -d "$TMP/cls" $(find app/src/main/java -name '*.java')
java -cp "$LIBS/dalvik-dx-16.0.1.jar" com.android.dx.command.Main --dex --min-sdk-version=24 --output="$TMP/proj/root/classes.dex" "$TMP/cls"

echo "Montando o APK ..."
javac -nowarn -cp "$LIBS/ARSCLib-1.4.0.jar:$LIBS/apksig-2.3.0.jar" -d "$TMP/ferr" ferramentas/MontaApk.java ferramentas/Assina.java
java -cp "$LIBS/ARSCLib-1.4.0.jar:$TMP/ferr" MontaApk "$TMP/proj" "$TMP/sem-assinatura.apk"
java --add-exports java.base/sun.security.x509=ALL-UNNAMED --add-exports java.base/sun.security.pkcs=ALL-UNNAMED \
     --add-exports java.base/sun.security.util=ALL-UNNAMED \
     -cp "$LIBS/apksig-2.3.0.jar:$TMP/ferr" Assina ferramentas/mundovivo-chave.p12 "$MUNDOVIVO_SENHA" mundovivo \
     "$TMP/sem-assinatura.apk" "saida/MundoVivo.apk"
rm -rf "$TMP"
echo "Pronto: saida/MundoVivo.apk"

import com.android.apksig.ApkSigner;
import java.io.File;
import java.io.FileInputStream;
import java.security.KeyStore;
import java.security.PrivateKey;
import java.security.cert.X509Certificate;
import java.util.Collections;

/** Assina o APK (esquema v2, Android 7 ou mais novo) com a chave do projeto. Uso: Assina chave.p12 senha apelido entrada.apk saida.apk */
public class Assina {
    public static void main(String[] a) throws Exception {
        KeyStore ks = KeyStore.getInstance("PKCS12");
        try (FileInputStream in = new FileInputStream(a[0])) { ks.load(in, a[1].toCharArray()); }
        PrivateKey k = (PrivateKey) ks.getKey(a[2], a[1].toCharArray());
        X509Certificate c = (X509Certificate) ks.getCertificate(a[2]);
        ApkSigner.SignerConfig cfg = new ApkSigner.SignerConfig.Builder("MUNDOVIVO", k, Collections.singletonList(c)).build();
        new ApkSigner.Builder(Collections.singletonList(cfg))
                .setInputApk(new File(a[3])).setOutputApk(new File(a[4]))
                .setV1SigningEnabled(false).setV2SigningEnabled(true)
                .build().sign();
        System.out.println("APK assinado: " + a[4]);
    }
}

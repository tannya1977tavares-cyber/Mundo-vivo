import com.reandroid.apk.ApkModule;
import com.reandroid.apk.ApkModuleXmlEncoder;
import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.*;
import java.util.regex.*;

/**
 * Junta manifesto + res + assets + classes.dex num APK (ainda sem assinatura). Usado por monta-apk.sh.
 * Cria sozinho o values/public.xml (a lista de números de cada recurso) a partir das pastas res/.
 */
public class MontaApk {
    public static void main(String[] a) throws Exception {
        File proj = new File(a[0]);
        File res = new File(proj, "resources/package_1/res");
        Map<String, Set<String>> tipos = new TreeMap<>();
        for (File d : Objects.requireNonNull(res.listFiles())) {
            if (!d.isDirectory()) continue;
            String tipo = d.getName().split("-")[0];
            for (File f : Objects.requireNonNull(d.listFiles())) {
                if (tipo.equals("values")) {
                    if (f.getName().equals("public.xml")) continue;
                    String txt = new String(Files.readAllBytes(f.toPath()), StandardCharsets.UTF_8);
                    Matcher m = Pattern.compile("<(string|color|dimen|bool|integer)\\s+name=\"([^\"]+)\"").matcher(txt);
                    while (m.find()) tipos.computeIfAbsent(m.group(1), k -> new TreeSet<>()).add(m.group(2));
                } else {
                    String nome = f.getName().replaceAll("\\..*$", "");
                    tipos.computeIfAbsent(tipo, k -> new TreeSet<>()).add(nome);
                }
            }
        }
        StringBuilder sb = new StringBuilder("<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<resources>\n");
        int t = 1;
        for (Map.Entry<String, Set<String>> e : tipos.entrySet()) {
            int n = 0;
            for (String nome : e.getValue())
                sb.append(String.format("  <public id=\"0x7f%02x%04x\" type=\"%s\" name=\"%s\" />\n", t, n++, e.getKey(), nome));
            t++;
        }
        sb.append("</resources>\n");
        File vals = new File(res, "values"); vals.mkdirs();
        Files.write(new File(vals, "public.xml").toPath(), sb.toString().getBytes(StandardCharsets.UTF_8));

        ApkModuleXmlEncoder enc = new ApkModuleXmlEncoder();
        enc.scanDirectory(proj);
        ApkModule m = enc.getApkModule();
        m.writeApk(new File(a[1]));
        System.out.println("APK montado: " + a[1]);
    }
}

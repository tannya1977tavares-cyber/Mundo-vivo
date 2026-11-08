package com.tavares.brunobot

import android.content.ActivityNotFoundException
import android.content.ClipboardManager
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Color
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.media.MediaPlayer
import android.net.Uri
import android.os.Bundle
import android.speech.RecognizerIntent
import android.text.InputType
import android.util.Base64
import android.view.Gravity
import android.view.View
import android.view.ViewGroup.LayoutParams.MATCH_PARENT
import android.view.ViewGroup.LayoutParams.WRAP_CONTENT
import android.widget.Button
import android.widget.EditText
import android.widget.HorizontalScrollView
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.ScrollView
import android.widget.TextView
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.FileProvider
import java.io.ByteArrayOutputStream
import java.io.File
import java.util.concurrent.Executors

class MainActivity : AppCompatActivity() {

    private lateinit var cfg: Config
    private lateinit var cerebro: Cerebro
    private lateinit var voz: Voz
    private val fundo = Executors.newSingleThreadExecutor()
    private var player: MediaPlayer? = null

    private lateinit var lista: LinearLayout
    private lateinit var rolagem: ScrollView
    private lateinit var entrada: EditText
    private lateinit var previas: LinearLayout
    private lateinit var botaoVoz: TextView
    private val pendentes = mutableListOf<Pair<Bitmap, Imagem>>()
    private var modoAssistente = false

    private val laranja = Color.parseColor("#FF7A1A")
    private val texto = Color.parseColor("#E8EAF0")
    private val sub = Color.parseColor("#9AA3B2")
    private val painel = Color.parseColor("#171A21")
    private val corEu = Color.parseColor("#23324D")
    private val corBot = Color.parseColor("#1D2129")

    private val escolherImagem = registerForActivityResult(ActivityResultContracts.GetContent()) { uri ->
        if (uri != null) anexarUri(uri)
    }

    private val ouvir = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { r ->
        if (r.resultCode == RESULT_OK) {
            val dito = r.data?.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS)?.firstOrNull()
            if (!dito.isNullOrBlank()) enviar(dito)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        cfg = Config(this)
        cerebro = Cerebro(this)
        voz = Voz(this)
        setContentView(montarTela())
        bolhaBot("E aí, Bruno! Brun'Obot na área. O que vamos resolver agora?", null, emptyList())
        if (!cfg.configurado) abrirConfiguracoes(primeiraVez = true)
        tratarIntent(intent)
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        tratarIntent(intent)
    }

    /** Chamado pelo botão lateral: traz a tela que o Bruno estava vendo e já começa a ouvir. */
    private fun tratarIntent(i: Intent?) {
        if (i == null) return
        val doAssistente = i.getBooleanExtra(EXTRA_ASSISTENTE, false) || i.action == Intent.ACTION_ASSIST
        if (!doAssistente) return
        i.removeExtra(EXTRA_ASSISTENTE)
        modoAssistente = true
        val tela = File(cacheDir, ARQUIVO_TELA)
        if (tela.exists() && System.currentTimeMillis() - tela.lastModified() < 15_000) {
            BitmapFactory.decodeFile(tela.path)?.let { adicionarPendente(it, daTela = true) }
            tela.delete()
        }
        if (cfg.configurado) iniciarEscuta()
    }

    // ---------- Tela ----------

    private fun montarTela(): View {
        val raiz = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setBackgroundColor(Color.parseColor("#0F1115"))
        }

        val topo = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.CENTER_VERTICAL
            setPadding(dp(16), dp(12), dp(8), dp(12))
        }
        topo.addView(TextView(this).apply {
            text = "Brun'Obot"
            setTextColor(laranja)
            textSize = 20f
            setTypeface(typeface, Typeface.BOLD)
        }, LinearLayout.LayoutParams(0, WRAP_CONTENT, 1f))
        botaoVoz = iconeTopo("") { cfg.falar = !cfg.falar; atualizarBotaoVoz() }
        topo.addView(botaoVoz)
        topo.addView(iconeTopo("🧹") { limparConversa() })
        topo.addView(iconeTopo("⚙") { abrirConfiguracoes(false) })
        atualizarBotaoVoz()
        raiz.addView(topo)

        lista = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(dp(12), dp(4), dp(12), dp(12))
        }
        rolagem = ScrollView(this).apply { addView(lista) }
        raiz.addView(rolagem, LinearLayout.LayoutParams(MATCH_PARENT, 0, 1f))

        previas = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL }
        raiz.addView(HorizontalScrollView(this).apply {
            setPadding(dp(12), 0, dp(12), 0)
            addView(previas)
        })

        val barra = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.CENTER_VERTICAL
            setPadding(dp(8), dp(8), dp(8), dp(10))
        }
        barra.addView(iconeBarra("📎") { escolherImagem.launch("image/*") })
        entrada = EditText(this).apply {
            hint = "Fala comigo, Bruno…"
            setHintTextColor(sub)
            setTextColor(texto)
            inputType = InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_FLAG_MULTI_LINE or InputType.TYPE_TEXT_FLAG_CAP_SENTENCES
            maxLines = 5
            background = arredondado(painel, dp(22))
            setPadding(dp(16), dp(10), dp(16), dp(10))
        }
        barra.addView(entrada, LinearLayout.LayoutParams(0, WRAP_CONTENT, 1f).apply { setMargins(dp(4), 0, dp(4), 0) })
        barra.addView(iconeBarra("🎤") { iniciarEscuta() })
        barra.addView(iconeBarra("➤", destaque = true) {
            val t = entrada.text.toString().trim()
            if (t.isNotEmpty() || pendentes.isNotEmpty()) enviar(t)
        })
        raiz.addView(barra)
        return raiz
    }

    private fun iconeTopo(simbolo: String, acao: () -> Unit) = TextView(this).apply {
        text = simbolo
        textSize = 20f
        setTextColor(texto)
        setPadding(dp(10), dp(4), dp(10), dp(4))
        setOnClickListener { acao() }
    }

    private fun iconeBarra(simbolo: String, destaque: Boolean = false, acao: () -> Unit) = TextView(this).apply {
        text = simbolo
        textSize = 20f
        gravity = Gravity.CENTER
        setTextColor(if (destaque) Color.parseColor("#111111") else texto)
        background = arredondado(if (destaque) laranja else painel, dp(22))
        layoutParams = LinearLayout.LayoutParams(dp(44), dp(44)).apply { setMargins(dp(2), 0, dp(2), 0) }
        setOnClickListener { acao() }
    }

    private fun atualizarBotaoVoz() {
        botaoVoz.text = if (cfg.falar) "🔊" else "🔇"
    }

    // ---------- Conversa ----------

    private fun enviar(mensagem: String) {
        if (!cfg.configurado) { abrirConfiguracoes(false); return }
        val imagens = pendentes.map { it.second }
        bolhaEu(mensagem, pendentes.map { it.first })
        entrada.setText("")
        pendentes.clear(); previas.removeAllViews()
        val pensando = bolhaSimples("pensando…", corBot)
        val falarAgora = cfg.falar || modoAssistente

        fundo.execute {
            try {
                val r = cerebro.responder(mensagem, imagens)
                val fala = if (falarAgora && r.texto.isNotBlank()) {
                    try { voz.falar(r.texto, r.tom) } catch (e: Exception) { null }
                } else null
                runOnUiThread {
                    lista.removeView(pensando)
                    bolhaBot(r.texto, r.tom, r.audiosZap)
                    fala?.let { tocar(it) }
                }
            } catch (e: Exception) {
                runOnUiThread {
                    lista.removeView(pensando)
                    bolhaSimples("⚠️ ${e.message}", corBot)
                }
            }
        }
    }

    private fun bolhaEu(msg: String, imagens: List<Bitmap>) {
        val caixa = caixaBolha(corEu, Gravity.END)
        imagens.forEach { bmp ->
            caixa.addView(ImageView(this).apply {
                setImageBitmap(bmp)
                adjustViewBounds = true
                maxHeight = dp(160)
            }, LinearLayout.LayoutParams(WRAP_CONTENT, WRAP_CONTENT).apply { bottomMargin = dp(6) })
        }
        if (msg.isNotBlank()) caixa.addView(textoBolha(msg))
        adicionar(caixa, Gravity.END)
    }

    private fun bolhaBot(msg: String, tom: String?, audios: List<File>) {
        val caixa = caixaBolha(corBot, Gravity.START)
        if (tom != null) {
            caixa.addView(TextView(this).apply {
                text = tom.uppercase()
                textSize = 10f
                setTextColor(laranja)
                letterSpacing = 0.08f
                setPadding(0, 0, 0, dp(4))
            })
        }
        caixa.addView(textoBolha(msg))
        audios.forEach { f ->
            val linha = LinearLayout(this).apply {
                orientation = LinearLayout.HORIZONTAL
                setPadding(0, dp(8), 0, 0)
            }
            linha.addView(botaoPequeno("▶ Ouvir", painel) { tocar(f) })
            linha.addView(botaoPequeno("Enviar no WhatsApp", Color.parseColor("#1F7A45")) { enviarWhatsapp(f) })
            caixa.addView(linha)
        }
        adicionar(caixa, Gravity.START)
    }

    private fun bolhaSimples(msg: String, cor: Int): View {
        val caixa = caixaBolha(cor, Gravity.START)
        caixa.addView(textoBolha(msg))
        adicionar(caixa, Gravity.START)
        return caixa
    }

    private fun caixaBolha(cor: Int, lado: Int) = LinearLayout(this).apply {
        orientation = LinearLayout.VERTICAL
        background = arredondado(cor, dp(16))
        setPadding(dp(14), dp(10), dp(14), dp(10))
        gravity = lado
    }

    private fun textoBolha(msg: String) = TextView(this).apply {
        text = msg
        setTextColor(texto)
        textSize = 15f
        setLineSpacing(0f, 1.15f)
        setTextIsSelectable(true)
    }

    private fun botaoPequeno(rotulo: String, cor: Int, acao: () -> Unit) = Button(this).apply {
        text = rotulo
        isAllCaps = false
        setTextColor(texto)
        textSize = 13f
        background = arredondado(cor, dp(12))
        setPadding(dp(12), 0, dp(12), 0)
        minHeight = dp(38); minimumHeight = dp(38)
        layoutParams = LinearLayout.LayoutParams(WRAP_CONTENT, dp(38)).apply { marginEnd = dp(8) }
        setOnClickListener { acao() }
    }

    private fun adicionar(v: View, lado: Int) {
        val largura = (resources.displayMetrics.widthPixels * 0.82).toInt()
        val lp = LinearLayout.LayoutParams(WRAP_CONTENT, WRAP_CONTENT).apply {
            gravity = lado
            topMargin = dp(8)
        }
        v.layoutParams = lp
        if (v is LinearLayout) {
            v.post { if (v.width > largura) { lp.width = largura; v.layoutParams = lp } }
        }
        lista.addView(v)
        rolagem.post { rolagem.fullScroll(View.FOCUS_DOWN) }
    }

    private fun limparConversa() {
        AlertDialog.Builder(this)
            .setTitle("Limpar conversa?")
            .setMessage("O Brun'Obot esquece o papo recente, mas continua lembrando dos fatos que você pediu para guardar.")
            .setPositiveButton("Limpar") { _, _ ->
                Memoria(this).limparConversa()
                lista.removeAllViews()
                bolhaBot("Conversa limpa! Bora do zero.", null, emptyList())
            }
            .setNegativeButton("Cancelar", null)
            .show()
    }

    // ---------- Voz e áudio ----------

    private fun iniciarEscuta() {
        val i = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)
            .putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
            .putExtra(RecognizerIntent.EXTRA_LANGUAGE, "pt-BR")
            .putExtra(RecognizerIntent.EXTRA_PROMPT, "Fala, Bruno…")
        try {
            ouvir.launch(i)
        } catch (e: ActivityNotFoundException) {
            avisar("Reconhecimento de voz indisponível. Instale/atualize o app Google.")
        }
    }

    private fun tocar(f: File) {
        try {
            player?.release()
            player = MediaPlayer().apply {
                setDataSource(f.path)
                prepare()
                start()
            }
        } catch (e: Exception) {
            avisar("Não consegui tocar o áudio: ${e.message}")
        }
    }

    private fun enviarWhatsapp(f: File) {
        val uri = FileProvider.getUriForFile(this, "$packageName.arquivos", f)
        val tipo = if (f.extension == "ogg") "audio/ogg" else "audio/mpeg"
        val base = Intent(Intent.ACTION_SEND)
            .setType(tipo)
            .putExtra(Intent.EXTRA_STREAM, uri)
            .addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        for (pacote in listOf("com.whatsapp", "com.whatsapp.w4b")) {
            try {
                startActivity(Intent(base).setPackage(pacote)); return
            } catch (_: ActivityNotFoundException) { }
        }
        startActivity(Intent.createChooser(base, "Enviar áudio"))
    }

    // ---------- Imagens ----------

    private fun anexarUri(uri: Uri) {
        try {
            val opcoes = BitmapFactory.Options().apply { inJustDecodeBounds = true }
            contentResolver.openInputStream(uri)?.use { BitmapFactory.decodeStream(it, null, opcoes) }
            var amostra = 1
            while (maxOf(opcoes.outWidth, opcoes.outHeight) / amostra > 3000) amostra *= 2
            val bmp = contentResolver.openInputStream(uri)?.use {
                BitmapFactory.decodeStream(it, null, BitmapFactory.Options().apply { inSampleSize = amostra })
            } ?: return avisar("Não consegui abrir a imagem.")
            adicionarPendente(bmp, daTela = false)
        } catch (e: Exception) {
            avisar("Erro na imagem: ${e.message}")
        }
    }

    private fun adicionarPendente(original: Bitmap, daTela: Boolean) {
        val reduzida = reduzir(original, 1568)
        val saida = ByteArrayOutputStream()
        reduzida.compress(Bitmap.CompressFormat.JPEG, 85, saida)
        val b64 = Base64.encodeToString(saida.toByteArray(), Base64.NO_WRAP)
        val miniatura = reduzir(reduzida, 400)
        pendentes.add(Pair(miniatura, Imagem(b64, daTela)))
        previas.addView(ImageView(this).apply {
            setImageBitmap(miniatura)
            adjustViewBounds = true
            layoutParams = LinearLayout.LayoutParams(WRAP_CONTENT, dp(64)).apply { setMargins(0, dp(6), dp(6), 0) }
            contentDescription = if (daTela) "tela do celular" else "imagem anexada"
        })
        if (daTela) avisar("📱 Peguei a tela que você estava vendo")
    }

    private fun reduzir(bmp: Bitmap, lado: Int): Bitmap {
        val maior = maxOf(bmp.width, bmp.height)
        if (maior <= lado) return bmp
        val f = lado.toFloat() / maior
        return Bitmap.createScaledBitmap(bmp, (bmp.width * f).toInt(), (bmp.height * f).toInt(), true)
    }

    // ---------- Configurações ----------

    private fun abrirConfiguracoes(primeiraVez: Boolean) {
        val caixa = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(dp(20), dp(8), dp(20), 0)
        }
        fun rotulo(t: String) = TextView(this).apply {
            text = t; textSize = 13f; setPadding(0, dp(12), 0, dp(2))
        }
        fun campo(valor: String, dica: String) = EditText(this).apply {
            setText(valor); hint = dica; isSingleLine = true
            inputType = InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD
        }
        fun colar(alvo: EditText) = Button(this).apply {
            text = "Colar"; isAllCaps = false
            setOnClickListener {
                val clip = (getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager).primaryClip
                val t = clip?.getItemAt(0)?.coerceToText(this@MainActivity)?.toString()?.trim()
                if (!t.isNullOrBlank()) alvo.setText(t)
            }
        }
        fun linha(campo: EditText) = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            addView(campo, LinearLayout.LayoutParams(0, WRAP_CONTENT, 1f))
            addView(colar(campo))
        }

        if (primeiraVez) caixa.addView(TextView(this).apply {
            text = "Bem-vindo! Cole aqui as mesmas duas chaves que você usou no Brun'Obot do PC. " +
                "Elas ficam guardadas só neste celular."
            textSize = 14f
        })
        val anthropic = campo(cfg.anthropicKey, "sk-ant-...")
        val eleven = campo(cfg.elevenKey, "sk_...")
        val vozId = campo(cfg.vozId, Config.VOZ_PADRAO)
        caixa.addView(rotulo("Chave da Anthropic (cérebro)")); caixa.addView(linha(anthropic))
        caixa.addView(rotulo("Chave do ElevenLabs (voz)")); caixa.addView(linha(eleven))
        caixa.addView(rotulo("ID da voz (já vem a sua: Bruno Tavares)")); caixa.addView(vozId)

        AlertDialog.Builder(this)
            .setTitle("⚙ Configurações")
            .setView(ScrollView(this).apply { addView(caixa) })
            .setPositiveButton("Salvar") { _, _ ->
                cfg.anthropicKey = anthropic.text.toString()
                cfg.elevenKey = eleven.text.toString()
                cfg.vozId = vozId.text.toString()
                avisar(if (cfg.configurado) "Tudo certo! ✅" else "Ainda falta alguma chave.")
            }
            .setNegativeButton("Fechar", null)
            .show()
    }

    // ---------- Utilidades ----------

    private fun arredondado(cor: Int, raio: Int) = GradientDrawable().apply {
        setColor(cor); cornerRadius = raio.toFloat()
    }

    private fun dp(v: Int) = (v * resources.displayMetrics.density).toInt()

    private fun avisar(msg: String) = Toast.makeText(this, msg, Toast.LENGTH_SHORT).show()

    override fun onDestroy() {
        player?.release()
        fundo.shutdown()
        super.onDestroy()
    }

    companion object {
        const val EXTRA_ASSISTENTE = "assistente"
        const val ARQUIVO_TELA = "tela.jpg"
    }
}

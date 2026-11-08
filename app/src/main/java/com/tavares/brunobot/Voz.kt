package com.tavares.brunobot

import android.content.Context
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject
import java.io.File
import java.util.UUID
import java.util.concurrent.TimeUnit

/** Voz do Bruno pelo ElevenLabs. */
class Voz(private val ctx: Context) {
    private val cfg = Config(ctx)
    private val http = OkHttpClient.Builder()
        .connectTimeout(30, TimeUnit.SECONDS)
        .readTimeout(120, TimeUnit.SECONDS)
        .build()

    private val pasta: File
        get() = File(ctx.filesDir, "audios").apply { mkdirs() }

    /** Fala para tocar no app (MP3). */
    fun falar(texto: String, tom: String): File = baixar(texto, tom, "mp3_44100_128", "mp3")

    /**
     * Mensagem de voz para o WhatsApp: tenta OGG/Opus (formato de áudio do WhatsApp).
     * Se o plano/servidor não aceitar, cai para MP3.
     */
    fun paraWhatsapp(texto: String, tom: String): File {
        return try {
            val ogg = baixar(texto, tom, "opus_48000_64", "ogg")
            val cabecalho = ogg.inputStream().use { s -> ByteArray(4).also { s.read(it) } }
            if (String(cabecalho) == "OggS") ogg else {
                ogg.delete(); falar(texto, tom)
            }
        } catch (e: Exception) {
            falar(texto, tom)
        }
    }

    private fun baixar(texto: String, tom: String, formato: String, extensao: String): File {
        if (cfg.elevenKey.isBlank()) throw Exception("Falta a chave do ElevenLabs nas configurações (⚙).")
        val (stability, style) = Personalidade.AJUSTE_VOZ[tom] ?: Personalidade.AJUSTE_VOZ.getValue("informal")
        val corpo = JSONObject()
            .put("text", texto)
            .put("model_id", "eleven_multilingual_v2")
            .put(
                "voice_settings", JSONObject()
                    .put("stability", stability)
                    .put("similarity_boost", 0.85)
                    .put("style", style)
                    .put("use_speaker_boost", true)
            )
        val req = Request.Builder()
            .url("https://api.elevenlabs.io/v1/text-to-speech/${cfg.vozId}?output_format=$formato")
            .header("xi-api-key", cfg.elevenKey)
            .post(corpo.toString().toRequestBody("application/json".toMediaType()))
            .build()
        http.newCall(req).execute().use { r ->
            if (!r.isSuccessful) {
                throw Exception("ElevenLabs respondeu ${r.code}: ${r.body?.string()?.take(200)}")
            }
            val arquivo = File(pasta, "fala_${UUID.randomUUID().toString().take(8)}.$extensao")
            arquivo.outputStream().use { saida -> r.body!!.byteStream().copyTo(saida) }
            return arquivo
        }
    }
}

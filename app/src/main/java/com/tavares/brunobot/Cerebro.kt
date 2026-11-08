package com.tavares.brunobot

import android.content.Context
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONArray
import org.json.JSONObject
import java.io.File
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.concurrent.TimeUnit

/** Cérebro do Brun'Obot: Claude + ferramentas + memória + personalidade. */
class Cerebro(ctx: Context) {
    private val cfg = Config(ctx)
    private val mem = Memoria(ctx)
    private val voz = Voz(ctx)
    private val http = OkHttpClient.Builder()
        .connectTimeout(30, TimeUnit.SECONDS)
        .readTimeout(180, TimeUnit.SECONDS)
        .build()

    data class Resposta(val texto: String, val tom: String, val audiosZap: List<File>)

    /** Roda fora da tela principal (em uma thread de fundo). */
    fun responder(texto: String, imagens: List<Imagem>): Resposta {
        val msgs = JSONArray()
        mem.historico().forEach { msgs.put(it) }

        val conteudo = JSONArray()
        imagens.forEach { img ->
            if (img.daTela) conteudo.put(JSONObject().put("type", "text").put("text", "[tela do celular no momento em que o Bruno chamou]"))
            conteudo.put(
                JSONObject().put("type", "image").put(
                    "source", JSONObject()
                        .put("type", "base64")
                        .put("media_type", "image/jpeg")
                        .put("data", img.base64)
                )
            )
        }
        conteudo.put(JSONObject().put("type", "text").put("text", texto.ifBlank { "(sem texto, só a imagem)" }))
        msgs.put(JSONObject().put("role", "user").put("content", conteudo))

        val audios = mutableListOf<File>()
        var final = ""
        for (passo in 0 until 8) {
            val corpo = JSONObject()
                .put("model", cfg.modelo)
                .put("max_tokens", 1200)
                .put("system", sistema())
                .put("tools", ferramentas())
                .put("messages", msgs)
            val r = chamarClaude(corpo)
            val blocos = r.getJSONArray("content")
            if (r.optString("stop_reason") == "tool_use") {
                msgs.put(JSONObject().put("role", "assistant").put("content", blocos))
                val resultados = JSONArray()
                for (i in 0 until blocos.length()) {
                    val b = blocos.getJSONObject(i)
                    if (b.optString("type") == "tool_use") {
                        resultados.put(
                            JSONObject()
                                .put("type", "tool_result")
                                .put("tool_use_id", b.getString("id"))
                                .put("content", executar(b.getString("name"), b.optJSONObject("input") ?: JSONObject(), audios))
                        )
                    }
                }
                msgs.put(JSONObject().put("role", "user").put("content", resultados))
                continue
            }
            final = (0 until blocos.length())
                .map { blocos.getJSONObject(it) }
                .filter { it.optString("type") == "text" }
                .joinToString("") { it.optString("text") }
            break
        }

        val (tom, limpo) = Personalidade.separarTom(final)
        val registro = texto + if (imagens.isNotEmpty()) "\n[${imagens.size} imagem(ns) enviada(s)]" else ""
        mem.salvarTroca(registro, limpo.ifBlank { "(sem resposta)" })
        return Resposta(limpo, tom, audios)
    }

    private fun chamarClaude(corpo: JSONObject): JSONObject {
        if (!cfg.anthropicKey.startsWith("sk-ant-")) throw Exception("Falta a chave da Anthropic nas configurações (⚙).")
        val req = Request.Builder()
            .url("https://api.anthropic.com/v1/messages")
            .header("x-api-key", cfg.anthropicKey)
            .header("anthropic-version", "2023-06-01")
            .post(corpo.toString().toRequestBody("application/json".toMediaType()))
            .build()
        http.newCall(req).execute().use { r ->
            val txt = r.body?.string() ?: ""
            if (!r.isSuccessful) throw Exception("Claude respondeu ${r.code}: ${txt.take(250)}")
            return JSONObject(txt)
        }
    }

    private fun executar(nome: String, entrada: JSONObject, audios: MutableList<File>): String = try {
        when (nome) {
            "gerar_audio_whatsapp" -> {
                val f = voz.paraWhatsapp(entrada.optString("texto"), entrada.optString("tom", "informal"))
                audios.add(f)
                "Áudio pronto (${f.name}). Aparece um botão para o Bruno ouvir e enviar no WhatsApp."
            }
            "lembrar" -> {
                mem.lembrar(entrada.optString("fato")); "Guardado."
            }
            else -> "Ferramenta desconhecida: $nome"
        }
    } catch (e: Exception) {
        "ERRO: ${e.message}"
    }

    private fun sistema(): String {
        val agora = SimpleDateFormat("EEEE, dd/MM/yyyy HH:mm", Locale("pt", "BR")).format(Date())
        val fatos = mem.fatos()
        val extra = if (fatos.isEmpty()) "" else "\n# O que você já sabe\n" + fatos.joinToString("\n") { "- $it" }
        return Personalidade.SISTEMA + "\n# Agora\n$agora\n" + extra
    }

    private fun ferramentas(): JSONArray {
        val tons = JSONArray(Personalidade.TONS)
        return JSONArray()
            .put(
                JSONObject()
                    .put("name", "gerar_audio_whatsapp")
                    .put("description", "Gera uma mensagem de voz com a voz clonada do Bruno, pronta para enviar no WhatsApp. Use quando o Bruno pedir um áudio.")
                    .put(
                        "input_schema", JSONObject()
                            .put("type", "object")
                            .put(
                                "properties", JSONObject()
                                    .put("texto", JSONObject().put("type", "string").put("description", "O que será falado, como o Bruno falaria."))
                                    .put("tom", JSONObject().put("type", "string").put("enum", tons))
                            )
                            .put("required", JSONArray().put("texto").put("tom"))
                    )
            )
            .put(
                JSONObject()
                    .put("name", "lembrar")
                    .put("description", "Guarda um fato durável (cliente, vendedor, preço, preferência do Bruno).")
                    .put(
                        "input_schema", JSONObject()
                            .put("type", "object")
                            .put("properties", JSONObject().put("fato", JSONObject().put("type", "string")))
                            .put("required", JSONArray().put("fato"))
                    )
            )
    }
}

/** Imagem já reduzida e em base64 (JPEG). */
data class Imagem(val base64: String, val daTela: Boolean = false)

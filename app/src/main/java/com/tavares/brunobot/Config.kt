package com.tavares.brunobot

import android.content.Context

/** Configurações guardadas só no celular. */
class Config(ctx: Context) {
    private val p = ctx.getSharedPreferences("brunobot", Context.MODE_PRIVATE)

    var anthropicKey: String
        get() = p.getString("anthropic", "") ?: ""
        set(v) = p.edit().putString("anthropic", v.trim()).apply()

    var elevenKey: String
        get() = p.getString("eleven", "") ?: ""
        set(v) = p.edit().putString("eleven", v.trim()).apply()

    var vozId: String
        get() = p.getString("voz", VOZ_PADRAO) ?: VOZ_PADRAO
        set(v) = p.edit().putString("voz", v.trim().ifBlank { VOZ_PADRAO }).apply()

    var modelo: String
        get() = p.getString("modelo", MODELO_PADRAO) ?: MODELO_PADRAO
        set(v) = p.edit().putString("modelo", v.trim().ifBlank { MODELO_PADRAO }).apply()

    var falar: Boolean
        get() = p.getBoolean("falar", false)
        set(v) = p.edit().putBoolean("falar", v).apply()

    val configurado: Boolean
        get() = anthropicKey.startsWith("sk-ant-") && elevenKey.isNotBlank()

    companion object {
        const val VOZ_PADRAO = "xRffVFaw3uIBOzVPxJcJ" // "Bruno Tavares"
        const val MODELO_PADRAO = "claude-sonnet-5-5"
    }
}

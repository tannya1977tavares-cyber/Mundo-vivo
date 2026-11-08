package com.tavares.brunobot

import android.content.Context
import org.json.JSONArray
import org.json.JSONObject

/** Memória local: últimas conversas e fatos que o Bruno pediu para guardar. */
class Memoria(ctx: Context) {
    private val p = ctx.getSharedPreferences("memoria", Context.MODE_PRIVATE)

    fun historico(): List<JSONObject> {
        val arr = JSONArray(p.getString("conversa", "[]"))
        val lista = (0 until arr.length()).map { arr.getJSONObject(it) }.toMutableList()
        while (lista.isNotEmpty() && lista.first().optString("role") != "user") lista.removeAt(0)
        return lista
    }

    fun salvarTroca(usuario: String, bot: String) {
        val lista = historico().toMutableList()
        lista.add(JSONObject().put("role", "user").put("content", usuario))
        lista.add(JSONObject().put("role", "assistant").put("content", bot))
        val ultimas = lista.takeLast(LIMITE)
        p.edit().putString("conversa", JSONArray(ultimas).toString()).apply()
    }

    fun fatos(): List<String> {
        val arr = JSONArray(p.getString("fatos", "[]"))
        return (0 until arr.length()).map { arr.getString(it) }
    }

    fun lembrar(fato: String) {
        val lista = fatos().toMutableList().apply { add(fato) }
        p.edit().putString("fatos", JSONArray(lista).toString()).apply()
    }

    fun limparConversa() = p.edit().putString("conversa", "[]").apply()

    companion object { const val LIMITE = 30 }
}

package com.tavares.brunobot.assist

import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.service.voice.VoiceInteractionSession
import android.service.voice.VoiceInteractionSessionService
import com.tavares.brunobot.MainActivity
import java.io.File

class BrunoSessionService : VoiceInteractionSessionService() {
    override fun onNewSession(args: Bundle?): VoiceInteractionSession = BrunoSession(this)
}

/**
 * Quando o Bruno segura o botão lateral: guarda um print da tela atual
 * (se o Android permitir) e abre o Brun'Obot já ouvindo.
 */
class BrunoSession(ctx: Context) : VoiceInteractionSession(ctx) {
    private val handler = Handler(Looper.getMainLooper())
    private var abriu = false
    private val abrirAgora = Runnable { abrirApp() }

    override fun onShow(args: Bundle?, showFlags: Int) {
        super.onShow(args, showFlags)
        abriu = false
        File(context.cacheDir, MainActivity.ARQUIVO_TELA).delete()
        // Se o print da tela não chegar rápido, abre mesmo assim.
        handler.postDelayed(abrirAgora, 1200)
    }

    override fun onHandleScreenshot(screenshot: Bitmap?) {
        if (screenshot != null) {
            try {
                File(context.cacheDir, MainActivity.ARQUIVO_TELA).outputStream().use {
                    screenshot.compress(Bitmap.CompressFormat.JPEG, 85, it)
                }
            } catch (_: Exception) { }
        }
        handler.removeCallbacks(abrirAgora)
        abrirApp()
    }

    private fun abrirApp() {
        if (abriu) return
        abriu = true
        val i = Intent(context, MainActivity::class.java)
            .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_SINGLE_TOP)
            .putExtra(MainActivity.EXTRA_ASSISTENTE, true)
        try {
            startAssistantActivity(i)
        } catch (_: Exception) {
            context.startActivity(i)
        }
        hide()
    }

    override fun onHide() {
        handler.removeCallbacks(abrirAgora)
        super.onHide()
    }
}

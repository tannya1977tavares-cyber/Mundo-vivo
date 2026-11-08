package com.tavares.brunobot.assist

import android.content.Intent
import android.speech.RecognitionService

/**
 * Exigido pelo Android para um app poder ser "assistente digital".
 * O reconhecimento de fala de verdade usa o serviço do Google pelo app.
 */
class BrunoRecognitionService : RecognitionService() {
    override fun onStartListening(recognizerIntent: Intent?, listener: Callback?) {}
    override fun onCancel(listener: Callback?) {}
    override fun onStopListening(listener: Callback?) {}
}

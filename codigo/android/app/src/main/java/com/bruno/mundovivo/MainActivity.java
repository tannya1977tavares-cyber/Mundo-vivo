package com.bruno.mundovivo;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/**
 * Abre o jogo (assets/index.html) numa tela cheia.
 * Para mudar o jogo, troque só o arquivo app/src/main/assets/index.html.
 */
public class MainActivity extends Activity {
    private WebView web;

    @Override
    protected void onCreate(Bundle salvo) {
        super.onCreate(salvo);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN
                | WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

        web = new WebView(this);
        web.setBackgroundColor(Color.BLACK);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);          // os mundos salvos ficam no localStorage
        s.setDatabaseEnabled(true);
        s.setAllowFileAccess(true);
        s.setLoadWithOverviewMode(true);
        s.setUseWideViewPort(true);
        s.setSupportZoom(false);
        s.setBuiltInZoomControls(false);
        if (Build.VERSION.SDK_INT >= 17) {
            try { // som sem precisar tocar antes (API 17+)
                WebSettings.class.getMethod("setMediaPlaybackRequiresUserGesture", boolean.class).invoke(s, false);
            } catch (Exception e) { }
        }
        web.setWebViewClient(new WebViewClient());
        web.setWebChromeClient(new WebChromeClient());
        if (salvo != null) web.restoreState(salvo);
        else web.loadUrl("file:///android_asset/index.html");
        setContentView(web);
        telaCheia();
    }

    private void telaCheia() {
        if (Build.VERSION.SDK_INT >= 19) {
            // 0x1000 IMMERSIVE_STICKY | 0x4 FULLSCREEN | 0x2 HIDE_NAVIGATION | 0x200 LAYOUT_HIDE_NAVIGATION | 0x400 LAYOUT_FULLSCREEN | 0x100 LAYOUT_STABLE
            getWindow().getDecorView().setSystemUiVisibility(0x1000 | 0x4 | 0x2 | 0x200 | 0x400 | 0x100);
        }
    }

    @Override
    public void onWindowFocusChanged(boolean foco) {
        super.onWindowFocusChanged(foco);
        if (foco) telaCheia();
    }

    @Override
    protected void onSaveInstanceState(Bundle b) {
        super.onSaveInstanceState(b);
        web.saveState(b);
    }

    @Override
    protected void onPause() { super.onPause(); web.onPause(); }

    @Override
    protected void onResume() { super.onResume(); web.onResume(); telaCheia(); }

    // Botão voltar do celular = tecla Esc do jogo (fecha a janela aberta ou abre o menu).
    // Se o menu do jogo já está aberto, pergunta se quer sair.
    private static final String JS_VOLTAR =
            "(function(){var m=document.getElementById('menu');"
            + "if(m&&getComputedStyle(m).display!=='none')return 'menu';"
            + "dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));return 'ok';})()";

    @Override
    public void onBackPressed() {
        try {
            // evaluateJavascript existe no Android 4.4+; chamado assim para compilar com qualquer versão
            WebView.class.getMethod("evaluateJavascript", String.class, ValueCallback.class)
                    .invoke(web, JS_VOLTAR, new ValueCallback<String>() {
                        public void onReceiveValue(String r) {
                            if (r != null && r.contains("menu")) perguntaSair();
                        }
                    });
        } catch (Exception e) {
            perguntaSair();
        }
    }

    private void perguntaSair() {
        new AlertDialog.Builder(this)
                .setMessage("Sair do Mundo Vivo? Salve o mundo antes, se quiser continuar depois.")
                .setPositiveButton("Sair", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface d, int w) { finish(); }
                })
                .setNegativeButton("Continuar jogando", null)
                .show();
    }
}

/* =====================================================================
   v41 · CASAS 2.5D (módulo CASA25 do Bruno, sem mudanças)
   Casas com marca de povo passam a usar CASA25.draw: nível social (H.n40 1–9 → tier 0–8),
   povo (H.povo), variante (x*31 + y*17) % 3. Casas sem marca continuam iguais.
   Desligar: MV41.casa25 = false (volta o desenho da 40.1).
   ===================================================================== */
/* ===== v41 · CASA 2.5D · módulo independente =====
   CASA25.draw(ctx, X, Y, tier, people, variant, s) -> { w, h }
   X, Y : canto superior esquerdo, em unidades lógicas
   s    : escala inteira do pixel (ex.: 2 ou 3)
   tier : 0..8 (9 níveis sociais)
   people: "ingles" | "cigano" | "judeu" | "russo" | "brasileiro" | "americano"
   variant: (x*31 + y*17) % 3
*/
const CASA25 = (function () {
  // [SUGESTÃO] mapeamento dos 9 níveis para os 4 tipos visuais
  const VIS_OF_TIER = [0, 0, 1, 1, 1, 2, 2, 2, 3];
  const VIS = [
    { w: 10, h: 8,  d: 4,  floors: 1, roofH: 6,  door: [2, 3] },   // cabana
    { w: 12, h: 11, d: 6,  floors: 1, roofH: 7,  door: [2, 3] },   // casa
    { w: 16, h: 14, d: 8,  floors: 2, roofH: 9,  door: [2, 3] },   // casarão
    { w: 20, h: 18, d: 10, floors: 3, roofH: 11, door: [3, 4] }    // castelo
  ];
  const PEOPLE = {
    ingles:     { wall:'#c9a77a', wallSide:'#a8864f', roofA:'#8a5a34', roofB:'#6e4426', roofSide:'#5a3420', trim:'#4a3020', door:'#2e1c10', win:'#ffe08a', stone:'#8a8478', accent:'#e8b84a', extra:'#5a3420' },
    cigano:     { wall:'#c0593c', wallSide:'#8e3f2a', roofA:'#2f6b5a', roofB:'#24544a', roofSide:'#1f4a3e', trim:'#5b2a1a', door:'#2a1a14', win:'#ffd27a', stone:'#7a6a58', accent:'#e0a526', extra:'#c0392b' },
    judeu:      { wall:'#ece6d6', wallSide:'#c7bfae', roofA:'#3c4f86', roofB:'#2f3f6e', roofSide:'#24325a', trim:'#2f5fa8', door:'#2a3a5a', win:'#fff3c4', stone:'#a8a090', accent:'#2f5fa8', extra:'#ffffff' },
    russo:      { wall:'#8b5a3c', wallSide:'#6a422b', roofA:'#3b5563', roofB:'#2a3f4a', roofSide:'#20303a', trim:'#d94b4b', door:'#3a2010', win:'#ffe9a8', stone:'#6e6a62', accent:'#2f7fc0', extra:'#2f7fc0' },
    brasileiro: { wall:'#e7d9b8', wallSide:'#c9b890', roofA:'#b5532d', roofB:'#9a4424', roofSide:'#7d3a1e', trim:'#8a5a30', door:'#4a3020', win:'#5a8ac0', stone:'#9a8a70', accent:'#2c6fb0', extra:'#f2f2f2' },
    americano:  { wall:'#a86b3e', wallSide:'#84522b', roofA:'#5a5a64', roofB:'#4a4a54', roofSide:'#3e3e48', trim:'#eaeaea', door:'#2a2a30', win:'#fff0c0', stone:'#7a7a72', accent:'#3a6ea5', extra:'#8a3a2a' }
  };

  function draw(ctx, X, Y, tier, people, variant, s) {
    const V = VIS[VIS_OF_TIER[tier] ?? 0];
    const P = PEOPLE[people] || PEOPLE.ingles;
    const deg = tier % 3;                       // 0 simples, 1 moldura, 2 ornamento
    const W = V.w, H = V.h, D = V.d, RH = V.roofH;
    const fx = 2, fy = RH + 5;                  // fachada (coordenadas locais)
    const cx = fx + Math.floor(W / 2);
    const put = (x, y, w, h, c) => {
      ctx.fillStyle = c;
      ctx.fillRect((X + x) * s, (Y + y) * s, w * s, h * s);
    };

    // 1. sombra de contato e sombra projetada
    put(fx, fy + H, W + D, 1, 'rgba(20,12,4,.35)');
    put(fx + 1, fy + H + 1, W + D - 1, 1, 'rgba(20,12,4,.18)');

    // 2. parede lateral (3/4): sobe à direita conforme se afasta
    for (let i = 0; i < D; i++) put(fx + W + i, fy - Math.floor(i / 2), 1, H, P.wallSide);

    // 3. fachada, base de pedra e luz no topo
    put(fx, fy, W, H, P.wall);
    put(fx, fy, W, 1, 'rgba(255,255,255,.18)');
    put(fx, fy + H - 2, W, 2, P.stone);
    put(fx + W - 1, fy, 1, H - 2, 'rgba(0,0,0,.12)');

    // 4. marcas de povo sobre a parede (antes das janelas)
    if (people === 'ingles') {
      for (let t = 2; t < H - 4; t++) {
        const a = fx + Math.round(t * (W - 1) / (H - 1));
        put(a, fy + t, 1, 1, P.trim);
        put(fx + W - 1 - (a - fx), fy + t, 1, 1, P.trim);
      }
      put(fx, fy + 1, W, 1, P.trim);
    }
    if (people === 'judeu') put(fx, fy + 1, W, 1, P.trim);
    if (people === 'brasileiro') {
      for (let x = 0; x < W; x++) put(fx + x, fy + H - 4, 1, 1, x % 2 ? P.accent : P.extra);
    }

    // 5. telhado: telhas alternadas, lado em sombra à direita
    for (let r = 0; r < RH; r++) {
      const y = fy - 1 - r;
      let ins = variant === 1 ? r : (variant === 2 ? Math.floor(r * 0.5) : Math.floor(r * 0.7));
      ins = Math.min(ins, Math.floor(W / 2) - 1);
      const L = fx - 1 + ins, R = fx + W + 1 - ins;
      put(L, y, R - L, 1, r % 2 ? P.roofB : P.roofA);
      if (r % 3 === 2) put(L, y, R - L, 1, 'rgba(255,220,170,.12)');
      put(R, y, Math.floor(D / 2) + 1, 1, P.roofSide);
    }

    // 6. chaminé (variante 0, ou sempre no americano)
    if (variant === 0 || people === 'americano') {
      put(fx + W - 4, fy - RH - 2, 2, 4, people === 'americano' ? P.extra : P.stone);
    }

    // 7. janelas (com moldura a partir do degrau 1, flores no degrau 2)
    const nW = Math.max(1, Math.floor(W / 5));
    const doorW = V.door[0], doorH = V.door[1];
    const dx = cx - Math.floor(doorW / 2), dy = fy + H - doorH;
    for (let f = 0; f < V.floors; f++) {
      const wy = fy + 2 + f * Math.max(4, Math.floor((H - 2) / V.floors));
      for (let k = 0; k < nW; k++) {
        const wx = fx + Math.round((k + 0.5) * W / nW) - 1;
        if (f === 0 && wx < dx + doorW && wx + 2 > dx) continue;
        if (deg >= 1) put(wx - 1, wy - 1, 4, 4, P.trim);
        put(wx, wy, 2, 2, P.win);
        if (people === 'judeu') put(wx, wy - 1, 2, 1, P.trim);   // verga em arco simplificada
        if (deg === 2) put(wx - 1, wy + 3, 4, 1, P.accent);       // caixa de flores
      }
    }

    // 8. porta e detalhes de povo
    put(dx, dy, doorW, doorH, P.door);
    if (people === 'cigano') {
      put(dx - 1, dy - 1, doorW + 2, 1, P.extra);                // toldo
      for (let x = fx; x < fx + W; x += 2) put(x, fy - 1, 1, 1, P.accent); // bandeirolas
      put(cx, fy - RH - 2, 1, 2, P.extra);                       // pendão no topo
    }
    if (people === 'judeu') put(dx + doorW + 1, dy + 1, 1, 2, P.accent);   // mezuzá
    if (people === 'americano') {                                // alpendre
      put(fx - 1, fy + H - 7, W + 2, 1, P.roofSide);
      put(fx, fy + H - 6, 1, 6, P.trim);
      put(fx + W - 1, fy + H - 6, 1, 6, P.trim);
    }
    if (people === 'russo') {                                    // cúpula em bulbo
      const t = fy - RH;
      put(cx - 1, t - 3, 2, 1, P.accent);
      put(cx - 2, t - 2, 4, 1, P.accent);
      put(cx - 1, t - 1, 2, 1, P.accent);
      put(cx, t - 4, 1, 1, P.trim);
    }

    // 9. castelo: torreões nas quinas com ameias
    if (V.floors === 3) {
      put(fx - 2, fy - 3, 3, H + 3, P.wall);
      put(fx + W - 1, fy - 3, 3, H + 3, P.wall);
      for (let x = 0; x < 3; x += 2) {
        put(fx - 2 + x, fy - 4, 1, 1, P.stone);
        put(fx + W - 1 + x, fy - 4, 1, 1, P.stone);
      }
    }

    return { w: W + D + 4, h: fy + H + 3 };
  }

  return { draw, VIS, PEOPLE, VIS_OF_TIER };
})();
const MV41 = window.MV41 = Object.assign(window.MV41||{}, {casa25:true, CASA25});
const c25Cache = new Map();
function casa25Sprite(tier, people, variant, col){
 const key=tier+'|'+people+'|'+variant+'|'+(col||''); let cv=c25Cache.get(key); if(cv) return cv;
 const probe=mk(1,1).getContext('2d'), sz=CASA25.draw(probe,0,0,tier,people,variant,1);   // tamanho em pixels do desenho
 cv=mk(sz.w, sz.h); const g=cv.getContext('2d'); CASA25.draw(g,0,0,tier,people,variant,1);
 if(col){ g.fillStyle=col; g.fillRect(sz.w-3, sz.h-6, 2, 3); }                            // cor da vila (como nas outras casas)
 cv=hqUp(cv,true); c25Cache.set(key,cv); return cv;
}
{ const _ad=artDraw; artDraw=function(a,H){ if(!MV41.casa25||!artPovo(H)||!H.n40) return _ad(a,H);
  try{ const ow=villageById(state.cells[a].owner), img=casa25Sprite(Math.max(0,Math.min(8,H.n40-1)), H.povo, artVariant(a), ow?SHIRTS[ow.color]:null);
   const S=BUILDS[H.type].size||1, x=a%state.w, y=(a/state.w)|0, kk=cellPx*S*1.25/img.lw, w=img.lw*kk, h=img.lh*kk;
   const sx=(x+S/2-viewL)*cellPx, sy=(y+S-viewT)*cellPx; ctx.drawImage(hi4(img,kk),sx-w/2,sy-h+kk*3,w,h); H._scr=[sx,sy,w,h]; return true; }
  catch(err){ v31Err(err); return _ad(a,H); } }; }

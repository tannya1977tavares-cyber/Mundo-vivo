/* =====================================================================
   v41.2 · BAIRROS COM PÁTIOS INTERNOS (módulo BAIRROS do Bruno, sem mudanças)
   · A cidade é dividida em blocos de 9×9 com ruas de 1 pista entre eles (só em memória,
     NÃO vai no save). Cada bloco tem um povo e um pátio 3×3 no meio.
   · O chão e as ruas dos blocos são desenhados antes das casas. As ruas dos blocos contam
     como rua para quem anda na cidade (fase 6), então os NPCs usam as ruas desenhadas.
   · Casa dentro de um bloco é desenhada com o povo do bloco (CASA25).
   · O pátio mostra a festa (palco, bandeirola, fogueira) no dia de uma festa do povo do bloco.
   · Desligar: BAIRRO41.LIGADO=false
   ===================================================================== */
const BAIRROS = (function () {
  const TAM_BLOCO = 9;       // tiles por lado do bloco
  const RUA = 1;             // rua de terra, uma pista
  const PATIO = 3;           // pátio central do bloco (tiles)

  function rng(seed) {
    let s = seed >>> 0 || 1;
    return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
  }

  // 1. Divide a área quadrada da cidade em uma grade de blocos.
  function planejar(cidade) {
    const n = Math.max(1, Math.floor(cidade.raio * 2 / (TAM_BLOCO + RUA)));
    const r = rng(cidade.semente);
    const etnias = cidade.etnias && cidade.etnias.length ? cidade.etnias : ['ingles'];
    const blocos = [];
    const ini = cidade.x - Math.floor(n * (TAM_BLOCO + RUA) / 2);
    const iniY = cidade.y - Math.floor(n * (TAM_BLOCO + RUA) / 2);
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      // a praça ocupa o bloco central
      const central = (i === Math.floor(n / 2) && j === Math.floor(n / 2));
      if (central && n > 1) continue;
      blocos.push({
        x: ini + i * (TAM_BLOCO + RUA),
        y: iniY + j * (TAM_BLOCO + RUA),
        w: TAM_BLOCO, h: TAM_BLOCO,
        people: etnias[Math.floor(r() * etnias.length)],
        patio: { x: 3, y: 3, w: PATIO, h: PATIO }   // relativo ao bloco
      });
    }
    return blocos;
  }

  // 2. Festas do pátio: só ativas na data do ritual da etnia do bairro.
  function patioAtivo(bairro, dataAtual, rituais) {
    const r = rituais[bairro.people];
    if (!r) return null;
    return r.some(d => d.mes === dataAtual.mes && d.dia === dataAtual.dia) ? r[0] : null;
  }

  // 3. Desenho do pátio: piso, mesas e, se houver festa, palco e fogueira.
  function desenharPatio(ctx, bairro, ritual, s, X, Y) {
    const p = bairro.patio;
    const px = (X + p.x) * s, py = (Y + p.y) * s;
    ctx.fillStyle = '#b89a6a'; ctx.fillRect(px, py, p.w * s, p.h * s);   // piso de terra
    ctx.fillStyle = '#8a6f48';
    ctx.fillRect(px, py + (p.h - 1) * s, p.w * s, s);                    // borda
    if (!ritual) return;
    ctx.fillStyle = '#e8b84a'; ctx.fillRect(px + s, py + s, s, s);       // palco
    ctx.fillStyle = '#c0392b';
    ctx.fillRect(px + 2 * s, py + s, s, s);                              // bandeirola
    ctx.fillStyle = '#ff7a30';
    ctx.fillRect(px + s, py + 2 * s, s, s);                              // fogueira
  }

  return { planejar, patioAtivo, desenharPatio, rng };
})();

/* ---------- ligação com o jogo ---------- */
const BAIRRO41 = {LIGADO:true, REFAZ:1500, TINTA:.22, PASSO:10, MIN_CIDADE:12};   // REFAZ em ms reais · bloco ativo: tem casa da vila ou 12 células da cidade
const bairroPlanos41 = new Map();                                                    // vid -> plano (só em memória)
/* entrada do módulo: { x, y, raio, semente, etnias[] }. A vila não tem semente: vem do id. */
function cidadeBairro41(v){
 let ext=v.R||4; const W=state.w;
 for(const i of v.region||[]){ const d=Math.max(Math.abs(i%W-v.cx),Math.abs(((i/W)|0)-v.cy)); if(d>ext) ext=d; }
 let n=Math.ceil((2*ext+1)/BAIRRO41.PASSO); if(n%2===0) n++;                         // número ímpar de blocos: a praça fica no meio
 const B=(v.e40&&v.e40.bairros)||[], peso=b=>Math.max(0,(b.a1-b.a0)||1), tot=B.reduce((s,b)=>s+peso(b),0)||1, etnias=[];
 for(const b of B){ const k=Math.max(1,Math.round(6*peso(b)/tot)), pv=etniaById(b.et).povo; for(let j=0;j<k;j++) etnias.push(pv); }   // bairro maior (fase 5) = mais blocos
 if(!etnias.length && v.e40) etnias.push(etniaById(v.e40.et).povo);
 return {x:v.cx, y:v.cy, raio:n*BAIRRO41.PASSO/2, semente:v.semente!=null?v.semente:(Math.imul(v.id+1,2654435761)>>>0), etnias, n};
}
const ruaBloco41 = c => c.build==='floor'||c.build==='gate'||c.build==='door'||c.build==='bridge';
function planoBairro41(v, forca){
 let P=bairroPlanos41.get(v.id); const agora=performance.now();
 if(P&&P.v===v&&!forca&&agora-P.t<BAIRRO41.REFAZ) return P;
 const cid=cidadeBairro41(v), key=cid.n+'|'+cid.etnias.join(',')+'|'+cid.semente+'|'+v.cx+','+v.cy;
 const blocos=(P&&P.v===v&&P.key===key)?P.blocos:BAIRROS.planejar(cid);
 const W=state.w, Hh=state.h, n=cid.n, L=BAIRRO41.PASSO*n, ini=v.cx-Math.floor(L/2), iniY=v.cy-Math.floor(L/2);
 const reg=new Set(v.region||[]), roca=new Set(v.fields||[]);
 for(const f of v.farms||[]) if(Array.isArray(f)) roca.add(f[1]*W+f[0]);
 for(const p of v.plots||[]) if(p.stage==='farm') for(const i of p.region||[]) roca.add(i);
 const ok=(x,y)=>x>=0&&y>=0&&x<W&&y<Hh;
 /* bloco ativo e pátio num lugar livre (sem casa) dentro do bloco */
 const grid={};
 const anc=new Set(); for(const a in state.houses) if(state.cells[a]&&state.cells[a].owner===v.id) anc.add(+a);
 for(const b of blocos){ let nc=0, casa=false;
  for(let y=b.y;y<b.y+b.h;y++) for(let x=b.x;x<b.x+b.w;x++) if(ok(x,y)){ const i=y*W+x; if(reg.has(i)) nc++; if(anc.has(i)) casa=true; }
  b.ativo=casa||nc>=BAIRRO41.MIN_CIDADE;                                           // bloco com casa da vila ou com um pedaço da cidade
  const livre=(ox,oy,arv)=>{ for(let y=0;y<3;y++) for(let x=0;x<3;x++){ const X=b.x+ox+x, Y=b.y+oy+y; if(!ok(X,Y)) return false; const i=Y*W+X, c=state.cells[i];
    if(c.water||roca.has(i)||(c.build&&!ruaBloco41(c))||(!arv&&c.tree)) return false; } return true; };
  let best=null, bd=1e9;
  for(const arv of [false,true]){ for(let oy=0;oy<=b.h-3;oy++) for(let ox=0;ox<=b.w-3;ox++){ const d=Math.abs(ox-3)+Math.abs(oy-3); if(d<bd&&livre(ox,oy,arv)){ bd=d; best=[ox,oy]; } } if(best) break; }
  b.patio=best?{x:best[0],y:best[1],w:3,h:3}:{x:3,y:3,w:3,h:3}; b.patioLivre=!!best;      // sem lugar livre: fica no meio (as casas tampam)
  grid[Math.round((b.x-ini)/BAIRRO41.PASSO)+','+Math.round((b.y-iniY)/BAIRRO41.PASSO)]=b; }
 /* classes de chão: 1 rua do bloco, 2 chão do bloco, 3 borda do bloco · ruas viram caminho (fase 6) */
 const cls=new Uint8Array(L*L), livres=[];
 for(let ly=0;ly<L;ly++) for(let lx=0;lx<L;lx++){ const x=ini+lx, y=iniY+ly; if(!ok(x,y)) continue; const i=y*W+x, c=state.cells[i];
  if(c.water||roca.has(i)) continue;
  const mx=lx%BAIRRO41.PASSO, my=ly%BAIRRO41.PASSO, b=grid[((lx/BAIRRO41.PASSO)|0)+','+((ly/BAIRRO41.PASSO)|0)];
  if(mx===BAIRRO41.PASSO-1||my===BAIRRO41.PASSO-1){ let viz=false;                 // rua: só ao lado de um bloco ativo
   for(let dy=-1;dy<=1&&!viz;dy++) for(let dx=-1;dx<=1&&!viz;dx++){ const qx=lx+dx, qy=ly+dy; if(qx<0||qy<0||qx>=L||qy>=L||qx%BAIRRO41.PASSO===BAIRRO41.PASSO-1||qy%BAIRRO41.PASSO===BAIRRO41.PASSO-1) continue;
    const q=grid[((qx/BAIRRO41.PASSO)|0)+','+((qy/BAIRRO41.PASSO)|0)]; if(q&&q.ativo) viz=true; }
   if(viz&&(!c.build||ruaBloco41(c))&&!c.tree){ cls[ly*L+lx]=1; livres.push(i); } continue; }
  if(!b||!b.ativo) continue;
  const px=mx-b.patio.x, py=my-b.patio.y; if(px>=0&&py>=0&&px<3&&py<3&&!c.build) livres.push(i);
  cls[ly*L+lx]=(mx===0||my===0||mx===b.w-1||my===b.h-1)?3:2; }
 const igual=P&&P.v===v&&P.cls&&P.cls.length===cls.length&&P.cls.every((q,k)=>q===cls[k])&&P.blocos===blocos;
 P={v, key, t:agora, blocos, grid, n, L, ini, iniY, cls, livres, cv:igual?P.cv:null};
 bairroPlanos41.set(v.id,P); return P;
}
/* desenho do chão e das ruas (4 pixels por quadrado, feito de novo só quando muda) */
function chaoBairro41(P){
 if(P.cv) return P.cv; const L=P.L, K=4, cv=mk(L*K,L*K), g=cv.getContext('2d');
 for(let ly=0;ly<L;ly++) for(let lx=0;lx<L;lx++){ const q=P.cls[ly*L+lx]; if(!q) continue;
  if(q===1){ g.fillStyle='#a8875a'; g.fillRect(lx*K,ly*K,K,K); g.fillStyle='#94754c'; if((lx*7+ly*13)%5===0) g.fillRect(lx*K+1,ly*K+2,1,1); continue; }
  const b=P.grid[((lx/BAIRRO41.PASSO)|0)+','+((ly/BAIRRO41.PASSO)|0)], pal=CASA25.PEOPLE[b.people]||CASA25.PEOPLE.ingles;
  g.globalAlpha=BAIRRO41.TINTA; g.fillStyle=pal.wall; g.fillRect(lx*K,ly*K,K,K); g.globalAlpha=1;
  if(q===3){ const mx=lx%BAIRRO41.PASSO, my=ly%BAIRRO41.PASSO; g.fillStyle=pal.wallSide; g.globalAlpha=.75;     // mureta baixa em volta do bloco
   if(mx===0) g.fillRect(lx*K,ly*K,2,K); if(mx===b.w-1) g.fillRect(lx*K+K-2,ly*K,2,K); if(my===0) g.fillRect(lx*K,ly*K,K,2); if(my===b.h-1) g.fillRect(lx*K,ly*K+K-2,K,2); g.globalAlpha=1; } }
 return P.cv=cv;
}
function rituais41(C){ const R={};
 for(const F of FESTAS){ const pv=etniaById(F.et).povo, L=R[pv]||(R[pv]=[]);
  if(F.data) L.push({mes:F.data.m, dia:F.data.d, id:F.id, e:F.e});
  else if(F.semanal&&semanalAgora40(F,C)) L.push({mes:C.m, dia:C.d, id:F.id, e:F.e}); }   // festa semanal (Shabat): conta como "hoje" enquanto acontece
 return R; }
function desenhaBairros41(now){
 if(!BAIRRO41.LIGADO||cellPx<3) return;
 const C=cal(), data={mes:C.m, dia:C.d}, RIT=rituais41(C);
 for(const v of state.villages){ if(v.stage==='fire') continue;
  const P=planoBairro41(v), x0=(P.ini-viewL)*cellPx, y0=(P.iniY-viewT)*cellPx, w=P.L*cellPx;
  if(x0>canvasW||y0>canvasH||x0+w<0||y0+w<0) continue;
  ctx.imageSmoothingEnabled=false; ctx.drawImage(chaoBairro41(P),x0,y0,w,w);
  for(const b of P.blocos){ if(!b.ativo) continue; const X=b.x-viewL, Y=b.y-viewT;
   if((X+b.w)*cellPx<0||(Y+b.h)*cellPx<0||X*cellPx>canvasW||Y*cellPx>canvasH) continue;
   const rit=BAIRROS.patioAtivo(b,data,RIT); b.festa=rit;
   BAIRROS.desenharPatio(ctx,b,rit,cellPx,X,Y); } }
}
{ const _g=v28Ground; v28Ground=function(now){ try{ desenhaBairros41(now); }catch(err){ v31Err(err); } return _g.apply(this,arguments); }; }
/* povo usado no desenho da casa: o do bloco onde ela está */
function blocoDe41(v,x,y){ const P=bairroPlanos41.get(v.id); if(!P||P.v!==v) return null; const lx=x-P.ini, ly=y-P.iniY; if(lx<0||ly<0||lx>=P.L||ly>=P.L) return null;
 if(lx%BAIRRO41.PASSO===BAIRRO41.PASSO-1||ly%BAIRRO41.PASSO===BAIRRO41.PASSO-1) return null; const b=P.grid[((lx/BAIRRO41.PASSO)|0)+','+((ly/BAIRRO41.PASSO)|0)]; return b&&b.ativo?b:null; }
function povoDesenho41(a,H){ if(!BAIRRO41.LIGADO) return H.povo; try{ const v=villageById(state.cells[a].owner); if(!v) return H.povo;
  const S=BUILDS[H.type].size||1, b=blocoDe41(v,a%state.w+(S>>1),((a/state.w)|0)+(S>>1)); return b?b.people:H.povo; }catch(err){ return H.povo; } }
/* ruas e pátios dos blocos contam como caminho para quem anda na cidade (fase 6) */
{ const _rm=ruaMask40; ruaMask40=function(){ _rm.apply(this,arguments); if(!BAIRRO41.LIGADO||!rua40) return;
  for(const v of state.villages){ if(v.stage==='fire') continue; const P=planoBairro41(v); for(const i of P.livres) rua40[i]=0; } }; }
/* planeja na criação e no carregamento */
{ const _fv=foundVillage; foundVillage=function(){ const r=_fv.apply(this,arguments); try{ const v=state.villages[state.villages.length-1]; if(r&&v) planoBairro41(v,true); }catch(err){ v31Err(err); } return r; }; }
{ const _ld=load; load=function(){ const r=_ld.apply(this,arguments); try{ bairroPlanos41.clear(); for(const v of state.villages) planoBairro41(v,true); }catch(err){ v31Err(err); } return r; }; }
{ const _gw=generateWorld; generateWorld=function(){ bairroPlanos41.clear(); return _gw.apply(this,arguments); }; }
Object.assign(window.MV41, {BAIRROS, BAIRRO41, bairroPlanos41, planoBairro41, rituais41, povoDesenho41, blocoDe41, cidadeBairro41, FESTAS, etniaById, bairros40, calDate, calDateIdx, calHour, cal});

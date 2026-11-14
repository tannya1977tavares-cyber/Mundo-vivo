/* =====================================================================
   v40 · FASE 6 · RUAS SÓ DENTRO DAS CIDADES (decisão do Bruno)
   Dentro da cidade, o chão público que não é rua (grama entre as ruas) fica caro
   para andar: o caminho prefere as ruas. Lotes, roças, casas, campo, mina e floresta
   continuam livres para o trabalho.
   ===================================================================== */
const RUA40 = {CUSTO:20, REFAZ:2};          // custo extra fora da rua dentro da cidade · refaz o mapa a cada 2 s de jogo
let rua40=null, rua40T=0;
const ehRua40 = c => c.terrain==='trampled'||c.terrain==='paved'||c.build==='floor'||c.build==='bridge'||c.build==='gate'||c.build==='door';
function ruaMask40(){
 const N=state.w*state.h; if(!rua40||rua40.length!==N) rua40=new Uint8Array(N); else rua40.fill(0);
 for(const v of state.villages){ if(v.stage==='fire') continue;
  const priv=new Set(v.road||[]); for(const p of v.plots||[]) for(const i of p.region||[]) priv.add(i);
  for(const i of v.fields||[]) priv.add(i); for(const f of v.farms||[]) if(Array.isArray(f)) priv.add(idx(f[0],f[1]));
  for(const [gx,gy] of v.gates||[]) for(let dy=-1;dy<=1;dy++) for(let dx=-1;dx<=1;dx++) priv.add(idx(gx+dx,gy+dy)); // a entrada do portão conta como rua
  for(const i of v.region||[]){ if(priv.has(i)) continue; const c=state.cells[i]; if(!c||c.build||c.water||ehRua40(c)) continue; rua40[i]=1; } }
}
let rua40Alvo=null; // [tx,ty] do caminho sendo calculado: só o destino (e a volta dele) pode ser chão público
{ const _sc=stepCost; stepCost=function(e,x,y,bv){ const s=_sc(e,x,y,bv);
  if(s>0&&rua40&&e&&e.sp==='human'&&e.id!==state.playerId&&rua40[y*state.w+x]){
   if(rua40Alvo&&Math.max(Math.abs(x-rua40Alvo[0]),Math.abs(y-rua40Alvo[1]))>rua40Alvo[2]) return -1;  // custo infinito fora da rua
   return s*RUA40.CUSTO; }
  return s; }; }
/* se não existir caminho só por rua (lote ou destino isolado), calcula de novo sem a regra, para ninguém ficar preso */
{ const _fp=findPath; findPath=function(e,tx,ty){ if(!rua40||!e||e.sp!=='human') return _fp.apply(this,arguments);
  rua40Alvo=[tx,ty,arguments[3]?1:0]; let p; try{ p=_fp.apply(this,arguments); } finally{ rua40Alvo=null; }
  if(!p){ p=_fp.apply(this,arguments);
   if(p){ rua40Fora++; for(const [px,py] of p){ const x=Math.floor(px), y=Math.floor(py), i=y*state.w+x; if(!rua40[i]) continue; // não havia rua: a cidade abre uma rua de terra batida ali
     const c=state.cells[i]; c.terrain='trampled'; c.grass=0; rua40[i]=0; markDirty(x,y); rua40Abertas++; } } }
  return p; }; }
let rua40Abertas=0;
let rua40Fora=0;
/* passeio sem caminho (andar à toa): dentro da cidade, não pisa no chão público fora da rua */
{ const _pa=passable; passable=function(e,fx,fy){ const r=_pa(e,fx,fy); if(!r||!rua40||!e||e.sp!=='human'||e.path||e.id===state.playerId) return r;
  const x=Math.floor(fx), y=Math.floor(fy); if(x<0||y<0||x>=state.w||y>=state.h||!rua40[y*state.w+x]) return r;
  const ex=Math.floor(e.x), ey=Math.floor(e.y); return !!rua40[ey*state.w+ex]; }; } // já está no chão público: deixa sair
{ const _uw=updateWorld; updateWorld=function(dt){ _uw(dt); rua40T+=dt; if(rua40T>=RUA40.REFAZ||!rua40){ rua40T=0; try{ ruaMask40(); }catch(err){ v31Err(err); } } }; }
/* passeio, brincadeira e ronda com destino no chão público: o destino vai para a rua mais perto */
const TAREFA_LIVRE40 = new Set(['idle']);
function ruaPerto40(x,y,R=8){ let best=null, bd=1e9; for(let dy=-R;dy<=R;dy++) for(let dx=-R;dx<=R;dx++){ const nx=x+dx, ny=y+dy; if(nx<0||ny<0||nx>=state.w||ny>=state.h) continue;
  const c=state.cells[ny*state.w+nx]; if(!c.reg||!ehRua40(c)) continue; const d=dx*dx+dy*dy; if(d<bd){ bd=d; best=[nx,ny]; } } return best; }
{ const _st=setTask; setTask=function(e,t,v){ try{ if(t&&t.x!=null&&rua40&&e&&e.sp==='human'&&TAREFA_LIVRE40.has(t.t)&&rua40[t.y*state.w+t.x]){ const r=ruaPerto40(t.x,t.y); if(r){ t.x=r[0]; t.y=r[1]; t.adj=false; } } }catch(err){ v31Err(err); }
  return _st.apply(this,arguments); }; }
Object.assign(window.MV40, {RUA40, ruaMask40, rua40:()=>rua40, semCaminhoPorRua:()=>rua40Fora, ruasAbertas:()=>rua40Abertas});

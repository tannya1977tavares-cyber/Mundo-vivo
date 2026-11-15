/* =====================================================================
   v40 · FASES 1 a 5 · POVOS NAS CIDADES, SAVE v10, DADOS DE ETNIA,
   9 NÍVEIS SOCIAIS E BAIRROS
   Regras: nenhum povo tem traço negativo próprio; traços (intolerante,
   aceita mistura) são de cada pessoa, sorteados igual para todos os povos.
   Ninguém é expulso; o rei só decide quem entra e como são os bairros.
   ===================================================================== */
/* ---------- FASE 3 · modelo de dados (só dados: ativar o slot 5 = trocar ativa para true) ---------- */
const ETNIAS = [
 {id:'ingles', nome:'Ingleses', ativa:true, povo:'ingles', paleta:PEOPLES.ingles.pal, marca:PEOPLES.ingles.mark,
  roupas:{base:'#6b4f3a', nivel_pobre:'#6b5a48', nivel_medio:'#355c3a', nivel_rico:'#7a2e2e'}, layout:'muralha',
  ritual:'Culto de domingo na igreja', diferencial:'Mercado semanal na praça', construcoes_proprias:['igreja'],
  nomes:{M:['John','William','Thomas','Henry','Edward','Richard','George','Arthur'],F:['Mary','Alice','Elizabeth','Margaret','Anne','Emma','Jane','Catherine']}},
 {id:'romani', nome:'Ciganos (Romani)', ativa:true, povo:'cigano', paleta:PEOPLES.cigano.pal, marca:PEOPLES.cigano.mark,
  roupas:{base:'#a8324a', nivel_pobre:'#8a4a2a', nivel_medio:'#2f6a8a', nivel_rico:'#e0a526'}, layout:'roda',
  ritual:'Círculo de fogueira com música', diferencial:'Ferreiros, músicos e criadores de cavalos', construcoes_proprias:['circulo_fogueira'],
  nomes:{M:['Django','Mihai','Stefan','Luca','Marko','Nicolae','Tobar','Emil'],F:['Mirela','Esmeralda','Lavinia','Rada','Sara','Florina','Zora','Ilona']}},
 {id:'judeu', nome:'Judeus', ativa:true, povo:'judeu', paleta:PEOPLES.judeu.pal, marca:PEOPLES.judeu.mark,
  roupas:{base:'#2a2f3a', nivel_pobre:'#4a3a5a', nivel_medio:'#34406a', nivel_rico:'#e6e0d0'}, layout:'compacto',
  ritual:'Shabat semanal e festas do ano', diferencial:'Estudo e ajuda mútua', construcoes_proprias:['sinagoga','casa_estudo'],
  nomes:{M:['David','Isaac','Samuel','Jacob','Daniel','Aaron','Levi','Benjamin'],F:['Sara','Raquel','Lea','Rebeca','Miriam','Ester','Ana','Judite']}},
 {id:'brasileiro', nome:'Brasileiros', ativa:true, povo:'brasileiro', paleta:PEOPLES.brasileiro.pal, marca:PEOPLES.brasileiro.mark,
  roupas:{base:'#2f8a5a', nivel_pobre:'#7a5a40', nivel_medio:'#3a6ac8', nivel_rico:'#e8c84a'}, layout:'aberto',
  ritual:'Festas de santo e de roda', diferencial:'Mutirão e acolhida', construcoes_proprias:['igreja_barroca','feira'],
  nomes:{M:['João','Pedro','Lucas','Bento','Caio','Davi','Heitor','Tiago'],F:['Ana','Maria','Júlia','Clara','Helena','Rosa','Marina','Cecília']}},
 /* slot 5: reservado (russos ou americanos). Para ativar: ativa:true (e trocar povo para 'americano' se quiser americanos) */
 {id:'slot5', nome:'Russos', ativa:false, povo:'russo', paleta:PEOPLES.russo.pal, marca:PEOPLES.russo.mark,
  roupas:{base:'#8a2a2a', nivel_pobre:'#6a4026', nivel_medio:'#3a4a6a', nivel_rico:'#e6e0d0'}, layout:'aberto',
  ritual:'', diferencial:'', construcoes_proprias:[],
  nomes:{M:['Ivan','Pavel','Dmitri','Mikhail','Alexei','Sergei','Yuri','Boris'],F:['Olga','Anna','Irina','Natalia','Sofia','Vera','Tatiana','Elena']}}
];
const etniaById = id => ETNIAS.find(t=>t.id===id) || ETNIAS[0];
const etniasAtivas = () => ETNIAS.filter(t=>t.ativa);
const E40 = {MOEDA_VALOR:10, VENDA_CASA:.7, HISTERESE:.1, TICK:1, VILAS_POR_TICK:2};
const e40 = () => (state.e40 ||= {ver:1});
const P40 = e => (e.w7 && e.w7.e40) || null;                      // dados da pessoa
const etDe = e => (P40(e)||{}).et || 'ingles';

/* ---------- FASE 1 · atribuir povo a pessoas, vilas e casas ---------- */
const TOL = ['intolerante','aceita','neutro'];
function sorteiaTol(){ const r=Math.random(); return r<.2?'intolerante':r<.6?'aceita':'neutro'; } // igual para todos os povos
function daPovo(e, et){ W7(e).e40 = {et, tol:sorteiaTol()}; }
/* mundo novo: povos por região do mapa (vizinhos tendem a ser do mesmo povo) */
function povosDoMundo(){
 const at=etniasAtivas(); if(!at.length) return;
 const H=state.ents.filter(e=>e.sp==='human'); if(!H.length) return;
 // sementes bem espalhadas: cada povo começa num grupo de gente diferente (quem está junto fica do mesmo povo)
 const pts=[H[(Math.random()*H.length)|0]];
 while(pts.length<at.length){ let best=null, bd=-1; for(const e of H){ const d=Math.min(...pts.map(p=>Math.hypot(p.x-e.x,p.y-e.y))); if(d>bd&&!pts.includes(e)){ bd=d; best=e; } } if(!best) break; pts.push(best); } // poucos grupos: o casal pode ficar misto
 const ord=at.slice().sort(()=>Math.random()-.5), seeds=pts.map((p,i)=>({t:ord[i],x:p.x,y:p.y,e:p}));
 for(const e of H){ let best=seeds[0], bd=1e9; for(const s of seeds){ const d=Math.hypot(e.x-s.x,e.y-s.y); if(d<bd){ bd=d; best=s; } }
  if(seeds.some(s=>s.e===e)) best=seeds.find(s=>s.e===e);
  daPovo(e,best.t.id); const N=best.t.nomes&&best.t.nomes[e.sex]; if(N&&N.length) e.name=N[(Math.random()*N.length)|0]; }
}
const pend40 = [];
{ const _sp=spawn; spawn=function(sp){ const e=_sp.apply(this,arguments); if(e&&sp==='human') pend40.push(e); return e; }; }
function povoNascido(e){
 if(P40(e)) return;
 const ps=(e.parents||[]).map(id=>byId.get(id)).filter(Boolean);
 if(ps.length){ daPovo(e, etDe(ps[(Math.random()*ps.length)|0])); return; }        // filho: povo do pai ou da mãe (50/50)
 const v=e.vid?villageById(e.vid):null;
 if(v&&v.e40){ daPovo(e, v.e40.et); return; }
 let best=null, bd=1e9; for(const o of state.villages){ if(!o.e40) continue; const d=Math.hypot(o.cx-e.x,o.cy-e.y); if(d<bd){ bd=d; best=o; } }
 const at=etniasAtivas(); daPovo(e, best?best.e40.et:(at[(Math.random()*at.length)|0]||ETNIAS[0]).id);
}
{ const _gw=generateWorld; generateWorld=function(){ pend40.length=0; state.e40=null; const r=_gw.apply(this,arguments); try{ e40(); povosDoMundo(); }catch(err){ v31Err(err); } return r; }; }
/* vila nova: povo do rei */
{ const _fv=foundVillage; foundVillage=function(a,b){ const n=state.villages.length, r=_fv.apply(this,arguments);
  try{ if(r&&state.villages.length>n){ const v=state.villages[state.villages.length-1], k=byId.get(v.king); if(k) povoNascido(k); v.e40={et:k?etDe(k):'ingles', bairros:null}; bairros40(v); } }catch(err){ v31Err(err); }
  return r; }; }
/* casa nova de uma vila: recebe o povo do bairro onde fica */
{ const _sb=setBuild; setBuild=function(x,y,type,owner){ _sb.apply(this,arguments);
  try{ const a=idx(x,y), H=state.houses[a], v=owner?villageById(owner):null;
   if(H&&ART_LEVEL[type]&&v&&v.e40&&!H.povo){ const et=etDoBairro(v,x,y); H.et=et; H.povo=etniaById(et).povo; } }catch(err){ v31Err(err); } }; }

/* ---------- FASE 4 · 9 níveis sociais (dinheiro da família → nível → tipo visual) ---------- */
const NIVEIS = [null,
 {n:'Pobre baixa', min:0,     tipo:'cabana'}, {n:'Pobre média', min:100,  tipo:'cabana'}, {n:'Pobre alta', min:250,  tipo:'casa'},
 {n:'Média baixa', min:500,   tipo:'casa'},   {n:'Média média', min:1000, tipo:'casa'},   {n:'Média alta', min:2000, tipo:'casarao'},
 {n:'Rica baixa',  min:4000,  tipo:'casarao'},{n:'Rica média',  min:8000, tipo:'casarao'},{n:'Rica alta',  min:15000,tipo:'castelo'}];
/* preço de subir para um tipo visual maior (em dinheiro); ao descer, a família vende e recebe VENDA_CASA (70%) */
const PRECO_TIPO = {cabana:0, casa:120, casarao:1200, castelo:8000};
const nivelPorDinheiro = d => { let n=1; for(let i=9;i>=1;i--) if(d>=NIVEIS[i].min){ n=i; break; } return n; };
function moradores40(v){ const M=new Map(); for(const e of members(v)){ if(!isAdultH(e)) continue; const a=homeOf(e,v); if(a<0||!state.houses[a]) continue; if(!M.has(a)) M.set(a,[]); M.get(a).push(e); } return M; }
const dinheiroFam = fam => fam.reduce((s,e)=>s+(e.coins||0),0)*E40.MOEDA_VALOR;
function pagaFam(fam, dinheiro){ let resta=dinheiro/E40.MOEDA_VALOR; const tot=fam.reduce((s,e)=>s+(e.coins||0),0)||1;
 for(const e of fam){ const p=Math.min(e.coins||0, resta*((e.coins||0)/tot)); e.coins=(e.coins||0)-p; } }
function recebeFam(fam, dinheiro){ const c=dinheiro/E40.MOEDA_VALOR/fam.length; for(const e of fam) e.coins=(e.coins||0)+c; }
function nivelTick(H, fam){
 const d=dinheiroFam(fam);
 if(!H.n40){ H.n40=nivelPorDinheiro(d); return 0; }            // primeira vez (e saves antigos): calcula pelo dinheiro
 let mud=0, n=H.n40;
 // sobe: alcança o mínimo do nível de cima; se o tipo visual aumenta, precisa ter também o preço (e paga)
 while(n<9){ const prox=NIVEIS[n+1], troca=prox.tipo!==NIVEIS[n].tipo, preco=troca?PRECO_TIPO[prox.tipo]:0;
  if(dinheiroFam(fam)>=prox.min+preco){ if(preco) pagaFam(fam,preco); n++; mud=1; } else break; }
 // desce: só abaixo do mínimo menos 10% (histerese); se o tipo visual diminui, vende e recebe 70%
 while(n>1 && dinheiroFam(fam) < NIVEIS[n].min*(1-E40.HISTERESE)){ const ant=NIVEIS[n-1], troca=ant.tipo!==NIVEIS[n].tipo;
  if(troca) recebeFam(fam, PRECO_TIPO[NIVEIS[n].tipo]*E40.VENDA_CASA); n--; mud=-1; }
 if(n!==H.n40){ const tipoAnt=NIVEIS[H.n40].tipo; H.n40=n; H.nT=(H.nT||0)+1; if(NIVEIS[n].tipo!==tipoAnt) H._art=1; }
 return mud;
}
/* a arte da casa segue o tipo visual do nível (casas marcadas) */
{ const _ad=artDraw; artDraw=function(a,H){ if(!artPovo(H)||!H.n40) return _ad(a,H);
  const T0=H.type, lv=NIVEIS[H.n40].tipo;
  const ow=villageById(state.cells[a].owner), img=houseArtSprite(lv,artVariant(a),H.povo,ow?SHIRTS[ow.color]:null);
  const S=BUILDS[T0].size||1, x=a%state.w, y=(a/state.w)|0, fit=Math.min(1,S*24*1.5/img.lw), kk=cellPx/24*fit, w=img.lw*kk, h=img.lh*kk;
  const sx=(x+S/2-viewL)*cellPx, sy=(y+S-viewT)*cellPx; ctx.drawImage(hi4(img,kk),sx-w/2,sy-h,w,h); H._scr=[sx,sy,w,h]; return true; }; }
/* a v27 também cobra moedas para melhorar casas: nas casas marcadas quem manda é a v40 (não cobra duas vezes) */
{ const _hd=v27HouseDaily; v27HouseDaily=function(){ const snap=[];
  try{ for(const v of state.villages){ if(!v.e40) continue; for(const [a,fam] of moradores40(v)){ const H=state.houses[a]; if(H&&H.povo) snap.push([H,H.cls,fam.map(e=>[e,e.coins])]); } } }catch(err){ v31Err(err); }
  const r=_hd.apply(this,arguments);
  for(const [H,c,cs] of snap){ H.cls=c; for(const [e,m] of cs) e.coins=m; }
  return r; }; }

/* ---------- FASE 5 · regra do rei e bairros ---------- */
function reiTol(v){ const k=byId.get(v.king); const p=k&&P40(k); return p?p.tol:'neutro'; }
function bairros40(v){
 if(!v.e40) return; const k=byId.get(v.king), etRei=k?etDe(k):v.e40.et, tol=reiTol(v);
 const cont={}; for(const e of members(v)) cont[etDe(e)]=(cont[etDe(e)]||0)+1;
 const ord=Object.entries(cont).sort((a,b)=>b[1]-a[1]);
 let B;
 if(tol==='intolerante'||!ord.length) B=[{et:etRei,p:1}];                                   // intolerante vence histórico misto
 else if(tol==='aceita') B=ord.map(([et,n])=>({et,p:n}));                                    // um bairro por povo
 else { B=[{et:ord[0][0],p:3}]; if(ord[1]) B.push({et:ord[1][0],p:1}); }                     // dominante + minoria menor
 const tot=B.reduce((s,b)=>s+b.p,0); let a0=-Math.PI;
 v.e40.bairros=B.map(b=>{ const a1=a0+2*Math.PI*b.p/tot, r={et:b.et,a0,a1,layout:etniaById(b.et).layout}; a0=a1; return r; });
 v.e40.et=v.e40.bairros[0].et===etRei||tol==='intolerante'?etRei:v.e40.bairros[0].et;
 v.e40.tol=tol;
 if(tol==='intolerante'){ const ep=etniaById(etRei).povo;                                  // a cidade inteira fica com a cara do povo do rei
  for(const as in state.houses){ const a=+as, H=state.houses[a]; if(H&&H.povo&&H.et!==etRei&&state.cells[a].owner===v.id){ H.et=etRei; H.povo=ep; markAround(a%state.w,(a/state.w)|0,BUILDS[H.type].size||1); } } }
}
function etDoBairro(v,x,y){ const B=v.e40&&v.e40.bairros; if(!B||!B.length) return v.e40?v.e40.et:'ingles';
 const ang=Math.atan2(y-v.cy,x-v.cx); for(const b of B) if(ang>=b.a0&&ang<b.a1) return b.et; return B[B.length-1].et; }
/* rei intolerante não aceita gente de outro povo morando na vila (ninguém é expulso; quem já mora fica) */
{ const _pu=pairUp; pairUp=function(a,b){
  try{ for(const h of [a,b]){ const v=h.vid?villageById(h.vid):null; if(!v||!v.e40||reiTol(v)!=='intolerante') continue;
    const etRei=etDe(byId.get(v.king)||h), outro=h===a?b:a; if(outro.vid!==v.id&&etDe(outro)!==etRei){ return false; } } }catch(err){ v31Err(err); }
  return _pu.apply(this,arguments); }; }

/* ---------- tick lento: 1 s de jogo, poucas vilas por vez ---------- */
let t40=0, rr40=0;
function e40Tick(){
 for(const e of pend40.splice(0)) if(e.hp>0) povoNascido(e);
 const V=state.villages; if(!V.length) return;
 for(let i=0;i<Math.min(E40.VILAS_POR_TICK,V.length);i++){ const v=V[(rr40++)%V.length]; if(!v||!v.e40) continue;
  bairros40(v);
  for(const [a,fam] of moradores40(v)){ const H=state.houses[a]; if(!H) continue; if(nivelTick(H,fam)&&H._art){ H._art=0; markAround(a%state.w,(a/state.w)|0,BUILDS[H.type].size||1); } } }
}
{ const _uw=updateWorld; updateWorld=function(dt){ _uw(dt); t40+=dt; if(t40>=E40.TICK){ t40=0; try{ e40Tick(); }catch(err){ v31Err(err); } } }; }

/* ---------- FASE 2 · save v10: migração de saves antigos ---------- */
{ const _ld=load; load=function(data){ pend40.length=0; const r=_ld.apply(this,arguments);
  try{ if(!data||!(data.v>=10)||!data.e40){                       // save antigo: tudo inglês, nível pelo dinheiro (no tick)
    state.e40={ver:1, migrado:data?data.v:0};
    for(const e of state.ents) if(e.sp==='human'&&!P40(e)) W7(e).e40={et:'ingles',tol:'neutro'};
    for(const v of state.villages) if(!v.e40){ v.e40={et:'ingles',bairros:null}; bairros40(v); } }
   else state.e40=data.e40;
   for(const v of state.villages) if(v.e40) for(const [a,fam] of moradores40(v)){ const H=state.houses[a]; if(H&&!H.n40) nivelTick(H,fam); }
  }catch(err){ v31Err(err); }
  return r; }; }

/* ---------- painéis: povo da vila e da pessoa ---------- */
{ const _vi=villageInfo; villageInfo=function(){ _vi.apply(this,arguments); try{ const v=villageById(state.infoRef); if(!v||!v.e40) return;
  const B=(v.e40.bairros||[]).map(b=>`${etniaById(b.et).nome} (${Math.round((b.a1-b.a0)/(2*Math.PI)*100)}%)`).join(' · ');
  const tolN={intolerante:'só o próprio povo',aceita:'aceita mistura (bairros)',neutro:'povo principal e bairro menor'}[v.e40.tol||'neutro'];
  $('infoLines').insertAdjacentHTML('beforeend',`<div><b>🏘️ Povo:</b> ${etniaById(v.e40.et).nome} · <b>Rei:</b> ${tolN} · <b>Bairros:</b> ${B||'—'}</div>`); }catch(err){ v31Err(err); } }; }
{ const _ui=updateInfo; updateInfo=function(){ _ui.apply(this,arguments); try{ if(state.infoKind!=='ent') return; const e=byId.get(state.follow); if(!e||e.sp!=='human'||!P40(e)) return;
  const v=e.vid?villageById(e.vid):null, a=v?homeOf(e,v):-1, H=a>=0?state.houses[a]:null, el=$('infoLines'); if(!el||el.querySelector('.e40p')) return;
  el.insertAdjacentHTML('beforeend',`<div class="e40p"><b>🏘️ Povo:</b> ${etniaById(etDe(e)).nome}${P40(e).tol==='intolerante'?' · intolerante':P40(e).tol==='aceita'?' · aceita mistura':''}${H&&H.n40?` · <b>Família:</b> ${NIVEIS[H.n40].n}`:''}</div>`); }catch(err){ v31Err(err); } }; }

Object.assign(window.MV40, {ETNIAS, NIVEIS, E40, PRECO_TIPO, etDe, P40, bairros40, nivelTick, nivelPorDinheiro, etDoBairro, moradores40, povosDoMundo, pairUp:(a,b)=>pairUp(a,b)});

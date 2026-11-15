/* =====================================================================
   v40 · FASE 7 · NÔMADES E ACAMPAMENTOS
   Família sem casa (de qualquer povo; nomadismo é estado, não traço do povo)
   escolhe entre VIAJAR, ACAMPAR e ENTRAR NA CIDADE com pontuação ponderada.
   Acampamento que chega ao tamanho limite vira cidade (foundVillage).
   Dados: pessoa → w7.e40.nom = {m, x, y, c, t} · acampamentos → state.e40.acamps
   (os dois já são salvos; o save continua v10).
   ===================================================================== */
const NOM40 = {ESPERA:DAY*.1, REVER:DAY*.5, RAIO_CIDADE:80, RAIO_ACAMP:30, LIMITE:6, VIAGEM:[25,45], POR_TICK:4, DESCANSO:DAY*.25};
const acamps40 = () => (e40().acamps ||= []);
let nomId40 = 1, nomRR40 = 0;
/* v41: só quem já é de um grupo nômade (marca P40(e).nomade, de qualquer povo). Quem perde a casa na cidade fica lá como "falido" (bloco v41). */
const nomade41 = e => !!(e && e.w7 && e.w7.e40 && e.w7.e40.nomade);
/* "sem casa" nômade: adulto sem vila, que não é eremita, fazendeiro, guilda, salteador, mercenário nem o jogador */
const semCasa40 = e => e && e.sp==='human' && e.hp>0 && !e.vid && nomade41(e) && isAdultH(e) && e.id!==state.playerId && !e.raid &&
 !e.hermit && !e.guild && !e.bandit && !e.farmBoss && !e.merc && !e.gwork && !e.famOf && !e.farmKid && e.job==='livre' && !(e.w7&&(e.w7.av||e.w7.hid));
const nom40 = e => { const p=P40(e); return p&&p.nom||null; };
function familia40(e){ const pr=e.partner&&byId.get(e.partner); return pr&&semCasa40(pr)?[e,pr]:[e]; }
const nomeEt40 = e => (etniaById(etDe(e)).nome||'').toLowerCase();
/* admissão na cidade: a mesma regra da fase 5 (rei intolerante não recebe gente de outro povo; ninguém é expulso) */
function aceita40(v,fam){ if(!v.e40||reiTol(v)!=='intolerante') return true; const k=byId.get(v.king); const et=k?etDe(k):v.e40.et; return fam.every(h=>etDe(h)===et); }
function cidadePerto40(e,fam){
 let best=null, bd=1e9;
 for(const v of state.villages){ if(v.stage==='fire') continue; const d=Math.hypot(v.cx-e.x,v.cy-e.y); if(d>NOM40.RAIO_CIDADE||d>=bd) continue;
  if(members(v).length+fam.length>VCAP[Math.min(3,v.era||0)]-2) continue; if(!aceita40(v,fam)) continue; best=v; bd=d; }
 return best?{v:best,d:bd}:null;
}
function acampPerto40(e){ let best=null, bd=1e9; for(const A of acamps40()){ const d=Math.hypot(A.x-e.x,A.y-e.y); if(d<=NOM40.RAIO_ACAMP&&d<bd){ bd=d; best=A; } } return best?{A:best,d:bd}:null; }
/* pontuação ponderada (igual para todos os povos) */
function pontos40(e,fam){
 const cid=cidadePerto40(e,fam), ac=acampPerto40(e), r=()=>Math.random();
 const s={
  cidade: cid ? 2 + 1.5*(1-cid.d/NOM40.RAIO_CIDADE) + r() : 0,
  acampar: 1 + (ac ? .35*ac.A.m.length : 0) + (fam.length>1 ? .5 : 0) + r(),
  viajar: .8 + (!cid&&!ac ? .5 : 0) + r()
 };
 return {s, cid, ac};
}
function entraCidade40(fam,v){
 const p=fam.length>1&&v.stage==='grow'&&v.plots.length<40?createPlot(v):null;
 for(const h of fam){ Object.assign(h,{vid:v.id,born:0,plotId:p?p.id:0,task:null,path:null,freeSince:null}); h.look.c=v.color; h.job=needJob(v); P40(h).nom=null; }
}
function novoAcamp40(e){
 const f=findCell(e.x,e.y,6,(c,x,y)=>buildable(c)&&!c.reg&&!c.owner) || [Math.floor(e.x),Math.floor(e.y)];
 const A={id:nomId40++, x:f[0], y:f[1], m:[], et:etDe(e), t:state.time};
 while(acamps40().some(o=>o.id===A.id)) A.id=nomId40++;
 const c=cell(f[0],f[1]); if(c&&buildable(c)&&!c.reg){ setBuild(f[0],f[1],'fire',0); A.fogo=1; markAround(f[0],f[1],1); }
 acamps40().push(A); return A;
}
function decide40(e){
 const fam=familia40(e), {s,cid,ac}=pontos40(e,fam), ant=(nom40(e)||{}).dec;
 let m='viajar'; if(s.acampar>s[m]) m='acampar'; if(s.cidade>s[m]) m='cidade';
 const nome=e.name+(fam.length>1?' e família':''), pts=`viajar ${s.viajar.toFixed(1)} · acampar ${s.acampar.toFixed(1)} · cidade ${s.cidade.toFixed(1)}`;
 let txt='';
 if(m==='cidade'){ entraCidade40(fam,cid.v); txt=`🧭 ${nome} (sem casa, ${nomeEt40(e)}) decidiu ENTRAR NA CIDADE ${cid.v.name} — ${pts}`; }
 else if(m==='acampar'){ const A=ac?ac.A:novoAcamp40(e); for(const h of fam){ if(!A.m.includes(h.id)) A.m.push(h.id); P40(h).nom={m:'acampar',x:A.x,y:A.y,c:A.id,t:state.time}; }
  txt=`🧭 ${nome} (sem casa, ${nomeEt40(e)}) decidiu ACAMPAR${ac?' no acampamento de perto':' e acendeu uma fogueira'} (${A.m.length} no acampamento) — ${pts}`; }
 else { let tx=Math.floor(e.x), ty=Math.floor(e.y);
  for(let t=0;t<10;t++){ const ang=Math.random()*Math.PI*2, d=NOM40.VIAGEM[0]+Math.random()*(NOM40.VIAGEM[1]-NOM40.VIAGEM[0]); const x=Math.floor(e.x+Math.cos(ang)*d), y=Math.floor(e.y+Math.sin(ang)*d);
   if(inside(x,y)&&x>3&&y>3&&x<state.w-4&&y<state.h-4&&passable(e,x,y)&&!cell(x,y).reg){ tx=x; ty=y; break; } }
  for(const h of fam) P40(h).nom={m:'viajar',x:tx,y:ty,c:0,t:state.time};
  txt=`🧭 ${nome} (sem casa, ${nomeEt40(e)}) decidiu VIAJAR para longe — ${pts}`; }
 for(const h of fam){ const n=P40(h).nom; if(n) n.dec=m; }
 const L=e40(); L.dec=L.dec||{viajar:0,acampar:0,cidade:0}; L.dec[m]++;
 if(!(m==='viajar'&&ant==='viajar')) pushLog(txt, false);                     // viagem seguida de viagem: conta, mas não repete no log
 return m;
}
/* acampamento grande vira cidade */
function acampCidade40(A){
 const ad=A.m.map(id=>byId.get(id)).filter(h=>semCasa40(h)); if(ad.length<NOM40.LIMITE) return false;
 let a=null, b=null;
 for(const h of ad){ const pr=h.partner&&byId.get(h.partner); if(pr&&ad.includes(pr)){ a=h; b=pr; break; } }
 if(!a) for(const h of ad){ if(h.partner) continue; const o=ad.find(o=>o!==h&&!o.partner&&o.sex!==h.sex); if(o){ a=h; b=o; break; } }
 if(!a){ A.semCasal=1; return false; }
 if(m34Reinos()>=REINO32.MAX){ if(!A.vaga){ A.vaga=1; pushLog(`⛺ O acampamento já tem ${ad.length} adultos e espera vaga para virar cidade (o mundo já tem ${REINO32.MAX} reinos)`); } return false; } // limite de reinos da v32
 const n0=state.villages.length; if(!foundVillage(a,b)){ A.falhou=(A.falhou||0)+1; if(A.falhou%3===0) mudaAcamp40(A,ad); return false; }
 const v=state.villages[n0]||villageById(a.vid); if(!v) return false;
 const kids=state.ents.filter(k=>k.sp==='human'&&k.hp>0&&!k.vid&&!isAdultH(k)&&(k.parents||[]).some(p=>A.m.includes(p)));
 for(const h of ad.concat(kids)){ if(h===a||h===b) continue; Object.assign(h,{vid:v.id,born:0,plotId:0,task:null,path:null,freeSince:null}); h.look.c=v.color; if(isAdultH(h)) h.job=needJob(v); }
 for(const h of ad) if(P40(h)) P40(h).nom=null;
 fimAcamp40(A);
 const L=e40(); L.viraram=(L.viraram||0)+1;
 pushLog(`⛺➜🏘️ O acampamento cresceu (${ad.length} adultos) e virou a cidade ${v.name}`, true, {x:v.cx,y:v.cy});
 return true;
}
/* não cabe cidade aqui (perto da borda, da água ou de outra vila): o acampamento muda para mais perto do meio do mapa */
function mudaAcamp40(A,ad){
 const mx=state.w/2, my=state.h/2, d=Math.hypot(mx-A.x,my-A.y)||1, k=Math.min(1,22/d);
 const f=findCell(Math.round(A.x+(mx-A.x)*k),Math.round(A.y+(my-A.y)*k),6,(c,x,y)=>buildable(c)&&!c.reg&&!c.owner); if(!f) return;
 if(A.fogo){ const c=cell(A.x,A.y); if(c&&c.build==='fire'&&!c.reg){ clearBuild(A.x,A.y); markAround(A.x,A.y,1); } A.fogo=0; }
 A.x=f[0]; A.y=f[1]; setBuild(A.x,A.y,'fire',0); A.fogo=1; markAround(A.x,A.y,1);
 for(const h of ad){ const n=nom40(h); if(n&&n.c===A.id){ n.x=A.x; n.y=A.y; h.task=null; h.path=null; } }
 pushLog(`⛺ O acampamento não tinha espaço para virar cidade e mudou de lugar`);
}
function fimAcamp40(A){ const L=acamps40(), i=L.indexOf(A); if(i>=0) L.splice(i,1);
 if(A.fogo){ const c=cell(A.x,A.y); if(c&&c.build==='fire'&&!c.reg){ clearBuild(A.x,A.y); markAround(A.x,A.y,1); } } }
function nomadeTick(){
 // acampamentos: tira quem saiu ou morreu; o grande vira cidade; vazio some
 for(const A of acamps40().slice()){ A.m=A.m.filter(id=>{ const h=byId.get(id); const n=h&&nom40(h); return semCasa40(h)&&n&&n.c===A.id; });
  if(!A.m.length){ fimAcamp40(A); continue; } acampCidade40(A); }
 // famílias sem casa: poucas por passo
 const H=state.ents; if(!H.length) return; let n=0;
 for(let k=0;k<H.length&&n<NOM40.POR_TICK;k++){ const e=H[(nomRR40++)%H.length]; if(!semCasa40(e)||!P40(e)) continue;
  if(e.partner&&e.partner<e.id&&semCasa40(byId.get(e.partner))) continue;         // a família decide pelo de menor número
  const p=P40(e); if(p.semT==null){ p.semT=state.time; continue; }
  if(state.time-p.semT<NOM40.ESPERA) continue;
  const nm=p.nom;
  if(nm&&nm.m==='viajar'){ if(Math.hypot(nm.x-e.x,nm.y-e.y)>3){ if(state.time-nm.t<NOM40.REVER) continue; }   // ainda viajando
   else { if(nm.cheg==null) nm.cheg=state.time; if(state.time-nm.cheg<NOM40.DESCANSO) continue; } }          // chegou: descansa antes de decidir de novo
  if(nm&&nm.m==='acampar'&&state.time-nm.t<NOM40.REVER) continue;                              // acampado: revê de tempos em tempos
  if(nm&&nm.m==='acampar'){ const A=acamps40().find(a=>a.id===nm.c); const cid=A&&cidadePerto40(e,familia40(e)); if(A&&!cid){ for(const h of familia40(e)) P40(h).nom.t=state.time; continue; } if(A){ A.m=A.m.filter(id=>!familia40(e).some(h=>h.id===id)); } }
  n++; decide40(e);
 }
 for(const e of H) if(e.sp==='human'&&e.vid&&P40(e)){ const p=P40(e); if(p.semT!=null) p.semT=null; if(p.nom) p.nom=null; if(p.nomade) p.nomade=false; } // entrou numa cidade: deixou de ser nômade
}
/* andar conforme a decisão (fome, perigo e caça vêm antes: o pensamento normal roda primeiro) */
const PRIORIDADE40 = new Set(['flee','fight','hunt','eat','fruit','egg','brawl','rest','defend']);
{ const _ht=humanThink; humanThink=function(e){ const r=_ht.apply(this,arguments);
  try{ const n=e.sp==='human'&&!e.vid&&nom40(e);
   if(n&&semCasa40(e)){
    e.freeSince=state.time;                                                    // quem tem plano não vira eremita nem entra em guilda
    if(!(e.task&&PRIORIDADE40.has(e.task.t))&&e.mode!=='hunt'){
     const meu=e.task&&e.task.n40, d=Math.hypot(n.x+.5-e.x,n.y+.5-e.y);
     if(n.m==='viajar'){ if(d>2&&(!meu||!(e.path&&e.path.length))){ e.task={t:'idle',n40:1,label:'viajando (sem casa)'}; if(!goTo(e,n.x,n.y,true,9000)) n.t=state.time-NOM40.REVER+DAY*.1; } }
     else if(n.m==='acampar'){ if(d>4){ if(!meu||!(e.path&&e.path.length)){ e.task={t:'idle',n40:1,label:'indo para o acampamento'}; goTo(e,n.x,n.y,true); } }
      else if(!meu||!(e.path&&e.path.length)){ e.task={t:'idle',n40:1,label:'acampado'}; e.path=null; pickWander(e,3); } }
    } } }catch(err){ v31Err(err); }
  return r; }; }
{ const _t=e40Tick; e40Tick=function(){ _t(); try{ nomadeTick(); }catch(err){ v31Err(err); } }; }
Object.assign(window.MV40, {NOM40, acamps:()=>acamps40(), decide40, nomadeTick, semCasa40, acampCidade40, novoAcamp40});
/* casal que se forma no acampamento fica no acampamento (o acampamento cresce e depois vira cidade) */
{ const _pu=pairUp; pairUp=function(a,b){
  try{ const na=!a.vid&&nom40(a), nb=!b.vid&&nom40(b), A=na&&na.m==='acampar'?na:nb&&nb.m==='acampar'?nb:null;
   if(A&&!a.vid&&!b.vid&&!a.partner&&!b.partner){ const C=acamps40().find(c=>c.id===A.c);
    if(C){ for(const h of [a,b]){ if(!C.m.includes(h.id)) C.m.push(h.id); P40(h).nom={m:'acampar',x:C.x,y:C.y,c:C.id,t:state.time,dec:'acampar'}; h.task=null; h.path=null; }
     a.partner=b.id; b.partner=a.id; pushLog(`💞 ${a.name} e ${b.name} formaram uma família no acampamento (${C.m.length} no acampamento)`); return true; } } }catch(err){ v31Err(err); }
  return _pu.apply(this,arguments); }; }

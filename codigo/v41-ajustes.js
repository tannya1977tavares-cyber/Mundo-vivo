/* =====================================================================
   v41 · AJUSTES DO PLANO DE RELEASE (sobre a v40)
   · Nomadismo só para grupos que já são nômades: no mundo novo, um grupo de
     NOMADE41.GRUPO pessoas (de qualquer povo, sorteado pelo lugar) começa nômade;
     filho de nômade sem cidade nasce nômade; quem entra numa cidade deixa de ser.
   · Família sem casa DENTRO da cidade fica na cidade como "falida" (marca na pessoa,
     aparece no painel e no log). Ninguém é expulso.
   · Venda de casa: 70% (E40.VENDA_CASA, constante ajustável, já na fase 4).
   Dados novos só dentro de w7.e40 (já salvo): nomade, falida. O save continua v10.
   ===================================================================== */
const NOMADE41 = {GRUPO:4};
function semeiaNomades41(){
 const H=state.ents.filter(e=>e.sp==='human'&&e.hp>0&&!e.vid&&e.id!==state.playerId&&P40(e)); if(H.length<NOMADE41.GRUPO*2) return 0;
 const c=H[(Math.random()*H.length)|0], g=H.slice().sort((a,b)=>Math.hypot(a.x-c.x,a.y-c.y)-Math.hypot(b.x-c.x,b.y-c.y)).slice(0,NOMADE41.GRUPO);
 for(const e of g){ const p=P40(e); p.nomade=true; p.semT=state.time-NOM40.ESPERA; }    // já decide no primeiro passo
 e40().nomades0=g.length; return g.length;
}
{ const _gw=generateWorld; generateWorld=function(){ const r=_gw.apply(this,arguments); try{ semeiaNomades41(); }catch(err){ v31Err(err); } return r; }; }
/* filho de nômade que nasce sem cidade também é nômade */
{ const _pn=povoNascido; povoNascido=function(e){ const r=_pn.apply(this,arguments);
  try{ const ps=(e.parents||[]).map(id=>byId.get(id)).filter(Boolean); if(!e.vid&&ps.some(p=>nomade41(p))&&P40(e)) P40(e).nomade=true; }catch(err){ v31Err(err); } return r; }; }
/* dois nômades que se casam continuam nômades (a cidade nasce do acampamento, fase 7) */
{ const _pu=pairUp; pairUp=function(a,b){
  try{ if(!a.vid&&!b.vid&&nomade41(a)&&nomade41(b)&&!a.partner&&!b.partner&&!(nom40(a)&&nom40(a).m==='acampar')&&!(nom40(b)&&nom40(b).m==='acampar')){
    a.partner=b.id; b.partner=a.id; pushLog(`💞 ${a.name} e ${b.name} formaram uma família nômade`); return true; } }catch(err){ v31Err(err); }
  return _pu.apply(this,arguments); }; }
/* família falida: mora na cidade, mas está sem casa */
let fal41RR=0;
function falidaTick41(){
 const V=state.villages; if(!V.length) return; const v=V[(fal41RR++)%V.length]; if(!v||!v.e40) return;
 for(const e of members(v)){ const p=P40(e); if(!p||!isAdultH(e)||e.id===state.playerId) continue;
  const sem=homeOf(e,v)<0;
  if(!sem){ p.casa41=true; if(p.falida) p.falida=false; continue; }
  if(!p.falida){ p.falida=true; const pr=e.partner&&byId.get(e.partner);                 // quem acabou de chegar e espera a 1ª casa também conta, mas só avisa quem perdeu a casa
   if(p.casa41&&!(pr&&P40(pr)&&P40(pr).falida)) pushLog(`🏚️ A família de ${e.name} perdeu a casa e está falida em ${v.name}, mas continua morando na cidade`, false); }
 }
}
{ const _t=e40Tick; e40Tick=function(){ _t(); try{ falidaTick41(); }catch(err){ v31Err(err); } }; }
{ const _ui=updateInfo; updateInfo=function(){ _ui.apply(this,arguments); try{ if(state.infoKind!=='ent') return; const e=byId.get(state.follow); const p=e&&P40(e); if(!p) return; const el=$('infoLines'); if(!el||el.querySelector('.v41p')) return;
  const t=p.falida?'🏚️ Família falida (sem casa, mora na cidade)':p.nomade&&!e.vid?'🧭 Nômade'+(p.nom?` · ${p.nom.m==='acampar'?'acampado':'viajando'}`:''):''; if(t) el.insertAdjacentHTML('beforeend',`<div class="v41p">${t}</div>`); }catch(err){ v31Err(err); } }; }
Object.assign(window.MV40, {NOMADE41, semeiaNomades41, falidaTick41, nomade41});

/* =====================================================================
   v40 · FASE 8 · FESTAS COMO DADOS (id, data, efeito)
   Cada festa é uma linha da tabela FESTAS. Quem celebra são os moradores
   daquele povo, em qualquer cidade. Dados novos ficam em v.e40 (já salvo):
   fel (felicidade 0–100), coesao (0–100), prest (prestígio do rei), fd (último dia visto).
   Datas: o calendário do jogo (cal(): m 0=janeiro, d 1–31, wd 0=segunda … 6=domingo).
   ===================================================================== */
const FESTAS = [
 {id:'santa_sara', et:'romani',     nome:'Festa de Santa Sara Kali', e:'🌹', data:{m:4,d:24}, efeito:{fel:15}},
 {id:'shabat',     et:'judeu',      nome:'Shabat',                   e:'🕯️', semanal:{de:{wd:4,h:18}, ate:{wd:5,h:18}}, efeito:{pausa:true, coesao:5}},
 {id:'pessach',    et:'judeu',      nome:'Páscoa judaica (Pessach)', e:'🍷', data:{m:3,d:15}, efeito:{refeicao:true, coesao:5}},
 {id:'mastro',     et:'ingles',     nome:'Mastro de maio',           e:'🎀', data:{m:4,d:1},  efeito:{fel:10}},
 {id:'torneio',    et:'ingles',     nome:'Torneio de cavaleiros',    e:'🏇', data:{m:3,d:23}, efeito:{prestigio:10}},
 {id:'junina',     et:'brasileiro', nome:'Festa junina',             e:'🌽', data:{m:5,d:24}, efeito:{fel:15}},
 {id:'carnaval',   et:'brasileiro', nome:'Carnaval',                 e:'🎭', data:{m:1,d:15}, efeito:{fel:20}}
];
const FESTA_BASE = {fel:50, coesao:50, prest:0, VOLTA:1};   // felicidade e coesão voltam 1 ponto por dia para 50
const TRAB40 = new Set(['chop','mine','harvest','build','forge','fish','wall','pave','tower','reform','fcraft','fcollect','ffill','deliver','csell','hsell','trade','deposit','loadfood','study','fherd','feedherd']);
const lim40 = x => Math.max(0,Math.min(100,x));
const festaStat40 = v => { const E=v.e40; if(E.fel==null){ E.fel=FESTA_BASE.fel; E.coesao=FESTA_BASE.coesao; E.prest=FESTA_BASE.prest; } return E; };
const participantes40 = (v,et) => members(v).filter(e=>etDe(e)===et);
/* Shabat (ou outra festa semanal) acontecendo agora? */
function semanalAgora40(F,C){ const S=F.semanal; if(!S) return false; C=C||cal();
 const t=C.wd*24+C.h, a=S.de.wd*24+S.de.h, b=S.ate.wd*24+S.ate.h; return a<=b ? t>=a&&t<b : t>=a||t<b; }
const shabatAgora40 = () => semanalAgora40(FESTAS.find(f=>f.id==='shabat'));
function aplicaFesta40(v,F,ps){
 const E=festaStat40(v), ef=F.efeito, txt=[];
 if(ef.fel){ E.fel=lim40(E.fel+ef.fel); txt.push(`+${ef.fel} de felicidade`); }
 if(ef.coesao){ E.coesao=lim40(E.coesao+ef.coesao); txt.push(`+${ef.coesao} de união`); }
 if(ef.refeicao){ let comida=0; for(const e of ps){ const usa=Math.min(.5,Math.max(0,v.food||0)); v.food=(v.food||0)-usa; comida+=usa; e.hunger=100; } txt.push(`refeição coletiva para ${ps.length}`); }
 if(ef.prestigio){ E.prest=(E.prest||0)+ef.prestigio; const k=byId.get(v.king); if(k){ k.xp=(k.xp||0)+ef.prestigio; addFloat(k.x,k.y-1,'🏆'); } txt.push(`+${ef.prestigio} de prestígio do rei`); }
 if(ef.pausa) txt.push('descanso do trabalho');
 for(const e of ps.slice(0,8)) addFloat(e.x,e.y-.8,F.e);
 if(!ef.pausa) celebrate(v.cx,v.cy,SHIRTS[v.color]);
 E.ult={id:F.id, di:cal().di}; (E.hist||(E.hist=[])).push(F.id); if(E.hist.length>20) E.hist.shift();
 pushLog(`${F.e} ${v.name} celebra ${F.nome} (${ps.length} ${etniaById(F.et).nome.toLowerCase()}) — ${txt.join(', ')}`, false);
}
function festaTick(){
 const C=cal();
 for(const v of state.villages){ if(!v.e40||!members(v).length) continue; const E=festaStat40(v);
  if(E.fd!==C.di){ // um novo dia: festas de data fixa e a volta lenta para o normal
   if(E.fd!=null){ const n=Math.min(30,Math.max(1,C.di-E.fd)); for(const k of ['fel','coesao']) E[k]=E[k]>50?Math.max(50,E[k]-n*FESTA_BASE.VOLTA):Math.min(50,E[k]+n*FESTA_BASE.VOLTA); }
   E.fd=C.di;
   for(const F of FESTAS){ if(!F.data||F.data.m!==C.m||F.data.d!==C.d) continue; const ps=participantes40(v,F.et); if(ps.length) aplicaFesta40(v,F,ps); }
  }
  for(const F of FESTAS){ if(!F.semanal) continue; const on=semanalAgora40(F,C), k='sem_'+F.id;   // festa semanal: efeito uma vez quando começa
   if(on&&!E[k]){ E[k]=1; const ps=participantes40(v,F.et); if(ps.length) aplicaFesta40(v,F,ps); } else if(!on&&E[k]) E[k]=0; }
 }
}
/* Shabat: quem é judeu não pega tarefa de trabalho (descansa); defesa, comida e fuga continuam */
{ const _st=setTask; setTask=function(e,t,v){ try{ if(t&&TRAB40.has(t.t)&&e&&e.sp==='human'&&e.id!==state.playerId&&etDe(e)==='judeu'&&shabatAgora40()){ e.task=null; return false; } }catch(err){ v31Err(err); }
  return _st.apply(this,arguments); }; }
{ const _t=e40Tick; e40Tick=function(){ _t(); try{ festaTick(); }catch(err){ v31Err(err); } }; }
/* painel da vila: felicidade, união, prestígio e a última festa */
{ const _vi=villageInfo; villageInfo=function(){ _vi.apply(this,arguments); try{ const v=villageById(state.infoRef); if(!v||!v.e40||v.e40.fel==null) return; const E=v.e40, U=E.ult&&FESTAS.find(f=>f.id===E.ult.id);
  $('infoLines').insertAdjacentHTML('beforeend',`<div><b>🎉 Festas:</b> felicidade ${Math.round(E.fel)} · união ${Math.round(E.coesao)} · prestígio do rei ${E.prest||0}${U?` · última: ${U.e} ${U.nome}`:''}</div>`); }catch(err){ v31Err(err); } }; }
Object.assign(window.MV40, {FESTAS, festaTick, shabatAgora40, semanalAgora40, aplicaFesta40, __setTask:(e,t,v)=>setTask(e,t,v)});

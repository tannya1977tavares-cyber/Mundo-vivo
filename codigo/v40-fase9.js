/* =====================================================================
   v40 · FASE 9 · HIPÓDROMO, CORRIDAS E APOSTAS
   Tipo novo de construção 'hipodromo' (no FIM de BUILDS, noMenu). Cidade
   (era Cidade ou mais) ganha um hipódromo num chão público; corrida todo sábado 15h.
   4 a 6 cavalos. Velocidade = base × aleatório(0,9–1,1) × (1 + 0,05 × treino).
   Aposta: no máximo 20% das moedas da pessoa. A casa (o tesouro da cidade) fica com 10%
   do total apostado; o resto é dividido entre quem acertou, na proporção da aposta.
   Ninguém acertou: o prêmio volta para quem apostou. Nenhuma moeda é criada:
   o dinheiro só troca de mão (pessoas ↔ tesouro). Dados em v.e40.hip (já salvo).
   ===================================================================== */
const HIP40 = {CAVALOS:[4,6], APOSTA_MAX:.2, TAXA:.1, CHANCE_APOSTAR:.35, TREINO_MAX:10, ERA:1, DIA:5, HORA:15,
 NOMES:['Relâmpago','Trovão','Estrela','Ventania','Faísca','Cometa','Pé-de-Vento','Moreno','Baio','Tordilho','Zéfiro','Brisa']};
const r2 = x => Math.round(x*100)/100;
function cavalosNovos40(){ const n=HIP40.CAVALOS[0]+((Math.random()*(HIP40.CAVALOS[1]-HIP40.CAVALOS[0]+1))|0), nm=HIP40.NOMES.slice().sort(()=>Math.random()-.5);
 return nm.slice(0,n).map(nome=>({nome, base:r2(.9+Math.random()*.2), treino:0, vit:0})); }
const velCavalo40 = c => c.base*(.9+Math.random()*.2)*(1+.05*c.treino);       // a fórmula do plano
/* uma corrida: devolve o resultado; o dinheiro total (pessoas + tesouro) não muda */
function corrida40(v, quiet){
 const Hp=v.e40&&v.e40.hip; if(!Hp) return null; const C=Hp.cavalos;
 // apostas
 const bets=[]; for(const e of members(v)){ if(!isAdultH(e)||e.id===state.playerId) continue; const m=e.coins||0; if(m<1||Math.random()>HIP40.CHANCE_APOSTAR) continue;
  const val=r2(Math.min(m*HIP40.APOSTA_MAX, Math.max(1, m*HIP40.APOSTA_MAX*Math.random()))); if(val<=0||val>m*HIP40.APOSTA_MAX+1e-9) continue;
  e.coins=m-val; bets.push({e, c:(Math.random()*C.length)|0, val}); }
 const pote=r2(bets.reduce((s,b)=>s+b.val,0));
 // a corrida
 const vel=C.map(velCavalo40); let w=0; for(let i=1;i<C.length;i++) if(vel[i]>vel[w]) w=i;
 C[w].vit++; for(const c of C) if(c.treino<HIP40.TREINO_MAX) c.treino=r2(Math.min(HIP40.TREINO_MAX,c.treino+.25));
 // pagamento
 const taxa=r2(pote*HIP40.TAXA), premio=r2(pote-taxa), ganh=bets.filter(b=>b.c===w);
 const quem=ganh.length?ganh:bets, bq=quem.reduce((s,b)=>s+b.val,0);              // ninguém acertou: o prêmio volta para quem apostou
 let pago=0; for(const b of quem){ const p=r2(premio*b.val/bq); b.e.coins=(b.e.coins||0)+p; pago=r2(pago+p); }
 const casa=pote-pago; v.coins=coinsOf(v)+casa;                       // a taxa (e a sobra do arredondamento)
 Hp.n=(Hp.n||0)+1; Hp.pote=r2((Hp.pote||0)+pote); Hp.casa=r2((Hp.casa||0)+casa);
 const R={vencedor:C[w].nome, apostas:bets.length, pote, casa, ganhadores:ganh.length};
 if(!quiet){ const a=Hp.a; addFloat(a%state.w,(a/state.w)|0,'🏇'); const f=x=>x>=10?Math.round(x):x.toFixed(1); pushLog(`🏇 Corrida em ${v.name}: venceu ${C[w].nome}${bets.length?` · ${bets.length} ${bets.length>1?'apostaram':'apostou'} ${f(pote)}🪙 · ${ganh.length?ganh.length+' acertou'+(ganh.length>1?'aram':''):'ninguém acertou (prêmio devolvido)'} · a casa ficou com ${f(casa)}🪙`:' · ninguém apostou'}`, false); }
 return R;
}
/* o hipódromo: um chão público dentro da cidade (não é rua, nem lote, nem roça) */
function poeHip40(v){
 if(!rua40) return false; let best=-1, bd=1e9;
 for(const i of v.region){ if(!rua40[i]) continue; const c=state.cells[i]; if(c.build||c.water) continue; const x=i%state.w, y=(i/state.w)|0, d=Math.hypot(x-v.cx,y-v.cy); if(d<3) continue; if(d<bd){ bd=d; best=i; } }
 if(best<0) return false; const x=best%state.w, y=(best/state.w)|0;
 setBuild(x,y,'hipodromo',v.id); markAround(x,y,1);
 v.e40.hip={a:best, cavalos:cavalosNovos40(), n:0, pote:0, casa:0, ult:-1};
 pushLog(`🏇 ${v.name} abriu um hipódromo com ${v.e40.hip.cavalos.length} cavalos (corrida todo sábado à tarde)`, false);
 return true;
}
function hipTick(){
 const C=cal();
 for(const v of state.villages){ if(!v.e40||(v.era||0)<HIP40.ERA||!members(v).length) continue;
  const Hp=v.e40.hip; if(Hp&&state.cells[Hp.a].build!=='hipodromo') v.e40.hip=null;           // demolido: reconstrói
  if(!v.e40.hip){ poeHip40(v); continue; }
  if(C.wd===HIP40.DIA&&C.h>=HIP40.HORA&&v.e40.hip.ult!==C.di){ v.e40.hip.ult=C.di; corrida40(v); }
 }
}
{ const _t=e40Tick; e40Tick=function(){ _t(); try{ hipTick(); }catch(err){ v31Err(err); } }; }
/* desenho: pista oval de terra com cerca branca e um cavalinho */
{ const _dsb=drawSmallBuild; drawSmallBuild=function(g,c,x,y,px,py){ if(c.build!=='hipodromo') return _dsb.apply(this,arguments);
  g.fillStyle='#6f9a4a'; g.fillRect(px,py,T,T);
  g.fillStyle='#c9a46a'; g.beginPath(); g.ellipse(px+8,py+8,7.5,5.5,0,0,Math.PI*2); g.fill();
  g.fillStyle='#6f9a4a'; g.beginPath(); g.ellipse(px+8,py+8,4.5,2.5,0,0,Math.PI*2); g.fill();
  g.strokeStyle='#f4f1e6'; g.lineWidth=1; g.beginPath(); g.ellipse(px+8,py+8,7.5,5.5,0,0,Math.PI*2); g.stroke();
  g.fillStyle='#5a3a22'; g.fillRect(px+2,py+6,3,2); g.fillRect(px+4,py+5,1,1); g.fillStyle='#e8d29a'; g.fillRect(px+12,py+2,1,4); g.fillStyle='#d84a3a'; g.fillRect(px+13,py+2,2,2); }; }
/* painel da cidade */
{ const _vi=villageInfo; villageInfo=function(){ _vi.apply(this,arguments); try{ const v=villageById(state.infoRef); const Hp=v&&v.e40&&v.e40.hip; if(!Hp) return;
  const top=Hp.cavalos.slice().sort((a,b)=>b.vit-a.vit)[0];
  $('infoLines').insertAdjacentHTML('beforeend',`<div><b>🏇 Hipódromo:</b> ${Hp.cavalos.length} cavalos · ${Hp.n} corridas · apostado ${Math.round(Hp.pote)}🪙 · casa ${Math.round(Hp.casa)}🪙${top&&top.vit?` · campeão: ${top.nome} (${top.vit})`:''}</div>`); }catch(err){ v31Err(err); } }; }
Object.assign(window.MV40, {HIP40, corrida40, poeHip40, hipTick, velCavalo40});

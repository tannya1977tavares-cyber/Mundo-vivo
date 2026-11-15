/* =====================================================================
   v40 · FASE 10 · ESTRADAS DE UMA PISTA ENTRE OS PORTÕES
   O jogo já liga as cidades com estradas (v29: hwEnds = logo fora do portão,
   hwRoute = caminho em grade de 8 direções, 1 quadrado de largura).
   A v40 só acerta o traçado das estradas NOVAS: toda curva fica de 45°
   (curva de 90° ou mais vira duas curvas de 45°, cortando o canto) e a
   estrada não corre colada ao lado de outra (sem pista dupla).
   Estradas que já existem (e as avenidas de 2 faixas da v36) não mudam.
   ===================================================================== */
const EST40 = {ATIVO:true, LADO:2, CURVA:4};   // custo extra: andar colado ao lado de outra estrada · curva maior que 45°
const dirDe40 = (a,b) => { const W=state.w, dx=(b%W)-(a%W), dy=((b/W)|0)-((a/W)|0); return D8B.findIndex(d=>d[0]===dx&&d[1]===dy); };
const ANG40 = [0,2,4,6,1,7,3,5];                       // D8B → oitavos de volta (0 = leste, sentido horário)
function giro40(d1,d2){ if(d1<0||d2<0) return 9; const a=Math.abs(ANG40[d1]-ANG40[d2])%8; return Math.min(a,8-a); } // 0 reto · 1 = 45° · 2 = 90° · 3 = 135°
const vizinho8 = (a,b) => { const W=state.w; return Math.max(Math.abs((a%W)-(b%W)),Math.abs(((a/W)|0)-((b/W)|0)))===1; };
/* corta os cantos: curva maior que 45° perde o quadrado do canto (se as duas pontas se tocam e não é ponte) */
function suaviza40(p){
 if(!p||p.length<3) return p; p=p.slice();
 for(let volta=0;volta<p.length;volta++){ let mudou=false;
  for(let i=1;i<p.length-1;i++){ const g=giro40(dirDe40(p[i-1],p[i]),dirDe40(p[i],p[i+1])); if(g<=1) continue;
   if(vizinho8(p[i-1],p[i+1])&&!state.cells[p[i]].water&&!state.cells[p[i-1]].water&&!state.cells[p[i+1]].water){ p.splice(i,1); mudou=true; i=Math.max(0,i-2); continue; }
   // duas diagonais em V (90°): o canto vira o quadrado do meio e o trecho fica reto
   const W=state.w, ax=p[i-1]%W, ay=(p[i-1]/W)|0, bx=p[i+1]%W, by=(p[i+1]/W)|0;
   if((Math.abs(ax-bx)===2&&ay===by)||(Math.abs(ay-by)===2&&ax===bx)){ const m=((ay+by)/2)*W+(ax+bx)/2, c=state.cells[m];
    if(c&&!c.water&&c.terrain!=='hillHigh'&&(!c.build||BUILDS[c.build].gate||c.build==='bridge')&&!state.cells[p[i]].water){ p[i]=m; mudou=true; i=Math.max(0,i-2); } } }
  if(!mudou) break; }
 return p;
}
/* estradas planejadas (mesmo as que ainda não foram abertas) e os quadrados colados nelas, fora das cidades */
function plano40(){ const N=state.w*state.h, on=new Uint8Array(N), near=new Uint8Array(N), W=state.w;
 for(const r of (state.roads||[])) for(const k of r.cells||[]) on[k]=1;
 for(let k=0;k<N;k++){ const c=state.cells[k]; if(!c.reg&&!c.water&&(c.terrain==='trampled'||c.terrain==='paved')) on[k]=1; }
 for(let k=0;k<N;k++){ if(!on[k]||state.cells[k].reg) continue; const x=k%W; for(const [dx,dy] of D8B){ const nx=x+dx, nk=k+dy*W+dx; if(nx<0||nx>=W||nk<0||nk>=N) continue; if(!on[nk]) near[nk]=1; } }
 return {on, near}; }
/* o mesmo A* da v29 (hwPath), com dois custos a mais: lado de estrada e curva fechada */
function hwPath40(s,t,block){
 const PL=plano40();
 const W=state.w, N=W*state.h, G=new Float32Array(N).fill(1e9), P=new Int32Array(N).fill(-1), Dir=new Int8Array(N).fill(-1), done=new Uint8Array(N);
 const si=s[1]*W+s[0], ti=t[1]*W+t[0]; G[si]=0;
 const hk=[], hf=[]; let n=0;
 const H=k=>{ const x=k%W, y=(k/W)|0, dx=Math.abs(x-t[0]), dy=Math.abs(y-t[1]); return Math.max(dx,dy)+.42*Math.min(dx,dy); };
 const push=(k,f)=>{ let i=hk.length; hk.push(k); hf.push(f); while(i>0){ const p=(i-1)>>1; if(hf[p]<=f) break; hk[i]=hk[p]; hf[i]=hf[p]; i=p; } hk[i]=k; hf[i]=f; };
 const pop=()=>{ const top=hk[0], lk=hk.pop(), lf=hf.pop(); if(hk.length){ let i=0; for(;;){ let c=2*i+1; if(c>=hk.length) break; if(c+1<hk.length&&hf[c+1]<hf[c]) c++; if(hf[c]>=lf) break; hk[i]=hk[c]; hf[i]=hf[c]; i=c; } hk[i]=lk; hf[i]=lf; } return top; };
 push(si,H(si));
 while(hk.length && n<Math.max(30000,state.w*state.h*.7)){ // v29: mapa maior, busca maior
  const cur=pop();
  if(done[cur]) continue; done[cur]=1; n++;
  if(cur===ti) break;
  const cx=cur%W, cy=(cur/W)|0;
  for(let d=0;d<8;d++){ const [dx,dy]=D8B[d], nx=cx+dx, ny=cy+dy; if(nx<1||ny<1||nx>=W-1||ny>=state.h-1) continue;
   const k=ny*W+nx; if(done[k]||block.has(k)) continue; const c=state.cells[k];
   if(c.terrain==='hillHigh') continue;
   if(c.build && !BUILDS[c.build].gate && c.build!=='bridge' && k!==ti) continue;
   let cost=(c.terrain==='trampled'||c.terrain==='paved'||c.build==='bridge'||PL.on[k])?.45:c.water?5:c.terrain==='hillMid'?4:c.terrain==='hillLow'?1.6:c.tree?1.4:1;
   if(!PL.on[k]&&PL.near[k]&&k!==ti) cost+=EST40.LADO; // v40: não corre colada ao lado de outra estrada (sem pista dupla)
   if(c.reg && k!==ti) cost+=6;
   if(d>=4){ cost*=1.42; if(c.water||cell(cx+dx,cy).water||cell(cx,cy+dy).water) cost+=2; }
   if(Dir[cur]>=0 && Dir[cur]!==d) cost+=giro40(Dir[cur],d)>1?EST40.CURVA:.6; // v40: curva de 45° é barata; de 90° ou mais, cara
   const g=G[cur]+cost; if(g<G[k]){ G[k]=g; P[k]=cur; Dir[k]=d; push(k,g+H(k)); }
  }
 }
 if(P[ti]<0 && ti!==si) return null;
 const out=[]; for(let k=ti;k>=0;k=P[k]){ out.push(k); if(k===si) break; } return out.reverse();
}

/* medidas para o teste (e para o relatório) */
function medeEstradas40(rs){
 rs=rs||(state.roads||[]).filter(r=>r.kind==='v'&&r.cells.length);
 const W=state.w, todas=new Set(); let grade=0, curvas=0, curvasPonte=0, passos=0;
 for(const r of rs){ const p=r.cells; for(const k of p) todas.add(k);
  for(let i=1;i<p.length;i++){ passos++; if(!vizinho8(p[i-1],p[i])) grade++; }
  for(let i=1;i<p.length-1;i++){ const g=giro40(dirDe40(p[i-1],p[i]),dirDe40(p[i],p[i+1])); if(g>1){ if(state.cells[p[i]].water||state.cells[p[i-1]].water||state.cells[p[i+1]].water) curvasPonte++; else curvas++; } } }
 // pista dupla: bloco 2×2 todo de estrada, fora das cidades
 // cruzamento em X (duas estradas cruzando na diagonal) não é pista dupla; duas estradas lado a lado é
 const dono=new Map(); rs.forEach((r,i)=>{ for(const k of r.cells){ let s=dono.get(k); if(!s) dono.set(k,s=new Set()); s.add(i); } });
 let dupla=0, cruz=0, pertoPonta=0; for(const k of todas){ if(state.cells[k].reg) continue; const q=[k,k+1,k+W,k+W+1]; if(!q.every(c=>todas.has(c))) continue;
  const tem=(a,b)=>[...dono.get(a)].some(i=>dono.get(b).has(i));
  const xis=!rs.some((r,i)=>q.filter(c=>dono.get(c).has(i)).length>=3)&&tem(k,k+W+1)&&tem(k+1,k+W);   // cada estrada passa na diagonal do bloco
  if(xis) cruz++; else { dupla++; const ps=rs.flatMap(r=>[r.cells[0],r.cells[r.cells.length-1]]); const d=Math.min(...ps.map(p=>Math.max(Math.abs(p%W-k%W),Math.abs(((p/W)|0)-((k/W)|0))))); if(d<=2) pertoPonta++; } }
 return {estradas:rs.length, passos, foraDaGrade:grade, curvasMaiorQue45:curvas, curvasEmPonte:curvasPonte, blocosPistaDupla:dupla, duplaPertoDaPonta:pertoPonta, cruzamentosEmX:cruz};
}
{ const _hp=hwPath; hwPath=function(s,t,block){ if(!EST40.ATIVO) return _hp.apply(this,arguments); try{ return hwPath40(s,t,block); }catch(err){ v31Err(err); return _hp.apply(this,arguments); } }; }
{ const _hr=hwRoute; hwRoute=function(s,t){ const p=_hr.apply(this,arguments); if(!p||!EST40.ATIVO) return p; try{ return suaviza40(p); }catch(err){ v31Err(err); return p; } }; }
Object.assign(window.MV40, {EST40, suaviza40, medeEstradas40, hwRoute:(s,t)=>hwRoute(s,t), hwEnds:(v,x,y)=>hwEnds(v,x,y)});

/* Bear Eyes — practice app. Views: Today, Learn, Examples, Replay (real past data), Drills, Live book, Progress. */
(function(){
'use strict';
const M=window.BE_MARKET, C=window.BE_CHART, GD=window.BE_GUIDE;
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const KEY='bearEyes:v1';

/* ---------- storage ---------- */
let ST;
function blank(){return {v:1,start:Date.now(),replays:[],drills:{},ex:{},exLog:[],chat:[],apiKey:'',coin:'ETHUSDT',days:90};}
try{ST=JSON.parse(localStorage.getItem(KEY)||'null')||blank();}catch(e){ST=blank();}
ST=Object.assign(blank(),ST);
function save(){try{localStorage.setItem(KEY,JSON.stringify(ST));}catch(e){}}
save();
const todayStr=()=>new Date().toDateString();
const isToday=ts=>new Date(ts).toDateString()===todayStr();
function logDrill(id,ok,extra){(ST.drills[id]=ST.drills[id]||[]).push(Object.assign({ts:Date.now(),ok:!!ok},extra||{}));save();}
window.BE_STATE=()=>ST;

/* ---------- stats ---------- */
function drillStats(id){
  if(id===10){const r=ST.replays;return {n:r.length,acc:r.length?r.filter(x=>x.g.ok).length/r.length:0,last:r.slice(-20).length?r.slice(-20).filter(x=>x.g.ok).length/r.slice(-20).length:0,today:r.filter(x=>isToday(x.ts)).length};}
  const a=ST.drills[id]||[], l=a.slice(-20);
  return {n:a.length,acc:a.length?a.filter(x=>x.ok).length/a.length:0,last:l.length?l.filter(x=>x.ok).length/l.length:0,today:a.filter(x=>isToday(x.ts)).length};
}
function replayStats(list){
  list=list||ST.replays;
  const trades=list.filter(x=>x.call!=='WAIT'), waits=list.filter(x=>x.call==='WAIT');
  const wins=trades.filter(x=>x.g.res==='target').length;
  const noEdge=trades.length?trades.reduce((s,x)=>s+x.stop/(x.stop+x.target),0)/trades.length:0.33;
  const sumR=trades.reduce((s,x)=>s+x.g.r,0);
  const agree=trades.length?trades.filter(x=>x.check===x.call).length/trades.length:0;
  const cal={};['weather','tape','btc'].forEach(k=>{const a=list.filter(x=>x.cal&&x.cal[k]);cal[k]={n:a.length,acc:a.length?a.filter(x=>x.cal[k][0]===x.cal[k][1]).length/a.length:0};});
  const side=d=>{const t=trades.filter(x=>x.call===d);return {n:t.length,win:t.length?t.filter(x=>x.g.res==='target').length/t.length:0,avgR:t.length?t.reduce((s,x)=>s+x.g.r,0)/t.length:0};};
  const checkCorrect=list.length?list.filter(x=>x.check===x.best).length/list.length:0;
  return {n:list.length,trades:trades.length,waits:waits.length,winRate:trades.length?wins/trades.length:0,noEdge,avgR:trades.length?sumR/trades.length:0,sumR,agree,
    waitAcc:waits.length?waits.filter(x=>x.g.ok).length/waits.length:0,cal,long:side('LONG'),short:side('SHORT'),checkCorrect};
}
function level(){
  const s=replayStats(ST.replays.slice(-300)), n=ST.replays.length;
  const drillsAtGoal=GD.drills.filter(d=>{const st=drillStats(d.id);return st.n>=10&&st.last>=d.goal;}).length;
  const edge=s.winRate-s.noEdge;
  const tests=[
    {k:'Real-data replays',v:n,need:300,ok:n>=300,txt:`${n} / 300`},
    {k:'Win rate above no-edge',v:edge,ok:s.trades>=30&&edge>=0.08,txt:s.trades?`${Math.round(s.winRate*100)}% vs ${Math.round(s.noEdge*100)}% (needs +8 points)`:'no trades yet'},
    {k:'Average R after fees',v:s.avgR,ok:s.trades>=30&&s.avgR>=0.10,txt:s.trades?`${s.avgR>=0?'+':''}${s.avgR.toFixed(2)} R (needs ≥ +0.10)`:'—'},
    {k:'Discipline (trades the checklist agreed with)',v:s.agree,ok:s.trades>=30&&s.agree>=0.80,txt:s.trades?`${Math.round(s.agree*100)}% (needs ≥ 80%)`:'—'},
    {k:'Drills at goal (last 20 each)',v:drillsAtGoal,ok:drillsAtGoal>=8,txt:`${drillsAtGoal} / 10 (needs 8)`}
  ];
  const passed=tests.filter(t=>t.ok).length;
  const names=['Novice','Learner','Practitioner','Skilled','Advanced','Expert'];
  return {name:names[passed],passed,tests,score:Math.round(passed/5*100)};
}
window.BE_STATS={replayStats,drillStats,level};

/* ---------- router ---------- */
const VIEWS={today,learn,examples,replay,drills,drill,live,progress};
let cleanup=null;
function route(){
  if(cleanup){try{cleanup();}catch(e){} cleanup=null;}
  const h=(location.hash||'#today').slice(1).split('/');
  const v=VIEWS[h[0]]?h[0]:'today';
  document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('on',a.dataset.v===(v==='drill'?'drills':v)));
  window.BE_CTX={view:v,arg:h[1]};
  VIEWS[v](h[1]);
  window.scrollTo(0,0);
}
window.addEventListener('hashchange',route);
const view=html=>{$('#view').innerHTML=html;};
const pct=x=>Math.round(x*100)+'%';

/* ---------- TODAY ---------- */
function today(){
  const day=Math.floor((Date.now()-ST.start)/864e5)+1, wk=Math.min(12,Math.ceil(day/7)), P=GD.plan[wk-1];
  const lv=level();
  const tasks=Object.entries(P.day).map(([k,n])=>{
    let done,label,href;
    if(k==='E'){done=ST.exLog.filter(isToday).length;label='Guided examples';href='#examples';}
    else if(k==='R'){done=drillStats(10).today;label='Replay (real past data, full checklist)';href='#replay';}
    else{const d=GD.drills.find(x=>x.id==k);done=drillStats(d.id).today;label=`Drill ${d.id} · ${d.name}`;href=d.data==='live'?'#live':'#drill/'+d.id;}
    return {done,n,label,href};
  });
  const allDone=tasks.every(t=>t.done>=t.n);
  view(`<a class="task card" href="#learn/keys"><b>📌 Key points: when I trade</b><span>→</span></a><div class="card hero"><div class="lbl"><span>Day ${day} of 84 · Week ${wk} of 12</span><span>${allDone?'✅ today done':''}</span></div>
  <h2>${esc(P.focus)}</h2><p class="small">Move on when: ${esc(P.pass)}</p></div>
  <div class="card"><div class="lbl"><span>Today's practice</span></div>
  ${tasks.map(t=>`<a class="task" href="${t.href}"><div><b>${esc(t.label)}</b><div class="pbar"><i style="width:${Math.min(100,t.done/t.n*100)}%"></i></div></div><span class="${t.done>=t.n?'ok':''}">${t.done} / ${t.n}</span></a>`).join('')}
  <p class="small">Read: ${P.read.map(r=>{const p=GD.parts.find(x=>x.id===r);return `<a href="#learn/${r}">${esc(p.title)}</a>`;}).join(' · ')}</p></div>
  <div class="card"><div class="lbl"><span>Your level</span><a href="#progress">details →</a></div>
  <div class="lvl"><b>${lv.name}</b><div class="pbar big"><i style="width:${lv.score}%"></i></div><span>${lv.passed}/5 expert tests</span></div></div>
  <div class="card"><div class="lbl"><span>The 12-week plan</span></div>
  ${GD.plan.map(p=>`<div class="wk ${p.w===wk?'cur':p.w<wk?'past':''}"><b>W${p.w}</b><span>${esc(p.focus)}</span></div>`).join('')}
  <div class="tools"><button class="tbtn" id="restart">Restart plan from today</button></div></div>`);
  let armed=false;$('#restart').onclick=()=>{if(!armed){armed=true;$('#restart').textContent='Tap again to restart at day 1';return;}ST.start=Date.now();save();route();};
}

/* ---------- LEARN ---------- */
function learn(id){
  const p=GD.parts.find(x=>x.id===id);
  if(p){view(`<div class="card prose"><a class="small" href="#learn">← all parts</a><h2>${esc(p.title)}</h2>${p.html}</div>${nextPart(p.id)}`);return;}
  view(`<div class="card"><h2>Learn</h2><p class="small">The guide "Reading the Market by Eye: Engle and O'Hara in practice", part by part.</p>
  ${GD.parts.map(p=>`<a class="task" href="#learn/${p.id}"><b>${esc(p.title)}</b><span>→</span></a>`).join('')}
  <a class="task" href="#drills"><b>Part 4 · The 10 drills (with real data)</b><span>→</span></a>
  <a class="task" href="#today"><b>Part 5 · The plan (12 weeks)</b><span>→</span></a></div>`);
}
function nextPart(id){const i=GD.parts.findIndex(x=>x.id===id),n=GD.parts[i+1];return n?`<a class="task card" href="#learn/${n.id}"><b>Next: ${esc(n.title)}</b><span>→</span></a>`:'';}

/* ---------- EXAMPLES (guided, drawn) ---------- */
const EXB=SCEN.map(build);
function exBook(s,last){
  const lv=(arr,side)=>arr.map((x,i)=>{const sz=typeof x==='number'?x:x[0];const off=side*(1+i*2);const pr=off>0?last+s.spread/2+(off-1):last-s.spread/2+(off+1);return [pr,sz,typeof x==='number'?null:x[1],typeof x==='number'?null:x[2]];});
  return {asks:lv(s.asks,1),bids:lv(s.bids,-1),mid:last,spread:s.spread,wide:s.spread>1,wideNote:s.spread>1?' ⚠ was 0.1':''};
}
function exTape(s,last){
  let clock=Date.UTC(2026,10,16,13,42,10);
  return s.tapeP.split('').map((ch,i)=>{const buy=ch==='G';const x={T:clock,p:buy?last+s.spread/2:last-s.spread/2,q:s.tapeS[i],buy};clock-=1000*(s.tapeGaps?s.tapeGaps[i]:(i%3===0?2:1));return x;});
}
const ICON={bull:'🟢',bear:'🔴',ok:'✅',bad:'⛔',neutral:'⚪',trap:'⚠️'};
function examples(arg){
  if(!arg){
    view(`<div class="card"><h2>Guided examples</h2><p class="small">12 drawn situations, each built to show one pattern from the guide cleanly. Then practise the same patterns on real data in Replay and Drills.</p>
    ${SCEN.map((s,i)=>{const a=ST.ex[s.id];return `<a class="task" href="#examples/${s.id}"><b>${s.id}. ${a?esc(s.title):'Example '+s.id+' · '+esc(s.short)}</b><span class="${a?(a===s.answer?'ok':'no'):''}">${a?(a===s.answer?'✓':'✗'):'→'}</span></a>`;}).join('')}
    <div class="tools"><button class="tbtn" id="exreset">Reset examples</button></div></div>`);
    $('#exreset').onclick=()=>{ST.ex={};save();route();};return;
  }
  const i=SCEN.findIndex(s=>s.id==arg); if(i<0){location.hash='#examples';return;}
  const s=SCEN[i],b=EXB[i],ans=ST.ex[s.id],rev=!!ans;
  const plan=s.plan?{entry:b.last,stop:b.last+s.plan.stop,target:b.last+s.plan.target,lo:b.last+Math.min(s.plan.stop,s.plan.target),hi:b.last+Math.max(s.plan.stop,s.plan.target)}:null;
  const avg=a=>a.reduce((x,c)=>x+(c.h-c.l),0)/a.length;
  const sum=a=>a.slice(0,5).map(x=>typeof x==='number'?x:x[0]).reduce((p,q)=>p+q,0);
  const bs=sum(s.bids),as=sum(s.asks),imb=(bs-as)/(bs+as),g=s.tapeP.split('').filter(c=>c==='G').length,a60=avg(b.hist),a10=avg(b.hist.slice(-10)),fee=b.last*0.004;
  window.BE_CTX.example={s,imb,green:g,a60,a10,fee};
  view(`<div class="card"><div class="ttl"><h2>Example ${s.id}: ${rev?esc(s.title):'Read it, then call it'}</h2><span class="small">${s.coin}USDT · 1-minute · drawn example</span></div>
  ${C.candles(b.hist,b.fut,{reveal:rev,plan:rev&&plan,mark:rev&&(s.id===5||s.id===9)?[b.hist.length-3,b.hist.length-1]:null})}</div>
  <div class="grid"><div class="card"><div class="lbl"><span>Order book</span><span>step 2.0</span></div>${C.book(exBook(s,b.last),1)}</div>
  <div><div class="card"><div class="lbl"><span>Bitcoin 15-minute (wind)</span></div>${C.mini(b.btc)}</div>
  <div class="card"><div class="lbl"><span>Trades list</span><span>newest first</span></div>${C.tape(exTape(s,b.last),1)}</div></div></div>
  <div class="card"><div class="btns"><button class="btn bl" data-a="LONG" ${rev?'disabled':''}>LONG</button><button class="btn bs" data-a="SHORT" ${rev?'disabled':''}>SHORT</button><button class="btn bw" data-a="WAIT" ${rev?'disabled':''}>WAIT</button></div>
  <div class="tools"><button class="tbtn" id="cal">Show numbers</button>${rev?'<button class="tbtn" id="again">Try again</button>':''}</div>
  <div class="calib" id="calbox">Average candle: last hour ${a60.toFixed(1)} · last 10 ${a10.toFixed(1)} (${(a10/a60).toFixed(1)}×)<br>0.40% fee distance = <b>${fee.toFixed(1)}</b> = ${(fee/a10).toFixed(1)} recent candle heights<br>Book imbalance (5 levels): ${bs.toFixed(0)} vs ${as.toFixed(0)} → <b>${imb>=0?'+':''}${imb.toFixed(2)}</b><br>Tape: ${g} green / ${20-g} red${s.plan?`<br>Plan: stop ${Math.abs(s.plan.stop)}, target ${Math.abs(s.plan.target)} → no-edge ${Math.round(Math.abs(s.plan.stop)/(Math.abs(s.plan.stop)+Math.abs(s.plan.target))*100)}%`:''}</div></div>
  ${rev?`<div class="card"><div class="verdict ${ans===s.answer?'ok':'no'}">${ans===s.answer?'✓ Correct':'✗ Not this time'}: the answer is ${s.answer}${ans===s.answer?'':' (you chose '+ans+')'}</div>
  ${plan?`<div class="plan"><div>Entry ${plan.entry.toFixed(1)}</div><div class="no">Stop ${plan.stop.toFixed(1)}</div><div class="ok">Target ${plan.target.toFixed(1)}</div></div>`:''}
  ${s.checks.map(c=>`<div class="chk"><div class="ic">${ICON[c[1]]||'⚪'}</div><div><b>${esc(c[0])}</b><span class="t">${esc(c[2])}</span></div></div>`).join('')}
  <div class="chk"><div class="ic">📈</div><div><b>What happened next</b><span class="t">${esc(s.happened)}</span></div></div>
  <div class="chk"><div class="ic">🎓</div><div><b>Lesson</b><span class="t">${esc(s.lesson)}</span></div></div>
  <div class="tools">${i<SCEN.length-1?`<a class="tbtn" href="#examples/${SCEN[i+1].id}">Next example →</a>`:'<a class="tbtn" href="#replay">Now try real data →</a>'}</div></div>`:''}`);
  document.querySelectorAll('.btn[data-a]').forEach(x=>x.onclick=()=>{ST.ex[s.id]=x.dataset.a;ST.exLog.push(Date.now());save();route();});
  $('#cal').onclick=()=>$('#calbox').classList.toggle('show');
  const ag=$('#again'); if(ag) ag.onclick=()=>{delete ST.ex[s.id];save();route();};
}

/* ---------- REPLAY (real past data) ---------- */
const COINS=['ETHUSDT','SOLUSDT','BTCUSDT','BNBUSDT','XRPUSDT','DOGEUSDT','LINKUSDT','AVAXUSDT'];
let RP=null; // current replay {m, call, chips}
function coinPicker(noDays){
  return `<div class="ctrl"><select id="coin">${COINS.map(c=>`<option ${c===ST.coin?'selected':''}>${c}</option>`).join('')}<option value="custom">Other…</option></select>
  ${noDays?'':`<select id="days">${[[30,'last 30 days'],[90,'last 90 days'],[365,'last 12 months']].map(([d,t])=>`<option value="${d}" ${d==ST.days?'selected':''}>${t}</option>`).join('')}</select>`}</div>`;
}
function bindPicker(after){
  $('#coin').onchange=e=>{let v=e.target.value;if(v==='custom'){const inp=document.createElement('input');inp.placeholder='e.g. ADAUSDT';inp.className='inp';e.target.replaceWith(inp);inp.focus();inp.onchange=()=>{ST.coin=inp.value.trim().toUpperCase();save();after&&after();};return;}ST.coin=v;save();after&&after();};
  if($('#days'))$('#days').onchange=e=>{ST.days=+e.target.value;save();};
}
async function replay(){
  view(`<div class="card"><div class="ttl"><h2>Replay · real past market</h2><span class="small" id="src"></span></div>
  <p class="small">A random real moment from Binance history. Read it like it's live, call it, then the real next 15 minutes play out. Graded with the strategy's plan: stop 1.5× recent candle height (min 0.15%), target 2× stop (min 0.40%), 0.10% fees.</p>
  ${coinPicker()}<div class="tools"><button class="tbtn y" id="new">New random moment</button></div></div><div id="rp"></div>`);
  bindPicker(()=>load());
  $('#new').onclick=()=>load();
  if(RP&&RP.m&&RP.m.sym===ST.coin) draw(); else load();
}
async function load(){
  RP={loading:true};
  $('#rp').innerHTML='<div class="card"><p class="small">Loading real data from Binance…</p></div>';
  for(let tries=0;tries<3;tries++){
    try{
      const t=M.randomMoment(ST.days); const m=await M.loadMoment(ST.coin,t);
      RP={m,chips:{},call:null}; draw(); return;
    }catch(e){ RP={err:e.message}; }
  }
  $('#rp').innerHTML=`<div class="card"><p class="no">Couldn't load data: ${esc(RP.err||'')}</p><p class="small">Check the internet connection or that the coin name exists on Binance (e.g. ETHUSDT). Binance may also block some networks; try again or use another network.</p><button class="tbtn" id="retry">Retry</button></div>`;
  $('#retry').onclick=()=>load();
}
function chip(group,opts){
  return `<div class="chips"><span>${group}</span>${opts.map(o=>`<button class="chip ${RP.chips[group]===o?'on':''}" data-g="${group}" data-o="${o}" ${RP.call?'disabled':''}>${o}</button>`).join('')}</div>`;
}
function draw(){
  const m=RP.m, rev=!!RP.call, dp=m.dp;
  if(document.getElementById('src')) $('#src').textContent='source: '+M.source();
  const p=m.plan, e=m.price;
  const planLines=RP.call&&RP.call!=='WAIT'?{entry:e,stop:RP.call==='LONG'?e-p.stop:e+p.stop,target:RP.call==='LONG'?e+p.target:e-p.target}:{entry:e};
  planLines.lo=Math.min(e-p.stop,e-p.target);planLines.hi=Math.max(e+p.stop,e+p.target);
  const when=new Date(m.t);
  window.BE_CTX.replay=RP;
  let h=`<div class="card"><div class="lbl"><span>${m.sym} · 1-minute · ${rev?when.toISOString().replace('T',' ').substr(0,16)+' UTC':'date hidden until you call'}</span><span>price ${e.toFixed(dp)}</span></div>
  ${C.candles(m.hist,m.fut,{reveal:rev,plan:rev&&planLines,delta:true})}</div>
  <div class="grid"><div><div class="card"><div class="lbl"><span>Bitcoin 15-minute (wind)</span><span>last 3 hours</span></div>${C.mini(m.btc)}</div>
  <div class="card"><div class="lbl"><span>Order book lean</span></div>${m.depth?`<p>Real ${m.depth.band} depth imbalance at that minute: <b class="${m.depth.imb>=0?'ok':'no'}">${m.depth.imb>=0?'+':''}${m.depth.imb.toFixed(2)}</b></p><div class="lean"><i style="width:${50+m.depth.imb*50}%"></i></div><p class="small">Green share of resting orders within ${m.depth.band} of price (Binance bookDepth archive).</p>`:`<p class="small">Binance doesn't publish the full past order book, so for past moments read the <b>tape and delta</b> (real). Practise walls and spread on the <a href="#live">Live book</a>.</p>`}</div></div>
  <div class="card"><div class="lbl"><span>Trades list (real)</span><span>last 20 before NOW</span></div>${C.tape(m.trades,dp)}</div></div>
  <div class="card"><div class="lbl"><span>Your eye reads (optional, for calibration)</span></div>
  ${chip('Weather',['Calm','Waking','Storm','Cooling'])}${chip('Tape',['Green','Red','Mixed'])}${chip('Bitcoin',['Up','Down','Flat'])}
  <div class="btns"><button class="btn bl" data-a="LONG" ${rev?'disabled':''}>LONG</button><button class="btn bs" data-a="SHORT" ${rev?'disabled':''}>SHORT</button><button class="btn bw" data-a="WAIT" ${rev?'disabled':''}>WAIT</button></div>
  <div class="tools"><button class="tbtn" id="cal">Show numbers</button>${rev?'<button class="tbtn y" id="next">Next real moment →</button>':''}</div>
  <div class="calib" id="calbox">${numbers(m)}</div></div>`;
  if(rev) h+=resultCard(m,RP);
  $('#rp').innerHTML=h;
  document.querySelectorAll('.chip').forEach(b=>b.onclick=()=>{RP.chips[b.dataset.g]=b.dataset.o;draw();});
  document.querySelectorAll('#rp .btn[data-a]').forEach(b=>b.onclick=()=>commit(b.dataset.a));
  $('#cal').onclick=()=>$('#calbox').classList.toggle('show');
  const nx=$('#next'); if(nx) nx.onclick=()=>{load();window.scrollTo(0,0);};
}
function numbers(m){
  return m.check.rows.map(r=>`<div>${r[1]?'🟢':r[2]?'🔴':'⚪'} <b>${r[0]}</b>: ${esc(r[3])}</div>`).join('')+
   `<div>Trades per minute: last 10 min ${m.tradesPerMin10.toFixed(0)} vs hour ${m.tradesPerMin60.toFixed(0)}</div><div>Plan: stop ${m.plan.stop.toFixed(m.dp)} (${(m.plan.stop/m.price*100).toFixed(2)}%), target ${m.plan.target.toFixed(m.dp)} (${(m.plan.target/m.price*100).toFixed(2)}%) → no-edge ${Math.round(m.plan.stop/(m.plan.stop+m.plan.target)*100)}%</div>`;
}
function commit(call){
  const m=RP.m; RP.call=call; const g=M.grade(m,call);
  const cal={};
  if(RP.chips.Weather)cal.weather=[RP.chips.Weather,m.w.label];
  if(RP.chips.Tape)cal.tape=[RP.chips.Tape,m.tape.colour];
  if(RP.chips.Bitcoin)cal.btc=[RP.chips.Bitcoin,m.wind.wind];
  RP.g=g;
  ST.replays.push({ts:Date.now(),sym:m.sym,t:m.t,call,best:m.best,check:m.check.verdict,g:{ok:g.ok,r:+g.r.toFixed(3),res:g.res,min:g.min},stop:m.plan.stop,target:m.plan.target,cal});
  save(); draw();
}
function resultCard(m,rp){
  const g=rp.g, s=m.sims;
  const say=d=>s[d].res==='target'?`hit target in ${s[d].min} min`:s[d].res==='stop'?`hit stop in ${s[d].min} min`:`neither in 15 min`;
  let head;
  if(rp.call==='WAIT') head=g.ok?'✓ Good wait: neither direction reached its target':'✗ Missed: '+m.best+' would have hit its target';
  else head=g.res==='target'?`✓ Target hit in ${g.min} min: ${g.r>=0?'+':''}${g.r.toFixed(2)} R after fees`:g.res==='stop'?`✗ Stopped out in ${g.min} min: ${g.r.toFixed(2)} R`:`Time's up after 15 min: ${g.r>=0?'+':''}${g.r.toFixed(2)} R after fees`;
  const chk=m.check.verdict;
  const cal=Object.entries({Weather:['Weather',m.w.label],Tape:['Tape',m.tape.colour],Bitcoin:['Bitcoin',m.wind.wind]}).filter(([k])=>rp.chips[k]).map(([k,v])=>`<div>${rp.chips[k]===v[1]?'✅':'❌'} ${k}: you said <b>${rp.chips[k]}</b>, numbers said <b>${v[1]}</b></div>`).join('');
  let note='';
  if(rp.call!=='WAIT'&&chk!==rp.call) note='<p class="no small">The checklist did not agree with this trade. Only trade when every box agrees: that is how the edge is measured.</p>';
  if(rp.call==='WAIT'&&chk!=='WAIT') note=`<p class="small">The checklist said ${chk} here.</p>`;
  return `<div class="card"><div class="verdict ${g.ok?'ok':'no'}">${head}</div>
  <div class="plan"><div>Your call ${rp.call}</div><div>Checklist said ${chk}</div><div>Market's best: ${m.best}</div></div>
  <div class="small">LONG would have ${say('LONG')} · SHORT would have ${say('SHORT')}. Next 15 minutes' weather: ${m.futLabel}.</div>
  ${cal?`<div class="calib show">${cal}</div>`:''}${note}
  <div class="small" style="margin-top:6px">${m.check.rows.map(r=>`${r[1]?'🟢':r[2]?'🔴':'⚪'} ${r[0]}`).join(' · ')}</div>
  <p class="small">Ask the coach (💬) "why?" to go through this moment.</p></div>`;
}

/* ---------- DRILLS ---------- */
function drills(){
  view(`<div class="card"><h2>Drills</h2><p class="small">The 10 drills from Part 4. Real = real past Binance data; Live = the current order book.</p>
  ${GD.drills.map(d=>{const s=drillStats(d.id);const href=d.id===10?'#replay':d.data==='live'?'#live':'#drill/'+d.id;
   return `<a class="task" href="${href}"><div><b>${d.id}. ${esc(d.name)}</b> <span class="tagx">${d.data==='live'?'Live':'Real'}</span><div class="small">${esc(d.who)} · goal ${pct(d.goal)}</div></div><span class="${s.n>=10&&s.last>=d.goal?'ok':''}">${s.n?pct(s.last):'—'}<small> ${s.n?'('+s.n+')':''}</small></span></a>`;}).join('')}</div>`);
}
let DR=null;
function drill(arg){
  const d=GD.drills.find(x=>x.id==arg); if(!d||d.data==='live'||d.id===10){location.hash='#drills';return;}
  view(`<div class="card"><a class="small" href="#drills">← drills</a><div class="ttl"><h2>Drill ${d.id} · ${esc(d.name)}</h2><span class="small">${esc(d.who)} · goal ${pct(d.goal)}</span></div>
  <p class="small">${esc(d.how)}</p>${coinPicker()}<div class="small" id="dstat"></div></div><div id="dr"></div>`);
  bindPicker(()=>dload(d));
  dstat(d); dload(d);
}
function dstat(d){const s=drillStats(d.id);const el=$('#dstat');if(el)el.innerHTML=`Score: <b>${s.n?pct(s.last):'—'}</b> last 20 · ${s.n} done · today ${s.today}`;}
const DRILLS={
  1:async(sym)=>{const k=await M.chunk(sym,ST.days);const i=60+Math.floor(Math.random()*(k.length-90));const hist=k.slice(i-60,i),fut=k.slice(i,i+15);
    const ans=M.labelFuture(hist,fut),w=M.weather(hist);
    return {hist,fut,q:'Label for the NEXT 15 minutes?',opts:['Calm','Waking','Storm','Cooling'],ans,why:`Now: ${w.label} (last 10 = ${w.r.toFixed(2)}× the hour). Next 15 minutes averaged ${(M.avg(fut,M.range)/w.a60).toFixed(2)}× the hour → ${ans}.`};},
  2:async(sym)=>{for(let t=0;t<8;t++){const k=await M.chunk(sym,ST.days);const sp=M.findSpike(k);if(!sp.length)continue;const s=sp[Math.floor(Math.random()*sp.length)];
    const hist=k.slice(s.i-45,s.i+1),fut=k.slice(s.i+1,s.i+61);const ans=M.bracket(s.mins);
    return {hist,fut,mark:[hist.length-1,hist.length-1],q:'How many minutes until candles look normal again?',opts:['5','15','30','60+'],ans,why:`The 3-candle average fell back under 1.3× the pre-spike size after ${s.mins} minutes → bracket ${ans}. Engle's persistence: shocks fade step by step.`};}
    throw new Error('No 3× spike found, try again');},
  3:async(sym)=>{for(let t=0;t<8;t++){const k=await M.chunk(sym,ST.days);const mv=M.findMoves(k);if(!mv.length)continue;const s=mv[Math.floor(Math.random()*mv.length)];
    const hist=k.slice(s.i-50,s.i+1),fut=k.slice(s.i+1,s.i+11);const ans=s.after>=1.3?'Bigger & messier':'Calms down';
    return {hist,fut,mark:[hist.length-5,hist.length-1],q:`A sharp ${s.dir} (${(s.size*100).toFixed(2)}%). Next 10 candles?`,opts:['Bigger & messier','Calms down'],ans,why:`Next 10 candles averaged ${s.after.toFixed(2)}× the normal size before the move. Asymmetry: drops usually leave messier candles than rises. Log both kinds to see it in your own data.`,meta:{dir:s.dir,after:s.after}};}
    throw new Error('No sharp move found, try again');},
  6:async(sym)=>{const t=M.randomMoment(ST.days);const tr=await M.lastTrades(sym,t,20);if(tr.length<20)throw new Error('Too few trades, try again');
    const g=tr.filter(x=>x.buy).length;const ans=g>=13?'Green':g<=7?'Red':'Mixed';
    return {trades:tr,flash:3000,q:'Green, Red or Mixed?',opts:['Green','Red','Mixed'],ans,why:`${g} green, ${20-g} red (13+ of one colour counts as that colour).`};},
  7:async(sym)=>{for(let t=0;t<8;t++){const k=await M.chunk(sym,ST.days);const q=M.findQuiet(k);if(!q.length)continue;const s=q[Math.floor(Math.random()*q.length)];
    const hist=k.slice(s.i-60,s.i),fut=k.slice(s.i,s.i+5);const n3=M.avg(hist.slice(-3),c=>c.n),n60=M.avg(hist,c=>c.n);
    return {hist,fut,delta:true,info:`Trades per minute: last 3 min ${n3.toFixed(0)} vs hour ${n60.toFixed(0)}`,q:'Next 5 minutes stay quiet?',opts:['Yes, quiet','No, it moves'],ans:s.stayed?'Yes, quiet':'No, it moves',why:`Quiet = next 5 candles no bigger than normal and total range under 3 normal candles. Easley & O'Hara: no trading suggests no news.`};}
    throw new Error('No quiet stretch found, try again');},
  8:async(sym)=>{for(let t=0;t<8;t++){const k=await M.chunk(sym,ST.days);const a=M.findAbsorption(k);if(!a.length)continue;const s=a[Math.floor(Math.random()*a.length)];
    const hist=k.slice(s.i-50,s.i+1),fut=k.slice(s.i+1,s.i+4);const c=k[s.i],sh=1-c.tb/c.v;
    return {hist,fut,delta:true,mark:[hist.length-1,hist.length-1],info:`Marked candle: volume ${(c.v/M.avg(k.slice(s.i-60,s.i),x=>x.v)).toFixed(1)}× normal, ${Math.round(Math.max(sh,1-sh)*100)}% taker ${sh>=0.5?'SELL':'BUY'}, yet price hardly moved that way.`,
      q:'Next 3 minutes: up or down?',opts:['Up','Down'],ans:s.up?'Up':'Down',why:`${s.side==='sell-absorbed'?'Sellers were absorbed: the classic read is Up.':'Buyers were absorbed: the classic read is Down.'} Real result: ${s.up?'up':'down'} after 3 minutes.`};}
    throw new Error('No absorption found, try again');},
  9:async(sym)=>{for(let t=0;t<8;t++){const k=await M.chunk(sym,ST.days);const a=M.findTurnaround(k);if(!a.length)continue;const s=a[Math.floor(Math.random()*a.length)];
    const hist=k.slice(s.i-50,s.i+1),fut=k.slice(s.i+1,s.i+11);
    return {hist,fut,delta:true,mark:[hist.length-3,hist.length-1],q:'Where is price 10 minutes later?',opts:['Up','Down'],ans:s.up?'Up':'Down',why:`${s.dir==='LONG'?'Bullish turnaround (red, red, green with lower low, green delta)':'Bearish turnaround (green, green, red with higher high, red delta)'}. Real result: ${s.up?'up':'down'} after 10 minutes. Count how often the pattern works vs the no-edge rate.`,meta:{pat:s.dir}};}
    throw new Error('No turnaround found, try again');}
};
async function dload(d){
  DR={d,loading:true}; const box=$('#dr'); if(!box)return;
  box.innerHTML='<div class="card"><p class="small">Finding a real example in Binance history…</p></div>';
  try{ DR=Object.assign({d},await DRILLS[d.id](ST.coin)); }catch(e){ box.innerHTML=`<div class="card"><p class="no">${esc(e.message)}</p><button class="tbtn" id="retry">Try again</button></div>`;$('#retry').onclick=()=>dload(d);return;}
  ddraw();
}
function ddraw(){
  const box=$('#dr'); if(!box||!DR)return; const d=DR.d, rev=!!DR.pick;
  window.BE_CTX.drill=DR;
  let h='<div class="card">';
  if(DR.hist) h+=C.candles(DR.hist,DR.fut,{reveal:rev,delta:DR.delta,mark:DR.mark});
  if(DR.trades) h+=`<div id="flash">${rev||!DR.hidden?C.tape(DR.trades,C.dpOf(DR.trades[0].p)):'<p class="small">Hidden. What did your eye see?</p>'}</div>`;
  if(DR.info) h+=`<p class="small">${esc(DR.info)}</p>`;
  h+=`<p><b>${esc(DR.q)}</b></p><div class="opts">${DR.opts.map(o=>`<button class="opt ${rev?(o===DR.ans?'right':o===DR.pick?'wrong':''):''}" data-o="${esc(o)}" ${rev||(DR.trades&&!DR.hidden)?'disabled':''}>${esc(o)}</button>`).join('')}</div>`;
  if(rev) h+=`<div class="verdict ${DR.pick===DR.ans?'ok':'no'}">${DR.pick===DR.ans?'✓ Right':'✗ Answer: '+esc(DR.ans)}</div><p class="small">${esc(DR.why)}</p><div class="tools"><button class="tbtn y" id="dnext">Next →</button></div>`;
  h+='</div>';
  box.innerHTML=h;
  if(DR.trades&&!DR.hidden&&!rev){ DR.timer=setTimeout(()=>{DR.hidden=true;ddraw();},DR.flash); }
  document.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{DR.pick=b.dataset.o;DR.hidden=false;logDrill(d.id,DR.pick===DR.ans,Object.assign({sym:ST.coin},DR.meta||{}));dstat(d);ddraw();});
  const n=$('#dnext'); if(n) n.onclick=()=>dload(d);
}

/* ---------- LIVE book: drills 4, 5 (and a live tape) ---------- */
function live(){
  view(`<div class="card"><div class="ttl"><h2>Live book · drills 4 & 5</h2><span class="small" id="lsrc"></span></div>
  <p class="small">The real Binance order book right now, refreshed every 2 seconds. Walls (4× the typical level) are marked with their age. Predict before price gets there; the app scores it.</p>
  ${coinPicker(true)}</div>
  <div class="card" id="alarm" style="display:none"></div>
  <div class="grid"><div class="card"><div class="lbl"><span>Order book</span><span id="age"></span></div><div id="lbook"><p class="small">Connecting…</p></div></div>
  <div><div class="card"><div class="lbl"><span>Wall watch (drill 4)</span></div><div id="walls"></div></div>
  <div class="card"><div class="lbl"><span>Trades list (live)</span></div><div id="ltape"></div></div></div></div>`);
  bindPicker(()=>route());
  const sym=ST.coin; const L={sym,walls:{},spreads:[],mids:[],preds:[],alarm:null,a1:null,stop:false};
  window.BE_CTX.live=L;
  M.klines(sym,'1m',null,60).then(k=>{L.a1=M.avg(k,M.range);}).catch(()=>{});
  async function tick(){
    if(L.stop)return;
    try{
      const [b,t]=await Promise.all([M.liveBook(sym),M.liveTrades(sym)]);
      $('#lsrc')&&($('#lsrc').textContent='source: '+M.source());
      step(L,b,t);
    }catch(e){ const el=$('#lbook'); if(el) el.innerHTML=`<p class="no">Live data unavailable: ${esc(e.message)}</p>`; }
    L.timer=setTimeout(tick,2000);
  }
  tick();
  cleanup=()=>{L.stop=true;clearTimeout(L.timer);};
}
function step(L,b,t){
  const now=Date.now(), bb=b.bids[0][0], ba=b.asks[0][0], mid=(bb+ba)/2, spread=ba-bb, dp=C.dpOf(mid);
  L.mids.push([now,mid]); L.mids=L.mids.filter(x=>now-x[0]<6*60e3);
  L.spreads.push(spread); if(L.spreads.length>90)L.spreads.shift();
  const all=b.bids.concat(b.asks).map(x=>x[1]).sort((a,b)=>a-b), med=all[Math.floor(all.length/2)]||1;
  const seen={};
  const mark=(arr,side)=>arr.slice(0,30).map(([p,q])=>{const k=side+p;let tag=null,kind=null;
    if(q>=4*med&&Math.abs(p-mid)/mid<0.006){seen[k]=1;const w=L.walls[k]||(L.walls[k]={p,side,first:now,max:q});w.q=q;w.max=Math.max(w.max,q);tag=`${Math.round((now-w.first)/1000)}s old`;kind=now-w.first<30e3?'fresh':null;}
    return [p,q,tag,kind];});
  const asks=mark(b.asks,'a').slice(0,12), bids=mark(b.bids,'b').slice(0,12);
  // walls that disappeared
  const vLo=b.bids[Math.min(29,b.bids.length-1)][0], vHi=b.asks[Math.min(29,b.asks.length-1)][0];
  Object.entries(L.walls).forEach(([k,w])=>{if(w.p<vLo||w.p>vHi){if(now-w.first>10*60e3&&!L.preds.some(p=>p.k===k&&!p.done))delete L.walls[k];return;}const lv=(w.side==='a'?b.asks:b.bids).find(x=>x[0]===w.p);w.q=lv?lv[1]:0;if(!seen[k]&&w.q<0.3*w.max)w.gone=w.gone||now;});
  const sMed=L.spreads.slice().sort((a,b)=>a-b)[Math.floor(L.spreads.length/2)]||spread;
  const tick=Math.min(...b.asks.slice(0,5).map((x,i,a)=>i?x[0]-a[i-1][0]:Infinity).filter(x=>x>0))||spread;
  const wide=L.spreads.length>20&&spread>=3*sMed&&spread>=2*tick;
  const el=$('#lbook'); if(!el)return;
  el.innerHTML=C.book({asks,bids,mid,spread,wide,wideNote:wide?' ⚠ wide':''},dp);
  $('#ltape').innerHTML=C.tape(t.slice(0,20),dp);
  // drill 5: spread alarm
  if(wide&&!L.alarm&&L.a1){L.alarm={t:now,mid,ans:null};}
  const al=$('#alarm');
  if(L.alarm){
    const A=L.alarm, el5=Math.round((now-A.t)/1000);
    if(A.ans==null){al.style.display='';al.innerHTML=`<b>⚠ Spread alarm (drill 5)</b>: spread jumped to ${spread.toFixed(dp)} (normal ${sMed.toFixed(dp)}). Big move within 5 minutes?<div class="opts"><button class="opt" data-y="1">Yes</button><button class="opt" data-y="0">No</button></div>`;
      al.querySelectorAll('.opt').forEach(x=>x.onclick=()=>{A.ans=x.dataset.y==='1';A.t=Date.now();A.mid=mid;});}
    else{
      const w=L.mids.filter(x=>x[0]>=A.t), rg=Math.max(...w.map(x=>x[1]))-Math.min(...w.map(x=>x[1])), big=rg>=2*L.a1;
      if(now-A.t>=5*60e3||big){const ok=A.ans===big;logDrill(5,ok,{sym:L.sym});al.innerHTML=`<b>Spread alarm result:</b> ${big?'a big move came':'no big move'} (range ${rg.toFixed(dp)} vs 2× normal candle ${(2*L.a1).toFixed(dp)}). ${ok?'<span class="ok">✓ Right</span>':'<span class="no">✗ Wrong</span>'}`;L.alarm=null;setTimeout(()=>{if(!L.alarm&&$('#alarm'))$('#alarm').style.display='none';},8000);}
      else al.innerHTML=`<b>Spread alarm:</b> you said ${A.ans?'YES':'NO'}. Watching… ${el5}s / 300s, range so far ${rg.toFixed(dp)}`;
    }
  }
  // drill 4: wall watch
  const live=Object.entries(L.walls).filter(([k,w])=>!w.gone&&!w.done);
  const pend=L.preds.filter(p=>!p.done);
  pend.forEach(p=>{const w=L.walls[p.k];const near=Math.abs(mid-w.p)/w.p<=0.0003||(w.side==='a'?ba>=w.p:bb<=w.p);
    if(w.gone){p.done=true;p.res='pulled';}else if(near){p.done=true;p.res=w.q>=0.5*w.max?'holds':'pulled';}else if(now-p.t>5*60e3){p.done=true;p.res='expired';}
    if(p.done){w.done=true;if(p.res!=='expired')logDrill(4,p.res===p.say,{sym:L.sym});}});
  const wl=$('#walls');
  wl.innerHTML=(live.length?live.slice(0,6).map(([k,w])=>{const p=L.preds.find(x=>x.k===k&&!x.done);const dist=((w.p-mid)/mid*100).toFixed(2);
    return `<div class="wrow"><span class="${w.side==='a'?'no':'ok'}">${w.side==='a'?'Ask':'Bid'} wall ${w.p.toFixed(dp)}</span><span class="small">${dist}% · ${Math.round((now-w.first)/1000)}s · ${w.q.toFixed(w.q>=100?0:2)}</span>${p?`<span class="small">you: ${p.say}</span>`:`<span><button class="mini" data-k="${k}" data-s="holds">Holds</button><button class="mini" data-k="${k}" data-s="pulled">Pulled</button></span>`}</div>`;}).join(''):'<p class="small">No wall near price right now. Wait for one to appear.</p>')+
    L.preds.filter(p=>p.done).slice(-4).reverse().map(p=>`<div class="small">${p.res==='expired'?'⏱ expired (price never came)':p.res===p.say?'✓':'✗'} you said ${p.say}, wall ${p.res==='expired'?'':p.res}</div>`).join('');
  wl.querySelectorAll('.mini').forEach(x=>x.onclick=()=>{L.preds.push({k:x.dataset.k,say:x.dataset.s,t:Date.now()});});
}

/* ---------- PROGRESS ---------- */
function progress(){
  const s=replayStats(), lv=level();
  const days={};ST.replays.forEach(r=>{const d=new Date(r.ts).toISOString().substr(0,10);(days[d]=days[d]||[]).push(r);});
  const dk=Object.keys(days).sort().slice(-21);
  const bars=dk.map(d=>{const a=days[d];const w=a.filter(x=>x.g.ok).length/a.length;return `<div class="db" title="${d}: ${a.length}"><i style="height:${Math.max(4,w*100)}%"></i><span>${d.substr(8)}</span></div>`;}).join('');
  view(`<div class="card hero"><div class="lbl"><span>Level</span><span>last 300 replays</span></div><h2>${lv.name}</h2><div class="pbar big"><i style="width:${lv.score}%"></i></div>
  ${lv.tests.map(t=>`<div class="chk"><div class="ic">${t.ok?'✅':'⬜'}</div><div><b>${esc(t.k)}</b><span class="t">${esc(t.txt)}</span></div></div>`).join('')}
  <p class="small">Expert = all 5. Until then, Binance Demo Trading only. Not financial advice.</p></div>
  <div class="card"><div class="lbl"><span>Replay results (real data)</span></div>
  <div class="kpis"><div><b>${s.n}</b><span>replays</span></div><div><b>${s.trades}</b><span>trades</span></div><div><b>${s.trades?pct(s.winRate):'—'}</b><span>win rate</span></div><div><b>${pct(s.noEdge)}</b><span>no-edge</span></div><div><b>${s.trades?(s.avgR>=0?'+':'')+s.avgR.toFixed(2):'—'}</b><span>avg R</span></div><div><b>${s.sumR>=0?'+':''}${s.sumR.toFixed(1)}</b><span>total R</span></div></div>
  <div class="small">Longs: ${s.long.n} · win ${pct(s.long.win)} · avg ${s.long.avgR.toFixed(2)} R &nbsp;|&nbsp; Shorts: ${s.short.n} · win ${pct(s.short.win)} · avg ${s.short.avgR.toFixed(2)} R</div>
  <div class="small">Waits: ${s.waits} · correct ${pct(s.waitAcc)} · Discipline: ${pct(s.agree)} of trades matched the checklist · Checklist itself matched the market ${pct(s.checkCorrect)}</div>
  ${dk.length?`<div class="lbl" style="margin-top:8px"><span>Daily accuracy (last 21 days)</span></div><div class="dbars">${bars}</div>`:''}</div>
  <div class="card"><div class="lbl"><span>Eye calibration (your read vs numbers)</span></div>
  ${['weather','tape','btc'].map(k=>`<div class="crow"><span>${{weather:'Weather',tape:'Tape colour',btc:'Bitcoin wind'}[k]}</span><span>${s.cal[k].n?pct(s.cal[k].acc):'—'} <small>(${s.cal[k].n})</small></span></div>`).join('')}</div>
  <div class="card"><div class="lbl"><span>Drills (last 20 vs goal)</span></div>
  ${GD.drills.map(d=>{const t=drillStats(d.id);return `<div class="crow"><span>${d.id}. ${esc(d.name)}</span><span class="${t.n>=10&&t.last>=d.goal?'ok':''}">${t.n?pct(t.last):'—'} / ${pct(d.goal)} <small>(${t.n})</small></span></div>`;}).join('')}</div>
  <div class="card"><div class="lbl"><span>Backup &amp; devices</span></div>
  <p class="small">Progress is saved in this browser. Export a backup file and import it on your Mac or iPhone to continue there.</p>
  <div class="tools"><button class="tbtn" id="exp">Export backup</button><label class="tbtn">Import backup<input type="file" id="imp" accept=".json" hidden></label><button class="tbtn" id="csv">Export journal (CSV)</button><button class="tbtn" id="wipe">Reset everything</button></div><p class="small" id="msg"></p></div>`);
  const dl=(name,text,type)=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;document.body.appendChild(a);a.click();a.remove();};
  $('#exp').onclick=()=>dl(`bear-eyes-backup-${new Date().toISOString().substr(0,10)}.json`,JSON.stringify(Object.assign({},ST,{apiKey:''})),'application/json');
  $('#csv').onclick=()=>dl('bear-eyes-journal.csv','date,coin,moment_utc,call,checklist,market_best,result,R,minutes\n'+ST.replays.map(r=>[new Date(r.ts).toISOString(),r.sym,new Date(r.t).toISOString(),r.call,r.check,r.best,r.g.res,r.g.r,r.g.min||''].join(',')).join('\n'),'text/csv');
  $('#imp').onchange=e=>{const f=e.target.files[0];if(!f)return;f.text().then(t=>{const j=JSON.parse(t);if(!j||j.v!==1)throw 0;const key=ST.apiKey;ST=Object.assign(blank(),j);ST.apiKey=key;save();route();}).catch(()=>{$('#msg').textContent='That file is not a Bear Eyes backup.';});};
  let armed=false;$('#wipe').onclick=()=>{if(!armed){armed=true;$('#wipe').textContent='Tap again to erase all progress';return;}const key=ST.apiKey;ST=blank();ST.apiKey=key;save();route();};
}

window.BE_APP={route,save,ST:()=>ST};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',route);else route();
})();

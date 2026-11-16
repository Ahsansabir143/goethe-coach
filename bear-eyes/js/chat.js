/* 💬 Strategy coach — like the chat teacher in the German app: it knows this course
   (the guide, the drills, the plan, the 12 examples) and what is on your screen right now,
   and answers from that, in the browser. Optional: add your own Anthropic API key in the
   chat settings for free-form answers from Claude (key stays in this browser only). */
(function(){
'use strict';
const GD=window.BE_GUIDE, $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ST=()=>window.BE_STATE();
const strip=h=>String(h).replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
const lo=s=>' '+String(s).toLowerCase().replace(/[^a-z0-9.%+\- ]/g,' ')+' ';
const pct=x=>Math.round(x*100)+'%';

function md(t){return esc(t).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/\[(.+?)\]\((#[^)]+)\)/g,'<a href="$2">$1</a>').replace(/\n/g,'<br>');}

/* ---------- context answers: about what is on screen ---------- */
function aboutScreen(q){
  const X=window.BE_CTX||{};
  if(X.view==='replay'&&X.replay&&X.replay.m){
    const m=X.replay.m, rp=X.replay;
    const rows=m.check.rows.map(r=>`${r[1]?'🟢':r[2]?'🔴':'⚪'} **${r[0]}**: ${r[3]}`).join('\n');
    if(!rp.call) return `I won't give the answer before you call it, but here is how to read it:\n1. Weather: compare the last 10 candles with the whole hour. Taller with rising volume?\n2. Fee distance: is 0.40% (${m.fee.toFixed(m.dp)}) within about 3 recent candle heights?\n3. Tape: are most AND the biggest of the 20 trades one colour?\n4. Delta bars: which colour dominates the last 5 minutes?\n5. Bitcoin: last 4 fifteen-minute candles mostly up, down or flat?\nOnly if every box agrees: LONG or SHORT. Otherwise WAIT. Tap "Show numbers" to check your eye.`;
    const g=rp.g;
    let why=`**This moment, box by box:**\n${rows}\n\nChecklist verdict: **${m.check.verdict}**. You called **${rp.call}**. The market's best was **${m.best}** (LONG ${m.sims.LONG.res}, SHORT ${m.sims.SHORT.res}).`;
    if(rp.call!=='WAIT'&&m.check.verdict!==rp.call) why+=`\n\nThe boxes did not all agree, so by the rules this was not a trade. Even if it won, it doesn't build a measurable edge.`;
    else if(rp.call!=='WAIT'&&g.res==='stop') why+=`\n\nAll boxes can agree and the trade still lose: the edge is only visible over many trades. Compare your win rate with the no-edge rate (${Math.round(m.plan.stop/(m.plan.stop+m.plan.target)*100)}%) on the Progress page.`;
    if(m.best==='WAIT'&&rp.call!=='WAIT') why+=`\n\nNeither direction reached its target in 15 minutes: next-15 weather was ${m.futLabel}. ${m.w.label==='Calm'?'Calm cluster = fees win.':''}`;
    return why;
  }
  if(X.view==='examples'&&X.example){
    const e=X.example, s=e.s, rev=ST().ex[s.id];
    if(!rev) return `Example ${s.id}: before calling, check: weather (candles last 10 vs hour: ${e.a10.toFixed(1)} vs ${e.a60.toFixed(1)}), the fee line (${e.fee.toFixed(1)}), book lean (5 levels: ${e.imb>=0?'+':''}${e.imb.toFixed(2)}), tape (${e.green} of 20 green), and the Bitcoin chart. Are walls held or fresh? Is the spread normal?`;
    return `**Example ${s.id} · ${s.title}** → answer **${s.answer}**.\n${s.checks.map(c=>`• **${c[0]}**: ${c[2]}`).join('\n')}\n\n🎓 ${s.lesson}`;
  }
  if(X.view==='drill'&&X.drill&&X.drill.d){
    const D=X.drill; return D.pick?`**Drill ${D.d.id} · ${D.d.name}**: answer ${D.ans}. ${D.why}`:`**Drill ${D.d.id} · ${D.d.name}**: ${D.d.how} Goal: ${pct(D.d.goal)} over the last 20.`;
  }
  if(X.view==='live') return 'Live book: walls are levels 4× the typical size within 0.6% of price, with their age. A wall counts only after 30+ seconds AND price reacted to it. Tap Holds or Pulled before price gets there. When the spread jumps to 3× normal, the spread alarm (drill 5) asks you for a prediction.';
  return null;
}
function myStats(){
  const S=window.BE_STATS, s=S.replayStats(), lv=S.level();
  const weak=GD.drills.map(d=>({d,t:S.drillStats(d.id)})).filter(x=>x.t.n<10||x.t.last<x.d.goal).map(x=>`${x.d.id}. ${x.d.name} (${x.t.n?pct(x.t.last):'not started'} / ${pct(x.d.goal)})`);
  return `**Level: ${lv.name}** (${lv.passed}/5 expert tests).\nReplays ${s.n}, trades ${s.trades}, win rate ${s.trades?pct(s.winRate):'—'} vs no-edge ${pct(s.noEdge)}, average ${s.avgR.toFixed(2)} R after fees, discipline ${pct(s.agree)}.\n${weak.length?'Work on: '+weak.slice(0,4).join(', ')+'.':'All drills at goal 👏'}\n[Open Progress](#progress)`;
}
function todayPlan(){
  const day=Math.floor((Date.now()-ST().start)/864e5)+1, wk=Math.min(12,Math.ceil(day/7)), P=GD.plan[wk-1];
  const list=Object.entries(P.day).map(([k,n])=>k==='E'?`${n} guided examples`:k==='R'?`${n} real-data replays`:`${n} × drill ${k} (${GD.drills.find(d=>d.id==k).name})`).join(', ');
  return `**Day ${day}, week ${wk}: ${P.focus}.**\nToday: ${list}.\nMove on when: ${P.pass}.\n[Open Today](#today)`;
}

/* ---------- knowledge search ---------- */
const DOCS=[];
GD.faq.forEach(f=>DOCS.push({keys:f.k,text:f.a,go:f.go}));
GD.parts.forEach(p=>{
  const rows=p.html.split(/<tr>|<li>|<p[^>]*>/).map(strip).filter(x=>x.length>30);
  rows.forEach(r=>DOCS.push({keys:[],text:r,go:'#learn/'+p.id,title:p.title}));
});
GD.drills.forEach(d=>DOCS.push({keys:['drill '+d.id,d.name.toLowerCase()],text:`Drill ${d.id} · ${d.name} (${d.who}): ${d.how} Goal ${pct(d.goal)}.`,go:d.id===10?'#replay':d.data==='live'?'#live':'#drill/'+d.id}));
SCEN.forEach(s=>DOCS.push({keys:['example '+s.id,s.short.toLowerCase()],text:`Example ${s.id} · ${s.title}: ${s.lesson}`,go:'#examples/'+s.id}));
const STOP=new Set('the a an is are what how why when do does i my me to of in on for and or it this that with be can should you your at by from as'.split(' '));
function search(q){
  const Q=lo(q), toks=Q.trim().split(/\s+/).filter(t=>t.length>1&&!STOP.has(t));
  let best=null,bs=0;
  DOCS.forEach(d=>{
    let s=0; d.keys.forEach(k=>{if(Q.includes(' '+k+' ')||Q.includes(' '+k))s+=k.includes(' ')?6:4;});
    const T=lo(d.text); toks.forEach(t=>{if(T.includes(' '+t))s+=1;});
    if(s>bs){bs=s;best=d;}
  });
  return bs>=2?best:null;
}
function local(q){
  const Q=lo(q);
  if(/ (why|explain|this one|this moment|what did i miss|wrong|help me read|how do i read|hint) /.test(Q)){const a=aboutScreen(q);if(a)return a;}
  if(/ (my stats|my score|how am i|progress|my level|am i expert|am i good|ready) /.test(Q)) return myStats();
  if(/ (today|what should i (do|practi[cs]e)|plan for|schedule) /.test(Q)) return todayPlan();
  const d=search(q);
  if(d) return d.text+(d.go?`\n[Open →](${d.go})`:'');
  const a=aboutScreen(q); if(a) return a;
  return "I'm not sure about that one. Try asking about: weather, fee distance, imbalance, tape colour, Bitcoin wind, walls, spread/toxic flow, Delta Turnaround, absorption, stop size, no-edge rate, today's plan, or \"why\" after a replay. For free-form answers, add a Claude API key in ⚙️.";
}

/* ---------- optional Claude ---------- */
function systemPrompt(){
  const guide=GD.parts.map(p=>p.title+'\n'+strip(p.html)).join('\n\n');
  const drills=GD.drills.map(d=>`Drill ${d.id} ${d.name}: ${d.how} Goal ${pct(d.goal)}.`).join('\n');
  const X=window.BE_CTX||{}; let ctx='';
  const a=aboutScreen('why'); if(a) ctx='\n\nWHAT IS ON THE USER\'S SCREEN NOW:\n'+a;
  return `You are the coach inside "Bear Eyes", a practice app for reading crypto perpetual futures charts, order books and trades by eye, based on the guide below (Engle = volatility weather, O'Hara = order-flow wind). Answer in plain, simple English, short (under 150 words unless asked), using only the strategy's terms. Remind that it is practice in Binance Demo Trading and not financial advice only when the user asks about real money. Do not reveal the answer of an unrevealed replay or example.\n\nGUIDE:\n${guide}\n\nDRILLS:\n${drills}\n\nUSER STATS:\n${strip(myStats())}${ctx}`;
}
async function claude(q,hist){
  const msgs=hist.slice(-8).map(m=>({role:m.r==='u'?'user':'assistant',content:m.t})); msgs.push({role:'user',content:q});
  const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'content-type':'application/json','x-api-key':ST().apiKey,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
    body:JSON.stringify({model:'claude-sonnet-5-5',max_tokens:700,system:systemPrompt(),messages:msgs})});
  if(!r.ok) throw new Error('Claude API '+r.status);
  const j=await r.json(); return (j.content||[]).map(c=>c.text||'').join('');
}

/* ---------- UI ---------- */
function ui(){
  const b=document.createElement('button'); b.id='chatBtn'; b.textContent='💬'; b.setAttribute('aria-label','Ask the coach');
  const p=document.createElement('div'); p.id='chatP';
  p.innerHTML=`<div class="chd"><b>Bear Eyes coach</b><span><button class="mini" id="chatSet">⚙️</button><button class="mini" id="chatX">✕</button></span></div>
  <div id="chatSetBox" class="calib"><label class="small">Optional Claude API key (stays in this browser) for free-form answers:<input class="inp" id="chatKey" type="password" placeholder="sk-ant-…"></label><div class="tools"><button class="tbtn" id="chatKeySave">Save</button><button class="tbtn" id="chatClear">Clear chat</button></div></div>
  <div id="chatLog"></div><div class="sugg">${['Why?','Explain imbalance','Where does my stop go?','What should I practise today?','How am I doing?'].map(s=>`<button class="chip">${s}</button>`).join('')}</div>
  <form id="chatF"><input id="chatIn" class="inp" placeholder="Ask about the strategy…" autocomplete="off"><button class="tbtn y">Send</button></form>`;
  document.body.append(b,p);
  const log=$('#chatLog');
  const render=()=>{const C=ST().chat;log.innerHTML=(C.length?C:[{r:'a',t:'Hi Ahsan 👋 Ask me anything about the Bear Eyes strategy: weather, wind, walls, stops, or "why?" about the replay on screen.'}]).map(m=>`<div class="msg ${m.r}">${md(m.t)}</div>`).join('');log.scrollTop=log.scrollHeight;};
  async function ask(q){
    q=q.trim(); if(!q)return; const C=ST().chat; C.push({r:'u',t:q}); render();
    let a;
    if(ST().apiKey){ C.push({r:'a',t:'…'}); render(); try{a=await claude(q,C.slice(0,-2));}catch(e){a=local(q)+'\n\n('+e.message+': answered from the built-in coach)';} C.pop(); }
    else a=local(q);
    C.push({r:'a',t:a}); if(C.length>60)C.splice(0,C.length-60); window.BE_APP.save(); render();
  }
  b.onclick=()=>{p.classList.toggle('open');render();setTimeout(()=>$('#chatIn').focus(),50);};
  $('#chatX').onclick=()=>p.classList.remove('open');
  $('#chatSet').onclick=()=>{$('#chatSetBox').classList.toggle('show');$('#chatKey').value=ST().apiKey?'••••••••':'';};
  $('#chatKeySave').onclick=()=>{const v=$('#chatKey').value.trim();if(v&&!v.startsWith('•'))ST().apiKey=v;if(!v)ST().apiKey='';window.BE_APP.save();$('#chatSetBox').classList.remove('show');};
  $('#chatClear').onclick=()=>{ST().chat=[];window.BE_APP.save();render();};
  $('#chatF').onsubmit=e=>{e.preventDefault();const v=$('#chatIn').value;$('#chatIn').value='';ask(v);};
  p.querySelectorAll('.sugg .chip').forEach(c=>c.onclick=()=>ask(c.textContent));
  log.addEventListener('click',e=>{if(e.target.tagName==='A')p.classList.remove('open');});
}
window.BE_CHAT={local};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ui);else ui();
})();

/* Bear Eyes — real market data engine.
   Pulls PAST real data from Binance public market-data endpoints in the browser
   (USDⓈ-M futures first, then the spot mirrors), computes the eye-checklist numbers,
   and grades a call against what really happened next. No account or key needed. */
(function(){
'use strict';
const BASES=[
  {name:'Binance Futures',k:'https://fapi.binance.com/fapi/v1',max:1500,fut:true},
  {name:'Binance Spot (data mirror)',k:'https://data-api.binance.vision/api/v3',max:1000},
  {name:'Binance Spot',k:'https://api.binance.com/api/v3',max:1000}
];
let good=null; // index of the base that worked last
const FEE_RT=0.0010;   // round-trip taker fees 0.05% + 0.05%
const MIN_TARGET=0.004; // the strategy's 0.40% target rule

async function getJSON(path){
  const order=good==null?[0,1,2]:[good,...[0,1,2].filter(i=>i!==good)];
  let lastErr;
  for(const i of order){
    const b=BASES[i];
    try{
      const r=await fetch(b.k+path,{cache:'no-store'});
      if(!r.ok){lastErr=new Error(b.name+' '+r.status);continue;}
      const j=await r.json(); good=i; return j;
    }catch(e){lastErr=e;}
  }
  throw lastErr||new Error('No Binance endpoint reachable');
}
function source(){return good==null?'—':BASES[good].name;}

const parseK=a=>a.map(k=>({t:+k[0],o:+k[1],h:+k[2],l:+k[3],c:+k[4],v:+k[5],n:+k[8],tb:+k[9]}));
async function klines(sym,interval,startTime,limit,endTime){
  let q=`/klines?symbol=${sym}&interval=${interval}&limit=${Math.min(limit,1000)}`;
  if(startTime!=null)q+=`&startTime=${startTime}`; if(endTime!=null)q+=`&endTime=${endTime}`;
  return parseK(await getJSON(q));
}
async function aggTrades(sym,startTime,endTime){
  const a=await getJSON(`/aggTrades?symbol=${sym}&startTime=${startTime}&endTime=${endTime}&limit=1000`);
  return a.map(x=>({T:+x.T,p:+x.p,q:+x.q,buy:!x.m}));
}
async function lastTrades(sym,t,count=20){
  for(const w of [60e3,5*60e3,30*60e3]){
    const tr=await aggTrades(sym,t-w,t-1);
    if(tr.length>=count) return tr.slice(-count).reverse();
    if(w===30*60e3) return tr.reverse();
  }
  return [];
}
// real depth lean from the repo's archive (built from Binance bookDepth files), if present
const depthCache={};
async function depthLean(sym,t){
  const d=new Date(t), key=`${sym}-${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,'0')}`;
  if(!(key in depthCache)){
    depthCache[key]=null;
    try{const r=await fetch(`data/depth/${key}.json`);if(r.ok)depthCache[key]=await r.json();}catch(e){}
  }
  const f=depthCache[key]; if(!f) return null;
  const day=String(d.getUTCDate()).padStart(2,'0'), m=d.getUTCHours()*60+d.getUTCMinutes();
  const arr=f.days&&f.days[day]; if(!arr) return null;
  for(let k=m;k>=Math.max(0,m-3);k--){ if(arr[k]!=null) return {imb:arr[k]/100, band:f.band||'±1%'}; }
  return null;
}

/* ---------- numbers behind the eye checks ---------- */
const range=c=>c.h-c.l;
const avg=(a,f)=>a.length?a.reduce((s,x)=>s+f(x),0)/a.length:0;
function weather(hist){
  const a60=avg(hist,range), a10=avg(hist.slice(-10),range), aPrev=avg(hist.slice(-20,-10),range);
  const v60=avg(hist,c=>c.v), v10=avg(hist.slice(-10),c=>c.v);
  const r=a10/a60, rp=aPrev/a60, vr=v10/v60;
  let label;
  if(r>=1.8) label='Storm';
  else if(rp>=1.4 && r<rp*0.8) label='Cooling';
  else if(r>=1.15 && vr>=1.0) label='Waking';
  else if(r<1.0) label='Calm';
  else label=r>=rp?'Waking':'Cooling';
  return {a60,a10,r,rp,vr,label};
}
function labelFuture(hist,fut){ // same rule applied to the next 15 minutes
  const a60=avg(hist,range), a10=avg(hist.slice(-10),range), af=avg(fut,range), vf=avg(fut,c=>c.v)/avg(hist,c=>c.v);
  const r=af/a60, rp=a10/a60;
  if(r>=1.8) return 'Storm';
  if(rp>=1.4 && r<rp*0.8) return 'Cooling';
  if(r>=1.15 && vf>=1.0) return 'Waking';
  if(r<1.0) return 'Calm';
  return r>=rp?'Waking':'Cooling';
}
function tapeStats(tr){
  const g=tr.filter(x=>x.buy).length, n=tr.length;
  const bv=tr.filter(x=>x.buy).reduce((s,x)=>s+x.q,0), sv=tr.filter(x=>!x.buy).reduce((s,x)=>s+x.q,0);
  const big=[...tr].sort((a,b)=>b.q-a.q).slice(0,3), bigG=big.filter(x=>x.buy).length;
  let colour='Mixed'; if(n){ if(g>=13&&bigG>=2)colour='Green'; else if(n-g>=13&&bigG<=1)colour='Red'; }
  return {green:g,red:n-g,n,buyVol:bv,sellVol:sv,bigGreen:bigG,colour};
}
function deltaMin(c){return c.tb-(c.v-c.tb);} // taker buy − taker sell, per minute
function btcWind(b){
  const last=b.slice(-4), up=last.filter(c=>c.c>=c.o).length;
  const ch=(last[last.length-1].c-last[0].o)/last[0].o;
  let wind='Flat'; if(up>=3&&ch>0.0005)wind='Up'; else if(up<=1&&ch<-0.0005)wind='Down';
  return {up,down:last.length-up,ch,wind};
}
function plan(price,w){
  const stop=Math.max(1.5*w.a10, price*0.0015);
  const target=Math.max(2*stop, price*MIN_TARGET);
  return {stop,target};
}
function checklist(m){
  const L=[],S=[];
  const wOK=(m.w.label==='Waking'||m.w.label==='Storm');
  const feeOK=m.feeHeights<=3;
  const t=m.tape, d5=m.delta5;
  const depth=m.depth?m.depth.imb:null;
  const rows=[
    ['Weather', wOK, wOK, `${m.w.label}: last 10 candles ${m.w.r.toFixed(2)}× the hour's average, volume ${m.w.vr.toFixed(2)}×`],
    ['Fee distance', feeOK, feeOK, `0.40% = ${m.fee.toFixed(m.dp)} = ${m.feeHeights.toFixed(1)} recent candle heights (needs ≤ 3)`],
    ['Tape colour', t.colour==='Green', t.colour==='Red', `${t.green} green / ${t.red} red, biggest 3: ${t.bigGreen} green → ${t.colour}`],
    ['5-min delta', d5>0, d5<0, `taker buy − sell over 5 minutes: ${d5>0?'+':''}${fmtQty(d5)}`],
    ['Bitcoin wind', m.wind.wind==='Up', m.wind.wind==='Down', `last 4 Bitcoin 15-minute candles: ${m.wind.up} up, ${m.wind.down} down → ${m.wind.wind}`]
  ];
  if(depth!=null) rows.push(['Book lean', depth>=0.30, depth<=-0.30, `${m.depth.band} depth imbalance ${depth>=0?'+':''}${depth.toFixed(2)} (needs ±0.30)`]);
  const longOK=rows.every(r=>r[1]), shortOK=rows.every(r=>r[2]);
  return {rows, verdict: longOK?'LONG':shortOK?'SHORT':'WAIT'};
}
function fmtQty(x){const a=Math.abs(x);return (x<0?'-':'')+(a>=1000?(a/1000).toFixed(1)+'k':a>=10?a.toFixed(0):a.toFixed(2));}
function simulate(dir,entry,p,fut){
  const st=dir==='LONG'?entry-p.stop:entry+p.stop, tg=dir==='LONG'?entry+p.target:entry-p.target;
  for(let i=0;i<fut.length;i++){
    const c=fut[i];
    const hitS=dir==='LONG'?c.l<=st:c.h>=st, hitT=dir==='LONG'?c.h>=tg:c.l<=tg;
    if(hitS) return {res:'stop',min:i+1,exit:st};           // stop first if both in one candle (conservative)
    if(hitT) return {res:'target',min:i+1,exit:tg};
  }
  return {res:'timeout',min:fut.length,exit:fut[fut.length-1].c};
}
function rResult(dir,entry,p,sim){
  const move=dir==='LONG'?sim.exit-entry:entry-sim.exit;
  return (move-entry*FEE_RT)/p.stop;
}

/* ---------- a full replay moment ---------- */
function randomMoment(daysBack=90){
  const now=Date.now(), lo=now-daysBack*864e5, hi=now-40*60e3;
  return Math.floor((lo+Math.random()*(hi-lo))/60e3)*60e3;
}
async function loadMoment(sym,t){
  const start=t-60*60e3;
  const [k,b]=await Promise.all([klines(sym,'1m',start,75), klines('BTCUSDT','15m',null,12,t-1)]);
  const hist=k.filter(c=>c.t<t), fut=k.filter(c=>c.t>=t);
  if(hist.length<55||fut.length<15) throw new Error('Not enough candles at that time');
  const tr=await lastTrades(sym,t,20);
  const depth=await depthLean(sym,t);
  return analyse({sym,t,hist,fut:fut.slice(0,15),btc:b,trades:tr,depth});
}
function analyse(x){
  const price=x.hist[x.hist.length-1].c;
  const dp=price>=1000?1:price>=10?2:price>=1?3:5;
  const w=weather(x.hist), fee=price*MIN_TARGET;
  const m={...x,price,dp,w,fee,feeHeights:fee/w.a10,tape:tapeStats(x.trades),
    delta5:x.hist.slice(-5).reduce((s,c)=>s+deltaMin(c),0), wind:btcWind(x.btc),
    tradesPerMin10:avg(x.hist.slice(-10),c=>c.n), tradesPerMin60:avg(x.hist,c=>c.n)};
  m.plan=plan(price,w);
  m.check=checklist(m);
  m.sims={LONG:simulate('LONG',price,m.plan,x.fut),SHORT:simulate('SHORT',price,m.plan,x.fut)};
  m.best=m.sims.LONG.res==='target'?'LONG':m.sims.SHORT.res==='target'?'SHORT':'WAIT';
  m.futLabel=labelFuture(x.hist,x.fut);
  return m;
}
function grade(m,call){
  if(call==='WAIT'){
    const ok=m.best==='WAIT';
    return {call,ok,r:0,res:ok?'correct wait':'missed '+m.best};
  }
  const sim=m.sims[call]; const r=rResult(call,m.price,m.plan,sim);
  return {call,ok:sim.res==='target'||(sim.res==='timeout'&&r>0),r,res:sim.res,min:sim.min};
}

/* ---------- drill finders on a real 1000-minute chunk ---------- */
async function chunk(sym,daysBack=90){
  const t=randomMoment(daysBack)-1000*60e3;
  const k=await klines(sym,'1m',t,1000);
  if(k.length<500) throw new Error('Not enough data');
  return k;
}
function findSpike(k){
  const out=[];
  for(let i=60;i<k.length-90;i++){
    const base=avg(k.slice(i-60,i),range);
    if(range(k[i])>=3*base){
      let j=i+1; // minutes until a 3-candle average is back under 1.3× base
      for(;j<k.length-3;j++){ if(avg(k.slice(j,j+3),range)<=1.3*base) break; }
      out.push({i,base,mins:j-i});
      i+=30;
    }
  }
  return out;
}
const bracket=m=>m<=7?'5':m<=20?'15':m<=45?'30':'60+';
function findMoves(k){ // sharp 5-minute moves for the asymmetry drill
  const out=[];
  for(let i=65;i<k.length-15;i++){
    const base=avg(k.slice(i-65,i-5),range), mv=k[i].c-k[i-5].c;
    if(Math.abs(mv)>=5*base){
      const after=avg(k.slice(i+1,i+11),range)/base;
      out.push({i,dir:mv>0?'rise':'drop',size:Math.abs(mv)/k[i].c,after});
      i+=20;
    }
  }
  return out;
}
function findQuiet(k){
  const out=[];
  for(let i=60;i<k.length-6;i++){
    const tn=avg(k.slice(i-60,i),c=>c.n), ar=avg(k.slice(i-60,i),range);
    const last3=avg(k.slice(i-3,i),c=>c.n);
    if(last3<=0.5*tn){
      const f=k.slice(i,i+5), stayed=avg(f,range)<=1.1*ar && Math.max(...f.map(c=>c.h))-Math.min(...f.map(c=>c.l))<=3*ar;
      out.push({i,stayed}); i+=15;
    }
  }
  return out;
}
function findAbsorption(k){
  const out=[];
  for(let i=60;i<k.length-4;i++){
    const c=k[i], vAvg=avg(k.slice(i-60,i),x=>x.v), ar=avg(k.slice(i-60,i),range);
    const sellShare=1-c.tb/c.v;
    if(c.v>=1.5*vAvg){
      if(sellShare>=0.58 && c.c>=c.o-0.15*ar) out.push({i,side:'sell-absorbed',up:k[i+3].c>c.c});
      else if(sellShare<=0.42 && c.c<=c.o+0.15*ar) out.push({i,side:'buy-absorbed',up:k[i+3].c>c.c});
      if(out.length&&out[out.length-1].i===i) i+=10;
    }
  }
  return out;
}
function findTurnaround(k){
  const out=[];
  for(let i=62;i<k.length-11;i++){
    const a=k[i-2],b=k[i-1],c=k[i];
    if(a.c<a.o&&b.c<b.o&&c.c>c.o&&c.l<Math.min(a.l,b.l)&&c.tb>c.v/2) out.push({i,dir:'LONG',up:k[i+10].c>c.c});
    else if(a.c>a.o&&b.c>b.o&&c.c<c.o&&c.h>Math.max(a.h,b.h)&&c.tb<c.v/2) out.push({i,dir:'SHORT',up:k[i+10].c>c.c});
    if(out.length&&out[out.length-1].i===i) i+=10;
  }
  return out;
}

/* ---------- live order book (drills 4, 5, 6 live) ---------- */
async function liveBook(sym){
  const d=await getJSON(`/depth?symbol=${sym}&limit=50`);
  return {bids:d.bids.map(x=>[+x[0],+x[1]]),asks:d.asks.map(x=>[+x[0],+x[1]]),t:Date.now()};
}
async function liveTrades(sym){
  const a=await getJSON(`/aggTrades?symbol=${sym}&limit=40`);
  return a.map(x=>({T:+x.T,p:+x.p,q:+x.q,buy:!x.m})).reverse();
}

window.BE_MARKET={getJSON,source,klines,aggTrades,lastTrades,loadMoment,analyse,grade,randomMoment,
  weather,labelFuture,tapeStats,btcWind,chunk,findSpike,bracket,findMoves,findQuiet,findAbsorption,findTurnaround,
  liveBook,liveTrades,range,avg,FEE_RT,MIN_TARGET,fmtQty,deltaMin};
})();

/* Shared drawing: candle chart with volume / delta, Bitcoin mini chart, order book, trades list. */
(function(){
'use strict';
const G='#0ecb81',R='#f6465d',Y='#f0b90b',MUT='#848e9c',LINE='#2b3139';
function fmt(p,dp){return (+p).toFixed(dp);}
function dpOf(p){return p>=1000?1:p>=10?2:p>=1?3:5;}
/* hist, fut: arrays of {o,h,l,c,v,(tb)}; opts: {reveal, plan:{entry,stop,target}, mark:[i0,i1], delta:true, trades:true, hideLabel} */
function candles(hist,fut,opts={}){
  fut=fut||[]; const reveal=!!opts.reveal;
  const all=reveal?hist.concat(fut):hist;
  const W=600,PT=8,PH=200,sub=opts.delta?2:1,VH=46,H=PT+PH+12+sub*(VH+10);
  const n=hist.length+fut.length, cw=(W-56)/Math.max(n,1);
  const span=hist.concat(fut);
  let lo=Math.min(...span.map(c=>c.l)),hi=Math.max(...span.map(c=>c.h));
  if(opts.plan&&reveal){lo=Math.min(lo,opts.plan.lo);hi=Math.max(hi,opts.plan.hi);}
  const pad=(hi-lo)*.06||1; lo-=pad; hi+=pad;
  const dp=dpOf(hi), y=p=>PT+(hi-p)/(hi-lo)*PH;
  let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="1-minute candle chart">`;
  for(let i=0;i<=4;i++){const p=lo+(hi-lo)*i/4,yy=y(p);s+=`<line x1="0" x2="${W-56}" y1="${yy}" y2="${yy}" stroke="${LINE}"/><text x="${W-52}" y="${yy+4}" fill="${MUT}" font-size="11">${fmt(p,dp)}</text>`;}
  const nowX=hist.length*cw;
  if(fut.length){
    s+=`<rect x="${nowX}" y="0" width="${W-56-nowX}" height="${H}" fill="${reveal?'rgba(240,185,11,.05)':'rgba(255,255,255,.035)'}"/>`;
    if(!reveal) s+=`<text x="${nowX+(W-56-nowX)/2}" y="${PT+PH/2}" fill="#5e6673" font-size="12" text-anchor="middle">next ${fut.length} min</text><text x="${nowX+(W-56-nowX)/2}" y="${PT+PH/2+15}" fill="#5e6673" font-size="12" text-anchor="middle">hidden</text>`;
    s+=`<line x1="${nowX}" x2="${nowX}" y1="0" y2="${H}" stroke="${Y}" stroke-dasharray="3 3"/><text x="${nowX-4}" y="${PT+PH+10}" fill="${Y}" font-size="10" text-anchor="end">NOW</text>`;
  }
  const vmax=Math.max(...span.map(c=>c.v))||1;
  const dl=c=>c.tb!=null?c.tb-(c.v-c.tb):0;
  const dmax=Math.max(...span.map(c=>Math.abs(dl(c))))||1;
  const VT=PT+PH+16, DT=VT+VH+10;
  all.forEach((c,i)=>{
    const x=i*cw+cw/2,col=c.c>=c.o?G:R,bt=y(Math.max(c.o,c.c)),bb=y(Math.min(c.o,c.c));
    s+=`<line x1="${x}" x2="${x}" y1="${y(c.h)}" y2="${y(c.l)}" stroke="${col}"/><rect x="${x-cw*.35}" y="${bt}" width="${cw*.7}" height="${Math.max(1,bb-bt)}" fill="${col}"/>`;
    const vh=c.v/vmax*VH; s+=`<rect x="${x-cw*.35}" y="${VT+VH-vh}" width="${cw*.7}" height="${vh}" fill="${col}" opacity=".5"/>`;
    if(opts.delta){const d=dl(c),dh=Math.abs(d)/dmax*(VH/2),mid=DT+VH/2;s+=`<rect x="${x-cw*.35}" y="${d>=0?mid-dh:mid}" width="${cw*.7}" height="${Math.max(.5,dh)}" fill="${d>=0?G:R}"/>`;}
  });
  if(opts.mark){const [a,b]=opts.mark;s+=`<rect x="${a*cw-1}" y="${PT}" width="${(b-a+1)*cw+2}" height="${PH}" fill="none" stroke="${Y}" rx="3"/>`;}
  if(opts.plan&&reveal){
    const L=(p,col,t)=>{s+=`<line x1="${Math.max(0,nowX-cw*8)}" x2="${W-56}" y1="${y(p)}" y2="${y(p)}" stroke="${col}" stroke-dasharray="5 3" stroke-width="1.3"/><text x="${Math.max(0,nowX-cw*8)}" y="${y(p)-3}" fill="${col}" font-size="11">${t} ${fmt(p,dp)}</text>`;};
    L(opts.plan.entry,'#eaecef','Entry'); if(opts.plan.stop!=null)L(opts.plan.stop,R,'Stop'); if(opts.plan.target!=null)L(opts.plan.target,G,'Target');
  }
  s+=`<text x="2" y="${VT-3}" fill="${MUT}" font-size="10">Volume</text>`;
  if(opts.delta) s+=`<line x1="0" x2="${W-56}" y1="${DT+VH/2}" y2="${DT+VH/2}" stroke="${LINE}"/><text x="2" y="${DT-2}" fill="${MUT}" font-size="10">Delta (taker buy − sell)</text>`;
  return s+'</svg>';
}
function mini(c){
  const W=300,H=90,lo=Math.min(...c.map(x=>x.l)),hi=Math.max(...c.map(x=>x.h)),y=p=>6+(hi-p)/((hi-lo)||1)*(H-12),cw=W/c.length;
  let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Bitcoin 15-minute chart">`;
  c.forEach((k,i)=>{const x=i*cw+cw/2,col=k.c>=k.o?G:R,bt=y(Math.max(k.o,k.c)),bb=y(Math.min(k.o,k.c));s+=`<line x1="${x}" x2="${x}" y1="${y(k.h)}" y2="${y(k.l)}" stroke="${col}"/><rect x="${x-cw*.32}" y="${bt}" width="${cw*.64}" height="${Math.max(1,bb-bt)}" fill="${col}"/>`;});
  return s+'</svg>';
}
/* trades: [{T,p,q,buy}] newest first */
function tape(tr,dp){
  if(!tr.length) return '<p class="small">No trades in that window.</p>';
  const big=Math.max(...tr.map(x=>x.q))*0.45;
  let h='<div class="tape"><div class="h">Time (UTC)</div><div class="h">Price</div><div class="h r">Size</div>';
  tr.forEach(x=>{const c=(x.buy?'buy':'sell')+(x.q>=big?' big':'');const t=new Date(x.T).toISOString().substr(11,8);
    h+=`<div class="small">${t}</div><div class="${c}">${(+x.p).toFixed(dp)}</div><div class="${c} r">${x.q>=100?x.q.toFixed(0):x.q.toFixed(3)}</div>`;});
  return h+'</div>';
}
/* book: {asks:[[price,size,tag,kind]], bids:[...], mid, spread, wideNote} asks low→high */
function book(b,dp){
  const asks=b.asks.slice().reverse(), all=b.asks.concat(b.bids), mx=Math.max(...all.map(l=>l[1]))||1;
  const row=(l,cls)=>`<div class="row ${cls}"><div class="bar" style="width:${Math.min(100,l[1]/mx*100)}%"></div><span class="p">${(+l[0]).toFixed(dp)}</span><span class="sz">${l[1]?(l[1]>=100?l[1].toFixed(0):l[1].toFixed(l[1]>=10?1:3)):'—'}</span>${l[2]?`<span class="tag ${l[3]||''}">▲ ${l[3]==='pulled'?'':'WALL · '}${l[2]}</span>`:''}</div>`;
  let h=`<div class="book"><div class="row hd"><span>Price</span><span class="sz">Size</span></div>`;
  asks.forEach(l=>h+=row(l,'ask'));
  h+=`<div class="mid"><span>${(+b.mid).toFixed(dp)}</span><span class="spr ${b.wide?'wide':''}">Spread ${(+b.spread).toFixed(dp)}${b.wideNote||''}</span></div>`;
  b.bids.forEach(l=>h+=row(l,'bid'));
  return h+'</div>';
}
window.BE_CHART={candles,mini,tape,book,dpOf};
})();

// ---------- generator ----------
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;}}
function gen(start, segs, seed){
  const r=rng(seed); let p=start; const out=[];
  for(const s of segs){
    if(s.ex){ for(const [dc,up,dn,vol] of s.ex){const o=p,c=o+dc;out.push({o,c,h:Math.max(o,c)+up,l:Math.min(o,c)-dn,v:vol});p=c;} continue; }
    for(let i=0;i<s.n;i++){
      const o=p, n1=(r()-0.5)*2, n2=r(), n3=r();
      const c=o+s.d+n1*s.v*0.55;
      const h=Math.max(o,c)+n2*s.v*0.35, l=Math.min(o,c)-n3*s.v*0.35;
      const v=(s.vb||100)*(0.7+r()*0.6)*(0.6+Math.abs(c-o)/(s.v||1)*0.5);
      out.push({o,c,h,l,v}); p=c;
    }
  }
  return out;
}
function levels(sizes, side, step){ // side +1 ask, -1 bid ; offsets 1,3,5...
  return sizes.map((s,i)=>({off:side*(1+i*step), size:typeof s==='number'?s:s[0], tag:typeof s==='number'?null:s[1], kind:typeof s==='number'?null:s[2]}));
}
function tape(pattern, sizes, gaps){
  return pattern.split('').map((ch,i)=>({side:ch==='G'?'buy':'sell', size:sizes[i], gap:gaps?gaps[i]:1+(i*7%3)}));
}

// ---------- scenarios ----------
const SCEN=[
{
 id:1, title:"Weather wakes up, wind blows up", short:"Waking + green",
 coin:"ETH", start:2968, seed:11,
 hist:[{n:40,d:0.05,v:1.6,vb:120},{n:20,d:0.55,v:8.5,vb:330}],
 fut:[{n:15,d:1.5,v:7,vb:380}],
 btc:[{n:6,d:0,v:40},{n:6,d:55,v:45}],
 spread:0.1,
 asks:[12,10,14,11,13,15,12,14,16,[70,'held 2m','wall']],
 bids:[20,24,18,22,[60,'held 48s','wall'],16,14,15,13,12],
 tapeP:"GGGRGGGGRGGRGGGGRGGG", tapeS:[3.2,1.1,8.4,0.6,2.2,5.9,1.4,0.9,0.7,6.8,1.2,0.5,2.7,4.1,1.0,0.8,0.6,3.3,1.5,0.9],
 answer:"LONG",
 plan:{stop:-10, target:15},
 checks:[
  ["Weather (Engle)","bull","Last 20 candles are clearly taller than the quiet hour before, and volume bars are rising. Calm has turned into Waking: this is when scalps have room."],
  ["Fee distance","bull","Target +15 dollars is above the 0.40% fee line (about 12 dollars at 2,990) and only about 3 recent candle heights away."],
  ["Book lean (O'Hara)","bull","Green side near price is about twice the red side. The lean is real, not one fat order."],
  ["Tape colour","bull","Most of the last 20 trades are green, and the biggest prints (8.4, 6.8, 5.9) are green. Informed flow is one-sided."],
  ["Bitcoin wind","bull","Bitcoin 15-minute: last candles mostly up. Longs only."],
  ["Walls","bull","Bid wall 9 dollars below has held 48 seconds: stop goes behind it. Ask wall at +19 is the ceiling: target sits before it."],
  ["Danger","ok","Spread tight, book full. No toxic-flow signal."]
 ],
 happened:"Price walked up and touched the +15 target in about 9 minutes without coming near the stop.",
 lesson:"This is the textbook setup: Engle's weather says moves are big enough, O'Hara's wind (book + tape + Bitcoin) all point the same way. All boxes ticked = trade."
},
{
 id:2, title:"Calm cluster: the fee trap", short:"Calm market",
 coin:"ETH", start:3012, seed:22,
 hist:[{n:60,d:0,v:1.7,vb:90}],
 fut:[{n:15,d:0,v:1.7,vb:85}],
 btc:[{n:12,d:2,v:18}],
 spread:0.1,
 asks:[11,12,10,13,12,14,11,13,12,15],
 bids:[14,12,15,13,16,12,14,13,11,12],
 tapeP:"GRGGRRGRGGRGRRGGRGRG", tapeS:[0.3,0.2,0.5,0.1,0.4,0.2,0.3,0.6,0.2,0.1,0.3,0.4,0.2,0.1,0.5,0.3,0.2,0.4,0.1,0.3],
 tapeGaps:[6,9,4,11,7,8,12,5,9,10,6,13,8,7,9,11,6,10,8,12],
 answer:"WAIT",
 checks:[
  ["Weather (Engle)","bad","60 tiny candles in a row. Calm cluster. Engle: calm tends to stay calm for a while."],
  ["Fee distance","bad","Average candle is about 1 dollar. The 12-dollar fee line is 10+ candle heights away: the move needed to beat fees probably won't come in 15 minutes."],
  ["Book lean (O'Hara)","neutral","Both sides roughly equal. No lean."],
  ["Tape colour","neutral","Mixed colours, tiny sizes (all under 1 ETH), and several seconds between trades."],
  ["Bitcoin wind","neutral","Bitcoin flat."],
  ["Walls","neutral","No walls worth using."],
  ["Danger","ok","Nothing dangerous; just nothing happening."]
 ],
 happened:"Price drifted sideways inside a few dollars for 15 minutes. Any trade would have lost the fees.",
 lesson:"Easley and O'Hara: a quiet tape means no informed traders, so no news. Engle: calm cluster. Boredom is the only reason to trade here. Calm = no trade."
},
{
 id:3, title:"Toxic flow: spread blows out", short:"Toxic flow",
 coin:"ETH", start:3040, seed:33,
 hist:[{n:45,d:0,v:2,vb:150},{n:15,d:-0.9,v:11,vb:600}],
 fut:[{ex:[[6,4,1,900],[-3,3,2,800],[-7,2,3,950]]},{n:12,d:-1.9,v:8,vb:900}],
 btc:[{n:7,d:10,v:40},{n:5,d:-40,v:70}],
 spread:2.4,
 asks:[3,2,4,3,5,4,6,5,4,6],
 bids:[[0,'PULLED (was 85)','pulled'],2,3,[0,'PULLED (was 60)','pulled'],3,2,4,3,5,4],
 tapeP:"RRRRGRRRRRGRRRRRRGRR", tapeS:[14.2,9.8,22.5,7.1,1.2,18.4,11.0,6.3,25.7,8.8,0.9,12.4,16.1,7.7,9.3,19.9,6.6,1.1,10.4,8.2],
 tapeGaps:[0,0,1,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,1],
 answer:"WAIT",
 checks:[
  ["Weather (Engle)","bad","Storm starting: candles 2 to 3 times the hour's average, volume exploding."],
  ["Fee distance","neutral","Moves are big enough, but that is not the problem."],
  ["Book lean (O'Hara)","bad","Book near price is almost empty. Two bid walls were pulled as price approached."],
  ["Tape colour","bear","Heavy red prints arriving with no gap between them."],
  ["Bitcoin wind","bear","Bitcoin turning down."],
  ["Walls","bad","Walls vanishing: liquidity providers protecting themselves."],
  ["Danger","bad","Spread jumped from 0.1 to 2.4. Spread wide + walls pulled + one-sided heavy tape = all three toxic-flow signs."]
 ],
 happened:"Price first spiked up about 10 dollars with a long wick (stopping out anyone short with a normal stop), then crashed about 35 dollars in messy, giant candles.",
 lesson:"O'Hara/VPIN: when market makers flee, volatility follows but the path is violent. Engle's asymmetry: falls bring messier candles. Direction was down, but a normal-sized stop would have been hit first. Stand aside until the book refills."
},
{
 id:4, title:"Clean short with the wind", short:"Waking + red",
 coin:"ETH", start:3088, seed:44,
 hist:[{n:35,d:0.05,v:2,vb:140},{n:25,d:-0.5,v:8.5,vb:330}],
 fut:[{n:15,d:-1.6,v:8,vb:420}],
 btc:[{n:5,d:15,v:40},{n:7,d:-50,v:50}],
 spread:0.1,
 asks:[22,25,19,21,[62,'held 41s','wall'],17,15,16,14,13],
 bids:[12,11,13,10,12,14,13,12,11,[75,'held 3m','wall']],
 tapeP:"RRGRRRRGRRRRGRRGRRRR", tapeS:[2.8,6.1,0.7,1.9,9.2,1.3,0.8,1.1,4.4,2.0,0.9,7.6,0.6,1.4,3.1,0.8,5.3,1.0,0.7,2.2],
 answer:"SHORT",
 plan:{stop:10, target:-15},
 checks:[
  ["Weather (Engle)","bear","Candles taller than the hour's average, volume rising: Waking, on the down side."],
  ["Fee distance","bear","Target -15 is beyond the 12-dollar fee line and about 3 recent candle heights away."],
  ["Book lean (O'Hara)","bear","Red side near price about twice the green side: sellers waiting."],
  ["Tape colour","bear","Mostly red, and the biggest prints (9.2, 7.6, 6.1) are red."],
  ["Bitcoin wind","bear","Bitcoin 15-minute mostly down. Shorts only."],
  ["Walls","bear","Ask wall 9 dollars above has held 41 seconds: stop goes behind it. Bid wall at -19: target before it."],
  ["Danger","ok","Spread tight, book full."]
 ],
 happened:"Price slid down and hit the -15 target in about 8 minutes. Candles got bigger on the way down.",
 lesson:"The mirror of example 1. Notice Engle's asymmetry: the falling candles are a bit bigger and messier than the rising ones in example 1, so give a short slightly more room."
},
{
 id:5, title:"Delta Turnaround + absorption", short:"Turnaround",
 coin:"ETH", start:3001, seed:55,
 hist:[{n:40,d:0.1,v:2.5,vb:180},{n:17,d:-0.6,v:7,vb:300},{ex:[[-4,0.5,1,450],[-3.5,0.5,1.5,520],[5,0.8,5.5,650]]}],
 fut:[{n:15,d:1.4,v:4,vb:380}],
 btc:[{n:4,d:-10,v:40},{n:8,d:45,v:45}],
 spread:0.1,
 asks:[12,13,11,12,13,14,12,15,13,[68,'held 90s','wall']],
 bids:[24,20,26,22,25,[85,'refilled 3x · held 70s','wall'],16,14,13,12],
 tapeP:"GGGGGGGGRGGGRRRRRRRR", tapeS:[2.1,3.4,1.2,5.5,0.9,2.8,4.2,1.6,0.8,3.0,1.9,2.4,31.5,4.2,27.8,3.6,22.1,5.0,2.9,3.3],
 answer:"LONG",
 plan:{stop:-13, target:16},
 checks:[
  ["Weather (Engle)","bull","Candles bigger than the hour's average with a volume burst on the last three: enough weather."],
  ["Trigger","bull","Two red candles, then a green candle with a lower low that closed up: Delta Turnaround. Sellers pushed, failed, buyers took over."],
  ["Absorption","bull","Older tape shows huge red prints (31.5, 27.8, 22.1) hitting the bids, but the bid wall refilled 3 times and price did not break down. Someone was absorbing."],
  ["Tape colour","bull","The newest 12 trades are almost all green."],
  ["Book lean (O'Hara)","bull","Green side near price clearly heavier."],
  ["Bitcoin wind","bull","Bitcoin 15-minute turned up."],
  ["Stop / target","bull","Stop under the turnaround low and the refilled wall; target just before the ask wall at +18. Above the fee line."]
 ],
 happened:"Price reversed up and reached the +16 target in about 11 minutes.",
 lesson:"Absorption is O'Hara's informed trader on the other side: heavy selling that doesn't move price means a bigger buyer is soaking it up. The turnaround candle is the trigger; Bitcoin and the tape confirm."
},
{
 id:6, title:"The bait wall", short:"Fake wall",
 coin:"ETH", start:2955, seed:66,
 hist:[{n:40,d:0,v:2.5,vb:170},{n:20,d:-0.35,v:3.6,vb:280}],
 fut:[{ex:[[-1,0.5,1,300],[-6,0.5,2,700],[-4,1,2,600]]},{n:12,d:-0.6,v:3.2,vb:350}],
 btc:[{n:5,d:10,v:40},{n:7,d:-45,v:50}],
 spread:0.1,
 asks:[20,22,18,24,21,17,19,16,18,15],
 bids:[10,[300,'appeared 5s ago','fresh'],9,11,8,10,9,12,11,10],
 tapeP:"RRGRRRGRRRRGRRGRRRGR", tapeS:[2.4,4.1,0.6,1.8,5.2,2.2,0.9,3.7,1.1,6.0,1.5,0.8,2.9,1.3,0.7,4.4,2.0,1.6,0.9,3.1],
 answer:"WAIT",
 checks:[
  ["Weather (Engle)","neutral","Some movement, drifting down. Enough to trade."],
  ["Book lean (O'Hara)","trap","The numbers say a huge bullish lean, but almost all of it is ONE order of 300 ETH that appeared 5 seconds ago and price has never tested it."],
  ["Tape colour","bear","Tape is mostly red: real traders are selling, not buying."],
  ["Bitcoin wind","bear","Bitcoin 15-minute mostly down: shorts only, so no long."],
  ["Walls","bad","A wall only counts after it has held 30 seconds and price reacted to it. This one hasn't."],
  ["Agreement","bad","Book says long, tape and Bitcoin say short. Checklist doesn't agree = no trade."]
 ],
 happened:"As price came within 3 dollars, the 300 ETH wall disappeared and price fell about 20 dollars.",
 lesson:"O'Hara: liquidity providers cancel when they expect informed flow, and spoofers place walls to lure buyers. A big fresh wall against the tape and against Bitcoin is bait. Neither long (wind is against you) nor short (book lean is unclear) — wait."
}
,{
 id:7, title:"Storm cooling down (Engle persistence)", short:"Cooling",
 coin:"ETH", start:3050, seed:77,
 hist:[{n:45,d:0,v:2,vb:150},{ex:[[-22,2,4,1600]]},{n:4,d:0,v:10,vb:900},{n:5,d:0.2,v:6.5,vb:600},{n:5,d:0,v:4.5,vb:420}],
 fut:[{n:15,d:0,v:3.4,vb:300}],
 btc:[{n:8,d:5,v:40},{n:2,d:-90,v:60},{n:2,d:5,v:40}],
 spread:0.1,
 asks:[18,16,17,19,15,18,17,16,14,15],
 bids:[17,18,15,16,19,17,15,16,18,14],
 tapeP:"GRRGGRGRRGRGGRRGRGGR", tapeS:[1.2,2.1,0.8,1.6,0.9,2.4,1.1,0.7,1.9,1.3,0.6,1.8,1.0,2.2,0.9,1.4,0.8,1.5,1.1,0.7],
 answer:"WAIT",
 checks:[
  ["Weather (Engle)","neutral","A shock candle 15 minutes ago, and since then candles shrink step by step. That's Cooling, not Waking."],
  ["Persistence","neutral","Engle: after a shock, swings stay big and shrink slowly. Here they're still shrinking, so expect smaller and smaller moves."],
  ["Book lean (O'Hara)","neutral","Both sides equal."],
  ["Tape colour","neutral","Mixed colours, normal sizes: no informed flow."],
  ["Bitcoin wind","neutral","Bitcoin had the same shock and is now flat."],
  ["Agreement","bad","No direction anywhere. Cooling + no wind = wait for the next cluster."]
 ],
 happened:"Candles kept shrinking and price went sideways. Nothing reached the 12-dollar fee line cleanly.",
 lesson:"Drill 2 (spike fade): after a 3x spike, count how long until candles look normal. Here it took about 25 minutes. Don't trade the leftover storm without wind."
},
{
 id:8, title:"Storm short: stop sized for the storm", short:"Storm stop",
 coin:"ETH", start:3120, seed:88,
 hist:[{n:40,d:0,v:2.5,vb:160},{n:20,d:-0.9,v:13,vb:700}],
 fut:[{ex:[[7,3,1,900],[-4,2,3,800]]},{n:13,d:-2.6,v:10,vb:800}],
 btc:[{n:5,d:10,v:40},{n:7,d:-60,v:70}],
 spread:0.2,
 asks:[20,23,18,22,21,19,24,[80,'held 52s','wall'],17,15],
 bids:[11,12,10,13,11,12,10,11,12,13],
 tapeP:"RRRGRRRRGRRRRRGRRRRR", tapeS:[4.2,9.8,2.6,1.1,7.5,3.3,12.1,2.0,0.9,5.4,3.8,8.6,1.7,2.9,1.2,6.3,2.2,4.7,3.1,2.5],
 answer:"SHORT",
 plan:{stop:17, target:-26},
 checks:[
  ["Weather (Engle)","bear","Storm: candles 3 to 4 times the quiet hour, falling. Big moves are likely."],
  ["Fee distance","bear","The fee line (about 12 dollars) is less than 2 candle heights away. Easy to reach."],
  ["Book lean (O'Hara)","bear","Red side clearly heavier near price."],
  ["Tape colour","bear","Mostly red, biggest prints red."],
  ["Bitcoin wind","bear","Bitcoin 15-minute falling."],
  ["Stop size","bear","A calm-market stop of 6 dollars would be inside one candle's noise. The stop goes behind the ask wall at +15, about 3 candle heights. Risk stays 0.5 to 1% of the account, so the position is smaller."],
  ["Danger","ok","Spread normal (0.2), walls holding: storm, but not toxic."]
 ],
 happened:"Price first bounced about 10 dollars (a 6-dollar stop would have been hit), then fell more than 30 dollars and hit the target.",
 lesson:"Part 7 mistake: 'stop too tight in a storm'. In a storm the trade can be right but a calm-sized stop gets hit by noise. A wider stop means a smaller position, not more risk."
},
{
 id:9, title:"Delta Turnaround short (mirror)", short:"Turn short",
 coin:"ETH", start:2960, seed:99,
 hist:[{n:40,d:-0.1,v:2.5,vb:180},{n:17,d:0.6,v:7,vb:300},{ex:[[4,1,0.5,450],[3.5,1.5,0.5,520],[-5,5.5,0.8,650]]}],
 fut:[{n:15,d:-1.4,v:4,vb:380}],
 btc:[{n:4,d:10,v:40},{n:8,d:-45,v:45}],
 spread:0.1,
 asks:[24,20,26,22,25,[85,'refilled 3x · held 70s','wall'],16,14,13,12],
 bids:[12,13,11,12,13,14,12,15,13,[68,'held 90s','wall']],
 tapeP:"RRRRRRRRGRRRGGGGGGGG", tapeS:[2.1,3.4,1.2,5.5,0.9,2.8,4.2,1.6,0.8,3.0,1.9,2.4,29.5,4.2,26.8,3.6,21.1,5.0,2.9,3.3],
 answer:"SHORT",
 plan:{stop:13, target:-16},
 checks:[
  ["Weather (Engle)","bear","Candles bigger than the hour's average with a volume burst on the last three."],
  ["Trigger","bear","Two green candles, then a red candle with a higher high that closed down: Delta Turnaround (mirror). Buyers pushed, failed, sellers took over."],
  ["Absorption","bear","Older tape: huge green prints (29.5, 26.8, 21.1) hit the asks, but the ask wall refilled 3 times and price didn't break up. A big seller was absorbing."],
  ["Tape colour","bear","Newest 12 trades almost all red."],
  ["Book lean (O'Hara)","bear","Red side near price clearly heavier."],
  ["Bitcoin wind","bear","Bitcoin 15-minute turned down."],
  ["Stop / target","bear","Stop above the turnaround high and the refilled wall; target before the bid wall at -19."]
 ],
 happened:"Price turned down and reached the -16 target in about 13 minutes.",
 lesson:"Drill 9 works both ways. Practise spotting the mirror: green, green, red with a higher high, plus red tape."
},
{
 id:10, title:"Bitcoin blows against you", short:"BTC against",
 coin:"ETH", start:2990, seed:1010,
 hist:[{n:40,d:0.05,v:1.8,vb:120},{n:20,d:0.45,v:8,vb:320}],
 fut:[{ex:[[2,2,1,350],[-6,1,2,700],[-5,1,2,650]]},{n:12,d:-0.9,v:5,vb:450}],
 btc:[{n:6,d:30,v:40},{n:6,d:-70,v:60}],
 spread:0.1,
 asks:[12,11,13,12,14,15,13,14,16,[65,'held 2m','wall']],
 bids:[19,22,18,21,[55,'held 35s','wall'],15,14,16,13,12],
 tapeP:"GGRGGGRGGRGGGRGGRGRG", tapeS:[2.2,1.4,0.9,3.1,1.0,1.8,2.6,0.8,1.2,1.9,0.7,2.4,1.5,1.1,0.9,2.0,1.3,0.8,1.6,1.0],
 answer:"WAIT",
 checks:[
  ["Weather (Engle)","bull","Waking: candles taller than the hour, volume up."],
  ["Book lean (O'Hara)","bull","Green side heavier near price."],
  ["Tape colour","bull","Mostly green, but no really big prints."],
  ["Bitcoin wind","bad","Bitcoin 15-minute: the last 6 candles are mostly down and accelerating. Mostly down = shorts only. This vetoes the long."],
  ["Agreement","bad","Coin says long, market wind says short. Checklist doesn't agree = no trade."]
 ],
 happened:"Bitcoin kept falling, ETH followed it, broke through the bid wall and dropped about 20 dollars.",
 lesson:"Part 7 mistake: 'ignoring Bitcoin'. Most coins follow Bitcoin's 15-minute direction. Glance at it before every trade, even when your coin looks perfect."
},
{
 id:11, title:"Rejection at a wall that held", short:"Held wall",
 coin:"ETH", start:3200, seed:1111,
 hist:[{n:30,d:0,v:2.5,vb:150},{n:15,d:0.7,v:5,vb:300},{ex:[[2,4.5,1,600],[-4,1,1,500],[-2,1,2,420],[3,2,1,380],[2,3.5,1,560],[-5,1,1,620]]},{n:9,d:-0.3,v:7.5,vb:340}],
 fut:[{n:15,d:-1.3,v:5,vb:420}],
 btc:[{n:6,d:15,v:40},{n:6,d:-35,v:45}],
 spread:0.1,
 asks:[21,24,20,[90,'held 4m · price rejected twice','wall'],22,18,17,16,15,14],
 bids:[11,12,13,10,12,13,11,12,14,[70,'held 3m','wall']],
 tapeP:"RRGRRRRGRRRGRRRRGRRR", tapeS:[3.0,1.8,0.9,4.6,2.2,1.3,6.1,0.8,1.5,2.7,3.9,1.0,2.1,1.6,5.2,1.1,0.7,2.4,1.9,1.2],
 answer:"SHORT",
 plan:{stop:10, target:-16},
 checks:[
  ["Walls","bear","The ask wall about 7 dollars above has held 4 minutes and price was rejected from it twice (the two long upper wicks). It held and price reacted, so the wall counts."],
  ["Weather (Engle)","bear","Candles above the hour's average."],
  ["Book lean (O'Hara)","bear","Red side heavier near price."],
  ["Tape colour","bear","Mostly red, biggest prints red."],
  ["Bitcoin wind","bear","Bitcoin 15-minute mostly down."],
  ["Stop / target","bear","Stop just behind the proven wall (+10); target before the bid wall at -19; above the fee line."]
 ],
 happened:"Price slid away from the wall and reached -16 in about 12 minutes.",
 lesson:"Drill 4 (wall watch): a wall becomes useful only after it holds 30+ seconds AND price reacts to it. Compare with example 6, where the wall was fresh and untested."
},
{
 id:12, title:"Good wind, no weather", short:"No weather",
 coin:"ETH", start:3005, seed:1212,
 hist:[{n:60,d:0.05,v:1.4,vb:100}],
 fut:[{n:15,d:0.25,v:1.4,vb:100}],
 btc:[{n:4,d:0,v:30},{n:8,d:25,v:30}],
 spread:0.1,
 asks:[10,9,11,10,12,11,10,12,11,13],
 bids:[19,18,20,17,21,15,14,16,13,12],
 tapeP:"GGGRGGGGRGGGRGGGGRGG", tapeS:[0.6,0.4,0.9,0.3,0.5,0.7,0.4,0.3,0.6,0.5,0.8,0.4,0.3,0.6,0.5,0.4,0.7,0.3,0.5,0.6],
 tapeGaps:[5,7,4,8,6,9,5,7,6,8,5,6,9,7,5,8,6,7,9,6],
 answer:"WAIT",
 checks:[
  ["Book lean (O'Hara)","bull","Green side about twice the red side."],
  ["Tape colour","bull","Mostly green, but tiny sizes and several seconds between trades."],
  ["Bitcoin wind","bull","Bitcoin slowly up."],
  ["Weather (Engle)","bad","Calm cluster: candles about 1 dollar for an hour, volume flat."],
  ["Fee distance","bad","The 12-dollar fee line is about 10 candle heights away. In 15 minutes of calm, price is unlikely to get there."],
  ["Agreement","bad","Wind yes, weather no. Engle first: calm cluster = no trade, fees will win."]
 ],
 happened:"Price did drift up, but only about 6 dollars in 15 minutes: half the 12-dollar move a trade needs to be worth the fees and risk.",
 lesson:"You need both: weather (Engle) to pay the fees, and wind (O'Hara) for direction. Wind without weather is the most tempting trap."
}
];

function build(s){
  const hist=gen(s.start,s.hist,s.seed);
  const last=hist[hist.length-1].c;
  const fut=gen(last,s.fut,s.seed+1000);
  const btc=gen(91200,s.btc,s.seed+2000);
  return {hist,fut,btc,last};
}
if(typeof module!=='undefined') module.exports={SCEN,build};

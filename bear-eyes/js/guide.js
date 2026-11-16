/* Learning material: the guide "Reading the Market by Eye: Engle and O'Hara in practice",
   the 12-week (3-month) plan, the drills, and the chat teacher's knowledge. */
window.BE_GUIDE = {
parts:[
 {id:'why', title:'Why train your eye', html:`
 <p>In a live scalp you have seconds, not minutes. The strategy used numbers (GARCH expected move, order-book imbalance, delta). This course turns each number into something you can <b>see</b> on the chart, the order book and the Trades list.</p>
 <p>Practise only in Binance Demo Trading until your journal shows the reads work. The backtests found no fixed rule that was reliably profitable after fees, so any edge has to come from skill you can measure. That is what this app measures.</p>`},
 {id:'engle', title:'Part 1 · Robert Engle: volatility comes in clusters', html:`
 <p><b>Who he is.</b> American economist. In 1982 he introduced ARCH: the size of today's price swings depends on the size of recent swings. His student Tim Bollerslev extended it in 1986 to GARCH, the model the strategy uses. Nobel prize 2003.</p>
 <p class="big">Big moves are followed by big moves, small moves by small moves, and calm or storm fades back to normal slowly, not instantly.</p>
 <p><b>The GARCH formula in words:</b> next minute's expected swing = a small fixed base + a part of the last surprise move (α, how strongly the market reacts to a shock) + a part of the recent swing level (β, how long the mood lasts).</p>
 <table><tr><th>Idea</th><th>What it means</th><th>What you see on a 1-minute chart</th></tr>
 <tr><td>1. Volatility clustering</td><td>Calm and stormy periods each last a while</td><td>Small candles come in groups and tall candles come in groups. They don't mix randomly.</td></tr>
 <tr><td>2. Persistence (α+β near 1)</td><td>After a shock, swings stay big and shrink step by step</td><td>After a spike, candles get shorter gradually over many minutes. Coins took about 10 minutes to several hours to calm down.</td></tr>
 <tr><td>3. Mean reversion of volatility</td><td>Every storm returns to the coin's normal level</td><td>After a very quiet stretch, movement comes back; after a storm, it fades.</td></tr>
 <tr><td>4. Asymmetry</td><td>Falls raise volatility more than rises</td><td>A sharp drop is usually followed by bigger, messier candles than a sharp rise of the same size.</td></tr>
 <tr><td>5. Fat tails</td><td>Extreme moves happen more often than "normal" maths predicts</td><td>Sudden long wicks appear without warning.</td></tr></table>
 <p><b>How it helps:</b> calm cluster → the move you need to beat fees may not come: wait. Storm cluster → a calm-sized stop gets hit by noise. Calm turning into bigger candles with rising volume → scalps have room.</p>`},
 {id:'ohara', title:"Part 2 · Maureen O'Hara: who is trading, and why price moves", html:`
 <p><b>Who she is.</b> Finance professor at Cornell, a founder of market microstructure: how trading itself (orders, spreads, who trades and when) forms prices. Book: <i>Market Microstructure Theory</i> (1995). With Easley and López de Prado she built VPIN, a measure of "toxic" order flow (2012).</p>
 <p class="big">Some traders know something the market hasn't priced yet; their orders leave footprints in the order book and the trades, and everyone else, especially market makers, reacts to them.</p>
 <table><tr><th>Idea</th><th>What it means</th><th>What you see on Binance</th></tr>
 <tr><td>1. Informed vs uninformed</td><td>Some orders carry information; many are noise</td><td>Informed flow is persistent and one-sided: Trades list mostly green (or red) for a while.</td></tr>
 <tr><td>2. Adverse selection and the spread</td><td>Market makers widen the gap when they fear informed traders</td><td>The spread suddenly widens and the book near price thins out. Something is coming.</td></tr>
 <tr><td>3. Trades carry information</td><td>Bigger, faster, one-sided trading = stronger information</td><td>Large prints of one colour arriving quickly, price moving with them.</td></tr>
 <tr><td>4. Time between trades</td><td>No trading is itself information: a quiet tape suggests no news</td><td>Slow Trades list with small sizes = no informed traders. Don't expect a big move.</td></tr>
 <tr><td>5. Toxic flow (VPIN)</td><td>Very one-sided volume hurts liquidity providers; they pull back; volatility follows</td><td>Heavy one-sided trades + walls disappearing + spread widening = toxic flow.</td></tr>
 <tr><td>6. Liquidity providers protect themselves</td><td>Market makers cancel and move orders</td><td>Walls that vanish as price approaches. Don't trust a wall until it holds.</td></tr></table>
 <p><b>Together:</b> Engle tells you how big the next moves are likely to be (the <b>weather</b>). O'Hara tells you who is pushing and which way (the <b>wind</b>). A good scalp needs both.</p>`},
 {id:'eye', title:'Part 3 · The eye version of the strategy', html:`
 <table><tr><th>Number</th><th>What it was</th><th>The eye check</th></tr>
 <tr><td>GARCH expected move ≥ target</td><td>Is the market moving enough?</td><td>Candle weather: recent 1-minute candles taller than the last hour's average, volume bars rising. Target no more than about 3 average candle heights away for a 15-minute trade.</td></tr>
 <tr><td>Fee check: target ≥ 0.40%</td><td>Does the move pay for fees?</td><td>On ETH at 3,000, 0.40% = 12 dollars. Learn the distance that equals 0.40% on your coin.</td></tr>
 <tr><td>Imbalance ≥ +0.30</td><td>More buyers waiting</td><td>Green side near price about twice the red side (6.5 vs 3.5 = +0.30), still so 30 seconds later.</td></tr>
 <tr><td>Delta positive</td><td>Aggressive buyers stronger</td><td>Last 20 lines of the Trades list: most and the biggest are green.</td></tr>
 <tr><td>Delta Turnaround</td><td>Failed push by sellers</td><td>Two red, then green with a lower low and green tape.</td></tr>
 <tr><td>Walls for stop and target</td><td>Where big orders sit</td><td>Stop behind a wall that has held 30 seconds; target before the opposite wall.</td></tr>
 <tr><td>Bitcoin direction</td><td>Market wind</td><td>Bitcoin 15-minute: mostly up = longs only; mostly down = shorts only.</td></tr>
 <tr><td>Spread / toxic flow</td><td>Danger</td><td>Spread widening suddenly and walls vanishing = stand aside until the book refills.</td></tr></table>`},
 {id:'calib', title:'Part 6 · Calibrating your eye', html:`
 <ul><li>Once a day, check 5 eye reads with numbers: candle height, distance to target, order-book sizes, trade colours. In this app the "Show numbers" button does it for you.</li>
 <li>Write both: "eye said +0.3, numbers said +0.18". If your eye keeps over- or under-estimating, adjust it on purpose. The Progress page tracks your calibration.</li>
 <li>Re-check your 0.40% distance whenever the price changes a lot (0.40% of 3,000 is 12; of 2,500 it is 10).</li>
 <li>Keep screenshots of entry moments. A week later they show what you actually saw.</li></ul>`},
 {id:'mistakes', title:'Part 7 · Common eye mistakes', html:`
 <table><tr><th>Mistake</th><th>Why</th><th>Fix</th></tr>
 <tr><td>Seeing patterns everywhere</td><td>The eye loves patterns, even in noise</td><td>Only count a setup if every box is true; score yourself honestly</td></tr>
 <tr><td>Trusting one big wall</td><td>Walls can be pulled (spoofing, or market makers protecting themselves)</td><td>A wall counts only after it held 30 seconds and price reacted</td></tr>
 <tr><td>Trading a calm market</td><td>Boredom</td><td>Weather first: calm cluster = no trade</td></tr>
 <tr><td>Stop too tight in a storm</td><td>The stop looks "safe" on screen</td><td>Stop at least about 3 recent candles, or behind a held wall</td></tr>
 <tr><td>Ignoring Bitcoin</td><td>Focus on one coin's chart</td><td>Glance at the Bitcoin 15-minute chart before every trade</td></tr>
 <tr><td>Remembering only wins</td><td>Memory is biased</td><td>Journal every trade; judge by written numbers only</td></tr>
 <tr><td>High leverage</td><td>Small moves feel small</td><td>Risk 0.5–1% of the account per trade; at 100x a 1% move wipes the margin</td></tr></table>`},
 {id:'reading', title:'Further reading', html:`
 <ul><li>Engle, "Autoregressive Conditional Heteroscedasticity…", <i>Econometrica</i>, 1982</li>
 <li>Bollerslev, "Generalized Autoregressive Conditional Heteroskedasticity", <i>Journal of Econometrics</i>, 1986</li>
 <li>O'Hara, <i>Market Microstructure Theory</i>, Blackwell, 1995</li>
 <li>Easley &amp; O'Hara, "Time and the Process of Security Price Adjustment", <i>Journal of Finance</i>, 1992</li>
 <li>Easley, López de Prado &amp; O'Hara, "Flow Toxicity and Liquidity in a High-Frequency World", <i>Review of Financial Studies</i>, 2012</li></ul>
 <p class="small">Educational. Not financial advice. Leveraged futures can lose more than you expect; practise with virtual money first.</p>`}
],
drills:[
 {id:1,name:'Weather report',who:'Engle',goal:0.70,data:'real',how:'Look at the last 60 one-minute candles. Predict the label for the NEXT 15 minutes: Calm, Waking, Storm or Cooling.'},
 {id:2,name:'Spike fade',who:'Engle persistence',goal:0.60,data:'real',how:'A real 3× spike candle. Predict how many minutes until candles look normal again: 5, 15, 30 or 60+.'},
 {id:3,name:'Up versus down',who:'Engle asymmetry',goal:0.60,data:'real',how:'A real sharp move. Predict: will the next 10 candles be bigger and messier than normal, or calm?'},
 {id:4,name:'Wall watch',who:"O'Hara",goal:0.60,data:'live',how:'Live order book. When price nears a wall, say "holds" or "pulled" before it arrives.'},
 {id:5,name:'Spread alarm',who:"O'Hara",goal:0.60,data:'live',how:'Live book. When the spread widens suddenly, predict a big move within 5 minutes: yes or no.'},
 {id:6,name:'Tape colour count',who:"O'Hara",goal:0.80,data:'real',how:'20 real trades flash for 3 seconds. Say Green, Red or Mixed. Then the app counts.'},
 {id:7,name:'Quiet tape',who:"Easley & O'Hara",goal:0.65,data:'real',how:'The Trades list slowed down (real). Predict: will the next 5 minutes stay quiet?'},
 {id:8,name:'Absorption spotting',who:"O'Hara",goal:0.55,data:'real',how:'Heavy one-sided taker volume hit but price did not move (real). Predict the next 3-minute direction.'},
 {id:9,name:'Delta Turnaround',who:'Trigger',goal:0.55,data:'real',how:'A real turnaround pattern. Predict where price is 10 minutes later: up or down.'},
 {id:10,name:'Full checklist (Replay)',who:'Everything',goal:0.40,data:'real',how:'A random real past moment. Run the whole checklist, call LONG, SHORT or WAIT, and the app plays the next 15 minutes.'}
],
// 12 weeks = about 3 months. Each day lists drill counts. "R" = Replay (drill 10), "E" = guided examples.
plan:[
 {w:1,focus:'Engle: see the weather',read:['why','engle'],day:{E:3,1:20,2:5,3:5},pass:'Drill 1 ≥ 70% over the week'},
 {w:2,focus:'Engle: persistence and asymmetry',read:['engle','calib'],day:{1:20,2:10,3:10},pass:'Drills 1, 2, 3 at goal'},
 {w:3,focus:"O'Hara: read the tape",read:['ohara'],day:{E:2,6:30,7:10},pass:'Drill 6 ≥ 80%'},
 {w:4,focus:"O'Hara: walls and spread (live book)",read:['ohara','mistakes'],day:{4:10,5:5,6:20},pass:'Drills 4 and 6 at goal'},
 {w:5,focus:'Triggers: absorption',read:['eye'],day:{1:10,8:20,9:5},pass:'Drill 8 ≥ 55%'},
 {w:6,focus:'Triggers: Delta Turnaround',read:['eye'],day:{1:10,8:10,9:20},pass:'Drill 9 above the no-edge rate'},
 {w:7,focus:'Full checklist: first replays',read:['eye','mistakes'],day:{E:2,R:15,6:10},pass:'50 replays journaled'},
 {w:8,focus:'Full checklist: discipline',read:['mistakes'],day:{R:25,1:10},pass:'Agree with the checklist ≥ 80% of your trades'},
 {w:9,focus:'Volume: replay every day',read:['calib'],day:{R:30,6:10},pass:'Win rate above no-edge rate'},
 {w:10,focus:'Different coins and conditions',read:['engle','ohara'],day:{R:30,2:5,8:5},pass:'Positive average R after fees'},
 {w:11,focus:'Live Demo Trading + replays',read:['mistakes'],day:{R:30,4:5,5:5},pass:'100 demo trades journaled'},
 {w:12,focus:'Exam week',read:['eye'],day:{R:40},pass:'Expert test: see Progress'}
],
faq:[
 {k:['weather','engle','cluster','volatility','garch','arch'],a:"Weather = Engle's volatility clustering. Compare the last 10 one-minute candles with the last hour: clearly taller with rising volume = Waking; very tall = Storm; shrinking after a spike = Cooling; small = Calm. Only Waking or Storm give a scalp room to pay the fees.",go:'#learn/engle'},
 {k:['calm','quiet','bored','no move','small candles'],a:'Calm cluster = no trade. Engle: calm tends to stay calm for a while. The 0.40% fee move is then many candle heights away, so fees win. See guided example 2 and 12.',go:'#examples/12'},
 {k:['storm','stop too tight','stop size','stop','where stop','stop loss'],a:'Stop goes behind a wall that has held 30+ seconds, and at least about 3 recent candle heights away. In a storm that is wide, so trade a smaller position: risk stays 0.5–1% of the account. In Replay the app uses stop = 1.5 × the last-10 average candle height (at least 0.15%).',go:'#examples/8'},
 {k:['target','take profit','tp','0.40','fee','fees','0.4%'],a:'Target must be at least 0.40% away (about 12 dollars on ETH at 3,000) so the move pays fees, and no more than about 3 recent candle heights for a 15-minute trade. Put it just before the opposite wall.',go:'#learn/eye'},
 {k:['imbalance','lean','book lean','order book','bids','asks','depth'],a:'Imbalance = (bids − asks) ÷ (bids + asks) near price. +0.30 means the green side is about twice the red side (6.5 vs 3.5). It must still be there 30 seconds later and must not be just one fresh wall.',go:'#examples/1'},
 {k:['tape','trades list','delta','green','red','colour','color','taker'],a:'Tape colour: in the last 20 trades, most AND the biggest should be one colour. Green = aggressive buyers (taker buys), red = aggressive sellers. Delta = taker buy volume − taker sell volume. Practise with drill 6.',go:'#drill/6'},
 {k:['bitcoin','btc','wind','market direction'],a:'Glance at the Bitcoin 15-minute chart before every trade: last few candles mostly up = only longs, mostly down = only shorts, flat = your coin must carry it alone (the app then says WAIT). See example 10.',go:'#examples/10'},
 {k:['wall','spoof','pulled','holds','fake wall','bait'],a:"A wall counts only after it has held 30 seconds and price reacted to it. Fresh big walls against the tape and Bitcoin are bait (example 6). O'Hara: liquidity providers cancel when they fear informed flow. Practise with drill 4 on the live book.",go:'#examples/6'},
 {k:['spread','toxic','vpin','danger','stand aside'],a:'Toxic flow = spread suddenly wide + walls vanishing + heavy one-sided trades. Market makers are leaving. The move can be huge but violent (wicks both ways). Stand aside until the book refills. See example 3 and drill 5.',go:'#examples/3'},
 {k:['turnaround','delta turnaround','reversal','lower low','higher high'],a:'Delta Turnaround: two red candles, then a green one with a lower low that closes up, with green tape: sellers tried, failed, buyers took over. Mirror for shorts. Drill 9 scores it on real data.',go:'#examples/5'},
 {k:['absorption','absorb','iceberg','refill'],a:'Absorption: heavy red trades hit but price does not fall (or heavy green but price does not rise). A bigger player is soaking it up. Next move is often the other way. Drill 8 finds real cases.',go:'#drill/8'},
 {k:['persistence','spike','fade','cooling','alpha','beta'],a:'Persistence (α + β near 1): after a shock, candles shrink step by step, not in one candle. On these coins it took 10 minutes to hours. Drill 2 measures your sense of it on real spikes.',go:'#drill/2'},
 {k:['asymmetry','drop','rise','messier'],a:'Asymmetry: falls usually leave bigger, messier candles than rises of the same size. Give shorts a little more room. Drill 3 tests it on real moves.',go:'#drill/3'},
 {k:['no-edge','no edge','win rate','expectancy','r multiple',' r '],a:'No-edge rate = stop ÷ (stop + target). With target = 2 × stop it is 33%: you need a win rate clearly above that after fees. Average R = average result in units of your stop; above 0 after fees means an edge.',go:'#progress'},
 {k:['leverage','risk','position size','how much'],a:'Risk 0.5–1% of the account per trade. Position size = risk money ÷ stop distance. At 100x a 1% move wipes the margin, so don\'t use leverage to "make it worth it".',go:'#learn/mistakes'},
 {k:['expert','level','am i good','ready','real money','live trading'],a:'The Progress page computes your level from real-data replays: number of replays, win rate vs the no-edge rate, average R after fees, discipline and drill goals. Expert = 300+ replays, win rate at least 8 points above no-edge, average R ≥ +0.10 and 8 of 10 drills at goal. Until then, Demo Trading only.',go:'#progress'},
 {k:['real data','data','where data','binance','history','past'],a:'Replay and drills load real past 1-minute candles, real trades (aggTrades, with taker side) and the real Bitcoin 15-minute chart straight from Binance\'s public data for the last 90 days. The live drills use the current Binance order book. The guided examples are drawn, to teach each pattern cleanly.',go:'#replay'},
 {k:['plan','today','what should i','schedule','three months','3 months','week'],a:'The Today page shows your week of the 12-week plan, the reading and today\'s drill counts. Weeks 1–2 Engle, 3–4 O\'Hara, 5–6 triggers, 7–10 full-checklist replays, 11 live demo, 12 exam.',go:'#today'},
 {k:['demo','binance demo','paper'],a:'Practise only in Binance Demo Trading until your journal and this app show the reads work, with longs and shorts checked separately.',go:'#today'},
 {k:['journal','screenshot','backup','export','iphone','mac','sync'],a:'Your progress is saved in this browser. Use Progress → Export to save a backup file, and Import on your other device (Mac / iPhone) to continue there.',go:'#progress'}
]
};

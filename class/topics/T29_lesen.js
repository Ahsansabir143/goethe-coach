/* Question words (wie viel / viele / oft / lange + W-words) and Goethe A1 Lesen exam practice: endless generators and topics */
(function(){
const R = n => Math.floor(Math.random()*n), pk = a => a[R(a.length)], sh = a => { a = a.slice(); for(let i=a.length-1;i>0;i--){ const j=R(i+1); [a[i],a[j]]=[a[j],a[i]]; } return a; };
// [question word, rest of the question, answer, English, why]
const Q = [
 ['Wie viel','kostet der Fernseher?','100 Euro.','How much does the TV cost?','price'],['Wie viel','kostet das Ticket?','15 Euro.','How much is the ticket?','price'],['Wie viel','wiegst du?','Fünfzig Kilogramm.','How much do you weigh?','weight'],
 ['Wie viel','Geld hast du dabei?','Zwanzig Euro.','How much money do you have on you?','money = uncountable'],['Wie viel','Zeit hast du?','Nicht viel.','How much time do you have?','Zeit = uncountable'],['Wie viel','Wasser trinkst du am Tag?','Zwei Liter.','How much water do you drink a day?','Wasser = uncountable'],
 ['Wie viele','Kinder hat sie?','Zwei Kinder.','How many children does she have?','countable plural'],['Wie viele','Schüler sind in der Klasse?','27.','How many pupils are in the class?','countable plural'],['Wie viele','Äpfel sind noch da?','Drei Äpfel.','How many apples are left?','countable plural'],
 ['Wie viele','Sprachen sprichst du?','Drei Sprachen.','How many languages do you speak?','countable plural'],['Wie viele','Geschwister hast du?','Einen Bruder und eine Schwester.','How many siblings do you have?','countable plural'],['Wie viele','Zimmer hat die Wohnung?','Drei Zimmer.','How many rooms does the flat have?','countable plural'],
 ['Wie oft','fährt der Zug?','Viermal am Tag.','How often does the train run?','-mal = frequency'],['Wie oft','gehst du ins Kino?','Einmal im Monat.','How often do you go to the cinema?','frequency'],['Wie oft','hast du Deutschkurs?','Zweimal in der Woche.','How often do you have German class?','frequency'],
 ['Wie oft','gehst du ins Theater?','Nie.','How often do you go to the theatre?','nie = frequency'],['Wie oft','machst du Sport?','Jeden Tag.','How often do you do sport?','jeden Tag = frequency'],['Wie oft','rufst du deine Mutter an?','Jeden Sonntag.','How often do you call your mother?','frequency'],
 ['Wie lange','dauert der Film?','Zwei Stunden.','How long does the film last?','duration'],['Wie lange','bleibt er?','Drei Wochen.','How long is he staying?','duration'],['Wie lange','arbeitest du noch?','Bis neun Uhr.','How much longer are you working?','bis … = duration'],
 ['Wie lange','wohnst du schon hier?','Seit drei Jahren.','How long have you lived here?','duration'],['Wie lange','lernst du jeden Tag?','Ungefähr eine Stunde.','How long do you study every day?','duration'],['Wie lange','fährt man nach Berlin?','Vier Stunden.','How long does it take to Berlin?','duration'],
 ['Wer','ist das?','Das ist Anna.','Who is that?','a person (subject)'],['Wen','besuchst du?','Meine Oma.','Whom are you visiting?','a person (Akkusativ)'],['Wem','hilfst du?','Meinem Bruder.','Whom are you helping?','a person (Dativ)'],
 ['Was','machst du?','Ich lerne Deutsch.','What are you doing?','a thing / action'],['Wo','wohnst du?','In Bischkek.','Where do you live?','place'],['Wohin','fährst du?','Nach Berlin.','Where are you going?','direction'],
 ['Woher','kommst du?','Aus Pakistan.','Where are you from?','origin'],['Wann','beginnt der Kurs?','Um 9 Uhr.','When does the course start?','time point'],['Warum','lernst du Deutsch?','Weil ich in Deutschland arbeiten möchte.','Why are you learning German?','weil = reason'],
 ['Wie','heißt du?','Ahsan.','What is your name?','how / what'],['Wie','geht es dir?','Gut, danke.','How are you?','how']];
const WIE = ['Wie viel','Wie viele','Wie oft','Wie lange'], OTHER = ['Wer','Wen','Wem','Was','Wo','Wohin','Woher','Wann','Warum','Wie'];
const ALT = w => WIE.includes(w) ? WIE : OTHER;
window.EXTRA_DRILLS = (window.EXTRA_DRILLS||[]).concat([
 {id:'p-frage', name:'Question words: wie viel, wie viele, wie oft, wie lange …', d:'Wie oft fährt der Zug? – Viermal am Tag.', gen:()=>{
   const q = pk(Q); const r = Math.random();
   if(r < .55){ const o = [q[0], ...sh(ALT(q[0]).filter(w=>w!==q[0])).slice(0,2)]; return {t:'mcq', q:`___ ${q[1]} – ${q[2]}`, o, a:0, x:`<b>${q[0]} ${q[1]}</b> (${q[3]}) · ${q[4]}`, say:`${q[0]} ${q[1]}`}; }
   if(r < .8) return {t:'order', a:`${q[0]} ${q[1]}`, en:`${q[3]} – ${q[2]}`, x:'question word (1) + verb (2) + subject …'};
   return {t:'fill', q:`___ ${q[1]} – ${q[2]} (${q[3]})`, a:[q[0]], h:q[4], x:`<b>${q[0]} ${q[1]}</b>`}; }},
 {id:'p-lesen', name:'Goethe A1 Lesen: read and answer', d:'25 short e-mails and notices · Richtig / Falsch · a / b', gen:()=>{
   const T = (window.TEXTS||[]).filter(t=>/^gl-/.test(t.id)); const t = pk(T); const it = pk(t.items);
   const p = String(it).replace(/^m:\s*/,''); const [body, why] = p.split(' ## '); const [q, ...opts] = body.split('|');
   const txt = t.lines.map(l=> typeof l==='string' ? l.split(' | ')[0] : (l.s?l.s+': ':'')+l.de).join('\n');
   const o = /^(Richtig|Falsch)$/.test(opts[0]) ? [opts[0], opts[0]==='Richtig'?'Falsch':'Richtig'] : opts;
   return {t:'mcq', pre:txt, q, o, a:0, x:`${why||''} · <a href="#/x/${t.id}">read the text with English</a>`}; }}
]);
TOPICS.push({id:'pr-frage', icon:'❓', title:'Question words: wie viel, wie viele, wie oft, wie lange …', d:'Wie viel kostet das? · Wie viele Kinder? · Wie oft? · Wie lange?', src:'Class worksheet „Fragewörter“ A + B · Spektrum A1 Lektion 1 + 4',
 lessons:['L26'], gens:['p-frage'],
 learn:[{h:'Practise this topic', html:`<div class="row"><a class="btn go" href="#/ts/pr-frage/0">✍️ Start the exercises</a><a class="btn" href="#/run/pr-frage/15">⏱ 15 min</a><a class="btn" href="#/run/pr-frage/30">⏱ 30 min</a><a class="btn" href="#/run/pr-frage/60">⏱ 1 hour</a><a class="btn" href="#/run/pr-frage/240">⏱ 4 hours</a></div>`},
  {h:'The rule', html: TIP('Look at the answer: Euro / kg / nichts → <b>wie viel</b> · number + plural → <b>wie viele</b> · -mal / jeden / nie → <b>wie oft</b> · Stunden / Wochen / bis … → <b>wie lange</b>.')}],
 sets:[{title:'Mixed test: question words', items:[
  "f:Wie [viel] kostet das? – 18,20 €.","f:Wie [viele] Kinder hat sie? – Keine Kinder.","f:Wie [oft] gehst du ins Kino? – Einmal im Monat.","f:Wie [lange] dauert der Film? – Zwei Stunden.",
  "f:Wie [viele] Augen hast du? – Zwei.","f:Wie [lange] bleibt er? – Drei Wochen.","f:Wie [oft] fährt der Zug? – Viermal am Tag.","f:Wie [viel] wiegst du? – Fünfzig Kilogramm.",
  "f:[Woher] kommst du? – Aus Pakistan.","f:[Wohin] fährst du? – Nach Berlin.","f:[Wann] beginnt der Kurs? – Um 9 Uhr.",
  "m:Which is correct?|Wie viele Kinder hat sie?|Wie viel Kinder hat sie? ## Kinder = countable plural → viele","m:Which is correct?|Wie oft hast du Zeit?|Wie oft du hast Zeit? ## verb in position 2",
  "o:Wie viele Schüler sind in der Klasse?|How many pupils are in the class?","o:Wie lange arbeitest du noch?|How much longer are you working?","t:How often do you go on holiday?|Wie oft fährst du in den Urlaub?"
 ]}]
});
TOPICS.push({id:'pr-lesen', icon:'📖', title:'Goethe A1 exam: Lesen (reading)', d:'25 short e-mails, messages and notices · Richtig / Falsch · a / b', src:'Goethe-Zertifikat A1 (Start Deutsch 1) Lesen — class practice texts',
 lessons:[], gens:['p-lesen'],
 learn:[{h:'Practise reading', html:`<div class="row"><a class="btn go" href="#/d/p-lesen">♾️ Random text + question</a><a class="btn" href="#/run/pr-lesen/15">⏱ 15 min</a><a class="btn" href="#/run/pr-lesen/30">⏱ 30 min</a><a class="btn" href="#/run/pr-lesen/60">⏱ 1 hour</a><a class="btn" href="#/texts">📚 All texts</a></div>`},
  {h:'How to solve a Lesen task', html: '<ol><li>Read the <b>question</b> first, so you know what to look for (a time? a place? a price?).</li><li>Find the matching sentence in the text.</li><li>Watch the traps: <b>nicht …, sondern …</b> (not this, but that), <b>erst</b> (only / not until), <b>kein</b>, <b>geschlossen</b>, <b>fällt aus</b> (cancelled), <b>kostenlos</b> (free).</li><li>Richtig only if the text says it — not if it only sounds similar.</li></ol>'+
   TIP('Most traps in these 25 texts: a time or a place that is mentioned but then changed — „nicht um 9:00 Uhr, <b>sondern erst um 10:30 Uhr</b>“.')}],
 sets:[{title:'Trap words of the Lesen texts', items:[
  "m:„Der Kurs fällt aus.“ means …|The course is cancelled.|The course takes place outside. ## ausfallen = to be cancelled","m:„Das Parken ist kostenlos.“ means …|Parking is free.|Parking costs money. ## kostenlos = free",
  "m:„nicht um 9 Uhr, sondern erst um 10:30 Uhr“ — when does it start?|10:30|9:00 ## sondern = but (the correction)","m:„Die Kantine ist geschlossen.“|The canteen is closed.|The canteen is open. ## geschlossen = closed",
  "m:„Ich bin per E-Mail erreichbar.“|You can reach me by e-mail.|I don't read e-mails. ## erreichbar = reachable","m:„spätestens um 4 Uhr“|at 4 o'clock at the latest|at 4 o'clock at the earliest ## spätestens = at the latest",
  "t:the delay|die Verspätung","t:the stop (bus / tram)|die Haltestelle","t:the luggage piece|das Gepäckstück","t:the arrival|die Ankunft","t:the application|die Bewerbung","t:the workbook|das Arbeitsbuch"
 ]}]
});
})();

/* L16 — 17 Oct: strong verbs with a vowel change (Anara's list) + the 3 forms of every verb + homework „5–10 verbs“ */
(function(){
const V = [
 // [infinitive, English, du-English, er-English, group]
 ['braten','to fry / to roast','you fry','he / she / it fries','a → ä'],
 ['fahren','to drive / to go','you drive','he / she / it drives','a → ä'],
 ['halten','to hold / to stop','you hold','he / she / it holds','a → ä'],
 ['schlafen','to sleep','you sleep','he / she / it sleeps','a → ä'],
 ['tragen','to wear / to carry','you wear / carry','he / she / it wears / carries','a → ä'],
 ['waschen','to wash','you wash','he / she / it washes','a → ä'],
 ['essen','to eat','you eat','he / she / it eats','e → i'],
 ['geben','to give','you give','he / she / it gives','e → i'],
 ['helfen','to help','you help','he / she / it helps','e → i'],
 ['nehmen','to take','you take','he / she / it takes','e → i'],
 ['sprechen','to speak','you speak','he / she / it speaks','e → i'],
 ['treffen','to meet','you meet','he / she / it meets','e → i'],
 ['lesen','to read','you read','he / she / it reads','e → ie'],
 ['sehen','to see','you see','he / she / it sees','e → ie'],
 ['laufen','to run / to walk','you run','he / she / it runs','au → äu']
];
const F = v => window.VFORMS(v);
const S = x => String(x).replace(' … ',' ');
const SENT = {
 braten:['Ich brate Fisch.','I am frying fish.','Du brätst Fleisch.','You are frying meat.'],
 fahren:['Ich fahre nach Bischkek.','I am going to Bishkek.','Du fährst nach Tokmok.','You are going to Tokmok.'],
 halten:['Ich halte die Tasche.','I am holding the bag.','Der Bus hält hier.','The bus stops here.'],
 schlafen:['Ich schlafe 8 Stunden.','I sleep 8 hours.','Du schläfst 7 Stunden.','You sleep 7 hours.'],
 tragen:['Ich trage eine Jacke.','I am wearing a jacket.','Er trägt den Koffer.','He is carrying the suitcase.'],
 waschen:['Ich wasche meine Kleidung.','I wash my clothes.','Sie wäscht das Auto.','She washes the car.'],
 essen:['Ich esse Bananen.','I eat bananas.','Du isst Äpfel.','You eat apples.'],
 geben:['Ich gebe dir mein Buch.','I give you my book.','Er gibt mir sein Buch.','He gives me his book.'],
 helfen:['Ich helfe dir.','I help you.','Du hilfst mir.','You help me.'],
 nehmen:['Ich nehme den Bus.','I take the bus.','Er nimmt ein Taxi.','He takes a taxi.'],
 sprechen:['Ich spreche Urdu.','I speak Urdu.','Sie spricht Deutsch.','She speaks German.'],
 treffen:['Ich treffe meine Freundin.','I meet my friend.','Er trifft seine Freunde.','He meets his friends.'],
 lesen:['Ich lese ein Buch.','I am reading a book.','Er liest eine Nachricht.','He is reading a message.'],
 sehen:['Ich sehe den Film.','I see the film.','Siehst du das Haus?','Do you see the house?'],
 laufen:['Ich laufe in den Park.','I run to the park.','Lena läuft schnell.','Lena runs fast.']
};
const groupTable = g => TBL(['№','1st · Infinitiv','du','er / sie / es','2nd · Präteritum','3rd · Perfekt'],
  V.map((v,i)=>[v,i]).filter(([v])=>v[4]===g).map(([v,i])=>{ const f = F(v[0]); return [`~${i+1}`, `${v[0]}<br><small>(${v[1]})</small>`, `<b>${f.du}</b><br><small>(${v[2]})</small>`, `<b>${f.er}</b><br><small>(${v[3]})</small>`, f.prat, f.perfekt]; }));
const groupEx = g => V.filter(v=>v[4]===g).map(v=> EX(SENT[v[0]][0], SENT[v[0]][1]) + EX(SENT[v[0]][2], SENT[v[0]][3])).join('');

LESSONS.push({
id:'L16', date:'2026-10-17',
title:'Strong verbs (a→ä, e→i, e→ie, au→äu) · the 3 verb forms · homework „5–10 verbs“',
topics:['a → ä: fahren, schlafen, tragen …','e → i: essen, geben, helfen …','e → ie: lesen, sehen','au → äu: laufen','1st · 2nd · 3rd form','Homework: abholen, abfahren, mitfahren'],
summary:'Anara\'s list of stem-changing verbs with du and er/sie/es, every verb with its 1st, 2nd and 3rd form, and my homework sentences.',
learn:[
{h:'1. The 3 forms of a verb (1st · 2nd · 3rd)', html:
 `<p>Every German verb has three main forms. Learn them together:</p>`+
 TBL(['','1st form · Infinitiv','2nd form · Präteritum (er)','3rd form · Partizip II (Perfekt)','English'],[
  ['~weak (regular)','machen','machte','hat gemacht','~to make / do'],
  ['~weak, -t stem','arbeiten','arbeitete','hat gearbeitet','~to work'],
  ['~weak, -ieren','studieren','studierte','hat studiert','~to study (no ge-)'],
  ['~weak, separable','abholen','holte … ab','hat abgeholt','~to pick up'],
  ['~weak, be-/ver-','bezahlen','bezahlte','hat bezahlt','~to pay (no ge-)'],
  ['~strong','fahren','fuhr','ist gefahren','~to drive / go'],
  ['~strong','sehen','sah','hat gesehen','~to see'],
  ['~mixed','bringen','brachte','hat gebracht','~to bring'],
  ['~irregular','sein','war','ist gewesen','~to be']])+
 TIP('Weak verbs: 2nd form = stem + <b>-te</b> (machte), 3rd form = <b>ge-</b> + stem + <b>-t</b> (gemacht). Strong verbs: the vowel changes and the 3rd form ends in <b>-en</b> (fahren – fuhr – gefahren). Verbs of movement / change take <b>ist</b> (ist gefahren, ist gelaufen); most others take <b>hat</b>.')+
 EX('Ich arbeite. – Ich habe gearbeitet.','I work. – I have worked / I worked.')+
 EX('Ich lerne. – Ich habe gelernt.','I learn. – I have learnt.')+
 EX('Ich bezahle. – Ich habe bezahlt.','I pay. – I have paid.')+
 EX('Ich fahre nach Berlin. – Ich bin nach Berlin gefahren.','I am going to Berlin. – I went to Berlin.')+
 `<p><a class="btn sm" href="#/verbs">🔤 All verbs of the course with 1st · 2nd · 3rd form →</a></p>`},
{h:'2. Vowel change a → ä (in du and er / sie / es)', html: groupTable('a → ä') + groupEx('a → ä')},
{h:'3. Vowel change e → i', html: groupTable('e → i') + groupEx('e → i')},
{h:'4. Vowel change e → ie', html: groupTable('e → ie') + groupEx('e → ie')},
{h:'5. Vowel change au → äu', html: groupTable('au → äu') + groupEx('au → äu') +
 TIP('Only <b>du</b> and <b>er / sie / es</b> change. ich, wir, ihr, sie / Sie stay normal: ich fahre, wir fahren, ihr fahrt, sie fahren.')},
{h:'6. My homework „5–10 verbs“ (corrected)', html:
 `<p><b>lernen, arbeiten</b></p>`+EX('Ich lerne. – Ich habe gelernt.','I learn. – I have learnt.')+EX('Ich arbeite. – Ich habe gearbeitet.','I work. – I have worked.')+
 `<p><b>abholen</b> (to pick up) — separable: hat … abgeholt</p>`+EX('Ich hole Lena ab.','I pick Lena up.')+EX('Du holst Lena ab.','You pick Lena up.')+EX('Er holt Lena ab.','He picks Lena up.')+EX('Ich habe Lena abgeholt.','I picked Lena up.')+
 `<p><b>fahren</b> (a → ä)</p>`+EX('Ich fahre nach Bischkek.','I am going to Bishkek.')+EX('Du fährst nach Tokmok.','You are going to Tokmok.')+EX('Alex fährt nach Tokmok.','Alex is going to Tokmok.')+EX('Wir fahren nach Bischkek.','We are going to Bishkek.')+EX('Ihr fahrt nach Tokmok.','You (all) are going to Tokmok.')+EX('Sie fahren nach Karakol.','They are going to Karakol.')+EX('Ich gehe in die Schule.','I go to school.')+
 `<p><b>abfahren</b> (to depart) and <b>mitfahren</b> (to come along) — separable</p>`+EX('Ich fahre in 5 Minuten ab.','I leave in 5 minutes.')+EX('Du fährst in 5 Minuten ab und ich fahre in 8 Minuten ab.','You leave in 5 minutes and I leave in 8 minutes.')+EX('Ich fahre nach München mit.','I am coming along to Munich.')+
 `<p><b>bezahlen</b></p>`+EX('Ich bezahle. – Ich habe bezahlt.','I pay. – I have paid.')+
 `<p><b>schlafen, essen, geben, helfen</b></p>`+EX('Ich schlafe 8 Stunden. Du schläfst 7 Stunden. Lena schläft 9 Stunden.','I sleep 8 hours. You sleep 7 hours. Lena sleeps 9 hours.')+
 EX('Ich esse Bananen. Du isst Äpfel. Lena isst Erdbeeren.','I eat bananas. You eat apples. Lena eats strawberries.')+EX('Alex isst ein Eis. Die Katze isst Wurst.','Alex is eating an ice cream. The cat is eating sausage.')+EX('Wir essen Schnitzel. Ihr esst Manty. Sie essen Manty.','We eat schnitzel. You (all) eat manty. They eat manty.')+
 EX('Ich gebe dir mein Buch. Du gibst mir dein Buch.','I give you my book. You give me your book.')+EX('Er gibt sein Buch. Lena gibt ihr Buch.','He gives his book. Lena gives her book.')+EX('Wir geben unser Buch. Ihr gebt euer Buch. Sie geben ihr Buch.','We give our book. You (all) give your book. They give their book.')+
 TIP('„Ich gebe mein Buch“ is understood, but German usually says <b>to whom</b>: Ich gebe <b>dir</b> mein Buch.')+
 EX('Ich helfe dir. Du hilfst mir.','I help you. You help me.')+EX('Er hilft ihr. Sie hilft ihm.','He helps her. She helps him.')+EX('Wir helfen euch. Ihr helft uns. Sie helfen mir.','We help you (all). You (all) help us. They help me.')+
 TIP('helfen takes the <b>dative</b>: mir, dir, ihm, ihr, uns, euch, ihnen — not mich / dich. That comes later in the course; for now learn these as phrases.')+
 `<p><b>sehen · aussehen · sich ausziehen</b></p>`+EX('Ich sehe. Du siehst. Er sieht.','I see. You see. He sees.')+EX('Ich sehe gut aus. Du siehst gut aus.','I look good. You look good.')+EX('Ich ziehe mich aus. Du ziehst dich aus.','I get undressed. You get undressed.')}
],
vocab: V.map(v=>({de:v[0], en:v[1]})).concat([
 {de:'abholen', en:'to pick up / to collect'},{de:'abfahren', en:'to depart / leave'},{de:'mitfahren', en:'to come along (by vehicle)'},
 {de:'aussehen', en:'to look (good / tired …)'},{de:'sich ausziehen', en:'to get undressed'},{de:'Erdbeere', g:'f', pl:'Erdbeeren', en:'strawberry'},{de:'Katze', g:'f', pl:'Katzen', en:'cat'},{de:'Wurst', g:'f', pl:'Würste', en:'sausage'}
]),
sets:[
 {title:'du and er / sie / es — vowel change', d:'du fährst · er isst · du liest · er läuft', items: V.flatMap(v=>{ const f = F(v[0]); return [
   {t:'fill', q:`du ___ (${v[0]} — ${v[1]})`, a:[f.du], x:`${v[4]}: du <b>${f.du}</b> · er/sie/es <b>${f.er}</b>`, say:`du ${f.du}`},
   {t:'fill', q:`er / sie / es ___ (${v[0]} — ${v[1]})`, a:[f.er], x:`${v[4]}: er/sie/es <b>${f.er}</b>`, say:`er ${f.er}`}]; })},
 {title:'2nd form (Präteritum)', d:'fahren → fuhr · essen → aß', items: V.map(v=>{ const f = F(v[0]); return {t:'fill', q:`${v[0]} (${v[1]}) → 2nd form: er ___`, a:[f.prat], x:`1️⃣ ${v[0]} · 2️⃣ <b>${f.prat}</b> · 3️⃣ ${f.perfekt}`, say:`er ${f.prat}`}; })},
 {title:'3rd form (Perfekt: hat / ist + Partizip II)', d:'ist gefahren · hat gegessen', items: V.map(v=>{ const f = F(v[0]); return {t:'fill', q:`${v[0]} (${v[1]}) → 3rd form: er ___ ___`, a:[f.helper, f.part], h:'hat or ist?', x:`1️⃣ ${v[0]} · 2️⃣ ${f.prat} · 3️⃣ <b>${f.perfekt}</b>${f.aux==='sein'?' — ist: movement':''}`, say:`er ${f.perfekt}`}; })},
 {title:'Homework sentences', d:'abholen · fahren · essen · geben · helfen · aussehen', items:[
  {t:'fill', q:'Ich ___ Lena ___. (abholen)', a:['hole','ab'], x:'separable: ich hole … ab'},
  {t:'fill', q:'Du ___ Lena ___. (abholen)', a:['holst','ab']},
  {t:'fill', q:'Ich habe Lena ___. (abholen)', a:['abgeholt'], x:'3rd form: hat abgeholt'},
  {t:'fill', q:'Du ___ nach Tokmok. (fahren)', a:['fährst'], x:'a → ä'},
  {t:'fill', q:'Ihr ___ nach Tokmok. (fahren)', a:['fahrt'], x:'ihr: no vowel change'},
  {t:'fill', q:'Ich ___ in 5 Minuten ___. (abfahren)', a:['fahre','ab']},
  {t:'fill', q:'Lena ___ 9 Stunden. (schlafen)', a:['schläft']},
  {t:'fill', q:'Die Katze ___ Wurst. (essen)', a:['isst'], x:'e → i: er/sie/es isst'},
  {t:'fill', q:'Ihr ___ Manty. (essen)', a:['esst']},
  {t:'fill', q:'Er ___ sein Buch. (geben)', a:['gibt']},
  {t:'fill', q:'Du ___ mir. (helfen)', a:['hilfst']},
  {t:'fill', q:'Er ___ ihr. (helfen)', a:['hilft']},
  {t:'fill', q:'Du ___ gut ___. (aussehen)', a:['siehst','aus'], x:'separable + e → ie'},
  {t:'fill', q:'Du ziehst ___ aus. (sich ausziehen)', a:['dich']},
  {t:'fill', q:'Ich habe ___. (arbeiten)', a:['gearbeitet']},
  {t:'fill', q:'Ich habe ___. (bezahlen)', a:['bezahlt'], x:'be- verbs: no ge-'},
  {t:'order', a:'Ich fahre nach München mit.', en:'I am coming along to Munich.'},
  {t:'order', a:'Du fährst in 5 Minuten ab.', en:'You leave in 5 minutes.'},
  {t:'tr', en:'You eat apples. (du)', a:['Du isst Äpfel.']},
  {t:'tr', en:'She speaks German.', a:['Sie spricht Deutsch.']}
 ]}
],
drills:['vpres','vforms','conj-strong']
});
})();

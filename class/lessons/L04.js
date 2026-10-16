LESSONS.push({
id:'L04', date:'2026-10-05',
title:'Strong verbs: vowel change a→ä, e→i, e→ie, au→äu',
topics:['a → ä','e → i','e → ie','au → äu','braten has no extra e'],
summary:'The stem-changing (strong) verbs table: the vowel changes only with du and er/sie/es.',
learn:[
{h:'1. The rule', html:
 `<p>Strong verbs change their stem vowel in the present tense — but <b>only for du and er/sie/es</b>. ich, wir, ihr, sie/Sie stay normal.</p>`+
 TBL(['Person','fahren (a→ä)','essen (e→i)','lesen (e→ie)','laufen (au→äu)'],[
  ['ich','fahre','esse','lese','laufe'],['du','f<span class="end">ä</span>hrst','<span class="end">i</span>sst','l<span class="end">ie</span>st','l<span class="end">äu</span>fst'],['er / sie / es','f<span class="end">ä</span>hrt','<span class="end">i</span>sst','l<span class="end">ie</span>st','l<span class="end">äu</span>ft'],
  ['wir','fahren','essen','lesen','laufen'],['ihr','fahrt','esst','lest','lauft'],['sie / Sie','fahren','essen','lesen','laufen']
 ])+
 TIP('Learn strong verbs as three forms: <b>fahren – du fährst – er fährt</b>.')},
{h:'2. a → ä', html:
 TBL(['Infinitive','du','er / sie / es','Meaning'],[
  ['fahren','fährst','fährt','~to drive / travel'],['schlafen','schläfst','schläft','~to sleep'],['braten','brätst','brät','~to fry / roast'],['halten','hältst','hält','~to hold / stop'],
  ['tragen','trägst','trägt','~to carry / wear'],['waschen','wäschst','wäscht','~to wash'],['fallen','fällst','fällt','~to fall'],['fangen','fängst','fängt','~to catch'],
  ['lassen','lässt','lässt','~to let / leave'],['raten','rätst','rät','~to advise / guess'],['schlagen','schlägst','schlägt','~to hit'],['backen','bäckst','bäckt','~to bake']
 ])+
 TIP('<b>braten, halten, raten</b>: the stem ends in -t, but strong verbs with a vowel change do <b>not</b> add the extra e → <b>du brätst, er brät</b> (not „bratet“). Only ihr keeps it: ihr bratet, ihr haltet.')+
 EX('Klaus fährt nach Berlin.','Klaus travels to Berlin.')+EX('Das Baby schläft.','The baby is sleeping.')+EX('Er brät Fisch.','He is frying fish.')+EX('Du trägst eine Jacke.','You are wearing a jacket.')},
{h:'3. e → i  and  e → ie', html:
 TBL(['Infinitive','du','er / sie / es','Meaning'],[
  ['essen','isst','isst','~to eat'],['geben','gibst','gibt','~to give'],['helfen','hilfst','hilft','~to help'],['nehmen','nimmst','nimmt','~to take (note: mm, t)'],
  ['sprechen','sprichst','spricht','~to speak'],['treffen','triffst','trifft','~to meet'],['vergessen','vergisst','vergisst','~to forget'],
  ['lesen','liest','liest','~to read (e → ie)'],['sehen','siehst','sieht','~to see (e → ie)'],['empfehlen','empfiehlst','empfiehlt','~to recommend (e → ie)']
 ])+
 EX('Was isst du? – Ich esse Brot.','What are you eating?')+EX('Sprichst du Deutsch?','Do you speak German?')+EX('Er nimmt den Bus.','He takes the bus.')+EX('Sie liest ein Buch.','She is reading a book.')+EX('Siehst du das Haus?','Do you see the house?')},
{h:'4. au → äu', html:
 EX('ich laufe – du läufst – er läuft','to run / walk')+EX('Lena läuft jeden Morgen.','Lena runs every morning.')}
],
vocab:[
 {de:'fahren', en:'to drive / travel'},{de:'schlafen', en:'to sleep'},{de:'braten', en:'to fry / roast'},{de:'halten', en:'to hold / stop'},{de:'tragen', en:'to carry / wear'},{de:'waschen', en:'to wash'},
 {de:'fallen', en:'to fall'},{de:'fangen', en:'to catch'},{de:'lassen', en:'to let / leave'},{de:'raten', en:'to advise / guess'},{de:'schlagen', en:'to hit / strike'},{de:'backen', en:'to bake'},
 {de:'essen', en:'to eat'},{de:'geben', en:'to give'},{de:'helfen', en:'to help'},{de:'nehmen', en:'to take'},{de:'sprechen', en:'to speak'},{de:'treffen', en:'to meet'},{de:'vergessen', en:'to forget'},
 {de:'lesen', en:'to read'},{de:'sehen', en:'to see'},{de:'empfehlen', en:'to recommend'},{de:'laufen', en:'to run / walk'},
 {de:'Fisch', g:'m', pl:'Fische', en:'fish'},{de:'Baby', g:'n', pl:'Babys', en:'baby'},{de:'Bus', g:'m', pl:'Busse', en:'bus'},{de:'Brot', g:'n', pl:'Brote', en:'bread'},{de:'Hand', g:'f', pl:'Hände', en:'hand'},
 {de:'Kuchen', g:'m', pl:'Kuchen', en:'cake'},{de:'Wäsche', g:'f', pl:'—', en:'laundry'},{de:'Ball', g:'m', pl:'Bälle', en:'ball'},{de:'Morgen', g:'m', pl:'Morgen', en:'morning'}
],
sets:[
{title:'du and er forms', d:'strong verbs', items:[
 {t:'fill', q:'Du ___ nach Berlin. (fahren)', a:['fährst|faehrst']},
 {t:'fill', q:'Klaus ___ nach Hause. (fahren)', a:['fährt|faehrt']},
 {t:'fill', q:'Das Baby ___. (schlafen)', a:['schläft|schlaeft']},
 {t:'fill', q:'Du ___ Fisch. (braten)', a:['brätst|braetst'], x:'braten → du <b>brätst</b> (no extra e)'},
 {t:'fill', q:'Er ___ das Gemüse. (braten)', a:['brät|braet'], x:'braten → er <b>brät</b>'},
 {t:'fill', q:'Der Bus ___ hier. (halten)', a:['hält|haelt']},
 {t:'fill', q:'Du ___ eine Jacke. (tragen)', a:['trägst|traegst']},
 {t:'fill', q:'Sie (she) ___ die Wäsche. (waschen)', a:['wäscht|waescht']},
 {t:'fill', q:'Was ___ du? (essen)', a:['isst']},
 {t:'fill', q:'Er ___ mir das Buch. (geben)', a:['gibt']},
 {t:'fill', q:'___ du mir? (helfen)', a:['Hilfst']},
 {t:'fill', q:'Er ___ den Bus. (nehmen)', a:['nimmt']},
 {t:'fill', q:'___ du Deutsch? (sprechen)', a:['Sprichst']},
 {t:'fill', q:'Maria ___ Englisch. (sprechen)', a:['spricht']},
 {t:'fill', q:'Du ___ deine Freunde. (treffen)', a:['triffst']},
 {t:'fill', q:'Sie (she) ___ ein Buch. (lesen)', a:['liest']},
 {t:'fill', q:'___ du das Haus? (sehen)', a:['Siehst']},
 {t:'fill', q:'Er ___ einen Film. (sehen)', a:['sieht']},
 {t:'fill', q:'Lena ___ jeden Morgen. (laufen)', a:['läuft|laeuft']},
 {t:'fill', q:'Du ___ immer alles. (vergessen)', a:['vergisst']}
]},
{title:'Only du and er change!', d:'mixed persons', items:[
 {t:'fill', q:'Ich ___ nach Berlin. (fahren)', a:['fahre'], x:'ich → no change: <b>fahre</b>'},
 {t:'fill', q:'Wir ___ Brot. (essen)', a:['essen']},
 {t:'fill', q:'Ihr ___ Deutsch. (sprechen)', a:['sprecht'], x:'ihr → no change: <b>sprecht</b>'},
 {t:'fill', q:'Ich ___ ein Buch. (lesen)', a:['lese']},
 {t:'fill', q:'Ihr ___ Fisch. (braten)', a:['bratet'], x:'ihr → no vowel change, and the -t stem keeps the extra e: <b>bratet</b>'},
 {t:'fill', q:'Die Kinder ___ lange. (schlafen)', a:['schlafen']},
 {t:'fill', q:'Ihr ___ den Bus. (nehmen)', a:['nehmt']},
 {t:'fill', q:'Wir ___ euch. (helfen)', a:['helfen']},
 {t:'mcq', q:'Which is correct?', o:['du nimmst','du nehmst','du nimmt','du nehmest'], a:0, x:'nehmen → du <b>nimmst</b>, er <b>nimmt</b>.'},
 {t:'mcq', q:'Which is correct?', o:['er brät','er bratet','er brätet','er brat'], a:0},
 {t:'mcq', q:'Which is correct?', o:['ihr fahrt','ihr fährt','ihr fahret','ihr fahrst'], a:0, x:'ihr → no vowel change: <b>fahrt</b>.'},
 {t:'mcq', q:'Which is correct?', o:['du liest','du lest','du liesst','du lies'], a:0},
 {t:'mcq', q:'Which vowel change does „helfen“ have?', o:['e → i','e → ie','a → ä','none'], a:0},
 {t:'mcq', q:'Which vowel change does „sehen“ have?', o:['e → ie','e → i','au → äu','none'], a:0},
 {t:'mcq', q:'Which vowel change does „tragen“ have?', o:['a → ä','e → i','au → äu','none'], a:0},
 {t:'tr', en:'Do you speak German? (du)', a:['Sprichst du Deutsch?']},
 {t:'tr', en:'He is reading a book.', a:['Er liest ein Buch.']},
 {t:'tr', en:'She is sleeping.', a:['Sie schläft.','Sie schlaeft.']},
 {t:'tr', en:'What are you eating? (du)', a:['Was isst du?']}
]},
{title:'Meanings of strong verbs', items:[
 {t:'match', pairs:[['fahren','to drive'],['schlafen','to sleep'],['tragen','to carry / wear'],['waschen','to wash'],['halten','to hold / stop'],['braten','to fry']]},
 {t:'match', pairs:[['essen','to eat'],['geben','to give'],['helfen','to help'],['nehmen','to take'],['treffen','to meet'],['vergessen','to forget']]},
 {t:'match', pairs:[['lesen','to read'],['sehen','to see'],['laufen','to run'],['sprechen','to speak'],['backen','to bake'],['fangen','to catch']]}
]}
],
drills:['conj-strong','conj-all']
});

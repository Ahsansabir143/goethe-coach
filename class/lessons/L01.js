LESSONS.push({
id:'L01', date:'2026-09-30',
title:'Trial lesson: German sounds & adjectives',
topics:['Pronunciation','Adjectives & opposites','Ist das …? questions','er / sie / es'],
summary:'The 30-minute trial lesson: how German letters sound, common adjectives with their opposites, and simple questions like „Ist das Buch dick?“',
learn:[
{h:'1. German sounds that are different from English', html:
 `<p>German is read almost exactly as it is written. These letter groups are the ones Anara drilled:</p>`+
 TBL(['Letters','Sounds like','Examples'],[
  ['ei','~„ai“ as in <i>my</i>','mein, nein, drei, Wein'],
  ['ie','~long „ee“ as in <i>see</i>','die, sie, Bier, spielen'],
  ['eu / äu','~„oi“ as in <i>boy</i>','neu, heute, Deutsch, Häuser'],
  ['sch','~„sh“ as in <i>shop</i>','Schule, schön, Tisch'],
  ['tsch','~„ch“ as in <i>church</i>','tschüss, Deutsch, Tschechien'],
  ['ch (after a, o, u)','~throat sound, like Scottish <i>loch</i>','Buch, acht, kochen'],
  ['ch (after e, i, ä, ö, ü)','~soft „h-sh“ sound','ich, nicht, sprechen, Bücher'],
  ['sp / st (start of word)','~„shp“ / „sht“','sprechen, Sport, Straße, Student'],
  ['z','~„ts“ as in <i>cats</i>','Zimmer, zehn, Zeitung'],
  ['w','~English „v“','Wasser, wie, Wein'],
  ['v','~English „f“ (usually)','Vater, vier, viel'],
  ['j','~English „y“','ja, Juli, Jahr'],
  ['s (before a vowel)','~English „z“','sie, Sonne, sagen'],
  ['ß','~sharp „ss“','heißen, Straße, groß'],
  ['h (after a vowel)','~silent — makes the vowel long','gehen, Uhr, sehr'],
  ['-er (end of word)','~short „a“ sound','Lehrer, Vater, Zimmer'],
  ['ä / ö / ü','~ä like „e“ in <i>bed</i>; ö = say „e“ with round lips; ü = say „ee“ with round lips','Käse, schön, fünf']
 ]) + TIP('Click 🔊 on any example and copy the voice. The underlined words show their meaning when you tap them.')},
{h:'2. Adjectives and their opposites', html:
 `<p>Adjectives describe things. After <b>sein</b> (ist / sind) they never change their ending:</p>`+
 EX('Das Buch ist <b>dick</b>.','The book is thick.')+
 EX('Die Suppe ist <b>heiß</b>.','The soup is hot.')+
 EX('Die Kinder sind <b>müde</b>.','The children are tired.')+
 TBL(['Adjective','Meaning','Opposite','Meaning'],[
  ['dick','~thick / fat','dünn','~thin'],['klein','~small / short','groß','~big / tall'],['schwierig','~difficult / hard','einfach','~easy / simple'],
  ['kalt','~cold','warm / heiß','~warm / hot'],['faul','~lazy','fleißig','~hard-working'],['teuer','~expensive','billig','~cheap'],
  ['hoch','~high','niedrig','~low'],['krank','~sick / ill','gesund','~healthy'],['laut','~loud','leise','~quiet'],
  ['sauer','~sour','süß','~sweet'],['müde','~tired','wach','~awake'],['langweilig','~boring','interessant','~interesting'],
  ['alt','~old','neu / jung','~new / young'],['schnell','~fast','langsam','~slow'],['schön','~beautiful','hässlich','~ugly'],['gut','~good','schlecht','~bad']
 ])},
{h:'3. Questions with „Ist das …?“ and short answers', html:
 `<p>In a yes/no question the verb comes <b>first</b>. In the answer, the noun is replaced by a pronoun:</p>`+
 TBL(['Noun with…','Pronoun','Example'],[
  ['~<span class="m">der</span> (masculine)','er','Ist der Film interessant? – Nein, <b>er</b> ist langweilig.'],
  ['~<span class="f">die</span> (feminine)','sie','Ist die Frage schwierig? – Ja, <b>sie</b> ist sehr schwierig.'],
  ['~<span class="n">das</span> (neuter)','es','Ist das Buch dick? – Ja, <b>es</b> ist sehr dick.'],
  ['~<span class="p">die</span> (plural)','sie','Sind die Kinder laut? – Nein, <b>sie</b> sind leise.']
 ])+
 EX('Ist das Wasser warm? – Nein, es ist kalt.','Is the water warm? – No, it is cold.')+
 EX('Ist die Milch billig? – Ja, sie ist billig.','Is the milk cheap? – Yes, it is cheap.')+
 EX('Ist der Apfel sauer? – Nein, er ist süß.','Is the apple sour? – No, it is sweet.')+
 TIP('<b>sehr</b> = very · <b>nicht</b> = not: „Das Buch ist <b>nicht</b> dick.“ = The book is not thick.')}
],
vocab:[
 {de:'dick', en:'thick / fat', opp:'dünn'},{de:'dünn', en:'thin', opp:'dick'},{de:'klein', en:'small / short', opp:'groß'},{de:'groß', en:'big / tall', opp:'klein'},
 {de:'schwierig', en:'difficult / hard', opp:'einfach'},{de:'einfach', en:'easy / simple', opp:'schwierig'},{de:'kalt', en:'cold', opp:'warm / heiß'},{de:'warm', en:'warm', opp:'kalt'},
 {de:'heiß', en:'hot', opp:'kalt'},{de:'faul', en:'lazy', opp:'fleißig'},{de:'fleißig', en:'hard-working', opp:'faul'},{de:'teuer', en:'expensive', opp:'billig'},
 {de:'billig', en:'cheap', opp:'teuer'},{de:'hoch', en:'high', opp:'niedrig'},{de:'niedrig', en:'low', opp:'hoch'},{de:'krank', en:'sick / ill', opp:'gesund'},
 {de:'gesund', en:'healthy', opp:'krank'},{de:'laut', en:'loud', opp:'leise'},{de:'leise', en:'quiet', opp:'laut'},{de:'sauer', en:'sour', opp:'süß'},
 {de:'süß', en:'sweet', opp:'sauer'},{de:'müde', en:'tired', opp:'wach'},{de:'wach', en:'awake', opp:'müde'},{de:'langweilig', en:'boring', opp:'interessant'},
 {de:'interessant', en:'interesting', opp:'langweilig'},{de:'schnell', en:'fast', opp:'langsam'},{de:'langsam', en:'slow', opp:'schnell'},{de:'schön', en:'beautiful / nice', opp:'hässlich'},
 {de:'hässlich', en:'ugly', opp:'schön'},{de:'jung', en:'young', opp:'alt'},
 {de:'Buch', g:'n', pl:'Bücher', en:'book'},{de:'Haus', g:'n', pl:'Häuser', en:'house'},{de:'Frage', g:'f', pl:'Fragen', en:'question'},{de:'Getränk', g:'n', pl:'Getränke', en:'drink'},
 {de:'Laptop', g:'m', pl:'Laptops', en:'laptop'},{de:'Tee', g:'m', pl:'Tees', en:'tea'},{de:'Miete', g:'f', pl:'Mieten', en:'rent'},{de:'Musik', g:'f', pl:'—', en:'music'},
 {de:'Kopf', g:'m', pl:'Köpfe', en:'head'},{de:'Apfel', g:'m', pl:'Äpfel', en:'apple'},{de:'Wasser', g:'n', pl:'—', en:'water'},{de:'Milch', g:'f', pl:'—', en:'milk'},
 {de:'Wetter', g:'n', pl:'—', en:'weather'},{de:'Prüfung', g:'f', pl:'Prüfungen', en:'exam'},{de:'Film', g:'m', pl:'Filme', en:'film / movie'},{de:'Auto', g:'n', pl:'Autos', en:'car'},
 {de:'Student', g:'m', pl:'Studenten', en:'student (male)'},{de:'Studentin', g:'f', pl:'Studentinnen', en:'student (female)'},{de:'Ei', g:'n', pl:'Eier', en:'egg'},{de:'Jacke', g:'f', pl:'Jacken', en:'jacket'},
 {de:'Mann', g:'m', pl:'Männer', en:'man / husband'},{de:'Fahrrad', g:'n', pl:'Fahrräder', en:'bicycle'},{de:'Antwort', g:'f', pl:'Antworten', en:'answer'},{de:'Kind', g:'n', pl:'Kinder', en:'child'},
 {de:'Herr', g:'m', pl:'Herren', en:'Mr / gentleman'},{de:'sehr', en:'very'},{de:'nicht', en:'not'}
],
sets:[
{title:'Opposites', d:'adjective pairs', items:[
 {t:'match', pairs:[['dick','thick'],['klein','small'],['teuer','expensive'],['müde','tired'],['laut','loud'],['süß','sweet']]},
 {t:'match', pairs:[['schwierig','difficult'],['faul','lazy'],['krank','sick'],['hoch','high'],['kalt','cold'],['langweilig','boring']]},
 {t:'mcq', q:'Opposite of „teuer“?', o:['billig','hoch','dünn','leise'], a:0, x:'teuer (expensive) ↔ <b>billig</b> (cheap)'},
 {t:'mcq', q:'Opposite of „faul“?', o:['fleißig','müde','krank','schnell'], a:0, x:'faul (lazy) ↔ <b>fleißig</b> (hard-working)'},
 {t:'mcq', q:'Opposite of „schwierig“?', o:['einfach','sauer','groß','alt'], a:0, x:'schwierig (difficult) ↔ <b>einfach</b> (easy)'},
 {t:'mcq', q:'Opposite of „laut“?', o:['leise','langsam','klein','kalt'], a:0, x:'laut (loud) ↔ <b>leise</b> (quiet)'},
 {t:'mcq', q:'Opposite of „krank“?', o:['gesund','wach','neu','warm'], a:0, x:'krank (ill) ↔ <b>gesund</b> (healthy)'},
 {t:'mcq', q:'Opposite of „sauer“?', o:['süß','heiß','teuer','dick'], a:0, x:'sauer (sour) ↔ <b>süß</b> (sweet)'},
 {t:'mcq', q:'Opposite of „langweilig“?', o:['interessant','langsam','leise','jung'], a:0, x:'langweilig (boring) ↔ <b>interessant</b>'},
 {t:'mcq', q:'Opposite of „hoch“?', o:['niedrig','dünn','klein','billig'], a:0, x:'hoch (high) ↔ <b>niedrig</b> (low)'},
 {t:'fill', q:'Das Buch ist nicht dünn, es ist ___.', a:['dick'], x:'dünn ↔ <b>dick</b>'},
 {t:'fill', q:'Der Tee ist nicht kalt, er ist ___.', a:['heiß|warm'], x:'kalt ↔ <b>heiß / warm</b>'},
 {t:'fill', q:'Peter ist nicht fleißig, er ist ___.', a:['faul'], x:'fleißig ↔ <b>faul</b>'},
 {t:'fill', q:'Die Prüfung ist nicht einfach, sie ist ___.', a:['schwierig'], x:'einfach ↔ <b>schwierig</b>'},
 {t:'fill', q:'Das Auto ist nicht langsam, es ist ___.', a:['schnell'], x:'langsam ↔ <b>schnell</b>'}
]},
{title:'Ist das …? – Ja / Nein', d:'er, sie, es in answers (Übung 1 & 2)', items:[
 {t:'fill', q:'Ist das Buch dick? – Ja, ___ ist sehr dick.', a:['es'], x:'das Buch → <b>es</b>'},
 {t:'fill', q:'Ist der Film interessant? – Nein, ___ ist langweilig.', a:['er'], x:'der Film → <b>er</b>'},
 {t:'fill', q:'Ist die Frage schwierig? – Ja, ___ ist schwierig.', a:['sie'], x:'die Frage → <b>sie</b>'},
 {t:'fill', q:'Ist das Haus klein? – Ja, ___ ist sehr klein.', a:['es'], x:'das Haus → <b>es</b>'},
 {t:'fill', q:'Ist der Tee heiß? – Ja, ___ ist sehr heiß.', a:['er'], x:'der Tee → <b>er</b>'},
 {t:'fill', q:'Ist die Miete teuer? – Ja, ___ ist sehr teuer.', a:['sie'], x:'die Miete → <b>sie</b>'},
 {t:'fill', q:'Ist der Laptop teuer? – Nein, ___ ist billig.', a:['er'], x:'der Laptop → <b>er</b>'},
 {t:'fill', q:'Sind die Getränke kalt? – Ja, ___ sind kalt.', a:['sie'], x:'plural die Getränke → <b>sie</b>'},
 {t:'fill', q:'Ist das Wasser warm? – Nein, ___ ist kalt.', a:['es'], x:'das Wasser → <b>es</b>'},
 {t:'fill', q:'Ist die Milch billig? – Ja, ___ ist billig.', a:['sie'], x:'die Milch → <b>sie</b>'},
 {t:'fill', q:'Ist der Apfel sauer? – Nein, er ist ___.', a:['süß'], x:'sauer ↔ <b>süß</b>'},
 {t:'fill', q:'Ist das Wetter gut? – Nein, es ist ___.', a:['schlecht'], x:'gut ↔ <b>schlecht</b>'},
 {t:'fill', q:'Ist der Mann alt? – Nein, er ist ___.', a:['jung'], x:'alt ↔ <b>jung</b> (for people)'},
 {t:'fill', q:'Sind die Kinder laut? – Nein, sie sind ___.', a:['leise'], x:'laut ↔ <b>leise</b>'},
 {t:'fill', q:'___ das Auto langsam? – Nein, es ist schnell.', a:['Ist'], x:'Yes/no questions start with the verb: <b>Ist</b> …?'},
 {t:'order', a:'Ist das Buch dick?', en:'Is the book thick?'},
 {t:'order', a:'Der Film ist sehr langweilig.', en:'The film is very boring.'},
 {t:'order', a:'Ist die Frage schwierig?', en:'Is the question difficult?'},
 {t:'tr', en:'Is the tea hot? – Yes, it is very hot.', a:['Ist der Tee heiß? – Ja, er ist sehr heiß.','Ist der Tee heiß? Ja, er ist sehr heiß.'], h:'der Tee → er'},
 {t:'tr', en:'The house is not small.', a:['Das Haus ist nicht klein.']}
]},
{title:'Sounds & spelling', d:'which letters make which sound', items:[
 {t:'mcq', q:'How is „ei“ in „mein“ pronounced?', o:['like „ai“ in my','like „ee“ in see','like „oi“ in boy','like „ay“ in day'], a:0, say:'mein', x:'<b>ei</b> = „ai“: mein, nein, drei.'},
 {t:'mcq', q:'How is „ie“ in „die“ pronounced?', o:['long „ee“','„ai“','„ie“ as in tie','„ye“'], a:0, say:'die', x:'<b>ie</b> = long „ee“: die, sie, Bier.'},
 {t:'mcq', q:'How is „eu“ in „heute“ pronounced?', o:['„oi“ as in boy','„you“','„ay“','„eh-oo“'], a:0, say:'heute', x:'<b>eu / äu</b> = „oi“: heute, neu, Häuser.'},
 {t:'mcq', q:'„w“ in „Wasser“ sounds like English …', o:['v','w','f','u'], a:0, say:'Wasser', x:'German <b>w</b> = English <b>v</b>.'},
 {t:'mcq', q:'„z“ in „Zimmer“ sounds like …', o:['ts','z','s','dz'], a:0, say:'Zimmer', x:'German <b>z</b> = „ts“ as in cats.'},
 {t:'mcq', q:'„sp“ at the start of „sprechen“ sounds like …', o:['shp','sp','sh','zp'], a:0, say:'sprechen', x:'At the start of a word: <b>sp</b> = „shp“, <b>st</b> = „sht“.'},
 {t:'mcq', q:'„v“ in „Vater“ usually sounds like …', o:['f','v','w','b'], a:0, say:'Vater', x:'German <b>v</b> usually = „f“: Vater, vier, viel.'},
 {t:'mcq', q:'„j“ in „ja“ sounds like English …', o:['y','j','h','dj'], a:0, say:'ja', x:'German <b>j</b> = English „y“.'},
 {t:'mcq', q:'Which word has the „ch“ throat sound (like loch)?', o:['Buch','ich','nicht','sprechen'], a:0, say:'Buch', x:'After a, o, u → throat sound: Bu<b>ch</b>, a<b>ch</b>t.'},
 {t:'mcq', q:'Which word has the sound „tsch“?', o:['tschüss','Tisch','Schule','ich'], a:0, say:'tschüss', x:'<b>tsch</b> = English „ch“ in church.'}
]}
],
drills:['vocab','articles']
});

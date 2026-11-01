/* Question words (Fragewörter): wie viel, wie viele, wie oft, wie lange + all W-words — class worksheet A + B */
(function(){
const f = (q, a, x) => ({t:'fill', q, a:Array.isArray(a)?a:[a], x});
const o = (a, en, x) => ({t:'order', a, en, x});
const m = (q, opts, x) => ({t:'mcq', q, o:opts, a:0, x});
LESSONS.push({
id:'L26', date:'2026-10-31',
title:'Question words: wie viel, wie viele, wie oft, wie lange …',
topics:['wie viel = how much','wie viele = how many','wie oft = how often','wie lange = how long','wer, was, wo, wohin, woher, wann, warum, wie'],
summary:'How to ask about price, number, frequency and duration — and how to choose the right question word from the answer. The class worksheet „Fragewörter“ A and B.',
learn:[
{h:'1. What is a question word?', html: '<p>A question word (W-Wort) starts a W-question. It asks for <b>information</b> — not yes / no.</p>'+
 EX('Wie lange übst du Deutsch? – Ungefähr eine Stunde.','How long do you practise German? – About an hour.')+
 TIP('Word order: <b>question word (1) + verb (2) + subject + …?</b> → Wie oft <b>gehst</b> du ins Kino?')},
{h:'2. The four „wie“ questions', html: TBL(['Question word','~Meaning','~It asks for …','Example answer'],[
 ['<b>Wie viel</b> …?','~how much','~price, weight, things you can\'t count (Geld, Zeit, Wasser)','100 Euro · fünfzig Kilo · nichts'],
 ['<b>Wie viele</b> …?','~how many','~things you CAN count → noun in the plural','zwei Augen · 27 Schüler · drei Äpfel'],
 ['<b>Wie oft</b> …?','~how often','~frequency','jeden Tag · einmal im Monat · zweimal pro Woche · nie'],
 ['<b>Wie lange</b> …?','~how long','~duration (time)','eine Stunde · drei Wochen · bis zehn Uhr · drei Jahre lang']])+
 TIP('Trick: look at the <b>answer</b>. Euro / kg / nichts → <b>wie viel</b>. A number + plural noun → <b>wie viele</b>. -mal / jeden / nie → <b>wie oft</b>. Stunde / Woche / Jahre / bis … → <b>wie lange</b>.')},
{h:'3. All the other question words', html: TBL(['Question word','~Meaning','Example'],[
 ['Wer?','~who? (Nominativ)','Wer ist das? – Das ist Anna.'],['Wen?','~whom? (Akkusativ)','Wen besuchst du? – Meine Oma.'],['Wem?','~to whom? (Dativ)','Wem hilfst du? – Meinem Bruder.'],
 ['Was?','~what?','Was machst du? – Ich lerne.'],['Wo?','~where? (place)','Wo wohnst du? – In Bischkek.'],['Wohin?','~where to?','Wohin fährst du? – Nach Berlin.'],['Woher?','~where from?','Woher kommst du? – Aus Pakistan.'],
 ['Wann?','~when?','Wann beginnt der Kurs? – Um 9 Uhr.'],['Warum?','~why?','Warum lernst du Deutsch? – Weil …'],['Wie?','~how?','Wie heißt du? · Wie geht es dir?'],['Welcher / welche / welches?','~which?','Welches Buch liest du?']])},
{h:'4. Step by step: build a question from the answer', html: '<ol><li>Read the answer: <i>zwei Stunden</i>.</li><li>What does it tell? → a duration → <b>Wie lange</b>.</li><li>Put the verb in position 2: Wie lange <b>dauert</b> …</li><li>Add the subject and the rest: Wie lange dauert <b>der Film</b>?</li></ol>'+
 EX('Viermal am Tag. → Wie oft fährt der Zug?','Four times a day. → How often does the train run?')+EX('27. → Wie viele Schüler sind in der Klasse?','27. → How many pupils are in the class?')},
{h:'5. Typical mistakes', html: TBL(['✗ Wrong','✓ Right','~Why'],[['Wie viel Kinder hat sie?','Wie viele Kinder hat sie?','~Kinder = countable plural → viele'],['Wie viele kostet das?','Wie viel kostet das?','~a price → viel'],['Wie lange gehst du ins Kino?','Wie oft gehst du ins Kino?','~einmal im Monat = frequency'],['Wie oft du hast Zeit?','Wie oft hast du Zeit?','~verb in position 2']])},
{h:'6. Summary', html: TIP('<b>viel</b> = how much · <b>viele</b> = how many (plural) · <b>oft</b> = how often · <b>lange</b> = how long. Then: verb in position 2, subject after it.')}
],
vocab:[{de:'der Fernseher', g:'m', pl:'Fernseher', en:'TV set'},{de:'das Zuckerl', g:'n', pl:'Zuckerl', en:'sweet, candy (Austrian)'},{de:'das Sackerl', g:'n', pl:'Sackerl', en:'little bag (Austrian)'},{de:'munter', en:'awake, lively'},{de:'sich merken', en:'to remember, to memorise'},{de:'ungefähr', en:'about, approximately'},{de:'überhaupt nie', en:'never at all'},{de:'wiegen', en:'to weigh'},{de:'gratis', en:'free (of charge)'},{de:'dauern', en:'to last'},{de:'einmal im Monat', en:'once a month'},{de:'viermal am Tag', en:'four times a day'}],
sets:[
 {title:'Worksheet A: fill in the question word', d:'viel · viele · oft · lange', items:[
  f('Wie ___ kostet der Fernseher? – 100 Euro.','viel','price → wie viel'),f('Wie ___ hast du Zeit? – Jeden Nachmittag.','oft','jeden … → frequency'),f('Wie ___ Zuckerl hat Anja? – Ein ganzes Sackerl.','viele','Zuckerl = countable'),
  f('Wie ___ übst du Deutsch? – Ungefähr eine Stunde.','lange','duration'),f('Wie ___ bist du am Abend munter? – Bis zehn Uhr.','lange','bis … → duration'),f('Wie ___ hast du dir gemerkt? – Nichts.','viel','nichts → wie viel'),
  f('Wie ___ gehst du ins Kino? – Einmal im Monat.','oft','einmal → frequency'),f('Wie ___ Augen hast du? – Zwei.','viele','Augen = plural'),f('Wie ___ bleibt der Bus hier stehen? – Hier? Überhaupt nie!','lange','how long does it stop'),
  f('Wie ___ wohnt Tim schon hier? – Ich glaube, drei Jahre lang.','lange','drei Jahre lang = duration')]},
 {title:'Worksheet A: match question and answer', d:'choose the right answer', items:[
  m('Wie viel kostet der Fernseher?',['100 Euro.','Einmal im Monat.','Zwei.'],'price'),m('Wie oft hast du Zeit?',['Jeden Nachmittag.','Bis zehn Uhr.','Nichts.'],'frequency'),
  m('Wie viele Zuckerl hat Anja?',['Ein ganzes Sackerl.','Ungefähr eine Stunde.','Jeden Nachmittag.'],'an amount of sweets'),m('Wie lange übst du Deutsch?',['Ungefähr eine Stunde.','Zwei.','100 Euro.'],'duration'),
  m('Wie lange bist du am Abend munter?',['Bis zehn Uhr.','Einmal im Monat.','Nichts.'],'until …'),m('Wie viel hast du dir gemerkt?',['Nichts.','Zwei.','Jeden Nachmittag.'],'how much'),
  m('Wie oft gehst du ins Kino?',['Einmal im Monat.','Drei Jahre lang.','100 Euro.'],'frequency'),m('Wie viele Augen hast du?',['Zwei.','Bis zehn Uhr.','Nichts.'],'a number'),
  m('Wie lange wohnt Tim schon hier?',['Ich glaube, drei Jahre lang.','Einmal im Monat.','Zwei.'],'duration')]},
 {title:'Worksheet B: which question word?', d:'look at the answer', items:[
  m('___ fährt der Zug? – Viermal am Tag.',['Wie oft','Wie lange','Wie viel'],'-mal → wie oft'),m('___ bleibt er? – Drei Wochen.',['Wie lange','Wie oft','Wie viele'],'duration'),m('___ kostet das? – 18,20 €.',['Wie viel','Wie viele','Wie oft'],'price'),
  m('___ gehst du ins Theater? – Nie.',['Wie oft','Wie lange','Wie viel'],'nie = frequency'),m('___ Schüler sind in der Klasse? – 27.',['Wie viele','Wie viel','Wie oft'],'plural noun'),m('___ dauert der Film? – Zwei Stunden.',['Wie lange','Wie oft','Wie viele'],'duration'),
  m('___ wiegst du? – Fünfzig Kilogramm.',['Wie viel','Wie viele','Wie lange'],'weight'),m('___ Äpfel sind noch da? – Drei Äpfel.',['Wie viele','Wie viel','Wie oft'],'plural noun'),m('___ hast du Deutschkurs? – Zweimal in der Woche.',['Wie oft','Wie lange','Wie viel'],'-mal'),
  m('___ arbeitest du noch? – Bis neun Uhr.',['Wie lange','Wie oft','Wie viele'],'bis … = duration'),m('___ Kinder hat sie? – Keine Kinder.',['Wie viele','Wie viel','Wie oft'],'Kinder = plural'),m('___ fährst du in den Urlaub? – Jedes Jahr einmal.',['Wie oft','Wie lange','Wie viel'],'einmal = frequency')]},
 {title:'Worksheet B: build the question', d:'put the words in order', items:[
  o('Wie oft fährt der Zug?','How often does the train run? – Four times a day.'),o('Wie lange bleibt er?','How long is he staying? – Three weeks.'),o('Wie viel kostet das?','How much does it cost? – 18.20 €.'),
  o('Wie oft gehst du ins Theater?','How often do you go to the theatre? – Never.'),o('Wie viele Schüler sind in der Klasse?','How many pupils are in the class? – 27.'),o('Wie lange dauert der Film?','How long does the film last? – Two hours.'),
  o('Wie viel wiegst du?','How much do you weigh? – Fifty kilograms.'),o('Wie viele Äpfel sind noch da?','How many apples are still there? – Three apples.'),o('Wie oft hast du Deutschkurs?','How often do you have German class? – Twice a week.'),
  o('Wie lange arbeitest du noch?','How much longer are you working? – Until nine.'),o('Wie viele Kinder hat sie?','How many children does she have? – No children.'),o('Wie oft fährst du in den Urlaub?','How often do you go on holiday? – Once every year.')]},
 {title:'All question words', d:'wer, wen, wem, was, wo, wohin, woher, wann, warum, wie', items:[
  f('___ kommst du? – Aus Pakistan.','Woher'),f('___ fährst du? – Nach Berlin.','Wohin'),f('___ wohnst du? – In Bischkek.','Wo'),f('___ beginnt der Kurs? – Um 9 Uhr.','Wann'),
  f('___ ist das? – Das ist Anna.','Wer'),f('___ machst du? – Ich lerne Deutsch.','Was'),f('___ heißt du? – Ahsan.','Wie'),f('___ hilfst du? – Meinem Bruder.','Wem','Dativ → wem'),f('___ besuchst du? – Meine Oma.','Wen','Akkusativ → wen'),
  m('___ lernst du Deutsch? – Weil ich in Deutschland arbeiten möchte.',['Warum','Wann','Wie'],'weil → warum')]}
],
drills:['p-frage']
});
})();

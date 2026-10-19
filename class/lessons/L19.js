/* 6.2 Pronomen – Dativ (Aber Hallo! A1, S. 23) */
(function(){
const f = (q, a, x) => ({t:'fill', q, a:Array.isArray(a)?a:[a], x});
const o = (a, en, x) => ({t:'order', a, en, x});
const m = (q, opts, x) => ({t:'mcq', q, o:opts, a:0, x});
LESSONS.push({
id:'L19', date:'2026-10-19',
title:'The dative: personal pronouns (6.2)',
topics:['mir · dir · ihm · ihr · ihm · uns · euch · ihnen/Ihnen','Glaubst du mir? – Ja, ich glaube dir.','Word order: Gefällt dir der Film?','Wem gehört das Buch?'],
summary:'Replace a dative object with a pronoun: dem Peter → ihm, der Maria → ihr, den Leuten → ihnen — and where the pronoun goes in the sentence.',
learn:[
{h:'1. Dative pronouns — what and why', html:`<p>When the person in the dative is already known, we use a <b>dative pronoun</b>.</p>`+
 `<p class="muted">Maria telefoniert mit Robert. — Maria is on the phone with Robert.</p>`+EX('Hört Maria Robert zu? – Ja, sie hört ihm zu.','Is Maria listening to Robert? – Yes, she is listening to him.')+EX('Hört Robert Maria zu? – Ja, er hört ihr zu.','Is Robert listening to Maria? – Yes, he is listening to her.')},
{h:'2. The table: Nominativ – Akkusativ – Dativ', html: TBL(['','ich','du','er','sie','es','wir','ihr','sie, Sie'],[['~Nominativ','ich','du','er','sie','es','wir','ihr','sie, Sie'],['~Akkusativ','mich','dich','ihn','sie','es','uns','euch','sie, Sie'],['~Dativ','<b>mir</b>','<b>dir</b>','<b>ihm</b>','<b>ihr</b>','<b>ihm</b>','<b>uns</b>','<b>euch</b>','<b>ihnen, Ihnen</b>']])+
 EX('Glaubst du mir? – Ja, ich glaube dir.','Do you believe me? – Yes, I believe you.')+EX('Glaubst du uns? – Ja, ich glaube euch.','Do you believe us? – Yes, I believe you (all).')+
 TIP('Watch out: <b>ihr</b> is also „her“ in the dative (ich helfe ihr) and <b>ihm</b> is for both er and es. uns and euch are the same in accusative and dative.')},
{h:'3. Noun → pronoun', html: TBL(['Dative noun','Pronoun','Example'],[['dem Peter / dem Lehrer','ihm','Ich antworte ihm.'],['der Maria / der Studentin','ihr','Ich glaube ihr nicht.'],['dem Mädchen','ihm','Ich helfe ihm.'],['den Leuten / Max und Maria','ihnen','Ich danke ihnen.']])+
 EX('Glaubst du der Studentin? – Nein, ich glaube ihr nicht.','Do you believe the student? – No, I don\'t believe her.')},
{h:'4. Word order with the dative', html: TBL(['Sentence','Order'],[['Der Film gefällt dir.','~Subjekt – Prädikat – Dativobjekt'],['Dir gefällt der Film.','~Dativobjekt – Prädikat – Subjekt'],['Gefällt dir der Film?','~Prädikat – Dativobjekt – Subjekt (pronoun before noun!)'],['Gefällt er dir?','~Prädikat – Subjekt (pronoun) – Dativobjekt']])+
 TIP('Short pronouns usually come <b>before</b> nouns: Gefällt <b>dir</b> der Film? · Schmeckt <b>Maria</b> der Wein? – Ja, er schmeckt <b>ihr</b> ziemlich gut.')},
{h:'5. Asking with Wem?', html: EX('Wem gehört das Buch? – Es gehört dem Professor.','Whom does the book belong to? – It belongs to the professor.')+EX('Wem gehört das Haus? – Dem Onkel gehört es.','Whom does the house belong to? – It belongs to the uncle.')+
 TIP('<b>Wer?</b> → subject · <b>Wen?</b> → accusative · <b>Wem?</b> → dative.')}
],
vocab:[
 {de:'mir', en:'(to) me — dative of ich'},{de:'dir', en:'(to) you — dative of du'},{de:'ihm', en:'(to) him / it — dative of er / es'},{de:'ihnen', en:'(to) them — dative of sie (plural); Ihnen = (to) you, formal'},
 {de:'telefonieren', en:'to phone'},{de:'Rucksack', g:'m', pl:'Rucksäcke', en:'backpack'},{de:'Kamera', g:'f', pl:'Kameras', en:'camera'},{de:'Tablet', g:'n', pl:'Tablets', en:'tablet (computer)'},
 {de:'Brief', g:'m', pl:'Briefe', en:'letter'},{de:'Handschuh', g:'m', pl:'Handschuhe', en:'glove'},{de:'Fahrrad', g:'n', pl:'Fahrräder', en:'bicycle'},{de:'Touristin', g:'f', pl:'Touristinnen', en:'tourist (female)'},
 {de:'Erdnuss', g:'f', pl:'Erdnüsse', en:'peanut'},{de:'Traube', g:'f', pl:'Trauben', en:'grape'},{de:'ziemlich', en:'quite, rather'}
],
sets:[
 {title:'Übung 1: Glaubst du der Studentin? – Nein, ich glaube ihr nicht.', d:'S. 23 · noun → dative pronoun', items:[
  f('Glaubst du der Studentin? – Nein, ich glaube ___ nicht.','ihr'),
  f('a) Antwortest du Peter? – Nein, ich antworte ___ nicht.','ihm'),
  f('b) Dankst du den Leuten? – Nein, ich danke ___ nicht.','ihnen'),
  f('c) Vertraust du Eva? – Nein, ich vertraue ___ nicht.','ihr'),
  f('d) Glaubst du Max und Maria? – Nein, ich glaube ___ nicht.','ihnen'),
  f('e) Hörst du uns zu? – Nein, ich höre ___ nicht zu.','euch','uns → (answer) euch'),
  f('f) Hilfst du Paul? – Nein, ich helfe ___ nicht.','ihm'),
  f('g) Verzeihst du uns? – Nein, ich verzeihe ___ nicht.','euch'),
  f('h) Gratulierst du Maria? – Nein, ich gratuliere ___ nicht.','ihr'),
  f('i) Hörst du Klaus zu? – Nein, ich höre ___ nicht zu.','ihm'),
  f('Glaubst du mir? – Ja, ich glaube ___.','dir'),f('Glaubst du uns? – Ja, ich glaube ___.','euch')
 ]},
 {title:'Übung 2: Schmeckt Maria der Wein? – Ja, er schmeckt ihr ziemlich gut.', d:'S. 23 · dative + subject pronoun', items:[
  f('Maria – Wein: Schmeckt Maria der Wein? – Ja, ___ schmeckt ___ ziemlich gut.',['er','ihr']),
  f('Max – Pommes: Schmecken Max die Pommes? – Ja, ___ schmecken ___ ziemlich gut.',['sie','ihm']),
  f('a) euch – Suppe: Schmeckt euch die Suppe? – Ja, ___ schmeckt ___ ziemlich gut.',['sie','uns']),
  f('b) Julia – Erdnüsse: Schmecken Julia die Erdnüsse? – Ja, ___ schmecken ___ ziemlich gut.',['sie','ihr']),
  f('c) dir – Steak: Schmeckt dir das Steak? – Ja, ___ schmeckt ___ ziemlich gut.',['es','mir']),
  f('d) Ihnen – Salat: Schmeckt Ihnen der Salat? – Ja, ___ schmeckt ___ ziemlich gut.',['er','mir']),
  f('e) Robert – Schnitzel: Schmeckt Robert das Schnitzel? – Ja, ___ schmeckt ___ ziemlich gut.',['es','ihm']),
  f('f) euch – Trauben: Schmecken euch die Trauben? – Ja, ___ schmecken ___ ziemlich gut.',['sie','uns']),
  f('g) dir – Fisch: Schmeckt dir der Fisch? – Ja, ___ schmeckt ___ ziemlich gut.',['er','mir']),
  f('h) Kindern – Eis: Schmeckt den Kindern das Eis? – Ja, ___ schmeckt ___ ziemlich gut.',['es','ihnen']),
  o('Schmeckt dir das Steak?','Do you like the steak? (dir – Steak)'),o('Gefällt dir der Film?','Do you like the film?')
 ]},
 {title:'Übung 3: Wem gehört das Haus? – Dem Onkel gehört es.', d:'S. 23 · Wem? + dative first', items:[
  f('Haus – Onkel: Wem gehört das Haus? – ___ Onkel gehört ___.',['Dem','es']),
  f('a) Rucksack – Touristin: Wem gehört der Rucksack? – ___ Touristin gehört ___.',['Der','er']),
  f('b) Kamera – Reporter: Wem gehört die Kamera? – ___ Reporter gehört ___.',['Dem','sie']),
  f('c) Tablet – Mädchen: Wem gehört das Tablet? – ___ Mädchen gehört ___.',['Dem','es']),
  f('d) Brief – ich: Wem gehört der Brief? – ___ gehört er.','Mir'),
  f('e) Tasche – Tante: Wem gehört die Tasche? – ___ Tante gehört ___.',['Der','sie']),
  f('f) Auto – Lehrer: Wem gehört das Auto? – ___ Lehrer gehört ___.',['Dem','es']),
  f('g) Handschuhe – du: Wem ___ die Handschuhe? – ___ gehören sie.',['gehören','Dir']),
  f('h) Bücher – wir: Wem gehören die Bücher? – ___ gehören sie.','Uns'),
  f('i) Fahrräder – Studentinnen: Wem gehören die Fahrräder? – ___ Studentinnen gehören ___.',['Den','sie']),
  o('Das Buch gehört dem Professor.','The book belongs to the professor.'),o('Dem Professor gehört es.','It belongs to the professor (dative first).')
 ]},
 {title:'Nominativ, Akkusativ or Dativ?', d:'ich / mich / mir …', items:[
  m('Hilfst du ___? (ich)',['mir','mich','ich'],'helfen + Dativ → mir'),m('Siehst du ___? (ich)',['mich','mir','ich'],'sehen + Akkusativ → mich'),m('Ich danke ___. (du)',['dir','dich','du'],'danken + Dativ'),m('Ich kenne ___. (er)',['ihn','ihm','er'],'kennen + Akkusativ'),
  m('Ich antworte ___. (er)',['ihm','ihn','er'],'antworten + Dativ'),m('Das Buch gehört ___. (sie, plural)',['ihnen','sie','ihr'],'gehören + Dativ'),m('Der Film gefällt ___. (sie, she)',['ihr','sie','ihnen'],'gefallen + Dativ'),
  f('Wie geht es ___? (Sie, formal)','Ihnen'),f('Kannst du ___ helfen? (wir)','uns'),f('Ich gratuliere ___. (ihr)','euch')
 ]}
],
drills:['p6-pron','p6-wem','akkpron']
});
})();

/* 4.3 Personalpronomen – Akkusativ (Aber Hallo! A1, S. 18–19) — sent with the dative pages */
(function(){
const f = (q, a, x) => ({t:'fill', q, a:Array.isArray(a)?a:[a], x});
const o = (a, en, x) => ({t:'order', a, en, x});
const m = (q, opts, x) => ({t:'mcq', q, o:opts, a:0, x});
LESSONS.push({
id:'L17', date:'2026-10-19',
title:'Accusative pronouns: mich, dich, ihn … (4.3)',
topics:['mich · dich · ihn · sie · es · uns · euch · sie/Sie','der Kuchen → ihn','Ich kenne Maria, aber sie kennt mich nicht'],
summary:'Replace an accusative object with a pronoun: den Kuchen → ihn, die Milch → sie, das Buch → es, die Erdbeeren → sie.',
learn:[
{h:'1. What are accusative pronouns?', html:`<p>When the <b>direct object</b> (accusative) is a person or thing we already know, we replace it with a short <b>pronoun</b>.</p>`+
 EX('„Hallo Anna! Besuchst du Peter?“ – „Ja, ich besuche ihn.“','“Hi Anna! Are you visiting Peter?” – “Yes, I am visiting him.”')+EX('„Kennst du Maria?“ – „Ja, ich kenne sie.“','“Do you know Maria?” – “Yes, I know her.”')},
{h:'2. The table', html: TBL(['Nominativ','ich','du','er','sie','es','wir','ihr','sie, Sie'],[['~Akkusativ','<b>mich</b>','<b>dich</b>','<b>ihn</b>','sie','es','<b>uns</b>','<b>euch</b>','sie, Sie'],['~English','~me','~you','~him / it','~her / it','~it','~us','~you all','~them / you']])+
 TIP('Only <b>ich → mich, du → dich, er → ihn, wir → uns, ihr → euch</b> change. sie, es and Sie stay the same.')},
{h:'3. Things: the pronoun follows the article', html: TBL(['Question','Answer','Gender'],[['Isst du den Kuchen hier?','Ja, ich esse <b>ihn</b>.','~masculine: den → ihn'],['Trinkst du die Milch hier?','Ja, ich trinke <b>sie</b>.','~feminine: die → sie'],['Liest du das Buch hier?','Ja, ich lese <b>es</b>.','~neuter: das → es'],['Kaufst du die Erdbeeren hier?','Ja, ich kaufe <b>sie</b>.','~plural: die → sie']])+
 EX('„Wer bekommt das Steak?“ – „Ich bekomme es.“','“Who is getting the steak?” – “I am getting it.”')+
 TIP('Ask: which article does the noun have in the accusative? <b>den → ihn · die → sie · das → es · die (plural) → sie</b>.')},
{h:'4. Subject and object in one sentence', html: EX('Ich kenne Maria, aber sie kennt mich nicht.','I know Maria, but she doesn\'t know me.')+EX('Du kennst den Professor, aber er kennt dich nicht.','You know the professor, but he doesn\'t know you.')+
 TIP('The <b>subject</b> (who does it) is nominative: ich, du, er, sie … The <b>object</b> (whom) is accusative: mich, dich, ihn, sie …')},
{h:'5. Negative answers: ihn … nicht · keinen', html: EX('Trinken Sie den Kaffee hier? – Nein, ich trinke ihn nicht.','Are you drinking the coffee here? – No, I am not drinking it.')+EX('Mögen Sie Kaffee? – Nein, ich mag keinen Kaffee.','Do you like coffee? – No, I don\'t like coffee.')+
 TIP('With der/die/das → pronoun + <b>nicht</b> (ich trinke ihn nicht). Without an article → <b>kein</b> (ich mag keinen Kaffee).')}
],
vocab:[
 {de:'Kotelett', g:'n', pl:'Koteletts', en:'cutlet, chop'},{de:'Sandwich', g:'n', pl:'Sandwiches', en:'sandwich'},{de:'Erdbeereis', g:'n', en:'strawberry ice cream'},{de:'Kakao', g:'m', en:'cocoa'},
 {de:'Tomatensuppe', g:'f', pl:'Tomatensuppen', en:'tomato soup'},{de:'Schokolade', g:'f', pl:'Schokoladen', en:'chocolate'},{de:'Salami', g:'f', pl:'Salamis', en:'salami'},{de:'Pommes', g:'pl', en:'chips, French fries'},
 {de:'Professor', g:'m', pl:'Professoren', en:'professor'},{de:'mögen', en:'to like (ich mag, du magst, er mag)'}
],
sets:[
 {title:'Übung 1: Wer bekommt …? – Ich bekomme …', d:'S. 18 · article + pronoun', items:[
  f('„Wer bekommt das Steak?“ – „Ich bekomme ___.“','es','das Steak → es'),
  f('a) „Wer bekommt ___ Suppe?“ – „Ich bekomme ___.“',['die','sie'],'die Suppe → sie'),
  f('b) „Wer bekommt ___ Salat?“ – „Ich bekomme ___.“',['den','ihn'],'der Salat → den → ihn'),
  f('c) „Wer bekommt ___ Kotelett?“ – „Ich bekomme ___.“',['das','es'],'das Kotelett → es'),
  f('d) „Wer bekommt ___ Eis?“ – „Ich bekomme ___.“',['das','es'],'das Eis → es'),
  f('e) „Wer bekommt ___ Kaffee?“ – „Ich bekomme ___.“',['den','ihn'],'der Kaffee → den → ihn'),
  f('Isst du den Kuchen hier? – Ja, ich esse ___.','ihn'),f('Trinkst du die Milch hier? – Ja, ich trinke ___.','sie'),f('Liest du das Buch hier? – Ja, ich lese ___.','es'),f('Kaufst du die Erdbeeren hier? – Ja, ich kaufe ___.','sie')
 ]},
 {title:'Übung 2: Ich kenne Maria, aber sie kennt mich nicht.', d:'S. 19 · subject + object', items:[
  f('Ich kenne Maria, aber ___ kennt ___ nicht.',['sie','mich']),
  f('a) Du kennst den Professor, aber ___ kennt ___ nicht.',['er','dich']),
  f('b) Maria kennt den Lehrer, aber ___ kennt ___ nicht.',['er','sie']),
  f('c) Wir kennen Arnold Schwarzenegger, aber ___ kennt ___ nicht.',['er','uns']),
  f('d) Ihr kennt mich, aber ___ kenne ___ nicht.',['ich','euch']),
  f('e) Das Mädchen kennt Paul, aber ___ kennt ___ nicht.',['er','es'],'das Mädchen → es'),
  f('f) Herr Meier kennt Frau Schneider, aber ___ kennt ___ nicht.',['sie','ihn']),
  f('g) Frau Berg kennt dich, aber ___ kennst ___ nicht.',['du','sie']),
  o('Du kennst den Professor, aber er kennt dich nicht.','You know the professor, but he doesn\'t know you.')
 ]},
 {title:'Übung 3: Trinken Sie den Kaffee hier? – Nein, ich trinke ihn nicht.', d:'S. 19 · article + pronoun + nicht', items:[
  f('der Kaffee – Trinken Sie ___ Kaffee hier? – Nein, ich trinke ___ nicht.',['den','ihn']),
  f('a) der Salat – Essen Sie ___ Salat hier? – Nein, ich esse ___ nicht.',['den','ihn']),
  f('b) das Sandwich – Essen Sie ___ Sandwich hier? – Nein, ich esse ___ nicht.',['das','es']),
  f('c) die Milch – Trinken Sie ___ Milch hier? – Nein, ich trinke ___ nicht.',['die','sie']),
  f('d) das Bier – Trinken Sie ___ Bier hier? – Nein, ich trinke ___ nicht.',['das','es']),
  f('e) die Erdbeeren – Essen Sie ___ Erdbeeren hier? – Nein, ich esse ___ nicht.',['die','sie']),
  f('f) der Apfelsaft – Trinken Sie ___ Apfelsaft hier? – Nein, ich trinke ___ nicht.',['den','ihn']),
  f('g) die Zeitung – Lesen Sie ___ Zeitung hier? – Nein, ich lese ___ nicht.',['die','sie']),
  f('h) das Mineralwasser – Trinken Sie ___ Mineralwasser hier? – Nein, ich trinke ___ nicht.',['das','es']),
  f('i) die Suppe – Essen Sie ___ Suppe hier? – Nein, ich esse ___ nicht.',['die','sie']),
  f('j) der Tee – Trinken Sie ___ Tee hier? – Nein, ich trinke ___ nicht.',['den','ihn']),
  f('k) das Buch – Lesen Sie ___ Buch hier? – Nein, ich lese ___ nicht.',['das','es']),
  f('l) der Kuchen – Essen Sie ___ Kuchen hier? – Nein, ich esse ___ nicht.',['den','ihn'])
 ]},
 {title:'Übung 4: Mögen Sie Kaffee? – Nein, ich mag keinen Kaffee.', d:'S. 19 · kein- in the accusative', items:[
  f('Kaffee – Mögen Sie Kaffee? – Nein, ich mag ___ Kaffee.','keinen','der Kaffee → keinen'),
  f('a) Erdbeereis – Nein, ich mag ___ Erdbeereis.','kein','das Eis → kein'),f('b) Kakao – Nein, ich mag ___ Kakao.','keinen','der Kakao → keinen'),
  f('c) Tomatensuppe – Nein, ich mag ___ Tomatensuppe.','keine','die Suppe → keine'),f('d) Apfelsaft – Nein, ich mag ___ Apfelsaft.','keinen','der Saft → keinen'),
  f('e) Schokolade – Nein, ich mag ___ Schokolade.','keine'),f('f) Bier – Nein, ich mag ___ Bier.','kein'),f('g) Salami – Nein, ich mag ___ Salami.','keine'),f('h) Pommes – Nein, ich mag ___ Pommes.','keine','plural → keine'),
  m('Ich mag ___ Kakao.',['keinen','kein','keine'],'der Kakao → keinen')
 ]}
],
drills:['akkpron','akk','neg']
});
})();

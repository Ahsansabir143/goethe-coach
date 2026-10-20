/* Nominativ – Akkusativ – Dativ: who does what? (summary of the three cases, with 4.3 + 6.1) */
(function(){
const f = (q, a, x) => ({t:'fill', q, a:Array.isArray(a)?a:[a], x});
const o = (a, en, x) => ({t:'order', a, en, x});
const m = (q, opts, x) => ({t:'mcq', q, o:opts, a:0, x});
LESSONS.push({
id:'L20', date:'2026-10-20',
title:'Nominativ, Akkusativ, Dativ: who does what?',
topics:['doer · thing · person at the other end','Wer? · Wen? / Was? · Wem?','what changes in each case','how to know a noun is der, die or das'],
summary:'The three cases in one picture: the doer (Nominativ), the thing the action is done to (Akkusativ) and the person it is for / to (Dativ) — how to find each one and what changes.',
learn:[
{h:'1. One picture for all three cases 🎁', html: EX('Ich gebe meiner Mutter ein Geschenk.','I give my mother a present.')+
 TBL(['Case','Question','In the sentence','Simple word'],[['Nominativ','Wer? (who?)','Ich','~the doer — who does it'],['Akkusativ','Wen? / Was? (whom / what?)','ein Geschenk','~the thing the action is done to directly'],['Dativ','Wem? (to / for whom?)','meiner Mutter','~the person at the other end — who gets something']])+
 EX('Der Mann gibt dem Kind einen Apfel.','The man gives the child an apple. (Wer? der Mann · Was? einen Apfel · Wem? dem Kind)')+
 TIP('Easy test: if you can say „<b>to</b> someone“ or „<b>for</b> someone“ in English, it is usually the <b>dative</b>: I help (to) the man → dem Mann.')},
{h:'2. Find the case in 3 steps', html:`<ol><li>Find the <b>verb</b> (position 2).</li><li>Ask <b>Wer?</b> — who does it? → <b>Nominativ</b>. It matches the verb ending: ich <b>habe</b>, wir <b>kaufen</b>, er <b>fragt</b>.</li><li>Ask <b>Wen? / Was?</b> → <b>Akkusativ</b> · ask <b>Wem?</b> → <b>Dativ</b>.</li></ol>`+
 TBL(['Sentence','Nominativ (doer)','Akkusativ (thing / whom)'],[['Der Lehrer fragt die Studentin.','der Lehrer','die Studentin'],['Die Studentin fragt den Lehrer.','die Studentin','<b>den</b> Lehrer'],['Ich habe einen Bruder.','ich','<b>einen</b> Bruder'],['Kennst du Peter? – Ja, ich kenne ihn.','ich','<b>ihn</b>']])+
 TIP('<b>der Lehrer</b> asks · <b>den Lehrer</b> is asked. The article tells you who does what, not the word order.')},
{h:'3. What changes?', html: TBL(['','masculine','feminine','neuter','plural'],[['~Nominativ','der / ein / kein / mein','die / eine / keine / meine','das / ein / kein / mein','die / – / keine / meine'],['~Akkusativ','<b>den / einen / keinen / meinen</b>','die / eine / keine / meine','das / ein / kein / mein','die / – / keine / meine'],['~Dativ','<b>dem / einem / keinem / meinem</b>','<b>der / einer / keiner / meiner</b>','<b>dem / einem / keinem / meinem</b>','<b>den / – / keinen / meinen</b> + -n']])+
 TBL(['Nominativ','ich','du','er','sie','es','wir','ihr','sie, Sie'],[['~Akkusativ','<b>mich</b>','<b>dich</b>','<b>ihn</b>','sie','es','<b>uns</b>','<b>euch</b>','sie, Sie'],['~Dativ','<b>mir</b>','<b>dir</b>','<b>ihm</b>','<b>ihr</b>','<b>ihm</b>','<b>uns</b>','<b>euch</b>','<b>ihnen, Ihnen</b>']])+
 TIP('Nominativ: change <b>nothing</b>. Akkusativ: change <b>only masculine</b> (+ the pronouns mich, dich, ihn, uns, euch). Dativ: <b>everything</b> changes: dem – der – dem – den + -n.')},
{h:'4. sein has no accusative', html: EX('Das ist ein Hund.','That is a dog. (not „einen Hund“)')+EX('Das ist ein Computer.','That is a computer.')+TIP('After <b>sein</b> nothing receives the action — both sides are Nominativ.')},
{h:'5. Is the noun der, die or das? (Genusregeln)', html:`<p>The gender belongs to the <b>noun</b>, not to the sentence. Three ways to know it:</p><ol><li>Look at the article in the sentence: <b>das</b> → neuter; <b>es</b> → neuter.</li><li>Look at the ending (rules below).</li><li>Learn every noun with its article: not „Buch“ but <b>das Buch</b>.</li></ol>`+
 TBL(['Rule','Gender','Examples'],[['-chen, -lein','das','das Mädchen, das Brötchen'],['-um, -ment, -ma, -o','das','das Museum, das Medikament, das Thema, das Auto, das Kino'],['verb as a noun','das','das Essen, das Schwimmen'],['young people / animals','das','das Kind, das Baby'],['-ung, -heit, -keit, -ion, -in','die','die Zeitung, die Freiheit, die Information, die Lehrerin'],['most nouns in -e','die','die Suppe, die Tasche, die Schokolade'],['days, months, seasons','der','der Montag, der Mai, der Winter'],['plural','die','die Erdbeeren, die Pommes']])+
 TIP('Compound nouns: the <b>last word</b> decides — Erdbeer + <b>das</b> Eis → <b>das</b> Erdbeereis · Apfel + <b>der</b> Saft → <b>der</b> Apfelsaft · Tomaten + <b>die</b> Suppe → <b>die</b> Tomatensuppe.')},
{h:'6. The nouns of the 4.3 exercises with their articles', html: TBL(['der → den → ihn · keinen','die → die → sie · keine','das → das → es · kein'],[['der Salat, der Apfelsaft, der Tee, der Kuchen, der Kaffee, der Kakao','die Milch, die Zeitung, die Suppe, die Tomatensuppe, die Schokolade, die Salami, die Erdbeeren (pl), die Pommes (pl)','das Sandwich, das Bier, das Mineralwasser, das Buch, das Erdbeereis']])+
 EX('Trinken Sie den Tee hier? – Nein, ich trinke ihn nicht.','Are you drinking the tea here? – No, I am not drinking it.')+EX('Mögen Sie Bier? – Nein, ich mag kein Bier.','Do you like beer? – No, I don\'t like beer.')}
],
vocab:[{de:'Nominativ', g:'m', en:'nominative (case of the subject — Wer?)'},{de:'Akkusativ', g:'m', en:'accusative (case of the direct object — Wen? Was?)'},{de:'Dativ', g:'m', en:'dative (case of the person to / for whom — Wem?)'},{de:'Geschenk', g:'n', pl:'Geschenke', en:'present, gift'}],
sets:[
 {title:'Nominativ, Akkusativ or Dativ?', d:'Which case is the word in bold?', items:[
  m('<b>Der Mann</b> sieht den Hund.',['Nominativ','Akkusativ','Dativ'],'Wer sieht? → der Mann (doer)'),m('Der Mann sieht <b>den Hund</b>.',['Akkusativ','Nominativ','Dativ'],'Wen sieht er? → den Hund'),
  m('Ich helfe <b>dem Kind</b>.',['Dativ','Akkusativ','Nominativ'],'helfen + Dativ · Wem helfe ich?'),m('<b>Die Studentin</b> fragt den Lehrer.',['Nominativ','Akkusativ','Dativ'],'Wer fragt? → die Studentin'),
  m('Ich gebe meiner Mutter <b>ein Geschenk</b>.',['Akkusativ','Dativ','Nominativ'],'Was gebe ich? → ein Geschenk'),m('Ich gebe <b>meiner Mutter</b> ein Geschenk.',['Dativ','Akkusativ','Nominativ'],'Wem gebe ich das Geschenk?'),
  m('Das ist <b>ein Computer</b>.',['Nominativ','Akkusativ','Dativ'],'sein → no accusative'),m('Ich kenne <b>ihn</b>.',['Akkusativ','Dativ','Nominativ'],'kennen + Akkusativ → ihn'),
  m('Ich danke <b>dir</b>.',['Dativ','Akkusativ','Nominativ'],'danken + Dativ → dir'),m('Das Buch gehört <b>dem Lehrer</b>.',['Dativ','Akkusativ','Nominativ'],'gehören + Dativ'),
  m('<b>Wir</b> kaufen den Tisch.',['Nominativ','Akkusativ','Dativ'],'Wer kauft? → wir')
 ]},
 {title:'der, den or dem?', d:'doer, thing or person at the other end', items:[
  f('___ Lehrer fragt die Studentin. (der)','Der','doer → Nominativ'),f('Die Studentin fragt ___ Lehrer. (der)','den','Wen fragt sie? → Akkusativ'),f('Die Studentin hilft ___ Lehrer. (der)','dem','helfen → Dativ'),
  f('___ Hund sieht die Katze. (der)','Der'),f('Die Katze sieht ___ Hund. (der)','den'),f('Das Kind fragt ___ Mann. (der)','den'),f('Das Kind antwortet ___ Mann. (der)','dem'),
  f('Ich habe ___ Bruder. (ein)','einen'),f('Ich trinke ___ Limonade. (eine)','eine'),f('Das ist ___ Computer. (ein)','ein','sein → Nominativ'),f('Ich brauche ___ Wecker. (ein)','einen'),f('Das ist ___ Lehrer. (mein)','mein'),
  f('Kennst du Peter? – Ja, ich kenne ___.','ihn'),f('Hilfst du Peter? – Ja, ich helfe ___.','ihm')
 ]},
 {title:'der, die or das? (Genusregeln)', d:'endings and compound nouns', items:[
  m('___ Brötchen',['das','der','die'],'-chen → das'),m('___ Museum',['das','der','die'],'-um → das'),m('___ Hotel',['das','der','die'],'hotels, cafés, cinemas → das'),
  m('___ Essen (food)',['das','der','die'],'verb as a noun → das'),m('___ Zeitung',['die','der','das'],'-ung → die'),m('___ Erdbeereis',['das','die','der'],'last word: das Eis'),
  m('___ Apfelsaft',['der','das','die'],'last word: der Saft'),m('___ Tomatensuppe',['die','der','das'],'last word: die Suppe'),m('___ Mädchen',['das','die','der'],'-chen → das (even for a girl)'),
  m('___ Montag',['der','die','das'],'days → der'),m('___ Medikament',['das','der','die'],'-ment → das'),m('___ Information',['die','das','der'],'-ion → die')
 ]}
],
drills:['p6-case','akk','p6-art']
});
})();

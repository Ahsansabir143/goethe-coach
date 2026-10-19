/* 6.1 Nomen und Artikel – Dativ (Aber Hallo! A1, S. 22) */
(function(){
const f = (q, a, x) => ({t:'fill', q, a:Array.isArray(a)?a:[a], x});
const o = (a, en, x) => ({t:'order', a, en, x});
const m = (q, opts, x) => ({t:'mcq', q, o:opts, a:0, x});
LESSONS.push({
id:'L18', date:'2026-10-19',
title:'The dative: nouns & articles (6.1)',
topics:['dem · der · dem · den (-n)','einem · einer · einem','helfen, danken, antworten … + Dativ','gehören, schmecken, gefallen, passen'],
summary:'The dative is the „to whom?“ case — the person who receives something or to whom something happens. dem / der / dem / den + -n.',
learn:[
{h:'1. What is the dative?', html:`<p>The <b>dative</b> (Dativ) is the third case. It answers the question <b>Wem?</b> (to whom? / for whom?). The dative object is usually a <b>person</b> who receives or is affected by the action.</p>`+
 EX('Ich danke dem Großvater.','I thank (my) grandfather. — Wem danke ich? → dem Großvater')+EX('Das Buch gehört dem Lehrer.','The book belongs to the teacher. — Wem gehört das Buch? → dem Lehrer')+
 TIP('Nominativ = <b>Wer?</b> (subject) · Akkusativ = <b>Wen? / Was?</b> (direct object) · Dativ = <b>Wem?</b> (to whom).')},
{h:'2. The definite article in the dative', html: TBL(['Subjekt','Prädikat','Objekt (Dativ)','~gender','article'],[['Ich','danke','<b>dem</b> Großvater.','~masculine','<b>dem</b>'],['Du','antwortest','<b>der</b> Reporterin.','~feminine','<b>der</b>'],['Er','hilft','<b>dem</b> Mädchen.','~neuter','<b>dem</b>'],['Wir','helfen','<b>den</b> Leute<b>n</b>.','~plural','<b>den</b> + -n']])+
 TIP('Memory trick: <b>dem – der – dem – den</b> + the plural noun gets an extra <b>-n</b> (den Leuten, den Kindern) — unless it already ends in -n or -s (den Frauen, den Autos).')},
{h:'3. The indefinite article in the dative', html: TBL(['Subjekt','Prädikat','Objekt (Dativ)','~gender','article'],[['Ich','danke','<b>einem</b> Freund.','~masculine','<b>einem</b>'],['Du','antwortest','<b>einer</b> Journalistin.','~feminine','<b>einer</b>'],['Er','gratuliert','<b>einem</b> Mädchen.','~neuter','<b>einem</b>'],['Wir','helfen','Leute<b>n</b>.','~plural','— + -n']])+
 TIP('kein and the possessives work the same way: <b>keinem, keiner, keinem, keinen</b> · <b>meinem, meiner, meinem, meinen</b>.')},
{h:'4. Verbs with a dative object (person)', html:`<p>These verbs always take the <b>dative</b> — learn them as a list:</p>`+
 TBL(['Verb','English','Example'],[['helfen','~to help','Du hilfst dem Onkel.'],['danken','~to thank','Er dankt der Tante.'],['antworten','~to answer','Paul antwortet dem Professor.'],['glauben','~to believe','Ich glaube der Reporterin.'],['gratulieren','~to congratulate','Du gratulierst dem Onkel.'],['vertrauen','~to trust','Er vertraut dem Großvater.'],['verzeihen','~to forgive','Ich verzeihe dem Freund.'],['zuhören','~to listen to','Der Student hört der Professorin zu.']])},
{h:'5. Verbs with a thing as subject and a person in the dative', html: TBL(['Verb','English','Example'],[['gehören','~to belong to','Das Haus gehört dem Onkel.'],['schmecken','~to taste (good) to','Das Eis schmeckt den Kindern.'],['gefallen','~to please, to like','Die Musik gefällt der Studentin.'],['passen','~to fit, to suit','Die Jacke passt dem Mädchen.']])+
 TIP('With gefallen / schmecken the English is often turned round: <i>Die Musik gefällt der Studentin</i> = The student likes the music.')},
{h:'6. Word order: dative first or second', html: TBL(['Position I','Position II','Position III'],[['Das Essen','schmeckt','den Leuten.'],['Den Leuten','schmeckt','das Essen.']])+
 EX('Das Haus gehört dem Onkel. / Dem Onkel gehört das Haus.','The house belongs to the uncle. (both orders are correct — the verb stays in position 2)')}
],
vocab:[
 {de:'helfen', en:'to help (+ Dativ)'},{de:'danken', en:'to thank (+ Dativ)'},{de:'antworten', en:'to answer (+ Dativ)'},{de:'glauben', en:'to believe (+ Dativ)'},{de:'gratulieren', en:'to congratulate (+ Dativ)'},
 {de:'vertrauen', en:'to trust (+ Dativ)'},{de:'verzeihen', en:'to forgive (+ Dativ)'},{de:'zuhören', en:'to listen to (+ Dativ)'},{de:'gehören', en:'to belong to (+ Dativ)'},{de:'schmecken', en:'to taste (good) (+ Dativ)'},
 {de:'gefallen', en:'to please / to like (+ Dativ)'},{de:'passen', en:'to fit / to suit (+ Dativ)'},
 {de:'Großvater', g:'m', pl:'Großväter', en:'grandfather'},{de:'Reporterin', g:'f', pl:'Reporterinnen', en:'reporter (female)'},{de:'Journalistin', g:'f', pl:'Journalistinnen', en:'journalist (female)'},
 {de:'Leute', g:'pl', en:'people'},{de:'Professorin', g:'f', pl:'Professorinnen', en:'professor (female)'},{de:'Onkel', g:'m', pl:'Onkel', en:'uncle'},{de:'Tante', g:'f', pl:'Tanten', en:'aunt'},
 {de:'Gast', g:'m', pl:'Gäste', en:'guest'},{de:'Chef', g:'m', pl:'Chefs', en:'boss'},{de:'Nachbarin', g:'f', pl:'Nachbarinnen', en:'neighbour (female)'},{de:'Tourist', g:'m', pl:'Touristen', en:'tourist'},{de:'Wagen', g:'m', pl:'Wagen', en:'car'}
],
sets:[
 {title:'Übung 1: helfen – Du hilfst dem Onkel.', d:'S. 22 · verb + dative object (person)', items:[
  f('helfen: Du ___ ___ Onkel.',['hilfst','dem'],'helfen (e → i): du hilfst · der Onkel → dem'),
  f('a) antworten: Paul ___ ___ Professor.',['antwortet','dem'],'der Professor → dem'),
  f('b) danken: Er ___ ___ Tante.',['dankt','der'],'die Tante → der'),
  f('c) glauben: Ich ___ ___ Reporterin.',['glaube','der'],'die Reporterin → der'),
  f('d) gratulieren: Du ___ ___ Onkel.',['gratulierst','dem']),
  f('e) vertrauen: Er ___ ___ Großvater.',['vertraut','dem']),
  f('f) verzeihen: Ich ___ ___ Freund.',['verzeihe','dem']),
  f('g) zuhören: Der Student ___ ___ Professorin ___.',['hört','der','zu'],'separable: hört … zu · die Professorin → der'),
  o('Der Student hört der Professorin zu.','The student listens to the professor.')
 ]},
 {title:'Übung 2: gehören – Das Haus gehört dem Onkel.', d:'S. 22 · thing as subject, person in the dative', items:[
  f('gehören: Das Haus ___ ___ Onkel.',['gehört','dem']),
  f('a) schmecken: Das Eis ___ ___ Kindern.',['schmeckt','den'],'plural → den + -n: den Kindern'),
  f('b) gehören: Das Buch ___ ___ Lehrer.',['gehört','dem']),
  f('c) gefallen: Die Musik ___ ___ Studentin.',['gefällt','der'],'gefallen (a → ä): gefällt · die Studentin → der'),
  f('d) passen: Die Jacke ___ ___ Mädchen.',['passt','dem'],'das Mädchen → dem')
 ]},
 {title:'Übung 3: Sätze mit gehören – schmecken – gefallen', d:'S. 22 · both word orders', items:[
  f('a) Pizza – Kinder (schmecken): Die Pizza ___ ___ Kindern.',['schmeckt','den']),
  f('b) Jacke – Großvater (gehören): Die Jacke ___ ___ Großvater.',['gehört','dem']),
  f('c) Film – Studentin (gefallen): Der Film ___ ___ Studentin.',['gefällt','der']),
  f('d) Wein – Gäste (schmecken): Der Wein ___ ___ Gästen.',['schmeckt','den'],'die Gäste → den Gästen (+ n)'),
  f('e) Wagen – Chef (gehören): Der Wagen ___ ___ Chef.',['gehört','dem']),
  f('f) Hund – Nachbarin (gehören): Der Hund ___ ___ Nachbarin.',['gehört','der']),
  f('g) Bücher – Studenten (gehören): Die Bücher ___ ___ Studenten.',['gehören','den'],'plural subject → gehören'),
  f('h) Erdbeeren – Mädchen (schmecken): Die Erdbeeren ___ ___ Mädchen.',['schmecken','dem']),
  f('i) Bilder – Touristen (gefallen): Die Bilder ___ ___ Touristen.',['gefallen','den']),
  o('Dem Onkel gehört das Haus.','Haus – Onkel (dative first)'),o('Den Kindern schmeckt die Pizza.','Pizza – Kinder (dative first)'),o('Der Studentin gefällt der Film.','Film – Studentin (dative first)'),o('Dem Chef gehört der Wagen.','Wagen – Chef (dative first)')
 ]},
 {title:'Dative articles: dem, der, dem, den · einem, einer', d:'definite and indefinite', items:[
  m('Ich danke ___ Freund. (der Freund)',['dem','den','der'],'masculine → dem'),m('Du antwortest ___ Journalistin. (eine)',['einer','einem','eine'],'feminine → einer'),m('Er gratuliert ___ Mädchen. (ein)',['einem','einer','ein'],'neuter → einem'),
  m('Wir helfen ___ Leuten.',['den','dem','der'],'plural → den + -n'),f('Ich helfe ___ Kind. (das Kind)','dem'),f('Sie dankt ___ Lehrerin. (die Lehrerin)','der'),f('Wir antworten ___ Gästen. (die Gäste)','den'),f('Das Auto gehört ___ Freundin. (eine Freundin)','einer'),f('Ich vertraue ___ Bruder. (mein Bruder)','meinem')
 ]}
],
drills:['p6-art','p6-verb','p6-gehoert']
});
})();

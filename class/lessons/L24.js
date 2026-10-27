/* Spektrum A1 Lektion 6 · Aber Hallo! 8.1: das Perfekt — how to talk about the past */
(function(){
const f = (q, a, x) => ({t:'fill', q, a:Array.isArray(a)?a:[a], x});
const o = (a, en, x) => ({t:'order', a, en, x});
const m = (q, opts, x) => ({t:'mcq', q, o:opts, a:0, x});
LESSONS.push({
id:'L24', date:'2026-10-27',
title:'The past tense: das Perfekt (haben / sein + Partizip II)',
topics:['Present → past: Ich koche → Ich habe gekocht','S + haben/sein + … + ge-Verb-t','ge-…-t · ge-…-en · -ieren · be-/ver- · zu-ge-macht','haben or sein? movement & change → sein'],
summary:'How to talk about yesterday: the Perfekt = haben or sein (position 2) + Partizip II (at the end). How to build the Partizip, when to use sein, and how to turn a present sentence into a past sentence.',
learn:[
{h:'1. What is the Perfekt? Present vs past', html:`<p>German speakers use the <b>Perfekt</b> to talk about the past in everyday speech: what you did yesterday, last week, last year.</p>`+
 TBL(['Present (Präsens)','Past (Perfekt)'],[['Ich <b>koche</b> jeden Tag.','Ich <b>habe</b> gestern Spaghetti <b>gekocht</b>.'],['Ich <b>lerne</b> jeden Tag Deutsch.','Ich <b>habe</b> gestern Deutsch <b>gelernt</b>.'],['Ich <b>fahre</b> nach Berlin.','Ich <b>bin</b> gestern nach Berlin <b>gefahren</b>.'],['Er <b>studiert</b> Medizin.','Er <b>hat</b> Medizin <b>studiert</b>.'],['Ich <b>mache</b> die Tür <b>zu</b>.','Ich <b>habe</b> die Tür <b>zugemacht</b>.']])+
 EX('Ich koche jeden Tag. – Ich habe gestern Spaghetti gekocht.','I cook every day. – I cooked spaghetti yesterday.')+
 TIP('English has „I cooked“ (one word). German needs <b>two parts</b>: <b>haben / sein</b> + <b>Partizip II</b> (gekocht). Past time words: <b>gestern</b> (yesterday), <b>vorgestern</b> (the day before yesterday), <b>letzte Woche</b>, <b>letztes Jahr</b>, <b>vor drei Tagen</b> (three days ago).')},
{h:'2. The formula (sentence structure)', html:`<p style="font-size:1.15em;text-align:center"><b>S + <span style="color:#c2410c">haben / sein</span> + … + <span style="color:#c2410c">ge</span>Verb<span style="color:#c2410c">t</span></b></p>`+
 TBL(['Position 1','Position 2: haben / sein','middle (time, object, place)','END: Partizip II'],[['Ich','habe','gestern Spaghetti','gekocht.'],['Ich','bin','gestern nach Berlin','gefahren.'],['Gestern','hat','er Medizin','studiert.'],['Was','hast','du gestern','gemacht?'],['—','Hast','du gut','geschlafen?'],['Ich','habe','die Tür','zugemacht.']])+
 TIP('This is the <b>sentence bracket</b> (Satzklammer): haben / sein in position 2, the Partizip at the very END. Everything else goes in the middle. haben / sein are conjugated normally: ich habe, du hast, er hat … · ich bin, du bist, er ist …')},
{h:'3. Questions and negation in the Perfekt', html: TBL(['Type','Rule','Example','English'],[
 ['Statement','~haben / sein in position 2','Ich <b>bin</b> gestern in die Stadt <b>gegangen</b>.','~I went to the city yesterday.'],
 ['Yes / no question','~haben / sein in position 1','<b>Bist</b> du gestern in die Stadt <b>gegangen</b>?','~Did you go to the city yesterday?'],
 ['W-question','~W-word + haben / sein','Wann <b>bist</b> du heute <b>aufgestanden</b>?','~When did you get up today?'],
 ['Negation','~nicht before the Partizip (or before the place)','Ich bin gestern <b>nicht</b> in die Stadt gegangen.','~I didn\'t go to the city yesterday.'],
 ['kein + noun','~kein instead of ein','Ich habe <b>keinen</b> Kaffee getrunken.','~I didn\'t drink any coffee.']])},
{h:'4. How to build the Partizip II', html: TBL(['Verb type','Rule','Examples'],[
 ['Regular (weak)','~<b>ge</b> + stem + <b>t</b>','kochen → <b>ge</b>koch<b>t</b> · machen → gemacht · kaufen → gekauft · spielen → gespielt · lernen → gelernt · putzen → geputzt'],
 ['Stem ends in -t / -d','~<b>ge</b> + stem + <b>et</b>','arbeiten → ge<b>arbeitet</b> · warten → gewartet · heiraten → geheiratet · kosten → gekostet'],
 ['Irregular (strong)','~<b>ge</b> + stem + <b>en</b> (vowel often changes)','schreiben → geschrieben · trinken → getrunken · finden → gefunden · gehen → gegangen · lesen → gelesen · schlafen → geschlafen'],
 ['Mixed','~<b>ge</b> + changed stem + <b>t</b>','bringen → gebracht · denken → gedacht · wissen → gewusst · kennen → gekannt · rennen → gerannt'],
 ['-ieren verbs','~<b>NO ge-</b>, just -t','studieren → <b>studiert</b> · telefonieren → telefoniert · gratulieren → gratuliert · präsentieren · korrigieren'],
 ['Inseparable (be-, ent-, emp-, er-, ge-, miss-, ver-, zer-)','~<b>NO ge-</b>','bezahlen → <b>bezahlt</b> · bestellen → bestellt · besuchen → besucht · erzählen → erzählt · bekommen → bekommen · vergessen → vergessen · verstehen → verstanden'],
 ['Separable (ab-, an-, auf-, aus-, ein-, mit-, zu- …)','~prefix + <b>ge</b> + verb','zumachen → zu<b>ge</b>macht · aufstehen → auf<b>ge</b>standen · einkaufen → ein<b>ge</b>kauft · anrufen → an<b>ge</b>rufen · aufräumen → aufgeräumt']])+
 TIP('Teacher\'s rule: „<b>S haben-sein gestern geVerbt</b>“. We do <b>not</b> add ge- to -ieren verbs and to inseparable verbs (be-, ent-, emp-, zer-, ver-, ge-, miss- …): Ich habe gestern 150 Euro <b>bezahlt</b>. Separable verbs put ge <b>between</b>: Sie hat die Tür zu<b>ge</b>macht.')},
{h:'5. haben or sein?', html:`<p>Most verbs use <b>haben</b>. Use <b>sein</b> for:</p>`+
 TBL(['Group','Verbs (with sein)'],[
 ['① Movement from A to B (Bewegung)','gehen (ist gegangen) · fahren (ist gefahren) · fliegen (ist geflogen) · kommen (ist gekommen) · laufen (ist gelaufen) · reisen (ist gereist) · steigen (ist gestiegen) · fallen (ist gefallen) · springen (ist gesprungen) · rennen (ist gerannt) · schwimmen (ist geschwommen) · wandern (ist gewandert) · aufstehen (ist aufgestanden)'],
 ['② Change of state (Zustandsänderung)','aufwachen (ist aufgewacht) · einschlafen (ist eingeschlafen) · wachsen (ist gewachsen) · sterben (ist gestorben) · werden (ist geworden) · schmelzen (ist geschmolzen) · gefrieren (ist gefroren)'],
 ['③ Others (Sonstige)','sein (ist gewesen) · bleiben (ist geblieben) · passieren (ist passiert) · geschehen (ist geschehen) · gelingen (ist gelungen)']])+
 TIP('Memory trick: <b>von A nach B → sein</b>. If you move from one place to another, or you change (wake up, fall asleep, become), use <b>sein</b>. Everything with an Akkusativ object uses <b>haben</b>: Ich <b>habe</b> einen Kaffee getrunken.')},
{h:'6. Step by step: present sentence → past sentence', html:`<ol><li>Find the verb: Ich <b>kaufe</b> einen Schlüssel.</li><li>haben or sein? kaufen = no movement → <b>haben</b>.</li><li>Conjugate haben for the subject and put it in <b>position 2</b>: Ich <b>habe</b> …</li><li>Make the Partizip: kaufen → <b>gekauft</b>.</li><li>Put the Partizip at the <b>END</b>; add a past time word: Ich habe <b>gestern</b> einen Schlüssel <b>gekauft</b>.</li></ol>`+
 TBL(['Präsens','Perfekt'],[['Maria trifft ihre Freundinnen.','Maria hat ihre Freundinnen getroffen.'],['Mein Vater arbeitet als Ingenieur.','Mein Vater hat als Ingenieur gearbeitet.'],['Peter und Lisa laufen gern im Park.','Peter und Lisa sind gern im Park gelaufen.'],['Du gehst am Freitagabend ins Kino.','Du bist am Freitagabend ins Kino gegangen.'],['Ich mache meine Hausaufgaben.','Ich habe gestern meine Hausaufgaben gemacht.']])+
 TIP('Only <b>haben / sein</b> changes with the person (ich habe, du hast, er hat). The Partizip <b>never</b> changes: ich habe gekocht, du hast gekocht, wir haben gekocht.')},
{h:'7. Common mistakes', html:`<ul><li><s>Ich habe gekocht Spaghetti.</s> → Ich habe Spaghetti <b>gekocht</b>. (Partizip at the END)</li><li><s>Ich habe nach Berlin gefahren.</s> → Ich <b>bin</b> nach Berlin gefahren. (movement → sein)</li><li><s>Er hat Medizin gestudiert.</s> → Er hat Medizin <b>studiert</b>. (-ieren: no ge-)</li><li><s>Ich habe 150 Euro gebezahlt.</s> → Ich habe 150 Euro <b>bezahlt</b>. (be-: no ge-)</li><li><s>Ich habe die Tür gezumacht.</s> → Ich habe die Tür zu<b>ge</b>macht. (separable: ge in the middle)</li><li><s>Ich habe gearbeiten.</s> → Ich habe <b>gearbeitet</b>. (regular verbs end in -t)</li></ul>`}
],
vocab:[{de:'gestern', en:'yesterday'},{de:'vorgestern', en:'the day before yesterday'},{de:'Partizip', g:'n', pl:'Partizipien', en:'participle'},{de:'Hausaufgabe', g:'f', pl:'Hausaufgaben', en:'homework'},{de:'Rechnung', g:'f', pl:'Rechnungen', en:'bill'},{de:'Fehler', g:'m', pl:'Fehler', en:'mistake'},
 {de:'Fabrik', g:'f', pl:'Fabriken', en:'factory'},{de:'Prüfung', g:'f', pl:'Prüfungen', en:'exam'},{de:'Nachricht', g:'f', pl:'Nachrichten', en:'message'},{de:'Großeltern', g:'pl', en:'grandparents'},{de:'Geschichte', g:'f', pl:'Geschichten', en:'story'},{de:'Goldmedaille', g:'f', pl:'Goldmedaillen', en:'gold medal'},
 {de:'Regenschirm', g:'m', pl:'Regenschirme', en:'umbrella'},{de:'Friseurin', g:'f', pl:'Friseurinnen', en:'hairdresser (female)'},{de:'Haar', g:'n', pl:'Haare', en:'hair'},{de:'Zigarette', g:'f', pl:'Zigaretten', en:'cigarette'},{de:'Cousine', g:'f', pl:'Cousinen', en:'cousin (female)'},{de:'Cousin', g:'m', pl:'Cousins', en:'cousin (male)'},
 {de:'Boxer', g:'m', pl:'Boxer', en:'boxer'},{de:'Gegner', g:'m', pl:'Gegner', en:'opponent'},{de:'Wäsche', g:'f', en:'laundry'},{de:'Haushalt', g:'m', pl:'Haushalte', en:'household'},{de:'schneiden', en:'to cut'},{de:'schlagen', en:'to hit, to beat'},{de:'putzen', en:'to clean'},{de:'heiraten', en:'to marry'}],
sets:[
 {title:'haben or sein?', d:'movement / change → sein · everything else → haben', items:[
  m('Ich ___ gestern Spaghetti gekocht.',['habe','bin'],'kochen: no movement → haben'),m('Ich ___ gestern nach Berlin gefahren.',['bin','habe'],'fahren: from A to B → sein'),m('Er ___ Medizin studiert.',['hat','ist'],'haben'),
  m('Wir ___ nach Paris geflogen.',['sind','haben'],'fliegen → sein'),m('Ich ___ einen Kaffee getrunken.',['habe','bin'],'Akkusativ object → haben'),m('Das Kind ___ schnell eingeschlafen.',['ist','hat'],'change of state → sein'),
  m('Wir ___ zu Hause geblieben.',['sind','haben'],'bleiben → sein'),m('Ein Unfall ___ passiert.',['ist','hat'],'passieren → sein'),m('Sie ___ das Fenster geschlossen.',['hat','ist'],'haben'),
  m('Wann ___ du heute aufgestanden?',['bist','hast'],'aufstehen → sein'),m('Er ___ Arzt geworden.',['ist','hat'],'werden → sein'),m('Ich ___ gut geschlafen.',['habe','bin'],'schlafen: no movement → haben'),
  m('___ du gestern zu Hause gewesen?',['Bist','Hast'],'sein → ist gewesen'),m('Wir ___ in den Bergen gewandert.',['sind','haben'],'wandern → sein'),m('Ich ___ 150 Euro bezahlt.',['habe','bin'],'haben')
 ]},
 {title:'Präsens und Perfekt II: conjugate in the present and in the Perfekt', d:'worksheet · first the present, then the past', items:[
  f('(treffen) Maria ___ ihre Freundinnen. → Maria ___ ihre Freundinnen ___.',['trifft','hat','getroffen']),
  f('(arbeiten) Mein Vater ___ als Ingenieur. → Mein Vater ___ als Ingenieur ___.',['arbeitet','hat','gearbeitet']),
  f('(kosten) Was ___ die Jacke? → Was ___ die Jacke ___?',['kostet','hat','gekostet']),
  f('(spielen) Ich ___ am Wochenende Fußball. → Ich ___ am Wochenende Fußball ___.',['spiele','habe','gespielt']),
  f('(tanzen) Meine Eltern ___ gerne. → Meine Eltern ___ gerne ___.',['tanzen','haben','getanzt']),
  f('(schlafen) Sabrina ___ lange am Samstag. → Sabrina ___ lange am Samstag ___.',['schläft','hat','geschlafen']),
  f('(essen) Du ___ im Sommer am liebsten Eis. → Du ___ im Sommer am liebsten Eis ___.',['isst','hast','gegessen']),
  f('(laufen) Peter und Lisa ___ gern im Park. → Peter und Lisa ___ gern im Park ___.',['laufen','sind','gelaufen']),
  f('(waschen) Ich ___ meine Wäsche. → Ich ___ meine Wäsche ___.',['wasche','habe','gewaschen']),
  f('(helfen) Mein Sohn ___ nicht im Haushalt. → Mein Sohn ___ nicht im Haushalt ___.',['hilft','hat','geholfen']),
  f('(heißen) Er ___ Paul Schmidt. → Er ___ Paul Schmidt ___.',['heißt','hat','geheißen']),
  f('(gehen) Du ___ am Freitagabend ins Kino. → Du ___ am Freitagabend ins Kino ___.',['gehst','bist','gegangen']),
  f('(finden) Wir ___ Deutsch interessant. → Wir ___ Deutsch interessant ___.',['finden','haben','gefunden']),
  f('(fliegen) Ihr ___ nächste Woche nach Frankreich. → Ihr ___ nach Frankreich ___.',['fliegt','seid','geflogen']),
  f('(rennen) Mein Cousin ___ immer am Wochenende. → Mein Cousin ___ immer am Wochenende ___.',['rennt','ist','gerannt']),
  f('(brauchen) Ich ___ deine Hilfe. → Ich ___ deine Hilfe ___.',['brauche','habe','gebraucht']),
  f('(bringen) Du ___ einen Tee. → Du ___ einen Tee ___.',['bringst','hast','gebracht']),
  f('(schwimmen) Wir ___ nicht so gern. → Wir ___ nicht so gern ___.',['schwimmen','sind','geschwommen'])
 ]},
 {title:'Übung 21: Das Perfekt — haben / sein + Partizip II', d:'Ergänzen Sie die Verben im Perfekt.', items:[
  f('ARBEITEN: Letztes Jahr ___ ich in einer Fabrik ___.',['habe','gearbeitet']),f('LERNEN: Wir ___ gestern für die Prüfung ___.',['haben','gelernt']),f('SPIELEN: Die Kinder ___ im Garten ___.',['haben','gespielt']),
  f('SCHREIBEN: Ich ___ eine lange E-Mail ___.',['habe','geschrieben']),f('LESEN: Peter ___ das ganze Buch ___.',['hat','gelesen']),f('TRINKEN: Meine Mutter ___ eine Tasse Kaffee ___.',['hat','getrunken']),
  f('MACHEN: Wir ___ viele Fotos im Urlaub ___.',['haben','gemacht']),f('BEKOMMEN: Ich ___ ein schönes Geschenk ___.',['habe','bekommen'],'be-: no ge-'),f('SCHICKEN: Er ___ mir eine Nachricht ___.',['hat','geschickt']),
  f('BESUCHEN: Wir ___ unsere Großeltern ___.',['haben','besucht'],'be-: no ge-'),f('BEGINNEN: Der Unterricht ___ um 8 Uhr ___.',['hat','begonnen'],'be-: no ge-'),f('ERZÄHLEN: Meine Oma ___ eine lustige Geschichte ___.',['hat','erzählt'],'er-: no ge-'),
  f('WARTEN: Ich ___ eine Stunde auf dich ___.',['habe','gewartet'],'-t stem → -et'),f('GEWINNEN: Der Sportler ___ die Goldmedaille ___.',['hat','gewonnen'],'ge- is already part of the verb'),f('VERGESSEN: Er ___ seinen Regenschirm ___.',['hat','vergessen'],'ver-: no ge-'),
  f('SCHNEIDEN: Die Friseurin ___ meine Haare ___.',['hat','geschnitten']),f('RAUCHEN: Mein Onkel ___ viele Zigaretten ___.',['hat','geraucht']),f('KOCHEN: Wir ___ eine Suppe ___.',['haben','gekocht']),
  f('PUTZEN: Sie ___ das ganze Haus ___.',['hat','geputzt']),f('HEIRATEN: Meine Cousine ___ letztes Jahr ___.',['hat','geheiratet']),f('BESTELLEN: Ich ___ eine Pizza ___.',['habe','bestellt']),
  f('FINDEN: Er ___ seinen Schlüssel nicht ___.',['hat','gefunden']),f('SCHLAGEN: Der Boxer ___ seinen Gegner ___.',['hat','geschlagen']),f('SCHLIESSEN: Sie ___ das Fenster ___.',['hat','geschlossen'])
 ]},
 {title:'Make the Partizip II', d:'ge-…-t · ge-…-en · no ge · separable', items:[
  f('kochen → ___','gekocht'),f('arbeiten → ___','gearbeitet'),f('studieren → ___','studiert'),f('telefonieren → ___','telefoniert'),f('gratulieren → ___','gratuliert'),f('bezahlen → ___','bezahlt'),
  f('zumachen → ___','zugemacht'),f('aufstehen → ___','aufgestanden'),f('einkaufen → ___','eingekauft'),f('anrufen → ___','angerufen'),f('fahren → ___','gefahren'),f('gehen → ___','gegangen'),
  f('trinken → ___','getrunken'),f('schreiben → ___','geschrieben'),f('bringen → ___','gebracht'),f('wissen → ___','gewusst'),f('verstehen → ___','verstanden'),f('präsentieren → ___','präsentiert'),
  m('Which is correct?',['Er hat Medizin studiert.','Er hat Medizin gestudiert.'],'-ieren: no ge-'),m('Which is correct?',['Ich habe die Tür zugemacht.','Ich habe die Tür gezumacht.'],'separable: ge in the middle')
 ]},
 {title:'Teacher\'s sentences: present → past', d:'kaufen, suchen, kochen · studieren, präsentieren, korrigieren · bezahlen, bestellen, erklären', items:[
  f('(kaufen) Sie ___ gestern einen Schlüssel ___.',['hat','gekauft']),f('(suchen) Er ___ gestern den Schlüssel ___.',['hat','gesucht']),f('(kochen) Ihr ___ gestern eine Suppe ___.',['habt','gekocht']),f('(kochen) Du ___ gestern Suppe ___.',['hast','gekocht']),
  f('(studieren) Sie ___ vorgestern Medizin ___.',['hat','studiert']),f('(präsentieren) Ihr ___ vorgestern ein Projekt ___.',['habt','präsentiert']),f('(korrigieren) Du ___ vorgestern den Fehler ___.',['hast','korrigiert'],'der Fehler → den Fehler (Akkusativ)'),
  f('(bezahlen) Du ___ vor drei Tagen die Rechnung ___.',['hast','bezahlt']),f('(bestellen) Er ___ vor drei Tagen ein Steak ___.',['hat','bestellt']),f('(erklären) Ich ___ vor drei Tagen den Akkusativ ___.',['habe','erklärt']),f('(bezahlen) Ihr ___ gestern 150 Euro ___.',['habt','bezahlt']),
  f('(machen) Ich ___ gestern meine Hausaufgaben ___.',['habe','gemacht']),f('(zumachen) Sie ___ die Tür ___.',['hat','zugemacht']),
  o('Ich habe gestern Spaghetti gekocht.','I cooked spaghetti yesterday.'),o('Ich bin gestern nach Berlin gefahren.','I went to Berlin yesterday.'),o('Er hat Medizin studiert.','He studied medicine.'),o('Ich habe gestern 150 Euro bezahlt.','I paid 150 euros yesterday.')
 ]}
],
drills:['p8-aux','p8-part','p8-sent','p8-trans']
});
})();

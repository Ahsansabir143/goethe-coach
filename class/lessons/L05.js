LESSONS.push({
id:'L05', date:'2026-10-06',
title:'Das ist ein … / Das sind … · separable verbs (intro)',
topics:['Das ist / Das sind','ein / eine','Plural forms','Separable verbs: Er steht um 7 Uhr auf'],
summary:'Reading-and-translation text from the Klimenko book (Das ist ein Text … Das sind Uhren) and the first separable verbs.',
learn:[
{h:'1. Das ist … (one thing) / Das sind … (several things)', html:
 `<p><b>Das ist</b> + singular · <b>Das sind</b> + plural. In the plural there is <b>no</b> „ein“.</p>`+
 TBL(['Singular','Plural','Meaning'],[
  ['Das ist <span class="m">ein</span> Text.','Das sind Texte.','~text'],['Das ist <span class="m">ein</span> Satz.','Das sind Sätze.','~sentence'],['Das ist <span class="n">ein</span> Wort.','Das sind Wörter.','~word'],
  ['Das ist <span class="n">ein</span> Heft.','Das sind Hefte.','~exercise book'],['Das ist <span class="n">ein</span> Buch.','Das sind Bücher.','~book'],['Das ist <span class="n">ein</span> Wörterbuch.','Das sind Wörterbücher.','~dictionary'],
  ['Das ist <span class="m">ein</span> Bleistift.','Das sind Bleistifte.','~pencil'],['Das ist <span class="m">ein</span> Kugelschreiber.','Das sind Kugelschreiber.','~ballpoint pen'],['Das ist <span class="m">ein</span> Kalender.','Das sind Kalender.','~calendar'],
  ['Das ist <span class="f">eine</span> Zeitung.','Das sind Zeitungen.','~newspaper'],['Das ist <span class="f">eine</span> Uhr.','Das sind Uhren.','~clock / watch']
 ])+
 TBL(['Gender','Definite (the)','Indefinite (a)'],[['~masculine','<span class="m">der</span> Text','<span class="m">ein</span> Text'],['~feminine','<span class="f">die</span> Uhr','<span class="f">eine</span> Uhr'],['~neuter','<span class="n">das</span> Buch','<span class="n">ein</span> Buch'],['~plural','<span class="p">die</span> Bücher','~— (no article): Bücher']])},
{h:'2. How plurals are made', html:
 `<p>German has several plural patterns — always learn a noun with its plural:</p>`+
 TBL(['Pattern','Examples'],[['~-e','der Text → die Text<b>e</b> · das Heft → die Heft<b>e</b> · der Bleistift → die Bleistift<b>e</b>'],['~¨-e (umlaut + e)','der Satz → die S<b>ä</b>tz<b>e</b>'],['~¨-er','das Buch → die B<b>ü</b>ch<b>er</b> · das Wort → die W<b>ö</b>rt<b>er</b>'],['~-(e)n','die Zeitung → die Zeitung<b>en</b> · die Uhr → die Uhr<b>en</b>'],['~no change','der Kugelschreiber → die Kugelschreiber · der Kalender → die Kalender'],['~-s','das Auto → die Auto<b>s</b>']])+
 TIP('Nouns ending in -er, -el, -en (masc./neuter) usually do not change: der Lehrer → die Lehrer.')},
{h:'3. Separable verbs — first look', html:
 `<p>Many verbs have a little prefix (<b>auf, an, aus, ab, ein, fern, mit, vor, zu</b>). In a sentence the verb goes to position 2 and the <b>prefix jumps to the very end</b>:</p>`+
 EX('auf|stehen → Er <b>steht</b> um 7 Uhr <b>auf</b>.','He gets up at 7 o\'clock.')+
 EX('ab|fahren → Der Bus <b>fährt</b> in 10 Minuten <b>ab</b>.','The bus leaves in 10 minutes.')+
 EX('an|kreuzen → Du <b>kreuzt</b> die richtige Antwort <b>an</b>.','You tick the correct answer.')+
 EX('aus|steigen → Ich <b>steige</b> in Frankfurt <b>aus</b>.','I get off in Frankfurt.')+
 EX('an|kommen → Wir <b>kommen</b> um 9 Uhr <b>an</b>.','We arrive at 9 o\'clock.')+
 EX('vor|lesen → Die Lehrerin <b>liest</b> den Text <b>vor</b>.','The teacher reads the text aloud.')+
 EX('an|machen / aus|machen → Ich <b>mache</b> das Licht <b>an</b>. Er <b>macht</b> den Computer <b>aus</b>.','I switch on the light. He switches off the computer.')+
 TIP('Compare: <b>lesen</b> (to read) and <b>vor</b>lesen (to read aloud) · <b>kommen</b> (to come) and <b>an</b>kommen (to arrive). The prefix changes the meaning!')}
],
vocab:[
 {de:'Text', g:'m', pl:'Texte', en:'text'},{de:'Satz', g:'m', pl:'Sätze', en:'sentence'},{de:'Wort', g:'n', pl:'Wörter', en:'word'},{de:'Heft', g:'n', pl:'Hefte', en:'exercise book'},
 {de:'Wörterbuch', g:'n', pl:'Wörterbücher', en:'dictionary'},{de:'Bleistift', g:'m', pl:'Bleistifte', en:'pencil'},{de:'Kugelschreiber', g:'m', pl:'Kugelschreiber', en:'ballpoint pen'},
 {de:'Kalender', g:'m', pl:'Kalender', en:'calendar'},{de:'Zeitung', g:'f', pl:'Zeitungen', en:'newspaper'},{de:'Uhr', g:'f', pl:'Uhren', en:'clock / watch'},
 {de:'Licht', g:'n', pl:'Lichter', en:'light'},{de:'Computer', g:'m', pl:'Computer', en:'computer'},{de:'Fenster', g:'n', pl:'Fenster', en:'window'},{de:'Tür', g:'f', pl:'Türen', en:'door'},{de:'Minute', g:'f', pl:'Minuten', en:'minute'},
 {de:'aufstehen', en:'to get up'},{de:'abfahren', en:'to depart / leave'},{de:'ankommen', en:'to arrive'},{de:'ankreuzen', en:'to tick / mark with a cross'},{de:'aussteigen', en:'to get off (bus, train)'},
 {de:'einsteigen', en:'to get on (bus, train)'},{de:'vorlesen', en:'to read aloud'},{de:'anmachen', en:'to switch on'},{de:'ausmachen', en:'to switch off'},{de:'Das ist …', en:'This / that is …'},{de:'Das sind …', en:'These / those are …'}
],
sets:[
{title:'Das ist / Das sind', d:'singular and plural', items:[
 {t:'fill', q:'Das ist ___ Text.', a:['ein']},
 {t:'fill', q:'Das ist ___ Zeitung.', a:['eine'], x:'die Zeitung → <b>eine</b>'},
 {t:'fill', q:'Das ist ___ Buch.', a:['ein']},
 {t:'fill', q:'Das ist ___ Uhr.', a:['eine']},
 {t:'fill', q:'Das ___ Bücher.', a:['sind'], x:'plural → <b>sind</b>'},
 {t:'fill', q:'Das ___ ein Heft.', a:['ist']},
 {t:'fill', q:'Das sind ___. (ein Satz → plural)', a:['Sätze|Saetze']},
 {t:'fill', q:'Das sind ___. (ein Wort → plural)', a:['Wörter|Woerter']},
 {t:'fill', q:'Das sind ___. (eine Zeitung → plural)', a:['Zeitungen']},
 {t:'fill', q:'Das sind ___. (ein Kugelschreiber → plural)', a:['Kugelschreiber'], x:'-er nouns: no change'},
 {t:'fill', q:'Das sind ___. (ein Wörterbuch → plural)', a:['Wörterbücher|Woerterbuecher']},
 {t:'fill', q:'Das sind ___. (eine Uhr → plural)', a:['Uhren']},
 {t:'fill', q:'Das sind ___. (ein Bleistift → plural)', a:['Bleistifte']},
 {t:'mcq', q:'Which is correct?', o:['Das sind Bücher.','Das sind eine Bücher.','Das ist Bücher.','Das sind ein Bücher.'], a:0, x:'Plural: <b>sind</b> and no „ein“.'},
 {t:'mcq', q:'Which is correct?', o:['Das ist eine Zeitung.','Das ist ein Zeitung.','Das sind eine Zeitung.','Das ist einen Zeitung.'], a:0},
 {t:'tr', en:'This is a dictionary.', a:['Das ist ein Wörterbuch.','Das ist ein Woerterbuch.']},
 {t:'tr', en:'These are sentences.', a:['Das sind Sätze.','Das sind Saetze.']},
 {t:'tr', en:'That is a clock.', a:['Das ist eine Uhr.']}
]},
{title:'Separable verbs: where does the prefix go?', items:[
 {t:'order', a:'Er steht um 7 Uhr auf.', en:'He gets up at 7 o\'clock.'},
 {t:'order', a:'Der Bus fährt in 10 Minuten ab.', en:'The bus leaves in 10 minutes.'},
 {t:'order', a:'Du kreuzt die richtige Antwort an.', en:'You tick the right answer.'},
 {t:'order', a:'Ich steige in Frankfurt aus.', en:'I get off in Frankfurt.'},
 {t:'order', a:'Wir kommen um 9 Uhr an.', en:'We arrive at 9 o\'clock.'},
 {t:'fill', q:'Ich ___ um 6 Uhr ___. (aufstehen)', a:['stehe','auf']},
 {t:'fill', q:'Der Zug ___ um 8 Uhr ___. (abfahren)', a:['fährt|faehrt','ab'], x:'ab|fahren is also strong: er <b>fährt</b> … ab.'},
 {t:'fill', q:'Die Lehrerin ___ den Text ___. (vorlesen)', a:['liest','vor']},
 {t:'fill', q:'Er ___ das Licht ___. (anmachen)', a:['macht','an']},
 {t:'fill', q:'Du ___ den Computer ___. (ausmachen)', a:['machst','aus']},
 {t:'fill', q:'Wir ___ in Berlin ___. (ankommen)', a:['kommen','an']},
 {t:'fill', q:'Ihr ___ in den Bus ___. (einsteigen)', a:['steigt','ein']},
 {t:'mcq', q:'„ankommen“ means …', o:['to arrive','to come','to call','to start'], a:0},
 {t:'mcq', q:'„vorlesen“ means …', o:['to read aloud','to read','to forget','to prepare'], a:0},
 {t:'mcq', q:'Which sentence is correct?', o:['Ich stehe um 7 Uhr auf.','Ich aufstehe um 7 Uhr.','Ich stehe auf um 7 Uhr auf.','Ich auf stehe um 7 Uhr.'], a:0, x:'The prefix goes to the <b>end</b>.'}
]}
],
drills:['plural','conj-sep']
});

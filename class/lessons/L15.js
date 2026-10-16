LESSONS.push({
id:'L15', date:'2026-10-16',
title:'The Accusative Case (Der Akkusativ) — Anara\'s summary',
topics:['What is the accusative?','der → den / einen','Accusative pronouns: mich, dich, ihn …','Triggers: transitive verbs','durch, für, gegen, ohne, um'],
summary:'Anara\'s summary sheet sent on the evening of 16 October: the definition, examples for every gender, the accusative personal pronouns and the words that always take the accusative.',
learn:[
{h:'1. What is the accusative case?', html:
 `<p>The <b>accusative case</b> is used for the <b>direct object</b> of a sentence — the person, animal or thing that directly receives the action of the verb.</p>`+
 TIP('Quick analogy: in English, word order tells us who does what („The dog bites the man“ vs. „The man bites the dog“). In German, the <b>articles change</b> to show who is doing what, whatever the word order.')+
 TBL(['','Nominative','Accusative'],[['~masculine','der / ein / kein','<b>den / einen / keinen</b>'],['~feminine','die / eine / keine','die / eine / keine'],['~neuter','das / ein / kein','das / ein / kein'],['~plural','die / — / keine','die / — / keine']])+
 TIP('Good news: only the <b>masculine</b> changes. Feminine, neuter and plural stay exactly the same as in the nominative.')},
{h:'2. Examples in action', html:
 `<p><b>Masculine (der → den / einen)</b></p>`+EX('Ich habe einen Hund.','I have a dog.')+EX('Er kauft den Tisch.','He is buying the table.')+
 `<p><b>Feminine (die → die / eine)</b></p>`+EX('Ich trinke eine Limonade.','I am drinking a lemonade.')+EX('Sie sieht die Frau.','She sees the woman.')+
 `<p><b>Neuter (das → das / ein)</b></p>`+EX('Wir buchen ein Hotel.','We are booking a hotel.')+EX('Ich lese das Buch.','I am reading the book.')},
{h:'3. Personal pronouns in the accusative', html:
 `<p>When you replace a noun with a pronoun (me, you, him, her, it, us, them), use these forms:</p>`+
 TBL(['Nominative','Accusative','English'],[['ich','<b>mich</b>','~me'],['du','<b>dich</b>','~you (informal)'],['er','<b>ihn</b>','~him / it (der-words)'],['sie','sie','~her / it (die-words)'],['es','es','~it'],['wir','<b>uns</b>','~us'],['ihr','<b>euch</b>','~you all'],['sie / Sie','sie / Sie','~them / you (formal)']])+
 EX('Kennst du Peter? – Ja, ich kenne ihn.','Do you know Peter? – Yes, I know him.')+EX('Isst du den Kuchen? – Ja, ich esse ihn.','A thing that is der → ihn (it).')+EX('Liest du die Zeitung? – Ja, ich lese sie.','die → sie')+EX('Kaufst du das Buch? – Ja, ich kaufe es.','das → es')+EX('Ich liebe dich.','I love you.')},
{h:'4. Key triggers for the accusative', html:
 `<p><b>1. Transitive verbs</b> (verbs that need a direct object):</p>`+
 EX('haben, kaufen, sehen, trinken, essen, brauchen, finden','to have, to buy, to see, to drink, to eat, to need, to find')+
 `<p><b>2. Accusative prepositions</b> — always followed by the accusative:</p>`+
 TBL(['Preposition','Meaning','Example'],[['durch','~through','Wir gehen durch den Park.'],['für','~for','Das Geschenk ist für den Bruder.'],['gegen','~against','Er spielt gegen den Freund.'],['ohne','~without','Ich trinke Kaffee ohne den Zucker. / ohne Zucker'],['um','~around / at (time)','Wir sitzen um den Tisch. · um 8 Uhr']])+
 TIP('Memory trick: <b>DOGFU</b> — <b>D</b>urch, <b>O</b>hne, <b>G</b>egen, <b>F</b>ür, <b>U</b>m. After these words: der → <b>den</b>, ein → <b>einen</b>, ich → <b>mich</b>, du → <b>dich</b>, er → <b>ihn</b>.')}
],
vocab:[
{de:'Objekt', g:'n', pl:'Objekte', en:'object (direct object = Akkusativobjekt)'},
 {de:'Hund', g:'m', pl:'Hunde', en:'dog'},{de:'Limonade', g:'f', pl:'Limonaden', en:'lemonade'},{de:'Hotel', g:'n', pl:'Hotels', en:'hotel'},{de:'Geschenk', g:'n', pl:'Geschenke', en:'gift, present'},
 {de:'durch', en:'through (+ accusative)'},{de:'für', en:'for (+ accusative)'},{de:'gegen', en:'against (+ accusative)'},{de:'ohne', en:'without (+ accusative)'},{de:'um', en:'around; at (time) (+ accusative)'},
 {de:'mich', en:'me (accusative)'},{de:'dich', en:'you (accusative, informal)'},{de:'ihn', en:'him / it (accusative of er)'},{de:'uns', en:'us'},{de:'euch', en:'you all (accusative)'}
],
sets:[
{title:'Examples in action', d:'den / einen · die / eine · das / ein', items:[
 {t:'fill', q:'Ich habe ___ Hund. (ein)', a:['einen'], x:'der Hund → <b>einen</b> Hund'},
 {t:'fill', q:'Er kauft ___ Tisch. (der)', a:['den'], x:'der Tisch → <b>den</b> Tisch'},
 {t:'fill', q:'Ich trinke ___ Limonade. (eine)', a:['eine'], x:'feminine does not change'},
 {t:'fill', q:'Sie sieht ___ Frau. (die)', a:['die']},
 {t:'fill', q:'Wir buchen ___ Hotel. (ein)', a:['ein'], x:'neuter does not change'},
 {t:'fill', q:'Ich lese ___ Buch. (das)', a:['das']},
 {t:'mcq', q:'Which gender changes in the accusative?', o:['only masculine','only feminine','masculine and neuter','all genders'], a:0},
 {t:'mcq', q:'The accusative is used for …', o:['the direct object','the subject','the verb','the time'], a:0, x:'The direct object receives the action of the verb.'},
 {t:'mcq', q:'„Den Mann beißt der Hund.“ — Who bites?', o:['the dog','the man'], a:0, x:'<b>der</b> Hund = subject (nominative), <b>den</b> Mann = object (accusative) — the articles tell us, not the word order.'},
 {t:'mcq', q:'„Der Mann sieht den Hund.“ — Who sees whom?', o:['The man sees the dog.','The dog sees the man.'], a:0},
 {t:'tr', en:'I have a dog.', a:['Ich habe einen Hund.']},
 {t:'tr', en:'He is buying the table.', a:['Er kauft den Tisch.']},
 {t:'tr', en:'We are booking a hotel.', a:['Wir buchen ein Hotel.']},
 {t:'tr', en:'She sees the woman.', a:['Sie sieht die Frau.']},
 {t:'order', a:'Ich trinke eine Limonade.', en:'I am drinking a lemonade.'},
 {t:'order', a:'Ich lese das Buch.', en:'I am reading the book.'}
]},
{title:'Accusative pronouns: mich, dich, ihn …', d:'replace the noun with a pronoun', items:[
 {t:'fill', q:'ich → ___', a:['mich']},{t:'fill', q:'du → ___', a:['dich']},{t:'fill', q:'er → ___', a:['ihn']},{t:'fill', q:'wir → ___', a:['uns']},{t:'fill', q:'ihr → ___', a:['euch']},
 {t:'fill', q:'Kennst du Peter? – Ja, ich kenne ___.', a:['ihn']},
 {t:'fill', q:'Kennst du Maria? – Ja, ich kenne ___.', a:['sie']},
 {t:'fill', q:'Isst du den Kuchen hier? – Ja, ich esse ___.', a:['ihn'], x:'der Kuchen → <b>ihn</b> (things that are der also become ihn)'},
 {t:'fill', q:'Trinkst du die Milch hier? – Ja, ich trinke ___.', a:['sie']},
 {t:'fill', q:'Liest du das Buch hier? – Ja, ich lese ___.', a:['es']},
 {t:'fill', q:'Kaufst du die Erdbeeren hier? – Ja, ich kaufe ___.', a:['sie'], x:'plural → sie'},
 {t:'fill', q:'Besuchst du mich morgen? – Ja, ich besuche ___ morgen.', a:['dich']},
 {t:'fill', q:'Hörst du uns? – Ja, ich höre ___.', a:['euch']},
 {t:'fill', q:'Ich kenne Maria, aber sie kennt ___ nicht.', a:['mich']},
 {t:'fill', q:'Du kennst den Professor, aber er kennt ___ nicht.', a:['dich']},
 {t:'fill', q:'Wir kennen Arnold Schwarzenegger, aber er kennt ___ nicht.', a:['uns']},
 {t:'fill', q:'Ihr kennt mich, aber ich kenne ___ nicht.', a:['euch']},
 {t:'fill', q:'Maria kennt den Lehrer, aber er kennt ___ nicht.', a:['sie']},
 {t:'fill', q:'Frau Berg kennt dich, aber du kennst ___ nicht.', a:['sie']},
 {t:'fill', q:'„Wer bekommt den Salat?“ – „Ich bekomme ___.“', a:['ihn']},
 {t:'fill', q:'„Wer bekommt die Suppe?“ – „Ich bekomme ___.“', a:['sie']},
 {t:'fill', q:'„Wer bekommt das Steak?“ – „Ich bekomme ___.“', a:['es']},
 {t:'mcq', q:'Ich liebe ___. (you, informal)', o:['dich','du','dir','dein'], a:0},
 {t:'tr', en:'Do you know him? (du)', a:['Kennst du ihn?']},
 {t:'tr', en:'I see you. (du)', a:['Ich sehe dich.']},
 {t:'tr', en:'He visits us.', a:['Er besucht uns.']}
]},
{title:'durch, für, gegen, ohne, um', d:'prepositions that always take the accusative', items:[
 {t:'match', pairs:[['durch','through'],['für','for'],['gegen','against'],['ohne','without'],['um','around / at']]},
 {t:'fill', q:'Das Geschenk ist für ___ Bruder.', a:['den'], x:'für + accusative: der Bruder → <b>den</b> Bruder'},
 {t:'fill', q:'Wir gehen durch ___ Park. (der Park)', a:['den']},
 {t:'fill', q:'Das Geschenk ist für ___ Mutter. (die Mutter)', a:['die']},
 {t:'fill', q:'Ich trinke Kaffee ohne ___ Zucker. (der Zucker)', a:['den']},
 {t:'fill', q:'Er spielt gegen ___ Freund. (der Freund)', a:['den']},
 {t:'fill', q:'Wir sitzen um ___ Tisch. (der Tisch)', a:['den']},
 {t:'fill', q:'Das Buch ist für ___ Kind. (das Kind)', a:['das']},
 {t:'fill', q:'Ich gehe ohne ___ Freundin ins Kino. (meine Freundin)', a:['meine']},
 {t:'fill', q:'Das Geschenk ist für ___ Vater. (mein Vater)', a:['meinen'], x:'mein → <b>meinen</b> (masculine accusative)'},
 {t:'fill', q:'Das ist für ___. (ich)', a:['mich']},
 {t:'fill', q:'Ich mache das für ___. (du)', a:['dich']},
 {t:'fill', q:'Wir spielen gegen ___. (ihr)', a:['euch']},
 {t:'fill', q:'Ohne ___ gehe ich nicht. (er)', a:['ihn']},
 {t:'fill', q:'Der Unterricht beginnt ___ 9 Uhr.', a:['um']},
 {t:'mcq', q:'Which preposition means „without“?', o:['ohne','für','durch','gegen'], a:0},
 {t:'mcq', q:'Which preposition means „through“?', o:['durch','um','gegen','für'], a:0},
 {t:'mcq', q:'Das Geschenk ist für ___ Bruder.', o:['den','der','dem','des'], a:0},
 {t:'mcq', q:'Which verbs need an accusative object?', o:['haben, kaufen, sehen, trinken, essen, brauchen, finden','sein, werden, heißen','gehen, kommen, fahren'], a:0, x:'Transitive verbs take a direct object. sein and heißen take the nominative: Das ist <b>der</b> Lehrer.'},
 {t:'tr', en:'The gift is for the brother.', a:['Das Geschenk ist für den Bruder.']},
 {t:'tr', en:'I drink coffee without sugar.', a:['Ich trinke Kaffee ohne Zucker.']},
 {t:'tr', en:'We are going through the park.', a:['Wir gehen durch den Park.']}
]}
],
drills:['akk','akkpron','akkprep','akk2']
});

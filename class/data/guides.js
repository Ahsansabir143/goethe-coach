/* 🧑‍🏫 TEACH ME — step-by-step lessons, one per grammar topic, in course order.
   Every guide follows the same teaching structure:
     1 What is it? (definition) · 2 When / how do we use it? · 3 The rules · 4 Step by step · 5 Examples
     6 Common mistakes · 7 Summary
   Each step has quick check questions (compact format: f: fill [answer] · m: question|correct|wrong… · o: word order · t: translate).
   ch = chapter id in data/course.js · links = pages / topic / drills to practise afterwards.
   ➜ New grammar in class: add a guide here in the right place (same 7-step structure). */
window.GUIDES = [];
var addGuide = g => window.GUIDES.push(g);

/* ===================== LEKTION 1 ===================== */
addGuide({id:'alphabet', ch:'lektion1', icon:'🔤', title:'The German alphabet & sounds', goal:'Read and pronounce German words correctly.',
 links:{pages:['L01'], topic:'sounds'}, steps:[
 {k:'def', h:'What is it?', html:`<p>German is written almost exactly as it is spoken. Once you know how each letter sounds, you can read every word — even words you have never seen.</p>`+TIP('German has 26 letters + 4 special ones: <b>ä, ö, ü</b> (umlauts) and <b>ß</b> (= ss).'),
  q:['m: German words are mostly …|spoken as they are written|spoken very differently from the spelling ## That is why sounds are learnt first.']},
 {k:'rules', h:'The sounds that are different from English', html: TBL(['Letters','Sound','Example'],[['w','~like English v','Wasser, wohnen'],['v','~like English f','Vater, viel'],['z','~ts','Zeit, zehn'],['j','~like English y','ja, jung'],['ei','~eye','mein, heißen'],['ie','~long ee','die, sieben'],['eu / äu','~oy (boy)','heute, Häuser'],['sch','~sh','Schule'],['sp / st (at the start)','~shp / sht','Sport, Straße'],['ch (after a, o, u)','~in the throat (Bach)','acht, Buch'],['ch (after e, i)','~soft, like a cat hissing','ich, Milch'],['ß','~ss','heißen, Straße']]),
  q:['m: How do you say „W“ in „Wasser“?|like English v|like English w','m: „ei“ in „mein“ sounds like …|eye|ee','m: „ie“ in „sieben“ sounds like …|ee|eye','m: „z“ in „Zeit“ sounds like …|ts|s']},
 {k:'how', h:'Step by step: reading a new word', html:`<ol><li>Find the vowel pairs first: <b>ei</b> = eye, <b>ie</b> = ee, <b>eu/äu</b> = oy.</li><li>Look for <b>sch, ch, sp, st</b>.</li><li>Remember w = v, v = f, z = ts.</li><li>Stress is usually on the <b>first</b> syllable: <b>Va</b>ter, <b>Leh</b>rer.</li></ol>`+EX('Wie heißen Sie?','What is your name?')+EX('Ich spiele Fußball.','I play football.'),
  q:['m: Where is the stress in „Lehrer“?|LEH-rer|leh-RER']},
 {k:'ex', h:'Greetings to practise the sounds', html: EX('Guten Morgen!','Good morning!')+EX('Guten Tag!','Hello! / Good day!')+EX('Guten Abend!','Good evening!')+EX('Tschüss! – Auf Wiedersehen!','Bye! – Goodbye! (formal)')+EX('Wie geht es Ihnen? – Danke, gut.','How are you? (formal) – Fine, thanks.')},
 {k:'mistakes', h:'Common mistakes', html:`<ul><li>Reading <b>ei</b> and <b>ie</b> the wrong way round: mein ≠ „meen“, die ≠ „dye“.</li><li>English w in <b>Wasser</b> — say <b>V</b>asser.</li><li>Forgetting the umlaut: <b>schon</b> (already) ≠ <b>schön</b> (beautiful).</li></ul>`,
  q:['m: schon or schön — which means „beautiful“?|schön|schon']},
 {k:'sum', h:'Summary', html: TIP('ei = eye · ie = ee · eu = oy · w = v · v = f · z = ts · sch = sh · stress on the first syllable.')}
]});

addGuide({id:'present', ch:'lektion1', icon:'🧩', title:'Personal pronouns & the present tense (regular verbs)', goal:'Say who does what: ich lerne, du lernst, er lernt …',
 links:{pages:['L02'], topic:'regular', drills:['conj-reg']}, steps:[
 {k:'def', h:'What is it?', html:`<p>The <b>present tense</b> (Präsens) says what happens now or regularly. The verb changes its <b>ending</b> to match the person (<b>ich, du, er …</b>).</p>`+EX('Ich lerne Deutsch.','I learn / am learning German.')+TIP('German has only one present tense: ich lerne = I learn = I am learning.'),
  q:['m: „Ich arbeite“ can mean …|I work / I am working|I worked']},
 {k:'use', h:'The personal pronouns', html: TBL(['German','English'],[['ich','~I'],['du','~you (one friend)'],['er / sie / es','~he / she / it'],['wir','~we'],['ihr','~you (several friends)'],['sie / Sie','~they / you (polite)']]),
  q:['m: „wir“ means …|we|you','m: „ihr“ (pronoun) means …|you (several friends)|her','m: polite „you“ is …|Sie|du']},
 {k:'rules', h:'The rule: stem + ending', html:`<p>Take the infinitive (<b>lernen</b>), remove <b>-en</b> → the <b>stem</b> (lern-). Add the ending:</p>`+TBL(['Person','Ending','lernen','wohnen'],[['ich','-e','lerne','wohne'],['du','-st','lernst','wohnst'],['er / sie / es','-t','lernt','wohnt'],['wir','-en','lernen','wohnen'],['ihr','-t','lernt','wohnt'],['sie / Sie','-en','lernen','wohnen']])+TIP('Memory trick: e – st – t – en – t – en.'),
  q:['f: du [lernst] (lernen)','f: er [wohnt] (wohnen)','f: wir [spielen] (spielen)','f: ihr [kommt] (kommen)']},
 {k:'how', h:'Step by step', html:`<ol><li>Find the subject: who does it? (Ich? Meine Kinder = sie?)</li><li>Take the verb, cut off <b>-en</b>.</li><li>Add the ending for that person.</li><li>Put the verb in <b>position 2</b>.</li></ol>`+EX('Meine Kinder spielen Fußball.','My children play football. (Kinder = sie → -en)')+EX('Mein Vater arbeitet viel.','My father works a lot. (Vater = er → -t)'),
  q:['f: Meine Kinder [spielen] Fußball.','f: Mein Vater [kocht] gern. (kochen)','o: Wir wohnen in Bischkek.|We live in Bishkek.']},
 {k:'ex', h:'Examples', html: EX('Ich komme aus Pakistan.','I come from Pakistan.')+EX('Woher kommst du?','Where are you from?')+EX('Sie wohnt in Berlin.','She lives in Berlin.')+EX('Wir lernen Deutsch.','We are learning German.')+EX('Ihr spielt gern Tennis.','You (all) like playing tennis.')+EX('Was machen Sie?','What do you do? (polite)')},
 {k:'mistakes', h:'Common mistakes', html:`<ul><li>Using the ich-form for everyone: <s>Meine Kinder spiele</s> → <b>spielen</b>.</li><li><s>Er lernen</s> → er <b>lernt</b>.</li><li>Forgetting -st with du: <s>du lerne</s> → du <b>lernst</b>.</li></ul>`,
  q:['m: Which is correct?|Er lernt Deutsch.|Er lernen Deutsch.|Er lerne Deutsch.']},
 {k:'sum', h:'Summary', html: TIP('Subject first → verb stem + ending (e – st – t – en – t – en) → verb in position 2.')}
]});

addGuide({id:'endings', ch:'lektion1', icon:'🛠️', title:'Special endings: arbeiten, heißen, tanzen', goal:'Know when to add an extra -e- and when du only takes -t.',
 links:{pages:['L03'], topic:'tds', drills:['conj-td']}, steps:[
 {k:'def', h:'What is it?', html:`<p>Some verbs need a small change so they are easy to pronounce: <b>du arbeit<u>e</u>st</b> (extra e) and <b>du heißt</b> (no extra s).</p>`},
 {k:'rules', h:'The rules', html: TBL(['Stem ends in','Change','Examples'],[['~-t / -d (and -chn, -ffn, -gn)','~extra e in du, er, ihr','du arbeitest, er findet, ihr redet, es regnet'],['~-s / -ß / -z / -x','~du only adds -t','du heißt, du tanzt, du reist, du sitzt']]),
  q:['f: du [arbeitest] (arbeiten)','f: er [findet] (finden)','f: du [heißt] (heißen)','f: du [tanzt] (tanzen)']},
 {k:'how', h:'Step by step', html:`<ol><li>Cut -en: arbeit-, heiß-.</li><li>Does the stem end in t / d? → put <b>e</b> before -st / -t.</li><li>Does it end in s, ß, z? → du gets only <b>-t</b>.</li></ol>`+EX('Du arbeitest viel.','You work a lot.')+EX('Wie heißt du?','What is your name?')},
 {k:'ex', h:'Examples', html: EX('Das kostet 5 Euro.','That costs 5 euros.')+EX('Er öffnet das Fenster.','He opens the window.')+EX('Du tanzt gern.','You like dancing.')+EX('Ihr wartet auf den Bus.','You (all) are waiting for the bus.')},
 {k:'mistakes', h:'Common mistakes', html:`<ul><li><s>du arbeitst</s> → du arbeit<b>e</b>st</li><li><s>du heißst</s> → du heißt</li></ul>`,
  q:['m: Which is correct?|du arbeitest|du arbeitst','m: Which is correct?|du tanzt|du tanzst']},
 {k:'sum', h:'Summary', html: TIP('t / d → extra e (arbeitest, findet) · s / ß / z → du + t (heißt, tanzt).')}
]});

addGuide({id:'seinhaben', ch:'lektion1', icon:'⭐', title:'sein & haben', goal:'Use the two most important verbs: to be and to have.',
 links:{pages:['L10'], topic:'sein'}, steps:[
 {k:'def', h:'What is it?', html:`<p><b>sein</b> (to be) and <b>haben</b> (to have) are irregular — learn them by heart. They are also the helpers of the past tense (Perfekt).</p>`},
 {k:'rules', h:'The forms', html: TBL(['Person','sein','haben'],[['ich','bin','habe'],['du','bist','hast'],['er / sie / es','ist','hat'],['wir','sind','haben'],['ihr','seid','habt'],['sie / Sie','sind','haben']]),
  q:['f: Ich [bin] müde.','f: Du [hast] Zeit.','f: Wir [sind] in Bischkek.','f: Ihr [seid] sehr nett.','f: Er [hat] zwei Kinder.']},
 {k:'use', h:'When do we use them?', html:`<p><b>sein</b>: name, origin, job, feelings, place, adjectives. <b>haben</b>: things, family, time, hunger.</p>`+EX('Ich bin Ingenieur.','I am an engineer.')+EX('Sie ist krank.','She is ill.')+EX('Ich habe Hunger.','I am hungry. (literally: I have hunger)')+EX('Wir haben keine Zeit.','We have no time.')},
 {k:'mistakes', h:'Common mistakes', html:`<ul><li><s>Ich habe 25 Jahre</s> → Ich <b>bin</b> 25 Jahre alt.</li><li><s>ihr seit</s> → ihr <b>seid</b> (seit = since).</li></ul>`,
  q:['m: How old are you? — Ich …|bin 25 Jahre alt|habe 25 Jahre']},
 {k:'sum', h:'Summary', html: TIP('bin, bist, ist, sind, seid, sind · habe, hast, hat, haben, habt, haben.')}
]});

addGuide({id:'wordorder', ch:'lektion1', icon:'🧭', title:'Word order & questions (W-questions, yes/no questions)', goal:'Put the verb in the right place and ask questions.',
 links:{pages:['L02','L09'], topic:'questions'}, steps:[
 {k:'def', h:'What is it?', html:`<p>In German the <b>verb has a fixed place</b>. In a statement and a W-question it is in <b>position 2</b>; in a yes/no question it is in <b>position 1</b>.</p>`},
 {k:'rules', h:'The rules', html: TBL(['Type','Position 1','Position 2','Rest'],[['~statement','Ich','lerne','heute Deutsch.'],['~statement (time first)','Heute','lerne','ich Deutsch.'],['~W-question','Was','lernst','du heute?'],['~yes/no question','Lernst','du','heute Deutsch?']])+TBL(['W-word','English'],[['wer','~who'],['was','~what'],['wo','~where'],['woher','~where from'],['wohin','~where to'],['wie','~how'],['wann','~when'],['warum','~why'],['welche','~which']]),
  q:['o: Heute lerne ich Deutsch.|Today I am learning German.','o: Woher kommst du?|Where are you from?','o: Wohnst du in Berlin?|Do you live in Berlin?']},
 {k:'how', h:'Step by step: answering yes/no questions', html: EX('Lernst du Deutsch? – Ja, ich lerne Deutsch.','Are you learning German? – Yes, I am.')+EX('Lernst du Spanisch? – Nein, ich lerne nicht Spanisch.','Are you learning Spanish? – No, I am not.')+EX('Lernst du nicht Deutsch? – Doch, ich lerne Deutsch.','Aren\'t you learning German? – Yes, I am! (doch)')+TIP('Answer „yes“ to a negative question with <b>doch</b>.'),
  q:['m: Kommst du nicht? — (Yes, I am coming.)|Doch, ich komme.|Ja, ich komme.']},
 {k:'mistakes', h:'Common mistakes', html:`<ul><li><s>Heute ich lerne Deutsch</s> → Heute <b>lerne ich</b> Deutsch.</li><li><s>Wo du wohnst?</s> → Wo <b>wohnst du</b>?</li></ul>`,
  q:['m: Which is correct?|Am Abend sehe ich fern.|Am Abend ich sehe fern.']},
 {k:'sum', h:'Summary', html: TIP('Statement / W-question: verb 2nd. Yes/no question: verb 1st. Doch = yes to a negative question.')}
]});

addGuide({id:'dusie', ch:'lektion1', icon:'🤝', title:'du, ihr or Sie?', goal:'Choose the right „you“.',
 links:{topic:'dusie'}, steps:[
 {k:'def', h:'What is it?', html:`<p>German has three words for „you“: <b>du</b> (one friend), <b>ihr</b> (several friends), <b>Sie</b> (polite — one or more people).</p>`},
 {k:'rules', h:'The rules', html: TBL(['Who?','Word','Verb'],[['~a friend, child, family','du','kommst'],['~several friends','ihr','kommt'],['~a stranger, teacher, boss (one or more)','Sie','kommen']])+TIP('Sie (polite) always has a capital S and the same verb form as sie (they). Your = Ihr / Ihre.'),
  q:['m: You talk to your teacher: Woher …?|kommen Sie|kommst du','m: You talk to two friends: Wo …?|wohnt ihr|wohnen Sie','f: Wie [heißt] du?']},
 {k:'ex', h:'Examples', html: EX('Wie heißt du? – Wie heißen Sie?','What is your name? (informal / polite)')+EX('Wo wohnt ihr?','Where do you (all) live?')+EX('Ist das Ihre Tasche?','Is that your bag? (polite)')},
 {k:'sum', h:'Summary', html: TIP('du = 1 friend · ihr = several friends · Sie = polite (capital S, verb -en).')}
]});

/* ===================== LEKTION 2 ===================== */
addGuide({id:'articles', ch:'lektion2', icon:'📦', title:'Nouns & articles: der, die, das · ein, eine', goal:'Use every noun with its article.',
 links:{pages:['L05','L11'], topic:'nouns', drills:['articles']}, steps:[
 {k:'def', h:'What is it?', html:`<p>Every German noun has a <b>gender</b>: masculine (<b>der</b>), feminine (<b>die</b>) or neuter (<b>das</b>). Nouns always start with a <b>capital letter</b>.</p>`+EX('der Tisch · die Lampe · das Buch','the table · the lamp · the book')},
 {k:'rules', h:'Definite and indefinite articles', html: TBL(['','masculine','feminine','neuter','plural'],[['~the','der','die','das','die'],['~a / an','ein','eine','ein','—'],['~not a / no','kein','keine','kein','keine']]),
  q:['m: ___ Tisch (table)|der|die|das','m: ___ Lampe (lamp)|die|der|das','m: ___ Buch (book)|das|der|die','f: Das ist [ein] Stift. (der Stift)','f: Das ist [eine] Uhr. (die Uhr)']},
 {k:'how', h:'Step by step', html:`<ol><li>Learn the noun <b>with</b> its article: <b>der</b> Tisch, not just „Tisch“.</li><li>„the“ → der / die / das. „a“ → ein / eine / ein.</li><li>Plural is always <b>die</b>.</li></ol>`+EX('Das ist ein Tisch. Der Tisch ist neu.','That is a table. The table is new.')},
 {k:'mistakes', h:'Common mistakes', html:`<ul><li>Lower-case nouns: <s>das buch</s> → das <b>B</b>uch.</li><li>Gender from English logic: <b>das</b> Mädchen (girl) is neuter!</li></ul>`,
  q:['m: das Mädchen — the article is …|das (all -chen words)|die']},
 {k:'sum', h:'Summary', html: TIP('der / die / das (the) · ein / eine / ein (a) · plural die · capital letter for every noun.')}
]});

addGuide({id:'plural', ch:'lektion2', icon:'👥', title:'Plural of nouns', goal:'Make the plural and use „die“.',
 links:{pages:['L05'], topic:'nouns', drills:['plural']}, steps:[
 {k:'def', h:'What is it?', html:`<p>German has several plural endings. Learn the plural with every noun. The plural article is always <b>die</b>.</p>`},
 {k:'rules', h:'The plural types', html: TBL(['Ending','Example'],[['-e','der Tisch → die Tische'],['¨-e','der Stuhl → die Stühle'],['-er / ¨-er','das Kind → die Kinder · das Buch → die Bücher'],['-n / -en','die Lampe → die Lampen · die Zeitung → die Zeitungen'],['-s','das Auto → die Autos'],['— / ¨','der Lehrer → die Lehrer · der Apfel → die Äpfel']])+TIP('Feminine nouns in -e and -ung almost always add -n / -en.'),
  q:['f: die Lampe → die [Lampen]','f: das Auto → die [Autos]','f: das Buch → die [Bücher]','f: der Lehrer → die [Lehrer]']},
 {k:'ex', h:'Examples', html: EX('Das ist ein Text. – Das sind Texte.','This is a text. – These are texts.')+EX('Das ist eine Uhr. – Das sind Uhren.','This is a clock. – These are clocks.')},
 {k:'sum', h:'Summary', html: TIP('Plural article = die · learn each plural · -e/-ung nouns → -n/-en.')}
]});

addGuide({id:'gender', ch:'lektion2', icon:'🧬', title:'Gender rules & compound nouns', goal:'Guess der / die / das from the ending.',
 links:{pages:['L11'], topic:'gender', drills:['p4-genus']}, steps:[
 {k:'rules', h:'The rules (Grammatik A1, 3.1)', html: TBL(['Ending / group','Article','Examples'],[['~male persons & animals, male jobs','der','der Kollege, der Löwe, der Arzt'],['~months, days, times of day','der','der Mai, der Montag, der Morgen'],['-or, -en, -ismus','der','der Motor, der Garten, der Tourismus'],['~female persons & animals, female jobs','die','die Studentin, die Katze, die Ärztin'],['~often vegetables & fruit','die','die Tomate, die Birne'],['-ei, -ung, -heit, -keit, -schaft','die','die Bäckerei, die Zeitung, die Krankheit, die Mannschaft'],['-tät, -ion, -ik, -ur','die','die Universität, die Aktion, die Musik, die Natur'],['-chen, -lein, -ment, -um','das','das Mädchen, das Tischlein, das Appartement, das Zentrum'],['~infinitive as noun','das','das Lernen']]),
  q:['m: ___ Zeitung|die|der|das','m: ___ Mädchen|das|die|der','m: ___ Montag|der|die|das','m: ___ Motor|der|die|das','m: ___ Bäckerei|die|der|das','m: ___ Musik|die|der|das']},
 {k:'how', h:'Compound nouns', html:`<p>In a compound noun the <b>last word</b> gives the article.</p>`+EX('die Kaffeemaschine','the coffee machine (die Maschine)')+EX('das Wörterbuch','the dictionary (das Buch)')+EX('der Zimmerschlüssel','the room key (der Schlüssel)'),
  q:['m: ___ Orangensaft (der Saft)|der|die|das','m: ___ Wartezimmer (das Zimmer)|das|der|die']},
 {k:'sum', h:'Summary', html: TIP('-ung/-heit/-keit → die · -chen/-um → das · days & months → der · compounds: the last word decides.')}
]});

addGuide({id:'negation', ch:'lektion2', icon:'🚫', title:'nicht or kein?', goal:'Say „not“ correctly.',
 links:{pages:['L06','L11'], topic:'negation', drills:['neg']}, steps:[
 {k:'def', h:'What is it?', html:`<p>German has two ways to say „not“: <b>kein</b> for nouns, <b>nicht</b> for everything else.</p>`},
 {k:'rules', h:'The rules', html: TBL(['Use','When','Example'],[['kein / keine','~noun with ein / eine or no article','Das ist kein Apfel. Ich habe keine Zeit.'],['nicht','~verbs, adjectives, names, places, nouns with der/die/das','Ich arbeite nicht. Das ist nicht teuer.']])+TBL(['','masc.','fem.','neut.','plural'],[['~nominative','kein','keine','kein','keine'],['~accusative','keinen','keine','kein','keine']]),
  q:['m: Das ist ___ Buch.|kein|nicht','m: Das Buch ist ___ teuer.|nicht|kein','m: Ich habe ___ Zeit.|keine|nicht','f: Ich trinke [keinen] Kaffee. (der Kaffee)']},
 {k:'how', h:'Where does nicht go?', html:`<p><b>nicht</b> goes at the end — but <b>before</b> a place, gern, an adjective or a separable prefix.</p>`+EX('Ich kenne ihn nicht.','I don\'t know him.')+EX('Ich wohne nicht in Berlin.','I don\'t live in Berlin.')+EX('Ich tanze nicht gern.','I don\'t like dancing.')+EX('Ich stehe nicht um 7 Uhr auf.','I don\'t get up at 7.'),
  q:['o: Ich wohne nicht in Berlin.|I don\'t live in Berlin.']},
 {k:'sum', h:'Summary', html: TIP('kein = no / not a (nouns) · nicht = not (everything else).')}
]});

addGuide({id:'adjectives', ch:'lektion2', icon:'🎨', title:'Adjectives after sein · opposites · colours', goal:'Describe things.',
 links:{pages:['L01'], topic:'adjectives'}, steps:[
 {k:'rules', h:'The rule', html:`<p>After <b>sein</b> the adjective has <b>no ending</b>. The pronoun matches the noun: der → er, die → sie, das → es, plural → sie.</p>`+EX('Der Film ist gut. – Er ist gut.','The film is good. – It is good.')+EX('Die Jacke ist teuer. – Sie ist teuer.','The jacket is expensive. – It is expensive.')+EX('Das Auto ist neu. – Es ist neu.','The car is new. – It is new.'),
  q:['f: Das Auto ist neu. – [Es] ist neu.','f: Der Film ist lang. – [Er] ist lang.']},
 {k:'ex', h:'Opposites', html: TBL(['','',''],[['alt ↔ neu','~old ↔ new',''],['groß ↔ klein','~big ↔ small',''],['teuer ↔ billig','~expensive ↔ cheap',''],['schnell ↔ langsam','~fast ↔ slow',''],['laut ↔ leise','~loud ↔ quiet','']]),
  q:['m: The opposite of „teuer“ is …|billig|alt','m: The opposite of „groß“ is …|klein|lang']},
 {k:'sum', h:'Summary', html: TIP('sein + adjective: no ending · learn adjectives in pairs.')}
]});

addGuide({id:'numbers', ch:'lektion2', icon:'🔢', title:'Numbers 0 – 1 000 000', goal:'Count, say prices and phone numbers.',
 links:{pages:['L07'], topic:'numbers'}, steps:[
 {k:'rules', h:'The rules', html: TBL(['Numbers','Rule','Example'],[['0–12','~learn by heart','null, eins, zwei … zwölf'],['13–19','~number + zehn','dreizehn, vierzehn (sechzehn, siebzehn!)'],['20, 30 …','~-zig (30 = -ßig)','zwanzig, dreißig, vierzig'],['21–99','~the ONE first + und','einundzwanzig (1 + and + 20)'],['100, 1000','~hundert, tausend','hundertfünf, zweitausend']]),
  q:['f: 47 = [siebenundvierzig]','f: 16 = [sechzehn]','f: 30 = [dreißig]','m: 21 = …|einundzwanzig|zwanzigeins']},
 {k:'ex', h:'Examples', html: EX('Das kostet 2,60 €.','That costs €2.60.')+EX('Meine Telefonnummer ist null – sieben – null …','My phone number is zero – seven – zero …')},
 {k:'sum', h:'Summary', html: TIP('21–99: one + und + ten · sechzehn, siebzehn, dreißig are special.')}
]});

addGuide({id:'possessive', ch:'lektion2', icon:'🔑', title:'Possessive articles: mein, dein, sein, ihr …', goal:'Say whose it is.',
 links:{pages:['L12'], topic:'possessive', drills:['poss']}, steps:[
 {k:'def', h:'What is it?', html:`<p>A possessive article shows <b>who owns</b> something. It works like <b>ein</b>: masculine and neuter without ending, feminine and plural with <b>-e</b>.</p>`},
 {k:'rules', h:'The forms', html: TBL(['Person','possessive','der / das','die / plural'],[['ich','mein','mein Tisch','meine Tasche'],['du','dein','dein Buch','deine Bücher'],['er / es','sein','sein Tisch','seine Flasche'],['sie','ihr','ihr Buch','ihre Tasche'],['wir','unser','unser Tisch','unsere Tasche'],['ihr','euer','euer Buch','eure Bücher'],['sie / Sie','ihr / Ihr','ihr Tisch','ihre Tasche']]),
  q:['f: Das ist [meine] Tasche. (ich, die Tasche)','f: Peter und [sein] Bruder (er, der Bruder)','f: Anna und [ihre] Mutter (sie, die Mutter)','f: Das ist [unser] Auto. (wir, das Auto)']},
 {k:'how', h:'In the accusative', html:`<p>Like ein → einen: only masculine changes: <b>meinen, deinen, seinen …</b></p>`+EX('Ich besuche meinen Onkel.','I visit my uncle.')+EX('Ich besuche meine Tante.','I visit my aunt.'),
  q:['f: Ich besuche [meinen] Bruder. (der Bruder)']},
 {k:'mistakes', h:'Common mistakes', html:`<ul><li><s>euere</s> → <b>eure</b></li><li>ihr = her / their / (Ihr) your-polite — the noun after it does not change this.</li></ul>`},
 {k:'sum', h:'Summary', html: TIP('mein/dein/sein/ihr/unser/euer/Ihr + -e for die-nouns and plural · accusative masculine -en.')}
]});

/* ===================== LEKTION 3 ===================== */
addGuide({id:'moechten', ch:'lektion3', icon:'☕', title:'möchten — ordering in a café', goal:'Say what you would like.',
 links:{pages:['L13'], topic:'moechten'}, steps:[
 {k:'def', h:'What is it?', html:`<p><b>möchten</b> = would like. It is polite and used for ordering and wishes.</p>`},
 {k:'rules', h:'The forms', html: TBL(['Person','möchten'],[['ich','möchte'],['du','möchtest'],['er / sie / es','möchte'],['wir','möchten'],['ihr','möchtet'],['sie / Sie','möchten']])+TIP('ich and er have the same form — no -t!'),
  q:['f: Ich [möchte] einen Kaffee.','f: Was [möchtest] du?','f: Er [möchte] Tee.']},
 {k:'how', h:'Word order', html:`<p>möchte is in position 2; a second verb goes to the <b>end</b> as an infinitive.</p>`+EX('Ich möchte einen Kaffee trinken.','I would like to drink a coffee.')+EX('Was möchten Sie? – Ich möchte einen Kuchen.','What would you like? – I would like a cake.'),
  q:['o: Ich möchte einen Kaffee trinken.|I would like to drink a coffee.']},
 {k:'sum', h:'Summary', html: TIP('möchte, möchtest, möchte, möchten, möchtet, möchten · second verb at the end.')}
]});

addGuide({id:'akkusativ', ch:'lektion3', icon:'🎯', title:'The accusative case (Akkusativ)', goal:'Use den / einen / keinen, mich / dich / ihn and durch, für, gegen, ohne, um.',
 links:{pages:['L13','L14','L15','L17'], topic:'akkusativ', drills:['akk','akkpron','akkprep']}, steps:[
 {k:'def', h:'1. What is the accusative?', html:`<p>The <b>accusative</b> is the case of the <b>direct object</b> — the person or thing that directly <b>receives the action</b> of the verb.</p>`+EX('Ich sehe den Mann.','I see the man. (Whom do I see? → den Mann = accusative)')+EX('Der Mann sieht mich.','The man sees me. (der Mann = subject, nominative)')+TIP('English shows who does what by word order. German shows it by changing the <b>article</b>.'),
  q:['m: In „Ich kaufe den Tisch“, which part is the accusative object?|den Tisch|Ich|kaufe','m: The accusative answers the question …|Wen? / Was? (whom / what)|Wer? (who)']},
 {k:'use', h:'2. When do we use it?', html:`<ol><li>For the <b>direct object</b> of most verbs: haben, kaufen, sehen, trinken, essen, brauchen, finden, lesen, besuchen, möchten …</li><li>After the prepositions <b>durch, für, gegen, ohne, um</b> (memory trick: <b>DOGFU</b>).</li><li>After <b>es gibt</b> (there is): Es gibt einen Park.</li></ol>`+TIP('Ask after the verb: <b>Wen?</b> (whom) or <b>Was?</b> (what). The answer is accusative. <b>Wer?</b> (who) = subject = nominative.'),
  q:['m: „Ich ___ einen Hund.“ — which verb takes an accusative object?|habe|bin','m: Which preposition takes the accusative?|für|mit|aus']},
 {k:'rules', h:'3. The rule: only masculine changes', html: TBL(['','masculine','feminine','neuter','plural'],[['~Nominative','der / ein / kein','die / eine / keine','das / ein / kein','die / — / keine'],['~Accusative','<b>den / einen / keinen</b>','die / eine / keine','das / ein / kein','die / — / keine']])+TIP('Only <b>der</b>-words change: der → den, ein → einen, kein → keinen, mein → meinen. Feminine, neuter and plural stay the same.'),
  q:['f: Ich habe [einen] Hund. (der Hund)','f: Er kauft [den] Tisch. (der Tisch)','f: Ich trinke [eine] Limonade. (die Limonade)','f: Wir buchen [ein] Hotel. (das Hotel)','f: Ich habe [keinen] Bruder. (der Bruder)']},
 {k:'how', h:'4. Step by step', html:`<ol><li>Find the verb and ask <b>Wen? / Was?</b> → that noun is the object.</li><li>Check its gender: der, die or das?</li><li>Only if it is <b>masculine</b>: der → den, ein → einen, kein → keinen.</li><li>Feminine, neuter, plural: no change.</li></ol>`+EX('Ich brauche ___ Computer. → der Computer → Ich brauche den Computer.','I need the computer.')+EX('Ich brauche ___ Tasche. → die Tasche → Ich brauche die Tasche.','I need the bag (no change).'),
  q:['f: Ich brauche [den] Wecker. (der Wecker)','f: Ich brauche [die] Kreditkarte. (die Kreditkarte)','f: Walter kauft [einen] Salat. (der Salat)','f: Walter kauft [ein] Schwarzbrot. (das Schwarzbrot)']},
 {k:'rules', h:'5. Personal pronouns in the accusative', html: TBL(['Nominative','Accusative','English'],[['ich','<b>mich</b>','~me'],['du','<b>dich</b>','~you'],['er','<b>ihn</b>','~him / it'],['sie','sie','~her / it'],['es','es','~it'],['wir','<b>uns</b>','~us'],['ihr','<b>euch</b>','~you all'],['sie / Sie','sie / Sie','~them / you']])+EX('Kennst du Peter? – Ja, ich kenne ihn.','Do you know Peter? – Yes, I know him.')+EX('Isst du den Kuchen? – Ja, ich esse ihn.','Are you eating the cake? – Yes, I am eating it.'),
  q:['f: Kennst du Peter? – Ja, ich kenne [ihn].','f: Siehst du Maria? – Ja, ich sehe [sie].','f: Liebst du mich? – Ja, ich liebe [dich].','f: Kaufst du das Buch? – Ja, ich kaufe [es].']},
 {k:'rules', h:'6. Accusative prepositions: DOGFU', html: TBL(['Preposition','Meaning','Example'],[['durch','~through','Wir gehen durch den Park.'],['ohne','~without','Ich trinke Kaffee ohne Zucker.'],['gegen','~against','Er spielt gegen den Freund.'],['für','~for','Das Geschenk ist für dich.'],['um','~around / at (time)','Der Kurs beginnt um 18 Uhr.']]),
  q:['f: Das Geschenk ist für [den] Bruder.','f: Wir gehen durch [die] Stadt.','f: Das ist für [mich]. (ich)','m: Which word means „without“?|ohne|um|durch']},
 {k:'ex', h:'7. Examples', html: EX('Ich habe einen Hund.','I have a dog.')+EX('Er kauft den Tisch.','He is buying the table.')+EX('Ich trinke eine Limonade.','I am drinking a lemonade.')+EX('Sie sieht die Frau.','She sees the woman.')+EX('Wir buchen ein Hotel.','We are booking a hotel.')+EX('Ich lese das Buch.','I am reading the book.')+EX('Ich möchte einen Kaffee.','I would like a coffee.')},
 {k:'mistakes', h:'8. Common mistakes', html:`<ul><li>Using den for every noun: <s>den Tasche</s> → <b>die</b> Tasche, <s>den Buch</s> → <b>das</b> Buch.</li><li>Changing the subject: <s>Den Lehrer fragt.</s> → <b>Der</b> Lehrer fragt. (who asks? → nominative)</li><li>After sein there is NO accusative: Das ist <b>ein</b> Hund (not einen).</li></ul>`,
  q:['m: Which is correct?|Das ist ein Hund.|Das ist einen Hund.','m: Which is correct?|Ich lese das Buch.|Ich lese den Buch.']},
 {k:'sum', h:'9. Summary', html: TIP('Accusative = direct object (Wen? Was?) + after DOGFU. Only masculine changes: den, einen, keinen, meinen · pronouns: mich, dich, ihn, uns, euch.')}
]});

addGuide({id:'war', ch:'lektion3', icon:'🏙️', title:'war — the past of sein', goal:'Say where you were.',
 links:{topic:'stadt'}, steps:[
 {k:'rules', h:'The forms', html: TBL(['Person','sein (now)','sein (past)'],[['ich','bin','war'],['du','bist','warst'],['er / sie / es','ist','war'],['wir','sind','waren'],['ihr','seid','wart'],['sie / Sie','sind','waren']]),
  q:['f: Gestern [war] ich in Frankfurt.','f: [Warst] du schon mal in München?','f: Wir [waren] im Kino.']},
 {k:'ex', h:'Examples', html: EX('Heute bin ich in Frankfurt. – Gestern war ich in Frankfurt.','Today I am in Frankfurt. – Yesterday I was in Frankfurt.')+EX('Warst du schon mal in München? – Ja, da war ich schon.','Have you ever been to Munich? – Yes, I have.')},
 {k:'sum', h:'Summary', html: TIP('war, warst, war, waren, wart, waren.')}
]});

/* ===================== LEKTION 4 ===================== */
addGuide({id:'separable', ch:'lektion4', icon:'✂️', title:'Separable & inseparable verbs', goal:'Send the prefix to the end.',
 links:{pages:['L05','L06'], topic:'separable', drills:['conj-sep','sepq']}, steps:[
 {k:'def', h:'What is it?', html:`<p>Some verbs have a <b>prefix</b> that breaks off and goes to the <b>end</b> of the sentence: auf|stehen → Ich stehe um 7 Uhr <b>auf</b>.</p>`},
 {k:'rules', h:'The rules', html: TBL(['Type','Prefixes','Example'],[['~separable','ab, an, auf, aus, ein, mit, vor, zu, zurück, fern, um …','Ich kaufe ein. Er ruft an.'],['~inseparable','be-, emp-, ent-, er-, ge-, miss-, ver-, zer-','Ich bezahle. Ich verstehe.']]),
  q:['f: Ich [stehe] um 7 Uhr [auf]. (aufstehen)','f: Wir [kaufen] im Supermarkt [ein]. (einkaufen)','m: bezahlen — is it separable?|no (be- stays)|yes']},
 {k:'how', h:'Step by step', html:`<ol><li>Split the verb: an | rufen.</li><li>Conjugate the base verb in position 2: ich <b>rufe</b>.</li><li>Put the prefix at the very end: … meine Mutter <b>an</b>.</li></ol>`+EX('Ich rufe meine Mutter an.','I call my mother.')+EX('Siehst du fern?','Are you watching TV?'),
  q:['o: Ich rufe meine Mutter an.|I call my mother.','o: Siehst du heute fern?|Are you watching TV today?']},
 {k:'mistakes', h:'Common mistakes', html:`<ul><li><s>Fernsiehst du?</s> → <b>Siehst</b> du <b>fern</b>?</li><li><s>Wir einkaufen.</s> → Wir <b>kaufen</b> … <b>ein</b>.</li></ul>`},
 {k:'sum', h:'Summary', html: TIP('Separable: verb 2nd, prefix at the end · be-/ver-/er-/ge-/ent-/emp-/zer- never separate.')}
]});

/* ===================== DATIV (6.1 – 6.2) ===================== */
addGuide({id:'dativ', ch:'dativ', icon:'🎁', title:'The dative case (Dativ)', goal:'Use dem / der / dem / den, einem / einer, the dative verbs and mir, dir, ihm, ihr, uns, euch, ihnen.',
 links:{pages:['L18','L19'], topic:'pr-dativ', drills:['p6-art','p6-verb','p6-gehoert','p6-pron','p6-wem','p6-case']}, steps:[
 {k:'def', h:'1. What is the dative?', html:`<p>The <b>dative</b> is the third case. It answers the question <b>Wem?</b> (to whom? / for whom?). The dative object is usually the <b>person</b> who receives something or to whom something happens.</p>`+EX('Ich danke dem Großvater.','I thank my grandfather. (Wem danke ich? → dem Großvater)')+EX('Das Buch gehört dem Lehrer.','The book belongs to the teacher. (Wem gehört das Buch? → dem Lehrer)')+TIP('Wer? → Nominativ · Wen? / Was? → Akkusativ · <b>Wem?</b> → Dativ'),
  q:['m: The dative answers the question …|Wem? (to whom)|Wen? (whom)|Wer? (who)','m: In „Ich helfe dem Kind“, which part is the dative?|dem Kind|Ich|helfe']},
 {k:'use', h:'2. When do we use it?', html:`<ol><li>After verbs that always take the dative: <b>helfen, danken, antworten, glauben, gratulieren, vertrauen, verzeihen, zuhören</b>.</li><li>With a thing as the subject and a person in the dative: <b>gehören, schmecken, gefallen, passen</b>.</li></ol>`+EX('Du hilfst dem Onkel.','You help the uncle.')+EX('Das Eis schmeckt den Kindern.','The children like the ice cream.')+EX('Die Musik gefällt der Studentin.','The student likes the music.'),
  q:['m: Which verb takes the dative?|helfen|sehen|kaufen','m: Which verb takes the dative?|gefallen|lesen|besuchen']},
 {k:'rules', h:'3. The articles in the dative', html: TBL(['','masculine','feminine','neuter','plural'],[['~Nominativ','der / ein','die / eine','das / ein','die'],['~Akkusativ','den / einen','die / eine','das / ein','die'],['~Dativ','<b>dem / einem</b>','<b>der / einer</b>','<b>dem / einem</b>','<b>den</b> + noun-<b>n</b>']])+TIP('Memory trick: <b>dem – der – dem – den</b>. In the plural the noun gets an extra <b>-n</b>: den Kinder<b>n</b>, den Leute<b>n</b>, den Gäste<b>n</b> (not if it already ends in -n or -s: den Frauen, den Autos). kein / mein work the same: keinem, keiner · meinem, meiner, meinen.'),
  q:['f: Ich danke [dem] Großvater. (der Großvater)','f: Du antwortest [der] Reporterin. (die Reporterin)','f: Er hilft [dem] Mädchen. (das Mädchen)','f: Wir helfen [den] Leuten. (die Leute)','f: Du antwortest [einer] Journalistin. (eine Journalistin)']},
 {k:'rules', h:'4. Personal pronouns in the dative', html: TBL(['','ich','du','er','sie','es','wir','ihr','sie, Sie'],[['~Nominativ','ich','du','er','sie','es','wir','ihr','sie, Sie'],['~Akkusativ','mich','dich','ihn','sie','es','uns','euch','sie, Sie'],['~Dativ','<b>mir</b>','<b>dir</b>','<b>ihm</b>','<b>ihr</b>','<b>ihm</b>','<b>uns</b>','<b>euch</b>','<b>ihnen, Ihnen</b>']])+EX('Hört Maria Robert zu? – Ja, sie hört ihm zu.','Is Maria listening to Robert? – Yes, she is listening to him.')+EX('Glaubst du mir? – Ja, ich glaube dir.','Do you believe me? – Yes, I believe you.'),
  q:['f: Hilfst du Paul? – Ja, ich helfe [ihm].','f: Glaubst du Maria? – Nein, ich glaube [ihr] nicht.','f: Dankst du den Leuten? – Ja, ich danke [ihnen].','f: Glaubst du uns? – Ja, ich glaube [euch].']},
 {k:'how', h:'5. Step by step', html:`<ol><li>Find the verb. Is it a <b>dative verb</b> (helfen, danken, gehören, gefallen …)?</li><li>Ask <b>Wem?</b> → that person is the dative object.</li><li>Check the gender: der → <b>dem</b>, die → <b>der</b>, das → <b>dem</b>, die (plural) → <b>den</b> + -n.</li><li>Already known person? Use the pronoun: dem Peter → <b>ihm</b>, der Maria → <b>ihr</b>, den Leuten → <b>ihnen</b>.</li><li>Word order: the verb stays in position 2. The dative can come first: <b>Dem Onkel</b> gehört das Haus.</li></ol>`+TBL(['Sentence','Order'],[['Der Film gefällt dir.','~subject – verb – dative'],['Dir gefällt der Film.','~dative – verb – subject'],['Gefällt dir der Film?','~verb – dative pronoun – subject (pronoun before noun)'],['Gefällt er dir?','~verb – subject pronoun – dative pronoun']]),
  q:['o: Dem Onkel gehört das Haus.|The house belongs to the uncle (dative first).','o: Gefällt dir der Film?|Do you like the film?','f: Wem gehört das Haus? – [Dem] Onkel gehört [es].']},
 {k:'ex', h:'6. Examples', html: EX('Paul antwortet dem Professor.','Paul answers the professor.')+EX('Er dankt der Tante.','He thanks the aunt.')+EX('Der Student hört der Professorin zu.','The student listens to the professor.')+EX('Die Jacke passt dem Mädchen.','The jacket fits the girl.')+EX('Schmeckt Maria der Wein? – Ja, er schmeckt ihr ziemlich gut.','Does Maria like the wine? – Yes, she likes it quite a lot.')+EX('Wem gehört der Rucksack? – Der Touristin gehört er.','Whom does the backpack belong to? – It belongs to the tourist.')+EX('Wie geht es Ihnen?','How are you? (formal)')},
 {k:'mistakes', h:'7. Common mistakes', html:`<ul><li>Accusative after a dative verb: <s>Ich helfe dich.</s> → Ich helfe <b>dir</b>. <s>Ich danke den Lehrer.</s> → Ich danke <b>dem</b> Lehrer.</li><li>Forgetting the plural -n: <s>den Kinder</s> → den Kinder<b>n</b>.</li><li>Feminine: <s>dem Tante</s> → <b>der</b> Tante.</li><li>Wrong verb form with a plural subject: <s>Die Bücher gehört …</s> → Die Bücher <b>gehören</b> den Studenten.</li><li>Mixing up ihm / ihr: <b>ihm</b> = him / it (er, es), <b>ihr</b> = her (sie).</li></ul>`,
  q:['m: Which is correct?|Ich helfe dir.|Ich helfe dich.','m: Which is correct?|Das Eis schmeckt den Kindern.|Das Eis schmeckt den Kinder.','m: Which is correct?|Er dankt der Tante.|Er dankt dem Tante.']},
 {k:'sum', h:'8. Summary', html: TIP('Dativ = <b>Wem?</b> · dem / der / dem / den + -n · einem / einer / einem · helfen, danken, antworten, glauben, gratulieren, vertrauen, verzeihen, zuhören · gehören, schmecken, gefallen, passen · mir, dir, ihm, ihr, ihm, uns, euch, ihnen / Ihnen.')+`<div class="row"><a class="btn go" href="#/t/pr-dativ">🏋️ Practise the dative</a></div>`}
]});

addGuide({id:'cases', ch:'dativ', icon:'🎯', title:'Nominativ, Akkusativ, Dativ: who does what?', goal:'Find the doer, the thing and the person in any sentence and choose der / den / dem.',
 links:{pages:['L20','L17','L18'], topic:'pr-cases', drills:['p-cases','p6-case','akk']}, steps:[
 {k:'def', h:'1. What are the cases?', html:`<p>German shows the <b>job</b> of a noun in the sentence with the article. There are three cases at A1:</p>`+TBL(['Case','Question','Simple word'],[['Nominativ','Wer? (who?)','~the doer'],['Akkusativ','Wen? / Was? (whom / what?)','~the thing the action is done to directly'],['Dativ','Wem? (to / for whom?)','~the person at the other end — who gets something']])+EX('Ich gebe meiner Mutter ein Geschenk.','I give my mother a present. (ich = doer · ein Geschenk = thing · meiner Mutter = person)'),
  q:['m: In „Der Mann gibt dem Kind einen Apfel“, who is the doer?|der Mann|dem Kind|einen Apfel','m: Which question finds the dative?|Wem?|Wer?|Wen?']},
 {k:'use', h:'2. When is it Akkusativ, when Dativ?', html:`<ul><li><b>Akkusativ</b>: the direct object of most verbs (haben, kaufen, sehen, kennen, fragen, trinken …) and after <b>durch, für, gegen, ohne, um</b>.</li><li><b>Dativ</b>: the person after <b>helfen, danken, antworten, glauben, gehören, gefallen, schmecken …</b> and after <b>aus, bei, mit, nach, seit, von, zu, gegenüber</b>.</li><li>After <b>sein</b>: only Nominativ (Das ist ein Hund).</li></ul>`+TIP('Test: can you say „<b>to</b> / <b>for</b> someone“ in English? → Dativ. I help (to) the man → dem Mann. I see the man → den Mann.'),
  q:['m: Ich frage ___ Lehrer.|den|dem|der','m: Ich antworte ___ Lehrer.|dem|den|der']},
 {k:'rules', h:'3. What changes?', html: TBL(['','masculine','feminine','neuter','plural'],[['~Nominativ','der / ein','die / eine','das / ein','die'],['~Akkusativ','<b>den / einen</b>','die / eine','das / ein','die'],['~Dativ','<b>dem / einem</b>','<b>der / einer</b>','<b>dem / einem</b>','<b>den</b> + -n']])+TBL(['','ich','du','er','sie','es','wir','ihr','sie, Sie'],[['~Akkusativ','mich','dich','ihn','sie','es','uns','euch','sie, Sie'],['~Dativ','mir','dir','ihm','ihr','ihm','uns','euch','ihnen, Ihnen']])+TIP('Nominativ: change nothing · Akkusativ: only masculine · Dativ: everything.'),
  q:['f: Ich habe [einen] Bruder. (ein)','f: Ich helfe [dem] Bruder. (der)','f: [Der] Bruder hilft mir. (der)']},
 {k:'how', h:'4. Step by step', html:`<ol><li>Find the <b>verb</b> (position 2).</li><li>Ask <b>Wer?</b> — the doer is Nominativ; it matches the verb ending (ich <b>habe</b>, wir <b>kaufen</b>).</li><li>Ask <b>Wen? / Was?</b> → Akkusativ, or <b>Wem?</b> → Dativ.</li><li>Find the gender (der, die, das) — the last word of a compound decides.</li><li>Change the article only where the table says.</li></ol>`+EX('Der Lehrer fragt die Studentin.','The teacher asks the student. (Wer fragt? der Lehrer)')+EX('Die Studentin fragt den Lehrer.','The student asks the teacher. (Wen fragt sie? den Lehrer)'),
  q:['f: [Der] Hund sieht die Katze. (der)','f: Die Katze sieht [den] Hund. (der)','f: Das Kind antwortet [dem] Mann. (der)']},
 {k:'ex', h:'5. Examples', html: EX('Ich habe einen Bruder.','I have a brother.')+EX('Wir kaufen den Tisch.','We are buying the table.')+EX('Ich trinke eine Limonade.','I am drinking a lemonade.')+EX('Das ist ein Computer.','That is a computer.')+EX('Kennst du Peter? – Ja, ich kenne ihn.','Do you know Peter? – Yes, I know him.')+EX('Hilfst du Peter? – Ja, ich helfe ihm.','Are you helping Peter? – Yes, I am helping him.')},
 {k:'mistakes', h:'6. Common mistakes', html:`<ul><li><s>Das ist einen Hund.</s> → Das ist <b>ein</b> Hund (sein = no accusative).</li><li><s>Den Lehrer fragt die Studentin</s> when the teacher asks → <b>Der</b> Lehrer fragt …</li><li><s>Ich helfe dich.</s> → Ich helfe <b>dir</b>.</li><li><s>den Buch</s> → <b>das</b> Buch (only masculine changes in the accusative).</li></ul>`,
  q:['m: Which is correct?|Das ist ein Hund.|Das ist einen Hund.','m: Which is correct?|Ich helfe dir.|Ich helfe dich.']},
 {k:'sum', h:'7. Summary', html: TIP('Wer? → Nominativ (doer, no change) · Wen? / Was? → Akkusativ (den, einen, mich, dich, ihn) · Wem? → Dativ (dem, der, dem, den + -n, mir, dir, ihm, ihr).')+`<div class="row"><a class="btn go" href="#/t/pr-cases">🏋️ Practise the three cases</a></div>`}
]});

addGuide({id:'dprep', ch:'dativ', icon:'🧭', title:'Prepositions with the dative (7.3)', goal:'Use aus, bei, mit, nach, seit, von, zu, gegenüber with dem / der / den and beim, vom, zum, zur.',
 links:{pages:['L21'], topic:'pr-dprep', drills:['p7-art','p7-prep','p7-pron']}, steps:[
 {k:'def', h:'1. What are dative prepositions?', html:`<p>Eight small words are <b>always</b> followed by the dative: <b>aus, bei, mit, nach, seit, von, zu, gegenüber</b>.</p>`+EX('Ich fahre mit dem Auto.','I go by car.')+EX('Ich wohne seit einem Jahr in Bischkek.','I have been living in Bishkek for a year.'),
  q:['m: Which preposition takes the dative?|mit|für|durch','m: Which preposition takes the dative?|seit|ohne|um']},
 {k:'use', h:'2. What does each one mean?', html: TBL(['Präposition','English','Example'],[['aus','~from, out of, made of','aus Spanien · aus dem Haus · aus Glas'],['bei','~at someone\'s, near, during','bei meinen Eltern · bei Hamburg · bei Regen'],['mit','~with, by','mit dir · mit dem Auto · mit einem Messer'],['nach','~to (city / country), after','nach Köln · nach dem Konzert'],['seit','~since, for','seit einem Jahr'],['von','~from, by','von der Post · von einem Freund'],['zu','~to (people / places)','zu Paul · zum Bahnhof · zu Hause'],['gegenüber','~opposite (after the noun)','dem Hotel gegenüber']]),
  q:['f: Diese Tomaten kommen [aus] Spanien.','f: Ich wohne [seit] drei Monaten in Passau.','f: Sie fährt [mit] dem Taxi nach Hause.']},
 {k:'rules', h:'3. The rules', html: TBL(['','masculine','feminine','neuter','plural'],[['~after the preposition','<b>dem / einem</b>','<b>der / einer</b>','<b>dem / einem</b>','<b>den</b> + -n']])+TBL(['Short form','=','Example'],[['beim','bei dem','beim Arzt'],['vom','von dem','vom Flughafen'],['zum','zu dem','zum Bahnhof'],['zur','zu der','zur Post']])+TIP('<b>nach</b> + city / country / Hause (going) · <b>zu</b> + person / place · <b>zu Hause</b> = at home.'),
  q:['f: Ich bringe dich [zum] Bahnhof.','f: Ich gehe [zur] Post.','f: Kannst du mich [vom] Flughafen abholen?']},
 {k:'how', h:'4. Step by step', html:`<ol><li>See one of the 8 prepositions → the next noun is <b>Dativ</b>.</li><li>Find the gender: der → <b>dem</b>, die → <b>der</b>, das → <b>dem</b>, die (pl) → <b>den</b> + -n.</li><li>Check for a short form: zu dem → <b>zum</b>, zu der → <b>zur</b>, von dem → <b>vom</b>, bei dem → <b>beim</b>.</li><li>A pronoun? Use the dative pronoun: zu <b>ihm</b>, mit <b>ihr</b>, bei <b>ihnen</b>.</li></ol>`+EX('Gehst du zu Klaus? – Nein, ich gehe nicht zu ihm.','Are you going to Klaus? – No, I am not going to him.'),
  q:['f: Paul fährt mit d[em] Taxi nach Hause.','f: Eva arbeitet seit ein[er] Woche in Bonn.','f: Wohnst du bei deinen Eltern? – Nein, ich wohne nicht bei [ihnen].']},
 {k:'ex', h:'5. Examples', html: EX('Ich hole das Paket von der Post ab.','I pick up the parcel from the post office.')+EX('Peter wohnt bei den Eltern.','Peter lives with his parents.')+EX('Nach der Arbeit besucht er Maria.','After work he visits Maria.')+EX('Das Hotel liegt dem Bahnhof gegenüber.','The hotel is opposite the station.')+EX('Bei Regen mag ich nicht joggen.','I don\'t like jogging when it rains.')+EX('Von wem ist das Geschenk?','Who is the present from?')},
 {k:'mistakes', h:'6. Common mistakes', html:`<ul><li><s>mit den Auto</s> → mit <b>dem</b> Auto (dative, not accusative).</li><li><s>zu Italien</s> → <b>nach</b> Italien (countries and cities → nach).</li><li><s>Ich gehe zu Hause</s> → Ich gehe <b>nach</b> Hause (going) · Ich bin <b>zu</b> Hause (at home).</li><li><s>gegenüber dem Hotel</s> is possible, but the book puts it after: dem Hotel <b>gegenüber</b>.</li><li><s>mit die Kinder</s> → mit <b>den Kindern</b> (+ -n).</li></ul>`,
  q:['m: Which is correct?|mit dem Auto|mit den Auto|mit das Auto','m: Which is correct?|Ich fahre nach Italien.|Ich fahre zu Italien.']},
 {k:'sum', h:'7. Summary', html: TIP('aus · bei · mit · nach · seit · von · zu · gegenüber → always Dativ: dem / der / dem / den + -n · beim, vom, zum, zur · zu ihm, mit ihr, bei ihnen.')+`<div class="row"><a class="btn go" href="#/t/pr-dprep">🏋️ Practise the dative prepositions</a></div>`}
]});

/* ===================== VERBS ===================== */
addGuide({id:'strongverbs', ch:'verben', icon:'💪', title:'Strong verbs: a→ä, e→i, e→ie, au→äu', goal:'Change the vowel for du and er/sie/es.',
 links:{pages:['L04','L16'], topic:'strong', drills:['vpres','conj-strong']}, steps:[
 {k:'def', h:'What is it?', html:`<p>Some verbs change their <b>vowel</b> in the present tense — but <b>only for du and er / sie / es</b>.</p>`},
 {k:'rules', h:'The four groups', html: TBL(['Change','Verbs','du','er / sie / es'],[['a → ä','fahren, schlafen, tragen, waschen, halten, braten','fährst','fährt'],['e → i','essen, geben, helfen, nehmen, sprechen, treffen','gibst','gibt'],['e → ie','lesen, sehen','liest','liest'],['au → äu','laufen','läufst','läuft']]),
  q:['f: du [fährst] (fahren)','f: er [isst] (essen)','f: sie [liest] (lesen)','f: er [läuft] (laufen)','f: du [nimmst] (nehmen)']},
 {k:'how', h:'Step by step', html:`<ol><li>Is the subject du or er/sie/es? If not → normal forms (ich fahre, wir fahren, ihr fahrt).</li><li>Change the vowel: a→ä, e→i, e→ie, au→äu.</li><li>Add the normal ending.</li></ol>`+EX('Ich schlafe 8 Stunden. Du schläfst 7 Stunden.','I sleep 8 hours. You sleep 7 hours.')+EX('Ich helfe dir. Du hilfst mir.','I help you. You help me.'),
  q:['m: ihr ___ (fahren)|fahrt|fährt']},
 {k:'mistakes', h:'Common mistakes', html:`<ul><li>Changing ich or ihr: <s>ich fähre</s>, <s>ihr fährt</s>.</li><li>halten: du hältst, er <b>hält</b> (no extra -et).</li></ul>`},
 {k:'sum', h:'Summary', html: TIP('Only du and er/sie/es change the vowel: fährst/fährt · isst · liest · läuft.')}
]});

addGuide({id:'threeforms', ch:'verben', icon:'🔤', title:'The 3 verb forms (Infinitiv · Präteritum · Partizip II)', goal:'Know 1st, 2nd and 3rd form of every verb.',
 links:{pages:['L16'], drills:['vforms']}, steps:[
 {k:'def', h:'What is it?', html:`<p>Every verb has three main forms: <b>1st</b> Infinitiv (fahren), <b>2nd</b> Präteritum (fuhr), <b>3rd</b> Partizip II (gefahren). The 3rd form makes the spoken past (Perfekt) with <b>hat</b> or <b>ist</b>.</p>`},
 {k:'rules', h:'Weak and strong verbs', html: TBL(['Type','1st','2nd','3rd'],[['~weak','machen','machte','hat gemacht'],['~weak -t stem','arbeiten','arbeitete','hat gearbeitet'],['~-ieren','studieren','studierte','hat studiert'],['~be-/ver-','bezahlen','bezahlte','hat bezahlt'],['~separable','abholen','holte … ab','hat abgeholt'],['~strong','fahren','fuhr','ist gefahren'],['~strong','sehen','sah','hat gesehen'],['~irregular','sein','war','ist gewesen']]),
  q:['f: machen → 3rd form: hat [gemacht]','f: fahren → 2nd form: er [fuhr]','m: bezahlen → 3rd form|hat bezahlt|hat gebezahlt']},
 {k:'how', h:'hat or ist?', html:`<p><b>ist</b> for movement or change (gehen, fahren, kommen, fliegen, aufstehen) and sein / bleiben; <b>hat</b> for almost everything else.</p>`+EX('Ich bin nach Berlin gefahren.','I went to Berlin.')+EX('Ich habe Pizza gegessen.','I ate pizza.'),
  q:['m: Ich ___ nach Hause gegangen.|bin|habe','m: Ich ___ Kaffee getrunken.|habe|bin']},
 {k:'sum', h:'Summary', html: TIP('weak: -te / ge-…-t · strong: vowel change, -en · ist for movement, hat for the rest. All verbs: Verbs tab.')}
]});

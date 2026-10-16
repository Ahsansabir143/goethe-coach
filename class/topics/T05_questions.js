/* Topic 5 — personal pronouns, word order, W-questions, yes/no questions */
TOPICS.push({id:'questions', icon:'❓', title:'Pronouns, word order & questions', d:'ich/du/er… · verb in position 2 · Wer? Was? Wo? Woher? Wohin? · Ja / Nein / Doch', src:'SK1 1.2, 1.3 · Spektrum L1 Ü6, Ü8, Ü9, T2', lessons:['L08','L09'], lessonSets:['L08:2','L09:0','L09:1'],
gens:['pron','wq','yesno','wohin','ctx'],
learn:[
{h:'Personal pronouns (SK1 1.2)', html: TBL(['','',''],[['ich','~I','Ich trinke Limonade.'],['du','~you (one friend)','Du trinkst Kaffee.'],['er (Carlos)','~he','Er trinkt Cola.'],['sie (Maria)','~she','Sie trinkt Mineralwasser.'],['es (das Mädchen)','~it','Es trinkt Apfelsaft.'],['wir (Peter und ich)','~we','Wir trinken Tee.'],['ihr (Maria und du)','~you (several friends)','Ihr trinkt Orangensaft.'],['sie (Paul und Lisa)','~they','Sie trinken Milch.'],['Sie','~you (formal)','Trinken Sie Kaffee?']])},
{h:'Word order (SK1 1.3)', html: TBL(['Type','Position 1','Position 2','Rest'],[['Aussagesatz','Maria','kommt','aus Rom.'],['Aussagesatz','Aus Rom','kommt','Maria.'],['W-Frage','Woher','kommt','Maria?'],['Ja/Nein-Frage','Kommt','Maria','aus Rom?']])+TIP('The verb is ALWAYS in position 2 in a statement and a W-question. In a yes/no question the verb is in position 1.')},
{h:'wo? · wohin? · woher?', html: TBL(['Question','Answer'],[['Wo bist du?','in Ägypten · zu Hause'],['Wohin gehst du? (Wo gehst du hin?)','nach Ägypten · nach Hause'],['Woher kommst du? (Wo kommst du her?)','aus Ägypten · von zu Hause']])},
{h:'Ja – Nein – Doch', html: EX('Studierst du? – Ja, ich studiere.','')+EX('Und du? Studierst du auch? – Nein, ich studiere nicht.','')+EX('Studierst du nicht? – Doch, ich studiere.','Doch = yes, after a negative question')+EX('Und du? Studierst du nicht? – Nein, ich studiere nicht.','')}
],
sets:[
{title:'SK1 1.2 Übung 1: Ja, er hört Musik.', src:'Aber Hallo! A1, S. 4', shuffle:false, items:[
 "f:Carlos – hören – Musik: [Hört] Carlos Musik? – Ja, [er] [hört] Musik.","f:a) Frau Weiß – arbeiten: [Arbeitet] Frau Weiß? – Ja, [sie] [arbeitet].","f:b) Peter – reden: [Redet] Peter? – Ja, [er] [redet].","f:c) ihr – lernen: [Lernt] ihr? – Ja, [wir] [lernen].","f:d) du – studieren: [Studierst] du? – Ja, [ich] [studiere].","f:e) ihr – trinken – Saft: [Trinkt] ihr Saft? – Ja, [wir] [trinken] Saft.","f:f) Eva und Lisa – tanzen: [Tanzen] Eva und Lisa? – Ja, [sie] [tanzen]."
]},
{title:'SK1 1.2 Übung 2–4: pronouns', src:'Aber Hallo! A1, S. 4', shuffle:false, items:[
 "f:a) Du lernst doch Deutsch, oder? – Ja, [ich] lerne Deutsch.","f:b) Du gehst doch jetzt nach Hause, oder? – Ja, [ich] [gehe] nach Hause.","f:c) Carlos lernt doch auch Deutsch, oder? – Ja, [er] [lernt] auch Deutsch.","f:d) Maria kommt doch aus Italien, oder? – Ja, [sie] [kommt] aus Italien.","f:e) Ihr studiert doch in München, oder? – Ja, [wir] [studieren] in München.","f:f) Eva und Max wohnen doch in Köln, oder? – Ja, [sie] [wohnen] in Köln.",
 "f:Herr Schneider wohn[t] in München. Er ist Lehrer.","f:Herr Schneider trinkt Wasser. [Er] trinkt kein Bier.","f:Wohnt Herr Schneider in München? – Ja, [er] [wohnt] in München.","f:Was [ist] Herr Schneider von Beruf? – [Er] [ist] Lehrer.","f:Wie heißt die Frau? – [Sie] [heißt] Frau Berg.","f:Frau Berg [wohnt] in Köln. [Sie] ist Reporterin.","f:Wo [wohnt] Frau Berg? – [Sie] [wohnt] in Köln.","f:Was ist [sie] von Beruf? – [Sie] [ist] Reporterin.",
 "f:a) Wie heißt die Studentin? – [Sie] heißt Maria.","f:b) Was trinkt Herr Klein? – [Er] trinkt Orangensaft.","f:c) Was studieren Max und Anna? – [Sie] studieren Jura.","f:d) Wo wohnt ihr? – [Wir] wohnen in Passau.","f:e) Was bist du von Beruf? – [Ich] bin Reporter."
]},
{title:'SK1 1.3 Übung 1–2: verb in position 2', src:'Aber Hallo! A1, S. 5', items:[
 "o:Morgen komme ich.|Ich komme morgen. → start with „Morgen“","o:Informatik studiert Maria.|Maria studiert Informatik. → start with „Informatik“","o:In Passau wohnst du.|Du wohnst in Passau. → start with „In Passau“","o:Saft trinken wir.|Wir trinken Saft. → start with „Saft“","o:In Passau studiert ihr.|Ihr studiert in Passau. → start with „In Passau“","o:Obst kauft Carlos.|Carlos kauft Obst. → start with „Obst“",
 "o:Musik hören wir.|wir – Musik (hören) → start with „Musik“","o:Nach Irland reisen Max und Eva.|Max und Eva – nach Irland (reisen) → start with „Nach Irland“","o:Brot kaufen wir.|wir – Brot (kaufen) → start with „Brot“","o:In München arbeitet Herr Berg.|Herr Berg – in München (arbeiten) → start with „In München“","o:Aus Ungarn kommt Dora.|Dora – aus Ungarn (kommen) → start with „Aus Ungarn“","o:Eine SMS schreibe ich.|ich – eine SMS (schreiben) → start with „Eine SMS“","o:In Wien studiert Lena.|Lena – in Wien (studieren) → start with „In Wien“","o:Zu Hause bist du.|du – zu Hause (sein) → start with „Zu Hause“",
 "f:Wir lernen Deutsch. → Deutsch [lernen] [wir].","f:Clara wohnt in Wien. → In Wien [wohnt] [Clara]."
]},
{title:'SK1 1.3 Übung 3–5: W-questions', src:'Aber Hallo! A1, S. 5–6', shuffle:false, items:[
 "f:a) [Wer] kauft Brot? – Carlos [kauft] Brot.","f:b) [Wie] heißt die Lehrerin? – Sie [heißt] Frau Lehmann.","f:c) [Was] trinkt Paul? – Paul [trinkt] Bier.","f:d) [Wer] wohnt in Passau? – Peter und Maria [wohnen] in Passau.","f:e) [Was] studiert ihr? – [Wir] studieren Jura.","f:f) [Wer] lernt Deutsch? – Wir [lernen] Deutsch.","f:g) [Wie] alt ist Thomas? – [Er] [ist] 20 Jahre alt.","f:h) [Wie] spät ist es? – Es [ist] jetzt 12:00 Uhr.",
 "f:[Was] ist das? – Das ist Käse.","f:[Wer] kauft Käse? – Peter kauft Käse.","f:[Wo] kauft Peter Käse? – Im Supermarkt.","f:[Woher] komm[t] der Käse? – Aus Frankreich.",
 "f:[Was] ist das? – Das [ist] Brot.","f:[Wer] kauf[t] Brot? – Paul und Maria kauf[en] Brot.","f:[Wo] kauf[en] Paul und Maria Brot? – Im Supermarkt.",
 "f:wo? Max wohn[t] [in] Wien. · Lisa arbeit[et] [zu] Hause. · Wir studier[en] [in] Zürich.","f:wohin? Wir reis[en] [nach] Rom. · Du flieg[st] [nach] Japan. · Jana geh[t] [nach] Hause.","f:woher? Ich komm[e] [von] [zu] Hause. · Ihr komm[t] [aus] Syrien. · Hatem komm[t] [aus] Kairo.",
 "m:___ studierst du?|Wo|Wohin|Woher ## Wo studierst du? – In München.","m:___ gehst du? (→ nach Hause)|Wohin|Wo|Woher","m:___ wohnst du?|Wo|Wohin|Woher","m:___ kommst du? (→ aus Pakistan)|Woher|Wo|Wohin","m:___ arbeitest du?|Wo|Woher|Wohin","m:___ bist du?|Wo|Wohin|Woher"
]},
{title:'SK1 1.3 Übung 6–7: yes/no questions', src:'Aber Hallo! A1, S. 7', shuffle:false, items:[
 "f:a) Fragst du Lisa? – Ja, ich [frage] Lisa.","f:b) Reist du nach Italien? – Ja, ich [reise] nach Italien.","f:c) Arbeitest du mit Hatem? – Ja, ich [arbeite] mit Hatem.","f:d) Tanzt du gern? – Ja, ich [tanze] gern.","f:e) Kaufst du Butter? – Ja, ich [kaufe] Butter.","f:f) Gehst du nach Hause? – Ja, ich [gehe] nach Hause.",
 "f:g) Studiert ihr in Wien? – Ja, [wir] [studieren] in Wien.","f:h) Lernt ihr Deutsch? – Ja, [wir] [lernen] Deutsch.","f:i) Redet ihr mit Paul? – Ja, [wir] [reden] mit Paul.","f:j) Wohnt ihr in Passau? – Ja, [wir] [wohnen] in Passau.","f:k) Fliegt ihr nach Paris? – Ja, [wir] [fliegen] nach Paris.","f:l) Seid ihr zu Hause? – Ja, [wir] [sind] zu Hause.",
 "f:Bestellst du Tee? (Kaffee) – Nein, ich [bestelle] [Kaffee].","f:a) Trinkt ihr Cola? (Orangensaft) – Nein, wir [trinken] [Orangensaft].","f:b) Arbeitest du in Berlin? (Köln) – Nein, ich [arbeite] in [Köln].","f:c) Kommt ihr aus Österreich? (Spanien) – Nein, wir [kommen] aus [Spanien].","f:d) Antwortest du? (nicht) – Nein, ich [antworte] [nicht].","f:e) Geht ihr ins Kino? (nach Hause) – Nein, wir [gehen] [nach Hause].","f:f) Kaufst du Käse? (Wurst) – Nein, ich [kaufe] [Wurst].","f:g) Studiert ihr in Wien? (Passau) – Nein, wir [studieren] in [Passau].","f:h) Fliegst du nach Tokio? (Kairo) – Nein, ich [fliege] nach [Kairo]."
]},
{title:'Spektrum L1 Ü6: Viele Fragen', src:'Spektrum S. 20', shuffle:false, items:[
 "f:Hallo! Wie heißt du? · [Woher] kommst du?","f:Sprichst [du] Englisch?","f:[Welche] Sprache lernst du?","f:[Was] machst du hier in Berlin?","f:[Wohnt] ihr auch in Wien?","f:Hört [ihr] gern Musik?","f:Welche Sprachen [sprecht] ihr?","f:Fotografiert [ihr] gern?","f:[Spielt] ihr gern Fußball?","f:Guten Tag. Wie [heißen] Sie?","f:Wohnen [Sie] auch im Hotel Merkur?","f:Was [machen] Sie hier in Wien?","f:Woher [kommen] Sie?","f:Tanzen Sie [gern]?"
]},
{title:'Spektrum L1 Ü8: Nein sagen', src:'Spektrum S. 21', shuffle:false, items:[
 "o:Spielst du gern Tennis?|du: gern Tennis spielen?","o:Nein, ich mache lieber Gymnastik.|ich: lieber Gymnastik machen",
 "o:Wohnen Sie in Helsinki?|1. Sie: in Helsinki wohnen?","o:Nein, wir wohnen in Oslo.|wir: in Oslo wohnen",
 "o:Lernt ihr Deutsch?|2. ihr: Deutsch lernen?","o:Nein, wir lernen Russisch.|wir: Russisch lernen",
 "o:Kocht Laura gern?|3. Laura: gern kochen?","o:Nein, sie macht lieber Sport.|sie: lieber Sport machen",
 "o:Spielt Oliver gern Fußball?|4. Oliver: gern Fußball spielen?","o:Nein, er schwimmt lieber.|er: lieber schwimmen",
 "o:Ist Kathrin in Deutschland?|5. Kathrin: in Deutschland sein?","o:Nein, sie ist in Amerika.|sie: in Amerika sein",
 "o:Kommen Carlo und Norbert aus Zürich?|6. Carlo und Norbert: aus Zürich kommen?","o:Nein, sie kommen aus Basel.|sie: aus Basel kommen",
 "o:Sprechen Sie Französisch?|7. Sie: Französisch sprechen?","o:Nein, ich spreche Englisch und Deutsch.|ich: Englisch und Deutsch sprechen"
]},
{title:'Spektrum L1 Ü9 & T2: question words', src:'Spektrum S. 21, 26', shuffle:false, items:[
 "f:[Wie] heißen Sie? – (Martina) Ich heiße Martina.","f:1. [Woher] kommen Sie? – (Österreich) Ich [komme] aus Österreich.","f:2. [Wo] wohnen Sie? – (Wien) Ich [wohne] in Wien.","f:3. [Welche] Sprachen sprechen Sie? – Ich [spreche] Deutsch und Englisch.","f:4. [Was] lernen Sie jetzt? – Ich [lerne] jetzt Japanisch.","f:5. [Was] machen Sie gern? – Ich [koche] und [schwimme] gern.",
 "f:T2: Guten Tag! 1. Wie heißen [Sie]?","f:2. [Woher] kommen Sie?","f:3. [Wo] wohnen Sie?","f:4. [Was] machen Sie gern?","f:5. [Hören|Machen] Sie gern Musik?","f:6. [Welche] Sprachen sprechen Sie?","f:7. [Sprechen|Lernen] Sie Deutsch?","f:8. [Spielen] Sie gern Tennis?"
]}
]
});

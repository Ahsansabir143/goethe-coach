/* Spektrum A1 Lektion 4: Telefongespräch (Aufgabe 22b) · Verben des Kapitels · word order (Satzbau) worksheet */
(function(){
const f = (q, a, x) => ({t:'fill', q, a:Array.isArray(a)?a:[a], x});
const o = (a, en, x) => ({t:'order', a, en, x});
const m = (q, opts, x) => ({t:'mcq', q, o:opts, a:0, x});
LESSONS.push({
id:'L22', date:'2026-10-27',
title:'Ein Telefongespräch · the chapter verbs · word order',
topics:['On the phone: Ich möchte bitte mit … sprechen','Ist es dringend? · Ich wiederhole …','Verben des Kapitels: anfangen, anrufen, aufstehen, dauern …','Word order: verb in position 2 · questions · separable verbs'],
summary:'A business phone call (Herr Gruber wants to speak to Frau Lustig), the 20 verbs of the chapter with example sentences, and building sentences in the right word order.',
learn:[
{h:'1. The phone call (Telefongespräch)', html: TBL(['Wer?','Deutsch','English'],[
 ['Frau Müller','Müller.','~Müller speaking.'],
 ['Herr Gruber','Ja, guten Tag, Frau Müller, hier ist Otto Gruber. Ich möchte bitte mit Frau Lustig sprechen.','~Yes, hello Mrs Müller, this is Otto Gruber. I would like to speak to Mrs Lustig, please.'],
 ['Frau Müller','Ist es dringend?','~Is it urgent?'],
 ['Herr Gruber','Ja, ich möchte eine Projektidee vorstellen. Ist es heute möglich?','~Yes, I would like to present a project idea. Is it possible today?'],
 ['Frau Müller','Also, am Vormittag hat Frau Lustig leider keine Zeit. Um 9.00 Uhr hat Frau Lustig eine Besprechung mit dem Direktor. Die Besprechung dauert zwei Stunden. Um 11.00 Uhr hat Frau Lustig eine Telefonkonferenz und um 12.30 Uhr macht sie Mittagspause.','~Well, in the morning Mrs Lustig unfortunately has no time. At 9 she has a meeting with the director. The meeting lasts two hours. At 11 she has a conference call and at 12.30 she takes her lunch break.'],
 ['Herr Gruber','Und wie ist es am Nachmittag? Hat Frau Lustig vielleicht am Nachmittag Zeit?','~And what about the afternoon? Does Mrs Lustig perhaps have time in the afternoon?'],
 ['Frau Müller','Um 13.30 Uhr schreibt Frau Lustig einen Bericht, um 14.30 Uhr telefoniert sie mit Kollegen in London und um 16.00 Uhr fährt sie nach Berlin. Sie können heute leider nicht mit Frau Lustig sprechen.','~At 13.30 Mrs Lustig writes a report, at 14.30 she phones colleagues in London and at 16.00 she goes to Berlin. Unfortunately you can\'t speak to Mrs Lustig today.'],
 ['Herr Gruber','Und morgen? Hat Frau Lustig vielleicht morgen Zeit?','~And tomorrow? Does Mrs Lustig perhaps have time tomorrow?'],
 ['Frau Müller','Morgen ist Samstag, Herr Gruber. Sie können gerne am Montag wieder anrufen. Dann ist meine Kollegin Katja Esser hier.','~Tomorrow is Saturday, Mr Gruber. You are welcome to call again on Monday. Then my colleague Katja Esser is here.'],
 ['Herr Gruber','Gut, ich rufe am Montagvormittag wieder an. Welche Telefonnummer hat Frau Esser?','~Good, I\'ll call again on Monday morning. What is Mrs Esser\'s phone number?'],
 ['Frau Müller','Moment … die Nummer von Frau Esser ist 7 63 54 26.','~One moment … Mrs Esser\'s number is 7 63 54 26.'],
 ['Herr Gruber','Ich wiederhole: 7 63 54 26.','~I\'ll repeat: 7 63 54 26.'],
 ['Frau Müller','Ja. Viel Erfolg, Herr Gruber.','~Yes. Good luck, Mr Gruber.'],
 ['Herr Gruber','Vielen Dank. Auf Wiederhören!','~Thank you very much. Goodbye! (on the phone)']])+
 TIP('On the phone you say <b>Auf Wiederhören</b> (hear you again), not „Auf Wiedersehen“ (see you again). Start with your <b>surname</b>: „Müller.“ / „Hier ist Otto Gruber.“')},
{h:'2. Useful phone phrases', html: TBL(['Deutsch','English'],[['Hier ist … / Mein Name ist …','~This is … / My name is …'],['Ich möchte bitte mit Frau Lustig sprechen.','~I would like to speak to Mrs Lustig, please.'],['Ist es dringend?','~Is it urgent?'],['Hat sie heute Zeit? – Leider nicht.','~Does she have time today? – Unfortunately not.'],['Sie können am Montag wieder anrufen.','~You can call again on Monday.'],['Welche Telefonnummer hat …?','~What is …\'s phone number?'],['Ich wiederhole: …','~I repeat: …'],['Viel Erfolg! · Vielen Dank. · Auf Wiederhören!','~Good luck! · Thanks a lot. · Goodbye!']])},
{h:'3. Verben des Kapitels (the chapter verbs)', html: TBL(['Verb','Beispielsatz','English'],[
 ['analysieren','Martina analysiert Daten.','~Martina analyses data.'],['anfangen ✂️','Wann fängt die Telekonferenz an?','~When does the conference call start?'],['anrufen ✂️','Martina ruft manchmal Kollegen an.','~Martina sometimes calls colleagues.'],['aufstehen ✂️','Er steht um 9.00 Uhr auf.','~He gets up at 9.'],['ausgehen ✂️','Abends geht Jonas aus.','~In the evening Jonas goes out.'],
 ['beginnen','Der Unterricht beginnt um 18.30 Uhr.','~The lesson starts at 18.30.'],['dauern','Das Konzert dauert zwei Stunden.','~The concert lasts two hours.'],['einkaufen ✂️','Martina kauft ein.','~Martina goes shopping.'],['fahren (a→ä)','Um 10.15 Uhr fährt Konrad nach Köln.','~At 10.15 Konrad goes to Cologne.'],['feiern','Am Wochenende feiern wir gern Partys.','~At the weekend we like to have parties.'],
 ['fernsehen ✂️ (e→ie)','Menschen in Österreich sehen durchschnittlich zwei Stunden fern.','~People in Austria watch TV for two hours on average.'],['frühstücken','Jonas frühstückt in der Universität.','~Jonas has breakfast at the university.'],['können (modal)','Ich kann gut Tennis spielen.','~I can play tennis well.'],['recherchieren','Frau Eschenbach recherchiert im Internet.','~Mrs Eschenbach does research on the internet.'],['schlafen (a→ä)','Ein Mensch schläft etwa 24 Jahre und 4 Monate.','~A person sleeps about 24 years and 4 months.'],
 ['sitzen','Von 18.00 bis 20.00 Uhr sitzt Jonas in der Bibliothek.','~From 18 to 20 Jonas sits in the library.'],['telefonieren','Wann telefonierst du mit Klaus?','~When are you phoning Klaus?'],['treiben','Viele Österreicher treiben Sport.','~Many Austrians do sport.'],['vorstellen ✂️','Otto stellt seine Projektidee vor.','~Otto presents his project idea.'],['wiederholen (not separable!)','Ich wiederhole die Telefonnummer: 9 87 53 62.','~I repeat the phone number: 9 87 53 62.']])+
 TIP('✂️ = separable: the prefix goes to the <b>end</b> (Er steht um 9 Uhr <b>auf</b>). <b>wiederholen</b> is NOT separable: ich <b>wiederhole</b>. -ieren verbs are regular: analysieren → er analysiert.')},
{h:'4. Word order (Satzbau): the rules', html: TBL(['Sentence type','Rule','Example'],[
 ['Statement','~verb in position 2','Tanja spielt sehr gern Klavier. · Am Samstag gehen meine Eltern ins Kino.'],
 ['Time / place first','~verb stays in position 2, the subject moves behind it','Am Wochenende frühstücke ich sehr lang.'],
 ['W-question','~W-word + verb + subject','Wo arbeitet dein Vater? · Wann fährt der Zug ab?'],
 ['Yes / no question','~verb in position 1','Trinkst du gern Kaffee? · Hast du am Abend Zeit?'],
 ['Separable verb','~prefix at the very end','Ich stehe jeden Tag um 8 Uhr auf. · Mein Bruder ruft mich jeden Tag an.'],
 ['Modal verb','~modal in position 2, infinitive at the end','Ich kann gut Tennis spielen.']])+
 TIP('Typical order after the verb: <b>Wann? → Wie? → Wo / Wohin?</b> (time – manner – place): Ich fahre <b>morgen mit dem Bus nach Berlin</b>.')}
],
vocab:[
 {de:'Telefongespräch', g:'n', pl:'Telefongespräche', en:'phone call'},{de:'Projektidee', g:'f', pl:'Projektideen', en:'project idea'},{de:'Besprechung', g:'f', pl:'Besprechungen', en:'meeting'},
 {de:'Direktor', g:'m', pl:'Direktoren', en:'director'},{de:'Telefonkonferenz', g:'f', pl:'Telefonkonferenzen', en:'conference call'},{de:'Mittagspause', g:'f', pl:'Mittagspausen', en:'lunch break'},
 {de:'Bericht', g:'m', pl:'Berichte', en:'report'},{de:'Kollegin', g:'f', pl:'Kolleginnen', en:'colleague (female)'},{de:'Erfolg', g:'m', pl:'Erfolge', en:'success'},
 {de:'dringend', en:'urgent'},{de:'möglich', en:'possible'},{de:'leider', en:'unfortunately'},{de:'Vormittag', g:'m', pl:'Vormittage', en:'morning (before noon)'},{de:'Nachmittag', g:'m', pl:'Nachmittage', en:'afternoon'},
 {de:'analysieren', en:'to analyse'},{de:'ausgehen', en:'to go out'},{de:'recherchieren', en:'to research'},{de:'treiben', en:'to do (sport)'},{de:'Daten', g:'pl', en:'data'},{de:'Bibliothek', g:'f', pl:'Bibliotheken', en:'library'},
 {de:'durchschnittlich', en:'on average'},{de:'Klavier', g:'n', pl:'Klaviere', en:'piano'},{de:'aufräumen', en:'to tidy up'}
],
sets:[
 {title:'Aufgabe 22b: Ergänzen Sie die Satzteile.', d:'Spektrum A1 Lektion 4 · the phone call', items:[
  f('Frau Müller: Ist es ___ (1)?','dringend','dringend = urgent'),
  f('Herr Gruber: Ja, ich möchte ___ (2). Ist es heute möglich?','eine Projektidee vorstellen','möchten + infinitive at the end'),
  f('Frau Müller: Also, am Vormittag hat Frau Lustig leider keine ___ (3).','Zeit','keine Zeit haben = to have no time'),
  f('Um 9.00 Uhr hat Frau Lustig eine Besprechung mit dem Direktor. ___ (4) zwei Stunden.','Die Besprechung dauert'),
  f('Um 11.00 Uhr hat Frau Lustig eine Telefonkonferenz und um 12.30 Uhr macht sie ___ (5).','Mittagspause'),
  f('Um 13.30 Uhr schreibt Frau Lustig ___ (6).','einen Bericht','schreiben + Akkusativ: der Bericht → einen'),
  f('… und um 16.00 Uhr fährt sie ___ (7).','nach Berlin','cities → nach'),
  f('Herr Gruber: ___ (8)? Hat Frau Lustig vielleicht morgen Zeit?','Und morgen'),
  f('Frau Müller: Sie können ___ (9) wieder anrufen.','gerne am Montag'),
  f('Herr Gruber: Gut, ich rufe am Montagvormittag wieder an. ___ (10) Frau Esser?','Welche Telefonnummer hat'),
  f('Herr Gruber: ___ (11): 7 63 54 26.','Ich wiederhole'),
  f('Frau Müller: Ja. ___ (12), Herr Gruber.','Viel Erfolg'),
  m('On the phone you end with …',['Auf Wiederhören!','Auf Wiedersehen!','Guten Appetit!'],'hören = to hear')
 ]},
 {title:'Verben des Kapitels: put the verb in the right form', d:'the 20 chapter verbs', items:[
  f('Martina ___ Daten. (analysieren)','analysiert'),f('Wann ___ die Telekonferenz ___? (anfangen)',['fängt','an'],'a → ä · separable'),f('Martina ___ manchmal Kollegen ___. (anrufen)',['ruft','an']),
  f('Er ___ um 9.00 Uhr ___. (aufstehen)',['steht','auf']),f('Abends ___ Jonas ___. (ausgehen)',['geht','aus']),f('Der Unterricht ___ um 18.30 Uhr. (beginnen)','beginnt'),
  f('Das Konzert ___ zwei Stunden. (dauern)','dauert'),f('Martina ___ ___. (einkaufen)',['kauft','ein']),f('Um 10.15 Uhr ___ Konrad nach Köln. (fahren)','fährt','a → ä'),
  f('Am Wochenende ___ wir gern Partys. (feiern)','feiern'),f('Menschen in Österreich ___ zwei Stunden ___. (fernsehen)',['sehen','fern']),f('Jonas ___ in der Universität. (frühstücken)','frühstückt'),
  f('Ich ___ gut Tennis spielen. (können)','kann','modal: ich kann'),f('Frau Eschenbach ___ im Internet. (recherchieren)','recherchiert'),f('Ein Mensch ___ etwa 24 Jahre. (schlafen)','schläft','a → ä'),
  f('Von 18 bis 20 Uhr ___ Jonas in der Bibliothek. (sitzen)','sitzt'),f('Wann ___ du mit Klaus? (telefonieren)','telefonierst'),f('Viele Österreicher ___ Sport. (treiben)','treiben'),
  f('Otto ___ seine Projektidee ___. (vorstellen)',['stellt','vor']),f('Ich ___ die Telefonnummer. (wiederholen)','wiederhole','not separable')
 ]},
 {title:'Satzbau: build the sentences', d:'worksheet m–y · verb in position 2, questions, separable verbs', items:[
  o('Wohnen Daniels Eltern in München?','Daniels / wohnen / Eltern / München / ? — Do Daniel\'s parents live in Munich?'),
  o('Trinkst du gern Kaffee?','gern / trinken / du / Kaffee / ? — Do you like drinking coffee?'),
  o('Tanja spielt sehr gern Klavier.','Tanja / Klavier / sehr gern / spielen — Tanja really likes playing the piano.'),
  o('Ich stehe jeden Tag um 8 Uhr auf.','ich / 8 Uhr / jeden Tag / aufstehen — I get up at 8 every day.'),
  o('Meine Mutter räumt am Wochenende auf.','aufräumen / Wochenende / meine Mutter — My mother tidies up at the weekend.'),
  o('Hast du am Abend Zeit?','du / Zeit / Abend / haben / ? — Do you have time in the evening?'),
  o('Am Wochenende frühstücke ich sehr lang.','Wochenende / frühstücken / sehr lang / ich — At the weekend I have a long breakfast.'),
  o('Wo arbeitet dein Vater?','dein Vater / wo / arbeiten / ? — Where does your father work?'),
  o('Meine Schwester hört gern Musik.','hören / meine Schwester / Musik / gern — My sister likes listening to music.'),
  o('Am Samstag gehen meine Eltern ins Kino.','Samstag / meine Eltern / gehen / Kino — On Saturday my parents go to the cinema.'),
  o('Wann fährt der Zug ab?','Wann / abfahren / der Zug / ? — When does the train leave?'),
  o('Mein Bruder ruft mich jeden Tag an.','anrufen / jeden Tag / mein Bruder / mich — My brother calls me every day.'),
  o('Leben Paula und Utta zusammen?','Paula / leben / und / Utta / zusammen / ? — Do Paula and Utta live together?'),
  m('Which is correct?',['Am Wochenende frühstücke ich lang.','Am Wochenende ich frühstücke lang.'],'time first → the verb stays in position 2, the subject moves behind it')
 ]}
],
drills:['p4-sep','conj-sep','sepq']
});
})();

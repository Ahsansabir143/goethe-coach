/* Topic 1 — sounds, alphabet, greetings (trial lesson + Spektrum L1 Aufgabe 1, 8, 13) */
TOPICS.push({id:'sounds', icon:'🔤', title:'Sounds, alphabet & greetings', d:'ei / ie, sch, z, w, v, ä ö ü, the alphabet, Guten Morgen … Tschüss', src:'Trial lesson · Spektrum L1 A1, A8 · L2 A13', lessons:['L01','L02'], lessonSets:['L01:2','L02:2'],
gens:['sounds','wb-mean'],
learn:[
{h:'Sounds that are different from English', html: TBL(['Letters','Sound','Examples'],[['ei','~[ai] like „eye“','mein, Zeitung, heißen'],['ie','~long [i:]','die, sieben, spielen'],['eu / äu','~[oi] like „boy“','neu, Deutsch, läuft'],['sch','~[sh]','Schule, Tasche'],['tsch','~[ch]','Deutsch, tschüss'],['z','~[ts]','zehn, tanzen'],['w','~[v]','wohnen, wie'],['v','~[f]','Vater, vier'],['j','~[y] as in yes','ja, Jahr'],['sp / st (start)','~[shp] / [sht]','spielen, Student'],['ch','~ach-sound / ich-sound','acht, Buch / ich, nicht'],['ß','~sharp s','heißen, groß']])+TIP('Spektrum L2 Aufgabe 13: <b>ei</b> = [ai] (mein, Zeitung, Schreibtisch), <b>ie</b> = [i:] (die, sieben, bedienen, viel, studieren). Rule of thumb: say the <b>second</b> letter in English — ei → „i“ (eye), ie → „e“ (ee).')},
{h:'Wichtige Wendungen im Alltag (Spektrum L1, Aufgabe 1)', html: EX('Guten Morgen!','Good morning!')+EX('Guten Tag!','Good day / Hello!')+EX('Guten Abend!','Good evening!')+EX('Gute Nacht!','Good night!')+EX('Hallo! – Tschüss!','Hello! – Bye!')+EX('Auf Wiedersehen!','Goodbye!')+EX('Bitte. – Danke.','Please / You\'re welcome. – Thank you.')+EX('Guten Appetit!','Enjoy your meal!')+TIP('Austria: Grüß Gott! · Servus! — Switzerland: Grüezi! · Salü! · Adieu!')}
],
sets:[
{title:'Greetings (Spektrum L1 Ü1)', src:'Spektrum S. 19', items:[
 "p:Guten Morgen!=Good morning!;Guten Tag!=Hello / Good day!;Guten Abend!=Good evening!;Gute Nacht!=Good night!;Tschüss!=Bye!;Danke.=Thank you.",
 "m:It is 8 o'clock in the morning. You meet your teacher:|Guten Morgen!|Gute Nacht!|Guten Abend!|Tschüss!",
 "m:You go to bed. You say:|Gute Nacht!|Guten Tag!|Guten Morgen!|Hallo!",
 "m:Someone gives you a coffee. You say:|Danke.|Bitte.|Tschüss!|Hallo!",
 "m:Someone says „Danke!“. You answer:|Bitte.|Danke.|Gute Nacht!|Guten Appetit!",
 "m:Before eating you say:|Guten Appetit!|Gute Nacht!|Auf Wiedersehen!|Bitte.",
 "m:In Austria people often say „Hallo“, „Grüß Gott“ or …|Servus|Grüezi|Salü|Moin",
 "m:Which greeting is Swiss?|Grüezi!|Servus!|Grüß Gott!|Tschüss!",
 "f:Auf [Wiedersehen]!",
 "f:Guten [Abend]! (in the evening)",
 "f:Gute [Nacht]! (before sleeping)",
 "f:Guten [Morgen]! (in the morning)",
 "o:Wie heißt das Wort auf Deutsch?|What is the word in German?",
 "o:Wie schreibt man das Wort?|How do you write the word?",
 "o:Wie spricht man das Wort aus?|How do you pronounce the word?",
 "o:Das verstehe ich leider nicht.|Unfortunately I don't understand that."
]},
{title:'ei or ie? (Spektrum L2 Aufgabe 13b)', src:'Spektrum S. 34', items:[
 "f:Das ist m[ei]ne Z[ei]tung.", "f:Was ist d[ei]ne Muttersprache?", "f:Ist das [ei]ne Modez[ei]tschrift?",
 "f:Ich stud[ie]re in L[ei]pzig.", "f:Frau Müller schr[ei]bt v[ie]le E-Mails.", "f:Knut l[ie]st gern.",
 "f:s[ie]ben · sp[ie]len · bed[ie]nen", "f:h[ei]ßen · schr[ei]ben · arb[ei]ten", "f:Wie h[ei]ßt du? – Ich h[ei]ße Ahsan.", "f:W[ie] v[ie]l kostet das?",
 "m:Which word has the sound [ai]?|Zeitung|spielen|sieben|viel", "m:Which word has a long [i:]?|bedienen|Schreibtisch|heißen|mein",
 "m:„Wein“ or „Wien“ — which one is the city Vienna?|Wien|Wein ## Wien [vi:n] = Vienna · der Wein [vain] = wine"
]},
{title:'Das Alphabet (Spektrum L1 Aufgabe 8)', src:'Spektrum S. 12', items:[
 "m:How do you say „J“?|jot|je|dschej|ji", "m:How do you say „V“?|fau|we|vi|ve", "m:How do you say „W“?|we|dabbelju|fau|wu",
 "m:How do you say „Z“?|tset|zi|zet|sss", "m:How do you say „E“?|e (like in „bed“, long)|i|ai|ä", "m:How do you say „I“?|i (like „ee“)|ai|e|ü",
 "m:How do you say „Y“?|ypsilon|wai|jot|i", "m:How do you say „ß“?|eszett|es|beta|doppel-s",
 "m:Someone spells: „be – i – el – de“. The word is:|Bild|Geld|Wild|Feld",
 "m:Someone spells: „ha – a – en – de – ypsilon“. The word is:|Handy|Hand|Hund|Honig",
 "m:Someone spells: „es – te – u – ha – el“. The word is:|Stuhl|Stahl|Schule|Stil",
 "m:Someone spells: „tset – e – i – te – u – en – ge“. The word is:|Zeitung|Zeitschrift|Zeichnung|Ordnung",
 "o:Wie buchstabiert man das?|How do you spell that?"
]}
]
});

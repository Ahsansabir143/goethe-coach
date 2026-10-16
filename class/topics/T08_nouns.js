/* Topic 8 — nouns: der/die/das, ein/eine, plural */
TOPICS.push({id:'nouns', icon:'📦', title:'Nouns: der, die, das · ein, eine · plural', d:'der Tisch, die Brille, das Handy · Das ist ein Stift. Das sind Bücher. · der Stuhl → die Stühle', src:'SK1 2.2 Übung 1–4 · Spektrum L2 Aufgabe 7, 12, 15, Ü3, Ü6, T2a', lessons:['L05','L07','L12'], lessonSets:['L05:0','L07:2','L12:2'],
gens:['articles','plural','plrule','wb-art','wb-pl'],
learn:[
{h:'Articles (SK1 2.2, Spektrum L2)', html: TBL(['','maskulin','feminin','neutral','Plural'],[['~bestimmt (the)','der Drucker','die Tasche','das Auto','die Bücher'],['~unbestimmt (a)','ein Drucker','eine Tasche','ein Auto','— Bücher'],['~negativ (no / not a)','kein Drucker','keine Tasche','kein Auto','keine Bücher'],['~Possessiv (my)','mein Drucker','meine Tasche','mein Auto','meine Bücher']])+TIP('Nouns always start with a capital letter. Learn every noun WITH its article and its plural. Names, cities and countries mostly have no article (Paul, München, Italien). Drinks / food in general: no article (Paul trinkt Bier).')},
{h:'Plural endings (SK1 2.2 · Spektrum L2 Übersicht)', html: TBL(['Ending','Singular','Plural'],[['–','das Fenster · der Drucker','die Fenster · die Drucker'],['¨ (umlaut)','der Mantel · der Apfel','die Mäntel · die Äpfel'],['-e','das Brot · der Tisch','die Brote · die Tische'],['¨-e','die Hand · der Stuhl','die Hände · die Stühle'],['-er','das Kind · das Bild','die Kinder · die Bilder'],['¨-er','das Buch','die Bücher'],['-(e)n','die Übung · die Tasche · die Lampe · die Zeitung','die Übungen · die Taschen · die Lampen · die Zeitungen'],['-nen','die Ärztin','die Ärztinnen'],['-s','das Auto · das Handy · der Laptop','die Autos · die Handys · die Laptops']])+TIP('Kaffee, Tee, Milch, Wasser, Schnee, Musik, Ruhe … usually have no plural.')},
{h:'The 23 things (Spektrum L2, Aufgabe 7)', html: TBL(['der','die','das'],[['der Tisch','die Brille','das Handy'],['der Stuhl','die Zeitung','das Medikament'],['der Regenschirm','die Uhr','das Bild'],['der Computer','die Tasche','das Auto'],['der Schlüssel','die Lampe','das Lehrbuch'],['der Stift','die Seite',''],['der Fußball','die Tasse',''],['','die Tür',''],['','die Zeitschrift',''],['','die Flasche',''],['','die Kaffeemaschine','']])+TIP('Office things (Aufgabe 11): der Kalender, das Telefon, der Bildschirm, der Drucker, der Laptop, der Schreibtisch.')}
],
sets:[
{title:'SK1 2.2 Übung 1: Kennen Sie die Artikel?', src:'Aber Hallo! A1, S. 9', items:[
 "m:___ Hotel|das|der|die","m:___ Bier|das|der|die","m:___ Milch|die|der|das","m:___ Orangensaft|der|die|das ## der Saft → der Orangensaft","m:___ Stift|der|die|das","m:___ Flasche|die|der|das","m:___ Brot|das|der|die","m:___ Schule|die|der|das","m:___ Supermarkt|der|die|das","m:___ Kino|das|der|die","m:___ Freund|der|die|das","m:___ Professorin|die|der|das ## female people → die"
]},
{title:'SK1 2.2 Übung 2: Singular → Plural', src:'Aber Hallo! A1, S. 9', items:[
 "f:a) [der] Lehrer – die [Lehrer]","f:b) [die] Übung – die [Übungen]","f:c) [die] Frage – die [Fragen]","f:d) [das] Fahrrad – die [Fahrräder]","f:e) [die] Schule – die [Schulen]","f:f) [die] Stadt – die [Städte]","f:g) [der] Baum – die [Bäume]","f:h) [der] Beruf – die [Berufe]",
 "f:das Brot – die [Brote]","f:die Tomate – die [Tomaten]","f:das Fenster – die [Fenster]","f:der Mantel – die [Mäntel]","f:die Hand – die [Hände]","f:das Kind – die [Kinder]","f:das Buch – die [Bücher]","f:die Tasche – die [Taschen]","f:die Ärztin – die [Ärztinnen]","f:das Auto – die [Autos]"
]},
{title:'SK1 2.2 Übung 4: Was ist das?', src:'Aber Hallo! A1, S. 10', shuffle:false, items:[
 "f:Was ist das? (Tisch) – Das ist [ein] Tisch.","f:a) (Stuhl) – Das ist [ein] Stuhl.","f:b) (Tasche) – Das ist [eine] Tasche.","f:c) (Mappe) – Das ist [eine] Mappe.","f:d) (Stifte) – Das [sind] Stifte.","f:e) (Tasse) – Das ist [eine] Tasse.","f:f) (Computer) – Das ist [ein] Computer.",
 "f:g) (Jacke) – Das ist [eine] Jacke.","f:h) (Äpfel) – Das [sind] Äpfel.","f:i) (Tür) – Das ist [eine] Tür.","f:j) (Deutschbücher) – Das [sind] Deutschbücher.","f:k) (Blumen) – Das [sind] Blumen.","f:l) (Schuhe) – Das [sind] Schuhe."
]},
{title:'Spektrum L2 Aufgabe 7: 23 things', src:'Spektrum S. 30', items:[
 "m:___ Tisch|der|die|das","m:___ Brille|die|der|das","m:___ Handy|das|der|die","m:___ Zeitung|die|der|das","m:___ Stuhl|der|die|das","m:___ Uhr|die|der|das","m:___ Tasche|die|der|das","m:___ Medikament|das|der|die","m:___ Lampe|die|der|das","m:___ Regenschirm|der|die|das","m:___ Seite|die|der|das","m:___ Tasse|die|der|das",
 "m:___ Tür|die|der|das","m:___ Bild|das|der|die","m:___ Computer|der|die|das","m:___ Auto|das|der|die","m:___ Lehrbuch|das|der|die","m:___ Zeitschrift|die|der|das","m:___ Schlüssel|der|die|das","m:___ Flasche|die|der|das","m:___ Stift|der|die|das","m:___ Kaffeemaschine|die|der|das","m:___ Fußball|der|die|das",
 "p:der Tisch=table;die Brille=glasses;das Handy=mobile phone;die Zeitung=newspaper;der Stuhl=chair;die Uhr=clock / watch","p:die Tasche=bag;das Medikament=medicine;die Lampe=lamp;der Regenschirm=umbrella;die Seite=page;die Tasse=cup","p:die Tür=door;das Bild=picture;das Lehrbuch=textbook;die Zeitschrift=magazine;der Schlüssel=key;die Flasche=bottle"
]},
{title:'Spektrum L2: ein / kein / mein (Aufgabe 12) & office (Aufgabe 11)', src:'Spektrum S. 32–33', items:[
 "f:der Drucker · [ein] Drucker · kein Drucker · [mein] Drucker","f:die Tasche · [eine] Tasche · [keine] Tasche · meine Tasche","f:das Auto · [ein] Auto · kein Auto · [mein] Auto",
 "f:Ist in Büro B [ein] Stuhl? – Ja, in Büro B ist [ein] Stuhl.","f:Ist in Büro A [ein] Bild? – Nein, in Büro A ist [kein] Bild.","f:Ist in Büro A [eine] Kaffeemaschine? – Nein, in Büro A ist [keine] Kaffeemaschine.","f:Ist in Büro B [ein] Drucker? – Ja, in Büro B ist [ein] Drucker.","f:Ist in Büro A [ein] Telefon? – Nein, in Büro A ist [kein] Telefon.",
 "m:___ Kalender|der|die|das","m:___ Telefon|das|der|die","m:___ Bildschirm|der|die|das ## der Schirm → der Bildschirm","m:___ Drucker|der|die|das","m:___ Laptop|der|die|das","m:___ Schreibtisch|der|die|das",
 "f:T2a: Im Büro ist … ein St[uh]l · ein [Ti]sch · eine [La]mpe · ein [T]e[l]e[f]on","f:ein [St]ift · eine B[ri]ll[e] · ein Bild[schirm] · ein K[a]l[en]der"
]},
{title:'Spektrum L2 Aufgabe 15 & Ü6: plural', src:'Spektrum S. 35, 42', items:[
 "f:der Stuhl → die [Stühle]","f:der Stift → die [Stifte]","f:der Drucker → die [Drucker]","f:der Schlüssel → die [Schlüssel]","f:die Tasse → die [Tassen]","f:die Zeitung → die [Zeitungen]","f:das Bild → die [Bilder]","f:der Computer → die [Computer]","f:die Lampe → die [Lampen]","f:der Regenschirm → die [Regenschirme]","f:das Buch → die [Bücher]","f:die Tasche → die [Taschen]","f:das Handy → die [Handys]","f:der Tisch → die [Tische]","f:der Laptop → die [Laptops]","f:die Kaffeemaschine → die [Kaffeemaschinen]",
 "f:die Schlüssel → [der] [Schlüssel]","f:die Autos → [das] [Auto]","f:die Kalender → [der] [Kalender]","f:die Brillen → [die] [Brille]","f:die Uhren → [die] [Uhr]","f:die Medikamente → [das] [Medikament]","f:die Stühle → [der] [Stuhl]",
 "m:Which plural ending? die Lampe → die Lampe___|-n|-e|-s|-er","m:Which plural ending? der Tisch → die Tisch___|-e|-en|-s|-er","m:Which plural ending? das Handy → die Handy___|-s|-e|-n|-er","m:Which plural ending? das Bild → die Bild___|-er|-e|-s|-n","m:Which plural ending? die Zeitung → die Zeitung___|-en|-e|-s|-er"
]}
]
});

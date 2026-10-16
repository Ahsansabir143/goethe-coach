/* Extra tap-for-meaning dictionary: words that appear in the class pages, books and texts but are not in a
   class word list. Format: "word|English|grammar note" — nouns start with der/die/das and may give a plural:
   "der Einwohner (Einwohner)|inhabitant". Names / places are in NAMES. */
(function(){
const RAW = `
als|as; than; when (in the past)|conjunction / preposition: Ich arbeite als Ingenieur. · größer als
mir|(to) me|dative of ich: Hilf mir! · Gib mir das Buch.
dir|(to) you|dative of du: Ich helfe dir.
ihm|(to) him / it|dative of er / es: Ich helfe ihm.
sich|oneself, himself, herself, themselves|reflexive pronoun: er wäscht sich, sie setzt sich
uns|us / to us|accusative and dative of wir
euch|you all / to you all|accusative and dative of ihr
ihn|him / it|accusative of er (der-words): Ich sehe ihn.
mich|me|accusative of ich: Er fragt mich.
dich|you|accusative of du: Ich liebe dich.
bisschen|a little, a bit|ein bisschen Deutsch = a little German
jeden|every (masc. accusative)|jeden Tag, jeden Morgen = every day / morning (jeder → jeden)
jeder|every, everyone|jeder (m) · jede (f) · jedes (n)
jede|every (feminine)|jede Woche = every week
jedes|every (neuter)|jedes Jahr = every year
meinen|my (masc. accusative / dative pl.)|mein + -en: Ich besuche meinen Onkel.
meinem|my (dative)|mit meinem Bruder
meiner|my (dative feminine)|mit meiner Schwester
seinen|his (masc. accusative)|sein + -en: Er besucht seinen Vater.
seiner|his (dative feminine)|mit seiner Mutter
seinem|his (dative)|mit seinem Sohn
seine|his (feminine / plural)|seine Mutter, seine Kinder
ihrer|her / their (dative feminine)|mit ihrer Freundin
ihren|her / their (masc. accusative)|Sie besucht ihren Bruder.
ihrem|her / their (dative)|mit ihrem Mann
deinen|your (masc. accusative)|Ich sehe deinen Bruder.
euren|your all (masc. accusative)|Habt ihr euren Schlüssel?
eurem|your all (dative)|mit eurem Lehrer
unseren|our (masc. accusative)|Wir besuchen unseren Opa.
dieser|this (masculine)|dieser Mann · diese Frau · dieses Kind
diese|this / these (feminine, plural)|diese Woche
dieses|this (neuter)|dieses Buch
diesem|this (dative)|in diesem Haus
vom|from the / of the|= von dem
beim|at the|= bei dem: beim Arzt = at the doctor's
dass|that (conjunction)|the verb goes to the end: Ich glaube, dass er kommt.
weil|because|the verb goes to the end: weil ich müde bin
wenn|when / if|the verb goes to the end: Wenn der Bus kommt, …
waren|were|Präteritum of sein: wir / sie waren
warst|were (you)|Präteritum of sein: du warst
war|was|Präteritum of sein: ich / er war
komm|come!|imperative (du) of kommen: Komm her!
nimm|take!|imperative (du) of nehmen: Nimm den Bus!
lies|read!|imperative (du) of lesen: Lies den Text!
hilf|help!|imperative (du) of helfen
sprich|speak!|imperative (du) of sprechen
vergiss|forget!|imperative (du) of vergessen: Vergiss das nicht!
entschuldige|excuse me / sorry (informal)|imperative of sich entschuldigen
entschuldigen|to apologise / excuse|Entschuldigen Sie! = Excuse me! (formal)
läutet|rings|er/sie/es form of läuten (to ring, a bell)
klingelt|rings|er/sie/es form of klingeln (the doorbell / phone rings)
präsentiert|presents|er/sie/es form of präsentieren (weak, -ieren)
fotografiert|photographs / takes photos|er/sie/es form of fotografieren
zeichnet|draws|er/sie/es form of zeichnen (to draw)
zeichnest|draw (you)|du form of zeichnen
korrigiert|corrects|er/sie/es form of korrigieren
konstruiert|constructs, designs|er/sie/es form of konstruieren
verbessert|improves / corrects|er/sie/es form of verbessern
passt|fits / suits|er/sie/es form of passen: Das passt. = That fits / works.
stimmt|is right / correct|Das stimmt. = That's right. (stimmen)
schneit|it snows|Es schneit. (schneien)
rasiere|shave|ich rasiere mich (sich rasieren)
trocknet|dries|er/sie/es form of trocknen
bereiten|to prepare|bereiten … vor / zubereiten
bereitet|prepares|er/sie/es form of bereiten
versammelt|gathered / gathers|versammeln = to gather
ruhen|to rest|ich ruhe, du ruhst
ruhst|rest (you)|du form of ruhen
wendet|turns|er/sie/es form of wenden (to turn)
wenden|to turn|sich wenden an = to turn to
erwacht|wakes up|er/sie/es form of erwachen
führt|leads / runs|er/sie/es form of führen: Sie führt den Haushalt.
grüßt|greets|er/sie/es form of grüßen
tritt|steps / kicks|er/sie/es form of treten (strong: e → i)
beißt|bites|er/sie/es form of beißen
interessiert|interested / interests|Ich bin interessiert. · Das interessiert mich.
verlaufen|to get lost (sich verlaufen)|Ich habe mich verlaufen.
versäumt|missed|Partizip II of versäumen (to miss)
gewachsen|grown|Partizip II of wachsen (ist gewachsen)
großgezogen|brought up, raised|Partizip II of großziehen
durchgefallen|failed (an exam)|Partizip II of durchfallen (ist durchgefallen)
zurückgekommen|come back|Partizip II of zurückkommen (ist zurückgekommen)
hinunterlaufen|to run down|separable: hinunter + laufen
hinuntergehst|go down (you)|du form of hinuntergehen
herein|in (here)|Herein! = Come in!
ausschlafen|to sleep in, have a lie-in|separable: ich schlafe aus
aufsteht|gets up|er/sie/es form of aufstehen in a subordinate clause
aufladen|to charge (a phone)|separable: ich lade das Handy auf
abheben|to withdraw (money)|separable: Geld abheben
parken|to park|weak: parkte, hat geparkt
herstellen|to produce, make|separable: stellt her, hat hergestellt
zurückgeben|to give back|separable: gibt zurück, hat zurückgegeben
genießen|to enjoy|strong: genoss, hat genossen
entlassen|to dismiss / discharge|inseparable ent-: hat entlassen
zerreißen|to tear up|inseparable zer-: hat zerrissen
nett|nice, kind|adjective: Sie ist sehr nett.
schwarz|black|colour
schwarze|black|schwarz + ending -e
gelb|yellow|colour
rot|red|colour
grün|green|colour
braun|brown|colour
braune|brown|braun + ending -e
grau|grey|colour
rosa|pink|colour (no ending)
lila|purple|colour (no ending)
hellblau|light blue|hell = light
dunkelblau|dark blue|dunkel = dark
hellrot|light red|
dunkelrot|dark red|
hellgrün|light green|
dunkelgrün|dark green|
hart|hard|adjective
modern|modern|adjective
angenehm|pleasant|Angenehm! = Pleased to meet you.
privat|private|adjective
private|private|privat + ending
persönlichen|personal|persönlich + ending (persönliche Angaben = personal details)
feine|fine|fein + ending
kräftig|strong, powerful|adjective
ernst|serious|adjective
nah|near, close|adjective
wahr|true|Das ist wahr.
halb|half|halb acht = half past seven
insgesamt|altogether, in total|adverb
gerade|just, right now; straight|Ich esse gerade.
stets|always|= immer
gar|at all|gar nicht = not at all
überhaupt|at all|überhaupt nicht = not at all
eigentlich|actually|adverb
daran|of it, about it|da + an
dazu|with it, in addition|da + zu
weg|away|weg sein = to be gone
los|off, going|Was ist los? = What's the matter?
hin|there (away from speaker)|
pro|per|pro Tag = per day
ca|approx.|= circa
paar|a few|ein paar = a few
erste|first|der / die / das erste
ersten|first|erst + ending
zweiten|second|zweit + ending
dritten|third|dritt + ending
zweit|second|zu zweit = as a pair
größte|biggest|superlative of groß
größten|biggest|superlative of groß + ending
bester|best|superlative of gut: der beste
berühmtester|most famous|superlative of berühmt
beliebteste|most popular|superlative of beliebt
ältesten|oldest|superlative of alt + ending
spannendes|exciting|spannend + ending -es
Welches|which (neuter)|welcher / welche / welches
welches|which (neuter)|welches Buch?
wieso|why|= warum
nanu|well! / what?|surprise
na|well|Na, wie geht's?
prima|great!|
super|super, great|
soso|so-so|so lala = so-so
lala|so-so|so lala
einverstanden|agreed, OK|Einverstanden!
abgemacht|it's a deal|Abgemacht!
willkommen|welcome|Herzlich willkommen!
servus|hi / bye (Austria, Bavaria)|greeting
grüezi|hello (Switzerland)|greeting
ach|oh|
oh|oh|
ah|ah|
hm|hmm|
außer|except, apart from|+ dative
aller|of all|
allen|all, everyone (dative)|
solche|such|
zb|for example|z. B. = zum Beispiel
dr|Dr. (doctor)|title
der Einwohner (Einwohner)|inhabitant, resident
die Pizza (Pizzas)|pizza
das Schnitzel (Schnitzel)|schnitzel (breaded cutlet)
die Grammatik (Grammatiken)|grammar
die Übung (Übungen)|exercise
der Lektor (Lektoren)|(university) language teacher
die Orange (Orangen)|orange (fruit)
der Freitag (Freitage)|Friday
der Samstag (Samstage)|Saturday
der Sonntag (Sonntage)|Sunday
der Mittwoch (Mittwoche)|Wednesday
der September|September
der Oktober|October
der Juli|July
das Notebook (Notebooks)|notebook computer, laptop
die Manty|manty (dumplings)|plural
der Gott (Götter)|God / god|Grüß Gott! = hello (Austria)
der Kuli (Kulis)|pen (short for Kugelschreiber)
das Viertel (Viertel)|quarter; district|Viertel nach acht = quarter past eight
der Spaß (Späße)|fun|Viel Spaß! = Have fun!
der Tratsch|gossip
die Mail (Mails)|e-mail
der Hof (Höfe)|yard, courtyard
das Klavier (Klaviere)|piano
der Tourist (Touristen)|tourist
die Mappe (Mappen)|folder
die Notiz (Notizen)|note
die Waschmaschine (Waschmaschinen)|washing machine
die Station (Stationen)|station, stop
der Toast (Toasts)|toast
die Schokolade (Schokoladen)|chocolate
die Pommes|chips, French fries|plural
die Erdnuss (Erdnüsse)|peanut
die Kiwi (Kiwis)|kiwi
der Burger (Burger)|burger
das Komma (Kommas)|comma; decimal point
das Leben (Leben)|life
der Lieblingsautor (Lieblingsautoren)|favourite author
der Lieblingssänger (Lieblingssänger)|favourite singer
das WLAN|Wi-Fi
der Code (Codes)|code
die Wortfolge (Wortfolgen)|word order
der Junge (Jungen)|boy|colloquial plural: die Jungs
die Pflanze (Pflanzen)|plant
der Spanier (Spanier)|Spaniard
die Ferien|holidays|plural only
das Futter|animal food
das Versprechen (Versprechen)|promise
der Papa (Papas)|dad
die Aktion (Aktionen)|action; special offer
der Ofen (Öfen)|oven
die Tablette (Tabletten)|tablet, pill
die Schlaftablette (Schlaftabletten)|sleeping pill
das Tischchen (Tischchen)|small table|-chen → always das
der Optimismus|optimism
das Dokument (Dokumente)|document
der Monitor (Monitore)|monitor, screen
die Fabrik (Fabriken)|factory
die Wirtschaft|economy
der Norden|north
der Staubsauger (Staubsauger)|vacuum cleaner
der Wasserkocher (Wasserkocher)|kettle
die Vase (Vasen)|vase
der Weg (Wege)|way, path
die Gurke (Gurken)|cucumber
der Ozean (Ozeane)|ocean
das Blut|blood
die Scheibe (Scheiben)|slice
der Teller (Teller)|plate
der Döner (Döner)|doner kebab
der Rucksack (Rucksäcke)|backpack
die Fläche (Flächen)|area, surface
die Köchin (Köchinnen)|cook (female)
die Physik|physics
das Design (Designs)|design
der Designer (Designer)|designer
die Tätigkeit (Tätigkeiten)|activity
die Reporterin (Reporterinnen)|reporter (female)
der Reporter (Reporter)|reporter
die Informatikerin (Informatikerinnen)|computer scientist (female)
die Architektin (Architektinnen)|architect (female)
die Professorin (Professorinnen)|professor (female)
die Ärztin (Ärztinnen)|doctor (female)
die Rentnerin (Rentnerinnen)|pensioner (female)
der Haushalt (Haushalte)|household|den Haushalt führen = to run the household
die Botanik|botany
die Geographie|geography
das Abitur|school-leaving exam (A levels)
der Ärger|trouble, annoyance
das Pech|bad luck
der Stamm (Stämme)|stem (of a word); tribe
der Lehrling (Lehrlinge)|apprentice|-ling → der
der Kosmonaut (Kosmonauten)|cosmonaut
das Gebirge (Gebirge)|mountains|Ge-…-e → das
der Singular|singular
der Imperativ|imperative
das Substantiv (Substantive)|noun
das Präfix (Präfixe)|prefix
der Satz (Sätze)|sentence
das Maskulinum|masculine noun
das Femininum|feminine noun
das Neutrum|neuter noun
der Infinitiv|infinitive
der Dativ|dative case
der Genitiv|genitive case
das Interesse (Interessen)|interest
die Überraschung (Überraschungen)|surprise
die Angabe (Angaben)|detail, information
das Institut (Institute)|institute
das Konzert (Konzerte)|concert
das Fußballspiel (Fußballspiele)|football match
der Kinosaal (Kinosäle)|cinema hall
das Fußballtraining|football training
die Kneipe (Kneipen)|pub, bar
das Blatt (Blätter)|leaf; sheet
der Kreis (Kreise)|circle
das Paar (Paare)|pair, couple
der / die Halbstarke|young hooligan
der / die Achtzehnjährige|18-year-old
die Skyline|skyline
das Universitätsviertel|university district
das Schlafengehen|going to bed
der Deutschlektor (Deutschlektoren)|German lecturer
die Uni (Unis)|university (short)
das Bike (Bikes)|bike
das Sandwich (Sandwiches)|sandwich
die Kirsche (Kirschen)|cherry
der Videorecorder (Videorecorder)|video recorder
die Peitsche (Peitschen)|whip
der Putsch (Putsche)|coup
der Atlantik|Atlantic Ocean
das Tschechisch|Czech (language)
das Tschechische|Czech (language)
das Niederländisch|Dutch (language)
der Amerikaner (Amerikaner)|American (man)
der Hamburger (Hamburger)|hamburger; person from Hamburg
das Verkehrsmittel (Verkehrsmittel)|means of transport
kindern|children (dative plural)|den Kindern = to the children (dative plural adds -n)
jungs|boys (colloquial)|plural of der Junge (standard: die Jungen)
tischlein|little table|-lein → always das (das Tischlein)
moskauer|from Moscow|Moskauer + noun: der Moskauer Kreml
vereinigten|united|die Vereinigten Arabischen Emirate = United Arab Emirates
zwitschern|to chirp, tweet|weak verb
kämme|comb|ich kämme (kämmen = to comb)
bügle|iron|ich bügle (bügeln: ich bügle!)
lächle|smile|ich lächle (lächeln)
bügelt|irons|er bügelt (bügeln)
`;
const X = {};
RAW.trim().split('\n').forEach(l=>{
  const [w, en, note] = l.split('|'); if(!w) return;
  const m = w.match(/^(der|die|das)(?: \/ die)? ([^(]+?)(?: \(([^)]+)\))?$/);
  if(m){ const g = {der:'m', die:'f', das:'n'}[m[1]]; const de = m[2].trim(); const e = {de, g: /plural/.test(note||'') ? 'pl' : g, en, note: note || ''}; if(m[3]) e.pl = m[3];
    X[de.toLowerCase()] = e; if(m[3]) X[m[3].toLowerCase()] = Object.assign({plf:true}, e); }
  else X[w.toLowerCase()] = {w, en, note: note || ''};
});
// numbers: einundzwanzig, siebenundvierzig, zweitausendfünfhundert …
const ONES = ['null','eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun','zehn','elf','zwölf','dreizehn','vierzehn','fünfzehn','sechzehn','siebzehn','achtzehn','neunzehn'];
const TENS = ['','','zwanzig','dreißig','vierzig','fünfzig','sechzig','siebzig','achtzig','neunzig'];
function u100(n){ if(n<20) return ONES[n]; const t=Math.floor(n/10), o=n%10; return o ? (o===1?'ein':ONES[o])+'und'+TENS[t] : TENS[t]; }
function u1000(n){ const h=Math.floor(n/100), r=n%100; let s=''; if(h) s=(h===1?'ein':ONES[h])+'hundert'; if(r||!h) s+= r ? u100(r) : (h?'':ONES[0]); return s; }
const NUM = {};
for(let n=0;n<1000;n++){ const s = n===0?'null':u1000(n); NUM[s]=n; if(/^einhundert/.test(s)) NUM[s.replace(/^einhundert/,'hundert')] = n; if(n>100 && n<200 && n%100<10) NUM[s.replace(/hundert/,'hundertund')] = n; }
window.NUMWORD = w => { w = String(w).toLowerCase().replace(/ss/g,'ß'); if(w in NUM) return NUM[w];
  const m = w.match(/^(.*?)tausend(.*)$/); if(m){ const a = m[1] ? (m[1]==='ein' ? 1 : NUM[m[1]]) : 1; const b = m[2] ? NUM[m[2]] : 0; if(a!=null && b!=null) return a*1000+b; }
  if(w === 'zwo') return 2; if(w === 'eineinhalb') return 1.5; return null; };
window.XDICT = X;
window.NAMES = {};
('Peter Paul Lena Maria Eva Lucie Walter Felix Sarah Carlos Anna Max Susanne Ben Martina Klaus Müller Schneider Orsola Lisa Julian Andreas Anton Helga Theo Ahsan Claudia Edwin Magdalena Nowak Christian Otto Hatem Robert Knut Viktor Lara Keller Tiago Florian Marie Julia Petra Heinrich Elena Franz Lars Sara Karl Alex Jana Erika Faber Martinez Claude Monet Hilde Nina Rasmus Martin Hanna Adam Jürgen Georg Emma Alexis Yanis Stefan Olga Sascha Meier Anara Johan Marta Paola Lili Thomas Clara Inge Sandra Pavel Laura Vera Sabine Heinz Johann Annett Louisan Sander Suter Sting Richter Mario Eduardo Steffi Denis Katin Heym Arthur Goscha Rudolf Sabir Ludger Juliane Arnold Schwarzenegger Inga Murat Schmidt Braun Anne Dora Pedro Mark Mayer Moor Nadja Krause Ali Amira Kerstin Luca Margit Yvonne Diego Perez Santiago Tatjana Smirnow Luise Donald Fröhlich Erik Conti Lydia Fanni Levente Christoph Waltz Oscar Quentin Tarantino Juan Wolfgang Goethe Vincent Gogh Gerhard Schulze Kurt Erna Mischa Heine Oleg Petrow Maxim Helene Monika Emil Ole Ida Mia Leon Tim Jonas Martha').split(' ').forEach(n=> window.NAMES[n] = 'a name (person)');
('Frankfurt Bischkek Passau Tokmok Basel Tokio Bern Madrid Leipzig London Hamburg Graz Moskau Karakol Paris Bremen Chile Ulm Lahore Tschad Bishkek Almaty Zürich Syrien Dresden Malaga Meran Norditalien Rumänien Mexiko Indonesien Bosnien Herzegowina Emirate Sevilla Lissabon Stockholm Athen Budapest Hessen Mainhattan Bankfurt Wolgograd Kasan Manchester Liverpool Österreich Schweiz Ägypten England Spanien Italien Frankreich Polen Russland Kirgistan Pakistan Türkei Berlin München Köln Wien Dänemark Kopenhagen Leipzig Altschwabing Atlantik Europa Asien Amerika Merkur Städel Siemens').split(' ').forEach(n=> window.NAMES[n] = 'a place name (city / country)');
})();

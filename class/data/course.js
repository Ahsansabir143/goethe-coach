/* COURSE STRUCTURE — the app is organised by chapters of the course (Spektrum A1 order), not by class dates.
   Every page (lessons/LNN.js), topic (topics/*.js) and text (texts/*.js) belongs to one chapter here.
   ➜ When new material arrives: add the new page / topic / text id to the chapter it belongs to
     (or add the next chapter, e.g. Lektion 5 · Essen und Trinken). Order inside a chapter = order of the book.
   PAGE gives each page a course title and summary (no dates, no class numbers). */
window.COURSE = [
 {id:'lektion1', label:'Lektion 1', title:'Hallo und guten Tag!', icon:'👋',
  sub:'Sounds & alphabet · greetings · introducing yourself · countries & languages · present tense · questions · du / Sie',
  pages:['L01','L02','L03','L08','L09'], topics:['sounds','regular','tds','sein','questions','dusie','countries'], texts:/^s1-/},
 {id:'lektion2', label:'Lektion 2', title:'Beruf und Familie', icon:'👨‍👩‍👧',
  sub:'Jobs · family · things at work & home · der / die / das, ein / kein · plural · numbers · possessives · gender rules',
  pages:['L05','L10','L07','L11','L12'], topics:['nouns','gender','negation','adjectives','numbers','jobs','family','possessive'], texts:/^s2-/},
 {id:'lektion3', label:'Lektion 3', title:'In der Stadt', icon:'🏙️',
  sub:'Im Café: möchten · the accusative (den, einen, keinen · mich, dich, ihn · durch, für, gegen, ohne, um) · hotel · war',
  pages:['L13','L14','L15','L17'], topics:['moechten','akkusativ','stadt'], texts:/^s3-/},
 {id:'lektion4', label:'Lektion 4', title:'Von morgens bis abends', icon:'⏰',
  sub:'Daily routine · separable & inseparable verbs · nicht · my daily-life texts',
  pages:['L06'], topics:['separable'], texts:/^al-/},
 {id:'dativ', label:'Dativ', title:'The dative: articles, pronouns & prepositions (6.1–6.2 · 7.3)', icon:'🎁',
  sub:'Wem? · dem / der / dem / den + -n · einem / einer · helfen, danken … · gehören, schmecken, gefallen, passen · mir, dir, ihm … · Nominativ, Akkusativ, Dativ: who does what · aus, bei, mit, nach, seit, von, zu, gegenüber',
  pages:['L18','L19','L20','L21'], topics:['pr-dativ','pr-cases','pr-dprep'], texts:null, link:['#/teach/dativ/0','🧑‍🏫 Teach me the dative step by step']},
 {id:'verben', label:'Verbs', title:'Strong verbs & the 3 verb forms', icon:'🔤',
  sub:'a → ä, e → i, e → ie, au → äu · 1st · 2nd · 3rd form (Infinitiv · Präteritum · Partizip II) · all verbs of the course',
  pages:['L04','L16'], topics:['strong','pr-vcase'], texts:null, link:['#/verbs','🔤 All verbs with their 3 forms']},
 {id:'uebung', label:'Practice', title:'4-hour practice: Lektion 1–4', icon:'🏋️',
  sub:'Weak verbs (-t/-d) · conjugation · sein · pronouns · wo / wohin / woher · yes/no questions · strong verbs · accusative + / – · noun gender · (in)separable verbs',
  pages:[], topics:['pr-verbs','pr-sein','pr-pron','pr-wo','pr-jn','pr-strong','pr-akk','pr-genus','pr-sep','practice4'], texts:null, link:['#/practice','🏋️ Open the practice topics']},
 {id:'klimenko', label:'Klimenko', title:'Klimenko book: introductory & main course', icon:'📗',
  sub:'Texts, dialogues and exercises of the Klimenko book',
  pages:[], topics:['klimenko','klimenko2'], texts:/^(k\d|km\d)/},
 {id:'woerter', label:'Word lists', title:'Anara\'s word lists', icon:'🗂️',
  sub:'Nouns by theme · weak & strong verbs · prepositions · adjectives · adverbs · the 300 most important nouns',
  pages:[], topics:['wordbank'], texts:null, link:['#/bank','🗂️ Open the word bank']}
];
window.PAGE = {
 L01:{t:'German sounds & adjectives', s:'How German letters sound, common adjectives with their opposites, and simple questions like „Ist das Buch dick?“'},
 L02:{t:'Present tense: regular verbs', s:'ich, du, er … and the endings every regular verb takes in the present tense, plus the „tsch“ word list.'},
 L03:{t:'Special endings: arbeiten, heißen, tanzen · weak & strong verbs', s:'Why it is „du arbeitest“ but „du heißt“ — and the difference between weak (regular) and strong verbs.'},
 L04:{t:'Strong verbs: vowel change a→ä, e→i, e→ie, au→äu', s:'The stem-changing (strong) verbs table: the vowel changes only with du and er/sie/es.'},
 L05:{t:'Das ist ein … / Das sind … · separable verbs (intro)', s:'Reading-and-translation text (Das ist ein Text … Das sind Uhren) and the first separable verbs.'},
 L06:{t:'Separable & inseparable verbs · nicht', s:'Which prefixes split off and which stay, plus saying „not“ with nicht.'},
 L07:{t:'Numbers 0 – 1 000 000 · phone numbers · things at work & home', s:'Counting, saying phone numbers, and everyday objects with der / die / das.'},
 L08:{t:'Introducing people · countries & languages · Was ist das?', s:'Introduce yourself and others (name, country, city, languages, hobby), country and language names, and „Was ist das? – Das ist Käse.“'},
 L09:{t:'Yes/no questions & answers · Der Morgen (daily routine)', s:'Answering yes/no questions, more strong verbs, and the daily-routine text „Der Morgen“.'},
 L10:{t:'sein & haben · jobs (Berufe) · verbs in sentences', s:'The verb sein, jobs and what people do at work, and exercises on regular and separable verbs.'},
 L11:{t:'Noun gender rules · ein ↔ kein · formal dialogues', s:'Gender rules (Genusregeln), saying „not a“ with kein, formal dialogues, and braten / fahren exercises.'},
 L12:{t:'Possessive articles: mein, dein, sein, ihr … · food & shopping words', s:'Whose is it? mein Tisch, meine Tasche, unsere Bücher … plus two vocabulary lists.'},
 L13:{t:'Im Café: möchten · the accusative — introduction', s:'Ordering in a café with „Ich möchte …“, then the accusative case: only masculine changes — der → den, ein → einen, kein → keinen.'},
 L14:{t:'Accusative practice: packing for a trip · Walter goes shopping', s:'Two worksheets — what I need for a trip to Berlin (den/die/das) and what Walter buys (einen/eine/ein).'},
 L15:{t:'The accusative case — summary', s:'The definition, examples for every gender, the accusative personal pronouns and the words that always take the accusative (DOGFU).'},
 L17:{t:'Accusative pronouns: mich, dich, ihn … (4.3)', s:'Replace the direct object with a pronoun: den Kuchen → ihn, die Milch → sie, das Buch → es · Ich kenne Maria, aber sie kennt mich nicht · Mögen Sie Kaffee? – Nein, ich mag keinen Kaffee.'},
 L18:{t:'The dative: nouns & articles (6.1)', s:'Wem? → dem / der / dem / den + -n, einem / einer · verbs with the dative: helfen, danken, antworten, glauben … · gehören, schmecken, gefallen, passen.'},
 L19:{t:'The dative: personal pronouns (6.2)', s:'mir, dir, ihm, ihr, ihm, uns, euch, ihnen / Ihnen · Glaubst du mir? – Ja, ich glaube dir · word order: Gefällt dir der Film?'},
 L20:{t:'Nominativ, Akkusativ, Dativ: who does what?', s:'The doer (Wer?), the thing (Wen? / Was?) and the person to / for whom (Wem?) — how to find each case, what changes, sein has no accusative, and how to know der, die or das.'},
 L21:{t:'Prepositions with the dative (7.3)', s:'aus, bei, mit, nach, seit, von, zu, gegenüber + Dativ · beim, vom, zum, zur · nach or zu? · Gehst du zu Klaus? – Nein, ich gehe nicht zu ihm.'},
 L16:{t:'Strong verbs (a→ä, e→i, e→ie, au→äu) · the 3 verb forms', s:'Stem-changing verbs with du and er/sie/es, every verb with its 1st, 2nd and 3rd form, and practice sentences.'}
};
/* meaning categories for words: the themes of Nouns.pages (same order); the 300-noun list is mapped onto them */
window.WCAT_MAP = {
 'Person and Family':'People, Family, Professions & Status', 'Work and Professions':'People, Family, Professions & Status',
 'Home and Household':'City, Places, Buildings & Housing', 'City and Society':'City, Places, Buildings & Housing',
 'Food and Drinks':'Food, Drinks & Cooking', 'Shops and Shopping':'Money, Shopping & Services',
 'Clothing and Appearance':'Health, Body & Clothing', 'Health and Body':'Health, Body & Clothing',
 'Study and Language':'Study, Work, Office & Documents', 'Technology and Internet':'Communication & Media',
 'Transport and Travel':'Travel, Transport & Traffic', 'Nature and Weather':'Nature, Weather & Environment',
 'Time and Daily Life':'Time, Dates & Calendar', 'Feelings and Relationships':'Abstract Concepts, Measurements & Other',
 'Abstract and Very Useful':'Abstract Concepts, Measurements & Other'
};

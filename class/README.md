# Deutsch mit Anara — class practice app

Live: https://ahsansabir143.github.io/goethe-coach/class/

A practice app for my German A1 classes with Anara Bekbolotova. Every class has:

- **Learn**: the grammar from that class, with examples you can listen to
- **Words**: every new word with its article, plural and meaning
- **Practice**: exercise sets (multiple choice, fill-in, word order, matching, translation)
- **Drills**: endless generated questions (verbs, der/die/das, plurals, ein/kein, possessives, accusative, numbers, word meanings)

Plus **Topics** (`#/topics`): 20 grammar topics, each with the exact exercises from the books (Aber Hallo! Skript A1, Spektrum A1), Anara's homework sheets and class worksheets, the matching class pages, and endless generated drills built from the same words. Every topic has timed sessions (15 min … 4 h, or no limit) and remembers how long you practised.

**Word bank** (`#/bank`): Anara's lists — 300 most important nouns, the themed noun list, weak/strong verbs, prepositions, adjectives, adverbs — with article, meaning, spelling and plural drills.

Tap any underlined German word anywhere in the app to see its meaning and hear it.
Progress, flashcard boxes and mistakes are saved in the browser (per device).

## Adding a new class

1. Copy the newest file in `lessons/` (e.g. `L14.js`) to the next number (`L15.js`).
2. Change `id`, `date`, `title`, `topics`, `learn`, `vocab`, `sets`, `drills`.
3. Add `<script src="lessons/L15.js"></script>` in `index.html` after the last lesson line.
4. New verbs go into `data/verbs.js` so the conjugation drills and word popups know them.

Exercise item types:

```js
{t:'mcq',  q:'Question', o:['right','wrong','wrong'], a:0, x:'explanation'}
{t:'fill', q:'Ich ___ aus Pakistan.', a:['komme'], h:'(kommen)', x:'…'}   // one answer per ___ ; alternatives with |
{t:'order', a:'Ist das Buch dick?', en:'Is the book thick?'}
{t:'match', pairs:[['dick','thick'],['klein','small']]}
{t:'tr',   en:'I live in Bishkek.', a:['Ich wohne in Bischkek.']}
```

Vocab entry: `{de:'Buch', g:'n', pl:'Bücher', en:'book'}` (g = m / f / n / pl; leave g out for verbs, adjectives and phrases).

## Adding exercises to a topic

Topic files live in `topics/` (`T01_sounds.js` … `T20_wordbank.js`). Each set can use short item strings:

```js
"f:Ich red[e] mit Paul. {reden} ## explanation"   // fill-in: [answer|alternative] per blank, {hint} optional
"m:Question|right answer|wrong|wrong"             // multiple choice — first option is the right one
"o:Ich stehe um 7 Uhr auf.|English meaning"       // word order
"t:I get up at 7.|Ich stehe um 7 Uhr auf."        // translate (more correct answers after more |)
"p:der Tisch=table;die Uhr=clock"                 // match pairs
```

`lessons:[…]` links class pages to the topic, `lessonSets:['L07:0']` picks which class exercise sets appear there, and `gens:[…]` lists the endless drills (ids from `DRILLS` in `app.js`).

## Texts & dialogues (`#/texts`)

Every dialogue and reading text from the books lives in `texts/` (Spektrum L1–L3, Klimenko introductory course and main course Lektion 1–4). Each text has:

```js
{id:'km1-moskau', book:'Klimenko · Main course', ref:'Lektion 1 · I', title:'…', topic:'klimenko2',
 lines:["Denis: Guten Tag! … | English meaning"],          // "Speaker: German | English" (speaker optional)
 words:["die Hochschule|Hochschulen|university", "sicher||of course"],  // hard words: noun with article|plural|meaning
 items:["f:…", "m:…"]}                                     // the book's exercises (same short format as topics)
```

The app adds extra practice automatically from every text: gap-fills with the hard words, word order, translation, "who says it?" and word meanings. `topic:` links the text to a practice topic.

## Days, translations and the chat teacher

- **Home page = one box per day.** Classes are grouped by their `date`. Anything else added that day
  (new topics, texts, features) goes in `data/updates.js` as `{date, icon, text, href}` and appears in the same day box.
- **German + English everywhere.** `EX(de, en)` always shows the English line. If a lesson gives a grammar note
  instead of a translation, or no English at all, put the translation in `data/translations.js` (key = the German
  sentence without HTML). Full German sentences inside `TBL` tables also get their English from there.
  The page has `translate="no"` so Chrome's auto-translate can't replace the German with English.
- **💬 Chat teacher (`chat.js`)** — the same idea as the chat in the main Goethe Coach app. It works only from the
  app's own data (classes, words, verbs, texts, topics), offline, no API key. It explains words (DE↔EN), der/die/das,
  plurals, accusative forms, conjugations, numbers and grammar; finds example sentences; checks sentences
  (verb endings, capitals, accusative); helps with the exercise on screen; and links to lessons, topics, drills and timed sessions.
  New classes are picked up automatically.

## Course structure (no classes, no dates)

The app is organised like the book, not by class days. `data/course.js` lists the chapters in book order
(Lektion 1 · Hallo und guten Tag!, Lektion 2 · Beruf und Familie, Lektion 3 · In der Stadt, Lektion 4 ·
Von morgens bis abends, Verbs, Klimenko, Word lists). Each chapter lists its grammar pages (`lessons/LNN.js`),
practice topics and texts; `PAGE` gives every page its course title and summary.

**When new material arrives:** create the page / text / topic file as before, then put its id into the right
chapter in `data/course.js` (in book order), or add the next chapter (Lektion 5 · Essen und Trinken …).
Before every push run `python3 tools/bump_class_version.py` (cache-busting ?v= on all scripts, so browsers never run an old app.js).
Never show class numbers or dates to the user. The Contents tab (#/contents) numbers every page, text and practice topic automatically in chapter order, so anything added to a chapter appears there in sequence. Words are always shown grouped by meaning (the themes of
Nouns.pages — family, food, city …), with nouns, weak verbs, strong verbs, adjectives and small words in
separate numbered columns.

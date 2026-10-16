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

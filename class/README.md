# Deutsch mit Anara — class practice app

Live: https://ahsansabir143.github.io/goethe-coach/class/

A practice app for my German A1 classes with Anara Bekbolotova. Every class has:

- **Learn**: the grammar from that class, with examples you can listen to
- **Words**: every new word with its article, plural and meaning
- **Practice**: exercise sets (multiple choice, fill-in, word order, matching, translation)
- **Drills**: endless generated questions (verbs, der/die/das, plurals, ein/kein, possessives, accusative, numbers, word meanings)

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

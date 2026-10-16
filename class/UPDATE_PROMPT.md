# Prompt: update my German class app with new content

Copy everything below the line into a new Claude chat (opened from the Claude desktop app on my Mac, so Claude can reach my folders), then attach or point to the new material.

---

Update my German class practice app with the new content.

**Where things are**
- App code: GitHub repo `Ahsansabir143/goethe-coach`, folder `class/`. Live site: https://ahsansabir143.github.io/goethe-coach/class/ — clone the repo, edit, test, push to `main`, and check that GitHub Pages deployed.
- My course material is on my Mac in `/Users/ahsan/Desktop/German A1&A2` (books in `Class material`, text index in `Class material/_claude_index/`). New files may be attached to this chat, be in that folder, or come from the WhatsApp chat with my teacher **Anara Bekbolotova** (her media is in the WhatsApp Media folder). If I say "check the chat", read the new messages and media since the last update.
- Read `class/README.md` first — it describes the whole structure and the rules below.

**What to do with the new content**
1. Read all of it fully (texts, worksheets, photos, homework, voice notes if transcribable). Never put payment receipts, QR codes or phone numbers in the app.
2. Put it in the **course structure**, never by class/date: add it to the right chapter in `class/data/course.js` in book order (Spektrum A1: Lektion 1, 2, 3, 4 …; or Verbs, Klimenko, Word lists), or create the next chapter (e.g. Lektion 5 · Essen und Trinken). Give each new page a course title and summary in `PAGE`. Do not show class numbers or dates anywhere.
3. Grammar → a page `class/lessons/LNN.js` (Learn sections, vocab, exercise sets, drills) **and** a step-by-step lesson in `class/data/guides.js` with the 7 teaching steps: definition → when to use → rules → step by step → examples → common mistakes → summary, with check questions.
4. Dialogues / reading texts → `class/texts/*.js`: every line German | English, hard words with article, plural and meaning, the book's exercises.
5. Words: every noun with der/die/das + plural, every verb with its 3 forms (data/forms.js handles them; add irregular ones there if missing). Words are shown grouped by meaning (family, food, city … from Nouns.pages), nouns and verbs separately, numbered. Add missing word meanings to `data/xdict.js`.
6. Every German example must have an English translation (`EX(de, en)`, or `data/translations.js`). Every short rule/memory trick gets worked examples in `data/tipx.js`. Every German word must be tappable (meaning + grammar).
7. Exact exercises from the books/worksheets first, then enough extra practice (drills, timed sessions) for about 4 hours per topic.
8. Add a line to `data/updates.js` ("What's new").
9. Run `python3 tools/bump_class_version.py` (cache-busting) before committing.
10. Test in a browser (Playwright): every new page opens, no errors, phone width fits, answer all new exercises automatically — 0 wrong. Check the Contents tab and search show the new topic in sequence, and the chat teacher knows the new words.
11. Commit (clear message), push, wait for the GitHub Pages deployment to finish successfully.
12. Tell me in plain words what was new in the material and where it is in the app (chapter → topic), plus anything you corrected in my homework.

---

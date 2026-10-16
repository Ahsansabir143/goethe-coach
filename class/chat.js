/* 💬 Chat teacher — same idea as the chat in the main Goethe Coach app: a teacher that knows
   everything in THIS app (every class, word, verb, example sentence, book text and topic) and answers
   from it. Runs fully in the browser, no account or internet service needed.
   It can: explain a word (German → English, English → German), give der/die/das + plural + accusative,
   conjugate verbs, say numbers, explain grammar from the class pages, find example sentences,
   check a German sentence (verb endings, capitals, accusative), help with the question on screen,
   and take you to the right lesson, topic, text or drill. */
(function(){
'use strict';
const A = window.__ANARA; if(!A) return;
const {LESSONS, TOPICS, TEXTS, DICT, conj, numDe, speak, fullDe, esc, ART, verb, VERBS, norm} = A;
const $ = s => document.querySelector(s);
const CKEY = 'anaraClass:chat';
let CHAT = []; try{ CHAT = JSON.parse(localStorage.getItem(CKEY)||'[]'); }catch(e){}
const saveChat = () => { try{ localStorage.setItem(CKEY, JSON.stringify(CHAT.slice(-40))); }catch(e){} };
let LAST = {word:null, topic:null, q:null};
const strip = h => String(h||'').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim();
const lo = s => String(s||'').toLowerCase();
const WORDRX = /[A-Za-zÄÖÜäöüß]+/g;
const words = s => String(s||'').match(WORDRX) || [];
const cap = s => s ? s[0].toUpperCase()+s.slice(1) : s;

/* ---------- 1. knowledge built from the app ---------- */
// example sentences (German + English) from class pages and book texts
const CORPUS = [];
{
  const seen = new Set();
  const add = (de, en, where, href) => { de = strip(de); en = strip(en).replace(/^🇬🇧\s*/,''); if(!de || seen.has(de) || de.length < 6) return; seen.add(de); CORPUS.push({de, en, where, href}); };
  const fromHtml = (html, where, href) => {
    const re = /<div class="ex"[^>]*><span class="de"[^>]*>([\s\S]*?)<\/span>[\s\S]*?(?:<span class="en"[^>]*>([\s\S]*?)<\/span>)?(?:<span class="en note">[\s\S]*?<\/span>)?<\/div>/g; let m;
    while((m = re.exec(html))) add(m[1], m[2]||'', where, href);
    const re2 = /<td class="de">((?:(?!<\/?td)[\s\S])*?)<span class="en tdl"[^>]*>([\s\S]*?)<\/span><\/td>/g;
    while((m = re2.exec(html))) add(m[1], m[2], where, href);
  };
  LESSONS.forEach(l => (l.learn||[]).forEach(s => fromHtml(s.html, `${l.id} · ${l.title}`, `#/l/${l.id}/learn`)));
  TOPICS.forEach(t => (t.learn||[]).forEach(s => fromHtml(s.html, t.title, `#/t/${t.id}/learn`)));
  TEXTS.forEach(t => (t.lines||[]).forEach(x => add(x.de, x.en, `${t.book} · ${t.title}`, `#/x/${t.id}`)));
  LESSONS.forEach(l => (l.vocab||[]).forEach(w => { if(w.ex) add(w.ex, (window.TR||{})[w.ex]||'', `${l.id} · words`, `#/l/${l.id}/words`); }));
}
// grammar sections (class pages + topic rules)
const SECTIONS = [];
LESSONS.forEach(l => (l.learn||[]).forEach(s => SECTIONS.push({h:s.h, text:strip(s.html), html:s.html, where:`Class ${l.id} (${l.title})`, href:`#/l/${l.id}/learn`, lid:l.id})));
TOPICS.forEach(t => (t.learn||[]).forEach(s => SECTIONS.push({h:s.h, text:strip(s.html), html:s.html, where:`Topic: ${t.title}`, href:`#/t/${t.id}/learn`, tid:t.id})));
// grammar words → topic
const GRAM = [
 ['akkusativ', /akkusativ|accusative|direct object|\bden\b|\beinen\b|\bkeinen\b|mich|dich|\bihn\b|durch|für|gegen|ohne|dogfu/i, 'The accusative is used for the direct object (who/what receives the action). Only the masculine changes: der → den, ein → einen, kein → keinen. Pronouns: mich, dich, ihn, sie, es, uns, euch, sie/Sie. Always accusative after durch, für, gegen, ohne, um.', 'Ich habe einen Hund. · Er kauft den Tisch. · Das ist für dich.'],
 ['nouns', /article|artikel|der die das|gender|plural|ein eine|nominativ|nominative/i, 'Every noun has an article: der (masculine), die (feminine), das (neuter); plural is always die. Learn every noun with its article and plural.', 'der Tisch – die Tische · die Lampe – die Lampen · das Buch – die Bücher'],
 ['gender', /gender rule|compound|kompositum|zusammengesetzt|-ung|-heit|-keit|-chen/i, 'Some endings tell you the gender: -ung, -heit, -keit, -ion, -tät → die; -chen, -lein, -ment, -um → das. In a compound noun the LAST word gives the article.', 'die Zeitung · das Mädchen · der Orangensaft'],
 ['negation', /negation|nicht|kein|verneinung|not\b|\bno\b/i, 'kein negates a noun with ein/eine or no article (kein, keine, keinen); nicht negates everything else (verbs, adjectives, names, nouns with der/die/das).', 'Das ist kein Apfel. · Ich lerne nicht Spanisch. · Ich kenne Lisa nicht.'],
 ['regular', /present tense|präsens|conjugat|konjugation|verb ending|regular verb/i, 'Present tense: stem + ending — ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en.', 'ich lerne, du lernst, er lernt, wir lernen, ihr lernt, sie lernen'],
 ['tds', /arbeiten|heißen|tanzen|extra e|-test|stem ends/i, 'Stems ending in -t/-d get an extra e (du arbeitest, er arbeitet); stems ending in -s/-ß/-z only add -t for du (du heißt, du tanzt).', 'du arbeitest · er findet · du heißt · du tanzt'],
 ['strong', /strong verb|stem chang|vowel change|a ?→ ?ä|e ?→ ?i|fahren|lesen|essen|sprechen|sehen|nehmen/i, 'Strong verbs change the vowel only for du and er/sie/es: a → ä (fahren: du fährst), e → i (essen: du isst), e → ie (lesen: du liest).', 'ich fahre – du fährst – er fährt · ich lese – du liest'],
 ['sein', /\bsein\b|\bhaben\b|to be|to have|\bbin\b|\bbist\b|\bhabe\b|\bhast\b/i, 'sein: ich bin, du bist, er ist, wir sind, ihr seid, sie sind. haben: ich habe, du hast, er hat, wir haben, ihr habt, sie haben.', 'Ich bin müde. · Hast du Zeit?'],
 ['questions', /question|frage|w-frage|word order|satzbau|position 2|verb position|wer|woher|wohin|warum|pronoun/i, 'Statements and W-questions: the verb is in position 2 (Ich wohne in Bishkek. Wo wohnst du?). Yes/no questions start with the verb (Wohnst du in Bishkek?).', 'Heute lerne ich Deutsch. · Woher kommst du? · Kommst du aus Pakistan?'],
 ['dusie', /\bdu\b.*\bsie\b|formal|informal|polite|siezen|duzen|\bihr\b/i, 'du = one friend/child/family member, ihr = several of them, Sie = polite (one or more people, always capital S).', 'Wie heißt du? · Wie heißen Sie? · Wo wohnt ihr?'],
 ['separable', /separable|trennbar|prefix|aufstehen|einkaufen|anrufen|fernsehen|inseparable|untrennbar/i, 'Separable verbs: the prefix goes to the END of the sentence (ich stehe um 7 Uhr auf). be-, ver-, er-, ge-, ent-, emp-, zer- never separate (ich besuche).', 'Ich kaufe im Supermarkt ein. · Er ruft seine Mutter an.'],
 ['possessive', /possessiv|possessive|mein|dein|unser|euer|\bsein\b.*\bihr\b|my\b|your\b|his\b|her\b/i, 'mein (my), dein (your), sein (his/its), ihr (her/their), unser (our), euer (your all), Ihr (your, formal). Add -e for feminine and plural; -en for masculine accusative.', 'mein Bruder · meine Schwester · Ich besuche meinen Onkel.'],
 ['adjectives', /adjective|adjektiv|opposite|colou?r|farbe/i, 'After sein an adjective has no ending: Das Auto ist neu. Learn adjectives in pairs of opposites.', 'alt ↔ neu · groß ↔ klein · teuer ↔ billig'],
 ['numbers', /number|zahl|phone|telefon|count|how much|kostet|price/i, 'From 21 to 99 the ONE comes first: einundzwanzig (1 + and + 20). Phone numbers are read in single digits or pairs.', '47 = siebenundvierzig · Das kostet 2,60 €.'],
 ['moechten', /möchte|moechte|would like|modal|können|müssen|wollen|dürfen|im café|bestellen/i, 'möchten = would like: ich möchte, du möchtest, er möchte, wir möchten, ihr möchtet, sie möchten. The second verb goes to the end in the infinitive.', 'Ich möchte einen Kaffee. · Was möchten Sie trinken?'],
 ['sounds', /alphabet|sound|pronoun(ce|ciation)|aussprache|umlaut|greeting|begrüßung|buchstab/i, 'ei = [ai] (mein), ie = long ee (die), eu/äu = [oi] (heute), sch = sh, ch after a/o/u = throat sound, w = v, v = f, z = ts.', 'Guten Morgen! · Wie geht es Ihnen?'],
 ['jobs', /\bjob|beruf|profession|work as|arbeitet als/i, 'Jobs: masculine form + -in for women (der Lehrer – die Lehrerin). Ich bin Lehrer / Ich arbeitet als … — no article!', 'Ich bin Ingenieur. · Sie arbeitet als Ärztin.'],
 ['family', /family|familie|mother|father|bruder|schwester|eltern|verwandt/i, 'Family words: der Vater, die Mutter, die Eltern, der Bruder, die Schwester, die Geschwister, der Sohn, die Tochter, der Onkel, die Tante.', 'Ich habe einen Bruder und zwei Schwestern.'],
 ['countries', /country|countries|land|länder|language|sprache|introduc|vorstellen|woher/i, 'Ich komme aus … (country) · Ich wohne in … (city) · Ich spreche … (language). Some countries have an article: die Schweiz, die Türkei, die USA.', 'Ich komme aus Pakistan und wohne in Bishkek.'],
 ['stadt', /city|stadt|hotel|café|cafe|\bwar\b|präteritum|was\/were|gestern/i, 'Past of sein (Präteritum): ich war, du warst, er war, wir waren, ihr wart, sie waren.', 'Gestern war ich in Frankfurt.'],
];
const TOPIC_WORDS = {};
TOPICS.forEach(t => { TOPIC_WORDS[t.id] = lo(t.title + ' ' + (t.d||'') + ' ' + t.id); });

/* ---------- 2. word helpers ---------- */
const UNIQ = [...new Set(DICT.values())];
function entryHead(e){ if(e.de) return fullDe(e); return e.w || e.de || ''; }
function entryKey(e){ return lo(e.de || e.w || ''); }
function lookupDe(w){
  if(!w) return null;
  let e = DICT.get(lo(w)); if(e) return e;
  e = DICT.get(lo(w.replace(/^(der|die|das|den|dem|ein|eine|einen)\s+/i,''))); if(e) return e;
  return null;
}
function lev(a, b){ if(Math.abs(a.length-b.length) > 2) return 9; const d = Array.from({length:a.length+1}, (_,i)=>[i]); for(let j=1;j<=b.length;j++) d[0][j]=j; for(let i=1;i<=a.length;i++) for(let j=1;j<=b.length;j++) d[i][j] = Math.min(d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1] + (a[i-1]===b[j-1]?0:1)); return d[a.length][b.length]; }
function suggest(w){ const n = norm(w); if(n.length < 3) return null; let best = null, bd = 9; for(const k of DICT.keys()){ const d = lev(n, norm(k)); if(d < bd){ bd = d; best = k; } } return bd <= (n.length > 6 ? 2 : 1) ? best : null; }
function findEnglish(q){
  q = lo(q).replace(/^(a|an|the|to)\s+/,'').replace(/[?!.„“"]/g,'').trim(); if(!q || q.length < 2) return [];
  const rx = new RegExp(`(^|[^a-z])(to )?${q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}([^a-z]|$)`);
  const scored = [];
  UNIQ.forEach(e => { if(!e.en || e.plf || e.form) return; const en = lo(e.en); const parts = en.split(/[,;/()]|—|–/).map(x=>x.trim().replace(/^(to|a|an|the) /,''));
    let sc = 0; if(parts.includes(q)) sc = 3; else if(rx.test(en)) sc = 2; if(sc){ if(e.lid) sc += .5; scored.push([sc, e]); } });
  const seen = new Set();
  return scored.sort((a,b)=>b[0]-a[0]).map(x=>x[1]).filter(e => { const k = entryKey(e); if(seen.has(k)) return false; seen.add(k); return true; }).slice(0,4);
}
function examplesWith(w, n = 3){
  if(!w) return []; const ks = (Array.isArray(w) ? w : [w]).map(lo); const rx = new RegExp(`(^|[^A-Za-zÄÖÜäöüß])(${ks.map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')})([^A-Za-zÄÖÜäöüß]|$)`, 'i');
  return CORPUS.filter(c => c.en && !/→|\||—/.test(c.de) && rx.test(c.de)).sort((a,b)=> (b.en?1:0)-(a.en?1:0) || a.de.length - b.de.length).slice(0, n);
}
function exLines(list){ return list.map(c => `• **${c.de}**${c.en ? `\n   🇬🇧 ${c.en}` : ''}  [[go:${c.where.split(' · ')[0]}|${c.href}]]`).join('\n'); }
function whereFrom(e){
  if(e.lid){ const l = LESSONS.find(x=>x.id===e.lid); return l ? `From class ${l.id} (${l.date.slice(8)}.${l.date.slice(5,7)}.) [[go:📖 Open ${l.id}|#/l/${l.id}/words]]` : ''; }
  if(e.tx){ const t = TEXTS.find(x=>x.id===e.tx); return t ? `From the book text *${t.title}* (${t.book}) [[go:📚 Open text|#/x/${t.id}]]` : ''; }
  if(e.wb) return 'From the word bank [[go:🗂️ Word bank|#/bank]]';
  return '';
}
function conjTable(v){
  const f = conj(v); if(!f) return '';
  const P = ['ich','du','er/sie/es','wir','ihr','sie/Sie'];
  const pre = v.g === 'sep' ? ' … ' + v.pre : '';
  return P.map((p,i) => `${p} **${f[i]}${pre}**`).join(' · ');
}
function verbType(v){ return {reg:'regular', td:'regular (extra -e: du …est, er …et)', s:'regular (du only adds -t)', strong:'strong — the vowel changes for du and er/sie/es', sep:`separable — „${v.pre}“ goes to the end`, irr:'irregular'}[v.g] || ''; }
function nounCard(e){
  const head = fullDe(e); let out = `**${head}** — ${e.en}`;
  if(e.plf) out = `**${e.pl}** is the plural of **${head}** — ${e.en}`;
  if(e.pl) out += `\nPlural: ${e.pl === '—' ? 'no plural' : `**die ${e.pl}**`}`;
  if(e.g === 'm') out += `\nAccusative: **den ${e.de}** · **einen ${e.de}** · **keinen ${e.de}** (der → den!)`;
  else if(e.g === 'f') out += `\nAccusative: **die ${e.de}** · **eine ${e.de}** (no change)`;
  else if(e.g === 'n') out += `\nAccusative: **das ${e.de}** · **ein ${e.de}** (no change)`;
  if(e.note) out += `\n💡 ${e.note}`;
  return out;
}
function wordCard(e, typed){
  LAST.word = e;
  let out;
  if(e.pos === 'verb'){
    const v = e.vg;
    out = `**${v.i}** — ${v.en}${e.form && typed && lo(typed) !== lo(v.i) ? `\n(„${typed}“ is a form of **${v.i}**)` : ''}\nType: ${verbType(v)}\n${conjTable(v)}`;
  } else if(e.de && e.g){ out = nounCard(e); }
  else out = `**${e.w || e.de}** — ${e.en}${e.opp ? `\nOpposite: **${e.opp}**` : ''}${e.note ? `\n💡 ${e.note}` : ''}`;
  const wf = whereFrom(e); if(wf) out += '\n' + wf;
  const key = e.pos === 'verb' ? [...new Set([e.vg.i].concat(conj(e.vg)||[]))] : (e.de || e.w);
  const ex = examplesWith(key, 3);
  if(ex.length) out += '\n\nExamples from your classes & books:\n' + exLines(ex);
  const name = e.pos === 'verb' ? e.vg.i : (e.de || e.w);
  out += '\n\n' + [`[[act:✍️ More sentences|sentences with ${name}]]`, e.pos === 'verb' ? '' : (e.g ? `[[act:🔁 Accusative|accusative of ${name}]]` : ''), `[[fill:✍️ Write a sentence, I'll check it|check: ]]`].filter(Boolean).join(' ');
  return out;
}

/* ---------- 3. sentence checker ---------- */
const SUBJ = {ich:0, du:1, er:2, sie:2, es:2, man:2, wir:3, ihr:4};
const AKKV = new Set(['haben','kaufen','sehen','trinken','essen','brauchen','finden','lesen','möchten','besuchen','bestellen','suchen','nehmen','kennen','treffen','buchen','bezahlen','lieben','mögen','fragen','packen','schließen','verstehen','tragen','schreiben','lernen','hören','machen','nehmen','bekommen','kochen','spielen','öffnen','putzen','malen']);
const AKKP = new Set(['durch','für','gegen','ohne','um']);
const NOM2AKK = {der:'den', ein:'einen', kein:'keinen', mein:'meinen', dein:'deinen', sein:'seinen', unser:'unseren', euer:'euren'};
function verbOf(w){ const e = DICT.get(lo(w)); return e && e.pos === 'verb' ? e : null; }
function checkGerman(text){
  const out = []; let fixed = text;
  const toks = words(text);
  // 1) first word capital
  if(toks.length && /^[a-zäöü]/.test(text.trim())) { out.push([toks[0], cap(toks[0]), 'capital letter', 'A sentence starts with a capital letter.']); }
  // 2) nouns need a capital
  toks.forEach((t,i) => { const e = DICT.get(lo(t)); if(e && e.g && !e.pos && /^[a-zäöü]/.test(t) && !(lo(t) in SUBJ) && !['sie','die','das','der'].includes(lo(t)) && !DICT.get(lo(t)).w) out.push([t, cap(t), 'capital letter', `„${cap(t)}“ is a noun (${fullDe(e)} = ${e.en}). All German nouns start with a capital letter.`]); });
  // 3) subject pronoun + verb form
  toks.forEach((t,i) => {
    const p = lo(t); if(!(p in SUBJ)) return;
    if(p === 'sie' && /^Sie$/.test(t) && i > 0) return; // polite Sie: plural form, skip
    [toks[i+1], toks[i-1]].forEach(vw => {
      if(!vw) return; const e = verbOf(vw); if(!e || e.vg.g === 'sep' && lo(vw) === lo(e.vg.i)) return;
      const f = conj(e.vg); if(!f) return;
      let want = [SUBJ[p]]; if(p === 'sie') want = [2, 5];
      if(want.some(k => lo(f[k]) === lo(vw))) return;
      if(!f.map(lo).includes(lo(vw))) return; // infinitive used with a modal etc. — skip
      if(lo(vw) === lo(e.vg.i) && toks.some(x => ['möchte','möchtest','kann','kannst','muss','musst','will','willst','möchten','können','müssen'].includes(lo(x)))) return;
      const right = f[want[0]];
      out.push([vw, /^[A-ZÄÖÜ]/.test(vw) ? cap(right) : right, 'verb ending', `With „${p}“ the verb is „${right}“ (${e.vg.i}: ich ${f[0]}, du ${f[1]}, er ${f[2]}, wir ${f[3]}, ihr ${f[4]}, sie ${f[5]}).`]);
    });
  });
  // 4) accusative after transitive verbs and durch/für/gegen/ohne/um
  toks.forEach((t,i) => {
    const art = lo(toks[i+1]||''), noun = toks[i+2];
    if(!(art in NOM2AKK) || !noun) return;
    const ne = DICT.get(lo(noun)); if(!ne || ne.g !== 'm') return;
    const ve = verbOf(t); const isPrep = AKKP.has(lo(t));
    if(!isPrep && !(ve && AKKV.has(lo(ve.vg.i)))) return;
    if(ve && lo(ve.vg.i) === 'sein') return;
    const right = NOM2AKK[art];
    out.push([`${toks[i+1]} ${noun}`, `${right} ${noun}`, 'accusative', `${isPrep ? `„${t}“ always takes the accusative` : `„${noun}“ is the direct object of „${t}“ (accusative)`}, and ${fullDe(ne)} is masculine: ${art} → **${right}**.`]);
  });
  // 5) "ich bin" + age etc. — common: "Ich habe 20 Jahre" (Russian/Urdu calque)
  if(/\bich habe \d+ jahre?\b/i.test(text)) out.push([text.match(/ich habe \d+ jahre?/i)[0], text.match(/ich habe (\d+)/i)[0].replace(/habe/i,'bin') + ' Jahre alt', 'age', 'In German you ARE your age: Ich bin 25 Jahre alt.']);
  const seen = new Set(); const uniq = out.filter(m => { const k = m[0]+'→'+m[1]; if(seen.has(k)) return false; seen.add(k); return true; });
  uniq.forEach(m => { fixed = fixed.replace(m[0], m[1]); });
  return {mistakes:uniq, fixed};
}

/* ---------- 4. answering ---------- */
const go = (label, href) => `[[go:${label}|${href}]]`;
const act = (label, q) => `[[act:${label}|${q}]]`;
function latestDay(){ return [...new Set(LESSONS.map(l=>l.date))].sort().pop(); }
function dayLessons(d){ return LESSONS.filter(l => l.date === d); }
function topicByWords(q){
  const ql = lo(q);
  const g = GRAM.find(([id, rx]) => rx.test(ql) && TOPICS.find(t=>t.id===id));
  if(g) return TOPICS.find(t => t.id === g[0]);
  let best = null, bs = 0;
  TOPICS.forEach(t => { const tw = TOPIC_WORDS[t.id]; const sc = words(ql).filter(w => w.length > 3 && tw.includes(lo(w))).length; if(sc > bs){ bs = sc; best = t; } });
  return best;
}
function topicButtons(t){ return [go(`🎯 ${t.title}`, `#/t/${t.id}`), go('📖 Rules', `#/t/${t.id}/learn`), go('⏱ 30 min practice', `#/run/${t.id}/30`)].join(' '); }
function navAnswer(q){
  const ql = lo(q);
  if(!/\b(take me|go to|open|show me|bring me|start|begin|practi[cs]e|exercises?|quiz me|test me|drill|where (is|are|can i)|i want to|let'?s|\d+ ?(min|minutes|hours?|h))\b/.test(ql)) return null;
  if(/\b(today|latest|last|new|newest)\b.*\b(class|lesson|update)|\b(today'?s|latest|last|new|newest) (class|lesson)/.test(ql)){ const d = latestDay(); return `Here is the latest day (${d.slice(8)}.${d.slice(5,7)}.):\n` + dayLessons(d).map(l => go(`📖 ${l.id}: ${l.title}`, `#/l/${l.id}`)).join(' ') + '\n' + dayLessons(d).map(l => go(`✍️ Practise ${l.id}`, `#/l/${l.id}/practice`)).join(' '); }
  const lm = /\b(?:l|class|lesson|klasse)\s*0?(\d{1,2})\b/i.exec(q); if(lm){ const l = LESSONS.find(x => +x.id.slice(1) === +lm[1]); if(l) return `Class ${l.id}: ${l.title}\n${go('📖 Learn', `#/l/${l.id}`)} ${go('✍️ Practice', `#/l/${l.id}/practice`)} ${go('🔤 Words', `#/l/${l.id}/words`)} ${go('♾️ Drills', `#/l/${l.id}/drills`)}`; }
  if(/mistake|fehler|wrong answers/.test(ql)) return `Your mistakes are saved — practise them again:\n${go('❗ My mistakes', '#/mistakes')}`;
  if(/flash ?card/.test(ql)) return go('🃏 Flashcards', '#/flash');
  if(/word ?bank|300 words|most common/.test(ql)) return go('🗂️ Word bank', '#/bank');
  if(/\btexts?\b|dialog|reading|book/.test(ql)){ const t = TEXTS.find(x => words(ql).some(w => w.length > 3 && lo(x.title).includes(lo(w)))); return t ? `${go('📚 ' + t.title, '#/x/' + t.id)}` : `All dialogues and texts from Spektrum and Klimenko, line by line with English:\n${go('📚 Texts & dialogues', '#/texts')}`; }
  if(/\b(\d+)\s*(min|minutes|hour|hours|h)\b/.test(ql)){ const m = /\b(\d+)\s*(min|minutes|hour|hours|h)\b/.exec(ql); const min = /h/.test(m[2]) && !/min/.test(m[2]) ? +m[1]*60 : +m[1]; const t = topicByWords(q); return `A timed session of ${min} minutes${t ? ` on „${t.title}“` : ' with everything mixed'}:\n${go(`⏱ Start ${min} min`, `#/run/${t ? t.id : 'all'}/${min}`)}`; }
  if(/\bmix|everything|review|all topics\b/.test(ql)) return `${go('🎲 Mixed review (20)', '#/mix')} ${go('⏱ 1 hour of everything', '#/run/all/60')}`;
  const t = topicByWords(q);
  if(t){ LAST.topic = t; return `Let's practise „${t.title}“:\n${topicButtons(t)}`; }
  return `What would you like to practise?\n` + [go('🎯 All topics', '#/topics'), go('📚 Book texts', '#/texts'), go('🎲 Mixed review', '#/mix'), go('♾️ Drills', '#/drills'), go('🃏 Flashcards', '#/flash')].join(' ');
}
function grammarAnswer(q){
  const ql = lo(q);
  const g = GRAM.find(([id, rx]) => rx.test(ql));
  const kws = words(ql).filter(w => w.length > 3 && !['what','what\'s','does','explain','about','tell','how','with','grammar','rule','rules','when','which','that','this','please','mean','means','use','used','the'].includes(w));
  const hits = SECTIONS.map(s => { const h = lo(s.h), tx = lo(s.text); let sc = 0; kws.forEach(w => { if(h.includes(w)) sc += 3; else if(tx.includes(w)) sc += 1; }); if(g && (s.tid === g[0])) sc += 2; return [sc, s]; }).filter(x => x[0] >= 2).sort((a,b) => b[0]-a[0]).slice(0, 3).map(x => x[1]);
  if(!g && !hits.length) return null;
  let out = '';
  if(g){ const t = TOPICS.find(x => x.id === g[0]); LAST.topic = t; out += `📏 ${t ? t.title : g[0]}\n${g[2]}\n🇩🇪 ${g[3].split(' · ').map(x => `**${x}**`).join(' · ')}`;
    const ex = CORPUS.filter(c => c.en && t && c.href.includes(t.id)).slice(0,2); if(ex.length) out += '\n\n' + exLines(ex); }
  if(hits.length) out += (out ? '\n\n' : '') + 'Where it is in your classes:\n' + hits.map(s => go(`📖 ${s.h.replace(/^\d+\.\s*/,'').slice(0,40)} (${s.where.split(' (')[0]})`, s.href)).join(' ');
  if(g){ const t = TOPICS.find(x => x.id === g[0]); if(t) out += '\n\n' + topicButtons(t); }
  return out;
}
function currentQuestionHelp(reveal){
  const it = window.__cur; if(!it || !document.getElementById('qbox') && !document.querySelector('.q')) return null;
  const q = it.q || it.en || it.a || '';
  let out = `🧩 **${strip(String(q)).slice(0, 160)}**`;
  if(it.t === 'tr') out = `🧩 Translate: ${strip(it.en)}`;
  if(it.t === 'order') out = `🧩 Put the words in order${it.en ? `: ${strip(it.en)}` : ''}`;
  if(it.h) out += `\n💡 Hint: ${strip(it.h)}`;
  const SKIP = /^(der|die|das|den|dem|ein|eine|einen|ich|du|er|sie|es|wir|ihr|und|ist|sind|wer|was|wo|wie|ja|nein|nicht|in|mit|zu|im|am)$/i;
  const seenW = new Set();
  const ws = words(strip(String(it.t === 'tr' ? '' : (it.q || it.a || '')))).map(w => [w, lookupDe(w)]).filter(([w,e]) => e && e.en && !SKIP.test(w) && !seenW.has(lo(w)) && seenW.add(lo(w))).slice(0, 6);
  if(ws.length) out += '\n\nWords in this question:\n' + ws.map(([w,e]) => e.pos === 'verb' ? `• **${w}** — ${e.vg.en}${lo(w) !== lo(e.vg.i) ? ` (form of ${e.vg.i})` : ''}` : `• **${e.de ? fullDe(e) : w}** — ${e.en}`).join('\n');
  if(it.x) out += `\n\n📏 Rule: ${strip(it.x)}`;
  if(reveal){ let a = it.a; if(it.t === 'mcq') a = it.o[it.a]; if(Array.isArray(a)) a = a.map(x => String(x).split('|')[0]).join(' / '); out += `\n\n✅ Answer: **${String(a).split('|')[0]}**`; }
  else out += '\n\n' + act('👀 Show me the answer', 'answer for this question');
  return out;
}
function hello(){
  const d = latestDay(); const ls = dayLessons(d);
  return `Hallo Ahsan! 👋 I'm your class teacher. I know every class with Anara, every word, the Spektrum and Klimenko texts and all the exercises in this app.\n\nType or say a word in German or English, or ask me anything. Today's class: ${ls.map(l => go(l.id + ': ' + l.title.slice(0, 32), '#/l/' + l.id)).join(' ')}\n\nTry:\n` +
    [act('📖 What does Geschenk mean?', 'what does Geschenk mean'), act('🇬🇧→🇩🇪 How do you say dog?', 'how do you say dog'), act('der/die/das Tisch?', 'der die das Tisch'), act('Accusative of der Hund', 'accusative of der Hund'), act('Conjugate lesen', 'conjugate lesen'), act('Explain the accusative', 'explain the accusative'), '[[fill:✍️ Check my German|check: ]]', act('🎯 Take me to today\'s class', "take me to today's class")].join(' ');
}
function answer(q){
  const raw = q.trim(); const ql = lo(raw);
  if(!ql) return '';
  // help with the question on screen
  if(/\b(this|current|the) (question|exercise|task)\b|^help me$|^hint$|answer for this question|^i don'?t (get|understand) (it|this)/.test(ql)){ const h = currentQuestionHelp(/answer/.test(ql)); if(h) return h; return 'Open an exercise first, then ask me „help with this question“ — I will explain the words and the rule.'; }
  if(/^(hi|hallo|hello|hey|salam|guten (tag|morgen|abend)|help|hilfe|what can you do)\b/.test(ql) && ql.length < 24) return hello();
  // memory tricks (DOGFU …) → the worked examples from data/tipx.js
  if(/dogfu|memory trick|eselsbrücke/i.test(ql)){ const hit = (window.TIPX||[]).find(([k]) => /dogfu/i.test(ql) ? k === 'DOGFU' : false) || (window.TIPX||[])[0];
    return `🧠 **DOGFU** = durch, ohne, gegen, für, um — these five ALWAYS take the accusative.\n\n` + hit[1].map(r => typeof r === 'string' ? `\n${r.replace(/^#/,'📌 ')}` : `• **${strip(r[0])}**  🇬🇧 ${r[1]}${r[2] ? `  ✔ ${r[2]}` : ''}`).join('\n') + '\n\n' + go('📖 Open L15', '#/l/L15/learn') + ' ' + go('🎯 Practise durch/für/gegen/ohne/um', '#/d/akkprep'); }
  // check a sentence
  const chk = /^(check|correct|korrigier\w*|is this (right|correct)|ist das (richtig|korrekt))\s*(my )?(sentence|text|satz)?\s*[:\-]?\s*/i;
  if(chk.test(raw)){ const t = raw.replace(chk, '').trim(); if(!t) return 'Write your German sentence after „check:“ — for example: check: ich habe ein Hund'; return checkAnswer(t); }
  const nav = navAnswer(raw); if(nav) return nav;
  // numbers
  const nm = /^(?:how do (?:you|i) say |say |number |zahl )?(\d{1,6})\??$/i.exec(ql) || /\b(?:say|number|zahl|in german)\b.*?\b(\d{1,6})\b|\b(\d{1,6})\b.*\bin german/i.exec(ql);
  if(nm){ const n = +(nm[1] || nm[2]); return `**${n}** = **${numDe(n)}**${n > 20 && n < 100 && n % 10 ? `\n(21–99: the ONE comes first — ${n % 10} + und + ${n - n % 10})` : ''}\n${go('🔢 Numbers practice', '#/t/numbers')}`; }
  // conjugation
  const cj = /(?:conjugat\w*|konjugier\w*|forms? of|present (?:tense )?of)\s+(?:the verb\s+)?["„“]?([a-zäöüß ]+?)["“”]?\??$/i.exec(raw);
  if(cj){ const w = cj[1].trim().replace(/^sich /,''); let e = DICT.get(lo(w)); if(!e || e.pos !== 'verb'){ const v = VERBS.find(x => lo(x.i) === lo(w) || lo(x.i).endsWith(lo(w))); if(v) e = {pos:'verb', vg:v, w:v.i, en:v.en}; }
    if(e && e.pos === 'verb') return wordCard(e, w);
    return `„${w}“ is not in the verb list of your classes yet. Regular verbs: ich -e, du -st, er -t, wir -en, ihr -t, sie -en.`; }
  // accusative of a noun
  const ak = /(?:accusative|akkusativ)\s+(?:of|von|for)?\s*["„“]?(?:der|die|das|ein|eine)?\s*([A-Za-zÄÖÜäöüß]+)/i.exec(raw);
  if(ak){ const e = lookupDe(ak[1]); if(e && e.g){ LAST.word = e; return nounCard(e) + '\n\n' + (e.g === 'm' ? `Example: **Ich habe einen ${e.de}.** · **Ich sehe den ${e.de}.** · Pronoun: **ihn**` : e.g === 'f' ? `Example: **Ich sehe die ${e.de}.** · Pronoun: **sie**` : e.g === 'n' ? `Example: **Ich kaufe das ${e.de}.** · Pronoun: **es**` : '') + '\n' + go('🎯 Accusative practice', '#/t/akkusativ'); }
    if(/^(case|pronouns?|prepositions?)$/i.test(ak[1])) return grammarAnswer('akkusativ'); }
  // article / gender
  const ar = /(?:der,? die,? (?:oder |or )?das|which article|article (?:of|for)|gender of|der oder die|die oder das|der oder das)\s*[:\-]?\s*["„“]?([A-Za-zÄÖÜäöüß]+)/i.exec(raw) || /^(?:is it )?(?:der|die|das) ([A-ZÄÖÜa-zäöüß]+)\s*\?$/i.exec(raw);
  if(ar){ const e = lookupDe(ar[1]); if(e && e.g) return nounCard(e) + '\n' + (whereFrom(e) || '') + '\n' + go('🎯 der/die/das practice', '#/t/nouns');
    const s = suggest(ar[1]); const e2 = s && DICT.get(s); if(e2 && e2.g) return `Did you mean **${e2.de}**?\n` + nounCard(e2);
    return `„${ar[1]}“ is not in your class words yet. Endings that help: -ung, -heit, -keit, -ion → die · -chen, -ment, -um → das · days, months → der.\n${go('🎯 Gender rules', '#/t/gender')}`; }
  // plural
  const pl = /(?:plural (?:of|for)|mehrzahl von|plural)\s+["„“]?(?:der|die|das)?\s*([A-Za-zÄÖÜäöüß]+)/i.exec(raw);
  if(pl){ const e = lookupDe(pl[1]); if(e && e.g) return e.pl ? `**${fullDe(e)}** → plural **die ${e.pl}**\n(The plural article is always die.)` : `**${fullDe(e)}** — no plural is given in your classes for this word.`; }
  // sentences with
  const sw = /(?:sentences?|examples?|beispiel\w*|satz|sätze)\s+(?:with|using|for|mit)\s+["„“]?([A-Za-zÄÖÜäöüß ]+?)["“”]?\??$/i.exec(raw);
  if(sw){ let w = sw[1].trim(); let ex = examplesWith(w, 6); if(!ex.length){ const e = findEnglish(w)[0]; if(e){ w = e.de || e.w; ex = examplesWith(w, 6); } }
    if(ex.length) return `Sentences with **${w}** from your classes and books:\n` + exLines(ex) + `\n\nNow make your own and I'll check it: [[fill:✍️ Check my sentence|check: ]]`;
    return `I found no sentence with „${w}“ in your classes yet. Write one and I'll check it: [[fill:✍️ Check my sentence|check: ]]`; }
  // English → German
  const en = /(?:how (?:do|to|can) (?:you |i )?say|what(?:'s| is) (?:.+?) in german|german (?:word )?for|translate|in german|auf deutsch)\s*["„“]?(.+?)["“”]?\s*(?:in german|auf deutsch)?\??$/i.exec(raw);
  if(en){ const t = en[1].replace(/\b(in german|auf deutsch)\b/i,'').trim(); const whole = CORPUS.find(c => c.en && lo(c.en).replace(/[.?!]/g,'') === lo(t).replace(/[.?!]/g,''));
    if(whole) return `🇬🇧 ${t}\n🇩🇪 **${whole.de}**  ${go(whole.where.split(' · ')[0], whole.href)}`;
    const hits = findEnglish(t); if(hits.length) return `🇬🇧 ${t} → 🇩🇪 **${entryHead(hits[0])}**\n\n` + wordCard(hits[0]) + (hits.length > 1 ? '\n\nAlso: ' + hits.slice(1).map(e => `**${entryHead(e)}** (${e.en})`).join(' · ') : '');
    const near = CORPUS.filter(c => c.en && lo(c.en).includes(lo(t))).slice(0, 3); if(near.length) return `Sentences with „${t}“:\n` + exLines(near);
    return `„${t}“ is not in your class words yet, so I can't be sure of the German. Try one word at a time (e.g. „how do you say dog“).`; }
  // meaning of a word
  const raw2 = raw.replace(/\s+mean\s*\??$/i,'');
  const mn = /(?:what does|what is|what's|meaning of|means?|bedeutet|was heißt|was ist|explain the word)\s+(?:the word\s+)?["„“]?([A-Za-zÄÖÜäöüß-]+(?: [A-Za-zÄÖÜäöüß-]+)?)["“”]?\s*(?:mean)?\??$/i.exec(raw2);
  if(mn && !GRAM.some(([id, rx]) => rx.test(mn[1]) && /akkusativ|accusative|nominativ|plural|negation|article|artikel|possessive|separable|präsens|modal/i.test(mn[1]))){
    const w = mn[1].replace(/^(der|die|das|ein|eine) /i,''); const e = lookupDe(w) || lookupDe(mn[1]); if(e) return wordCard(e, w);
    const s = suggest(w); if(s) return `Did you mean **${s}**?\n\n` + wordCard(DICT.get(s), s);
    const we = findEnglish(w); if(we.length) return `🇬🇧 ${w} → 🇩🇪 **${entryHead(we[0])}**\n\n` + wordCard(we[0]); }
  // a German sentence → check it
  const ws = words(raw);
  if(ws.length >= 3 && !/[?]$/.test(raw) && ws.filter(w => DICT.has(lo(w))).length >= Math.max(2, Math.ceil(ws.length * .6)) && !/\b(the|what|how|is|does|mean|you|my|and|of|to)\b/i.test(raw)) return checkAnswer(raw);
  // grammar question
  if(/\b(explain|what is|what's|how does|how do|when do|when to|rule|grammar|difference|why)\b/.test(ql) || GRAM.some(([, rx]) => rx.test(ql)) && words(ql).length > 2){ const g = grammarAnswer(raw); if(g) return g; }
  // single / few words
  if(ws.length && ws.length <= 3){
    const de = ws.map(w => [w, lookupDe(w)]).filter(x => x[1] && !(ws.length > 1 && /^(der|die|das|ein|eine|und|ist)$/i.test(x[0])));
    if(de.length) return de.slice(0, 2).map(([w,e]) => wordCard(e, w)).join('\n\n———\n\n');
    const eh = findEnglish(raw); if(eh.length) return `🇬🇧 ${raw} → 🇩🇪 **${entryHead(eh[0])}**\n\n` + wordCard(eh[0]);
    const s = suggest(ws[0]); if(s) return `Did you mean **${s}**?\n\n` + wordCard(DICT.get(s), s);
  }
  const g = grammarAnswer(raw); if(g) return g;
  const t = topicByWords(raw); if(t) return `This sounds like „${t.title}“:\n${topicButtons(t)}`;
  return `I couldn't find that in your classes. You can ask me:\n• one word in German or English (**Geschenk**, *dog*)\n• „der die das Tisch“ · „plural of Buch“ · „accusative of Hund“\n• „conjugate lesen“ · „say 47“\n• „explain the accusative“ · „nicht or kein?“\n• „check: ich habe ein Hund“\n• „take me to accusative practice“ · „help with this question“`;
}
function checkAnswer(t){
  const r = checkGerman(t);
  if(!r.mistakes.length) return `✅ **${t}**\nI found no mistakes. Gut gemacht! 👍\n(I check verb endings, capital letters and the accusative — word choice I can't fully judge.)`;
  return `Your sentence: ${t}\n\n` + r.mistakes.map((m, i) => `${i+1}. „${m[0]}“ → **${m[1]}** — ${m[2]}: ${m[3]}`).join('\n') + `\n\n✔️ Corrected: **${r.fixed}**\n\n[[fill:✍️ Check another sentence|check: ]]`;
}

/* ---------- 5. chat UI (same look as the main app) ---------- */
function fmt(t){
  return esc(t)
    .replace(/\*\*(.+?)\*\*/g, (m, x) => { const raw = x.replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/&quot;/g,'"'); return `<b class="de" lang="de">${x}</b> <button class="spk" data-say="${esc(raw)}" title="Listen">🔊</button>`; })
    .replace(/(^|[^*])\*([^*\n]+?)\*/g, '$1<i>$2</i>')
    .replace(/\[\[act:([^|\]]+)\|([^\]]+)\]\]/g, (m, l, q) => `<button class="chip act" data-act="${q}">${l}</button>`)
    .replace(/\[\[go:([^|\]]+)\|([^\]]+)\]\]/g, (m, l, h) => `<button class="chip go" data-go="${h}">${l} ›</button>`)
    .replace(/\[\[fill:([^|\]]+)\|([^\]]*)\]\]/g, (m, l, t) => `<button class="chip act" data-fill="${t}">${l}</button>`)
    .replace(/\n/g, '<br>');
}
function render(){
  const box = $('#chatMsgs'); if(!box) return;
  const quiz = window.__cur && document.querySelector('#app .q');
  box.innerHTML = (CHAT.length ? CHAT.map(m => `<div class="cm ${m.role}">${m.role === 'user' ? esc(m.content).replace(/\n/g,'<br>') : fmt(m.content)}</div>`).join('') : `<div class="cm assistant">${fmt(hello())}</div>`);
  $('#chatQuick').innerHTML = quiz ? `<button class="chip act" data-act="help with this question">🧩 Help with this question</button>` : '';
  box.scrollTop = box.scrollHeight;
}
function send(text){
  text = (text||'').trim(); if(!text) return;
  CHAT.push({role:'user', content:text});
  let a; try{ a = answer(text); }catch(e){ console.warn(e); a = 'Sorry, that one confused me 😅 Try one word, or „take me to accusative practice“.'; }
  CHAT.push({role:'assistant', content:a}); saveChat(); render();
}
function init(){
  const b = document.createElement('button'); b.id = 'chatBtn'; b.title = 'Ask your teacher'; b.setAttribute('aria-label','Open the chat teacher'); b.textContent = '💬'; document.body.appendChild(b);
  const p = document.createElement('div'); p.id = 'chatPanel'; p.hidden = true; p.setAttribute('translate','no');
  p.innerHTML = `<div class="chh"><b>🧑‍🏫 Class teacher</b><span class="chgrow"></span><button class="btn sm ghost" id="chatClear" title="Clear chat">🗑</button><button class="btn sm ghost" id="chatX" title="Close">✕</button></div>
    <div id="chatMsgs"></div><div id="chatQuick" class="chq"></div><div id="chatLive" class="chlive"></div>
    <div class="chi"><textarea id="chatIn" rows="2" placeholder="Type or say a word — German or English…"></textarea><div class="chmic"><button class="btn sm" id="chatMic" title="Speak">🎤</button><button class="btn sm ghost" id="chatLang"></button></div><button class="btn go sm" id="chatGo">Send</button></div>`;
  document.body.appendChild(p);
  let scT = null;
  window.addEventListener('scroll', () => { b.classList.add('moving'); clearTimeout(scT); scT = setTimeout(() => b.classList.remove('moving'), 700); }, {passive:true});
  b.onclick = () => { p.hidden = !p.hidden; if(!p.hidden){ render(); $('#chatIn').focus(); } };
  $('#chatX').onclick = () => { p.hidden = true; };
  $('#chatClear').onclick = () => { CHAT = []; saveChat(); render(); };
  const submit = () => { $('#chatLive').innerHTML = ''; const t = $('#chatIn').value; $('#chatIn').value = ''; send(t); };
  $('#chatGo').onclick = submit;
  $('#chatIn').onkeydown = e => { if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); submit(); } };
  p.addEventListener('click', e => {
    const a = e.target.closest('[data-act]'); if(a) return send(a.dataset.act);
    const g = e.target.closest('[data-go]'); if(g){ if(window.innerWidth < 700) p.hidden = true; location.hash = g.dataset.go; return; }
    const f = e.target.closest('[data-fill]'); if(f){ const i = $('#chatIn'); i.value = f.dataset.fill; i.focus(); i.setSelectionRange(i.value.length, i.value.length); }
  });
  window.addEventListener('hashchange', () => { if(!p.hidden) setTimeout(render, 50); });
  // voice input
  let lang = 'de'; try{ lang = localStorage.getItem(CKEY + '.lang') || 'de'; }catch(e){}
  const lb = $('#chatLang'); const showLang = () => { lb.textContent = lang === 'en' ? '🇬🇧 EN' : '🇩🇪 DE'; lb.title = lang === 'en' ? 'I listen to ENGLISH — tap for German' : 'I listen to GERMAN — tap for English'; }; showLang();
  lb.onclick = () => { lang = lang === 'en' ? 'de' : 'en'; try{ localStorage.setItem(CKEY + '.lang', lang); }catch(e){} showLang(); };
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition; let rec = null;
  $('#chatMic').onclick = () => {
    const mb = $('#chatMic'), lv = $('#chatLive');
    if(!SR){ lv.textContent = '⚠️ Voice typing needs Chrome or Safari.'; return; }
    if(rec){ rec.stop(); return; }
    rec = new SR(); rec.lang = lang === 'en' ? 'en-US' : 'de-DE'; rec.interimResults = true; rec.maxAlternatives = 1;
    mb.classList.add('on'); mb.textContent = '⏹'; lv.textContent = '🎙️ Listening…'; let final = '';
    rec.onresult = ev => { let s = ''; for(const r of ev.results){ s += r[0].transcript; if(r.isFinal) final = s; } lv.textContent = '🎙️ ' + s; };
    rec.onerror = () => { lv.textContent = '❌ I heard nothing. Try again.'; };
    rec.onend = () => { mb.classList.remove('on'); mb.textContent = '🎤'; rec = null; if(final){ const i = $('#chatIn'); i.value = (i.value + ' ' + final).trim(); lv.textContent = '✍️ Written in the box — press Send.'; i.focus(); } setTimeout(() => { if(/^(✍️|❌|🎙️)/.test(lv.textContent)) lv.textContent = ''; }, 4000); };
    try{ rec.start(); }catch(e){ rec = null; mb.classList.remove('on'); mb.textContent = '🎤'; }
  };
}
init();
window.__CHAT = {answer, checkGerman, CORPUS, SECTIONS, send};
})();

/* Deutsch mit Anara — practice app engine.
   Content lives in lessons/LNN.js (one file per class) and data/verbs.js.
   Nothing here needs to change when a new class is added. */
(function(){
'use strict';
const LESSONS = (window.LESSONS || []).slice().sort((a,b)=> a.date < b.date ? -1 : a.date > b.date ? 1 : 0);
const VERBS = [];
{ const seen = new Set(); (window.VERBS||[]).forEach(v=>{ if(!seen.has(v.i)){ seen.add(v.i); VERBS.push(v);} }); }
const $app = document.getElementById('app');
const $pop = document.getElementById('pop');
const ART = {m:'der', f:'die', n:'das', pl:'die'};
const GCLS = {m:'m', f:'f', n:'n', pl:'p'};
const PERS = ['ich','du','er/sie/es','wir','ihr','sie/Sie'];

/* ---------------- storage (per viewer, safe if blocked) ---------------- */
const SKEY = 'anaraClass:v1';
let S = {sets:{}, mistakes:[], fc:{}, stats:{ans:0, ok:0, days:{}}};
try { const raw = localStorage.getItem(SKEY); if(raw){ const o = JSON.parse(raw); S = Object.assign(S, o); S.stats = Object.assign({ans:0,ok:0,days:{}}, o.stats||{}); } } catch(e){}
function save(){ try{ localStorage.setItem(SKEY, JSON.stringify(S)); }catch(e){} }
const today = () => new Date().toISOString().slice(0,10);

/* ---------------- helpers ---------------- */
const esc = s => String(s==null?'':s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rnd = n => Math.floor(Math.random()*n);
const pick = a => a[rnd(a.length)];
function shuffle(a){ a = a.slice(); for(let i=a.length-1;i>0;i--){ const j=rnd(i+1); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function norm(s){
  return String(s||'').toLowerCase()
    .replace(/[„“”"'’`´.,!?;:()\[\]–—-]/g,' ')
    .replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss')
    .replace(/\s+/g,' ').trim();
}
function alts(a){ return String(a).split('|').map(x=>x.trim()); }
function fmtDate(d){ try{ return new Date(d+'T12:00:00').toLocaleDateString('en-GB',{weekday:'short', day:'numeric', month:'short'}); }catch(e){ return d; } }
function hashItem(it){ const s = JSON.stringify(it); let h=0; for(let i=0;i<s.length;i++){ h=(h*31 + s.charCodeAt(i))|0; } return 'h'+h; }
function lessonById(id){ return LESSONS.find(l=>l.id===id); }

/* ---------------- speech ---------------- */
let deVoice = null;
function pickVoice(){ try{ const vs = speechSynthesis.getVoices(); deVoice = vs.find(v=>/^de(-|_)DE/i.test(v.lang) && /Anna|Petra|Helena|Google/i.test(v.name)) || vs.find(v=>/^de/i.test(v.lang)) || null; }catch(e){} }
try{ pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }catch(e){}
function speak(t){
  try{
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(t).replace(/___/g,' … '));
    u.lang = 'de-DE'; u.rate = 0.9; if(deVoice) u.voice = deVoice;
    speechSynthesis.speak(u);
  }catch(e){}
}
const spk = t => `<button class="spk" title="Listen" data-say="${esc(t)}">🔊</button>`;
document.addEventListener('click', e=>{
  const b = e.target.closest('[data-say]'); if(b){ e.preventDefault(); speak(b.getAttribute('data-say')); return; }
});

/* ---------------- verbs ---------------- */
function verb(i){ return VERBS.find(v=>v.i===i); }
function conj(v){
  if(typeof v === 'string') v = verb(v);
  if(!v) return null;
  if(v.g==='irr') return v.f.slice();
  if(v.g==='sep'){ const b = conj(v.base) || conj({i:v.base,g:'reg'}); return b; }
  const stem = v.i.replace(/e?n$/,'');
  const td = /(t|d|chn|ffn|gn|dm|tm)$/.test(stem);
  const s = /(s|ß|z|x)$/.test(stem);
  const e = td ? 'e' : '';
  const f = [stem+'e', stem+e+(s?'t':'st'), stem+e+'t', v.i, stem+e+'t', v.i];
  if(v.g==='strong'){ f[1]=v.du; f[2]=v.er; }
  return f;
}
function sepForm(v, p){ const f = conj(v); return [f[p], v.pre]; }

/* ---------------- dictionary (tap any German word) ---------------- */
const DICT = new Map();
function addD(key, entry, force){ if(!key) return; key = key.toLowerCase(); if(force || !DICT.has(key)) DICT.set(key, entry); }
const BASIC = {
 ich:'I', du:'you (informal)', er:'he / it', sie:'she / they', es:'it', wir:'we', ihr:'you all (informal) / her', mich:'me', dich:'you (acc.)',
 und:'and', oder:'or', aber:'but', nicht:'not', ja:'yes', nein:'no', sehr:'very', auch:'also / too', nur:'only', gern:'gladly — I like to …', gerne:'gladly — I like to …',
 heute:'today', jetzt:'now', hier:'here', da:'there', dort:'there', mit:'with', ohne:'without', aus:'from / out of', in:'in / into', nach:'to (cities, countries) / after',
 um:'at (time) / around', zu:'to / too / closed', für:'for', von:'from / of', bei:'at / near / with', im:'in the', am:'at the / on the', ins:'into the', zum:'to the', zur:'to the',
 der:'the (masculine)', die:'the (feminine / plural)', das:'the (neuter) / this / that', den:'the (masculine, accusative)', dem:'the (dative)', des:'of the',
 ein:'a / an (masc. / neuter)', eine:'a / an (feminine)', einen:'a / an (masculine, accusative)', einem:'a (dative)', einer:'a (dative/genitive fem.)',
 kein:'no / not a (masc. / neuter)', keine:'no / not a (fem. / plural)', keinen:'no / not a (masc. accusative)',
 mein:'my', meine:'my', dein:'your', deine:'your', sein:'his / its — also: to be', seine:'his / its', unser:'our', unsere:'our', euer:'your (plural)', eure:'your (plural)', ihre:'her / their / your (formal: Ihre)',
 was:'what', wer:'who', wo:'where', woher:'where from', wohin:'where to', wie:'how', wann:'when', warum:'why', welche:'which', viel:'much / a lot', viele:'many',
 alles:'everything', bitte:'please / you\'re welcome', danke:'thank you', hallo:'hello', tschüss:'bye', guten:'good', gute:'good', morgen:'tomorrow (Morgen = morning)',
 dann:'then', danach:'after that', zuerst:'first', noch:'still / another / more', schon:'already', immer:'always', oft:'often', manchmal:'sometimes', nie:'never',
 zusammen:'together', allein:'alone', wieder:'again', gut:'good / well', schlecht:'bad', so:'so / like this', also:'so / therefore', denn:'because / then', ganz:'quite / whole',
 etwas:'something / a bit', nichts:'nothing', man:'one / you (people in general)', links:'left', rechts:'right', ab:'from (time) / off', an:'at / on', auf:'on / open', vor:'before / in front of', fern:'far',
 mal:'times / just', zwei:'two', drei:'three', vier:'four', eins:'one', fünf:'five', sechs:'six', sieben:'seven', acht:'eight', neun:'nine', zehn:'ten', elf:'eleven', zwölf:'twelve',
 uhr:'o\'clock / clock', tage:'days', tag:'day', abend:'evening', abends:'in the evenings', nacht:'night', woche:'week', wochenende:'weekend', zeit:'time', hause:'home (zu Hause = at home, nach Hause = (to) home)',
 frau:'woman / Mrs', herr:'Mr / gentleman', mann:'man / husband', kind:'child', kinder:'children', leute:'people', freund:'friend (m)', freunde:'friends', freundin:'friend (f) / girlfriend',
 deutsch:'German (language)', englisch:'English', name:'name', alt:'old', neu:'new', groß:'big / tall', klein:'small', richtig:'correct', falsch:'wrong', richtige:'correct', heißt:'is called / means',
 wiedersehen:'see again (Auf Wiedersehen = goodbye)', entschuldigung:'excuse me / sorry', ok:'okay', okay:'okay'
};
function buildDict(){
  Object.entries(BASIC).forEach(([k,v])=> addD(k, {w:k, en:v}));
  VERBS.forEach(v=>{
    const e = {w:v.i, en:v.en, pos:'verb', vg:v};
    addD(v.i, e, true);
    const f = conj(v); if(f && v.g!=='sep') f.forEach(x=> addD(x, Object.assign({form:true}, e)));
  });
  LESSONS.forEach(l=> (l.vocab||[]).forEach(w=>{
    if(!w.g && verb(w.de)) return; // keep the richer verb entry (shows conjugation)
    const e = Object.assign({lid:l.id}, w);
    const key = w.de.replace(/^(der|die|das) /,'');
    addD(key, e, true);
    if(w.pl && w.pl!=='—') addD(w.pl.replace(/^die /,''), Object.assign({plf:true}, e));
  }));
}
/* every verb of the app (class verbs, word bank lists, extra text verbs) + all its forms → tap-for-meaning */
const ALLV = new Map(); // infinitive → {i, en}
function addVerbForms(){
  if(!window.VFORMS) return;
  VERBS.forEach(v=> ALLV.set(v.i, {i:v.i, en:v.en}));
  (WB.verbList.weak||[]).concat(WB.verbList.strong||[]).concat(window.EXTRA_VERBS||[]).forEach(v=>{ const i = (v.de||v.i).replace(/^sich |\s*\(sich\)/g,'').replace(/^weh tun$/,'wehtun'); if(!ALLV.has(i)) ALLV.set(i, {i, en:v.en, sich:/sich/.test(v.de||'')}); });
  ALLV.forEach(v=>{
    const f = VFORMS(v.i);
    const base = {w:v.i, en:v.en, pos:'verb', vg: verb(v.i) || {i:v.i, en:v.en, g:'irr', f:[f.ich, f.du, f.er, f.wir, f.ihr, f.sie]}};
    if(!DICT.has(v.i)) addD(v.i, base);
    const first = x => String(x).split(' … ')[0];
    [[first(f.prat),'the 2nd form (Präteritum)'],[f.part,'the 3rd form (Partizip II)'],[first(f.du),'the du-form'],[first(f.er),'the er/sie/es-form'],[first(f.ich),'the ich-form']].forEach(([k, what])=>{ if(k && !DICT.has(k.toLowerCase())) addD(k, Object.assign({form:true, formOf:what}, base)); });
  });
}
function addBankToDict(){
  WBN.forEach(w=> addD(w.de, Object.assign({wb:1}, w)));
  WBN.forEach(w=>{ if(w.pl && w.pl!=='—') addD(w.pl, Object.assign({plf:true}, w)); });
  [].concat(WB.preps, WB.adjs, WB.advs).forEach(w=> addD(w.de.replace(/-$/,''), {w:w.de, en:w.en}));
}
/* find a word even when it is inflected: meinen → mein, kleinen → klein, komm → kommen, Äpfel → Apfel,
   Apfelsaft → Apfel + Saft, names → „a name“ */
const LCACHE = new Map();
function lookupWord(t){
  const k = String(t||''); const lo = k.toLowerCase(); if(LCACHE.has(k)) return LCACHE.get(k);
  let e = DICT.get(lo);
  if(!e && window.XDICT && window.XDICT[lo]) e = window.XDICT[lo];
  const tryK = (w, note) => { if(e || !w || w.length < 2) return; const h = DICT.get(w) || (window.XDICT||{})[w]; if(h){ e = note ? Object.assign({}, h, {form:true, formOf: note, w:h.w||h.de}) : h; } };
  // adjective / article / possessive endings
  [['em',''],['en',''],['er',''],['es',''],['e','']].forEach(([end])=>{ if(lo.endsWith(end) && lo.length > end.length+2){ const b = lo.slice(0, -end.length); const h = DICT.get(b) || (window.XDICT||{})[b]; if(!e && h && !h.g && !h.pos) e = Object.assign({}, h, {form:true, formOf:`„${k}“ = ${b} + ending -${end}`}); } });
  // imperative / verb stem (komm, kauf, wohn-) → verb
  if(!e && /^[a-zäöüß]+$/.test(lo)){ ['en','n','eln','ern'].forEach(x=> tryK(lo + x, 'the imperative / stem')); }
  // noun plurals: -n, -en, -e, -er, -s, umlaut
  if(!e && /^[A-ZÄÖÜ]/.test(k)){ const un = s => s.replace(/ä/g,'a').replace(/ö/g,'o').replace(/ü/g,'u').replace(/äu/g,'au');
    for(const end of ['en','n','e','er','s','']){ if(lo.endsWith(end)){ const b = lo.slice(0, lo.length - end.length); for(const c of [b, un(b)]){ const h = DICT.get(c); if(h && h.g){ e = Object.assign({}, h, {form:true, formOf:'a plural'}); break; } } } if(e) break; } }
  // compound nouns: last part decides the article
  if(!e && /^[A-ZÄÖÜ][a-zäöüß]{5,}$/.test(k)){ for(let i = 3; i <= lo.length - 3; i++){ const head = lo.slice(i), first = lo.slice(0, i).replace(/s$/,''); const h = DICT.get(head); if(h && h.g){ const f = DICT.get(first) || DICT.get(first.replace(/n$/,'')) || DICT.get(first+'en') || DICT.get(first+'e'); e = {de:k, g:h.g, en:`${f ? (f.en||'').split(/[,/;(]/)[0].trim() + ' + ' : ''}${(h.en||'').split(/[,/;(]/)[0].trim()} (compound: ${f ? (f.de||f.w)+' + ' : ''}${h.de})`, note:`Compound noun: the last part „${h.de}“ gives the article ${ART[h.g]}.`}; break; } } }
  if(!e && window.NAMES && window.NAMES[k]) e = {w:k, en:window.NAMES[k]};
  if(!e && window.NUMWORD && /^[a-zäöüß]+$/.test(lo)){ const n = NUMWORD(lo); if(n != null) e = {w:k, en:`the number ${n}`, note:'Numbers 21–99: the ONE comes first — einundzwanzig = 1 + and + 20.'}; }
  LCACHE.set(k, e || null); return e || null;
}
function tokens(text){ return String(text).split(/([A-Za-zÄÖÜäöüß]+)/); }
function linkText(text){
  return tokens(text).map((t,i)=>{
    if(i%2===0) return esc(t);
    const e = lookupWord(t);
    return e ? `<span class="w" data-w="${esc(t)}">${esc(t)}</span>` : esc(t);
  }).join('');
}
function linkify(root){
  (root||document).querySelectorAll('.de:not([data-l])').forEach(el=>{
    el.setAttribute('data-l','1');
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = []; while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n=>{
      if(n.parentElement && n.parentElement.closest('.w,.spk,button,input,.en')) return;
      const html = linkText(n.nodeValue);
      if(html === esc(n.nodeValue)) return;
      const span = document.createElement('span'); span.innerHTML = html; n.replaceWith(...span.childNodes);
    });
  });
}
function nounLabel(w){
  if(!w.g) return esc(w.de);
  if(w.g==='pl') return `<span class="p">die</span> ${esc(w.de)}`;
  return `<span class="${GCLS[w.g]}">${ART[w.g]}</span> ${esc(w.de)}`;
}
function fullDe(w){ return w.g ? (w.g==='pl' ? 'die ' : ART[w.g]+' ') + w.de : w.de; }
function showPop(el){
  const t = el.getAttribute('data-w'); const e = lookupWord(t); if(!e) return;
  return showPop2(el, e, t);
}
function showPop2(el, e, t){
  let head, body = `<div>${esc(e.en)}</div>`;
  if(e.de && isVerbWord(e) && window.VFORMS){ return showPop2(el, Object.assign({}, e, {w:e.de.replace(/^sich |\s*\(sich\)/g,''), pos:'verb', de:undefined, g:undefined}), t); }
  if(e.de){ head = nounLabel(e); if(e.pl) body += `<div class="muted">Plural: ${e.pl==='—'?'no plural':'die '+esc(e.pl)}</div>`;
    if(e.g==='m') body += `<div class="muted">Masculine · accusative: <b>den / einen ${esc(e.de)}</b> · pronoun er → ihn</div>`; else if(e.g==='f') body += `<div class="muted">Feminine · accusative stays <b>die / eine ${esc(e.de)}</b> · pronoun sie</div>`; else if(e.g==='n') body += `<div class="muted">Neuter · accusative stays <b>das / ein ${esc(e.de)}</b> · pronoun es</div>`; else if(e.g==='pl') body += `<div class="muted">Plural word · always <b>die</b></div>`; if(e.plf) body = `<div class="muted">plural of</div>` + body; if(e.opp) body += `<div class="muted">Opposite: ${esc(e.opp)}</div>`; if(e.note) body += `<div class="muted">${esc(e.note)}</div>`; }
  else if(e.pos==='verb'){
    head = esc(e.w); const vf = window.VFORMS ? VFORMS(e.w) : null;
    if(e.form) body = `<div class="muted">„${esc(t)}“ = ${esc(e.formOf||'a form')} of <b>${esc(e.w)}</b></div>` + body;
    if(vf){
      body += `<div class="pf">1️⃣ <b>${esc(vf.inf)}</b> · 2️⃣ <b>${esc(vf.prat)}</b> · 3️⃣ <b>${esc(vf.perfekt)}</b></div>`;
      body += `<div class="muted">Präsens: ich ${esc(vf.ich)} · du ${esc(vf.du)} · er/sie/es ${esc(vf.er)}${vf.change?` <b>(${esc(vf.change)})</b>`:''}</div>`;
      body += `<div class="muted">Type: ${esc((window.VKIND||{})[vf.kind]||vf.kind)}${vf.pre?` · separable: „${esc(vf.pre)}“ goes to the end`:''}${vf.ins?` · inseparable ${esc(vf.ins)}- (no ge-)`:''}</div>`;
      body += `<div class="muted">Perfekt: ich ${vf.aux==='sein'?'bin':'habe'} … ${esc(vf.part)}</div>`;
    }
  } else { head = esc(e.w); if(e.note) body += `<div class="muted">${esc(e.note)}</div>`; }
  $pop.innerHTML = `<b>${head}</b> ${spk(e.de?fullDe(e):e.w)}${body}`;
  $pop.style.display='block';
  const r = el.getBoundingClientRect(); const pw = Math.min(300, window.innerWidth-24);
  let x = Math.max(12, Math.min(r.left, window.innerWidth - pw - 12));
  let y = r.bottom + 6; if(y + 120 > window.innerHeight) y = Math.max(12, r.top - $pop.offsetHeight - 6);
  $pop.style.left = x+'px'; $pop.style.top = y+'px';
  speak(e.de?fullDe(e):t);
}
document.addEventListener('click', e=>{
  const w = e.target.closest('.w'); if(w){ showPop(w); return; }
  if(!e.target.closest('#pop')) $pop.style.display='none';
});
window.addEventListener('scroll', ()=>{ $pop.style.display='none'; }, {passive:true});

/* ---------------- numbers ---------------- */
const ONES = ['null','eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun','zehn','elf','zwölf','dreizehn','vierzehn','fünfzehn','sechzehn','siebzehn','achtzehn','neunzehn'];
const TENS = ['','','zwanzig','dreißig','vierzig','fünfzig','sechzig','siebzig','achtzig','neunzig'];
function u100(n){ if(n<20) return ONES[n]; const t=Math.floor(n/10), o=n%10; return o ? (o===1?'ein':ONES[o])+'und'+TENS[t] : TENS[t]; }
function u1000(n){ const h=Math.floor(n/100), r=n%100; let s=''; if(h) s=(h===1?'ein':ONES[h])+'hundert'; if(r||!h) s+=u100(r); return s; }
function numDe(n){
  if(n===1000000) return 'eine Million';
  if(n<1000) return u1000(n);
  const th=Math.floor(n/1000), r=n%1000;
  return (th===1?'ein':u1000(th).replace(/eins$/,'ein'))+'tausend'+(r?u1000(r):'');
}
function numAlts(n){ const s=numDe(n); const a=[s]; if(/^einhundert/.test(s)) a.push(s.replace(/^einhundert/,'hundert')); if(/^eintausend/.test(s)) a.push(s.replace(/^eintausend/,'tausend')); return a.join('|'); }

/* ---------------- all vocab ---------------- */
function allVocab(lid){ const out=[], seen=new Set(); LESSONS.forEach(l=>{ if(lid && l.id!==lid) return; (l.vocab||[]).forEach(w=>{ const k=(w.g||'')+'|'+w.de; if(!lid && seen.has(k)) return; seen.add(k); out.push(Object.assign({lid:l.id}, w)); }); }); return out; }
function nouns(){ return allVocab().filter(w=> w.g && w.g!=='pl'); }
function genderRule(w){
  const d = w.de.toLowerCase();
  if(/(ung|heit|keit|schaft|ion|tät|ie|ei|ik|in)$/.test(d) && w.g==='f') return 'Words ending in -ung, -heit, -keit, -schaft, -ion, -tät, -ie, -ei, -ik (and female people in -in) are <b>die</b>.';
  if(/(chen|lein|ment|um)$/.test(d) && w.g==='n') return 'Words ending in -chen, -lein, -ment, -um are <b>das</b>.';
  if(/(ling|ismus|or)$/.test(d) && w.g==='m') return 'Words ending in -ling, -ismus, -or are <b>der</b>.';
  if(/e$/.test(d) && w.g==='f') return 'Most nouns ending in -e are <b>die</b>.';
  return 'No simple rule here — learn it together with the article: <b>'+esc(fullDe(w))+'</b>.';
}

/* ---------------- drills (endless generators) ---------------- */
const SUBJ = [['Ich',0],['Du',1],['Er',2],['Sie',2,'(she)'],['Es',2],['Wir',3],['Ihr',4],['Sie',5,'(they / formal you)'],['Maria',2],['Peter',2],['Anara',2],['Ahsan',2],['Paul und Eva',5],['Die Kinder',5]];
const SEPCTX = {aufstehen:'um 7 Uhr', fernsehen:'am Abend', einkaufen:'im Supermarkt', anrufen:'meine Mutter', abfahren:'um 8 Uhr', ankommen:'in Berlin', aufräumen:'das Zimmer', mitkommen:'heute', vorlesen:'den Text', aufmachen:'das Fenster', zumachen:'die Tür', anmachen:'das Licht', ausmachen:'den Computer', einsteigen:'in den Bus', aussteigen:'in Frankfurt', ankreuzen:'die richtige Antwort', abholen:'Lena', anklicken:'den Link', anmelden:'für den Kurs', aufhören:'um 5 Uhr', ausfüllen:'das Formular', kennenlernen:'neue Leute', umziehen:'nach Berlin', vorstellen:'heute', abgeben:'die Hausaufgabe', anfangen:'um 9 Uhr', anziehen:'schnell', ausziehen:'schnell', aussehen:'gut', einladen:'Peter ins Kino'};
const REFL = ['mich','dich','sich','uns','euch','sich'];
function conjItem(filter){
  const pool = VERBS.filter(filter); const v = pick(pool); const p = rnd(6);
  if(v.g==='sep'){
    const s = pick(SUBJ.filter(x=>x[1]===p)) || SUBJ[0]; const [f, pre] = sepForm(v, s[1]);
    return {t:'fill', q:`${s[0]} ___ ${v.r?REFL[s[1]]+' ':''}${SEPCTX[v.i]||'heute'} ___.`, a:[f, pre], h:`${v.i} — ${v.en}${s[2]?' · '+s[0]+' '+s[2]:''}`, x:`<b>${esc(v.i)}</b> is separable: the verb goes in position 2, the prefix <b>${esc(pre)}</b> goes to the end.`};
  }
  const s = pick(SUBJ.filter(x=>x[1]===p)); const f = conj(v);
  let x = `<b>${esc(v.i)}</b> (${esc(v.en)}): ich ${f[0]}, du ${f[1]}, er/sie/es ${f[2]}, wir ${f[3]}, ihr ${f[4]}, sie/Sie ${f[5]}.`;
  if(v.g==='strong') x += ` Stem change <b>${esc(v.ch)}</b> only for du and er/sie/es.`;
  else if(/(t|d|chn|ffn|gn)$/.test(v.i.replace(/e?n$/,''))) x += ' Stem ends in -t/-d → extra <b>e</b> (du …est, er …et).';
  else if(/(s|ß|z|x)$/.test(v.i.replace(/e?n$/,''))) x += ' Stem ends in -s/-ß/-z → du only adds <b>-t</b>.';
  if(v.r) x += ` Reflexive: ich ${f[0]} <b>mich</b>, du ${f[1]} <b>dich</b>, er ${f[2]} <b>sich</b>, wir … <b>uns</b>, ihr … <b>euch</b>, sie … <b>sich</b>.`;
  return {t:'fill', q:`${s[0]} ___${v.r?' '+REFL[p]:''}.`, a:[f[p]], h:`${v.i} — ${v.en}${s[2]?' · '+s[2]:''}`, x};
}
const AKK = [['Ich','besuchen','Großvater','m','grandfather'],['Du','bezahlen','Fahrkarte','f','ticket'],['Maria','buchen','Reise','f','trip'],['Karl','braten','Steak','n','steak'],['Ich','kennen','Professor','m','professor'],['Ihr','kaufen','Deutschbuch','n','German book'],['Wir','lernen','Wörter','pl','words'],['Du','brauchen','Wörterbuch','n','dictionary'],['Ich','trinken','Orangensaft','m','orange juice'],['Er','verstehen','Wort','n','word'],['Wir','zählen','Stühle','pl','chairs'],['Er','bestellen','Mineralwasser','n','mineral water'],['Du','lesen','Zeitung','f','newspaper'],['Ich','essen','Apfel','m','apple'],['Ich','essen','Erdbeeren','pl','strawberries'],['Du','sehen','Film','m','film'],['Eva','tragen','Tasche','f','bag'],['Ich','treffen','Freunde','pl','friends'],['Du','haben','Sonnenbrille','f','sunglasses'],['Sie','machen','Hausaufgabe','f','homework'],['Ich','brauchen','Wecker','m','alarm clock'],['Ich','brauchen','Computer','m','computer'],['Ich','brauchen','Kreditkarte','f','credit card'],['Ich','brauchen','Schirm','m','umbrella'],['Walter','kaufen','Salat','m','salad'],['Walter','kaufen','Flasche Wein','f','bottle of wine'],['Walter','kaufen','Schokoladenkuchen','m','chocolate cake'],['Wir','haben','Auto','n','car'],['Er','möchten','Kaffee','m','coffee'],['Ich','möchten','Käsekuchen','m','cheesecake'],['Anara','kaufen','Brot','n','bread'],['Du','nehmen','Tee','m','tea'],['Ich','suchen','Schlüssel','m','key'],['Er','schreiben','Brief','m','letter'],['Wir','bestellen','Pizza','f','pizza'],['Ich','sehen','Hund','m','dog'],['Du','brauchen','Handy','n','mobile phone'],['Er','kaufen','Uhr','f','watch / clock'],['Ich','haben','Bruder','m','brother'],['Maria','fragen','Lehrer','m','teacher'],['Wir','besuchen','Museum','n','museum'],['Ahsan','brauchen','Wohnung','f','flat'],['Ich','möchten','Tasse Tee','f','cup of tea']];
const AKKF = {def:{m:'den',f:'die',n:'das',pl:'die'}, ind:{m:'einen',f:'eine',n:'ein'}, neg:{m:'keinen',f:'keine',n:'kein',pl:'keine'}};
const PIDX = {Ich:0,Du:1,Er:2,Wir:3,Ihr:4,Sie:5};
function akkItem(){
  const [s, vi, noun, g, en] = pick(AKK); const p = PIDX[s]!=null ? PIDX[s] : 2;
  const modes = g==='pl' ? ['def','neg'] : ['def','ind','neg']; const m = pick(modes);
  const f = conj(vi)[p]; const ans = AKKF[m][g];
  const nomArt = {def:{m:'der',f:'die',n:'das',pl:'die'}, ind:{m:'ein',f:'eine',n:'ein'}, neg:{m:'kein',f:'keine',n:'kein',pl:'keine'}}[m][g];
  const label = {def:'definite (der/die/das)', ind:'indefinite (ein/eine)', neg:'negative (kein)'}[m];
  return {t:'fill', q:`${s} ${f} ___ ${noun}.`, a:[ans], h:`${label} · nominative: ${nomArt} ${noun} = ${en}`, x: g==='m' ? `Masculine changes in the accusative: <b>der → den, ein → einen, kein → keinen</b>.` : `Only masculine changes in the accusative. ${g==='pl'?'Plural':g==='f'?'Feminine':'Neuter'} stays the same: <b>${nomArt} → ${ans}</b>.`};
}
function negItem(){
  const w = pick(nouns().filter(w=>w.g!=='pl')); const ind = w.g==='f'?'eine':'ein'; const k = w.g==='f'?'keine':'kein';
  if(Math.random()<.35 && w.pl && w.pl!=='—') return {t:'fill', q:`Sind das ${w.pl}? – Nein, das sind ___ ${w.pl}.`, a:['keine'], h:`${w.pl} = ${w.en} (plural)`, x:'Plural: <b>keine</b>.'};
  if(Math.random()<.5) return {t:'fill', q:`Das ist ___ ${w.de}.`, a:[ind], h:`${w.en} · ${fullDe(w)}`, x:`${fullDe(w)} → <b>${ind}</b> ${w.de} (m/n = ein, f = eine).`};
  return {t:'fill', q:`Ist das ${ind} ${w.de}? – Nein, das ist ___ ${w.de}.`, a:[k], h:`${w.en}`, x:`Negate a noun with <b>kein</b>: ein → kein, eine → keine.`};
}
const POSS = [['ich','mein'],['du','dein'],['er','sein'],['sie – she','ihr'],['es','sein'],['wir','unser'],['ihr – you all','euer'],['sie – they','ihr'],['Sie – formal','Ihr']];
function possItem(){
  const [pr, base] = pick(POSS); const pool = allVocab().filter(w=>w.g && ['m','f','n'].includes(w.g));
  const w = pick(pool); const usePl = Math.random()<.25 && w.pl && w.pl!=='—';
  const ending = (usePl || w.g==='f') ? 'e' : '';
  const form = base==='euer' && ending ? 'eure' : base+ending;
  const q = usePl ? `(${pr}) Das sind ___ ${w.pl}.` : `(${pr}) Das ist ___ ${w.de}.`;
  return {t:'fill', q, a:[form], h: usePl ? `${w.pl} = ${w.en} (plural)` : `${fullDe(w)} = ${w.en}`, x:`${pr.split(' ')[0]} → <b>${base}</b>. Add <b>-e</b> for feminine and plural${base==='euer'?' (euer → eure)':''}: ${usePl?'plural':ART[w.g]} → <b>${form}</b>.`};
}
function artItem(){
  const w = pick(nouns());
  return {t:'mcq', q:`___ ${w.de}  (${w.en})`, o:['der','die','das'], a:['m','f','n'].indexOf(w.g), say:fullDe(w), x:genderRule(w)};
}
function plItem(){
  const pool = allVocab().filter(w=>w.g && w.g!=='pl' && w.pl && w.pl!=='—'); const w = pick(pool);
  return {t:'fill', q:`${fullDe(w)} → zwei ___`, a:[w.pl], h:w.en, x:`Plural: <b>die ${esc(w.pl)}</b>. Always learn the plural with the noun.`};
}
function numItem(){
  const r = Math.random(); let n;
  if(r<.35) n = rnd(100); else if(r<.6) n = 100+rnd(900); else if(r<.85) n = 1000+rnd(99000); else n = rnd(10)===0 ? 1000000 : 100000+rnd(900000);
  if(Math.random()<.5) return {t:'fill', q:`${n.toLocaleString('de-DE')} = ___`, a:[numAlts(n)], h:'Write the number as one word', x:`<b>${numDe(n)}</b>. Units come before tens: 21 = <b>ein</b>und<b>zwanzig</b>.`, wide:true};
  return {t:'fill', q:`${numDe(n)} = ___`, a:[String(n)+'|'+n.toLocaleString('de-DE')], h:'Write the digits', x:`${numDe(n)} = <b>${n.toLocaleString('de-DE')}</b>`};
}
const SEIN_C = ['müde','aus Pakistan','zu Hause','krank','in Bishkek','glücklich','sehr nett','heute frei','im Büro','sehr fleißig'];
const HAB_C = ['Zeit','Hunger','Durst','ein Auto','einen Bruder','zwei Kinder','Fragen','eine Wohnung','keinen Computer','heute Deutschunterricht'];
function seinItem(){
  const isSein = Math.random()<.55; const s = pick(SUBJ); const f = conj(isSein?'sein':'haben')[s[1]];
  const c = pick(isSein?SEIN_C:HAB_C);
  return {t:'fill', q:`${s[0]} ___ ${c}.`, a:[f], h:`${isSein?'sein — to be':'haben — to have'}${s[2]?' · '+s[2]:''}`, x: isSein ? 'sein: ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind' : 'haben: ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben'};
}
function vocabItem(pool){
  pool = pool || allVocab(); const w = pick(pool);
  const others = shuffle(pool.filter(x=>x.en!==w.en && x.de!==w.de)).slice(0,3);
  if(others.length<3) return artItem();
  if(Math.random()<.5){ const o = shuffle([w, ...others]); return {t:'mcq', q:`What does „${fullDe(w)}“ mean?`, o:o.map(x=>x.en), a:o.indexOf(w), say:fullDe(w), x:`<b>${esc(fullDe(w))}</b> = ${esc(w.en)}`}; }
  const o = shuffle([w, ...others]); return {t:'mcq', q:`How do you say „${w.en}“ in German?`, o:o.map(fullDe), a:o.indexOf(w), say:fullDe(w), x:`<b>${esc(fullDe(w))}</b> = ${esc(w.en)}`};
}
const DRILLS = [
  {id:'conj-reg', name:'Regular verbs (Präsens)', d:'kommen, wohnen, lernen … plus -t/-d verbs (arbeiten) and -s/-z verbs (heißen, tanzen)', gen:()=>conjItem(v=>['reg','td','s'].includes(v.g) && !v.helper && !v.nodrill)},
  {id:'conj-td', name:'-t / -d / -s verbs', d:'du arbeitest, er findet, du heißt, du tanzt', gen:()=>conjItem(v=>(v.g==='td'||v.g==='s') && !v.helper)},
  {id:'conj-strong', name:'Stem-changing verbs', d:'a→ä (fahren), e→i (essen), e→ie (lesen), au→äu (laufen)', gen:()=>conjItem(v=>v.g==='strong' && !v.helper)},
  {id:'conj-sep', name:'Separable verbs', d:'Ich stehe um 7 Uhr auf. Er sieht am Abend fern.', gen:()=>conjItem(v=>v.g==='sep' && !v.nodrill)},
  {id:'sein-haben', name:'sein & haben', d:'ich bin / ich habe …', gen:seinItem},
  {id:'conj-all', name:'All verbs mixed', d:'every verb of the course', gen:()=>conjItem(v=>!v.helper && !v.nodrill)},
  {id:'articles', name:'der, die or das?', d:'every noun of the course, with gender rules', gen:artItem},
  {id:'plural', name:'Plural forms', d:'das Buch → die Bücher', gen:plItem},
  {id:'neg', name:'ein / kein', d:'Ist das ein Tisch? – Nein, das ist kein Tisch.', gen:negItem},
  {id:'poss', name:'mein, dein, sein, ihr …', d:'Das ist meine Tasche.', gen:possItem},
  {id:'akk', name:'Accusative (den, einen, keinen)', d:'Ich brauche den Wecker. Er kauft einen Salat.', gen:akkItem},
  {id:'numbers', name:'Numbers 0 – 1 000 000', d:'digits ↔ words', gen:numItem},
  {id:'vocab', name:'Word meanings', d:'all words of the course, both directions', gen:()=>vocabItem()}
];


/* ---------------- more generators (topic hub) ---------------- */
const WB = window.WORDBANK || {list300:[], themes:[], verbList:{weak:[],strong:[]}, preps:[], adjs:[], advs:[]};
const WBN = []; // all word-bank nouns {de,g,en,pl,cat}
{ const seen = new Set();
  WB.list300.forEach(c=> c.words.forEach(w=>{ if(w.g && !seen.has(w.g+w.de)){ seen.add(w.g+w.de); WBN.push(Object.assign({cat:c.cat}, w)); } }));
  WB.themes.forEach(c=> c.words.forEach(w=>{ if(w.g && !seen.has(w.g+w.de)){ seen.add(w.g+w.de); WBN.push(Object.assign({cat:c.cat}, w)); } })); }
const listVerbs = () => VERBS.filter(v=>v.L==='VL' && !v.helper && !v.nodrill);
const MODALS = ['können','dürfen','mögen','müssen','sollen','wollen','möchten'];
const drillVerbs = v => !v.helper && !v.nodrill;

// sentence frames from class, book and homework: [verb, rest of sentence]
const CTX = [
 ['lernen','Deutsch in der Sprachschule'],['machen','am Wochenende Sport'],['spielen','gerne Fußball im Park'],['wohnen','in Berlin'],['arbeiten','als Ingenieur in einer großen Firma'],
 ['lernen','jeden Tag Vokabeln'],['machen','die Hausaufgaben am Abend'],['spielen','ein Instrument'],['wohnen','in einer schönen Wohnung im Zentrum'],['arbeiten','in einer Bank'],
 ['spielen','Klavier sehr gut'],['wohnen','seit zwei Jahren in dieser Stadt'],['arbeiten','heute den ganzen Tag'],['lernen','gerne Fremdsprachen'],['machen','eine Reise nach Deutschland'],
 ['wohnen','auf dem Land'],['arbeiten','am Sonntag'],['lernen','jetzt Spanisch'],['machen','eine Pause'],['kommen','aus Pakistan'],['kommen','aus Österreich, aus Wien'],
 ['wohnen','in Prag'],['sprechen','Deutsch, Englisch und ein bisschen Russisch'],['heißen','Florian'],['tanzen','gern'],['schwimmen','gern'],['kochen','gern'],['hören','gern Musik'],
 ['fotografieren','gern'],['reisen','nach Spanien'],['reden','mit Paul'],['antworten','nicht'],['studieren','in München'],['trinken','Orangensaft'],['kaufen','Obst'],
 ['fragen','Frau Lehmann'],['gehen','nach Hause'],['braten','Fisch am Wochenende'],['fahren','mit dem Bus zur Schule'],['halten','an der Ampel'],['schlafen','gut in der Nacht'],
 ['tragen','eine schwarze Jacke'],['waschen','das Auto am Samstag'],['essen','gern Pizza'],['geben','das Buch zurück'],['helfen','oft meiner Mutter'],['nehmen','den Bus Nummer 5'],
 ['sprechen','Deutsch im Unterricht'],['treffen','Kollegen zum Mittagessen'],['lesen','viel in den Ferien'],['sehen','einen Film im Kino'],['laufen','schnell zum Bahnhof'],['fahren','gern mit dem Zug'],
 ['malen','Bilder'],['bedienen','Gäste'],['untersuchen','Patienten'],['schreiben','viele E-Mails'],['entwickeln','Computerspiele'],['unterrichten','Kinder'],['präsentieren','oft Projekte'],
 ['konstruieren','Solarautos'],['haben','viele Besprechungen'],['lesen','viele Bücher'],['schlafen','8 Stunden'],['essen','Bananen'],['helfen','dir'],['warten','auf den Bus'],
 ['finden','das Buch interessant'],['kosten','2,60 €'],['sammeln','Briefmarken'],['bestellen','einen Tee'],['bezahlen','die Rechnung'],['besuchen','die Tante'],['verstehen','das Problem'],
 ['vergessen','die Hausaufgabe'],['empfehlen','das Steak'],['brauchen','einen Wecker'],['kennen','den Professor'],['suchen','den Schlüssel'],['möchten','einen Kaffee mit Milch'],
 ['sein','zu Hause'],['sein','sehr müde'],['haben','keine Zeit'],['haben','einen Bruder'],['können','gut schwimmen'],['müssen','heute arbeiten'],['wollen','nach Berlin fahren'],
 ['mögen','keinen Kaffee'],['dürfen','hier nicht rauchen'],['sollen','mehr Wasser trinken'],['werden','Ingenieur'],['tun','das gern'],['feiern','heute Geburtstag'],['wandern','am Wochenende'],
 ['wiederholen','die Wörter'],['buchstabieren','den Namen'],['telefonieren','mit Anara'],['reparieren','das Fahrrad'],['schicken','eine E-Mail'],['heiraten','im Sommer'],['mieten','eine Wohnung'],
 ['zahlen','mit Karte'],['danken','dem Lehrer'],['denken','an die Prüfung'],['bringen','die Kinder zur Schule'],['gewinnen','das Spiel'],['schließen','die Tür'],['bitten','um Hilfe']
];
function ctxItem(filter){
  const pool = CTX.filter(c=>{ const v=verb(c[0]); return v && (!filter || filter(v)); });
  const [vi, rest] = pick(pool); const v = verb(vi); const s = pick(SUBJ); const f = conj(v)[s[1]];
  return {t:'fill', q:`${s[0]} ___ ${rest}.`, a:[f], h:`${vi} — ${v.en}${s[2]?' · '+s[2]:''}`, x:`<b>${esc(vi)}</b>: ich ${conj(v).join(', ')} → ${esc(s[0])} <b>${esc(f)}</b>.`};
}
function yesNoItem(){
  const [vi, rest] = pick(CTX.filter(c=>verb(c[0]) && !MODALS.includes(c[0]) && !/nicht|dir|mir/.test(c[1])));
  const v = verb(vi); const s = pick([['du',1,'Du'],['ihr',4,'Ihr'],['Sie',5,'Sie'],['er',2,'Er'],['Maria',2,'Maria']]); const f = conj(v)[s[1]];
  const stmt = `${s[2]} ${f} ${rest}.`; const qs = `${f[0].toUpperCase()+f.slice(1)} ${s[0]} ${rest}?`;
  if(Math.random()<.5) return {t:'order', a:qs, en:`Make a yes/no question from: „${stmt}“`, x:'Yes/no question: the verb goes to <b>position 1</b>.'};
  const neg = Math.random()<.4, plus = Math.random()<.5;
  const ans = neg ? (plus?'Doch':'Nein') : (plus?'Ja':'Nein');
  const qq = neg ? `${f[0].toUpperCase()+f.slice(1)} ${s[0]} nicht ${rest}?` : qs;
  return {t:'mcq', q:`${qq} (${plus?'+':'–'})  – ___, …`, o:['Ja','Nein','Doch'], a:['Ja','Nein','Doch'].indexOf(ans), x: neg ? (plus ? 'Negative question + positive answer → <b>Doch</b>.' : 'Negative question + negative answer → <b>Nein</b>.') : (plus ? 'Positive question + yes → <b>Ja</b>.' : 'No → <b>Nein</b> (+ nicht / kein).')};
}
const WQ = [
 ['Wie','heißt du?','Ich heiße Ahsan.'],['Woher','kommst du?','Ich komme aus Pakistan.'],['Wo','wohnst du?','Ich wohne in Bischkek.'],['Welche','Sprachen sprichst du?','Ich spreche Urdu, Englisch und ein bisschen Deutsch.'],
 ['Was','machst du hier in Berlin?','Ich lerne Deutsch.'],['Was','ist das?','Das ist Käse.'],['Wer','kauft Käse?','Peter kauft Käse.'],['Wo','kauft Peter Käse?','Im Supermarkt.'],['Woher','kommt der Käse?','Aus Frankreich.'],
 ['Wer','kauft Brot?','Carlos kauft Brot.'],['Wie','heißt die Lehrerin?','Sie heißt Frau Lehmann.'],['Was','trinkt Paul?','Paul trinkt Bier.'],['Wer','wohnt in Passau?','Peter und Maria wohnen in Passau.'],['Was','studiert ihr?','Wir studieren Jura.'],
 ['Wer','lernt Deutsch?','Wir lernen Deutsch.'],['Wie','alt ist Thomas?','Er ist 20 Jahre alt.'],['Wie','spät ist es?','Es ist jetzt 12:00 Uhr.'],['Wohin','gehst du?','Ich gehe nach Hause.'],['Wohin','fliegst du?','Ich fliege nach Japan.'],
 ['Wo','arbeitet Lisa?','Lisa arbeitet zu Hause.'],['Woher','kommt Hatem?','Hatem kommt aus Kairo.'],['Wo','studiert ihr?','Wir studieren in Zürich.'],['Wohin','reist ihr?','Wir reisen nach Rom.'],
 ['Was','sind Sie von Beruf?','Ich bin Ingenieur.'],['Was','machen Sie beruflich?','Ich arbeite als Manager.'],['Wie','ist Ihr Name?','Mein Name ist Peter Schneider.'],['Wie','ist die Telefonnummer von Martina?','Die Telefonnummer von Martina ist 5 26 39 81.'],
 ['Was','machst du gern?','Ich spiele gern Fußball.'],['Was','kostet der Kaffee?','Der Kaffee kostet 2,60 €.'],['Wer','ist das?','Das ist Felix, der Sohn von Peter.'],['Welche','Sprache lernst du?','Ich lerne Deutsch.'],
 ['Was','möchten Sie?','Ich möchte einen Kaffee mit Milch und Zucker.'],['Wann','stehst du auf?','Ich stehe um 7 Uhr auf.'],['Warum','lernst du Deutsch?','Ich möchte in Deutschland arbeiten.'],['Wo','ist London?','London ist in England.'],
 ['Wer','bist du?','Ich bin Ahsan.'],['Wie','geht es dir?','Gut, danke.'],['Woher','sind Sie?','Ich bin aus Kirgisistan.'],['Was','ist dein Hobby?','Mein Hobby ist Fußball.'],['Wann','sind wir zu Hause?','Um sechs Uhr.']
];
const WWORDS = ['Wer','Was','Wo','Woher','Wohin','Wie','Welche','Wann','Warum'];
function wqItem(){
  const [w, rest, ans] = pick(WQ);
  if(Math.random()<.6){ const o = shuffle(WWORDS.filter(x=>x!==w)).slice(0,3).concat([w]); const oo = shuffle(o); return {t:'mcq', q:`___ ${rest} – ${ans}`, o:oo, a:oo.indexOf(w), say:`${w} ${rest}`, x:`<b>${w}</b> ${esc(rest)}  · Wer = who · Was = what · Wo = where · Woher = where from · Wohin = where to · Wie = how · Welche = which · Wann = when · Warum = why`}; }
  return {t:'order', a:`${w} ${rest}`, en:`Question for the answer: „${ans}“`, x:'W-question: question word in position 1, verb in position 2.'};
}
const DUSIE = [['wohnen','in Berlin'],['kommen','aus Madrid'],['lernen','Deutsch'],['trinken','Bier'],['heißen',''],['arbeiten','in Berlin'],['studieren','in Passau'],['fahren','nach Frankfurt'],['gehen','ins Kino'],['spielen','Fußball'],['sprechen','Englisch'],['machen','morgen'],['haben','Zeit'],['lesen','gern'],['essen','gern Pizza'],['schlafen','lange']];
function duSieItem(){
  const [vi, rest] = pick(DUSIE); const v = verb(vi); const f = conj(v);
  const who = pick([['Ich frage Carlos:',1,'du'],['Ich frage Frau Mayer:',5,'Sie'],['Ich frage Anna und Maria:',4,'ihr'],['Ich frage Frau Müller und Frau Berg:',5,'Sie'],['Ich frage Peter:',1,'du'],['Ich frage Herrn Maier:',5,'Sie'],['Ich frage Mark und Robert:',4,'ihr'],['Ich frage Herrn und Frau Müller:',5,'Sie']]);
  const verbF = f[who[1]]; const V = verbF[0].toUpperCase()+verbF.slice(1);
  const q = vi==='heißen' ? `${who[0]} „Wie ___ ___?“` : `${who[0]} „___ ___ ${rest}?“`;
  return {t:'fill', q, a:[vi==='heißen'?verbF:V, who[2]], h:`${vi} — ${v.en}`, x:`One friend → <b>du</b> · several friends → <b>ihr</b> · formal (one or many) → <b>Sie</b>. Here: <b>${who[2]} ${verbF}</b>.`};
}
function nichtKeinItem(){
  const r = Math.random();
  if(r<.45){ const w = pick(nouns().filter(w=>w.g!=='pl')); const k = w.g==='f'?'keine':'kein'; const ind = w.g==='f'?'eine':'ein';
    return {t:'mcq', q:`Ist das ${ind} ${w.de}? – Nein, das ist ___ ${w.de}.`, o:[k,'nicht', k==='kein'?'keine':'kein'], a:0, x:`A noun with ein / eine → <b>kein / keine</b>. (${fullDe(w)} = ${esc(w.en)})`}; }
  const N = [['Ich wohne ___ in Berlin.','Wohnst du in Berlin?'],['Ich tanze ___ gern.','Tanzt du gern?'],['Ich lerne ___ Spanisch.','Lernst du Spanisch?'],['Ich kenne Lisa ___.','Kennst du Lisa?'],['Ich lese ___.','Liest du?'],['Ich trinke das Wasser ___.','Trinkst du das Wasser?'],['Ich bin ___ krank.','Bist du krank?'],['Ich gehe ___ ins Kino.','Gehst du ins Kino?'],['Carlos kommt ___ aus Rom.','Kommt Carlos aus Rom?'],['Ich reise ___ nach Hamburg.','Reist du nach Hamburg?'],['Ich besuche Klaus ___.','Besuchst du Klaus?'],['Carlos lernt ___ viel.','Lernt Carlos viel?'],['Das Buch ist ___ teuer.','Ist das Buch teuer?'],['Ich stehe ___ um 7 Uhr auf.','Stehst du um 7 Uhr auf?'],['Anna kommt ___ mit.','Kommt Anna mit?'],['Ich verstehe das ___.','Verstehst du das?']];
  const K = [['Ich habe ___ Zeit.','keine','die Zeit'],['Ich habe ___ Auto.','kein','das Auto'],['Ich trinke jetzt ___ Tee.','keinen','der Tee (accusative)'],['Das ist ___ Brot.','kein','das Brot'],['Das sind ___ Äpfel.','keine','plural'],['Ich habe ___ Bruder.','keinen','der Bruder (accusative)'],['Das ist ___ Suppe.','keine','die Suppe'],['Ich esse jetzt ___ Pizza.','keine','die Pizza'],['Leider habe ich ___ Uhr.','keine','die Uhr'],['Ich habe jetzt ___ Probleme.','keine','plural']];
  if(r<.75){ const [q,quest] = pick(N); return {t:'mcq', q:`${quest} – Nein, ${q.replace(/^(Ich|Das) /, m=>m.toLowerCase())}`, o:['nicht','kein','keine'], a:0, x:'Verbs, adjectives, places, names and definite nouns → <b>nicht</b>. Position: at the end, or before the place / adjective / gern / prefix.'}; }
  const [q,a,why] = pick(K); const o = shuffle(['nicht','kein','keine','keinen']); return {t:'mcq', q, o, a:o.indexOf(a), x:`<b>${a}</b> — ${esc(why)}. Nouns with ein or without article are negated with <b>kein</b> (same endings as ein).`};
}
function wbArtItem(){ const w = pick(WBN.filter(w=>w.g!=='pl')); return {t:'mcq', q:`___ ${w.de}  (${w.en})`, o:['der','die','das'], a:['m','f','n'].indexOf(w.g), say:fullDe(w), x:genderRule(w)+(w.pl?` Plural: die ${esc(w.pl)}.`:'')}; }
function wbMeanItem(pool){
  pool = pool || WBN; const w = pick(pool); const others = shuffle(pool.filter(x=>x.en!==w.en && x.de!==w.de)).slice(0,3);
  const o = shuffle([w, ...others]);
  if(Math.random()<.5) return {t:'mcq', q:`What does „${fullDe(w)}“ mean?`, o:o.map(x=>x.en), a:o.indexOf(w), say:fullDe(w), x:`<b>${esc(fullDe(w))}</b> = ${esc(w.en)}${w.cat?' · '+esc(w.cat):''}`};
  return {t:'mcq', q:`„${w.en}“ in German?`, o:o.map(fullDe), a:o.indexOf(w), say:fullDe(w), x:`<b>${esc(fullDe(w))}</b> = ${esc(w.en)}`};
}
function spellItem(pool){
  pool = pool || WBN; const w = pick(pool); const full = fullDe(w);
  return {t:'tr', en:w.en, h: w.g ? 'Write the noun WITH its article (der / die / das)' : 'Write the German word', a:[full], x:`<b>${esc(full)}</b>${w.pl?' · plural: die '+esc(w.pl):''}`};
}
function wbPlItem(){ const pool = WBN.filter(w=>w.pl && w.pl!=='—' && w.pl!=='-'); const w = pick(pool); return {t:'fill', q:`${fullDe(w)} → zwei ___`, a:[w.pl], h:w.en, x:`Plural: <b>die ${esc(w.pl)}</b>.`}; }
function verbMeanItem(pool){
  pool = pool || VERBS.filter(drillVerbs); const v = pick(pool); const others = shuffle(pool.filter(x=>x.i!==v.i && x.en!==v.en)).slice(0,3); const o = shuffle([v, ...others]);
  if(Math.random()<.5) return {t:'mcq', q:`What does „${v.i}“ mean?`, o:o.map(x=>x.en), a:o.indexOf(v), say:v.i, x:`<b>${esc(v.i)}</b> = ${esc(v.en)} · ich ${esc(conj(v)[0])}${v.g==='sep'?' … '+esc(v.pre):''}, du ${esc(conj(v)[1])}, er ${esc(conj(v)[2])}`};
  return {t:'mcq', q:`„${v.en.replace(/^\(sich\) \S+ — /,'')}“ in German?`, o:o.map(x=>x.i), a:o.indexOf(v), say:v.i, x:`<b>${esc(v.i)}</b> = ${esc(v.en)}`};
}
function verbTypeItem(pool){ pool = pool || VERBS.filter(drillVerbs); const v = pick(pool); return {t:'tr', en:v.en.replace(/^\(sich\) \S+ — /,'')+(v.r?' (reflexive: sich …)':''), h:'Write the infinitive (e.g. lernen)', a: v.i==='wehtun' ? ['wehtun','weh tun'] : [v.i], x:`<b>${esc(v.i)}</b> — ich ${esc(conj(v)[0])}${v.g==='sep'?' … '+esc(v.pre):''}`}; }
function smallWordItem(){ const pool = [].concat(WB.preps.map(x=>Object.assign({k:'preposition'},x)), WB.advs.map(x=>Object.assign({k:'adverb / small word'},x)), WB.adjs.map(x=>Object.assign({k:'adjective'},x))); const w = pick(pool); const others = shuffle(pool.filter(x=>x.en!==w.en && x.k===w.k)).slice(0,3); const o = shuffle([w,...others]);
  if(Math.random()<.5) return {t:'mcq', q:`What does „${w.de}“ mean? (${w.k})`, o:o.map(x=>x.en), a:o.indexOf(w), say:w.de, x:`<b>${esc(w.de)}</b> = ${esc(w.en)}`};
  return {t:'mcq', q:`„${w.en}“ in German? (${w.k})`, o:o.map(x=>x.de), a:o.indexOf(w), say:w.de, x:`<b>${esc(w.de)}</b> = ${esc(w.en)}`}; }
function adjItem(){ const w = pick(WB.adjs); const others = shuffle(WB.adjs.filter(x=>x.en!==w.en)).slice(0,3); const o = shuffle([w,...others]); return Math.random()<.5 ? {t:'mcq', q:`What does „${w.de}“ mean?`, o:o.map(x=>x.en), a:o.indexOf(w), say:w.de, x:`<b>${esc(w.de)}</b> = ${esc(w.en)}`} : {t:'tr', en:w.en, h:'adjective', a:[w.de.replace(/-$/,'')], x:`<b>${esc(w.de)}</b>`}; }
const OPP = [['alt','neu'],['alt','jung'],['groß','klein'],['dick','dünn'],['lang','kurz'],['teuer','billig'],['schnell','langsam'],['laut','leise'],['warm','kalt'],['heiß','kalt'],['gut','schlecht'],['richtig','falsch'],['einfach','schwierig'],['gesund','krank'],['fleißig','faul'],['süß','sauer'],['hart','weich'],['interessant','langweilig'],['verheiratet','ledig'],['hell','dunkel'],['früh','spät'],['hoch','niedrig'],['voll','leer'],['schön','hässlich'],['froh','traurig'],['müde','wach'],['hungrig','satt'],['viel','wenig'],['oft','selten'],['immer','nie']];
function oppItem(){ const pr = pick(OPP); const [a,b] = Math.random()<.5 ? pr : [pr[1],pr[0]]; const pool = [...new Set(OPP.flat())].filter(x=>x!==a && x!==b && !OPP.some(q=>(q[0]===a&&q[1]===x)||(q[1]===a&&q[0]===x))); const o = shuffle([b, ...shuffle(pool).slice(0,3)]); return {t:'mcq', q:`What is the opposite of „${a}“?`, o, a:o.indexOf(b), say:`${a} – ${b}`, x:`<b>${esc(a)}</b> ↔ <b>${esc(b)}</b>`}; }
function adjSentItem(){ // SK1 3.3: Ist das Auto neu? – Nein, es ist alt.
  const L = [['das Auto','es','neu','alt'],['der Film','er','interessant','langweilig'],['das Wasser','es','warm','kalt'],['die Milch','sie','billig','teuer'],['die Prüfung','sie','einfach','schwierig'],['Paul','er','gesund','krank'],['die Studentin','sie','faul','fleißig'],['das Auto','es','langsam','schnell'],['das Wetter','es','gut','schlecht'],['die Übung','sie','schwierig','einfach'],['die Kinder','sie','leise','laut'],['der Apfel','er','süß','sauer'],['die Jacke','sie','teuer','billig'],['das Brot','es','alt','frisch'],['der Mann','er','alt','jung'],['das Fahrrad','es','alt','neu'],['die Antwort','sie','richtig','falsch'],['das Ei','es','hart','weich'],['das Buch','es','dick','dünn'],['das Haus','es','klein','groß']];
  const [n,pr,a,b] = pick(L); const V = pr==='sie' && /Kinder/.test(n) ? 'sind' : 'ist'; const Q = V==='sind' ? 'Sind' : 'Ist';
  return {t:'fill', q:`${Q} ${n} ${a}? – Nein, ${pr} ${V} ___.`, a:[b+(b==='frisch'?'|neu':'')], h:'Answer with the opposite adjective', x:`${esc(a)} ↔ <b>${esc(b)}</b>. The pronoun matches the noun: der → er, die → sie, das → es, plural → sie.`};
}
const COLORS = [['eine Gurke','grün'],['eine Banane','gelb'],['eine Tomate','rot'],['der Ozean','blau'],['Milch','weiß'],['Kaffee','braun|schwarz'],['Orangensaft','orange'],['Blut','rot'],['eine Kirsche','rot'],['der Himmel','blau'],['Schnee','weiß'],['die Nacht','schwarz'],['eine Zitrone','gelb'],['Gras','grün'],['eine Maus','grau']];
function colorItem(){ const [n,c] = pick(COLORS); return {t:'fill', q:`Welche Farbe hat ${n}? – Sie / Er / Es ist ___.`, a:[c], h:'rot, gelb, grün, blau, weiß, schwarz, braun, grau, orange …', x:`${esc(n)} → <b>${esc(alts(c).join(' / '))}</b>`}; }
const COMP = [['das Wort','das Buch','das Wörterbuch','n'],['der Staub','der Sauger','der Staubsauger','m'],['das Video','der Recorder','der Videorecorder','m'],['der Mittag','das Essen','das Mittagessen','n'],['das Camping','der Bus','der Campingbus','m'],['das Wasser','der Kocher','der Wasserkocher','m'],['das Mineral','das Wasser','das Mineralwasser','n'],['kühl','der Schrank','der Kühlschrank','m'],
 ['die Sonne','der Schirm','der Sonnenschirm','m'],['die Wohnung','die Tür','die Wohnungstür','f'],['die Blume','die Vase','die Blumenvase','f'],['der Beruf','die Schule','die Berufsschule','f'],['schwarz','das Brot','das Schwarzbrot','n'],['groß','die Stadt','die Großstadt','f'],['frisch','die Milch','die Frischmilch','f'],['klein','das Kind','das Kleinkind','n'],['alt','das Papier','das Altpapier','n'],
 ['waschen','die Maschine','die Waschmaschine','f'],['fragen','das Wort','das Fragewort','n'],['spielen','der Platz','der Spielplatz','m'],['kaufen','das Haus','das Kaufhaus','n'],['reisen','das Büro','das Reisebüro','n'],['tanzen','der Kurs','der Tanzkurs','m'],['gehen','der Weg','der Gehweg','m'],['schlafen','die Tablette','die Schlaftablette','f'],['warten','das Zimmer','das Wartezimmer','n'],
 ['die Übung','das Buch','das Übungsbuch','n'],['die Orange','der Saft','der Orangensaft','m'],['das Kind','der Garten','der Kindergarten','m'],['hoch','das Haus','das Hochhaus','n'],['der Kaffee','die Maschine','die Kaffeemaschine','f'],['lehren','das Buch','das Lehrbuch','n'],['der Regen','der Schirm','der Regenschirm','m'],['der Fuß','der Ball','der Fußball','m'],['das Zimmer','der Schlüssel','der Zimmerschlüssel','m'],
 ['das Auto','der Schlüssel','der Autoschlüssel','m'],['der Tag','die Zeitung','die Tageszeitung','f'],['die Mode','die Zeitschrift','die Modezeitschrift','f'],['der Apfel','der Saft','der Apfelsaft','m'],['der Käse','der Kuchen','der Käsekuchen','m'],['der Computer','das Spiel','das Computerspiel','n'],['das Telefon','die Nummer','die Telefonnummer','f'],['die Sonne','die Brille','die Sonnenbrille','f'],
 ['die Sprache','die Schule','die Sprachschule','f'],['die Stadt','das Zentrum','das Stadtzentrum','n'],['das Haus','die Aufgabe','die Hausaufgabe','f'],['der Lippen-','der Stift','der Lippenstift','m'],['die Schokolade','der Kuchen','der Schokoladenkuchen','m'],['der Computer','der Kurs','der Computerkurs','m'],['der Schreib-','der Tisch','der Schreibtisch','m'],['das Bild','der Schirm','der Bildschirm','m']];
function compItem(){
  const [a,b,c,g] = pick(COMP); const noun = c.replace(/^(der|die|das) /,'');
  if(Math.random()<.65) return {t:'mcq', q:`___ ${noun}   (${a} + ${b})`, o:['der','die','das'], a:['m','f','n'].indexOf(g), say:c, x:`The <b>last word</b> (Grundwort) decides the gender: ${esc(b)} → <b>${esc(c)}</b>.`};
  return {t:'fill', q:`${a} + ${b} → ___`, a:[c], h:'Write the compound noun WITH its article', wide:true, x:`<b>${esc(c)}</b> — gender of the last word (${esc(b)}).`};
}
const RULES = [[/(ung)$/,'f','-ung'],[/(heit|keit)$/,'f','-heit / -keit'],[/(schaft)$/,'f','-schaft'],[/(ion)$/,'f','-ion'],[/(tät)$/,'f','-tät'],[/(ei)$/,'f','-ei'],[/(ik)$/,'f','-ik'],[/(ur)$/,'f','-ur'],[/(chen|lein)$/,'n','-chen / -lein'],[/(ment)$/,'n','-ment'],[/(um)$/,'n','-um'],[/(or)$/,'m','-or'],[/(ismus)$/,'m','-ismus'],[/(ling)$/,'m','-ling']];
function ruleItem(){
  const cands = WBN.concat(nouns()).filter(w=> w.g && w.g!=='pl' && RULES.some(r=>r[0].test(w.de.toLowerCase()) && r[1]===w.g));
  const extra = [['Bäckerei','f'],['Zeitung','f'],['Krankheit','f'],['Mannschaft','f'],['Aktion','f'],['Information','f'],['Musik','f'],['Natur','f'],['Universität','f'],['Mädchen','n'],['Tischlein','n'],['Brötchen','n'],['Appartement','n'],['Dokument','n'],['Zentrum','n'],['Datum','n'],['Motor','m'],['Professor','m'],['Monitor','m'],['Tourismus','m'],['Optimismus','m'],['Polizei','f'],['Metzgerei','f'],['Fabrik','f'],['Wirtschaft','f'],['Gesundheit','f'],['Wohnung','f'],['Packung','f']].map(([de,g])=>({de,g,en:''}));
  const w = pick(cands.concat(extra, extra)); const r = RULES.find(r=>r[0].test(w.de.toLowerCase()) && r[1]===w.g);
  return {t:'mcq', q:`___ ${w.de}${w.en?'  ('+w.en+')':''}`, o:['der','die','das'], a:['m','f','n'].indexOf(w.g), say:fullDe(w), x:`Rule: nouns ending in <b>${r[2]}</b> are <b>${ART[w.g]}</b>.`};
}
function ruleItem2(){ // der: male people, days, months, Tageszeiten; die: female people; das: infinitive as noun
  const L = [['Montag','m','days are der'],['Mittwoch','m','days are der'],['Freitag','m','days are der'],['Mai','m','months are der'],['Januar','m','months are der'],['Morgen','m','times of day are der (but: die Nacht)'],['Abend','m','times of day are der (but: die Nacht)'],['Nacht','f','exception: die Nacht'],['Onkel','m','male people are der'],['Opa','m','male people are der'],['Nachbar','m','male people are der'],['Kollege','m','male people are der'],['Löwe','m','male animals are der'],['Lehrerin','f','female people are die'],['Freundin','f','female people are die'],['Reporterin','f','female people are die'],['Katze','f','female animals are die'],['Tomate','f','often: vegetables / fruit are die'],['Birne','f','often: vegetables / fruit are die'],['Lernen','n','infinitive as noun → das'],['Essen','n','infinitive as noun → das'],['Tanzen','n','infinitive as noun → das'],['Lesen','n','infinitive as noun → das'],['Leben','n','infinitive as noun → das'],['Sprechen','n','infinitive as noun → das'],['Wagen','m','-en nouns are mostly der'],['Garten','m','-en nouns are mostly der'],['Kuchen','m','-en nouns are mostly der'],['Regen','m','-en nouns are mostly der'],['Norden','m','-en nouns are mostly der'],['Schinken','m','-en nouns are mostly der'],['Braten','m','-en nouns are mostly der'],['Ofen','m','-en nouns are mostly der']];
  const [de,g,why] = pick(L); return {t:'mcq', q:`___ ${de}`, o:['der','die','das'], a:['m','f','n'].indexOf(g), say:ART[g]+' '+de, x:`<b>${ART[g]} ${esc(de)}</b> — ${esc(why)}.`};
}
const JOBS = [['der Künstler','die Künstlerin','artist','Bilder malen'],['der Kellner','die Kellnerin','waiter','Gäste bedienen'],['der Arzt','die Ärztin','doctor','Patienten untersuchen'],['der Informatiker','die Informatikerin','computer scientist','Computerspiele entwickeln'],['der Lehrer','die Lehrerin','teacher','Kinder unterrichten'],['der Assistent','die Assistentin','assistant','viele E-Mails schreiben'],['der Student','die Studentin','student','viele Bücher lesen'],['der Architekt','die Architektin','architect','Projekte präsentieren'],['der Ingenieur','die Ingenieurin','engineer','Solarautos konstruieren'],['der Jurist','die Juristin','lawyer',''],['der Musiker','die Musikerin','musician',''],['der Physiker','die Physikerin','physicist',''],['der Koch','die Köchin','cook',''],['der Mathematiker','die Mathematikerin','mathematician',''],['der Journalist','die Journalistin','journalist','viele Artikel schreiben'],['der Designer','die Designerin','designer',''],['der Manager','die Managerin','manager','viele Besprechungen haben'],['der Kommissar','die Kommissarin','detective',''],['der Reporter','die Reporterin','reporter',''],['der Professor','die Professorin','professor','']];
function jobItem(){
  const j = pick(JOBS); const r = Math.random();
  if(r<.35) return {t:'fill', q:`${j[0]} → ___`, a:[j[1]], h:`female form (${j[2]})`, x:`<b>${esc(j[1])}</b> — female jobs add <b>-in</b>${/ä|ö/.test(j[1])?' (+ umlaut)':''}.`};
  if(r<.55) return {t:'fill', q:`${j[1]} → ___`, a:[j[0]], h:`male form (${j[2]})`, x:`<b>${esc(j[0])}</b>`};
  const withT = JOBS.filter(x=>x[3]);
  if(r<.8){ const k = pick(withT); const [obj, ...vv] = k[3].split(' ').reverse(); const others = shuffle(withT.filter(x=>x!==k)).slice(0,3); const o = shuffle([k,...others]); return {t:'mcq', q:`Was macht ${k[0].replace('der ','ein ')}?`, o:o.map(x=>x[3]), a:o.indexOf(k), x:`${esc(k[0].replace('der ','Ein '))} — ${esc(k[3])}.`}; }
  const k = pick(withT); const parts = k[3].split(' '); const inf = parts.pop(); const v = verb(inf); const f = v ? conj(v)[2] : inf;
  return {t:'fill', q:`${k[0].replace('der ','Ein ')} ___ ${parts.join(' ')}.`, a:[f], h:inf, x:`${esc(k[0].replace('der ','Ein '))} <b>${esc(f)}</b> ${esc(parts.join(' '))}.`};
}
const FAM = [['der Mann','die Frau','husband / wife'],['der Vater','die Mutter','father / mother'],['der Sohn','die Tochter','son / daughter'],['der Bruder','die Schwester','brother / sister'],['der Onkel','die Tante','uncle / aunt'],['der Freund','die Freundin','friend'],['der Großvater','die Großmutter','grandfather / grandmother'],['der Opa','die Oma','grandpa / grandma'],['der Junge','das Mädchen','boy / girl']];
const FAMQ = [['Sarah und Felix sind die ___ von Peter und Lucie.','Kinder'],['Susanne ist die ___ von Sarah und Felix.','Tante'],['Lucie ist die ___ von Peter.','Frau'],['Felix ist der ___ von Peter und Lucie.','Sohn'],['Susanne ist die ___ von Peter.','Schwester'],['Peter und Lucie sind die ___ von Sarah und Felix.','Eltern'],['Felix ist der ___ von Sarah.','Bruder'],['Ben ist der ___ von Sarah und Felix.','Onkel'],['Sarah ist die ___ von Peter und Lucie.','Tochter'],['Ben ist der ___ von Peter.','Bruder'],['Peter ist der ___ von Lucie.','Mann'],['Sarah und Felix sind ___.','Geschwister'],['Ben ist ___ und lebt jetzt allein in Köln.','geschieden'],['Susanne ist ___, sie lebt mit Edwin zusammen.','ledig'],['Peter ist ___. Er liebt seine Frau Lucie sehr.','verheiratet']];
function famItem(){ if(Math.random()<.55){ const [q,a] = pick(FAMQ); return {t:'fill', q, a:[a], h:'Spektrum L2 — die liebe Familie', x:`<b>${esc(a)}</b>`}; } const p = pick(FAM); return Math.random()<.5 ? {t:'fill', q:`${p[0]} → ___`, a:[p[1]], h:'female / partner form', x:`${esc(p[0])} ↔ <b>${esc(p[1])}</b> (${esc(p[2])})`} : {t:'fill', q:`${p[1]} → ___`, a:[p[0]], h:'male form', x:`<b>${esc(p[0])}</b> ↔ ${esc(p[1])}`}; }
const COUNTRY = [['Deutschland','Deutsch',''],['Österreich','Deutsch',''],['die Schweiz','Deutsch, Französisch, Italienisch','der'],['Bulgarien','Bulgarisch',''],['China','Chinesisch',''],['Dänemark','Dänisch',''],['Großbritannien','Englisch',''],['Frankreich','Französisch',''],['Griechenland','Griechisch',''],['Italien','Italienisch',''],['Japan','Japanisch',''],['die Niederlande','Niederländisch','den'],['Marokko','Arabisch',''],['Portugal','Portugiesisch',''],['Russland','Russisch',''],['Spanien','Spanisch',''],['die Türkei','Türkisch','der'],['Ungarn','Ungarisch',''],['Polen','Polnisch',''],['Schweden','Schwedisch',''],['Tschechien','Tschechisch',''],['Pakistan','Urdu',''],['Kirgisistan','Kirgisisch, Russisch','']];
function countryItem(){
  const c = pick(COUNTRY); const name = c[0].replace(/^die /,''); const aus = c[2] ? `aus ${c[2]} ${name}` : `aus ${name}`;
  const r = Math.random();
  if(r<.4){ const o = shuffle([c, ...shuffle(COUNTRY.filter(x=>x[1]!==c[1])).slice(0,3)]); return {t:'mcq', q:`Ich komme aus ${c[2]?c[2]+' '+name:name}. Ich spreche ___.`, o:o.map(x=>x[1]), a:o.indexOf(c), x:`${esc(c[0])} → <b>${esc(c[1])}</b>. Most languages end in <b>-isch</b>.`}; }
  if(r<.7 && c[2]) return {t:'fill', q:`Ich komme aus ___ ${name}.`, a:[c[2]], x:`${esc(c[0])} has an article → aus <b>${esc(c[2])}</b> ${esc(name)}.`};
  if(r<.85) return {t:'tr', en:`I come from ${({Deutschland:'Germany','Österreich':'Austria','die Schweiz':'Switzerland',Bulgarien:'Bulgaria',China:'China','Dänemark':'Denmark','Großbritannien':'Great Britain',Frankreich:'France',Griechenland:'Greece',Italien:'Italy',Japan:'Japan','die Niederlande':'the Netherlands',Marokko:'Morocco',Portugal:'Portugal',Russland:'Russia',Spanien:'Spain','die Türkei':'Turkey',Ungarn:'Hungary',Polen:'Poland',Schweden:'Sweden',Tschechien:'the Czech Republic',Pakistan:'Pakistan',Kirgisistan:'Kyrgyzstan'})[c[0]]}.`, a:[`Ich komme ${aus}.`], x:`Ich komme <b>${esc(aus)}</b>.`};
  const lang = c[1].split(',')[0]; return {t:'fill', q:`In ${c[0].startsWith('die ')?(c[2]==='den'?'den Niederlanden':'der '+name):name} spricht man ___.`, a:[c[1].split(', ').join('|')], x:`<b>${esc(c[1])}</b>`};
}
function phoneItem(){
  const groups = [String(1+rnd(9)), String(10+rnd(90)), String(10+rnd(90)), String(10+rnd(90))];
  const name = pick(['Martina','Doktor Müller','Anton','Eva','Peter','Lucie','Anara','Frau Keller','Knut','Sabine']);
  const words = groups.map(g=>numDe(+g)).join(' – ');
  if(Math.random()<.5) return {t:'fill', q:`Die Telefonnummer von ${name} ist ${words}. → ___`, a:[groups.join(' ')+'|'+groups.join('')], h:'write the digits', wide:true, x:`<b>${groups.join(' ')}</b>`};
  return {t:'fill', q:`${groups.join(' ')} = ___ – ___ – ___ – ___`, a:groups.map(g=>numAlts(+g)), h:'write each group in words', x:`<b>${esc(words)}</b>`};
}
const SOUNDS = [['ei','[ai] like „eye“','mein, Zeitung, heißen, schreiben'],['ie','[i:] long ee','die, sieben, spielen, viel'],['eu / äu','[oi] like „boy“','neu, Deutsch, Häuser, läuft'],['sch','[sh]','Schule, Tasche, schreiben'],['tsch','[ch] like „church“','Deutsch, tschüss, Quatsch'],['z','[ts]','zehn, Zeitung, tanzen'],['w','[v]','wohnen, Wasser, wie'],['v','[f] (mostly)','Vater, vier, viel'],['j','[y] like „yes“','ja, Jahr, Juli'],['ß','[s] sharp s','heißen, Straße, groß'],['sp / st (at the start)','[shp] / [sht]','spielen, sprechen, Student, Stuhl'],['ch after a, o, u','[x] hard „ach“-sound','acht, Buch, Woche'],['ch after e, i, ä, ö, ü','[ç] soft „ich“-sound','ich, nicht, Bücher'],['ä','[e] like in „bed“','Ärztin, Käse, fährt'],['ö','round lips + [e]','schön, hören, Österreich'],['ü','round lips + [i]','Tür, fünf, Stühle'],['h after a vowel','silent — makes the vowel long','gehen, fahren, Uhr'],['-er at the end','like a soft „a“','Lehrer, Vater, Computer'],['qu','[kv]','Quatsch, Quadratkilometer'],['-ig at the end','[iç] like „ich“','richtig, billig, fleißig']];
function soundItem(){ const s = pick(SOUNDS); const o = shuffle([s, ...shuffle(SOUNDS.filter(x=>x!==s)).slice(0,3)]); return Math.random()<.6 ? {t:'mcq', q:`How do you pronounce „${s[0]}“ (as in ${s[2]})?`, o:o.map(x=>x[1]), a:o.indexOf(s), say:s[2], x:`<b>${esc(s[0])}</b> = ${esc(s[1])}: ${esc(s[2])}`} : {t:'mcq', q:`Which letters make the sound ${s[1]}?`, o:o.map(x=>x[0]), a:o.indexOf(s), say:s[2], x:`<b>${esc(s[0])}</b>: ${esc(s[2])}`}; }
const ABC = 'A a · B be · C tse · D de · E e · F ef · G ge · H ha · I i · J jot · K ka · L el · M em · N en · O o · P pe · Q ku · R er · S es · T te · U u · V fau · W we · X iks · Y ypsilon · Z tset · Ä ä · Ö ö · Ü ü · ß eszett'.split(' · ').map(x=>x.split(' '));
function abcItem(){ const [L,n] = pick(ABC); const o = shuffle([n, ...shuffle(ABC.filter(x=>x[1]!==n)).slice(0,3).map(x=>x[1])]); return {t:'mcq', q:`How do you say the letter „${L}“ in German?`, o, a:o.indexOf(n), say:n, x:`${esc(L)} = <b>${esc(n)}</b>. Tricky: E = e, I = i, J = jot, V = fau, W = we, Y = ypsilon, Z = tset.`}; }
const SEPS = () => VERBS.filter(v=>v.g==='sep' && !v.nodrill);
const INSEP = ['bekommen','besuchen','bezahlen','beginnen','bestellen','erklären','erzählen','gehören','verkaufen','verstehen','vergessen','empfehlen','entwickeln','zerstören','unterrichten','untersuchen','unterschreiben','übernachten','überweisen','verdienen','vermieten','erlauben','wiederholen','besichtigen','bedeuten','benutzen','bedienen','gefallen','gewinnen'];
function sepYesNoItem(){
  const isSep = Math.random()<.5; const v = isSep ? pick(SEPS()) : verb(pick(INSEP.filter(i=>verb(i))));
  const f = conj(v); return {t:'mcq', q:`Is „${v.i}“ separable (trennbar)?`, o:[`trennbar: ich ${conj(v.g==='sep'?v.base:v)[0]} … ${v.pre||''}`.trim(),`nicht trennbar: ich ${v.g==='sep'?v.pre+conj(v.base)[0]:f[0]}`], a:isSep?0:1, say:v.i, x: isSep ? `<b>${esc(v.pre)}-</b> is a separable prefix (ab-, an-, auf-, aus-, ein-, mit-, vor-, zu-, zurück-, fern-, kennen-, um-…): ich ${esc(f[0])} … <b>${esc(v.pre)}</b>.` : `be-, emp-, ent-, er-, ge-, miss-, ver-, zer- (and here: unter-/über-/wieder-) stay together: ich <b>${esc(f[0])}</b>.`};
}
function sepOrderItem(){
  const v = pick(SEPS().filter(v=>SEPCTX[v.i])); const s = pick(SUBJ.filter(x=>!x[2])); const f = conj(v.base)[s[1]];
  const ctx = SEPCTX[v.i];
  if(Math.random()<.5) return {t:'order', a:`${s[0]} ${f} ${ctx} ${v.pre}.`, en:`(${v.i} — ${v.en})`, x:`Verb in position 2, prefix <b>${esc(v.pre)}</b> at the end.`};
  const sub = /^(Ich|Du|Er|Es|Wir|Ihr|Die Kinder)$/.test(s[0]) ? s[0][0].toLowerCase()+s[0].slice(1) : s[0];
  return {t:'order', a:`${f[0].toUpperCase()+f.slice(1)} ${sub} ${ctx} ${v.pre}?`, en:`Question: (${v.i} — ${v.en})`, x:`Yes/no question: verb first, prefix <b>${esc(v.pre)}</b> still at the end.`};
}
function insepItem(){ // SK1 4.1 Übung 1 style
  const L = [['besuchen','Max','die Tante'],['bezahlen','du','die Rechnung'],['beginnen','der Kurs','am Montag'],['empfehlen','ich','das Steak'],['erklären','die Lehrerin','die Grammatik'],['genießen','du','die Freizeit'],['verstehen','ich','das Problem'],['vergessen','Paul','die Hausaufgabe'],['verdienen','Karl','viel Geld'],['bekommen','Peter','ein Schnitzel'],['erzählen','die Oma','eine Geschichte'],['verkaufen','Herr Klein','sein Auto']];
  const [vi, s, rest] = pick(L); const v = verb(vi) || {i:vi, g: vi==='genießen'?'s':'reg', en:'to enjoy'}; const p = /^(ich)$/.test(s)?0: s==='du'?1:2; const f = conj(v)[p];
  return {t:'fill', q:`${s[0].toUpperCase()+s.slice(1)} ___ ${rest}. (${vi})`, a:[f], x:`<b>${esc(vi)}</b> is <b>not</b> separable — the prefix stays: ${esc(s)} <b>${esc(f)}</b>.`};
}
const AKKN = [['Koffer','m','packen','suitcase'],['Fenster','n','schließen','window'],['Freunde','pl','treffen','friends'],['Miete','f','bezahlen','rent'],['Problem','n','verstehen','problem'],['Leute','pl','kennen','people'],['Termin','m','aufschreiben','appointment'],['Schuhe','pl','anziehen','shoes'],['Formular','n','ausfüllen','form'],['Text','m','vorlesen','text'],['Kollegin','f','anrufen','colleague (f)'],['Handy','n','aufladen','mobile phone'],['Lehrer','m','fragen','teacher']];
function akkDefItem(){ // SK1 4.2 Übung 1: Ich frage den Lehrer.
  const [n,g,vi,en] = pick(AKKN); const art = {m:'den',f:'die',n:'das',pl:'die'}[g]; const v = verb(vi);
  let verbPart = vi, pre = '';
  if(v && v.g==='sep'){ verbPart = conj(v.base)[0]; pre = ' '+v.pre; } else if(v) verbPart = conj(v)[0]; else { const m = vi.match(/^(auf|an|aus|vor|ab|ein)(.*)$/); if(m){ const b = verb(m[2]) || {i:m[2], g:'reg'}; verbPart = conj(b)[0]; pre = ' '+m[1]; } else verbPart = conj({i:vi,g:'reg'})[0]; }
  return {t:'fill', q:`${n} – ${vi} → Ich ${verbPart} ___ ${n}${pre}.`, a:[art], h:en, x:`Accusative definite: <b>${art}</b> ${esc(n)}${g==='m'?' (der → den)':' (only masculine changes)'}.`};
}
const MENGE = [['ein Kotelett','n'],['eine Tasse Kaffee','f'],['die Banane hier','f'],['die Zeitung hier','f'],['Trauben','pl'],['ein Teller Suppe','m'],['ein Stück Kuchen','n'],['der Döner hier','m'],['eine Portion Eis','f'],['Orangensaft','x'],['der Salat hier','m'],['eine Tafel Schokolade','f'],['Erdnüsse','pl'],['ein Glas Wasser','n'],['der Text hier','m']];
function akkFrontItem(){ // SK1 4.2 Übung 3: Den Text hier lese ich.
  const [x,g] = pick(MENGE); let o = x;
  if(g==='m'){ o = x.replace(/^der /,'den ').replace(/^ein /,'einen '); }
  const verbFor = /Kaffee|Wasser|saft|Suppe/.test(x) ? ['trinke','Was trinkst du?'] : /Zeitung|Text/.test(x) ? ['lese','Was liest du?'] : ['esse','Was isst du?'];
  const cap = o[0].toUpperCase()+o.slice(1);
  return {t:'order', a:`${cap} ${verbFor[0]} ich.`, en:`${verbFor[1]} – (start with the object: ${x})`, x:`Object first → verb still in position 2 → subject after it. ${g==='m'?'Masculine object: <b>den / einen</b>.':''}`};
}
const KEINEN = [['Tee','m'],['ein Stück Kuchen','n'],['ein Eis','n'],['eine Pizza','f'],['Pommes','pl'],['ein Steak','n'],['Kirschsaft','m'],['eine Orange','f'],['Erdnüsse','pl'],['ein Sandwich','n'],['Mineralwasser','n'],['eine Kiwi','f'],['Gurkensalat','m'],['ein Apfel','m'],['Erdbeeren','pl'],['Milchkaffee','m'],['ein Burger','m']];
function keinenItem(){ // SK1 4.2 Übung 4
  const [x,g] = pick(KEINEN); const noun = x.replace(/^(ein|eine) /,'').replace(/^Stück /,'Stück ');
  const k = {m:'keinen',f:'keine',n:'kein',pl:'keine'}[g]; const isDrink = /saft|wasser|kaffee|Tee/i.test(noun);
  const ask = x.startsWith('ein') ? x.replace(/^ein (\w+)$/,(m,n)=> g==='m'?'einen '+n:'ein '+n) : x;
  return {t:'fill', q:`${isDrink?'Trinkst':'Isst'} du ${ask}? – Nein danke, ich ${isDrink?'trinke':'esse'} jetzt ___ ${noun}.`, a:[k], x:`${g==='m'?'masculine → <b>keinen</b>':g==='f'?'feminine → <b>keine</b>':g==='n'?'neuter → <b>kein</b>':'plural → <b>keine</b>'}`};
}
const LEIDER = [['Uhr','f','ich'],['Urlaub','m','ihr'],['Notebook','n','du'],['Garten','m','wir'],['Zeit','f','Lena'],['Auto','n','du'],['Stift','m','ich'],['E-Bike','n','ihr'],['Informationen','pl','Theo']];
function leiderItem(){ // SK1 4.2 Übung 5
  const [n,g,s] = pick(LEIDER); const p = {ich:0,du:1,wir:3,ihr:4}[s]; const f = conj('haben')[p==null?2:p]; const k = {m:'keinen',f:'keine',n:'kein',pl:'keine'}[g];
  return {t:'fill', q:`${n} – ${s} → Leider ___ ${s} ___ ${n}.`, a:[f,k], x:`Leider (position 1) → verb position 2 → subject: Leider <b>${esc(f)}</b> ${esc(s)} <b>${k}</b> ${esc(n)}.`};
}
function modalItem(){ const v = verb(pick(MODALS.filter(m=>m!=='mögen'))); const s = pick(SUBJ); const f = conj(v)[s[1]]; const inf = pick(['Deutsch lernen','nach Hause gehen','heute arbeiten','gut schwimmen','einen Kaffee trinken','das Zimmer aufräumen','um 7 Uhr aufstehen','mehr Wasser trinken']);
  return {t:'fill', q:`${s[0]} ___ ${inf}.`, a:[f], h:`${v.i} — ${v.en}${s[2]?' · '+s[2]:''}`, x:`<b>${esc(v.i)}</b>: ${conj(v).join(', ')}. ich and er/sie/es have the <b>same</b> form (no -t). The second verb goes to the end as infinitive.`}; }
function stemItem(){ // which verbs change the stem
  const strong = VERBS.filter(v=>v.g==='strong'); const v = pick(strong); const f = conj(v);
  const r = Math.random();
  if(r<.5) return {t:'fill', q:`${v.i}: ich ${f[0]} · du ___ · er/sie/es ___`, a:[f[1],f[2]], h:v.en, x:`<b>${esc(v.ch)}</b> only in du and er/sie/es: du <b>${esc(f[1])}</b>, er <b>${esc(f[2])}</b>. wir ${esc(f[3])}, ihr ${esc(f[4])} (no change!).`};
  if(r<.75) return {t:'fill', q:`${v.i}: wir ${f[3]} · ihr ___`, a:[f[4]], h:'Careful: ihr has NO vowel change', x:`ihr <b>${esc(f[4])}</b> — the vowel change is only for du and er/sie/es.`};
  const o = shuffle([f[1], v.i.replace(/en$/,'st'), f[1].replace(/st$/,'est')].filter((x,i,a)=>a.indexOf(x)===i)); return {t:'mcq', q:`du ___ (${v.i})`, o, a:o.indexOf(f[1]), say:'du '+f[1], x:`du <b>${esc(f[1])}</b> (${esc(v.ch)})`};
}
const PRON = [['Peter','er'],['Maria','sie'],['das Mädchen','es'],['Carlos und Maria','sie'],['Peter und ich','wir'],['Maria und du','ihr'],['Frau Berg','sie'],['Herr Schneider','er'],['das Kind','es'],['die Studentin','sie'],['der Student','er'],['Max und Anna','sie'],['Lena und du','ihr'],['Carlos und ich','wir'],['die Lehrerin','sie'],['der Lehrer','er'],['Paul und Lisa','sie']];
function pronItem(){ const [n,p] = pick(PRON); const [vi,rest] = pick(CTX.filter(c=>['wohnen','kommen','lernen','trinken','spielen','arbeiten','studieren','kaufen'].includes(c[0]))); const pi = {er:2,sie: /und/.test(n)?5:2, es:2, wir:3, ihr:4}[p]; const f = conj(vi)[pi];
  return {t:'fill', q:`${n} ${f} ${rest}. → ___ ${f} ${rest}.`, a:[p[0].toUpperCase()+p.slice(1)], h:'replace with a pronoun', x:`${esc(n)} → <b>${p}</b>`}; }
function wohinItem(){ const L = [['Max wohnt ___ Wien.','in','wo?'],['Lisa arbeitet ___ Hause.','zu','wo?'],['Wir studieren ___ Zürich.','in','wo?'],['Wir reisen ___ Rom.','nach','wohin?'],['Du fliegst ___ Japan.','nach','wohin?'],['Jana geht ___ Hause.','nach','wohin?'],['Ich komme ___ ___ Hause.',['von','zu'],'woher?'],['Ihr kommt ___ Syrien.','aus','woher?'],['Hatem kommt ___ Kairo.','aus','woher?'],['Ich wohne ___ Bischkek.','in','wo?'],['Ich fahre ___ Berlin.','nach','wohin?'],['Ich komme ___ Pakistan.','aus','woher?']];
  const [q,a,w] = pick(L); return {t:'fill', q, a:Array.isArray(a)?a:[a], h:w, x:'wo? → <b>in</b> Wien / <b>zu</b> Hause · wohin? → <b>nach</b> Rom / <b>nach</b> Hause · woher? → <b>aus</b> Kairo / <b>von zu</b> Hause'}; }
function possSentItem(){ // Spektrum Ü4/Ü5, SK1 5.1
  const L = [['ich','Laptop','m'],['du','Regenschirm','m'],['Maria','Handy','n'],['du','Zeitung','f'],['er','Uhr','f'],['Paul','Auto','n'],['der Chef','Schreibtisch','m'],['Sie','Tasche','f'],['sie (she)','Tasse','f'],['ich','Brille','f'],['Sie','Stuhl','m'],['ich','Schlüssel','m'],['wir','Wohnung','f'],['ihr','Auto','n'],['die Gäste','Gepäck','n'],['das Kind','Mütze','f'],['Anna','Tablet','n'],['Peter','Computer','m'],['wir','Kinder','pl'],['ihr','Eltern','pl']];
  const base = {ich:'mein',du:'dein',er:'sein',Maria:'ihr',Paul:'sein','der Chef':'sein',Sie:'Ihr','sie (she)':'ihr',wir:'unser',ihr:'euer','die Gäste':'ihr','das Kind':'sein',Anna:'ihr',Peter:'sein'};
  const [who,n,g] = pick(L); const b = base[who]; let f = (g==='f'||g==='pl') ? (b==='euer'?'eure':b+'e') : b;
  return {t:'fill', q:`${who}: Das ist ___ ${n}.`.replace('Das ist ___ Kinder','Das sind ___ Kinder').replace('Das ist ___ Eltern','Das sind ___ Eltern'), a:[f], x:`${esc(who)} → <b>${esc(b)}</b>; ${g==='f'?'feminine':g==='pl'?'plural':g==='m'?'masculine':'neuter'} → <b>${esc(f)}</b>.`};
}
function pluralRuleItem(){ const L = [['das Fenster','die Fenster','–'],['der Mantel','die Mäntel','¨'],['das Brot','die Brote','-e'],['die Hand','die Hände','¨-e'],['das Kind','die Kinder','-er'],['das Buch','die Bücher','¨-er'],['die Übung','die Übungen','-en'],['die Tasche','die Taschen','-n'],['die Ärztin','die Ärztinnen','-nen'],['das Auto','die Autos','-s'],['der Lehrer','die Lehrer','–'],['die Frage','die Fragen','-n'],['das Fahrrad','die Fahrräder','¨-er'],['die Schule','die Schulen','-n'],['die Stadt','die Städte','¨-e'],['der Baum','die Bäume','¨-e'],['der Beruf','die Berufe','-e'],['der Stuhl','die Stühle','¨-e'],['der Tisch','die Tische','-e'],['das Handy','die Handys','-s'],['der Laptop','die Laptops','-s'],['das Bild','die Bilder','-er'],['die Lampe','die Lampen','-n'],['die Zeitung','die Zeitungen','-en'],['der Drucker','die Drucker','–'],['der Apfel','die Äpfel','¨'],['der Schlüssel','die Schlüssel','–'],['der Kalender','die Kalender','–'],['die Brille','die Brillen','-n'],['die Tasse','die Tassen','-n'],['die Uhr','die Uhren','-en'],['der Stift','die Stifte','-e'],['der Regenschirm','die Regenschirme','-e'],['das Medikament','die Medikamente','-e'],['die Kaffeemaschine','die Kaffeemaschinen','-n'],['der Computer','die Computer','–']];
  const [s,p,e] = pick(L); return {t:'fill', q:`${s} → ___`, a:[p+'|'+p.replace(/^die /,'')], h:'plural (with die)', x:`<b>${esc(p)}</b> (ending ${esc(e)})`}; }
DRILLS.push(
  {id:'ctx', name:'Verbs in sentences', d:'Ich lerne Deutsch in der Sprachschule. Er fährt mit dem Zug …', gen:()=>ctxItem()},
  {id:'stem', name:'Stem change: du / er only', d:'fahren → du fährst, er fährt, ihr fahrt', gen:stemItem},
  {id:'conj-vl', name:'Verbs from Anara\'s verb list', d:'abholen, bitten, denken, einladen, feiern, werden …', gen:()=>conjItem(v=>v.L==='VL' && drillVerbs(v))},
  {id:'modal', name:'Modal verbs', d:'können, müssen, wollen, dürfen, sollen, mögen, möchten', gen:modalItem},
  {id:'pron', name:'Personal pronouns', d:'Maria → sie, Peter und ich → wir', gen:pronItem},
  {id:'wq', name:'W-questions', d:'Wer? Was? Wo? Woher? Wohin? Wie? Welche?', gen:wqItem},
  {id:'yesno', name:'Yes/no questions · Ja / Nein / Doch', d:'Wohnst du in Berlin? – Doch, …', gen:yesNoItem},
  {id:'wohin', name:'wo · wohin · woher (in / nach / aus / zu)', d:'in Wien · nach Rom · aus Kairo · zu Hause', gen:wohinItem},
  {id:'dusie', name:'du, ihr or Sie?', d:'Ich frage Frau Mayer: „Wohnen Sie in Dresden?“', gen:duSieItem},
  {id:'nichtkein', name:'nicht or kein?', d:'Ich wohne nicht in Berlin. Das ist kein Tisch.', gen:nichtKeinItem},
  {id:'rules', name:'Gender rules (-ung, -chen, -or …)', d:'die Zeitung, das Mädchen, der Motor', gen:()=> Math.random()<.5 ? ruleItem() : ruleItem2()},
  {id:'compound', name:'Compound nouns', d:'der Kaffee + die Maschine → die Kaffeemaschine', gen:compItem},
  {id:'plrule', name:'Plural endings (book lists)', d:'der Stuhl → die Stühle, das Handy → die Handys', gen:pluralRuleItem},
  {id:'adj', name:'Adjectives & opposites', d:'Ist das Auto neu? – Nein, es ist alt.', gen:()=> Math.random()<.5 ? adjSentItem() : (Math.random()<.5 ? adjItem() : colorItem())},
  {id:'colors', name:'Colours', d:'Welche Farbe hat eine Banane? – Sie ist gelb.', gen:colorItem},
  {id:'sepq', name:'Separable or not? Word order', d:'Ich stehe um 7 Uhr auf. Ich verstehe das Problem.', gen:()=>{ const r=Math.random(); return r<.35?sepYesNoItem(): r<.75?sepOrderItem(): insepItem(); }},
  {id:'akk2', name:'Accusative: book exercises (SK1 4.2)', d:'Ich frage den Lehrer. Den Text hier lese ich. Leider habe ich keine Uhr.', gen:()=>{ const r=Math.random(); return r<.3?akkDefItem(): r<.5?akkFrontItem(): r<.75?keinenItem(): leiderItem(); }},
  {id:'possb', name:'Possessives (book: Mein Laptop …)', d:'du: dein Regenschirm · Maria: ihr Handy', gen:possSentItem},
  {id:'jobs', name:'Jobs: der Arzt / die Ärztin · what they do', d:'Ein Arzt untersucht Patienten.', gen:jobItem},
  {id:'family', name:'Family (Peter, Lucie, Sarah, Felix …)', d:'Felix ist der Sohn von Peter und Lucie.', gen:famItem},
  {id:'countries', name:'Countries & languages', d:'Ich komme aus der Türkei. Ich spreche Türkisch.', gen:countryItem},
  {id:'phone', name:'Telephone numbers', d:'5 26 39 81 = fünf – sechsundzwanzig – …', gen:phoneItem},
  {id:'sounds', name:'Sounds & alphabet', d:'ei, ie, eu, sch, z, w, v … · A, B, C', gen:()=> Math.random()<.7 ? soundItem() : abcItem()},
  {id:'wb-art', name:'Word bank: der, die or das?', d:'300 most important nouns + Anara\'s themed noun list', gen:wbArtItem},
  {id:'wb-mean', name:'Word bank: meanings', d:'Was bedeutet …? both directions', gen:()=>wbMeanItem()},
  {id:'wb-spell', name:'Word bank: write it (active vocabulary)', d:'English → type the German noun with its article', gen:()=>spellItem()},
  {id:'wb-pl', name:'Word bank: plurals', d:'der Mensch → die Menschen', gen:wbPlItem},
  {id:'verb-mean', name:'Verb meanings', d:'every verb of the course and the verb list', gen:()=>verbMeanItem()},
  {id:'verb-type', name:'Write the verb (active)', d:'English → type the German infinitive', gen:()=>verbTypeItem()},
  {id:'small', name:'Prepositions, adverbs, adjectives', d:'from Anara\'s word lists', gen:smallWordItem}
);


/* accusative pronouns & prepositions (Anara's accusative sheet, 16 Oct) */
const APRON = [['ich','mich'],['du','dich'],['er','ihn'],['sie','sie'],['es','es'],['wir','uns'],['ihr','euch'],['Sie','Sie']];
const APNOUN = [['Peter','ihn'],['Maria','sie'],['den Kuchen','ihn'],['die Milch','sie'],['das Buch','es'],['die Erdbeeren','sie'],['den Lehrer','ihn'],['die Lehrerin','sie'],['das Kind','es'],['meine Eltern','sie'],['den Film','ihn'],['die Zeitung','sie'],['das Auto','es'],['den Schlüssel','ihn'],['die Tasche','sie'],['den Tisch','ihn'],['das Hotel','es'],['die Limonade','sie']];
const APVERB = [['Kennst','kenne'],['Siehst','sehe'],['Kaufst','kaufe'],['Brauchst','brauche'],['Findest','finde'],['Hast','habe'],['Besuchst','besuche'],['Fragst','frage']];
function akkPronItem(){
  if(Math.random()<.4){ const [n,a] = pick(APRON); const ctx = pick(['Das Geschenk ist für ___.','Ohne ___ gehe ich nicht.','Er sieht ___.','Sie besucht ___ morgen.','Kennt er ___?','Der Lehrer fragt ___.']); return {t:'fill', q:`(${n}) ${ctx}`, a:[a], h:'accusative pronoun', x:`${esc(n)} → <b>${esc(a)}</b> · mich, dich, ihn, sie, es, uns, euch, sie/Sie`}; }
  const [nn,p] = pick(APNOUN); const [v1,v2] = pick(APVERB.filter(v=> !(v[0]==='Hast' && /Lehrer|Kind|Eltern|Peter|Maria/.test(nn)) && !(v[0]==='Besuchst' && !/Peter|Maria|Lehrer|Kind|Eltern/.test(nn))));
  return {t:'fill', q:`${v1} du ${nn}? – Ja, ich ${v2} ___.`, a:[p], x:`${esc(nn)} → <b>${esc(p)}</b> (der → ihn, die → sie, das → es, plural → sie)`};
}
const APREP = [['durch','den Park','m'],['durch','die Stadt','f'],['durch','das Zentrum','n'],['für','den Bruder','m'],['für','die Mutter','f'],['für','das Kind','n'],['für','die Kinder','pl'],['gegen','den Freund','m'],['gegen','die Mannschaft','f'],['ohne','den Zucker','m'],['ohne','die Tasche','f'],['ohne','das Handy','n'],['um','den Tisch','m'],['um','die Ecke','f'],['um','das Haus','n']];
function akkPrepItem(){
  const [pr, np, g] = pick(APREP); const noun = np.replace(/^(den|die|das) /,''); const ctx = {durch:'Wir gehen', für:'Das Geschenk ist', gegen:'Er spielt', ohne:'Ich komme', um:'Wir sitzen'}[pr];
  const r = Math.random();
  if(r<.45) return {t:'fill', q:`${ctx} ${pr} ___ ${noun}.`, a:[np.split(' ')[0]], h:`${({m:'der',f:'die',n:'das',pl:'die (plural)'})[g]} ${noun}`, x:`<b>${pr}</b> always takes the accusative: ${g==='m'?'der → <b>den</b>':'feminine / neuter / plural do not change'}.`};
  if(r<.75){ const ind = {m:'einen',f:'eine',n:'ein',pl:''}[g]; if(g==='pl') return akkPrepItem(); return {t:'fill', q:`${ctx} ${pr} ___ ${noun}.`, a:[ind], h:`indefinite (ein / eine) · ${({m:'der',f:'die',n:'das'})[g]} ${noun}`, x:`${pr} + accusative: <b>${ind}</b> ${esc(noun)}`}; }
  const o = shuffle(['durch','für','gegen','ohne','um']); const en = {durch:'through',für:'for',gegen:'against',ohne:'without',um:'around'}[pr];
  return {t:'mcq', q:`${ctx} ___ ${np}. (${en})`, o, a:o.indexOf(pr), x:`<b>${pr}</b> = ${en} — durch, ohne, gegen, für, um (DOGFU) always take the accusative.`};
}
DRILLS.push({id:'akkpron', name:'Accusative pronouns: mich, dich, ihn …', d:'Kennst du Peter? – Ja, ich kenne ihn.', gen:akkPronItem},
            {id:'akkprep', name:'durch, für, gegen, ohne, um', d:'Das Geschenk ist für den Bruder.', gen:akkPrepItem});

/* ---------------- quiz runner ---------------- */
function itemSay(it, correct){ if(it.say) return it.say; if(['fill','order','tr'].includes(it.t)) return correct; return null; }
function recordAnswer(it, ok, lid){
  S.stats.ans++; if(ok) S.stats.ok++; const d=today(); S.stats.days[d]=(S.stats.days[d]||0)+1;
  const k = hashItem(it); const i = S.mistakes.findIndex(m=>m.k===k);
  if(!ok){ if(i>=0){ S.mistakes[i].n++; S.mistakes[i].t=Date.now(); } else { S.mistakes.unshift({k, it, lid:lid||it.lid||'', n:1, t:Date.now()}); if(S.mistakes.length>300) S.mistakes.pop(); } }
  save();
}
function runQuiz(o){
  // o: {title, items?, gen?, key?, back, lid?, mistakesMode?}
  let idx = 0, score = 0, n = 0; const wrong = [];
  const items = o.items ? o.items.slice() : null;
  const t0 = Date.now(); let last = t0; const end = o.minutes ? t0 + o.minutes*60000 : 0;
  if(window.__QT) clearInterval(window.__QT);
  const left = ()=>{ const ms = Math.max(0, end - Date.now()); const m = Math.floor(ms/60000), sx = Math.floor(ms/1000)%60; return `${m}:${String(sx).padStart(2,'0')}`; };
  const used = ()=>{ const sx = Math.round((Date.now()-t0)/1000); return sx<60 ? sx+' s' : Math.floor(sx/60)+' min'; };
  if(end || o.gen) window.__QT = setInterval(()=>{ const el = document.getElementById('tm'); if(!el){ clearInterval(window.__QT); return; } el.textContent = end ? '⏱ '+left() : '⏱ '+used(); }, 1000);
  function head(){ return `<div class="qhead"><span>${esc(o.title)}</span><span>${(end||o.gen)?`<span id="tm">⏱ ${end?left():used()}</span> · `:''}${items ? `${idx+1} / ${items.length}` : `#${n+1}`} · ✓ ${score}${o.gen?` / ${n}`:''}</span></div>`; }
  function next(){
    if(items && idx>=items.length) return finish();
    const it = items ? items[idx] : o.gen();
    window.__cur = it; // used by the automated test
    $app.innerHTML = `<div class="row"><a class="btn sm" href="${o.back}">← Back</a>${o.gen?'<button class="btn sm" id="stop">Finish</button>':''}</div><div class="card" id="qc">${head()}<div id="qb"></div><div id="fb"></div></div>`;
    if(o.gen) document.getElementById('stop').onclick = finish;
    const qb = document.getElementById('qb');
    RENDER[it.t](qb, it, (ok, correct, your)=>{
      n++; if(ok) score++; else wrong.push(it);
      const now = Date.now(); const dt = Math.min(180, (now-last)/1000); last = now;
      const tk = o.tid || (o.lid && topicById(o.lid) ? o.lid : null); if(tk){ S.time = S.time || {}; S.time[tk] = (S.time[tk]||0) + dt; }
      recordAnswer(it, ok, o.lid);
      const timeUp = end && now >= end;
      if(ok && o.mistakesMode){ const k=hashItem(it); S.mistakes = S.mistakes.filter(m=>m.k!==k); save(); }
      const say = itemSay(it, correct);
      const fb = document.getElementById('fb');
      fb.innerHTML = `<div class="fb ${ok?'ok':'no'}"><b>${ok?'✓ Richtig!':'✗ Not quite.'}</b>${!ok && correct ? ` Correct: <b class="de">${esc(correct)}</b>`:''} ${say?spk(say):''}${it.x?`<div style="margin-top:6px">${it.x}</div>`:''}</div><div class="row">${timeUp?'<b>⏰ Time is up — well done!</b> ':''}<button class="btn go" id="nx">${timeUp?'See my result':'Next →'}</button></div>`;
      linkify(fb); if(say && ok) speak(say);
      const nx = document.getElementById('nx'); nx.onclick = ()=>{ idx++; if(timeUp) finish(); else next(); }; nx.focus({preventScroll:true});
      document.querySelector('#qc .qhead span:last-child').textContent = `${items ? `${idx+1} / ${items.length}` : `#${n}`} · ✓ ${score}${o.gen?` / ${n}`:''}`;
    });
    linkify(qb);
    const first = qb.querySelector('input'); if(first) first.focus({preventScroll:true});
    window.scrollTo(0,0);
  }
  function finish(){
    if(window.__QT) clearInterval(window.__QT);
    const total = items ? items.length : n;
    if(o.key && total){ const prev = S.sets[o.key]; if(!prev || score/total >= prev.best/prev.total){ S.sets[o.key] = {best:score, total, t:Date.now()}; } save(); }
    const pct = total ? Math.round(score/total*100) : 0;
    $app.innerHTML = `<div class="card" style="text-align:center"><h2>${esc(o.title)}</h2><div class="big">${score} / ${total}</div><p class="muted">Time: ${used()}${o.tid && S.time && S.time[o.tid] ? ` · total on this topic: ${fmtMin(S.time[o.tid])}` : ''}</p><div class="prog" style="max-width:320px;margin:auto"><i style="width:${pct}%"></i></div><p>${pct>=90?'Ausgezeichnet! 🎉':pct>=70?'Gut gemacht! 👍':pct>=50?'Not bad — try once more.':'Keep practising — read the Learn tab again.'}</p>
      <div class="row" style="justify-content:center"><button class="btn go" id="again">Try again</button>${wrong.length?'<button class="btn" id="wr">Practise my '+wrong.length+' mistakes</button>':''}<a class="btn" href="${o.back}">Back</a></div></div>`;
    document.getElementById('again').onclick = ()=> runQuiz(Object.assign({}, o, o.items?{items:shuffleKeep(o.items)}:{}));
    const wr = document.getElementById('wr'); if(wr) wr.onclick = ()=> runQuiz({title:o.title+' — mistakes', items:wrong.slice(), back:o.back, lid:o.lid});
  }
  next();
}
function shuffleKeep(a){ return shuffle(a); }

/* ---------------- item renderers ---------------- */
function keysBar(){ return `<div class="keys">${['ä','ö','ü','ß','Ä','Ö','Ü'].map(k=>`<button type="button" data-k="${k}">${k}</button>`).join('')}</div>`; }
let lastInput = null;
document.addEventListener('focusin', e=>{ if(e.target.matches('input.ans')) lastInput = e.target; });
document.addEventListener('mousedown', e=>{ if(e.target.closest('.keys button')) e.preventDefault(); });
document.addEventListener('click', e=>{
  const k = e.target.closest('.keys button'); if(!k || !lastInput) return;
  const i = lastInput; const s = i.selectionStart ?? i.value.length, en = i.selectionEnd ?? i.value.length;
  i.value = i.value.slice(0,s) + k.dataset.k + i.value.slice(en); i.focus(); i.setSelectionRange(s+1,s+1);
});
const RENDER = {
  mcq(box, it, done){
    const order = shuffle(it.o.map((_,i)=>i));
    box.innerHTML = `<div class="q de">${esc(it.q)} ${it.say && /___/.test(it.q)===false ? '' : ''}</div>${it.h?`<div class="muted">${esc(it.h)}</div>`:''}<div class="opts">${order.map(i=>`<button class="btn opt ${/^(der|die|das|ein|eine|kein)/.test(it.o[i])||/[äöüß]/.test(it.o[i])?'de':''}" data-i="${i}">${esc(it.o[i])}</button>`).join('')}</div>`;
    box.querySelectorAll('.opt').forEach(b=> b.onclick = ()=>{
      if(box.dataset.done) return; box.dataset.done=1;
      const i = +b.dataset.i; const ok = i===it.a;
      box.querySelectorAll('.opt').forEach(x=>{ x.disabled = true; if(+x.dataset.i===it.a) x.classList.add('right'); });
      if(!ok) b.classList.add('wrong');
      done(ok, it.o[it.a], it.o[i]);
    });
  },
  fill(box, it, done){
    const parts = it.q.split('___'); const ans = Array.isArray(it.a) ? it.a : [it.a];
    let html = '<div class="q">';
    parts.forEach((p,i)=>{ html += `<span class="de">${esc(p)}</span>`; if(i<parts.length-1){ const w = Math.max(4, ...alts(ans[i]||'').map(x=>x.length)); html += `<input class="ans${it.wide?' wide':''}" autocomplete="off" autocapitalize="off" spellcheck="false" style="width:${it.wide?'100%':Math.min(18,w+3)+'ch'}" data-i="${i}">`; } });
    html += '</div>' + (it.h?`<div class="muted">💡 ${esc(it.h)}</div>`:'') + keysBar() + `<div class="row"><button class="btn go" id="ck">Check</button><button class="btn sm" id="dk">Show answer</button></div>`;
    box.innerHTML = html;
    const ins = [...box.querySelectorAll('input.ans')];
    const fillText = () => { let s=''; parts.forEach((p,i)=>{ s+=p; if(i<parts.length-1) s+=alts(ans[i])[0]; }); return s.replace(/\s+/g,' ').trim(); };
    const check = (reveal)=>{
      if(box.dataset.done) return; box.dataset.done=1;
      let all = true;
      ins.forEach((inp,i)=>{ const ok = !reveal && alts(ans[i]).some(a=>norm(a)===norm(inp.value)); if(!ok) all=false; inp.classList.add(ok?'right':'wrong'); inp.readOnly = true; if(!ok) inp.value = inp.value ? inp.value+' → '+alts(ans[i])[0] : alts(ans[i])[0]; });
      box.querySelector('#ck').disabled = true; box.querySelector('#dk').disabled = true;
      done(all, fillText(), ins.map(x=>x.value).join(' '));
    };
    box.querySelector('#ck').onclick = ()=>check(false);
    box.querySelector('#dk').onclick = ()=>check(true);
    ins.forEach((inp,i)=> inp.addEventListener('keydown', e=>{ if(e.key==='Enter'){ e.preventDefault(); if(i<ins.length-1 && !ins[i+1].value) ins[i+1].focus(); else check(false); } }));
  },
  order(box, it, done){
    const m = it.a.match(/^(.*?)([.?!])?$/); const body = m[1]; const punct = m[2]||'';
    const toks = body.split(/\s+/); const sh = shuffle(toks.map((t,i)=>({t,i})));
    box.innerHTML = `<div class="muted">Put the words in the right order${it.en?`: <i>${esc(it.en)}</i>`:''}</div><div class="built q de" id="bt"></div><div id="pool">${sh.map(x=>`<span class="tok" data-i="${x.i}">${esc(x.t)}</span>`).join('')}</div><div class="row"><button class="btn go" id="ck">Check</button><button class="btn sm" id="rs">Reset</button></div>`;
    const bt = box.querySelector('#bt'); const built = [];
    const draw = ()=>{ bt.innerHTML = built.map((x,j)=>`<span class="tok" data-j="${j}">${esc(toks[x])}</span>`).join('') + (built.length===toks.length?` ${punct}`:''); box.querySelectorAll('#pool .tok').forEach(t=> t.classList.toggle('used', built.includes(+t.dataset.i))); };
    box.querySelector('#pool').onclick = e=>{ const t = e.target.closest('.tok'); if(!t || box.dataset.done) return; built.push(+t.dataset.i); draw(); };
    bt.onclick = e=>{ const t = e.target.closest('.tok'); if(!t || box.dataset.done) return; built.splice(+t.dataset.j,1); draw(); };
    box.querySelector('#rs').onclick = ()=>{ if(box.dataset.done) return; built.length=0; draw(); };
    box.querySelector('#ck').onclick = ()=>{
      if(box.dataset.done) return; box.dataset.done=1;
      const your = built.map(i=>toks[i]).join(' ');
      const ok = [it.a, ...(it.alt||[])].some(a=> norm(a)===norm(your));
      box.querySelector('#ck').disabled = true; done(ok, it.a, your);
    };
  },
  match(box, it, done){
    const L = shuffle(it.pairs.map((p,i)=>({s:p[0],i}))), R = shuffle(it.pairs.map((p,i)=>({s:p[1],i})));
    box.innerHTML = `<div class="muted">${esc(it.q||'Match the pairs: tap a German word, then its meaning.')}</div><div class="mt" style="margin-top:8px"><div class="opts">${L.map(x=>`<button class="btn de" data-s="L" data-i="${x.i}">${esc(x.s)}</button>`).join('')}</div><div class="opts">${R.map(x=>`<button class="btn" data-s="R" data-i="${x.i}">${esc(x.s)}</button>`).join('')}</div></div>`;
    let sel = null, miss = 0, left = it.pairs.length;
    box.querySelectorAll('.mt .btn').forEach(b=> b.onclick = ()=>{
      if(b.dataset.s==='L'){ box.querySelectorAll('[data-s=L]').forEach(x=>x.classList.remove('picked')); sel = b; b.classList.add('picked'); speak(b.textContent); return; }
      if(!sel) return;
      if(sel.dataset.i===b.dataset.i){ sel.classList.add('done'); b.classList.add('done'); sel.classList.remove('picked'); sel=null; left--; if(!left) done(miss===0, '', miss+' wrong'); }
      else { miss++; b.classList.add('bad'); setTimeout(()=>b.classList.remove('bad'), 500); }
    });
  },
  tr(box, it, done){
    box.innerHTML = `<div class="muted">Translate into German:</div><div class="q">${esc(it.en)}</div>${it.h?`<div class="muted">💡 ${esc(it.h)}</div>`:''}<input class="ans wide" autocomplete="off" autocapitalize="sentences" spellcheck="false">${keysBar()}<div class="row"><button class="btn go" id="ck">Check</button><button class="btn sm" id="dk">Show answer</button></div>`;
    const inp = box.querySelector('input'); const ans = Array.isArray(it.a)?it.a:[it.a];
    const check = reveal=>{ if(box.dataset.done) return; box.dataset.done=1; const ok = !reveal && ans.some(a=>norm(a)===norm(inp.value)); inp.classList.add(ok?'right':'wrong'); inp.readOnly=true; box.querySelector('#ck').disabled=true; box.querySelector('#dk').disabled=true; done(ok, ans[0], inp.value); };
    box.querySelector('#ck').onclick = ()=>check(false); box.querySelector('#dk').onclick = ()=>check(true);
    inp.addEventListener('keydown', e=>{ if(e.key==='Enter'){ e.preventDefault(); check(false); } });
  }
};

/* ---------------- progress helpers ---------------- */
function setKey(l, i){ return l.id+':'+i; }
function lessonProgress(l){
  const sets = l.sets||[]; if(!sets.length) return 0;
  let s = 0; sets.forEach((_,i)=>{ const r = S.sets[setKey(l,i)]; if(r) s += r.best/r.total; });
  return Math.round(s/sets.length*100);
}
function lessonItems(l){ const out=[]; (l.sets||[]).forEach(s=> s.items.forEach(it=> out.push(Object.assign({lid:l.id}, it)))); return out; }

/* ---------------- views ---------------- */
function setNav(r){ document.querySelectorAll('#nav a').forEach(a=> a.classList.toggle('on', a.dataset.r===r)); }

/* ---------------- course structure (data/course.js) ---------------- */
const COURSE = window.COURSE || [];
const PAGE = window.PAGE || {};
const pageTitle = l => (PAGE[l.id] && PAGE[l.id].t) || l.title;
const pageSum = l => (PAGE[l.id] && PAGE[l.id].s) || l.summary || '';
function chapterOfPage(id){ return COURSE.find(c=> (c.pages||[]).includes(id)); }
function chapterOfTopic(id){ return COURSE.find(c=> (c.topics||[]).includes(id)); }
function chapterOfText(id){ return COURSE.find(c=> c.texts && c.texts.test(id)); }
function chPages(c){ return (c.pages||[]).map(lessonById).filter(Boolean); }
function chTopics(c){ return (c.topics||[]).map(id=> TOPICS.find(t=>t.id===id)).filter(Boolean); }
const TEXTS_ALL = () => TEXTS;
function chTexts(c){ return c.texts ? TEXTS_ALL().filter(t=> c.texts.test(t.id)) : []; }
function coursePages(){ const out=[]; COURSE.forEach(c=> chPages(c).forEach(l=> out.includes(l) || out.push(l))); LESSONS.forEach(l=> out.includes(l) || out.push(l)); return out; }
function chWords(c){ const out=[], seen=new Set(); const add = w=>{ const k=(w.g||'')+'|'+w.de; if(seen.has(k)) return; seen.add(k); out.push(w); };
  chPages(c).forEach(l=> (l.vocab||[]).forEach(add)); chTexts(c).forEach(t=> t.words.forEach(add)); chTopics(c).forEach(t=> (t.words||[]).forEach(add)); return out; }
function chProgress(c){ const ls = chPages(c); if(!ls.length) return 0; return Math.round(ls.reduce((a,l)=>a+lessonProgress(l),0)/ls.length); }
/* meaning categories (Nouns.pages themes, same order) */
const CATS = (WB.themes||[]).map(c=>c.cat);
const CAT_OF = new Map();
(WB.themes||[]).forEach(c=> c.words.forEach(w=> CAT_OF.set((w.de||'').toLowerCase(), c.cat)));
(WB.list300||[]).forEach(c=> c.words.forEach(w=>{ const k=(w.de||'').toLowerCase(); if(!CAT_OF.has(k)) CAT_OF.set(k, (window.WCAT_MAP||{})[c.cat] || c.cat); }));
const ADJ = new Set((WB.adjs||[]).map(w=>w.de.replace(/-$/,'').toLowerCase()));
const SMALL = new Set([].concat(WB.preps||[], WB.advs||[]).map(w=>w.de.toLowerCase()));
function nounCat(w){ const k = w.de.toLowerCase(); if(CAT_OF.has(k)) return CAT_OF.get(k);
  // compound: last part
  for(let i=3;i<k.length-2;i++){ const h = k.slice(i); if(CAT_OF.has(h)) return CAT_OF.get(h); }
  return 'More nouns'; }
function wordColumns(words){
  const nouns = {}, weak = [], strong = [], adj = [], small = [], other = [];
  words.forEach(w=>{
    if(w.g){ const c = nounCat(w); (nouns[c] = nouns[c] || []).push(w); return; }
    if(isVerbWord(w)){ const f = window.VFORMS ? VFORMS(w.de.replace(/^sich |\s*\(sich\)/g,'')) : {kind:'weak'}; (f.kind==='weak' ? weak : strong).push(w); return; }
    const k = w.de.toLowerCase().replace(/-$/,'');
    if(ADJ.has(k)) adj.push(w); else if(SMALL.has(k) || /^(der|die|das|ein|eine|mein|dein|sein|ihr|unser|euer|ich|du|er|sie|es|wir|mich|dich|ihn|uns|euch|wer|was|wo|woher|wohin|wie|wann|warum|welche|nicht|kein|keine|und|aber|oder|denn)$/.test(k)) small.push(w); else other.push(w);
  });
  const cols = [];
  CATS.concat(['More nouns']).forEach(c=>{ if(nouns[c]) cols.push(['Nouns · '+c.replace(/ & /g,' & '), nouns[c], 'nouns']); });
  if(weak.length) cols.push(['Verbs · weak (regular)', weak, '2nd: -te · 3rd: ge-…-t']);
  if(strong.length) cols.push(['Verbs · strong & irregular', strong, 'the vowel changes']);
  if(adj.length) cols.push(['Adjectives', adj, '']);
  if(small.length) cols.push(['Small words: pronouns, articles, prepositions, question words', small, '']);
  if(other.length) cols.push(['Other words & phrases', other, '']);
  return cols;
}
function columnsHtml(words, L){ let k = Object.keys(L).length; return `<div class="wcols">` + wordColumns(words).map(([t, list, sub])=>{ const id='w'+(k++); L[id]=list; return wordCol(t, list, id, sub==='nouns'?'':sub); }).join('') + `</div>`; }

function viewHome(){
  setNav('home');
  const acc = S.stats.ans ? Math.round(S.stats.ok/S.stats.ans*100) : 0;
  const words = allVocab().length; const items = LESSONS.reduce((a,l)=>a+lessonItems(l).length,0);
  const cont = COURSE.find(c=>c.id===S.lastCh) || COURSE[0];
  let html = `<h1>Deutsch mit Anara 🇩🇪</h1><p class="muted">My German A1 course in the order of the book: every chapter with its grammar, words, texts and exercises. Tap any <span class="w" data-w="Wort">underlined</span> German word to see its meaning and grammar.</p>
  <div class="stat"><div><b>${COURSE.length}</b>chapters</div><div><b>${words}</b>words</div><div><b>${items}</b>exercises + endless drills</div><div><b>${S.stats.ans}</b>answered${S.stats.ans?` · ${acc}% right`:''}</div><div><b>${S.stats.days[today()]||0}</b>today</div></div>
  <div class="row" style="margin-top:12px">${cont?`<a class="btn go" href="#/c/${cont.id}">Continue: ${esc(cont.label)} · ${esc(cont.title)} →</a>`:''}<a class="btn" href="#/contents">📚 Course contents (all topics)</a><a class="btn" href="#/topics">🎯 Practice by topic</a><a class="btn" href="#/texts">📚 Texts & dialogues</a><a class="btn" href="#/mix">🎲 Mixed review</a><a class="btn" href="#/run/all/60">⏱ 1 hour of everything</a>${S.mistakes.length?`<a class="btn" href="#/mistakes">❗ My mistakes (${S.mistakes.length})</a>`:''}</div>
  <h2 style="margin-top:18px">Course</h2><div class="chlist">`;
  COURSE.forEach((c,i)=>{ const p = chProgress(c); const ls = chPages(c);
    html += `<a class="chap" href="#/c/${c.id}"><div class="chn">${c.icon||''}</div><div class="chb"><div class="d">${esc(c.label)}</div><div class="t">${esc(c.title)}</div><div class="muted" style="font-size:.88em">${esc(c.sub)}</div>
      ${ls.length?`<ol class="chpages">${ls.map(l=>`<li>${esc(pageTitle(l))}</li>`).join('')}</ol>`:''}${ls.length?`<div class="prog"><i style="width:${p}%"></i></div>`:''}</div></a>`; });
  html += `</div>`;
  const UPD = (window.UPDATES||[]).slice().reverse().slice(0,12);
  if(UPD.length) html += `<details class="card" style="margin-top:18px"><summary><b>What's new in the app</b></summary><ul>${UPD.map(u=>`<li>${u.icon||'•'} ${u.href?`<a href="${u.href}">${esc(u.text)}</a>`:esc(u.text)}</li>`).join('')}</ul></details>`;
  $app.innerHTML = html; linkify($app);
}

function viewChapter(id, tab){
  const c = COURSE.find(x=>x.id===id); if(!c) return viewHome();
  setNav('home'); tab = tab || 'learn'; S.lastCh = c.id; save();
  const ci = COURSE.indexOf(c), prev = COURSE[ci-1], next = COURSE[ci+1];
  const ls = chPages(c), tps = chTopics(c), txs = chTexts(c), words = chWords(c);
  const nEx = ls.reduce((a,l)=>a+lessonItems(l).length,0) + tps.reduce((a,t)=>a+topicItems(t).length,0);
  let html = `<div class="row"><a class="btn sm" href="#/">← Course</a>${prev?`<a class="btn sm" href="#/c/${prev.id}">‹ ${esc(prev.label)}</a>`:''}${next?`<a class="btn sm" href="#/c/${next.id}">${esc(next.label)} ›</a>`:''}</div>
  <div class="muted">${esc(c.label)}</div><h1>${c.icon||''} ${esc(c.title)}</h1><p class="muted">${esc(c.sub)}</p>
  <div class="tabs">${[['learn',`📖 Grammar (${ls.length})`],['words',`🔤 Words (${words.length})`],['texts',`📚 Texts (${txs.length})`],['practice',`✍️ Exercises (${nEx})`]].map(([k,t])=>`<a href="#/c/${c.id}/${k}" class="${tab===k?'on':''}">${t}</a>`).join('')}</div>`;
  const L = {};
  if(tab==='learn'){
    if(c.link) html += `<div class="row"><a class="btn go" href="${c.link[0]}">${esc(c.link[1])}</a></div>`;
    if(!ls.length) html += `<p class="muted">This chapter has no grammar pages — see the texts, words and exercises.</p>`;
    ls.forEach((l,k)=>{ html += `<h2 class="chh2">${k+1}. ${esc(pageTitle(l))}</h2><p class="muted">${esc(pageSum(l))}</p>`; (l.learn||[]).forEach(s=>{ html += `<div class="card"><h3>${esc(s.h)}</h3>${s.html}</div>`; }); html += `<div class="row"><a class="btn" href="#/l/${l.id}/practice">✍️ Exercises for „${esc(pageTitle(l))}“</a></div>`; });
  } else if(tab==='words'){
    html += `<p class="muted">Grouped by meaning, nouns and verbs separately — every word numbered; tap any word for its meaning and grammar.</p>` + (words.length ? columnsHtml(words, L) : '<p class="muted">No words.</p>') + (c.link && c.id==='woerter' ? `<div class="row"><a class="btn go" href="#/bank">🗂️ The full word bank</a></div>`:'');
  } else if(tab==='texts'){
    if(!txs.length) html += `<p class="muted">No texts in this chapter.</p>`;
    html += `<div class="grid">` + txs.map(t=>{ const r = S.sets['x:'+t.id]; return `<a class="lesson" href="#/x/${t.id}"><div class="d">${esc(t.book)} · ${esc(t.ref)}</div><div class="t">${esc(t.title)}</div><div class="chips"><span class="chip">${t.lines.length} lines</span><span class="chip">${t.words.length} words</span><span class="chip">${textItems(t).length} exercises</span></div><div class="prog"><i style="width:${r?Math.round(r.best/r.total*100):0}%"></i></div></a>`; }).join('') + `</div>`;
  } else if(tab==='practice'){
    ls.forEach(l=>{ html += `<h3>${esc(pageTitle(l))}</h3>`; (l.sets||[]).forEach((st,k)=>{ const r = S.sets[setKey(l,k)]; html += `<div class="card"><div class="row" style="justify-content:space-between;margin:0"><div><b>${esc(st.title)}</b><div class="muted">${st.items.length} questions${st.d?' · '+esc(st.d):''}${r?` · best ${r.best}/${r.total}`:''}</div></div><a class="btn ${r?'':'go'}" href="#/p/${l.id}/${k}">${r?'Again':'Start'}</a></div></div>`; }); });
    if(tps.length){ html += `<h3>Practice topics of this chapter</h3><div class="grid">` + tps.map(t=>`<a class="lesson" href="#/t/${t.id}"><div class="t">${t.icon||''} ${esc(t.title)}</div><div class="muted" style="font-size:.85em">${esc(t.d||'')}</div><div class="chips"><span class="chip">${topicItems(t).length} exercises</span><span class="chip">${topicDrills(t).length} drills ♾️</span></div><div class="prog"><i style="width:${topicProgress(t)}%"></i></div></a>`).join('') + `</div>`; }
  }
  $app.innerHTML = html; linkify($app); wireColQuiz(L);
}
function viewLesson(id, tab){
  const l = lessonById(id); if(!l) return viewHome();
  setNav('home'); tab = tab || 'learn';
    const ch = chapterOfPage(l.id); const CP = coursePages(); const ci = CP.indexOf(l); const pv = CP[ci-1], nx = CP[ci+1];
  let html = `<div class="row">${ch?`<a class="btn sm" href="#/c/${ch.id}">← ${esc(ch.label)} · ${esc(ch.title)}</a>`:`<a class="btn sm" href="#/">← Course</a>`}${pv?`<a class="btn sm" href="#/l/${pv.id}">‹ previous</a>`:''}${nx?`<a class="btn sm" href="#/l/${nx.id}">next ›</a>`:''}</div>
  ${ch?`<div class="muted">${esc(ch.label)} · ${esc(ch.title)}</div>`:''}<h1>${esc(pageTitle(l))}</h1>${pageSum(l)?`<p class="muted">${esc(pageSum(l))}</p>`:''}
  <div class="tabs">${[['learn','📖 Learn'],['words',`🔤 Words (${(l.vocab||[]).length})`],['practice',`✍️ Practice (${lessonItems(l).length})`],['drills','♾️ Drills']].map(([k,t])=>`<a href="#/l/${l.id}/${k}" class="${tab===k?'on':''}">${t}</a>`).join('')}</div>`;
  if(tab==='learn'){
    (l.learn||[]).forEach((s,k)=>{ html += `<div class="card" id="sec-${k}"><h3>${esc(s.h)}</h3>${s.html}</div>`; });
    html += `<div class="row"><a class="btn go" href="#/l/${l.id}/practice">Practise this page →</a></div>`;
  } else if(tab==='words'){
    const LW = window.__LW = {}; html += columnsHtml(l.vocab||[], LW) + `<div class="row"><button class="btn go" id="vq">Quiz me on these words</button><a class="btn" href="#/flash/${(chapterOfPage(l.id)||{}).id||''}">Flashcards for this chapter</a></div>`;
  } else if(tab==='practice'){
    html += `<div class="row"><button class="btn go" id="allq">All ${lessonItems(l).length} questions (mixed)</button></div>`;
    (l.sets||[]).forEach((s,k)=>{ const r = S.sets[setKey(l,k)]; html += `<div class="card"><div class="row" style="justify-content:space-between;margin:0"><div><b>${esc(s.title)}</b><div class="muted">${s.items.length} questions${s.d?' · '+esc(s.d):''}${r?` · best ${r.best}/${r.total}`:''}</div></div><a class="btn ${r?'':'go'}" href="#/p/${l.id}/${k}">${r?'Again':'Start'}</a></div></div>`; });
  } else if(tab==='drills'){
    const ids = l.drills || [];
    html += `<p class="muted">Endless practice — new questions every time, made from the words and verbs of all your classes.</p>`;
    DRILLS.filter(d=>ids.includes(d.id)).forEach(d=>{ html += drillCard(d); });
    html += `<div class="row"><a class="btn" href="#/drills">All drills →</a></div>`;
  }
  $app.innerHTML = html; linkify($app); wireColQuiz(window.__LW||{});
  const vq = document.getElementById('vq'); if(vq) vq.onclick = ()=> runQuiz({title:pageTitle(l)+' — words', items: vocabQuiz(allVocab(l.id)), back:`#/l/${l.id}/words`, lid:l.id});
  const aq = document.getElementById('allq'); if(aq) aq.onclick = ()=> runQuiz({title:pageTitle(l)+' — all', items: shuffle(lessonItems(l)), back:`#/l/${l.id}/practice`, lid:l.id});
}
function vocabQuiz(pool){ const n = Math.min(15, pool.length); const out=[]; for(let i=0;i<n;i++){ out.push(vocabItem(pool)); } const ns = pool.filter(w=>w.g && w.g!=='pl'); for(let i=0;i<Math.min(5,ns.length);i++){ const w = pick(ns); out.push({t:'mcq', q:`___ ${w.de}  (${w.en})`, o:['der','die','das'], a:['m','f','n'].indexOf(w.g), say:fullDe(w), x:genderRule(w)}); } return shuffle(out); }
function isVerbWord(w){ return !w.g && /^(sich )?[a-zäöüß]+(en|ern|eln|tun|sein)( \(sich\))?$/.test(w.de) && /^(\(sich\) )?to\b|^may\b|^can\b|^must\b|^should\b|^would like/.test(w.en||''); }
function formsLine(inf){ const f = window.VFORMS ? VFORMS(inf) : null; if(!f) return ''; return `<div class="vf" translate="no"><span class="vfk ${f.kind}">${f.kind}</span> 1️⃣ <b class="de">${esc(f.inf)}</b> · 2️⃣ <b class="de">${esc(f.prat)}</b> · 3️⃣ <b class="de">${esc(f.perfekt)}</b>${f.change?`<div class="vfp">du <b class="de">${esc(f.du)}</b> · er/sie/es <b class="de">${esc(f.er)}</b> <span class="muted">(${esc(f.change)})</span></div>`:''}</div>`; }
function vocabTable(list, showL){
  if(!list.length) return '<p class="muted">No words.</p>';
  return `<div class="card tw"><table class="vocab"><tr><th>№</th><th></th><th>German</th><th>Meaning</th>${showL?'<th>Class</th>':''}</tr>${list.map((w,i)=>`<tr><td class="num">${i+1}</td><td>${spk(fullDe(w))}</td><td>${tapWord(w)}${w.pl?`<div class="muted">pl. ${w.pl==='—'?'—':'die '+esc(w.pl)}</div>`:''}${isVerbWord(w)?formsLine(w.de):''}${w.ex?`<div class="muted"><span class="de">${esc(w.ex)}</span>${(window.TR||{})[w.ex]?`<div class="vex">🇬🇧 ${esc(window.TR[w.ex])}</div>`:''}</div>`:''}</td><td>${esc(w.en)}${w.opp?`<div class="muted">↔ <span class="de">${esc(w.opp)}</span></div>`:''}${w.note?`<div class="muted">${esc(w.note)}</div>`:''}</td>${showL?`<td><a href="#/l/${w.lid}/words">${esc(w.lid)}</a></td>`:''}</tr>`).join('')}</table></div>`;
}
function drillCard(d){ const r = S.sets['drill:'+d.id]; return `<div class="card"><div class="row" style="justify-content:space-between;margin:0"><div><b>${esc(d.name)}</b><div class="muted de">${esc(d.d)}</div></div><a class="btn go" href="#/d/${d.id}">Start</a></div></div>`; }

function viewDrills(){ setNav('drills'); $app.innerHTML = `<h1>Drills ♾️</h1><p class="muted">Endless, randomly generated questions from everything you have learnt. Stop whenever you like with “Finish”.</p>` + DRILLS.map(drillCard).join(''); linkify($app); }
function viewDrill(id){ const d = DRILLS.find(x=>x.id===id); if(!d) return viewDrills(); runQuiz({title:d.name, gen:d.gen, back:'#/drills', key:'drill:'+d.id}); }

function courseWords(){ const out=[], seen=new Set(); const add = w=>{ const k=(w.g||'')+'|'+w.de; if(seen.has(k)) return; seen.add(k); out.push(w); };
  COURSE.forEach(c=> chWords(c).forEach(add)); allVocab().forEach(add); return out; }
function viewWords(){
  setNav('words');
  const all = courseWords(); const L = {};
  $app.innerHTML = `<h1>All words (${all.length})</h1><p class="muted">Grouped by meaning — family, food, city … as in my Nouns list — with nouns and verbs separately. Every word is numbered; tap any word for its meaning and grammar.</p>
  <input class="search" id="sq" placeholder="Search German or English…"><p class="muted"><span class="m">der</span> = masculine · <span class="f">die</span> = feminine · <span class="n">das</span> = neuter · <span class="p">die</span> = plural</p><div id="wl"></div>`;
  const draw = ()=>{ const q = norm(document.getElementById('sq').value); const list = all.filter(w=> !q || norm(w.de+' '+(w.pl||'')+' '+w.en).includes(q)); for(const k in L) delete L[k]; document.getElementById('wl').innerHTML = columnsHtml(list, L); linkify(document.getElementById('wl')); wireColQuiz(L); };
  document.getElementById('sq').addEventListener('input', draw); draw();
}
function viewFlash(lid){
  setNav('flash');
  const fch = COURSE.find(c=>c.id===lid); let deck = fch ? chWords(fch) : courseWords(); let dir = 'de';
  const box = k => S.fc[k]||0; const key = w => (w.g||'')+'|'+w.de;
  function order(){ return shuffle(deck).sort((a,b)=> box(key(a))-box(key(b))).slice(0,20); }
  let cards = order(), i = 0, flipped = false;
  function draw(){
    if(i>=cards.length){ $app.innerHTML = `<div class="card" style="text-align:center"><h2>Done! 🎉</h2><p>You went through ${cards.length} cards. Cards you didn't know will come back first next time.</p><div class="row" style="justify-content:center"><button class="btn go" id="more">20 more</button><a class="btn" href="#/">Home</a></div></div>`; document.getElementById('more').onclick=()=>{ cards=order(); i=0; flipped=false; draw(); }; return; }
    const w = cards[i]; const k = key(w);
    const front = dir==='de' ? `<div class="de">${nounLabel(w)}</div>` : `<div>${esc(w.en)}</div>`;
    const back = dir==='de' ? `<div>${esc(w.en)}</div>` : `<div class="de">${nounLabel(w)}</div>`;
    const extra = `${w.pl?`<div class="sub">plural: ${w.pl==='—'?'—':'die '+esc(w.pl)}</div>`:''}${w.opp?`<div class="sub">opposite: ${esc(w.opp)}</div>`:''}${w.ex?`<div class="sub de">${esc(w.ex)}</div>`:''}`;
    $app.innerHTML = `<div class="row"><select id="fd" class="btn sm"><option value="">All chapters</option>${COURSE.map(c=>`<option value="${c.id}" ${lid===c.id?'selected':''}>${esc(c.label)} · ${esc(c.title)}</option>`).join('')}</select><button class="btn sm" id="fdir">${dir==='de'?'German → English':'English → German'} ⇄</button><span class="muted">${i+1} / ${cards.length} · box ${box(k)}</span></div>
    <div class="card flash" id="fc">${front}${flipped?`<hr style="width:60%;border:0;border-top:1px solid var(--line)">${back}${extra}`:'<div class="sub">tap to show the answer</div>'}</div>
    <div class="row" style="justify-content:center">${spk(fullDe(w))}${flipped?`<button class="btn" id="no">✗ Didn't know</button><button class="btn go" id="yes">✓ Knew it</button>`:`<button class="btn go" id="fl">Show answer</button>`}</div>`;
    document.getElementById('fc').onclick = ()=>{ if(!flipped){ flipped=true; draw(); speak(fullDe(w)); } };
    const fl = document.getElementById('fl'); if(fl) fl.onclick = ()=>{ flipped=true; draw(); speak(fullDe(w)); };
    const y = document.getElementById('yes'), n = document.getElementById('no');
    if(y) y.onclick = ()=>{ S.fc[k]=Math.min(5,box(k)+1); save(); i++; flipped=false; draw(); };
    if(n) n.onclick = ()=>{ S.fc[k]=0; save(); i++; flipped=false; draw(); };
    document.getElementById('fdir').onclick = ()=>{ dir = dir==='de'?'en':'de'; flipped=false; draw(); };
    document.getElementById('fd').onchange = e=>{ location.hash = e.target.value ? '#/flash/'+e.target.value : '#/flash'; };
    if(dir==='de' && !flipped) speak(fullDe(w));
  }
  if(!deck.length){ $app.innerHTML='<p>No words yet.</p>'; return; }
  draw();
}

function viewGrammar(){
  setNav('grammar');
  let html = `<h1>Grammar</h1><p class="muted">All grammar of the course, chapter by chapter.</p><div class="card"><b>Jump to:</b>`;
  COURSE.forEach(c=>{ const ls = chPages(c); if(!ls.length) return; html += `<div style="margin-top:6px"><b>${esc(c.label)} · ${esc(c.title)}</b><ul>${ls.map(l=> (l.learn||[]).map(s=>`<li><a href="#/l/${l.id}/learn">${esc(s.h)}</a></li>`).join('')).join('')}</ul></div>`; });
  html += `</div>`;
  html += `<div class="card"><h3>Quick verb table</h3><div class="tw"><table><tr><th>Verb</th>${PERS.map(p=>`<th>${p}</th>`).join('')}</tr>${['sein','haben','kommen','arbeiten','heißen','fahren','essen','lesen','möchten'].map(v=>{ const f = conj(v); return `<tr><td><b class="de">${v}</b></td>${f.map(x=>`<td class="de">${esc(x)}</td>`).join('')}</tr>`; }).join('')}</table></div></div>`;
  COURSE.forEach(c=>{ const ls = chPages(c); if(!ls.length) return; html += `<h2 class="chh2">${esc(c.label)} · ${esc(c.title)}</h2>`; ls.forEach(l=> (l.learn||[]).forEach(s=>{ html += `<div class="card"><div class="muted"><a href="#/l/${l.id}">${esc(pageTitle(l))}</a></div><h3>${esc(s.h)}</h3>${s.html}</div>`; })); });
  $app.innerHTML = html; linkify($app);
}

function viewMistakes(){
  setNav('mistakes');
  if(!S.mistakes.length){ $app.innerHTML = `<h1>My mistakes</h1><div class="card">No mistakes saved — every wrong answer lands here so you can practise it again. 👍</div>`; return; }
  const list = S.mistakes.slice(0,100);
  $app.innerHTML = `<h1>My mistakes (${S.mistakes.length})</h1><p class="muted">Answer a question correctly here and it leaves this list.</p><div class="row"><button class="btn go" id="mq">Practise mistakes</button><button class="btn sm" id="mc">Clear list</button></div>` +
   list.map(m=>{ const it=m.it; const q = it.t==='tr'?it.en : it.t==='order'? it.a : it.t==='match' ? 'Match pairs' : it.q; return `<div class="card"><div class="muted">${esc(m.lid||'drill')} · wrong ${m.n}×</div><div class="de">${esc(q)}</div></div>`; }).join('');
  linkify($app);
  document.getElementById('mq').onclick = ()=> runQuiz({title:'My mistakes', items: shuffle(S.mistakes.slice(0,20).map(m=>m.it)), back:'#/mistakes', mistakesMode:true});
  document.getElementById('mc').onclick = ()=>{ S.mistakes=[]; save(); viewMistakes(); };
}

function viewMix(){
  const all = []; LESSONS.forEach(l=> lessonItems(l).forEach(it=> all.push(it)));
  const gen = []; for(let i=0;i<5;i++) gen.push(pick(DRILLS).gen());
  runQuiz({title:'Mixed review', items: shuffle(shuffle(all).slice(0,15).concat(gen)), back:'#/'});
}


/* ---------------- topics (practice hub) ----------------
   Topic files (topics/*.js) push {id, title, icon, d, lessons:[ids], src, learn:[{h,html}], sets:[{title, src, items:[…]}], gens:[drill ids]}.
   Items can be objects (like lesson items) or compact strings:
     'f:Ich red[e] mit Paul. {reden} ## explanation'      fill-in: [answer|alternative] marks each blank, {hint} optional
     'm:Question|right answer|wrong|wrong ## explanation'   multiple choice (first option is the right one)
     'o:German sentence.|English meaning'                  word order
     't:English sentence.|German|other correct German'     translate into German
     'p:Haus=house;Buch=book'                               match pairs
*/
function P(raw){
  if(typeof raw !== 'string') return raw;
  let s = raw, x = '';
  const xi = s.indexOf(' ## '); if(xi>=0){ x = s.slice(xi+4).trim(); s = s.slice(0, xi); }
  const k = s.slice(0,2); const b = s.slice(2).trim();
  let it;
  if(k==='f:'){
    let h = ''; const hm = b.match(/\{([^}]*)\}\s*$/); let body = b; if(hm){ h = hm[1]; body = b.slice(0, hm.index).trim(); }
    const a = []; const q = body.replace(/\[([^\]]*)\]/g, (m, g)=>{ a.push(g); return '___'; });
    it = {t:'fill', q, a}; if(h) it.h = h; if(a.some(z=>z.length>16)) it.wide = true;
  } else if(k==='m:'){ const o = b.split('|'); it = {t:'mcq', q:o[0], o:o.slice(1), a:0}; }
  else if(k==='o:'){ const [a, en] = b.split('|'); it = {t:'order', a:a.trim()}; if(en) it.en = en.trim(); }
  else if(k==='t:'){ const p = b.split('|'); it = {t:'tr', en:p[0].trim(), a:p.slice(1).map(z=>z.trim())}; }
  else if(k==='p:'){ it = {t:'match', pairs: b.split(';').map(z=>z.split('=').map(y=>y.trim()))}; }
  else it = {t:'mcq', q:'(bad item) '+raw, o:['ok'], a:0};
  if(x) it.x = x;
  return it;
}
const TOPICS = (window.TOPICS||[]).map((t,i)=> Object.assign({n:i+1}, t, {sets:(t.sets||[]).map(st=> Object.assign({}, st, {items: st.items.map(P)}))}));
function topicById(id){ return TOPICS.find(t=>t.id===id); }
function topicLessonSets(t){ const out=[]; (t.lessons||[]).forEach(id=>{ const l = lessonById(id); if(l) (l.sets||[]).forEach((st,k)=>{ if(!t.lessonSets || t.lessonSets.includes(id+':'+k)) out.push({l, st, k}); }); }); return out; }
function topicItems(t){ const out=[]; t.sets.forEach(st=> st.items.forEach(it=> out.push(Object.assign({lid:t.id}, it)))); topicLessonSets(t).forEach(({l,st})=> st.items.forEach(it=> out.push(Object.assign({lid:l.id}, it)))); textsForTopic(t).forEach(x=> textItems(x).forEach(it=> out.push(it))); return out; }
function topicDrills(t){ return (t.gens||[]).map(id=>DRILLS.find(d=>d.id===id)).filter(Boolean); }
S.time = S.time || {}; // seconds practised per topic
function fmtMin(sec){ sec = Math.round(sec||0); if(sec<60) return sec+' s'; const m = Math.round(sec/60); return m<60 ? m+' min' : Math.floor(m/60)+' h '+(m%60)+' min'; }
function topicProgress(t){ let s=0, n=0; t.sets.forEach((_,k)=>{ n++; const r = S.sets['t:'+t.id+':'+k]; if(r) s += r.best/r.total; }); return n ? Math.round(s/n*100) : 0; }

function viewTopics(){
  setNav('topics');
  const total = TOPICS.reduce((a,t)=>a+topicItems(t).length,0);
  let html = `<h1>Practice by topic 🎯</h1><p class="muted">Every grammar topic of the course, with the <b>exact</b> exercises from the books (Aber Hallo! Skript A1, Spektrum A1), Anara's homework sheets and the worksheets — plus endless generated questions built from the same words. Pick a topic and a time: 15 minutes or a 4-hour marathon, the questions keep coming.</p>
  <div class="stat"><div><b>${TOPICS.length}</b>topics</div><div><b>${total}</b>fixed exercises</div><div><b>${DRILLS.length}</b>endless drills</div><div><b>${fmtMin(Object.values(S.time).reduce((a,b)=>a+b,0))}</b>practised</div></div><div class="grid" style="margin-top:12px">`;
  TOPICS.forEach(t=>{ const p = topicProgress(t); html += `<a class="lesson" href="#/t/${t.id}"><div class="d">Topic ${t.n}${S.time[t.id]?' · '+fmtMin(S.time[t.id]):''}</div><div class="t">${t.icon||''} ${esc(t.title)}</div><div class="muted" style="font-size:.85em">${esc(t.d||'')}</div><div class="chips"><span class="chip">${topicItems(t).length} exercises</span><span class="chip">${topicDrills(t).length} drills ♾️</span></div><div class="prog"><i style="width:${p}%"></i></div></a>`; });
  html += `</div>`;
  $app.innerHTML = html; linkify($app);
}
function viewTopic(id, tab){
  const t = topicById(id); if(!t) return viewTopics();
  setNav('topics'); tab = tab || 'practice';
  const i = TOPICS.indexOf(t); const prev = TOPICS[i-1], next = TOPICS[i+1];
  const items = topicItems(t);
  let html = `<div class="row"><a class="btn sm" href="#/topics">← All topics</a>${prev?`<a class="btn sm" href="#/t/${prev.id}">‹ ${esc(prev.title)}</a>`:''}${next?`<a class="btn sm" href="#/t/${next.id}">${esc(next.title)} ›</a>`:''}</div>
  <div class="muted">Topic ${t.n}${t.src?' · '+esc(t.src):''}</div><h1>${t.icon||''} ${esc(t.title)}</h1>${t.d?`<p class="muted">${esc(t.d)}</p>`:''}
  <div class="card"><b>⏱ Timed session</b> <span class="muted">— mixes the exact exercises (no repeats until all are done) with endless generated questions. Time practised on this topic: <b>${fmtMin(S.time[t.id])}</b></span><div class="row">${[15,30,60,120,240].map(m=>`<a class="btn ${m===30?'go':''}" href="#/run/${t.id}/${m}">${m<60?m+' min':(m/60)+' h'}</a>`).join('')}<a class="btn" href="#/run/${t.id}/0">No limit</a></div></div>
  <div class="tabs">${[['practice',`✍️ Exercises (${items.length})`],['drills',`♾️ Drills (${topicDrills(t).length})`],['learn','📖 Rules'],['words','🔤 Words']].map(([k,l])=>`<a href="#/t/${t.id}/${k}" class="${tab===k?'on':''}">${l}</a>`).join('')}</div>`;
  if(tab==='practice'){
    html += `<div class="row"><button class="btn go" id="allq">All ${items.length} exercises (shuffled)</button></div>`;
    t.sets.forEach((st,k)=>{ const r = S.sets['t:'+t.id+':'+k]; html += `<div class="card"><div class="row" style="justify-content:space-between;margin:0"><div><b>${esc(st.title)}</b><div class="muted">${st.items.length} questions${st.src?' · '+esc(st.src):''}${r?` · best ${r.best}/${r.total}`:''}</div></div><a class="btn ${r?'':'go'}" href="#/ts/${t.id}/${k}">${r?'Again':'Start'}</a></div></div>`; });
    const tx = textsForTopic(t);
    if(tx.length){ html += `<h3>Texts & dialogues from the books</h3>`; tx.forEach(x=>{ const r = S.sets['x:'+x.id]; html += `<div class="card"><div class="row" style="justify-content:space-between;margin:0"><div><b>${esc(x.title)}</b><div class="muted">${esc(x.book)} · ${esc(x.ref)} · ${x.lines.length} lines · ${x.words.length} hard words · ${textItems(x).length} exercises${r?` · best ${r.best}/${r.total}`:''}</div></div><a class="btn" href="#/x/${x.id}">Open</a></div></div>`; }); }
    const ls = topicLessonSets(t);
    if(ls.length){ html += `<h3>From the grammar pages</h3>`; ls.forEach(({l,st,k})=>{ const r = S.sets[setKey(l,k)]; html += `<div class="card"><div class="row" style="justify-content:space-between;margin:0"><div><b>${esc(st.title)}</b><div class="muted">${fmtDate(l.date)} · ${esc(l.title)} · ${st.items.length} questions${r?` · best ${r.best}/${r.total}`:''}</div></div><a class="btn" href="#/p/${l.id}/${k}">${r?'Again':'Start'}</a></div></div>`; }); }
  } else if(tab==='drills'){
    html += `<p class="muted">Endless — new questions every time.</p>` + topicDrills(t).map(drillCard).join('');
  } else if(tab==='learn'){
    (t.learn||[]).forEach((s,k)=>{ html += `<div class="card" id="sec-${k}"><h3>${esc(s.h)}</h3>${s.html}</div>`; });
    (t.lessons||[]).forEach(lid=>{ const l = lessonById(lid); if(l) html += `<div class="card"><div class="muted">Grammar page</div><a href="#/l/${l.id}/learn"><b>${esc(l.title)}</b></a></div>`; });
  } else if(tab==='words'){
    const words = []; (t.lessons||[]).forEach(lid=> allVocab(lid).forEach(w=>words.push(w)));
    (t.words||[]).forEach(w=>words.push(w));
    const TW = {}; html += words.length ? columnsHtml(words, TW) + `<div class="row"><button class="btn go" id="wq">Quiz these words</button><button class="btn" id="ws">Write them (spelling)</button></div>` : '<p class="muted">This topic uses the word bank — see <a href="#/bank">Word bank</a>.</p>';
    $app.innerHTML = html; linkify($app); wireColQuiz(TW);
    const wq = document.getElementById('wq'); if(wq) wq.onclick = ()=> runQuiz({title:t.title+' — words', items: vocabQuiz(words), back:`#/t/${t.id}/words`, lid:t.id, tid:t.id});
    const ws = document.getElementById('ws'); if(ws) ws.onclick = ()=> runQuiz({title:t.title+' — write the words', items: shuffle(words).slice(0,20).map(w=>({t:'tr', en:w.en, h: w.g?'with article (der / die / das)':'', a:[fullDe(w)], x:`<b>${esc(fullDe(w))}</b>`})), back:`#/t/${t.id}/words`, lid:t.id, tid:t.id});
    return;
  }
  $app.innerHTML = html; linkify($app);
  const aq = document.getElementById('allq'); if(aq) aq.onclick = ()=> runQuiz({title:t.title+' — all exercises', items: shuffle(items), back:`#/t/${t.id}`, lid:t.id, tid:t.id});
}
function topicGen(t){
  // exact items first (shuffled, no repeats until all used), mixed ~50/50 with generators
  let deck = []; const items = topicItems(t); const drills = topicDrills(t);
  return ()=>{
    const useItem = items.length && (!drills.length || Math.random() < 0.5);
    if(useItem){ if(!deck.length) deck = shuffle(items); return deck.pop(); }
    return pick(drills).gen();
  };
}
function viewRun(id, min){
  const t = id==='all' ? null : topicById(id);
  if(id!=='all' && !t) return viewTopics();
  min = +min || 0;
  const gen = t ? topicGen(t) : (()=>{ const gs = TOPICS.map(topicGen); return ()=> pick(gs)(); })();
  runQuiz({title: (t ? t.title : 'Everything mixed') + (min ? ` · ${min<60?min+' min':(min/60)+' h'}` : ''), gen, back: t ? `#/t/${t.id}` : '#/topics', lid: t ? t.id : '', tid: t ? t.id : 'all', minutes: min, key: t ? 'run:'+t.id : 'run:all'});
}
function tapWord(w){ const key = String(w.de||w.w||'').replace(/^sich |\s*\(sich\)/g,'').trim(); return `<b class="de" data-l="1"><span class="w" data-w="${esc(key)}">${nounLabel(w)}</span></b>`; }
/* a category as one column: numbered words in the original order, tap any word */
function wordCol(title, list, id, sub){
  const rows = list.map((w,i)=>{ const verbish = isVerbWord(w) || (w.pos==='verb'); const f = verbish && window.VFORMS ? VFORMS(w.de.replace(/^sich |\s*\(sich\)/g,'')) : null;
    return `<li><span class="wn">${i+1}</span><span class="wb">${spk(fullDe(w))} ${tapWord(w)}${w.pl&&w.pl!=='—'?` <span class="muted">· die ${esc(w.pl)}</span>`:''}${f?` <span class="vfk ${f.kind}">${f.kind}</span>`:''}<span class="we">${esc(w.en)}</span>${f?`<span class="wf de">2️⃣ ${esc(f.prat)} · 3️⃣ ${esc(f.perfekt)}${f.change&&/→/.test(f.change)?` · du ${esc(f.du)}, er ${esc(f.er)}`:''}</span>`:''}</span></li>`; }).join('');
  return `<div class="wcol" id="${id}"><div class="wch"><b>${esc(title)}</b> <span class="muted">(${list.length})</span>${sub?`<div class="muted" style="font-size:.85em">${esc(sub)}</div>`:''}</div><ol class="wl">${rows}</ol><button class="btn sm" data-colq="${id}">✍️ Quiz this column</button></div>`;
}
function wireColQuiz(lists){ document.querySelectorAll('[data-colq]').forEach(b=> b.onclick = ()=>{ const L = lists[b.dataset.colq]; if(!L || L.length<4) return; runQuiz({title:'Words: '+b.closest('.wcol').querySelector('.wch b').textContent, items: vocabQuiz(L), back:location.hash}); }); }
function viewBank(){
  setNav('bank');
  const L = {}; let k = 0; const col = (title, list, sub) => { const id = 'c'+(k++); L[id] = list; return wordCol(title, list, id, sub); };
  let html = `<h1>Word bank 🏦</h1><p class="muted">Anara's lists in the same order as the files: every category is its own column, every word is numbered — tap any word for its meaning and grammar (nouns: article, plural, accusative · verbs: 1st, 2nd, 3rd form).</p><div class="row">${['wb-art','wb-mean','wb-spell','wb-pl','verb-mean','verb-type','vforms','small'].map(id=>{ const d = DRILLS.find(x=>x.id===id); return d?`<a class="btn sm" href="#/d/${id}">${esc(d.name)}</a>`:''; }).join('')}</div>
  <nav class="jump"><a href="#bk-nouns" data-jump>📘 Nouns by theme</a><a href="#bk-verbs" data-jump>🔤 Verbs</a><a href="#bk-small" data-jump>🧩 Prepositions · adjectives · adverbs</a><a href="#bk-300" data-jump>⭐ 300 nouns</a></nav>`;
  html += `<h2 id="bk-nouns">📘 Nouns by theme <span class="muted">(Nouns.pages)</span></h2><div class="wcols">` + WB.themes.map((c,i)=> col(`${i+1}. ${c.cat}`, c.words)).join('') + `</div>`;
  html += `<h2 id="bk-verbs">🔤 Verbs <span class="muted">(Verbs weak-strong.pages)</span></h2><div class="wcols">` + col('Weak verbs (regular)', WB.verbList.weak.map(v=>Object.assign({pos:'verb'}, v)), '2nd form: -te · 3rd form: ge-…-t') + col('Strong & irregular verbs', WB.verbList.strong.map(v=>Object.assign({pos:'verb'}, v)), 'the vowel changes · 3rd form often -en') + `</div>`;
  html += `<h2 id="bk-small">🧩 Small words</h2><div class="wcols">` + col('Prepositions', WB.preps) + col('Adjectives', WB.adjs) + col('Adverbs & small words', WB.advs) + `</div>`;
  html += `<h2 id="bk-300">⭐ The 300 most important nouns</h2><div class="wcols">` + WB.list300.map(c=> col(`${c.icon||''} ${c.cat}`, c.words)).join('') + `</div>`;
  $app.innerHTML = html; linkify($app); wireColQuiz(L); wireJump();
}
function wireJump(){ document.querySelectorAll('[data-jump]').forEach(a=> a.onclick = e=>{ e.preventDefault(); const t = document.querySelector(a.getAttribute('href')); if(t) t.scrollIntoView({behavior:'smooth'}); }); }


/* ---------------- texts & dialogues (books) ----------------
   texts/*.js push {id, book, ref, title, topic, lines:["Speaker: German | English"], words:["der Noun|Plural|meaning" | "word||meaning"], items:[compact items]} */
function parseWord(s){
  const [a, pl, en] = s.split('|'); const m = a.match(/^(der|die|das) (.+)$/);
  if(m){ const g = {der:'m', die:'f', das:'n'}[m[1]]; const w = {de:m[2], g, en:en||''}; if(pl) w.pl = pl; else if(g==='f' && /^(Eltern|Geschwister|Leute)$/.test(m[2])) w.g='pl'; if(/\(plural\)/.test(en||'') && !pl) w.g = 'pl'; return w; }
  return {de:a, en:en||''};
}
const TEXTS = (window.TEXTS||[]).map(t=>{
  const lines = t.lines.map(l=>{ const [de, en] = l.split(' | '); const sm = de.match(/^([A-ZÄÖÜ][^:]{0,24}): (.+)$/); return sm && !/^(Lieber|Liebe|Hallo)\b/.test(sm[1]) ? {s:sm[1], de:sm[2].trim(), en:(en||'').trim()} : {s:'', de:de.trim(), en:(en||'').trim()}; });
  return Object.assign({}, t, {lines, words:(t.words||[]).map(parseWord), items:(t.items||[]).map(P)});
});
function textById(id){ return TEXTS.find(t=>t.id===id); }
const sentSplit = s => s.split(/(?<=[.!?])\s+(?=[A-ZÄÖÜ„–])/).map(x=>x.trim()).filter(Boolean);
function textAuto(t){
  const out = []; const ws = t.words.filter(w=>!/\s/.test(w.de) && !/[()/]/.test(w.de));
  t.lines.forEach((L, li)=>{
    // cloze: blank a glossary word from the line
    const toks = L.de.split(/(\s+)/);
    const cands = []; toks.forEach((tk, i)=>{ const bare = tk.replace(/[.,!?;:„“"()–]/g,''); const w = ws.find(w=> w.de.toLowerCase()===bare.toLowerCase() || (w.pl && w.pl.toLowerCase()===bare.toLowerCase())); if(w && bare.length>2) cands.push([i, bare, w]); });
    if(cands.length){ const [i, bare, w] = cands[li % cands.length]; const q = toks.map((tk,j)=> j===i ? tk.replace(bare,'___') : tk).join(''); out.push({t:'fill', q:(L.s?L.s+': ':'')+q, a:[bare], h:w.en+(w.g?' ('+ART[w.g]+')':''), x:`<b>${esc(bare)}</b> = ${esc(w.en)} · ${esc(L.en)}`, tx:t.id}); }
    // word order & translation for single sentences
    const ss = sentSplit(L.de);
    if(ss.length===1){ const n = L.de.split(/\s+/).length;
      if(n>=3 && n<=11 && /[.!?]$/.test(L.de)) out.push({t:'order', a:L.de, en:L.en, tx:t.id});
      if(n>=2 && n<=8 && L.en) out.push({t:'tr', en:L.en, a:[L.de], h:t.title, tx:t.id});
    }
  });
  const sp = [...new Set(t.lines.map(l=>l.s).filter(Boolean))];
  if(sp.length>=2) t.lines.filter(l=>l.s).forEach(l=>{ const o = shuffle([l.s, ...shuffle(sp.filter(s=>s!==l.s)).slice(0,2)]); out.push({t:'mcq', q:`Who says: „${l.de}“`, o, a:o.indexOf(l.s), x:esc(l.en), tx:t.id}); });
  if(t.words.length>=4) t.words.forEach(w=>{ const seenEn = new Set([w.en]); const others = shuffle(t.words.filter(x=>x!==w && x.en!==w.en)).filter(x=>!seenEn.has(x.en) && seenEn.add(x.en)).slice(0,3); const o = shuffle([w, ...others]); if(o.length<2) return; out.push({t:'mcq', q:`What does „${fullDe(w)}“ mean?`, o:o.map(x=>x.en), a:o.indexOf(w), say:fullDe(w), x:`<b>${esc(fullDe(w))}</b> = ${esc(w.en)}${w.pl?' · plural: die '+esc(w.pl):''}`, tx:t.id}); });
  return out;
}
TEXTS.forEach(t=>{ t.auto = textAuto(t); });
function textItems(t){ return t.items.map(it=>Object.assign({lid:t.id}, it)).concat(t.auto.map(it=>Object.assign({lid:t.id}, it))); }
function textsForTopic(tp){ return TEXTS.filter(t=> t.topic===tp.id || (tp.texts||[]).includes(t.id)); }
DRILLS.push({id:'texts', name:'Book texts & dialogues', d:'gaps, word order, who says it, translations — from every text in your books', gen:()=>{ const t = pick(TEXTS); return pick(t.auto.length ? t.auto : t.items); }});
function addTextsToDict(){ TEXTS.forEach(t=> t.words.forEach(w=>{ addD(w.de, Object.assign({tx:t.id}, w)); if(w.pl) addD(w.pl, Object.assign({plf:true}, w)); })); }

function viewTexts(){
  setNav('texts');
  const books = [...new Set(TEXTS.map(t=>t.book))];
  let html = `<h1>Texts & dialogues 📚</h1><p class="muted">Every dialogue and reading text from your books, line by line with the English meaning, the hard words explained, the book's own exercises and extra practice made from the text.</p>`;
  books.forEach(b=>{
    html += `<h2>${esc(b)}</h2><div class="grid">`;
    TEXTS.filter(t=>t.book===b).forEach(t=>{ const r = S.sets['x:'+t.id]; html += `<a class="lesson" href="#/x/${t.id}"><div class="d">${esc(t.ref)}</div><div class="t">${esc(t.title)}</div><div class="chips"><span class="chip">${t.lines.length} lines</span><span class="chip">${t.words.length} words</span><span class="chip">${textItems(t).length} exercises</span></div><div class="prog"><i style="width:${r?Math.round(r.best/r.total*100):0}%"></i></div></a>`; });
    html += `</div>`;
  });
  $app.innerHTML = html; linkify($app);
}
function viewText(id){
  const t = textById(id); if(!t) return viewTexts();
  setNav('texts');
  const i = TEXTS.indexOf(t), prev = TEXTS[i-1], next = TEXTS[i+1];
  const tp = TOPICS.find(x=>x.id===t.topic);
  let html = `<div class="row"><a class="btn sm" href="#/texts">← All texts</a>${prev?`<a class="btn sm" href="#/x/${prev.id}">‹ ${esc(prev.title)}</a>`:''}${next?`<a class="btn sm" href="#/x/${next.id}">${esc(next.title)} ›</a>`:''}</div>
  <div class="muted">${esc(t.book)} · ${esc(t.ref)}${tp?` · topic: <a href="#/t/${tp.id}">${esc(tp.title)}</a>`:''}</div><h1>${esc(t.title)}</h1>
  <div class="row" id="xbtns"><button class="btn go" id="allx">Practise this text (${textItems(t).length})</button>${t.items.length?`<button class="btn" id="bookx">Book exercises (${t.items.length})</button>`:''}<button class="btn" id="readall">🔊 Read it all</button><button class="btn sm" id="tgl">Hide English</button></div>
  <div class="card" id="tx">${t.lines.map(l=>`<div class="ex">${l.s?`<b class="muted">${esc(l.s)}:</b> `:''}<span class="de">${esc(l.de)}</span> ${spk(l.de)}<span class="en">${esc(l.en)}</span></div>`).join('')}</div>`;
  if(t.note) html += `<div class="tip">💡 ${t.note}</div>`;
  if(t.words.length) html += `<h3 id="words">Hard words</h3>` + vocabTable(t.words, false) + `<div class="row"><button class="btn" id="wq">Quiz these words</button><button class="btn" id="ws">Write them</button></div>`;
  $app.innerHTML = html; linkify($app);
  document.getElementById('allx').onclick = ()=> runQuiz({title:t.title, items: shuffle(textItems(t)), key:'x:'+t.id, back:`#/x/${t.id}`, lid:t.id, tid:t.topic});
  const bx = document.getElementById('bookx'); if(bx) bx.onclick = ()=> runQuiz({title:t.title+' — book exercises', items: t.items.slice(), back:`#/x/${t.id}`, lid:t.id, tid:t.topic});
  let hidden = false; document.getElementById('tgl').onclick = e=>{ hidden = !hidden; document.querySelectorAll('#tx .en').forEach(x=> x.style.display = hidden ? 'none' : ''); e.target.textContent = hidden ? 'Show English' : 'Hide English'; };
  document.getElementById('readall').onclick = ()=>{ try{ speechSynthesis.cancel(); t.lines.forEach(l=>{ const u = new SpeechSynthesisUtterance(l.de); u.lang='de-DE'; u.rate=0.9; if(deVoice) u.voice=deVoice; speechSynthesis.speak(u); }); }catch(e){} };
  const wq = document.getElementById('wq'); if(wq) wq.onclick = ()=> runQuiz({title:t.title+' — words', items: vocabQuiz(t.words), back:`#/x/${t.id}`, lid:t.id, tid:t.topic});
  const ws = document.getElementById('ws'); if(ws) ws.onclick = ()=> runQuiz({title:t.title+' — write the words', items: shuffle(t.words).map(w=>({t:'tr', en:w.en, h: w.g?'with der / die / das':'', a:[fullDe(w)], x:`<b>${esc(fullDe(w))}</b>`})), back:`#/x/${t.id}`, lid:t.id, tid:t.topic});
}

/* ---------------- verbs: the 3 forms (1st · 2nd · 3rd) ---------------- */
function verbList(){ return [...ALLV.values()].map(v=> Object.assign({}, v, {f:VFORMS(v.i)})); }
/* groups in the order of the material: my weak list, my strong list, class verbs (in class order), verbs from my texts */
function verbGroups(){
  const clean = x => (x.de||x.i).replace(/^sich |\s*\(sich\)/g,'').replace(/^weh tun$/,'wehtun');
  const seen = new Set(); const mk = (title, sub, arr) => { const out = []; arr.forEach(x=>{ const i = clean(x); if(seen.has(i) || !ALLV.has(i)) return; seen.add(i); out.push(Object.assign({}, ALLV.get(i), {f:VFORMS(i)})); }); return {title, sub, list:out}; };
  const classV = []; LESSONS.forEach(l=>{ VERBS.filter(v=>v.L===l.id).forEach(v=>classV.push(v)); (l.vocab||[]).filter(w=>isVerbWord(w)).forEach(w=>classV.push(w)); }); VERBS.forEach(v=>classV.push(v));
  return [mk('Weak verbs — my list', 'Verbs weak-strong.pages, same order', WB.verbList.weak||[]),
          mk('Strong & irregular verbs — my list', 'Verbs weak-strong.pages, same order', WB.verbList.strong||[]),
          mk('More verbs of the course', 'in the order of the course', classV),
          mk('Verbs from my texts', 'Alltag texts', window.EXTRA_VERBS||[])].filter(g=>g.list.length);
}
const firstW = x => String(x).split(' … ')[0];
const answerSep = x => String(x).replace(' … ',' ');
function vformItem(){
  const all = verbList(); const v = Math.random()<.6 ? pick(all.filter(x=>x.f.kind!=='weak')) : pick(all); const f = v.f;
  const r = Math.random();
  const why = `1️⃣ <b>${esc(f.inf)}</b> · 2️⃣ <b>${esc(f.prat)}</b> · 3️⃣ <b>${esc(f.perfekt)}</b> — ${esc((window.VKIND||{})[f.kind]||f.kind)}`;
  if(r < .35) return {t:'fill', q:`${f.inf} (${v.en}) → 2nd form, Präteritum: er ___`, a:[f.pre ? answerSep(f.prat)+'|'+firstW(f.prat) : f.prat], h:f.kind==='weak'?'weak: stem + -te':'strong/irregular: the vowel changes', x:why, say:`er ${answerSep(f.prat)}`};
  if(r < .75) return {t:'fill', q:`${f.inf} (${v.en}) → 3rd form, Perfekt: er ___ ___`, a:[f.helper, f.part], h:'hat or ist + Partizip II', x:why + (f.aux==='sein'?'<br>„ist“ because it is movement / change of place or state.':''), say:`er ${f.perfekt}`};
  if(r < .9){ const o = ['strong','weak','mixed','modal','irregular'].filter(k=>k===f.kind || ['strong','weak'].includes(k)); const opts = [...new Set(o)]; return {t:'mcq', q:`${f.inf} (${v.en}): which kind of verb?  2nd form: ${f.prat} · 3rd: ${f.perfekt}`, o:opts, a:opts.indexOf(f.kind), x:why}; }
  return {t:'tr', en:`${v.en.replace(/^to /,'')} — all 3 forms (write: 1st, 2nd, 3rd)`, a:[...new Set([`${f.inf}, ${answerSep(f.prat)}, ${f.part}`, `${f.inf}, ${firstW(f.prat)}, ${f.part}`, `${f.inf} ${answerSep(f.prat)} ${f.part}`])], h:'e.g. fahren, fuhr, gefahren', x:why};
}
function vpresItem(){
  const v = pick(verbList().filter(x=>x.f.change && !['modal','irregular'].includes(x.f.change))); const f = v.f; const who = Math.random()<.5 ? ['du', f.du] : [pick(['er','sie','es','Lena','Alex']), f.er];
  return {t:'fill', q:`${who[0]} ___ (${f.inf} — ${v.en})`, a:[answerSep(who[1])], h:`${f.change} in du and er/sie/es`, x:`ich ${esc(f.ich)} · du <b>${esc(f.du)}</b> · er/sie/es <b>${esc(f.er)}</b> (${esc(f.change)}) · wir ${esc(f.wir)}`, say:`${who[0]} ${answerSep(who[1])}`};
}
DRILLS.push({id:'vforms', name:'Verb forms: 1st · 2nd · 3rd', d:'fahren – fuhr – ist gefahren · machen – machte – hat gemacht', gen:vformItem},
            {id:'vpres', name:'Strong verbs: du / er forms', d:'du fährst, er isst, du liest, er läuft', gen:vpresItem});
function viewVerbs(filter){
  setNav('verbs'); filter = filter || 'all';
  const F = {all:['All verbs', ()=>true], strong:['Strong & irregular', v=>v.f.kind!=='weak'], weak:['Weak (regular)', v=>v.f.kind==='weak'], change:['Vowel change: du / er', v=>/→/.test(v.f.change)], sep:['Separable', v=>!!v.f.pre], sein:['Perfekt with ist', v=>v.f.aux==='sein']};
  const groups = verbGroups().map(g=> Object.assign({}, g, {list:g.list.filter(F[filter][1])})).filter(g=>g.list.length);
  const total = groups.reduce((a,g)=>a+g.list.length,0);
  let html = `<h1>Verbs: the 3 forms 🔤</h1><p class="muted">In the order of my lists. 1️⃣ Infinitiv (1st form) · 2️⃣ Präteritum (2nd form, er/sie/es) · 3️⃣ Partizip II with <b>hat</b> or <b>ist</b> (3rd form). Strong verbs also show how du and er/sie/es change. Tap any verb for its grammar.</p>
  <div class="row">${Object.entries(F).map(([k,[n]])=>`<a class="btn sm ${k===filter?'go':''}" href="#/verbs/${k}">${n}</a>`).join('')}</div>
  <div class="row"><input id="vsearch" class="ans" style="flex:1;min-width:0" placeholder="Search a verb (German or English)… (${total} verbs)" autocomplete="off"><a class="btn go" href="#/d/vforms">Drill the 3 forms ♾️</a><a class="btn" href="#/d/vpres">du / er forms ♾️</a></div>`;
  groups.forEach(g=>{ html += `<h2>${esc(g.title)} <span class="muted">(${g.list.length})</span></h2><p class="muted">${esc(g.sub)}</p><div class="card tw"><table class="vocab vt"><tr><th>№</th><th>1️⃣ Infinitiv</th><th>Meaning</th><th>2️⃣ Präteritum</th><th>3️⃣ Perfekt</th><th>du · er/sie/es</th></tr>${g.list.map((v,i)=>`<tr data-s="${esc((v.i+' '+v.en).toLowerCase())}"><td class="num">${i+1}</td><td>${tapWord({de:v.i})} ${spk(v.i)}<div><span class="vfk ${v.f.kind}">${v.f.kind}</span></div></td><td>${esc(v.en)}</td><td class="de">${esc(v.f.prat)}</td><td class="de">${esc(v.f.perfekt)}</td><td class="de">${esc(v.f.du)} · ${esc(v.f.er)}${v.f.change?`<div class="muted">${esc(v.f.change)}</div>`:''}</td></tr>`).join('')}</table></div>`; });
  $app.innerHTML = html; linkify($app);
  const inp = document.getElementById('vsearch'); inp.oninput = ()=>{ const q = inp.value.toLowerCase().trim(); document.querySelectorAll('.vt tr[data-s]').forEach(r=> r.style.display = !q || r.dataset.s.includes(q) ? '' : 'none'); };
}


/* ---------------- 📚 Contents: every topic of the course, numbered, in sequence ---------------- */
function contentsItems(){
  const out = [], seenL = new Set(), seenT = new Set(), seenX = new Set();
  const chs = COURSE.slice();
  chs.forEach(c=>{
    chPages(c).forEach(l=>{ seenL.add(l.id); out.push({c, kind:'page', l}); });
    chTexts(c).forEach(x=>{ seenX.add(x.id); out.push({c, kind:'text', x}); });
    chTopics(c).forEach(t=>{ seenT.add(t.id); out.push({c, kind:'topic', t}); });
  });
  const extra = {id:'more', label:'More', title:'More material', icon:'➕', sub:''};
  LESSONS.filter(l=>!seenL.has(l.id)).forEach(l=> out.push({c:extra, kind:'page', l}));
  TEXTS.filter(x=>!seenX.has(x.id)).forEach(x=> out.push({c:extra, kind:'text', x}));
  TOPICS.filter(t=>!seenT.has(t.id)).forEach(t=> out.push({c:extra, kind:'topic', t}));
  return out;
}
function viewContents(){
  setNav('contents');
  const items = contentsItems();
  const st = p => p>=100 ? '✅ done' : p>0 ? `▶ ${p}%` : '';
  const head = (h, href, ico) => `<li data-h="${esc(norm(h))}"><a href="${href}">${ico?ico+' ':''}${esc(h)}</a></li>`;
  const clean = h => String(h).replace(/^\d+\.\s*/,'');
  let html = `<div class="card"><h1 style="margin-top:0">📚 Course contents — all ${items.length} topics</h1><p class="muted">Everything in the course, in order, with every part of each topic. Tap any line to go straight to that part.</p>
  <div class="csearch"><input id="csq" type="search" autocomplete="off" placeholder="🔍 What do you want to study? e.g. accusative, Familie, fahren, numbers, café, possessive…"><span id="csn" class="muted"></span></div>
  <div class="row">${COURSE.map(c=>`<a class="badge" href="#cc-${c.id}" data-jump>${c.icon||''} ${esc(c.label)}</a>`).join('')}</div></div>`;
  let cur = null, n = 0;
  items.forEach(it=>{
    n++;
    if(it.c !== cur){ cur = it.c; html += `<h2 class="chh2" id="cc-${cur.id}">${cur.icon||''} ${esc(cur.label)} · ${esc(cur.title)}</h2>${cur.sub?`<p class="muted">${esc(cur.sub)}</p>`:''}`; }
    let title, kind, open, heads = [], prog = 0, words = [];
    if(it.kind==='page'){ const l = it.l; title = pageTitle(l); kind = '📖 Grammar'; open = `#/l/${l.id}/learn`; prog = lessonProgress(l); words = l.vocab||[];
      (l.learn||[]).forEach((s,k)=> heads.push(head(clean(s.h), `#/l/${l.id}/learn/${k}`, '📖')));
      if(words.length) heads.push(head(`Words (${words.length})`, `#/l/${l.id}/words`, '🔤'));
      (l.sets||[]).forEach((s,k)=> heads.push(head(`${s.title} (${s.items.length} questions)`, `#/p/${l.id}/${k}`, '✍️')));
    } else if(it.kind==='text'){ const x = it.x; title = x.title; kind = '📚 Text'; open = `#/x/${x.id}`; const r = S.sets['x:'+x.id]; prog = r ? Math.round(r.best/r.total*100) : 0; words = x.words;
      heads.push(head(`Read the text (${x.lines.length} lines, German + English) · ${x.book} ${x.ref}`, `#/x/${x.id}`, '📖'));
      if(x.words.length) heads.push(head(`Hard words (${x.words.length})`, `#/x/${x.id}/words`, '🔤'));
      heads.push(head(`Exercises (${textItems(x).length})`, `#/x/${x.id}/xbtns`, '✍️'));
    } else { const t = it.t; title = `${t.icon||''} ${t.title}`; kind = '🎯 Practice'; open = `#/t/${t.id}`; prog = topicProgress(t);
      (t.learn||[]).forEach((s,k)=> heads.push(head(clean(s.h), `#/t/${t.id}/learn/${k}`, '📏')));
      (t.sets||[]).forEach((s,k)=> heads.push(head(`${s.title} (${s.items.length})`, `#/ts/${t.id}/${k}`, '✍️')));
      if(topicDrills(t).length) heads.push(head(`Endless drills (${topicDrills(t).length})`, `#/t/${t.id}/drills`, '♾️'));
      heads.push(head('Timed session: 30 minutes', `#/run/${t.id}/30`, '⏱'));
    }
    const wtxt = words.map(w=>`${w.g?ART[w.g]+' ':''}${w.de} ${w.pl||''} ${w.en}`).join(' | ');
    html += `<div class="card ctop" id="ct-${n}" data-t="${esc(norm(title))}" data-w="${esc(wtxt)}" data-open="${open}"><div class="ctop-h"><span class="ctn">${n}</span><a class="ctt" href="${open}">${esc(title)}</a><span class="badge">${kind}</span>${st(prog)?`<span class="badge">${st(prog)}</span>`:''}</div>
      <ol class="cheads">${heads.join('')}</ol><div class="cwm"></div>${words.length?`<details class="cw"><summary>🔤 Show the ${words.length} words</summary><div class="wrows">${words.map((w,i)=>`<div class="wrow"><span class="pn">${i+1}</span> ${spk(fullDe(w))} ${tapWord(w)} <span class="muted">— ${esc(w.en)}</span></div>`).join('')}</div></details>`:''}</div>`;
  });
  $app.innerHTML = html; linkify($app); wireJump();
  const inp = document.getElementById('csq'), cnt = document.getElementById('csn');
  const run = ()=>{
    const raw = inp.value.trim(), q = norm(raw), terms = q.split(' ').filter(Boolean);
    let shown = 0, firstOpen = null;
    document.querySelectorAll('.ctop').forEach(card=>{
      const lis = [...card.querySelectorAll('.cheads li')], wm = card.querySelector('.cwm');
      if(!terms.length){ card.hidden = false; lis.forEach(li=> li.hidden = false); wm.innerHTML = ''; shown++; return; }
      const has = t => terms.every(x=> t.includes(x));
      const titleHit = has(card.dataset.t);
      let headHit = 0; lis.forEach(li=>{ const h = has(li.dataset.h); li.hidden = !(titleHit || h); if(h) headHit++; });
      // matching words of this topic
      const words = (card.dataset.w||'').split(' | ').filter(Boolean).filter(w=> has(norm(w))).slice(0,8);
      wm.innerHTML = words.length ? `<div class="muted" style="font-size:.88em;margin:4px 0 0 2.6em">🔤 ${words.map(w=>`<b>${esc(w.split(' ').slice(0, /^(der|die|das) /.test(w)?2:1).join(' '))}</b>`).join(' · ')} — <a href="${card.dataset.open.replace(/\/learn$/,'')}${card.dataset.open.startsWith('#/l/')?'/words':(card.dataset.open.startsWith('#/x/')?'/words':'/words')}">open the words</a></div>` : '';
      const ok = titleHit || headHit || words.length; card.hidden = !ok;
      if(ok){ shown++; const score = (titleHit?100:0) + headHit*10 + words.length; if(!firstOpen || score > firstOpen._s){ firstOpen = card; card._s = score; } }
    });
    document.querySelectorAll('.chh2[id^="cc-"]').forEach(h=>{ let el = h.nextElementSibling, any = false; while(el && !el.classList.contains('chh2')){ if(el.classList.contains('ctop') && !el.hidden) any = true; el = el.nextElementSibling; } h.hidden = !any; const sub = h.nextElementSibling; if(sub && sub.tagName==='P') sub.hidden = !any; });
    cnt.textContent = terms.length ? (shown ? `${shown} topic${shown>1?'s':''} found — tap a line to study it` : 'Nothing found — try another word (German or English)') : '';
    inp._first = firstOpen;
  };
  inp.addEventListener('input', run);
  inp.addEventListener('keydown', e=>{ if(e.key==='Enter' && inp._first){ location.hash = inp._first.dataset.open; } });
  try{ const last = sessionStorage.getItem('csq'); if(last){ inp.value = last; run(); } }catch(e){}
  inp.addEventListener('input', ()=>{ try{ sessionStorage.setItem('csq', inp.value); }catch(e){} });
}

/* ---------------- router ---------------- */
function route(){
  $pop.style.display='none'; if(window.__QT) clearInterval(window.__QT);
  const h = (location.hash||'').replace(/^#\/?/,''); const p = h.split('/');
  try{
    if(!h) viewHome();
    else if(p[0]==='l') viewLesson(p[1], p[2]);
    else if(p[0]==='p'){ const l = lessonById(p[1]); const s = l && l.sets[+p[2]]; if(!s) return viewHome(); runQuiz({title:s.title, items: s.shuffle===false ? s.items.slice() : shuffle(s.items), key:setKey(l,+p[2]), back:`#/l/${l.id}/practice`, lid:l.id}); }
    else if(p[0]==='words') viewWords();
    else if(p[0]==='c') viewChapter(p[1], p[2]);
    else if(p[0]==='contents') viewContents();
    else if(p[0]==='flash') viewFlash(p[1]);
    else if(p[0]==='drills') viewDrills();
    else if(p[0]==='d') viewDrill(p[1]);
    else if(p[0]==='grammar') viewGrammar();
    else if(p[0]==='mistakes') viewMistakes();
    else if(p[0]==='mix') viewMix();
    else if(p[0]==='topics') viewTopics();
    else if(p[0]==='t') viewTopic(p[1], p[2]);
    else if(p[0]==='ts'){ const t = topicById(p[1]); const st = t && t.sets[+p[2]]; if(!st) return viewTopics(); runQuiz({title:st.title, items: st.shuffle===false ? st.items.slice() : shuffle(st.items), key:'t:'+t.id+':'+p[2], back:`#/t/${t.id}`, lid:t.id, tid:t.id}); }
    else if(p[0]==='run') viewRun(p[1], p[2]);
    else if(p[0]==='bank') viewBank();
    else if(p[0]==='verbs') viewVerbs(p[1]);
    else if(p[0]==='texts') viewTexts();
    else if(p[0]==='x') viewText(p[1]);
    else viewHome();
  }catch(err){ console.error(err); $app.innerHTML = `<div class="card">Something went wrong: ${esc(err.message)}. <a href="#/">Home</a></div>`; }
  window.scrollTo(0,0);
  const tgt = p[0]==='x' && p[2] ? document.getElementById(p[2]) : (p[3]!=null && ['l','t'].includes(p[0]) ? document.getElementById('sec-'+p[3]) : null);
  if(tgt){ tgt.scrollIntoView({block:'start'}); window.scrollBy(0,-70); tgt.classList.add('flash-hl'); setTimeout(()=>tgt.classList.remove('flash-hl'), 1800); }
}
buildDict(); addBankToDict(); addTextsToDict(); addVerbForms();
window.addEventListener('hashchange', route);
route();
window.__ANARA = {contentsItems, COURSE, chWords, chapterOfPage, chapterOfText, chapterOfTopic, pageTitle, courseWords, wordColumns, verbGroups, lookupWord, verbList, ALLV, LESSONS, VERBS, conj, numDe, DRILLS, DICT, RENDER, norm, TOPICS, P, topicItems, TEXTS, textItems, speak, fullDe, linkify, verb, esc, ART, lessonItems, topicDrills};
})();

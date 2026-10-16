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
function tokens(text){ return String(text).split(/([A-Za-zÄÖÜäöüß]+)/); }
function linkText(text){
  return tokens(text).map((t,i)=>{
    if(i%2===0) return esc(t);
    const e = DICT.get(t.toLowerCase());
    return e ? `<span class="w" data-w="${esc(t)}">${esc(t)}</span>` : esc(t);
  }).join('');
}
function linkify(root){
  (root||document).querySelectorAll('.de:not([data-l])').forEach(el=>{
    el.setAttribute('data-l','1');
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = []; while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n=>{
      if(n.parentElement && n.parentElement.closest('.w,.spk,button,input')) return;
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
  const t = el.getAttribute('data-w'); const e = DICT.get(t.toLowerCase()); if(!e) return;
  let head, body = `<div>${esc(e.en)}</div>`;
  if(e.de){ head = nounLabel(e); if(e.pl) body += `<div class="muted">Plural: ${e.pl==='—'?'no plural':'die '+esc(e.pl)}</div>`; if(e.plf) body = `<div class="muted">plural of</div>` + body; if(e.opp) body += `<div class="muted">Opposite: ${esc(e.opp)}</div>`; if(e.note) body += `<div class="muted">${esc(e.note)}</div>`; }
  else if(e.pos==='verb'){
    head = esc(e.w); const f = conj(e.vg);
    if(e.form) body = `<div class="muted">form of <b>${esc(e.w)}</b></div>` + body;
    if(e.vg.g==='sep') body += `<div class="muted">separable: ich ${esc(f[0])} … ${esc(e.vg.pre)}</div>`;
    else if(f) body += `<div class="muted">ich ${esc(f[0])} · du ${esc(f[1])} · er ${esc(f[2])}</div>`;
  } else head = esc(e.w);
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
function allVocab(lid){ const out=[]; LESSONS.forEach(l=>{ if(lid && l.id!==lid) return; (l.vocab||[]).forEach(w=> out.push(Object.assign({lid:l.id}, w))); }); return out; }
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
const SEPCTX = {aufstehen:'um 7 Uhr', fernsehen:'am Abend', einkaufen:'im Supermarkt', anrufen:'meine Mutter', abfahren:'um 8 Uhr', ankommen:'in Berlin', aufräumen:'das Zimmer', mitkommen:'heute', vorlesen:'den Text', aufmachen:'das Fenster', zumachen:'die Tür', anmachen:'das Licht', ausmachen:'den Computer', einsteigen:'in den Bus', aussteigen:'in Frankfurt', ankreuzen:'die richtige Antwort'};
function conjItem(filter){
  const pool = VERBS.filter(filter); const v = pick(pool); const p = rnd(6);
  if(v.g==='sep'){
    const s = pick(SUBJ.filter(x=>x[1]===p)) || SUBJ[0]; const [f, pre] = sepForm(v, s[1]);
    return {t:'fill', q:`${s[0]} ___ ${SEPCTX[v.i]||'heute'} ___.`, a:[f, pre], h:`${v.i} — ${v.en}${s[2]?' · '+s[0]+' '+s[2]:''}`, x:`<b>${esc(v.i)}</b> is separable: the verb goes in position 2, the prefix <b>${esc(pre)}</b> goes to the end.`};
  }
  const s = pick(SUBJ.filter(x=>x[1]===p)); const f = conj(v);
  let x = `<b>${esc(v.i)}</b> (${esc(v.en)}): ich ${f[0]}, du ${f[1]}, er/sie/es ${f[2]}, wir ${f[3]}, ihr ${f[4]}, sie/Sie ${f[5]}.`;
  if(v.g==='strong') x += ` Stem change <b>${esc(v.ch)}</b> only for du and er/sie/es.`;
  else if(/(t|d|chn|ffn|gn)$/.test(v.i.replace(/e?n$/,''))) x += ' Stem ends in -t/-d → extra <b>e</b> (du …est, er …et).';
  else if(/(s|ß|z|x)$/.test(v.i.replace(/e?n$/,''))) x += ' Stem ends in -s/-ß/-z → du only adds <b>-t</b>.';
  return {t:'fill', q:`${s[0]} ___.`, a:[f[p]], h:`${v.i} — ${v.en}${s[2]?' · '+s[2]:''}`, x};
}
const AKK = [['Ich','besuchen','Großvater','m','grandfather'],['Du','bezahlen','Fahrkarte','f','ticket'],['Maria','buchen','Reise','f','trip'],['Karl','braten','Steak','n','steak'],['Ich','kennen','Professor','m','professor'],['Ihr','kaufen','Deutschbuch','n','German book'],['Wir','lernen','Wörter','pl','words'],['Du','brauchen','Wörterbuch','n','dictionary'],['Ich','trinken','Orangensaft','m','orange juice'],['Er','verstehen','Wort','n','word'],['Wir','zählen','Stühle','pl','chairs'],['Er','bestellen','Mineralwasser','n','mineral water'],['Du','lesen','Zeitung','f','newspaper'],['Ich','essen','Apfel','m','apple'],['Ihr','sehen','Film','m','film'],['Eva','tragen','Tasche','f','bag'],['Ich','treffen','Freund','m','friend'],['Ihr','haben','Sonnenbrille','f','sunglasses'],['Sie','machen','Hausaufgabe','f','homework'],['Ich','brauchen','Wecker','m','alarm clock'],['Ich','brauchen','Computer','m','computer'],['Ich','brauchen','Kreditkarte','f','credit card'],['Ich','brauchen','Schirm','m','umbrella'],['Walter','kaufen','Salat','m','salad'],['Walter','kaufen','Flasche Wein','f','bottle of wine'],['Walter','kaufen','Schokoladenkuchen','m','chocolate cake'],['Wir','haben','Auto','n','car'],['Er','möchten','Kaffee','m','coffee'],['Ich','möchten','Käsekuchen','m','cheesecake'],['Anara','kaufen','Brot','n','bread'],['Du','nehmen','Tee','m','tea'],['Ich','suchen','Schlüssel','m','key'],['Er','schreiben','Brief','m','letter'],['Wir','bestellen','Pizza','f','pizza'],['Ich','sehen','Hund','m','dog'],['Du','brauchen','Handy','n','mobile phone'],['Er','kaufen','Uhr','f','watch / clock'],['Ich','haben','Bruder','m','brother'],['Maria','fragen','Lehrer','m','teacher'],['Wir','besuchen','Museum','n','museum'],['Ahsan','brauchen','Wohnung','f','flat'],['Ich','möchten','Tasse Tee','f','cup of tea']];
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
  {id:'conj-reg', name:'Regular verbs (Präsens)', d:'kommen, wohnen, lernen … plus -t/-d verbs (arbeiten) and -s/-z verbs (heißen, tanzen)', gen:()=>conjItem(v=>['reg','td','s'].includes(v.g) && !/^(rufen|räumen|steigen|kreuzen)$/.test(v.i))},
  {id:'conj-td', name:'-t / -d / -s verbs', d:'du arbeitest, er findet, du heißt, du tanzt', gen:()=>conjItem(v=>v.g==='td'||v.g==='s')},
  {id:'conj-strong', name:'Stem-changing verbs', d:'a→ä (fahren), e→i (essen), e→ie (lesen), au→äu (laufen)', gen:()=>{ const it = conjItem(v=>v.g==='strong'); return it; }},
  {id:'conj-sep', name:'Separable verbs', d:'Ich stehe um 7 Uhr auf. Er sieht am Abend fern.', gen:()=>conjItem(v=>v.g==='sep')},
  {id:'sein-haben', name:'sein & haben', d:'ich bin / ich habe …', gen:seinItem},
  {id:'conj-all', name:'All verbs mixed', d:'every verb from class', gen:()=>conjItem(v=>!/^(rufen|räumen|steigen|kreuzen)$/.test(v.i))},
  {id:'articles', name:'der, die or das?', d:'every noun from class, with gender rules', gen:artItem},
  {id:'plural', name:'Plural forms', d:'das Buch → die Bücher', gen:plItem},
  {id:'neg', name:'ein / kein', d:'Ist das ein Tisch? – Nein, das ist kein Tisch.', gen:negItem},
  {id:'poss', name:'mein, dein, sein, ihr …', d:'Das ist meine Tasche.', gen:possItem},
  {id:'akk', name:'Accusative (den, einen, keinen)', d:'Ich brauche den Wecker. Er kauft einen Salat.', gen:akkItem},
  {id:'numbers', name:'Numbers 0 – 1 000 000', d:'digits ↔ words', gen:numItem},
  {id:'vocab', name:'Word meanings', d:'all words from class, both directions', gen:()=>vocabItem()}
];

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
  function head(){ return `<div class="qhead"><span>${esc(o.title)}</span><span>${items ? `${idx+1} / ${items.length}` : `#${n+1}`} · ✓ ${score}${o.gen?` / ${n}`:''}</span></div>`; }
  function next(){
    if(items && idx>=items.length) return finish();
    const it = items ? items[idx] : o.gen();
    window.__cur = it; // used by the automated test
    $app.innerHTML = `<div class="row"><a class="btn sm" href="${o.back}">← Back</a>${o.gen?'<button class="btn sm" id="stop">Finish</button>':''}</div><div class="card" id="qc">${head()}<div id="qb"></div><div id="fb"></div></div>`;
    if(o.gen) document.getElementById('stop').onclick = finish;
    const qb = document.getElementById('qb');
    RENDER[it.t](qb, it, (ok, correct, your)=>{
      n++; if(ok) score++; else wrong.push(it);
      recordAnswer(it, ok, o.lid);
      if(ok && o.mistakesMode){ const k=hashItem(it); S.mistakes = S.mistakes.filter(m=>m.k!==k); save(); }
      const say = itemSay(it, correct);
      const fb = document.getElementById('fb');
      fb.innerHTML = `<div class="fb ${ok?'ok':'no'}"><b>${ok?'✓ Richtig!':'✗ Not quite.'}</b>${!ok && correct ? ` Correct: <b class="de">${esc(correct)}</b>`:''} ${say?spk(say):''}${it.x?`<div style="margin-top:6px">${it.x}</div>`:''}</div><div class="row"><button class="btn go" id="nx">Next →</button></div>`;
      linkify(fb); if(say && ok) speak(say);
      const nx = document.getElementById('nx'); nx.onclick = ()=>{ idx++; next(); }; nx.focus({preventScroll:true});
      document.querySelector('#qc .qhead span:last-child').textContent = `${items ? `${idx+1} / ${items.length}` : `#${n}`} · ✓ ${score}${o.gen?` / ${n}`:''}`;
    });
    linkify(qb);
    const first = qb.querySelector('input'); if(first) first.focus({preventScroll:true});
    window.scrollTo(0,0);
  }
  function finish(){
    const total = items ? items.length : n;
    if(o.key && total){ const prev = S.sets[o.key]; if(!prev || score/total >= prev.best/prev.total){ S.sets[o.key] = {best:score, total, t:Date.now()}; } save(); }
    const pct = total ? Math.round(score/total*100) : 0;
    $app.innerHTML = `<div class="card" style="text-align:center"><h2>${esc(o.title)}</h2><div class="big">${score} / ${total}</div><div class="prog" style="max-width:320px;margin:auto"><i style="width:${pct}%"></i></div><p>${pct>=90?'Ausgezeichnet! 🎉':pct>=70?'Gut gemacht! 👍':pct>=50?'Not bad — try once more.':'Keep practising — read the Learn tab again.'}</p>
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

function viewHome(){
  setNav('home');
  const latest = LESSONS[LESSONS.length-1];
  const acc = S.stats.ans ? Math.round(S.stats.ok/S.stats.ans*100) : 0;
  const words = allVocab().length; const items = LESSONS.reduce((a,l)=>a+lessonItems(l).length,0);
  let html = `<h1>Deutsch mit Anara 🇩🇪</h1><p class="muted">My A1 classes with Anara Bekbolotova — every lesson with grammar, word meanings and practice. Tap any <span class="w" data-w="Wort">underlined</span> German word to see what it means and hear it.</p>
  <div class="stat"><div><b>${LESSONS.length}</b>classes</div><div><b>${words}</b>words</div><div><b>${items}</b>exercises + endless drills</div><div><b>${S.stats.ans}</b>answered${S.stats.ans?` · ${acc}% right`:''}</div><div><b>${S.stats.days[today()]||0}</b>today</div></div>
  <div class="row" style="margin-top:12px">${latest?`<a class="btn go" href="#/l/${latest.id}">Latest class: ${esc(latest.title)} →</a>`:''}<a class="btn" href="#/mix">🎲 Mixed review (20)</a><a class="btn" href="#/flash">🃏 Flashcards</a>${S.mistakes.length?`<a class="btn" href="#/mistakes">❗ My mistakes (${S.mistakes.length})</a>`:''}</div>
  <h2 style="margin-top:18px">Classes</h2><div class="grid">`;
  LESSONS.slice().reverse().forEach((l, i)=>{
    const p = lessonProgress(l);
    html += `<a class="lesson" href="#/l/${l.id}"><div class="d">${fmtDate(l.date)} · ${esc(l.id)}${i===0?' · <b style="color:var(--acc)">NEW</b>':''}</div><div class="t">${esc(l.title)}</div><div class="chips">${(l.topics||[]).map(t=>`<span class="chip">${esc(t)}</span>`).join('')}</div><div class="prog"><i style="width:${p}%"></i></div></a>`;
  });
  html += `</div><details class="card" style="margin-top:18px"><summary>How this app grows with my classes</summary><p>Each class is one file in <code>class/lessons/</code> of the <code>goethe-coach</code> repository. After a new class, send Claude the new material (or ask it to read the WhatsApp chat with Anara) and say “add today's class to my practice app” — it adds a new lesson file with grammar, words and exercises, and the drills, flashcards and word list pick the new words up automatically.</p></details>`;
  $app.innerHTML = html; linkify($app);
}

function viewLesson(id, tab){
  const l = lessonById(id); if(!l) return viewHome();
  setNav('home'); tab = tab || 'learn';
  const i = LESSONS.indexOf(l); const prev = LESSONS[i-1], next = LESSONS[i+1];
  let html = `<div class="row"><a class="btn sm" href="#/">← All classes</a>${prev?`<a class="btn sm" href="#/l/${prev.id}">‹ ${esc(prev.id)}</a>`:''}${next?`<a class="btn sm" href="#/l/${next.id}">${esc(next.id)} ›</a>`:''}</div>
  <div class="muted">${fmtDate(l.date)} · ${esc(l.id)}</div><h1>${esc(l.title)}</h1>${l.summary?`<p class="muted">${esc(l.summary)}</p>`:''}
  <div class="tabs">${[['learn','📖 Learn'],['words',`🔤 Words (${(l.vocab||[]).length})`],['practice',`✍️ Practice (${lessonItems(l).length})`],['drills','♾️ Drills']].map(([k,t])=>`<a href="#/l/${l.id}/${k}" class="${tab===k?'on':''}">${t}</a>`).join('')}</div>`;
  if(tab==='learn'){
    (l.learn||[]).forEach(s=>{ html += `<div class="card"><h3>${esc(s.h)}</h3>${s.html}</div>`; });
    html += `<div class="row"><a class="btn go" href="#/l/${l.id}/practice">Practise this class →</a></div>`;
  } else if(tab==='words'){
    html += vocabTable(l.vocab||[], false) + `<div class="row"><button class="btn go" id="vq">Quiz me on these words</button><a class="btn" href="#/flash/${l.id}">Flashcards for this class</a></div>`;
  } else if(tab==='practice'){
    html += `<div class="row"><button class="btn go" id="allq">All ${lessonItems(l).length} questions (mixed)</button></div>`;
    (l.sets||[]).forEach((s,k)=>{ const r = S.sets[setKey(l,k)]; html += `<div class="card"><div class="row" style="justify-content:space-between;margin:0"><div><b>${esc(s.title)}</b><div class="muted">${s.items.length} questions${s.d?' · '+esc(s.d):''}${r?` · best ${r.best}/${r.total}`:''}</div></div><a class="btn ${r?'':'go'}" href="#/p/${l.id}/${k}">${r?'Again':'Start'}</a></div></div>`; });
  } else if(tab==='drills'){
    const ids = l.drills || [];
    html += `<p class="muted">Endless practice — new questions every time, made from the words and verbs of all your classes.</p>`;
    DRILLS.filter(d=>ids.includes(d.id)).forEach(d=>{ html += drillCard(d); });
    html += `<div class="row"><a class="btn" href="#/drills">All drills →</a></div>`;
  }
  $app.innerHTML = html; linkify($app);
  const vq = document.getElementById('vq'); if(vq) vq.onclick = ()=> runQuiz({title:l.title+' — words', items: vocabQuiz(allVocab(l.id)), back:`#/l/${l.id}/words`, lid:l.id});
  const aq = document.getElementById('allq'); if(aq) aq.onclick = ()=> runQuiz({title:l.title+' — all', items: shuffle(lessonItems(l)), back:`#/l/${l.id}/practice`, lid:l.id});
}
function vocabQuiz(pool){ const n = Math.min(15, pool.length); const out=[]; for(let i=0;i<n;i++){ out.push(vocabItem(pool)); } const ns = pool.filter(w=>w.g && w.g!=='pl'); for(let i=0;i<Math.min(5,ns.length);i++){ const w = pick(ns); out.push({t:'mcq', q:`___ ${w.de}  (${w.en})`, o:['der','die','das'], a:['m','f','n'].indexOf(w.g), say:fullDe(w), x:genderRule(w)}); } return shuffle(out); }
function vocabTable(list, showL){
  if(!list.length) return '<p class="muted">No words.</p>';
  return `<div class="card tw"><table class="vocab"><tr><th></th><th>German</th><th>Meaning</th>${showL?'<th>Class</th>':''}</tr>${list.map(w=>`<tr><td>${spk(fullDe(w))}</td><td><b class="de">${nounLabel(w)}</b>${w.pl?`<div class="muted">pl. ${w.pl==='—'?'—':'die '+esc(w.pl)}</div>`:''}${w.ex?`<div class="muted de">${esc(w.ex)}</div>`:''}</td><td>${esc(w.en)}${w.opp?`<div class="muted">↔ <span class="de">${esc(w.opp)}</span></div>`:''}${w.note?`<div class="muted">${esc(w.note)}</div>`:''}</td>${showL?`<td><a href="#/l/${w.lid}/words">${esc(w.lid)}</a></td>`:''}</tr>`).join('')}</table></div>`;
}
function drillCard(d){ const r = S.sets['drill:'+d.id]; return `<div class="card"><div class="row" style="justify-content:space-between;margin:0"><div><b>${esc(d.name)}</b><div class="muted de">${esc(d.d)}</div></div><a class="btn go" href="#/d/${d.id}">Start</a></div></div>`; }

function viewDrills(){ setNav('drills'); $app.innerHTML = `<h1>Drills ♾️</h1><p class="muted">Endless, randomly generated questions from everything you have learnt. Stop whenever you like with “Finish”.</p>` + DRILLS.map(drillCard).join(''); linkify($app); }
function viewDrill(id){ const d = DRILLS.find(x=>x.id===id); if(!d) return viewDrills(); runQuiz({title:d.name, gen:d.gen, back:'#/drills', key:'drill:'+d.id}); }

function viewWords(){
  setNav('words');
  const all = allVocab();
  $app.innerHTML = `<h1>All words (${all.length})</h1><input class="search" id="sq" placeholder="Search German or English…"><div class="row"><select id="sl" class="btn sm"><option value="">All classes</option>${LESSONS.map(l=>`<option value="${l.id}">${esc(l.id)} · ${esc(l.title)}</option>`).join('')}</select><select id="sg" class="btn sm"><option value="">All types</option><option value="m">der (masc.)</option><option value="f">die (fem.)</option><option value="n">das (neuter)</option><option value="x">verbs, adjectives, phrases</option></select><button class="btn sm go" id="wq">Quiz these</button></div><div class="muted" id="wc"></div><div id="wl"></div>
  <p class="muted"><span class="m">der</span> = masculine · <span class="f">die</span> = feminine · <span class="n">das</span> = neuter · <span class="p">die</span> = plural</p>`;
  const draw = ()=>{
    const q = norm(document.getElementById('sq').value), lid = document.getElementById('sl').value, g = document.getElementById('sg').value;
    const list = all.filter(w=> (!lid || w.lid===lid) && (!g || (g==='x' ? !w.g : w.g===g)) && (!q || norm(w.de+' '+(w.pl||'')+' '+w.en).includes(q)));
    document.getElementById('wc').textContent = list.length+' words'; document.getElementById('wl').innerHTML = vocabTable(list, true); linkify(document.getElementById('wl'));
    return list;
  };
  ['sq','sl','sg'].forEach(i=> document.getElementById(i).addEventListener('input', draw));
  document.getElementById('wq').onclick = ()=>{ const list = draw(); if(list.length<4) return; runQuiz({title:'Word quiz', items: vocabQuiz(list), back:'#/words'}); };
  draw();
}

function viewFlash(lid){
  setNav('flash');
  let deck = allVocab(lid||undefined); let dir = 'de';
  const box = k => S.fc[k]||0; const key = w => w.lid+'|'+w.de;
  function order(){ return shuffle(deck).sort((a,b)=> box(key(a))-box(key(b))).slice(0,20); }
  let cards = order(), i = 0, flipped = false;
  function draw(){
    if(i>=cards.length){ $app.innerHTML = `<div class="card" style="text-align:center"><h2>Done! 🎉</h2><p>You went through ${cards.length} cards. Cards you didn't know will come back first next time.</p><div class="row" style="justify-content:center"><button class="btn go" id="more">20 more</button><a class="btn" href="#/">Home</a></div></div>`; document.getElementById('more').onclick=()=>{ cards=order(); i=0; flipped=false; draw(); }; return; }
    const w = cards[i]; const k = key(w);
    const front = dir==='de' ? `<div class="de">${nounLabel(w)}</div>` : `<div>${esc(w.en)}</div>`;
    const back = dir==='de' ? `<div>${esc(w.en)}</div>` : `<div class="de">${nounLabel(w)}</div>`;
    const extra = `${w.pl?`<div class="sub">plural: ${w.pl==='—'?'—':'die '+esc(w.pl)}</div>`:''}${w.opp?`<div class="sub">opposite: ${esc(w.opp)}</div>`:''}${w.ex?`<div class="sub de">${esc(w.ex)}</div>`:''}`;
    $app.innerHTML = `<div class="row"><select id="fd" class="btn sm"><option value="">All classes</option>${LESSONS.map(l=>`<option value="${l.id}" ${lid===l.id?'selected':''}>${esc(l.id)} · ${esc(l.title)}</option>`).join('')}</select><button class="btn sm" id="fdir">${dir==='de'?'German → English':'English → German'} ⇄</button><span class="muted">${i+1} / ${cards.length} · box ${box(k)}</span></div>
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
  let html = `<h1>Grammar from class</h1><p class="muted">Everything Anara explained, in one place.</p><div class="card"><b>Jump to:</b><ul>`;
  LESSONS.forEach(l=> (l.learn||[]).forEach((s,k)=>{ html += `<li><a href="#/l/${l.id}/learn">${esc(s.h)}</a> <span class="muted">(${fmtDate(l.date)})</span></li>`; }));
  html += `</ul></div>`;
  html += `<div class="card"><h3>Quick verb table</h3><div class="tw"><table><tr><th>Verb</th>${PERS.map(p=>`<th>${p}</th>`).join('')}</tr>${['sein','haben','kommen','arbeiten','heißen','fahren','essen','lesen','möchten'].map(v=>{ const f = conj(v); return `<tr><td><b class="de">${v}</b></td>${f.map(x=>`<td class="de">${esc(x)}</td>`).join('')}</tr>`; }).join('')}</table></div></div>`;
  LESSONS.forEach(l=> (l.learn||[]).forEach(s=>{ html += `<div class="card"><div class="muted">${fmtDate(l.date)} · <a href="#/l/${l.id}">${esc(l.title)}</a></div><h3>${esc(s.h)}</h3>${s.html}</div>`; }));
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

/* ---------------- router ---------------- */
function route(){
  $pop.style.display='none';
  const h = (location.hash||'').replace(/^#\/?/,''); const p = h.split('/');
  try{
    if(!h) viewHome();
    else if(p[0]==='l') viewLesson(p[1], p[2]);
    else if(p[0]==='p'){ const l = lessonById(p[1]); const s = l && l.sets[+p[2]]; if(!s) return viewHome(); runQuiz({title:s.title, items: s.shuffle===false ? s.items.slice() : shuffle(s.items), key:setKey(l,+p[2]), back:`#/l/${l.id}/practice`, lid:l.id}); }
    else if(p[0]==='words') viewWords();
    else if(p[0]==='flash') viewFlash(p[1]);
    else if(p[0]==='drills') viewDrills();
    else if(p[0]==='d') viewDrill(p[1]);
    else if(p[0]==='grammar') viewGrammar();
    else if(p[0]==='mistakes') viewMistakes();
    else if(p[0]==='mix') viewMix();
    else viewHome();
  }catch(err){ console.error(err); $app.innerHTML = `<div class="card">Something went wrong: ${esc(err.message)}. <a href="#/">Home</a></div>`; }
  window.scrollTo(0,0);
}
buildDict();
window.addEventListener('hashchange', route);
route();
window.__ANARA = {LESSONS, VERBS, conj, numDe, DRILLS, DICT, RENDER, norm};
})();

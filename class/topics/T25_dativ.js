/* Dative practice (6.1 Nomen & Artikel – Dativ · 6.2 Pronomen – Dativ): endless generators + practice topic */
(function(){
const R = n => Math.floor(Math.random()*n), pk = a => a[R(a.length)], sh = a => { a = a.slice(); for(let i=a.length-1;i>0;i--){ const j=R(i+1); [a[i],a[j]]=[a[j],a[i]]; } return a; };
const F = v => window.VFORMS(v); const S1 = x => String(x).split(' … ')[0]; const cap = s => s[0].toUpperCase()+s.slice(1);
const form = (v, p) => { const f = F(v); return [f.ich,f.du,f.er,f.wir,f.ihr,f.sie][p]; };
const SUBJ = [['Ich',0],['Du',1],['Er',2],['Sie',2],['Paul',2],['Maria',2],['Der Student',2],['Wir',3],['Ihr',4],['Die Kinder',5]];
// person nouns: [noun, gender, dative plural form]
const PERS = [['Onkel','m'],['Großvater','m'],['Freund','m'],['Lehrer','m'],['Professor','m'],['Chef','m'],['Bruder','m'],['Reporter','m'],['Nachbar','m'],
 ['Tante','f'],['Reporterin','f'],['Lehrerin','f'],['Freundin','f'],['Nachbarin','f'],['Studentin','f'],['Mutter','f'],['Journalistin','f'],['Touristin','f'],['Professorin','f'],
 ['Kind','n'],['Mädchen','n'],['Baby','n'],
 ['Leuten','pl','Leute'],['Kindern','pl','Kinder'],['Gästen','pl','Gäste'],['Eltern','pl','Eltern'],['Studenten','pl','Studenten'],['Freunden','pl','Freunde'],['Touristen','pl','Touristen'],['Studentinnen','pl','Studentinnen']];
const DEF = {m:'dem', f:'der', n:'dem', pl:'den'}, IND = {m:'einem', f:'einer', n:'einem', pl:''}, POSS = {m:'meinem', f:'meiner', n:'meinem', pl:'meinen'};
const DVERBS = [['helfen'],['danken'],['antworten'],['glauben'],['gratulieren'],['vertrauen'],['verzeihen'],['zuhören']];
const THINGS = {gehören:[['das Haus','n',0],['das Buch','n',0],['der Rucksack','m',0],['die Kamera','f',0],['das Tablet','n',0],['der Wagen','m',0],['der Hund','m',0],['die Tasche','f',0],['das Auto','n',0],['die Bücher','pl',1],['die Fahrräder','pl',1],['die Handschuhe','pl',1]],
 schmecken:[['das Eis','n',0],['die Pizza','f',0],['der Wein','m',0],['die Suppe','f',0],['das Steak','n',0],['der Fisch','m',0],['der Kuchen','m',0],['die Erdbeeren','pl',1],['die Pommes','pl',1],['die Trauben','pl',1]],
 gefallen:[['der Film','m',0],['die Musik','f',0],['das Bild','n',0],['die Stadt','f',0],['das Lied','n',0],['die Bilder','pl',1],['die Blumen','pl',1]],
 passen:[['die Jacke','f',0],['der Mantel','m',0],['das Kleid','n',0],['die Schuhe','pl',1],['die Hose','f',0]]};
const PRON3 = {m:'er', f:'sie', n:'es', pl:'sie'};
const DPRON = {m:'ihm', f:'ihr', n:'ihm', pl:'ihnen'};
const NAMES = [['Peter','m'],['Paul','m'],['Klaus','m'],['Robert','m'],['Max','m'],['Eva','f'],['Maria','f'],['Julia','f'],['Lena','f'],['Max und Maria','pl'],['Paul und Lisa','pl'],['den Leuten','pl'],['dem Lehrer','m'],['der Studentin','f'],['dem Kind','n'],['den Kindern','pl']];
const SWAP = [['mir','dir'],['uns','euch']];
window.EXTRA_DRILLS = (window.EXTRA_DRILLS||[]).concat([
 {id:'p6-art', name:'Dative articles: dem · der · dem · den · einem · einer', d:'Ich danke dem Großvater · Du antwortest einer Journalistin', gen:()=>{
   const [v] = pk(DVERBS); const [s, p] = pk(SUBJ); const [n, g, nomPl] = pk(PERS); const kind = g==='pl' ? 'def' : pk(['def','def','ind','poss']);
   const art = kind==='def' ? DEF[g] : kind==='ind' ? IND[g] : POSS[g]; const vf = S1(form(v, p)); const sep = F(v).pre;
   const hint = kind==='def' ? (g==='pl' ? `die ${nomPl}` : `${{m:'der',f:'die',n:'das'}[g]} ${n}`) : kind==='ind' ? `${g==='m'||g==='n'?'ein':'eine'} ${n}` : `mein${g==='f'?'e':''} ${n}`;
   return {t:'fill', q:`${s} ${vf} ___ ${n}${sep?' '+sep:''}. (${hint})`, a:[art], h:`${v} + Dativ`, x:`${v} takes the <b>dative</b>: ${hint} → <b>${art} ${n}</b> · dem / der / dem / den (+n) · einem / einer / einem`, say:`${s} ${vf} ${art} ${n}${sep?' '+sep:''}`}; }},
 {id:'p6-verb', name:'Dative verbs: helfen, danken, antworten, glauben …', d:'Du hilfst dem Onkel · Er dankt der Tante', gen:()=>{
   const [v] = pk(DVERBS); const [s, p] = pk(SUBJ); const [n, g] = pk(PERS.filter(x=>x[1]!=='pl')); const f = F(v); const vf = S1(form(v, p));
   return f.pre ? {t:'fill', q:`${v}: ${s} ___ ${DEF[g]} ${n} ___.`, a:[vf, f.pre], h:'separable', x:`<b>${s} ${vf} ${DEF[g]} ${n} ${f.pre}</b>`, say:`${s} ${vf} ${DEF[g]} ${n} ${f.pre}`}
     : {t:'fill', q:`${v}: ${s} ___ ___ ${n}.`, a:[vf, DEF[g]], h:`${v} + Dativ`, x:`<b>${s} ${vf} ${DEF[g]} ${n}</b>${f.change&&/→/.test(f.change)?` (${f.change})`:''}`, say:`${s} ${vf} ${DEF[g]} ${n}`}; }},
 {id:'p6-gehoert', name:'gehören · schmecken · gefallen · passen + Dativ', d:'Das Haus gehört dem Onkel · Dem Onkel gehört das Haus', gen:()=>{
   const v = pk(Object.keys(THINGS)); const [thing, tg, pl] = pk(THINGS[v]); const [n, g] = pk(PERS); const vf = S1(form(v, pl?5:2)); const dat = `${DEF[g]} ${n}`;
   if(Math.random()<.35){ const a = `${cap(dat)} ${vf} ${thing}.`; return {t:'order', a, en:`${thing} – ${n} (${v}) · dative first`, x:`Position I: <b>${cap(dat)}</b> · verb in position II: <b>${vf}</b>`}; }
   return {t:'fill', q:`${v}: ${cap(thing)} ___ ___ ${n}.`, a:[vf, DEF[g]], h:`${pl?'plural subject':'singular subject'} · ${v} + Dativ`, x:`<b>${cap(thing)} ${vf} ${dat}.</b>`, say:`${cap(thing)} ${vf} ${dat}`}; }},
 {id:'p6-pron', name:'Dative pronouns: mir, dir, ihm, ihr, uns, euch, ihnen', d:'Hilfst du Paul? – Nein, ich helfe ihm nicht.', gen:()=>{
   const [v] = pk(DVERBS); const neg = Math.random()<.5; const f = F(v);
   if(Math.random()<.3){ const [q, a] = pk(SWAP); const qv = S1(form(v, 1)); const av = S1(form(v, 0)); return {t:'fill', q:`${cap(qv)} du ${q}${f.pre?' '+f.pre:''}? – ${neg?'Nein':'Ja'}, ich ${av} ___${neg?' nicht':''}${f.pre?' '+f.pre:''}.`, a:[a], h:`${q} → ${a}`, x:`Question with <b>${q}</b> → answer with <b>${a}</b>`, say:`${neg?'Nein':'Ja'}, ich ${av} ${a}${neg?' nicht':''}${f.pre?' '+f.pre:''}`}; }
   const [n, g] = pk(NAMES); const qv = S1(form(v, 1)); const av = S1(form(v, 0)); const pr = DPRON[g];
   return {t:'fill', q:`${cap(qv)} du ${n}${f.pre?' '+f.pre:''}? – ${neg?'Nein':'Ja'}, ich ${av} ___${neg?' nicht':''}${f.pre?' '+f.pre:''}.`, a:[pr], h:'dative pronoun', x:`${n} → <b>${pr}</b> (ihm = er/es · ihr = sie · ihnen = plural)`, say:`${neg?'Nein':'Ja'}, ich ${av} ${pr}${neg?' nicht':''}${f.pre?' '+f.pre:''}`}; }},
 {id:'p6-wem', name:'Wem gehört …? – Dem Onkel gehört es.', d:'Wem? → dative · pronoun for the thing', gen:()=>{
   const [thing, tg, pl] = pk(THINGS.gehören); const vf = pl ? 'gehören' : 'gehört'; const tp = PRON3[tg];
   if(Math.random()<.3){ const [p, d] = pk([['ich','Mir'],['du','Dir'],['wir','Uns'],['ihr','Euch'],['Sie','Ihnen']]); return {t:'fill', q:`${thing.split(' ')[1]} – ${p}: Wem ${vf} ${thing}? – ___ ${vf} ${tp}.`, a:[d], h:`${p} → dative`, x:`<b>${d} ${vf} ${tp}.</b>`, say:`${d} ${vf} ${tp}`}; }
   const [n, g] = pk(PERS); return {t:'fill', q:`${thing.split(' ')[1]} – ${n}: Wem ${vf} ${thing}? – ___ ${n} ${vf} ___.`, a:[cap(DEF[g]), tp], h:'dative first, then the pronoun for the thing', x:`<b>${cap(DEF[g])} ${n} ${vf} ${tp}.</b> (${thing} → ${tp})`, say:`${cap(DEF[g])} ${n} ${vf} ${tp}`}; }},
 {id:'p6-case', name:'Nominativ, Akkusativ or Dativ? (ich / mich / mir …)', d:'Hilfst du mir? · Siehst du mich?', gen:()=>{
   const P = [['ich','mich','mir'],['du','dich','dir'],['er','ihn','ihm'],['sie (she)','sie','ihr'],['wir','uns','uns'],['ihr','euch','euch'],['sie (they)','sie','ihnen']];
   const V = [['helfen','D'],['danken','D'],['antworten','D'],['glauben','D'],['gratulieren','D'],['sehen','A'],['kennen','A'],['fragen','A'],['besuchen','A'],['lieben','A']];
   const [nom, akk, dat] = pk(P); const [v, c] = pk(V); const ans = c==='D' ? dat : akk; const others = [...new Set([akk, dat, nom.split(' ')[0]])].filter(x=>x!==ans);
   const vf = S1(form(v, 1)); return {t:'mcq', q:`${cap(vf)} du ___? (${nom})`, o:[ans, ...others.slice(0,2)], a:0, x:`${v} + <b>${c==='D'?'Dativ':'Akkusativ'}</b> → ${nom} → <b>${ans}</b>`}; }}
]);
TOPICS.push({id:'pr-dativ', icon:'🎁', title:'The dative: articles, verbs & pronouns', d:'Ich helfe dem Onkel · Das Haus gehört dem Onkel · Hilfst du Paul? – Ja, ich helfe ihm.', src:'Aber Hallo! A1 Lektion 6, 6.1 + 6.2',
 lessons:['L18','L19'], gens:['p6-art','p6-verb','p6-gehoert','p6-pron','p6-wem','p6-case'],
 learn:[{h:'Practise the dative', html:`<div class="row"><a class="btn go" href="#/ts/pr-dativ/0">✍️ Start the exercises</a><a class="btn" href="#/run/pr-dativ/15">⏱ 15 min</a><a class="btn" href="#/run/pr-dativ/30">⏱ 30 min</a><a class="btn" href="#/run/pr-dativ/60">⏱ 1 hour</a><a class="btn" href="#/run/pr-dativ/240">⏱ 4 hours</a><a class="btn" href="#/teach/dativ/0">🧑‍🏫 Teach me step by step</a></div>`},
  {h:'The dative at a glance', html: TBL(['','masculine','feminine','neuter','plural'],[['~Nominativ','der / ein','die / eine','das / ein','die'],['~Akkusativ','den / einen','die / eine','das / ein','die'],['~Dativ','<b>dem / einem</b>','<b>der / einer</b>','<b>dem / einem</b>','<b>den</b> + -n']])+
   TBL(['','ich','du','er','sie','es','wir','ihr','sie, Sie'],[['~Dativ','mir','dir','ihm','ihr','ihm','uns','euch','ihnen, Ihnen']])}],
 sets:[{title:'Mixed dative test', items:[
  "f:Ich helfe [dem] Großvater.","f:Du antwortest [der] Reporterin.","f:Wir danken [den] Leuten.","f:Er gratuliert [einem] Mädchen.","f:Das Eis schmeckt [den] Kindern.","f:Die Musik [gefällt] der Studentin. (gefallen)",
  "f:Hilfst du Paul? – Ja, ich helfe [ihm].","f:Glaubst du Maria? – Nein, ich glaube [ihr] nicht.","f:Dankst du den Leuten? – Ja, ich danke [ihnen].","f:Glaubst du mir? – Ja, ich glaube [dir].","f:Wem gehört das Buch? – [Dem] Professor gehört es.",
  "o:Dem Onkel gehört das Haus.|Haus – Onkel (dative first)","o:Gefällt dir der Film?|Do you like the film?","t:I help you. (du)|Ich helfe dir.","t:The book belongs to me.|Das Buch gehört mir.","m:Wie geht es ___? (formal you)|Ihnen|Sie|ihnen ## Ihnen = dative of formal Sie"
 ]}]
});
})();

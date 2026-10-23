/* Verbs by case: endless questions from data/vcases.js + practice topic */
(function(){
const C = window.VCASES || []; if(!C.length) return;
const R = n => Math.floor(Math.random()*n), pk = a => a[R(a.length)], sh = a => { a = a.slice(); for(let i=a.length-1;i>0;i--){ const j=R(i+1); [a[i],a[j]]=[a[j],a[i]]; } return a; };
const plain = s => s.replace(/\[[nad]:([^\]]+)\]/g, '$1');
const CASEN = {gleich:'Nominativ (= Nominativ)', nom:'Nominativ only (no object)', akk:'Akkusativ', dat:'Dativ', dakk:'Akkusativ + Dativ'};
const LAB = {n:'Nominativ', a:'Akkusativ', d:'Dativ'};
const main = C.filter(c=>CASEN[c.id]);
const FAM = [['den','dem','der'],['dem','den','der'],['der','die','den','dem'],['die','der','den'],['das','dem','den'],['einen','einem','einer','ein'],['einem','einen','einer'],['einer','eine','einem'],['eine','einer','einen'],['ein','einen','einem'],
 ['mich','mir','ich'],['mir','mich','ich'],['dich','dir','du'],['dir','dich','du'],['ihn','ihm','er'],['ihm','ihn','er'],['ihr','sie','ihm'],['ihnen','sie','ihr'],['uns','wir'],['euch','ihr'],
 ['meinen','meinem','meiner'],['meinem','meinen','meiner'],['meiner','meine','meinem'],['meine','meiner','meinen'],['seiner','seine','seinem'],['seinen','seinem','seiner'],['ihrem','ihren','ihrer'],['ihren','ihrem','ihrer'],['unsere','unserer','unseren'],['keinen','keinem','kein']];
window.EXTRA_DRILLS = (window.EXTRA_DRILLS||[]).concat([
 {id:'p-vcase', name:'Which case does the verb need?', d:'helfen → Dativ · kaufen → Akkusativ · schlafen → Nominativ only', gen:()=>{
   const c = pk(main); const [v,en,ex,exen] = pk(c.list); const opts = [CASEN[c.id], ...sh(Object.keys(CASEN).filter(k=>k!==c.id)).slice(0,2).map(k=>CASEN[k])];
   return {t:'mcq', q:`<b>${v}</b> (${en}) — which case comes after it?`, o:opts, a:0, x:`<b>${v}</b> → ${CASEN[c.id]} · ${plain(ex)} <i>(${exen})</i>`, say:plain(ex)}; }},
 {id:'p-vcase-art', name:'Verb decides: der, den or dem?', d:'Ich antworte ___ Lehrer → dem', gen:()=>{
   for(let k=0;k<50;k++){ const c = pk(C); const [v,en,ex,exen] = pk(c.list); const segs = [...ex.matchAll(/\[([ad]):([^\]]+)\]/g)]; if(!segs.length) continue; const sg = pk(segs); const w = sg[2].split(' '); const f = FAM.find(f=>f[0]===w[0]); if(!f) continue;
     const q = plain(ex.replace(sg[0], ['___'].concat(w.slice(1)).join(' '))); const opts = [f[0], ...sh(f.slice(1)).slice(0,2)];
     return {t:'mcq', q:`${q} <span class="muted">(${v})</span>`, o:opts, a:0, x:`${v} → <b>${LAB[sg[1]]}</b>: ${plain(ex)} <i>(${exen})</i>`, say:plain(ex)}; }
   return {t:'mcq', q:'Ich helfe ___ Mann.', o:['dem','den','der'], a:0, x:'helfen + Dativ'}; }},
 {id:'p-vcase-part', name:'Which part is Nominativ, Akkusativ or Dativ?', d:'Ich gebe dem Lehrer das Buch.', gen:()=>{
   const pool = C.flatMap(c=>c.list).filter(r=>(r[2].match(/\[[nad]:/g)||[]).length>=2); const [v,en,ex,exen] = pk(pool);
   const segs = [...ex.matchAll(/\[([nad]):([^\]]+)\]/g)].map(m=>[m[1],m[2]]); const uniq = segs.filter((s,i)=>segs.findIndex(t=>t[0]===s[0])===i); const tg = pk(uniq);
   const opts = [tg[1], ...segs.filter(s=>s[1]!==tg[1]).map(s=>s[1])].filter((x,i,a)=>a.indexOf(x)===i);
   return {t:'mcq', q:`${plain(ex)}<br>Which part is <b>${LAB[tg[0]]}</b>?`, o:opts, a:0, x:segs.map(s=>`${s[1]} = ${LAB[s[0]]}`).join(' · ')+` · verb <b>${v}</b> has no case`}; }}
]);
TOPICS.push({id:'pr-vcase', icon:'🎯', title:'Verbs by case: Nominativ, Akkusativ, Dativ', d:'schlafen (Nom only) · kaufen + Akk · helfen + Dat · geben + Dat + Akk — all verbs of the course', src:'Verbs weak-strong · Verben im Kontext · Ahsan 5-10 verbs · Aber Hallo! 6.1',
 gens:['p-vcase','p-vcase-art','p-vcase-part'],
 learn:[{h:'Practise this topic', html:`<div class="row"><a class="btn go" href="#/vcases">🎯 See all verbs by case</a><a class="btn" href="#/ts/pr-vcase/0">✍️ Start the exercises</a><a class="btn" href="#/run/pr-vcase/15">⏱ 15 min</a><a class="btn" href="#/run/pr-vcase/30">⏱ 30 min</a><a class="btn" href="#/run/pr-vcase/60">⏱ 1 hour</a></div>`},
  {h:'The rule', html: TBL(['Verb type','After the verb','Example'],[['Nominativ only','~nothing (only the doer)','Ich schlafe.'],['= verbs (sein, werden, bleiben, heißen)','~Nominativ again','Ich bin Ingenieur.'],['Akkusativ verbs','~Wen? / Was?','Ich kaufe den Tisch.'],['Dativ verbs','~Wem?','Ich helfe dem Mann.'],['giving verbs','~Wem? + Was?','Ich gebe dem Kind einen Apfel.']])+TIP('The verb itself has <b>no case</b> — it is the boss that decides the case of the other words.')}],
 sets:[{title:'Mixed test: which case?', items:[
  "m:helfen → which case?|Dativ|Akkusativ|Nominativ only ## helfen + Dativ: Ich helfe dem Mann.",
  "m:kaufen → which case?|Akkusativ|Dativ|Nominativ only ## Ich kaufe den Tisch.",
  "m:schlafen → which case?|Nominativ only|Akkusativ|Dativ ## Ich schlafe. (no object)",
  "m:sein → which case?|Nominativ = Nominativ|Akkusativ|Dativ ## Ich bin Ingenieur.",
  "m:geben → which case?|Akkusativ + Dativ|Dativ|Akkusativ ## Ich gebe dem Kind einen Apfel.",
  "m:gefallen → which case?|Dativ|Akkusativ|Nominativ only ## Der Film gefällt mir.",
  "m:besuchen → which case?|Akkusativ|Dativ|Nominativ only ## Wir besuchen unsere Oma.",
  "f:Ich antworte [dem] Lehrer. (der Lehrer)","f:Ich frage [den] Lehrer. (der Lehrer)","f:Ich danke [dir]. (du)","f:Ich sehe [dich]. (du)","f:Der Film gefällt [mir]. (ich)",
  "f:Ich gebe [dem] Kind [einen] Apfel.","f:Ich bin [ein] Ingenieur. (ein)","f:Ich warte auf [den] Bus. (der Bus)","f:Ich telefoniere mit [meiner] Mutter. (meine)",
  "m:Ich gebe dem Lehrer das Buch. — which part is Dativ?|dem Lehrer|das Buch|Ich",
  "m:Den Kuchen isst das Kind. — which part is Nominativ?|das Kind|Den Kuchen|isst"
 ]}]
});
})();

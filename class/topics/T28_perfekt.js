/* Perfekt + modal / irregular verbs: endless generators and practice topics */
(function(){
const R = n => Math.floor(Math.random()*n), pk = a => a[R(a.length)], sh = a => { a = a.slice(); for(let i=a.length-1;i>0;i--){ const j=R(i+1); [a[i],a[j]]=[a[j],a[i]]; } return a; };
const cap = s => s[0].toUpperCase()+s.slice(1);
// person: [subject, index 0..5]
const P = [['Ich',0],['Du',1],['Er',2],['Lena',2],['Maria',2],['Mein Vater',2],['Wir',3],['Ihr',4],['Die Kinder',5],['Meine Eltern',5]];
const HABEN = ['habe','hast','hat','haben','habt','haben'], SEIN = ['bin','bist','ist','sind','seid','sind'];
// [infinitive, aux h/s, Partizip II, middle part of the sentence, English, rule]
const V = [
 ['kochen','h','gekocht','gestern Spaghetti','cook','regular: ge-…-t'],['machen','h','gemacht','gestern die Hausaufgaben','do','regular: ge-…-t'],['kaufen','h','gekauft','einen Schlüssel','buy','regular: ge-…-t'],
 ['lernen','h','gelernt','für die Prüfung','learn','regular: ge-…-t'],['spielen','h','gespielt','am Wochenende Fußball','play','regular: ge-…-t'],['suchen','h','gesucht','den Schlüssel','look for','regular: ge-…-t'],
 ['putzen','h','geputzt','das ganze Haus','clean','regular: ge-…-t'],['rauchen','h','geraucht','eine Zigarette','smoke','regular: ge-…-t'],['schicken','h','geschickt','eine Nachricht','send','regular: ge-…-t'],
 ['tanzen','h','getanzt','gestern lange','dance','regular: ge-…-t'],['brauchen','h','gebraucht','Hilfe','need','regular: ge-…-t'],['holen','h','geholt','neue Ware aus dem Lager','fetch','regular: ge-…-t'],
 ['arbeiten','h','gearbeitet','gestern im Büro','work','-t stem: ge-…-et'],['warten','h','gewartet','eine Stunde auf dich','wait','-t stem: ge-…-et'],['heiraten','h','geheiratet','letztes Jahr','marry','-t stem: ge-…-et'],['kosten','h','gekostet','viel Geld','cost','-t stem: ge-…-et'],
 ['schreiben','h','geschrieben','eine lange E-Mail','write','irregular: ge-…-en'],['lesen','h','gelesen','das ganze Buch','read','irregular: ge-…-en'],['trinken','h','getrunken','eine Tasse Kaffee','drink','irregular: ge-…-en'],
 ['essen','h','gegessen','zum Frühstück Brot','eat','irregular: ge-…-en'],['finden','h','gefunden','den Schlüssel nicht','find','irregular: ge-…-en'],['schlafen','h','geschlafen','gut','sleep','irregular: ge-…-en'],
 ['treffen','h','getroffen','ihre Freundinnen','meet','irregular: ge-…-en'],['sehen','h','gesehen','einen Film','see','irregular: ge-…-en'],['helfen','h','geholfen','im Haushalt','help','irregular: ge-…-en'],
 ['waschen','h','gewaschen','die Wäsche','wash','irregular: ge-…-en'],['schneiden','h','geschnitten','die Haare','cut','irregular: ge-…-en'],['schließen','h','geschlossen','das Fenster','close','irregular: ge-…-en'],
 ['sprechen','h','gesprochen','mit dem Lehrer','speak','irregular: ge-…-en'],['gewinnen','h','gewonnen','die Goldmedaille','win','irregular: -en'],
 ['bringen','h','gebracht','einen Tee','bring','mixed: ge-…-t + vowel change'],['denken','h','gedacht','an dich','think','mixed: ge-…-t + vowel change'],
 ['studieren','h','studiert','Medizin','study','-ieren: no ge-'],['telefonieren','h','telefoniert','mit Klaus','phone','-ieren: no ge-'],['präsentieren','h','präsentiert','ein Projekt','present','-ieren: no ge-'],['korrigieren','h','korrigiert','den Fehler','correct','-ieren: no ge-'],
 ['bezahlen','h','bezahlt','die Rechnung','pay','be-: no ge-'],['bestellen','h','bestellt','eine Pizza','order','be-: no ge-'],['besuchen','h','besucht','die Großeltern','visit','be-: no ge-'],['bekommen','h','bekommen','ein Geschenk','get','be-: no ge-'],
 ['erzählen','h','erzählt','eine Geschichte','tell','er-: no ge-'],['erklären','h','erklärt','den Akkusativ','explain','er-: no ge-'],['vergessen','h','vergessen','den Regenschirm','forget','ver-: no ge-'],['verstehen','h','verstanden','das','understand','ver-: no ge-'],
 ['zumachen','h','zugemacht','die Tür','close','separable: zu-ge-macht'],['einkaufen','h','eingekauft','im Supermarkt','shop','separable: ein-ge-kauft'],['anrufen','h','angerufen','meine Mutter','call','separable: an-ge-rufen'],['aufräumen','h','aufgeräumt','das Zimmer','tidy up','separable: auf-ge-räumt'],
 ['gehen','s','gegangen','gestern ins Kino','go','sein: movement'],['fahren','s','gefahren','nach Berlin','drive','sein: movement'],['fliegen','s','geflogen','nach Paris','fly','sein: movement'],['kommen','s','gekommen','gestern spät nach Hause','come','sein: movement'],
 ['laufen','s','gelaufen','im Park','run','sein: movement'],['reisen','s','gereist','nach Deutschland','travel','sein: movement'],['schwimmen','s','geschwommen','im See','swim','sein: movement'],['rennen','s','gerannt','zum Bus','run','sein: movement'],
 ['wandern','s','gewandert','in den Bergen','hike','sein: movement'],['aufstehen','s','aufgestanden','um 7 Uhr','get up','sein: movement · separable'],['aufwachen','s','aufgewacht','früh','wake up','sein: change of state'],['einschlafen','s','eingeschlafen','schnell','fall asleep','sein: change of state'],
 ['bleiben','s','geblieben','zu Hause','stay','sein: other'],['sein','s','gewesen','gestern zu Hause','be','sein: other']];
const AUXW = (v, i) => (v[1]==='s' ? SEIN : HABEN)[i];
const pres = (inf, i) => { const f = window.VFORMS(inf); return [f.ich,f.du,f.er,f.wir,f.ihr,f.sie][i]; };
const MOD = {müssen:['muss','musst','muss','müssen','müsst','müssen'], können:['kann','kannst','kann','können','könnt','können'], dürfen:['darf','darfst','darf','dürfen','dürft','dürfen'], wollen:['will','willst','will','wollen','wollt','wollen'], sollen:['soll','sollst','soll','sollen','sollt','sollen'], möchten:['möchte','möchtest','möchte','möchten','möchtet','möchten']};
const IRR = {sein:['bin','bist','ist','sind','seid','sind'], haben:['habe','hast','hat','haben','habt','haben'], mögen:['mag','magst','mag','mögen','mögt','mögen'], wissen:['weiß','weißt','weiß','wissen','wisst','wissen'], tun:['tue','tust','tut','tun','tut','tun']};
const MODS = [['heute arbeiten','work today'],['gut Tennis spielen','play tennis well'],['hier nicht rauchen','not smoke here'],['nach Berlin fahren','go to Berlin'],['mehr Deutsch lernen','learn more German'],['einen Kaffee trinken','drink a coffee'],['morgen früh aufstehen','get up early tomorrow'],['die Tante besuchen','visit the aunt'],['jetzt einsteigen','get on now']];
const IRRS = {sein:['müde','krank','zu Hause'], haben:['keine Zeit','zwei Kinder','Hunger'], mögen:['Pizza','Italien','keinen Kaffee'], wissen:['die Antwort','das nicht'], tun:['nichts','das gern']};
window.EXTRA_DRILLS = (window.EXTRA_DRILLS||[]).concat([
 {id:'p8-aux', name:'Perfekt: haben or sein?', d:'Ich bin gefahren · Ich habe gekocht', gen:()=>{
   const v = pk(V); const [s,i] = pk(P); const a = AUXW(v,i), b = (v[1]==='s'?HABEN:SEIN)[i];
   return {t:'mcq', q:`${s} ___ ${v[3]} ${v[2]}. <span class="muted">(${v[0]})</span>`, o:[a,b], a:0, x:`${v[0]} → <b>${v[1]==='s'?'sein':'haben'}</b> (${v[5]})`, say:`${s} ${a} ${v[3]} ${v[2]}`}; }},
 {id:'p8-part', name:'Make the Partizip II', d:'kochen → gekocht · studieren → studiert · zumachen → zugemacht', gen:()=>{
   const v = pk(V); if(Math.random()<.5) return {t:'fill', q:`${v[0]} (to ${v[4]}) → ${v[1]==='s'?'ist':'hat'} ___`, a:[v[2]], h:v[5], x:`${v[0]} → ${v[1]==='s'?'ist':'hat'} <b>${v[2]}</b> · ${v[5]}`};
   const wrong = [ 'ge'+v[2].replace(/^ge/,''), v[2].replace(/t$/,'en'), v[0].replace(/en$/,'t').replace(/^/, v[2].startsWith('ge')?'':'ge') ].filter(w=>w!==v[2]);
   const o = [v[2], ...[...new Set(wrong)].slice(0,2)]; return {t:'mcq', q:`Partizip II of <b>${v[0]}</b>?`, o, a:0, x:`<b>${v[2]}</b> · ${v[5]}`}; }},
 {id:'p8-sent', name:'Perfekt sentences: haben / sein + Partizip', d:'Ich habe gestern Spaghetti gekocht.', gen:()=>{
   const v = pk(V); const [s,i] = pk(P); const a = AUXW(v,i);
   return {t:'fill', q:`(${v[0]}) ${s} ___ ${v[3]} ___.`, a:[a, v[2]], h:v[5], x:`<b>${s} ${a} ${v[3]} ${v[2]}.</b> · ${v[5]}`, say:`${s} ${a} ${v[3]} ${v[2]}`}; }},
 {id:'p8-trans', name:'Present → Perfekt', d:'Ich koche Spaghetti → Ich habe Spaghetti gekocht', gen:()=>{
   const v = pk(V.filter(x=>x[0]!=='sein')); const [s,i] = pk(P); const p = pres(v[0], i); const a = AUXW(v,i);
   const [p1, p2] = String(p).split(' … '); const now = `${s} ${p1} ${v[3].replace(/^gestern /,'')}${p2?' '+p2:''}.`;
   const past = `${s} ${a} ${v[3].replace(/^gestern /,'')} ${v[2]}.`;
   if(Math.random()<.4) return {t:'order', a: past, en:`Präsens: ${now} → Perfekt`, x:`haben / sein in position 2, Partizip at the END`};
   return {t:'fill', q:`Präsens: <b>${now}</b><br>Perfekt: ${s} ___ ${v[3].replace(/^gestern /,'')} ___.`, a:[a, v[2]], h:v[5], x:`<b>${past}</b>`, say:past}; }},
 {id:'p4-modal', name:'Modal verbs: muss, kann, darf, will, soll, möchte', d:'Ich kann gut Tennis spielen.', gen:()=>{
   const mv = pk(Object.keys(MOD)); const [s,i] = pk(P); const [rest, en] = pk(MODS); const form = MOD[mv][i];
   if(Math.random()<.3) return {t:'order', a:`${s} ${form} ${rest}.`, en:`${mv}: ${s} … ${en}`, x:'modal in position 2, infinitive at the end'};
   const parts = rest.split(' '); const inf = parts.pop();
   return {t:'fill', q:`(${mv}) ${s} ___ ${parts.join(' ')} ___.`, a:[form, inf], h:'ich = er: no ending', x:`<b>${s} ${form} ${rest}.</b>`, say:`${s} ${form} ${rest}`}; }},
 {id:'p4-irr', name:'sein, haben, mögen, wissen, tun', d:'du bist · er hat · ich mag · er weiß · wir tun', gen:()=>{
   const v = pk(Object.keys(IRR)); const [s,i] = pk(P); const form = IRR[v][i];
   return {t:'fill', q:`(${v}) ${s} ___ ${pk(IRRS[v])}.`, a:[form], h:'learn by heart', x:`${v}: ${IRR[v].join(' · ')}`}; }}
]);
TOPICS.push({id:'pr-perfekt', icon:'⏪', title:'The past: Perfekt (haben / sein + Partizip II)', d:'Ich habe gestern gekocht · Ich bin nach Berlin gefahren · Er hat Medizin studiert', src:'Spektrum A1 Lektion 6 · Aber Hallo! A1 8.1 · class worksheets',
 lessons:['L24','L25'], gens:['p8-aux','p8-part','p8-sent','p8-trans'],
 learn:[{h:'Practise the Perfekt', html:`<div class="row"><a class="btn go" href="#/ts/pr-perfekt/0">✍️ Start the exercises</a><a class="btn" href="#/run/pr-perfekt/15">⏱ 15 min</a><a class="btn" href="#/run/pr-perfekt/30">⏱ 30 min</a><a class="btn" href="#/run/pr-perfekt/60">⏱ 1 hour</a><a class="btn" href="#/run/pr-perfekt/240">⏱ 4 hours</a><a class="btn" href="#/teach/perfekt/0">🧑‍🏫 Teach me step by step</a></div>`},
  {h:'The formula', html: TBL(['Position 1','Position 2','middle','END'],[['Ich','habe','gestern Spaghetti','gekocht.'],['Ich','bin','gestern nach Berlin','gefahren.']])+TIP('<b>S + haben / sein + … + ge-Verb-t</b> · no ge- for -ieren and be-/ver-/er- verbs · separable: zu<b>ge</b>macht · movement / change → <b>sein</b>')}],
 sets:[{title:'Mixed test: Perfekt', items:[
  "f:Ich [habe] gestern Spaghetti [gekocht]. (kochen)","f:Ich [bin] gestern nach Berlin [gefahren]. (fahren)","f:Er [hat] Medizin [studiert]. (studieren)","f:Ich [habe] gestern 150 Euro [bezahlt]. (bezahlen)",
  "f:Sie [hat] die Tür [zugemacht]. (zumachen)","f:Wann [bist] du heute [aufgestanden]? (aufstehen)","f:Wir [sind] zu Hause [geblieben]. (bleiben)","f:Letztes Jahr [habe] ich in einer Fabrik [gearbeitet]. (arbeiten)",
  "m:Ich ___ nach Paris geflogen.|bin|habe ## fliegen → sein","m:Partizip of telefonieren?|telefoniert|getelefoniert|telefonierte ## -ieren: no ge-","m:Partizip of verstehen?|verstanden|geverstanden|verstehen ## ver-: no ge-",
  "o:Ich habe gestern meine Hausaufgaben gemacht.|I did my homework yesterday.","o:Bist du gestern in die Stadt gegangen?|Did you go to the city yesterday?","o:Ich bin gestern nicht zu Hause gewesen.|I wasn't at home yesterday.",
  "t:I drank a coffee.|Ich habe einen Kaffee getrunken.","t:We flew to Paris.|Wir sind nach Paris geflogen."
 ]}]
});
TOPICS.push({id:'pr-modal', icon:'🔧', title:'Modal & irregular verbs: können, müssen … sein, haben, wissen', d:'Ich kann gut Tennis spielen · Sie mag Italien · Er weiß es nicht', src:'Spektrum A1 Lektion 4 · Aber Hallo! A1 7.2',
 lessons:['L23'], gens:['p4-modal','p4-irr'],
 learn:[{h:'Practise this topic', html:`<div class="row"><a class="btn go" href="#/ts/pr-modal/0">✍️ Start the exercises</a><a class="btn" href="#/run/pr-modal/15">⏱ 15 min</a><a class="btn" href="#/run/pr-modal/30">⏱ 30 min</a><a class="btn" href="#/run/pr-modal/60">⏱ 1 hour</a></div>`},
  {h:'The rule', html: TIP('Modal verbs: <b>ich = er</b>, no ending (ich kann, er kann) · modal in position 2, infinitive at the END: Ich <b>kann</b> gut Tennis <b>spielen</b>.')}],
 sets:[{title:'Mixed test: modal & irregular verbs', items:[
  "f:Ich [muss] heute arbeiten. (müssen)","f:Er [kann] gut kochen. (können)","f:Hier [darf] man nicht rauchen. (dürfen)","f:[Willst] du mitkommen? (wollen)","f:Ihr [sollt] leise sein. (sollen)",
  "f:Sie [mag] Italien. (mögen)","f:Er [weiß] die Antwort. (wissen)","f:Was [tut] sie jetzt? (tun)","f:Du [bist] müde. (sein)","f:Er [hat] keine Zeit. (haben)",
  "o:Ich kann heute nicht kommen.|I can't come today.","o:Was möchtest du trinken?|What would you like to drink?","m:Er ___ gut Deutsch.|kann|kannt|könnt ## er = ich: kann"
 ]}]
});
})();

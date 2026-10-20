/* 7.3 Präpositionen mit Dativ + the three cases: endless generators + practice topics */
(function(){
const R = n => Math.floor(Math.random()*n), pk = a => a[R(a.length)];
const cap = s => s[0].toUpperCase()+s.slice(1);
const DEF = {m:'dem', f:'der', n:'dem', pl:'den'}, IND = {m:'einem', f:'einer', n:'einem'}, NOM = {m:'der', f:'die', n:'das', pl:'die'};
// [sentence with {P} for preposition+article, preposition, noun, gender, english]
const S = [
 ['Paul fährt {P} nach Hause.','mit','Taxi','n','Paul goes home by taxi.'],['Ich fahre {P} zur Arbeit.','mit','Bus','m','I go to work by bus.'],['Wir fahren {P} in die Stadt.','mit','Auto','n','We drive into town.'],
 ['Ich schneide das Brot {P}.','mit','Messer','n','I cut the bread with a knife.'],['Paul geht {P} spazieren.','mit','Hund','m','Paul goes for a walk with the dog.'],['Ich spreche {P}.','mit','Lehrerin','f','I talk to the teacher.'],
 ['Klaus nimmt die Jacke {P}.','aus','Schrank','m','Klaus takes the jacket out of the wardrobe.'],['Hol bitte den Wein {P}!','aus','Keller','m','Please get the wine from the cellar!'],['Wann gehst du {P}?','aus','Haus','n','When do you leave the house?'],['Sie trinkt {P}.','aus','Flasche','f','She drinks from the bottle.'],
 ['Peter wohnt {P}.','bei','Eltern','pl','Peter lives with his parents.'],['Ich arbeite {P}.','bei','Firma','f','I work at the company.'],['Max wohnt {P}.','bei','Tante','f','Max lives at his aunt\'s.'],
 ['Ich hole das Paket {P} ab.','von','Post','f','I pick up the parcel from the post office.'],['Das Geschenk ist {P}.','von','Freund','m','The present is from the friend.'],['Er kommt gerade {P}.','von','Arbeit','f','He is just coming from work.'],['Sie kommt {P}.','von','Universität','f','She is coming from the university.'],
 ['Wohin gehst du {P}?','nach','Essen','n','Where are you going after the meal?'],['{P} besucht er Maria.','nach','Arbeit','f','After work he visits Maria.'],['Wir gehen {P} essen.','nach','Konzert','n','We go out to eat after the concert.'],['{P} trinke ich Kaffee.','nach','Unterricht','m','After class I drink coffee.'],
 ['Ich gehe {P}.','zu','Arzt','m','I am going to the doctor.'],['Wir gehen {P}.','zu','Party','f','We are going to the party.'],['Bringst du mich {P}?','zu','Bahnhof','m','Will you take me to the station?'],['Ich gehe {P}.','zu','Post','f','I am going to the post office.'],
 ['Das Hotel liegt {P}.','gegenüber','Bahnhof','m','The hotel is opposite the station.'],['Die Tankstelle liegt {P}.','gegenüber','Parkhaus','n','The petrol station is opposite the car park.'],['Die Apotheke ist {P}.','gegenüber','Kirche','f','The pharmacy is opposite the church.']];
const PLDAT = {Eltern:'Eltern', Kinder:'Kindern', Freunde:'Freunden'};
const phrase = (p, art, noun) => p==='gegenüber' ? `${art} ${noun} gegenüber` : `${p} ${art} ${noun}`;
const shortF = (p, g) => (p==='zu' && g==='m' || p==='zu' && g==='n') ? 'zum' : p==='zu' && g==='f' ? 'zur' : p==='bei' && g!=='f' && g!=='pl' ? 'beim' : p==='von' && g!=='f' && g!=='pl' ? 'vom' : null;
const TIME = [['seit','Jahr','n','einem','for a year'],['seit','Woche','f','einer','for a week'],['seit','Monat','m','einem','for a month'],['seit','Tag','m','einem','for a day']];
window.EXTRA_DRILLS = (window.EXTRA_DRILLS||[]).concat([
 {id:'p7-art', name:'Dative prepositions: the article (mit dem, seit einer …)', d:'Paul fährt mit dem Taxi · Eva arbeitet seit einer Woche in Bonn', gen:()=>{
   if(Math.random()<.25){ const [p, n, g, art, en] = pk(TIME); const who = pk([['Maria wohnt','in Wien'],['Ich lerne','Deutsch'],['Eva arbeitet','in Bonn'],['Wir wohnen','in Bischkek']]);
     return {t:'fill', q:`${who[0]} seit ___ ${n} ${who[1]}. (ein${g==='f'?'e':''} ${n})`, a:[art], h:'seit + Dativ', x:`seit + Dativ · ${g==='f'?'eine':'ein'} ${n} → <b>${art} ${n}</b> (${en})`, say:`${who[0]} seit ${art} ${n} ${who[1]}`}; }
   const [s, p, n, g, en] = pk(S); const art = DEF[g]; const noun = g==='pl' ? (PLDAT[n]||n) : n; const pc = s.startsWith('{P}') ? cap(p) : p;
   const blank = p==='gegenüber' ? `___ ${noun} gegenüber` : `${pc} ___ ${noun}`; const full = p==='gegenüber' ? `${art} ${noun} gegenüber` : `${pc} ${art} ${noun}`;
   return {t:'fill', q:cap(s.replace('{P}', blank))+` (${NOM[g]} ${n})`, a:[art], h:`${p} + Dativ`, x:`${p} + Dativ · ${NOM[g]} ${n} → <b>${art} ${noun}</b>${shortF(p,g)?` (short: <b>${shortF(p,g)} ${noun}</b>)`:''} — ${en}`, say:cap(s.replace('{P}', full))}; }},
 {id:'p7-prep', name:'Which preposition? aus, bei, mit, nach, seit, von, zu, gegenüber', d:'Diese Tomaten kommen aus Spanien · Ich bringe dich zum Bahnhof', gen:()=>{
   const L = [['Diese Tomaten kommen ___ Spanien.','aus','origin'],['Ich komme ___ Pakistan.','aus','origin'],['Die Flasche ist ___ Glas.','aus','material'],['Wir fahren ___ Italien.','nach','country → nach'],['Ich fliege ___ Berlin.','nach','city → nach'],['Ich gehe ___ Hause.','nach','going home → nach Hause'],
    ['Ich bin ___ Hause.','zu','at home → zu Hause'],['Heute gehe ich ___ Klaus.','zu','to a person → zu'],['Ich lerne Deutsch ___ einem Jahr.','seit','since / for (until now)'],['Ich wohne ___ drei Monaten in Bischkek.','seit','since / for'],
    ['Sie fährt ___ dem Taxi.','mit','transport → mit'],['Ich trinke Tee ___ Milch.','mit','with'],['Maria wohnt ___ ihren Eltern.','bei','at someone\'s place → bei'],['___ Regen jogge ich nicht.','Bei','bei Regen = when it rains'],
    ['___ wem ist das Geschenk?','Von','from whom?'],['Ich hole dich ___ Flughafen ab.','vom','von dem → vom'],['Ich bringe dich ___ Bahnhof.','zum','zu dem → zum'],['Ich gehe ___ Post.','zur','zu der → zur'],['Ich bin ___ Arzt.','beim','bei dem → beim'],
    ['Die Bank liegt dem Hotel ___.','gegenüber','after the noun'],['___ dem Konzert gehen wir essen.','Nach','after (time) → nach'],['Er kommt ___ der Arbeit.','von','from (starting point)']];
   const [q, a, x] = pk(L); const pool = ['aus','bei','mit','nach','seit','von','zu','gegenüber','zum','zur','vom','beim']; const al = a.toLowerCase();
   if(Math.random()<.5){ const opts = [al, ...pool.filter(w=>w!==al).sort(()=>Math.random()-.5).slice(0,2)]; return {t:'mcq', q:q.replace('___','___'), o:opts, a:0, x:`<b>${a}</b> — ${x}`}; }
   return {t:'fill', q, a:[a], h:'aus · bei · mit · nach · seit · von · zu · gegenüber', x:`<b>${a}</b> — ${x}`, say:q.replace('___', a)}; }},
 {id:'p7-pron', name:'Preposition + pronoun: zu ihm, mit ihr, bei ihnen', d:'Gehst du zu Klaus? – Nein, ich gehe nicht zu ihm.', gen:()=>{
   const V = [['Gehst du','ich gehe','zu'],['Kommst du','ich komme','von'],['Telefonierst du','ich telefoniere','mit'],['Sprichst du','ich spreche','mit'],['Lernst du','ich lerne','mit'],['Fährst du','ich fahre','zu'],['Wohnst du','ich wohne','bei'],['Gehst du ins Kino','ich gehe ins Kino','mit']];
   const P = [['Klaus','ihm'],['Julia','ihr'],['dem Großvater','ihm'],['der Sekretärin','ihr'],['den Studentinnen','ihnen'],['Frau Berg','ihr'],['deinen Eltern','ihnen'],['Herrn Meier','ihm'],['dem Kind','ihm'],['Max und Lena','ihnen']];
   const [qv, av, p] = pk(V); const [n, pr] = pk(P); const ja = Math.random()<.4;
   return {t:'fill', q:`${qv} ${p} ${n}? – ${ja?'Ja':'Nein'}, ${av}${ja?'':' nicht'} ${p} ___.`, a:[pr], h:'dative pronoun', x:`${p} + Dativ · ${n} → <b>${pr}</b>`, say:`${ja?'Ja':'Nein'}, ${av}${ja?'':' nicht'} ${p} ${pr}`}; }},
 {id:'p-cases', name:'Nominativ, Akkusativ or Dativ? (who does what)', d:'Der Mann gibt dem Kind einen Apfel.', gen:()=>{
   const L = [['Der Mann','gibt','dem Kind','einen Apfel','The man gives the child an apple.'],['Ich','gebe','meiner Mutter','ein Geschenk','I give my mother a present.'],['Die Lehrerin','erklärt','den Studenten','die Grammatik','The teacher explains the grammar to the students.'],
    ['Paul','schenkt','seiner Freundin','Blumen','Paul gives his girlfriend flowers.'],['Wir','zeigen','dem Touristen','den Bahnhof','We show the tourist the station.'],['Der Kellner','bringt','dem Gast','die Suppe','The waiter brings the guest the soup.'],['Du','schreibst','dem Freund','einen Brief','You write the friend a letter.'],['Maria','kauft','dem Bruder','einen Pullover','Maria buys her brother a pullover.']];
   const [nom, v, dat, akk, en] = pk(L); const which = pk([['Nominativ',nom,'Wer? — the doer'],['Akkusativ',akk,'Was? — the thing'],['Dativ',dat,'Wem? — the person at the other end']]);
   const o = ['Nominativ','Akkusativ','Dativ']; const s = `${nom} ${v} ${dat} ${akk}.`.replace(which[1], `<b>${which[1]}</b>`);
   return {t:'mcq', q:s, o:[which[0], ...o.filter(x=>x!==which[0])], a:0, x:`<b>${which[1]}</b> → ${which[0]}: ${which[2]} · ${en}`}; }}
]);
TOPICS.push({id:'pr-dprep', icon:'🧭', title:'Prepositions with the dative: aus, bei, mit, nach, seit, von, zu', d:'mit dem Auto · seit einem Jahr · zum Bahnhof · dem Hotel gegenüber · Ich gehe nicht zu ihm.', src:'Aber Hallo! A1 Lektion 7, 7.3',
 lessons:['L21'], gens:['p7-art','p7-prep','p7-pron'],
 learn:[{h:'Practise this topic', html:`<div class="row"><a class="btn go" href="#/ts/pr-dprep/0">✍️ Start the exercises</a><a class="btn" href="#/run/pr-dprep/15">⏱ 15 min</a><a class="btn" href="#/run/pr-dprep/30">⏱ 30 min</a><a class="btn" href="#/run/pr-dprep/60">⏱ 1 hour</a><a class="btn" href="#/run/pr-dprep/240">⏱ 4 hours</a><a class="btn" href="#/teach/dprep/0">🧑‍🏫 Teach me step by step</a></div>`},
  {h:'The 8 dative prepositions', html: TBL(['Präposition','English','Example'],[['aus','~from, out of, made of','aus Spanien · aus dem Haus · aus Glas'],['bei','~at (someone\'s), near, during','bei meinen Eltern · bei Regen'],['mit','~with, by','mit dir · mit dem Auto'],['nach','~to (city / country), after','nach Köln · nach dem Konzert'],['seit','~since, for','seit einem Jahr'],['von','~from, by','von der Post · von einem Freund'],['zu','~to (people / places)','zu Paul · zum Bahnhof · zur Post'],['gegenüber','~opposite','dem Hotel gegenüber']])+TIP('beim = bei dem · vom = von dem · zum = zu dem · zur = zu der')}],
 sets:[{title:'Mixed test: dative prepositions', items:[
  "f:Paul fährt mit [dem] Taxi nach Hause.","f:Maria wohnt seit [einem] Jahr in Wien.","f:Ich hole das Paket von [der] Post ab.","f:Peter wohnt bei [den] Eltern.","f:Das Hotel liegt [dem] Bahnhof gegenüber.",
  "f:Diese Tomaten kommen [aus] Spanien.","f:Ich bringe dich [zum] Bahnhof.","f:Kannst du mich [vom] Flughafen abholen?","f:Ich gehe [zur] Post.","f:Heute gehe ich [zu] Klaus.",
  "f:Gehst du zu Klaus? – Nein, ich gehe nicht zu [ihm].","f:Wohnst du bei deinen Eltern? – Nein, ich wohne nicht bei [ihnen].","f:Sprichst du mit der Sekretärin? – Nein, ich spreche nicht mit [ihr].",
  "m:Wir fahren ___ Italien.|nach|zu|aus ## countries → nach","m:Ich bin ___ Hause. (at home)|zu|nach|bei ## zu Hause = at home","o:Ich fahre mit dem Bus zur Arbeit.|I go to work by bus.","t:I have been learning German for a year.|Ich lerne seit einem Jahr Deutsch."
 ]}]
});
TOPICS.push({id:'pr-cases', icon:'🎯', title:'Nominativ, Akkusativ, Dativ: who does what?', d:'Der Mann gibt dem Kind einen Apfel · der / den / dem · ich / mich / mir', src:'Aber Hallo! A1 4.3, 6.1, 6.2',
 lessons:['L20'], gens:['p-cases','p6-case','akk','p6-art'],
 learn:[{h:'Practise this topic', html:`<div class="row"><a class="btn go" href="#/ts/pr-cases/0">✍️ Start the exercises</a><a class="btn" href="#/run/pr-cases/15">⏱ 15 min</a><a class="btn" href="#/run/pr-cases/30">⏱ 30 min</a><a class="btn" href="#/run/pr-cases/60">⏱ 1 hour</a><a class="btn" href="#/run/pr-cases/240">⏱ 4 hours</a><a class="btn" href="#/teach/cases/0">🧑‍🏫 Teach me step by step</a></div>`},
  {h:'Who does what?', html: TBL(['Case','Question','Role','der-word'],[['Nominativ','Wer?','~the doer','der / ein'],['Akkusativ','Wen? / Was?','~the thing (directly)','den / einen'],['Dativ','Wem?','~the person to / for','dem / einem']])+EX('Der Mann gibt dem Kind einen Apfel.','The man gives the child an apple.')}],
 sets:[{title:'Mixed test: the three cases', items:[
  "f:[Der] Lehrer fragt die Studentin. (der)","f:Die Studentin fragt [den] Lehrer. (der)","f:Die Studentin hilft [dem] Lehrer. (der)","f:Ich habe [einen] Bruder. (ein)","f:Das ist [ein] Computer. (ein)",
  "f:Kennst du Peter? – Ja, ich kenne [ihn].","f:Hilfst du Peter? – Ja, ich helfe [ihm].","f:Ich gebe [meiner] Mutter ein Geschenk. (meine)","f:Ich trinke [eine] Limonade. (eine)",
  "m:Ich danke ___. (du)|dir|dich|du ## danken + Dativ","m:Ich sehe ___. (du)|dich|dir|du ## sehen + Akkusativ","m:___ Erdbeereis|das|die|der ## last word: das Eis","m:___ Zeitung|die|der|das ## -ung → die",
  "o:Der Mann gibt dem Kind einen Apfel.|The man gives the child an apple.","t:I help the man.|Ich helfe dem Mann."
 ]}]
});
})();

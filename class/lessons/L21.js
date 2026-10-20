/* 7.3 Präpositionen mit Dativ (Aber Hallo! A1, S. 27) */
(function(){
const f = (q, a, x) => ({t:'fill', q, a:Array.isArray(a)?a:[a], x});
const o = (a, en, x) => ({t:'order', a, en, x});
const m = (q, opts, x) => ({t:'mcq', q, o:opts, a:0, x});
LESSONS.push({
id:'L21', date:'2026-10-20',
title:'Prepositions with the dative: aus, bei, mit, nach, seit, von, zu, gegenüber (7.3)',
topics:['aus · bei · mit · nach · seit · von · zu · gegenüber + Dativ','beim · vom · zum · zur','mit dem Auto · seit einem Jahr · zu Hause','Gehst du zu Klaus? – Nein, ich gehe nicht zu ihm.'],
summary:'Eight prepositions are always followed by the dative: aus, bei, mit, nach, seit, von, zu, gegenüber. Some join with the article: beim, vom, zum, zur.',
learn:[
{h:'1. What are dative prepositions?', html:`<p>A <b>preposition</b> is a small word like <i>with, from, to, at</i>. After these eight prepositions the noun is <b>always in the dative</b> — no matter what the verb is:</p>`+
 `<p style="font-size:1.15em"><b>aus · bei · mit · nach · seit · von · zu · gegenüber</b></p>`+
 EX('Ich fahre mit dem Auto.','I am going by car.')+EX('Maria wohnt seit einem Jahr in Wien.','Maria has been living in Vienna for a year.')+
 TIP('Memory trick: the dative prepositions sing to the tune of „<b>aus – bei – mit – nach – seit – von – zu</b>“ (+ gegenüber). Learn them as one line, like DOGFU for the accusative.')},
{h:'2. Each preposition and its meaning', html: TBL(['Präposition','Bedeutung','English','Beispiele'],[
 ['aus','~Ort (place)','~from, out of','aus München, aus Tunesien, aus dem Haus'],['aus','~Material','~made of','aus Glas'],
 ['bei','~Ort (place)','~at (someone\'s), near','bei meinen Eltern, bei Hamburg'],['bei','~Zeit (time)','~at, during','bei Nacht'],
 ['mit','~Art und Weise (way)','~with','mit dir, mit Glück'],['mit','~Instrument (means)','~by, with','mit dem Auto, mit einem Messer'],
 ['seit','~Zeit (time)','~since, for','seit einem Jahr'],
 ['nach','~Ort (place)','~to (cities, countries)','nach Köln, nach Italien'],['nach','~Zeit (time)','~after','nach dem Konzert'],
 ['von','~Ort (place)','~from','von der Universität, von dort'],['von','~Täter (who did it)','~by, from','von dir, von einem Freund'],
 ['zu','~Ort (place)','~to (people, places)','zu Paul, zu Hause (= at home)'],
 ['gegenüber','~Ort (place)','~opposite','dem Hotel gegenüber — comes AFTER the noun']])},
{h:'3. The article after the preposition', html: TBL(['','masculine','feminine','neuter','plural'],[['~definite','mit <b>dem</b> Bus','mit <b>der</b> Bahn','mit <b>dem</b> Auto','mit <b>den</b> Kinder<b>n</b>'],['~indefinite','seit <b>einem</b> Monat','seit <b>einer</b> Woche','seit <b>einem</b> Jahr','seit drei Monate<b>n</b>'],['~possessive','bei <b>meinem</b> Bruder','bei <b>meiner</b> Tante','bei <b>meinem</b> Kind','bei <b>meinen</b> Eltern']])+
 TIP('Same endings as in 6.1: <b>-em</b> (m, n) · <b>-er</b> (f) · <b>-en</b> + noun-<b>n</b> (plural).')},
{h:'4. Short forms: beim, vom, zum, zur', html: TBL(['Short form','Long form','Example'],[['<b>beim</b>','bei dem','Ich bin beim Arzt.'],['<b>vom</b>','von dem','Ich hole dich vom Flughafen ab.'],['<b>zum</b>','zu dem','Ich bringe dich zum Bahnhof.'],['<b>zur</b>','zu der','Ich gehe zur Post.']])+
 EX('Ich bringe dich zum Bahnhof.','I\'ll take you to the station.')+EX('Wir holen unsere Tante vom Bahnhof ab.','We pick our aunt up from the station.')},
{h:'5. nach or zu? · aus or von?', html: TBL(['Use','Example'],[['<b>nach</b> + city / country (no article)','nach Köln, nach Italien, nach Hause (home)'],['<b>zu</b> + person / place with article','zu Paul, zum Bahnhof, zur Post · zu Hause = at home'],['<b>aus</b> = out of / origin','aus Spanien, aus dem Schrank, aus Glas'],['<b>von</b> = from (starting point / person)','von der Post, von Julia, von einem Freund']])+
 EX('Ich gehe nach Hause.','I am going home.')+EX('Ich bin zu Hause.','I am at home.')},
{h:'6. With pronouns', html: EX('Gehst du zu Klaus? – Nein, ich gehe nicht zu ihm.','Are you going to Klaus? – No, I am not going to him.')+EX('Kommst du von Julia? – Nein, ich komme nicht von ihr.','Are you coming from Julia? – No, I am not coming from her.')+EX('Wohnst du bei deinen Eltern? – Nein, ich wohne nicht bei ihnen.','Do you live with your parents? – No, I don\'t live with them.')+
 TIP('After a dative preposition the pronoun is dative too: mit <b>mir</b>, zu <b>dir</b>, von <b>ihm</b>, bei <b>ihr</b>, mit <b>uns</b>, zu <b>euch</b>, bei <b>ihnen</b>.')}
],
vocab:[
 {de:'aus', en:'from, out of, made of (+ Dativ)'},{de:'bei', en:'at, near, at someone\'s place (+ Dativ)'},{de:'mit', en:'with, by (+ Dativ)'},{de:'nach', en:'to (cities, countries), after (+ Dativ)'},
 {de:'seit', en:'since, for (time) (+ Dativ)'},{de:'von', en:'from, by (+ Dativ)'},{de:'zu', en:'to (people, places) (+ Dativ)'},{de:'gegenüber', en:'opposite (+ Dativ, after the noun)'},
 {de:'Messer', g:'n', pl:'Messer', en:'knife'},{de:'Glas', g:'n', pl:'Gläser', en:'glass'},{de:'Glück', g:'n', en:'luck'},{de:'Konzert', g:'n', pl:'Konzerte', en:'concert'},
 {de:'Taxi', g:'n', pl:'Taxis', en:'taxi'},{de:'Paket', g:'n', pl:'Pakete', en:'parcel'},{de:'Post', g:'f', en:'post office'},{de:'Keller', g:'m', pl:'Keller', en:'cellar, basement'},
 {de:'Schrank', g:'m', pl:'Schränke', en:'cupboard, wardrobe'},{de:'Bahnhof', g:'m', pl:'Bahnhöfe', en:'train station'},{de:'Tankstelle', g:'f', pl:'Tankstellen', en:'petrol station'},
 {de:'Parkhaus', g:'n', pl:'Parkhäuser', en:'multi-storey car park'},{de:'Flughafen', g:'m', pl:'Flughäfen', en:'airport'},{de:'Regen', g:'m', en:'rain'},{de:'Geschenk', g:'n', pl:'Geschenke', en:'present, gift'},
 {de:'Sekretärin', g:'f', pl:'Sekretärinnen', en:'secretary (female)'},{de:'abholen', en:'to pick up, to collect'},{de:'spazieren gehen', en:'to go for a walk'}
],
sets:[
 {title:'Übung 1: Ergänzen Sie die Endungen.', d:'S. 27 · dem / der / den · einem / einer', items:[
  f('a) Paul fährt mit d___ Taxi nach Hause.','em','mit + Dativ · das Taxi → dem'),
  f('b) Maria wohnt seit ein___ Jahr in Wien.','em','seit + Dativ · das Jahr → einem'),
  f('c) Ich hole das Paket von d___ Post ab.','er','von + Dativ · die Post → der'),
  f('d) Wann gehst du morgens aus d___ Haus?','em','aus + Dativ · das Haus → dem'),
  f('e) Wohin gehst du nach d___ Essen?','em','nach + Dativ · das Essen → dem'),
  f('f) Hol bitte den Wein aus d___ Keller!','em','aus + Dativ · der Keller → dem'),
  f('g) Peter wohnt bei d___ Eltern.','en','bei + Dativ · die Eltern (plural) → den'),
  f('h) Eva arbeitet seit ein___ Woche in Bonn.','er','seit + Dativ · die Woche → einer'),
  f('i) Klaus nimmt die Jacke aus d___ Schrank.','em','aus + Dativ · der Schrank → dem'),
  f('j) Nach d___ Arbeit besucht er Maria.','er','nach + Dativ · die Arbeit → der'),
  f('k) Das Hotel liegt d___ Bahnhof gegenüber.','em','gegenüber + Dativ (after the noun) · der Bahnhof → dem'),
  f('l) Max wohnte lange bei sein___ Tante.','er','bei + Dativ · seine Tante → seiner')
 ]},
 {title:'Übung 2: Ergänzen Sie eine Präposition mit Dativ.', d:'S. 27 · aus, bei, mit, nach, seit, von, zu, gegenüber', items:[
  f('a) Paul geht ___ dem Hund spazieren.','mit'),
  f('b) Diese Tomaten kommen ___ Spanien.','aus','origin → aus'),
  f('c) Ich wohne ___ drei Monaten in Passau.','seit','time up to now → seit'),
  f('d) Die Tankstelle liegt dem Parkhaus ___.','gegenüber','gegenüber comes after the noun'),
  f('e) Wie viel Geld hast du ___ dir?','bei','Geld bei sich haben = to have money on you'),
  f('f) Kannst du mich ___ Flughafen abholen?','vom','von dem → vom'),
  f('g) Maria will nicht ___ mir in Urlaub fahren.','mit'),
  f('h) Ich bringe dich ___ Bahnhof.','zum','zu dem → zum'),
  f('i) Maria wohnt ___ ihren Eltern.','bei'),
  f('j) Sie fährt ___ dem Taxi nach Hause.','mit','means of transport → mit'),
  f('k) Wir holen unsere Tante ___ Bahnhof ab.','vom','von dem → vom'),
  f('l) Heute Nachmittag gehe ich ___ Klaus.','zu','to a person → zu'),
  f('m) ___ Regen mag ich nicht joggen.','Bei','bei Regen = when it rains'),
  f('n) ___ wem ist das Geschenk?','Von','Von wem? = from whom?')
 ]},
 {title:'Übung 3: Gehst du zu Klaus? – Nein, ich gehe nicht zu ihm.', d:'S. 27 · preposition + dative pronoun', items:[
  f('Gehst du zu Klaus? – Nein, ich gehe nicht ___ ___.',['zu','ihm']),
  f('a) Kommst du von Julia? – Nein, ich komme nicht ___ ___.',['von','ihr']),
  f('b) Telefonierst du mit dem Großvater? – Nein, ich telefoniere nicht ___ ___.',['mit','ihm']),
  f('c) Sprichst du mit der Sekretärin? – Nein, ich spreche nicht ___ ___.',['mit','ihr']),
  f('d) Sind die Blumen von Max? – Nein, sie sind nicht ___ ___.',['von','ihm']),
  f('e) Lernst du mit den Studentinnen? – Nein, ich lerne nicht ___ ___.',['mit','ihnen']),
  f('f) Fährst du zu Frau Berg? – Nein, ich fahre nicht ___ ___.',['zu','ihr']),
  f('g) Wohnst du bei deinen Eltern? – Nein, ich wohne nicht ___ ___.',['bei','ihnen']),
  f('h) Ist das Geschenk von Christian? – Nein, es ist nicht ___ ___.',['von','ihm']),
  o('Nein, ich gehe nicht zu ihm.','No, I am not going to him.'),o('Nein, ich wohne nicht bei ihnen.','No, I don\'t live with them.')
 ]},
 {title:'beim · vom · zum · zur · nach or zu?', d:'short forms and choosing the right word', items:[
  m('Ich gehe ___ Post. (die Post)',['zur','zum','zu die'],'zu der → zur'),m('Ich bin ___ Arzt. (der Arzt)',['beim','bei der','zum'],'bei dem → beim'),
  m('Wir fahren ___ Italien.',['nach','zu','aus'],'countries without article → nach'),m('Ich gehe ___ Hause. (going home)',['nach','zu','bei'],'nach Hause = (going) home'),
  m('Ich bin ___ Hause. (at home)',['zu','nach','bei'],'zu Hause = at home'),m('Die Flasche ist ___ Glas.',['aus','von','mit'],'material → aus'),
  m('Ich fahre ___ dem Bus.',['mit','bei','zu'],'means of transport → mit'),m('Ich lerne Deutsch ___ einem Jahr.',['seit','nach','von'],'from a point in the past until now → seit'),
  f('Ich gehe ___ Bahnhof. (der Bahnhof)','zum'),f('Er kommt ___ Arbeit. (von + die Arbeit)','von der'),f('Wir wohnen ___ Kino gegenüber. (das Kino)','dem')
 ]}
],
drills:['p7-art','p7-prep','p7-pron']
});
})();

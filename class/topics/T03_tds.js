/* Topic 3 — verbs with -t/-d (arbeiten) and -s/-ß/-z (heißen, tanzen), -eln (sammeln) */
TOPICS.push({id:'tds', icon:'🧩', title:'Special endings: arbeiten · heißen · tanzen', d:'du arbeitest, er arbeitet · du heißt, du tanzt · ich sammle', src:'SK1 1.1 Übung 4–5 · Spektrum L1/L2 „Verben mit Besonderheiten“', lessons:['L03'], lessonSets:['L03:0','L03:1'],
gens:['conj-td','ctx','conj-reg'],
learn:[
{h:'Stem ends in -t / -d (or -chn, -ffn, -gn): add an extra e', html: TBL(['Person','arbeiten','reden','unterrichten','öffnen'],[['ich','arbeite','rede','unterrichte','öffne'],['du','arbeit<b>e</b>st','red<b>e</b>st','unterricht<b>e</b>st','öffn<b>e</b>st'],['er / sie / es','arbeit<b>e</b>t','red<b>e</b>t','unterricht<b>e</b>t','öffn<b>e</b>t'],['wir','arbeiten','reden','unterrichten','öffnen'],['ihr','arbeit<b>e</b>t','red<b>e</b>t','unterricht<b>e</b>t','öffn<b>e</b>t'],['sie / Sie','arbeiten','reden','unterrichten','öffnen']])+TIP('arbeit-en, wart-en, bad-en, find-en, red-en, antwort-en, kost-en, rechn-en, bedeut-en, heirat-en, miet-en …')},
{h:'Stem ends in -s / -ss / -ß / -z: du only adds -t', html: TBL(['Person','heißen','tanzen','reisen'],[['ich','heiße','tanze','reise'],['du','heiß<b>t</b>','tanz<b>t</b>','reis<b>t</b>'],['er / sie / es','heißt','tanzt','reist'],['wir','heißen','tanzen','reisen'],['ihr','heißt','tanzt','reist'],['sie / Sie','heißen','tanzen','reisen']])+TIP('So du and er/sie/es look the same: du heißt = er heißt.')},
{h:'Verbs in -eln: ich drops the e', html: TBL(['Person','sammeln','entwickeln'],[['ich','samm<b>le</b>','entwick<b>le</b>'],['du','sammelst','entwickelst'],['er / sie / es','sammelt','entwickelt'],['wir','sammeln','entwickeln'],['ihr','sammelt','entwickelt'],['sie / Sie','sammeln','entwickeln']])+TIP('SK1: bügeln – ich bügle, lächeln – ich lächle, googeln – ich google.')}
],
sets:[
{title:'SK1 1.1 Übung 5: all forms', src:'Aber Hallo! A1, S. 3', shuffle:false, items:[
 "f:a) Ich studier[e]. · Max studier[t]. · Wir studier[en].","f:Eva studier[t]. · Paul und Maria studier[en]. · Ihr studier[t].",
 "f:b) Ihr arbeit[et]. · Lena und Hanna arbeit[en]. · Wir arbeit[en].","f:Du arbeit[est]. · Ich arbeit[e]. · Max arbeit[et].",
 "f:c) Wir reis[en] nach Prag. · Ich reis[e] nach Prag. · Carlos reis[t] nach Prag.","f:Ihr reis[t] nach Prag. · Du reis[t] nach Prag. · Lena und Theo reis[en] nach Prag.",
 "f:d) Thomas und Eva red[en] mit Lena. · Du red[est] mit Lena. · Ich red[e] mit Lena.","f:Hanna red[et] mit Lena. · Ihr red[et] mit Lena. · Wir red[en] mit Lena."
]},
{title:'Spektrum L2: unterrichten, arbeiten, entwickeln, lesen, haben', src:'Spektrum S. 46 „Verben mit Besonderheiten“', items:[
 "f:Frau Keller [unterrichtet] Kinder. {unterrichten}","f:Du [unterrichtest] Deutsch. {unterrichten}","f:Ihr [unterrichtet] Englisch. {unterrichten}",
 "f:Ben [arbeitet] als Kommissar bei der Polizei. {arbeiten}","f:Du [arbeitest] als Ingenieur. {arbeiten}","f:Ich [arbeite] in Bischkek. {arbeiten}",
 "f:Paul [entwickelt] Computerspiele. {entwickeln}","f:Ich [entwickle] Computerspiele. {entwickeln} ## -eln verbs: ich entwick<b>le</b>","f:Du [entwickelst] eine App. {entwickeln}",
 "f:Knut [liest] viele Bücher. {lesen}","f:Ihr [lest] viel. {lesen}","f:Die Schweiz [hat] 8,4 Millionen Einwohner. {haben}","f:Du [hast] viele Besprechungen. {haben}",
 "f:Ich [sammle] Briefmarken. {sammeln}","f:Er [sammelt] Bilder. {sammeln}","f:Was [kostet] der Kaffee? {kosten}","f:Wie [findest] du das Buch? {finden}","f:Er [wartet] auf den Bus. {warten}","f:Er [öffnet] das Fenster. {öffnen}","f:Du [rechnest] gut. {rechnen}",
 "m:du ___ (heißen)|heißt|heißst|heißest","m:du ___ (tanzen)|tanzt|tanzst|tanzest","m:du ___ (reisen)|reist|reisst|reisest","m:er ___ (antworten)|antwortet|antwortt|antworte","m:du ___ (finden)|findest|findst|fintest","m:ihr ___ (reden)|redet|redt|redest"
]},
{title:'Mixed: -t/-d or -s/-z?', items:[
 "f:Wie [heißt] du? – Ich [heiße] Ahsan.","f:Du [tanzt] sehr gut.","f:Was [kostet] das Buch?","f:Ihr [wartet] hier.","f:Er [antwortet] nicht.","f:Du [reist] nach Italien.","f:Er [findet] das interessant.","f:Ihr [arbeitet] zu viel.","f:Du [putzt] das Zimmer. {putzen}","f:Er [sitzt] im Büro. {sitzen}",
 "t:What is your name? (du)|Wie heißt du?","t:You work a lot. (du)|Du arbeitest viel.","t:He is waiting for the bus.|Er wartet auf den Bus.","t:The coffee costs 2 euros.|Der Kaffee kostet 2 Euro.|Der Kaffee kostet zwei Euro.","t:Are you travelling to Spain? (du)|Reist du nach Spanien?"
]}
]
});

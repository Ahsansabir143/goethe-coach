/* Irregular verbs (sein, haben, möchten, mögen, wissen, tun) + modal verbs (müssen, können, dürfen, wollen, sollen, möchten) */
(function(){
const f = (q, a, x) => ({t:'fill', q, a:Array.isArray(a)?a:[a], x});
const o = (a, en, x) => ({t:'order', a, en, x});
const m = (q, opts, x) => ({t:'mcq', q, o:opts, a:0, x});
LESSONS.push({
id:'L23', date:'2026-10-27',
title:'Irregular verbs (sein, haben, mögen, wissen, tun) & modal verbs',
topics:['sein · haben · möchten · mögen · wissen · tun','müssen · können · dürfen · wollen · sollen · möchten','ich = er/sie/es (no -t!)','modal in position 2, infinitive at the end'],
summary:'The irregular verbs you must learn by heart and the six modal verbs — their forms, the special rule "ich = er", and the sentence bracket: Ich kann gut Tennis spielen.',
learn:[
{h:'1. sein and haben', html: TBL(['','sein','haben'],[['ich','<b>bin</b>','habe'],['du','<b>bist</b>','<b>hast</b>'],['er, sie, es','<b>ist</b>','<b>hat</b>'],['wir','<b>sind</b>','haben'],['ihr','<b>seid</b>','habt'],['sie, Sie','<b>sind</b>','haben']])+
 EX('Sie ist verheiratet. Sie hat fünf Kinder.','She is married. She has five children.')+TIP('haben: the <b>b</b> disappears in du <b>hast</b>, er <b>hat</b>. sein is completely irregular — learn it as a song: bin – bist – ist – sind – seid – sind.')},
{h:'2. möchten, mögen, wissen, tun', html: TBL(['','„möchten“','mögen','wissen','tun'],[['ich','möchte','<b>mag</b>','<b>weiß</b>','tue'],['du','möchtest','<b>magst</b>','<b>weißt</b>','tust'],['er, sie, es','möcht<b>e</b>','<b>mag</b>','<b>weiß</b>','tut'],['wir','möchten','mögen','wissen','<b>tun</b>'],['ihr','möchtet','mögt','wisst','tut'],['sie, Sie','möchten','mögen','wissen','<b>tun</b>']])+
 EX('Sie mag Italien. Sie möchte Urlaub machen. Aber sie weiß, sie hat kein Geld. Was tut sie jetzt?','She likes Italy. She would like to go on holiday. But she knows she has no money. What does she do now?')+
 TIP('<b>mögen</b> = to like (in general): Ich mag Erdbeeren. · <b>möchten</b> = would like (a wish now): Ich möchte Erdbeeren essen. · <b>wissen</b> = to know a fact: Ich weiß die Antwort. (kennen = to know a person / place) · tun: wir / sie <b>tun</b> (only -n).')},
{h:'3. The six modal verbs', html: TBL(['','müssen<br>~must','können<br>~can','dürfen<br>~may','wollen<br>~want','sollen<br>~should','„möchten“<br>~would like'],[
 ['ich','<b>muss</b>','<b>kann</b>','<b>darf</b>','<b>will</b>','<b>soll</b>','möchte'],['du','musst','kannst','darfst','willst','sollst','möchtest'],['er, sie, es, man','<b>muss</b>','<b>kann</b>','<b>darf</b>','<b>will</b>','<b>soll</b>','<b>möchte</b>'],
 ['wir','müssen','können','dürfen','wollen','sollen','möchten'],['ihr','müsst','könnt','dürft','wollt','sollt','möchtet'],['sie, Sie','müssen','können','dürfen','wollen','sollen','möchten']])+
 TIP('Three rules: ① <b>ich = er/sie/es</b> and they have <b>no ending</b> (ich kann, er kann — not „er kannt“). ② The vowel changes only in the singular: müssen → ich m<b>u</b>ss, können → ich k<b>a</b>nn, dürfen → ich d<b>a</b>rf, wollen → ich w<b>i</b>ll. ③ wir / sie / Sie = the infinitive.')},
{h:'4. Sentence structure with a modal verb', html: TBL(['Position 1','Position 2 (modal)','…','END (infinitive)'],[['Ich','kann','gut Tennis','spielen.'],['Robert','muss','auch am Sonntag','arbeiten.'],['Am Montag','will','ich','einkaufen.'],['—','Darf','ich das Fenster','öffnen?'],['Was','möchtest','du','trinken?']])+
 EX('Eva steigt jetzt ein. → Eva muss jetzt einsteigen.','Eva gets on now. → Eva must get on now. (separable verb joins together again at the end)')+
 TIP('This is the <b>sentence bracket</b> (Satzklammer): the conjugated verb in position 2, the second verb at the very end. Negation: Ich kann heute <b>nicht</b> kommen.')}
],
vocab:[{de:'verheiratet', en:'married'},{de:'Urlaub', g:'m', pl:'Urlaube', en:'holiday'},{de:'tun', en:'to do'},{de:'wissen', en:'to know (a fact)'},{de:'dürfen', en:'may, to be allowed to'},{de:'sollen', en:'should, to be supposed to'},{de:'wollen', en:'to want'},{de:'müssen', en:'must, to have to'},{de:'man', en:'one, you, people (in general)'}],
sets:[
 {title:'sein · haben · möchten · mögen · wissen · tun', d:'learn by heart', items:[
  f('Sie ___ verheiratet. (sein)','ist'),f('Sie ___ fünf Kinder. (haben)','hat'),f('Du ___ müde. (sein)','bist'),f('Ihr ___ aus Pakistan. (sein)','seid'),f('___ du Zeit? (haben)','Hast'),
  f('Sie ___ Italien. (mögen)','mag'),f('Sie ___ Urlaub machen. (möchten)','möchte'),f('Aber sie ___, sie hat kein Geld. (wissen)','weiß'),f('Was ___ sie jetzt? (tun)','tut'),
  f('___ du Pizza? (mögen)','Magst'),f('Wir ___ die Antwort nicht. (wissen)','wissen'),f('Was ___ ihr? (tun)','tut'),f('Ihr ___ Schokolade. (mögen)','mögt'),f('Was ___ du trinken? (möchten)','möchtest'),
  m('Ich ___ Erdbeeren. (in general)',['mag','möchte','weiß'],'mögen = like in general'),m('Ich ___ jetzt Erdbeeren essen. (a wish now)',['möchte','mag','weiß'],'möchten = would like'),m('___ du, wo Paul wohnt?',['Weißt','Kennst','Magst'],'wissen = know a fact'),m('Ich ___ Paul seit 2 Jahren.',['kenne','weiß','wisse'],'kennen = know a person')
 ]},
 {title:'Modal verbs: the forms', d:'müssen, können, dürfen, wollen, sollen, möchten', items:[
  f('Ich ___ heute arbeiten. (müssen)','muss'),f('Er ___ gut Deutsch sprechen. (können)','kann','ich = er: no -t'),f('Hier ___ man nicht rauchen. (dürfen)','darf'),f('Wir ___ nach Berlin fahren. (wollen)','wollen'),
  f('Du ___ mehr lernen. (sollen)','sollst'),f('___ ihr mitkommen? (wollen)','Wollt'),f('Ihr ___ leise sein. (müssen)','müsst'),f('___ du schwimmen? (können)','Kannst'),f('Die Kinder ___ keinen Alkohol trinken. (dürfen)','dürfen'),
  f('Sie (she) ___ einen Kaffee. (möchten)','möchte'),f('Man ___ hier parken. (dürfen)','darf'),f('Ich ___ heute nicht kommen. (können)','kann'),
  m('Er ___ gut kochen.',['kann','kannt','könnt'],'er = ich: kann'),m('Which is correct?',['Ich muss heute arbeiten.','Ich muss arbeiten heute.'],'infinitive at the END')
 ]},
 {title:'Sentence structure with modal verbs', d:'modal in position 2, infinitive at the end', items:[
  o('Ich kann gut Tennis spielen.','I can play tennis well.'),o('Robert muss auch am Sonntag arbeiten.','Robert also has to work on Sunday.'),o('Julia will auch die Tante besuchen.','Julia also wants to visit the aunt.'),
  o('Darf ich das Fenster öffnen?','May I open the window?'),o('Eva muss jetzt einsteigen.','Eva has to get on now.'),o('Wir wollen nicht mitkommen.','We don\'t want to come along.'),
  o('Was möchtest du trinken?','What would you like to drink?'),o('Ich kann heute nicht kommen.','I can\'t come today.'),
  f('Paul arbeitet am Sonntag. → Robert ___ auch am Sonntag ___. (müssen)',['muss','arbeiten']),f('Ihr steht nicht früh auf. → Ihr ___ nicht früh ___. (wollen)',['wollt','aufstehen'],'separable verb joins together at the end')
 ]}
],
drills:['p4-modal','p4-irr']
});
})();

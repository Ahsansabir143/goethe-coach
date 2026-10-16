/* Topic 20 — word bank (Anara's lists). Sets are built from data/wordbank.js */
(function(){
  const W = window.WORDBANK; if(!W) return;
  const art = w => ({m:'der',f:'die',n:'das',pl:'die'})[w.g] || '';
  const full = w => w.g ? art(w)+' '+w.de : w.de;
  const sets = [];
  W.list300.forEach(c=>{
    sets.push({title:`${c.icon||''} 300 nouns · ${c.cat}: write the word`, src:'English → German noun WITH article', items: c.words.map(w=>({t:'tr', en:w.en, h:'with der / die / das', a:[full(w)], x:`<b>${full(w)}</b>${w.pl?' · plural: die '+w.pl:''}`}))});
  });
  W.themes.forEach(c=>{
    const ws = c.words.filter(w=>w.g && w.g!=='pl');
    if(ws.length>=4) sets.push({title:`Themed nouns · ${c.cat}: der, die or das?`, src:'Anara\'s „Nouns“ list', items: ws.map(w=>({t:'mcq', q:`___ ${w.de}  (${w.en})`, o:['der','die','das'], a:['m','f','n'].indexOf(w.g), say:full(w)}))});
  });
  const vl = (list, title) => ({title, src:'Anara\'s verb list', items: list.map(v=>({t:'tr', en:v.en, h:'German infinitive', a:[v.de.replace(/ \(sich\)$/,''), v.de]}))});
  sets.push(vl(W.verbList.weak, 'Weak (regular) verbs: write the verb'), vl(W.verbList.strong, 'Strong (irregular) verbs: write the verb'));
  sets.push({title:'Prepositions', src:'Anara\'s list', items: W.preps.map(p=>({t:'tr', en:p.en, h:'preposition', a:[p.de]}))});
  TOPICS.push({id:'wordbank', icon:'🏦', title:'Word bank: 300 nouns, themes, verbs', d:'Make your vocabulary ACTIVE — write the words, not just recognise them.', src:'Anara\'s lists: 300 nouns · themed nouns · weak/strong verbs · prepositions · adjectives · adverbs', lessons:[],
    gens:['wb-art','wb-mean','wb-spell','wb-pl','verb-mean','verb-type','small'],
    learn:[{h:'Active vs passive vocabulary', html:'<p>Anara: <i>„Active is when you use a word without checking it. In the exam you will write an essay, so it is important to know how the words are written.“</i></p>'+TIP('Do the „write the word“ sets: type the noun WITH der / die / das. Browse all lists on the <a href="#/bank">Word bank</a> page.')}],
    sets});
})();

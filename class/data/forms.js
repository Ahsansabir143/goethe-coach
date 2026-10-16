/* The 3 forms of every German verb in the app ("1st, 2nd, 3rd form"):
     1st = Infinitiv (fahren) · 2nd = Präteritum, er/sie/es form (fuhr) · 3rd = Partizip II with its helper (ist gefahren)
   plus the present-tense vowel change for du and er/sie/es (du fährst, er fährt).
   window.VFORMS('abfahren') → {inf, pre, base, prat, part, aux, kind, du, er, ich, change, sepNote}
   Strong / mixed / modal verbs are listed below; every other verb is built with the weak rules. */
(function(){
// base verb: [Präteritum (er), Partizip II, helper]   (helper 'sein' = ist …, 'haben' = hat …)
const STRONG = {
 backen:['backte','gebacken','haben'], beginnen:['begann','begonnen','haben'], bitten:['bat','gebeten','haben'],
 bleiben:['blieb','geblieben','sein'], braten:['briet','gebraten','haben'], empfehlen:['empfahl','empfohlen','haben'],
 essen:['aß','gegessen','haben'], fahren:['fuhr','gefahren','sein'], fallen:['fiel','gefallen','sein'],
 fangen:['fing','gefangen','haben'], finden:['fand','gefunden','haben'], fliegen:['flog','geflogen','sein'],
 geben:['gab','gegeben','haben'], gehen:['ging','gegangen','sein'], gewinnen:['gewann','gewonnen','haben'],
 halten:['hielt','gehalten','haben'], heißen:['hieß','geheißen','haben'], helfen:['half','geholfen','haben'],
 kommen:['kam','gekommen','sein'], laden:['lud','geladen','haben'], lassen:['ließ','gelassen','haben'],
 laufen:['lief','gelaufen','sein'], lesen:['las','gelesen','haben'], liegen:['lag','gelegen','haben'],
 nehmen:['nahm','genommen','haben'], raten:['riet','geraten','haben'], riechen:['roch','gerochen','haben'],
 rufen:['rief','gerufen','haben'], scheinen:['schien','geschienen','haben'], schlafen:['schlief','geschlafen','haben'],
 schlagen:['schlug','geschlagen','haben'], schließen:['schloss','geschlossen','haben'], schreiben:['schrieb','geschrieben','haben'],
 schwimmen:['schwamm','geschwommen','sein'], sehen:['sah','gesehen','haben'], singen:['sang','gesungen','haben'],
 sitzen:['saß','gesessen','haben'], sprechen:['sprach','gesprochen','haben'], stehen:['stand','gestanden','haben'],
 steigen:['stieg','gestiegen','sein'], tragen:['trug','getragen','haben'], treffen:['traf','getroffen','haben'],
 trinken:['trank','getrunken','haben'], tun:['tat','getan','haben'], waschen:['wusch','gewaschen','haben'],
 weisen:['wies','gewiesen','haben'], ziehen:['zog','gezogen','haben'], vergessen:['vergaß','vergessen','haben'],
 sterben:['starb','gestorben','sein'], werfen:['warf','geworfen','haben'], vergleichen:['verglich','verglichen','haben'],
 schneiden:['schnitt','geschnitten','haben'], streiten:['stritt','gestritten','haben'], leiden:['litt','gelitten','haben'],
 // irregular
 sein:['war','gewesen','sein'], haben:['hatte','gehabt','haben'], werden:['wurde','geworden','sein'],
 // mixed (weak ending -te, but the stem changes)
 bringen:['brachte','gebracht','haben'], denken:['dachte','gedacht','haben'], kennen:['kannte','gekannt','haben'],
 wissen:['wusste','gewusst','haben'], nennen:['nannte','genannt','haben'], rennen:['rannte','gerannt','sein'],
 // modal verbs
 können:['konnte','gekonnt','haben'], dürfen:['durfte','gedurft','haben'], müssen:['musste','gemusst','haben'],
 sollen:['sollte','gesollt','haben'], wollen:['wollte','gewollt','haben'], mögen:['mochte','gemocht','haben'],
 möchten:['wollte','gewollt','haben']
};
const MIXED = new Set(['bringen','denken','kennen','wissen','nennen','rennen']);
const MODAL = new Set(['können','dürfen','müssen','sollen','wollen','mögen','möchten']);
const IRR = new Set(['sein','haben','werden']);
// present tense: du / er forms that change (a→ä, e→i, e→ie, au→äu and irregular)
const PRES = {
 backen:['bäckst','bäckt','a → ä'], braten:['brätst','brät','a → ä'], fahren:['fährst','fährt','a → ä'], fallen:['fällst','fällt','a → ä'],
 fangen:['fängst','fängt','a → ä'], halten:['hältst','hält','a → ä'], laden:['lädst','lädt','a → ä'], lassen:['lässt','lässt','a → ä'],
 raten:['rätst','rät','a → ä'], schlafen:['schläfst','schläft','a → ä'], schlagen:['schlägst','schlägt','a → ä'], tragen:['trägst','trägt','a → ä'],
 waschen:['wäschst','wäscht','a → ä'], laufen:['läufst','läuft','au → äu'],
 essen:['isst','isst','e → i'], geben:['gibst','gibt','e → i'], helfen:['hilfst','hilft','e → i'], nehmen:['nimmst','nimmt','e → i'],
 sprechen:['sprichst','spricht','e → i'], treffen:['triffst','trifft','e → i'], vergessen:['vergisst','vergisst','e → i'],
 sterben:['stirbst','stirbt','e → i'], werfen:['wirfst','wirft','e → i'],
 lesen:['liest','liest','e → ie'], sehen:['siehst','sieht','e → ie'], empfehlen:['empfiehlst','empfiehlt','e → ie'],
 sein:['bist','ist','irregular'], haben:['hast','hat','irregular'], werden:['wirst','wird','irregular'], wissen:['weißt','weiß','irregular'],
 können:['kannst','kann','modal'], dürfen:['darfst','darf','modal'], müssen:['musst','muss','modal'], wollen:['willst','will','modal'],
 mögen:['magst','mag','modal'], sollen:['sollst','soll','modal'], möchten:['möchtest','möchte','modal'], tun:['tust','tut','']
};
const ICH = {sein:'bin', haben:'habe', werden:'werde', wissen:'weiß', können:'kann', dürfen:'darf', müssen:'muss', wollen:'will', mögen:'mag', sollen:'soll', möchten:'möchte', tun:'tue'};
// weak verbs that take „ist“ in the Perfekt
const SEIN_WEAK = new Set(['reisen','wandern','passieren','spazieren','joggen','klettern','segeln','landen','starten','folgen','begegnen','umziehen','aufwachen']);
// separable compounds whose helper differs from the base verb
const AUX_OVR = {aufstehen:'sein', umziehen:'sein', ausziehen:'sein', einziehen:'sein', anziehen:'haben', einschlafen:'sein', aufwachen:'sein', einladen:'haben', anfangen:'haben', aussehen:'haben', fernsehen:'haben', abgeben:'haben', mitnehmen:'haben'};
const SEP = ['zurück','kennen','fern','weh','spazieren','statt','teil','fest','frei','heim','ab','an','auf','aus','ein','mit','vor','zu','um','nach','weg','los','her','hin','bei','dabei','weiter','zusammen'];
const INSEP = ['miss','emp','ent','ver','zer','be','er','ge','über','unter','hinter','wider'];
const KNOWN = new Set(Object.keys(STRONG).concat(['machen','holen','hören','kaufen','räumen','schalten','richten','spülen','schauen','decken','setzen','legen','stellen','fühlen','füllen','klicken','kreuzen','melden','zahlen','suchen','nutzen','tanzen','kochen','lernen','sagen','spielen','wohnen','zeigen','leben','lachen','danken','drucken','drücken','duschen','feiern','fehlen','fragen','freuen','glauben','grillen','heiraten','kosten','kriegen','kümmern','legen','mieten','öffnen','rauchen','regnen','reisen','schicken','schmecken','studieren','telefonieren','warten','wandern','wünschen','arbeiten','antworten','baden','enden','reden','putzen','malen','sammeln','lieben','buchen','zählen','wachen','nachten','teilen','packen','stören','dienen','klären','lauben','zählen','sichtigen','deuten','stellen','kaufen','mieten','dienen','wickeln','suchen','nachten','richten','sehen','tun']));
const lo = s => String(s||'').toLowerCase();
function weakStem(b){ return /en$/.test(b) ? b.slice(0,-2) : b.replace(/n$/,''); }
function needE(stem){ return /([td]|[^aeiouäöülrh][mn])$/.test(stem) && !/(lm|rm|ln|rn|hm|hn|mm|nn)$/.test(stem); }
function split(inf){
  inf = lo(inf).replace(/^sich\s+/,'').replace(/\s*\(sich\)/,'').replace(/^weh tun$/,'wehtun').trim();
  if(STRONG[inf] || /ieren$/.test(inf) && !SEP.some(p=>inf.startsWith(p) && KNOWN.has(inf.slice(p.length)))) return {inf, pre:'', ins:'', base:inf};
  for(const p of SEP){ if(inf.startsWith(p) && inf.length >= p.length+3){ const b = inf.slice(p.length); if(KNOWN.has(b) || STRONG[b]) return {inf, pre:p, ins:'', base:b}; } }
  for(const p of INSEP){ if(inf.startsWith(p) && inf.length > p.length+3){ const b = inf.slice(p.length); if(STRONG[b] || KNOWN.has(b) || b.length >= 5) return {inf, pre:'', ins:p, base:b}; } }
  return {inf, pre:'', ins:'', base:inf};
}
function forms(input){
  const sp = split(input); const {inf, pre, ins, base} = sp;
  let prat, part, aux, kind;
  const st = STRONG[ins ? inf : base] || (ins ? STRONG[base] : null);
  const own = STRONG[inf];
  if(own){ [prat, part, aux] = own; kind = MODAL.has(inf) ? 'modal' : IRR.has(inf) ? 'irregular' : MIXED.has(inf) ? 'mixed' : 'strong'; if(inf === 'vergessen'){ kind = 'strong'; } }
  else if(st && ins){ // bekommen, verstehen, gefallen …: no ge-
    prat = ins + st[0]; part = ins + st[1].replace(/^ge/,''); aux = 'haben'; kind = MIXED.has(base) ? 'mixed' : 'strong';
  } else if(st){ prat = st[0]; part = st[1]; aux = st[2]; kind = MODAL.has(base) ? 'modal' : IRR.has(base) ? 'irregular' : MIXED.has(base) ? 'mixed' : 'strong'; }
  else {
    const b = ins ? base : base; const stem = weakStem(b); const e = needE(stem) ? 'e' : '';
    prat = (ins || '') + stem + e + 'te';
    const noGe = ins || /ieren$/.test(b);
    part = (ins || '') + (noGe ? '' : 'ge') + stem + e + 't';
    aux = SEIN_WEAK.has(b) || SEIN_WEAK.has(inf) ? 'sein' : 'haben'; kind = 'weak';
  }
  if(pre){ part = pre + part; }
  if(AUX_OVR[inf]) aux = AUX_OVR[inf];
  // present tense
  const pr = PRES[ins ? inf : base] || (ins ? PRES[base] && {0:ins+PRES[base][0],1:ins+PRES[base][1],2:PRES[base][2]} : null);
  const stem = weakStem(base); const e = needE(stem) ? 'e' : '';
  let du = (ins||'') + stem + (/[sßzx]$/.test(stem) ? '' : e) + (/[sßzx]$/.test(stem) ? 't' : 'st');
  let er = (ins||'') + stem + e + 't';
  let ich = (ins||'') + (ICH[base] || (/eln$/.test(base) ? base.replace(/eln$/,'le') : /ern$/.test(base) ? base.replace(/rn$/,'re') : stem + 'e'));
  let change = '';
  if(pr){ du = pr[0]; er = pr[1]; change = pr[2]; }
  if(ICH[base] && !ins) ich = ICH[base];
  const sepS = w => pre ? `${w} … ${pre}` : w;
  const IHR = {sein:'seid', haben:'habt', werden:'werdet', wissen:'wisst', tun:'tut', möchten:'möchtet'};
  const ihr = (ins||'') + (IHR[base] || stem + e + 't'); const wir = (ins||'') + (base === 'sein' ? 'sind' : base);
  return {wir: sepS(wir), ihr: sepS(ihr), sie: sepS(wir), inf, pre, ins, base, prat: pre ? `${prat} … ${pre}` : prat, part, aux, kind, change,
    ich: sepS(ich), du: sepS(du), er: sepS(er), helper: aux === 'sein' ? 'ist' : 'hat',
    perfekt: `${aux === 'sein' ? 'ist' : 'hat'} ${part}`};
}
const KIND_EN = {weak:'weak (regular): -te / ge-…-t', strong:'strong: the vowel changes, Partizip ends in -en', mixed:'mixed: stem changes but ending -te / -t', modal:'modal verb', irregular:'irregular'};
window.VFORMS = forms;
window.VKIND = KIND_EN;
window.VSTRONG = STRONG; window.VPRES = PRES;
})();

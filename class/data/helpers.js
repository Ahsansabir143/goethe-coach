/* Small helpers used inside lesson files to write the "Learn" pages quickly.
   EX('German sentence', 'English')         -> example line with 🔊 button
   TBL(['head',…], [[cell,…],…])             -> table. Cells are German (tap-for-meaning) unless they start with "~" (English).
   TIP('text')                               -> yellow tip box
   DE('German text')                         -> inline German (tap-for-meaning)
*/
(function(){
  const key = s => String(s).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
  const strip = s => String(s).replace(/<[^>]+>/g,'').replace(/"/g,'&quot;');
  window.LESSONS = window.LESSONS || [];
  window.TOPICS = window.TOPICS || [];
  // Every example shows German AND English. A missing translation comes from data/translations.js (window.TR);
  // if the lesson wrote a grammar note instead of a translation, the note is shown under the translation.
  window.EX = (de, en) => { const tr = (window.TR||{})[key(de)]; const main = tr || en; const note = tr && en && en !== tr ? en : '';
    return `<div class="ex" translate="no"><span class="de" lang="de">${de}</span> <button class="spk" data-say="${strip(de)}">🔊</button>${main?`<span class="en" lang="en">🇬🇧 ${main}</span>`:''}${note?`<span class="en note">💡 ${note}</span>`:''}</div>`; };
  window.TBL = (head, rows) => `<div class="tw"><table><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr>${rows.map(r=>`<tr>${r.map(c=>{ c = String(c); if(c[0]==='~') return `<td>${c.slice(1)}</td>`; const tr = (window.TR||{})[key(c)]; return `<td class="de">${c}${tr?`<span class="en tdl" lang="en">🇬🇧 ${tr}</span>`:''}</td>`; }).join('')}</tr>`).join('')}</table></div>`;
  window.TIP = html => `<div class="tip">💡 ${html}</div>`;
  window.DE = html => `<span class="de">${html}</span>`;
})();

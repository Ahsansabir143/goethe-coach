/* Small helpers used inside lesson files to write the "Learn" pages quickly.
   EX('German sentence', 'English')         -> example line with 🔊 button
   TBL(['head',…], [[cell,…],…])             -> table. Cells are German (tap-for-meaning) unless they start with "~" (English).
   TIP('text')                               -> yellow tip box
   DE('German text')                         -> inline German (tap-for-meaning)
*/
(function(){
  const strip = s => String(s).replace(/<[^>]+>/g,'').replace(/"/g,'&quot;');
  window.LESSONS = window.LESSONS || [];
  window.TOPICS = window.TOPICS || [];
  window.EX = (de, en) => `<div class="ex"><span class="de">${de}</span> <button class="spk" data-say="${strip(de)}">🔊</button>${en?`<span class="en">${en}</span>`:''}</div>`;
  window.TBL = (head, rows) => `<div class="tw"><table><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr>${rows.map(r=>`<tr>${r.map(c=>{ c = String(c); return c[0]==='~' ? `<td>${c.slice(1)}</td>` : `<td class="de">${c}</td>`; }).join('')}</tr>`).join('')}</table></div>`;
  window.TIP = html => `<div class="tip">💡 ${html}</div>`;
  window.DE = html => `<span class="de">${html}</span>`;
})();

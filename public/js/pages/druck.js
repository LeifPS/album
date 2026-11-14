import { CARD_BY_ID } from '../data.js';
import { SIZES } from '../draw.js';
import { cardURL } from '../card.js';
import * as store from '../store.js';
import { renderPDF } from '../print.js';
import { $, $$, esc, icon, fmtDate } from '../ui.js';

const strip = p => `<div class="strip small">${p.cards.map(id => `<img src="${cardURL(CARD_BY_ID[id])}" alt="">`).join('')}</div>`;
const title = p => `<b>${esc(p.name)}</b> - ${SIZES[p.size].name}, für ${esc(store.profileName(p.profile))}${p.label ? `, ${esc(p.label)}` : ''}`;

let sel = null;        // ausgewählte Pack-IDs (null = alle)
let result = null;     // { url, blob, ids, sheets, pages, name }
let busy = '';

export function pageDruck(main) {
  const st = store.get();
  const queue = st.packs.filter(p => !p.printed);
  const done = st.packs.filter(p => p.printed).sort((a, b) => b.printed - a.printed);
  if (!sel) sel = new Set(queue.map(p => p.id));
  for (const id of [...sel]) if (!queue.some(p => p.id === id)) sel.delete(id);
  const chosen = queue.filter(p => sel.has(p.id));
  const S = st.settings;

  main.innerHTML = `
  <h1>Druck</h1>
  <p class="sub">Packs in der Druckliste. Gedruckte Packs zählen zur Sammlung des Kindes.</p>
  <section class="box"><h3>Druckliste (${queue.length})</h3>
    ${queue.length ? queue.map(p => `
      <div class="pack" data-id="${p.id}">
        <label class="packhead sel"><input type="checkbox" data-sel="${p.id}" ${sel.has(p.id) ? 'checked' : ''}> ${title(p)}</label>${strip(p)}
        <div class="actions"><button class="btn" data-printed="${p.id}">${icon('check', 16)} Als gedruckt markieren</button><button class="btn" data-remove="${p.id}">${icon('trash', 16)} Entfernen</button></div></div>`).join('')
      : '<p class="hint">Die Druckliste ist leer. Zieh zuerst unter <a href="#/packs">Packs</a> einen Pack.</p>'}
    ${queue.length ? `<div class="actions"><button class="btn primary" id="makepdf" ${chosen.length && !busy ? '' : 'disabled'}>${icon('print', 16)} ${busy || `PDF erstellen (${chosen.length} Pack${chosen.length === 1 ? '' : 's'})`}</button></div>
    <p class="hint">${S.duplex ? (S.backFirst !== false ? 'Beidseitig: Seite 1 Rückseite, Seite 2 Vorderseite (Karten).' : 'Beidseitig: Seite 1 Vorderseite, Seite 2 Rückseite.') + ' Im Druckdialog "Beidseitig" einschalten und Größe auf 100 % lassen.' : 'Nur Vorderseite (Beidseitig ist in den Einstellungen aus).'}
      Zwei kleine Packs teilen sich ein Blatt.</p>` : ''}
    ${result ? `<div class="note"><b>PDF fertig:</b> ${result.sheets} Blatt, ${result.pages} Seiten, ${(result.blob.size / 1048576).toFixed(1)} MB.
      <div class="actions"><button class="btn primary" id="open">PDF öffnen</button><button class="btn" id="share">Teilen oder speichern</button>
      <button class="btn" id="markall">${icon('check', 16)} Gedruckt - ${result.ids.length} Pack${result.ids.length === 1 ? '' : 's'} eintragen</button></div></div>` : ''}
  </section>
  <section class="box"><h3>Verlauf (${done.length})</h3>
    ${done.length ? done.map(p => `
      <div class="pack" data-id="${p.id}"><div class="packhead">${title(p)} <span class="dim">- gedruckt ${fmtDate(p.printed)}</span></div>${strip(p)}
        <div class="actions"><button class="btn" data-undo="${p.id}">Zurück in die Druckliste</button><button class="btn" data-remove="${p.id}">${icon('trash', 16)} Löschen</button></div></div>`).join('')
      : '<p class="hint">Noch nichts gedruckt.</p>'}
  </section>`;

  $$('[data-sel]', main).forEach(c => c.onchange = () => { c.checked ? sel.add(c.dataset.sel) : sel.delete(c.dataset.sel); pageDruck(main); });
  $$('[data-printed]', main).forEach(b => b.onclick = () => { store.update(s => { s.packs.find(p => p.id === b.dataset.printed).printed = Date.now(); }); pageDruck(main); });
  $$('[data-undo]', main).forEach(b => b.onclick = () => { store.update(s => { s.packs.find(p => p.id === b.dataset.undo).printed = null; }); sel = null; pageDruck(main); });
  $$('[data-remove]', main).forEach(b => b.onclick = () => {
    if (!confirm('Diesen Pack wirklich löschen?')) return;
    store.update(s => { s.packs = s.packs.filter(p => p.id !== b.dataset.remove); });
    pageDruck(main);
  });

  const mk = $('#makepdf', main);
  if (mk) mk.onclick = async () => {
    if (result) URL.revokeObjectURL(result.url);
    result = null;
    try {
      busy = 'Erstelle PDF ...'; pageDruck(main);
      const packs = chosen.map(p => ({ ...p, profileName: store.profileName(p.profile) }));
      const r = await renderPDF(packs, store.get().settings, (d, t) => { const b = $('#makepdf'); if (b) b.lastChild.textContent = ` Seite ${d} von ${t} ...`; });
      const blob = new Blob([r.bytes], { type: 'application/pdf' });
      result = { url: URL.createObjectURL(blob), blob, ids: chosen.map(p => p.id), sheets: r.sheets, pages: r.pages };
    } catch (e) {
      console.error(e);
      alert('PDF konnte nicht erstellt werden: ' + e.message);
    }
    busy = '';
    pageDruck(main);
  };
  if (result) {
    $('#open', main).onclick = () => window.open(result.url, '_blank');
    $('#share', main).onclick = async () => {
      const file = new File([result.blob], 'album-packs.pdf', { type: 'application/pdf' });
      try {
        if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: 'Album-Packs' }); return; }
      } catch (e) { if (e.name === 'AbortError') return; }
      const a = document.createElement('a'); a.href = result.url; a.download = 'album-packs.pdf'; a.click();
    };
    $('#markall', main).onclick = () => {
      store.update(s => { for (const p of s.packs) if (result.ids.includes(p.id)) p.printed = Date.now(); });
      URL.revokeObjectURL(result.url); result = null; sel = null; pageDruck(main);
    };
  }
}

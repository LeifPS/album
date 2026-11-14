import { RARITIES, CARD_BY_ID } from '../data.js';
import { SIZES } from '../draw.js';
import { cardURL } from '../card.js';
import * as store from '../store.js';
import { $, $$, esc, icon, fmtDate } from '../ui.js';

const strip = p => `<div class="strip small">${p.cards.map(id => `<img src="${cardURL(CARD_BY_ID[id])}" alt="">`).join('')}</div>`;
const title = p => `<b>${esc(p.name)}</b> - ${SIZES[p.size].name}, für ${esc(store.profileName(p.profile))}${p.label ? `, ${esc(p.label)}` : ''}`;

export function pageDruck(main) {
  const st = store.get();
  const queue = st.packs.filter(p => !p.printed);
  const done = st.packs.filter(p => p.printed).sort((a, b) => b.printed - a.printed);
  main.innerHTML = `
  <h1>Druck</h1>
  <p class="sub">Packs in der Druckliste. Gedruckte Packs zählen zur Sammlung des Kindes.</p>
  <section class="box"><h3>Druckliste (${queue.length})</h3>
    ${queue.length ? queue.map(p => `
      <div class="pack" data-id="${p.id}"><div class="packhead">${title(p)}</div>${strip(p)}
        <div class="actions"><button class="btn" data-printed="${p.id}">${icon('check', 16)} Als gedruckt markieren</button><button class="btn" data-remove="${p.id}">${icon('trash', 16)} Entfernen</button></div></div>`).join('')
      : '<p class="hint">Die Druckliste ist leer. Zieh zuerst unter <a href="#/packs">Packs</a> einen Pack.</p>'}
  </section>
  <section class="box"><h3>Verlauf (${done.length})</h3>
    ${done.length ? done.map(p => `
      <div class="pack" data-id="${p.id}"><div class="packhead">${title(p)} <span class="dim">- gedruckt ${fmtDate(p.printed)}</span></div>${strip(p)}
        <div class="actions"><button class="btn" data-undo="${p.id}">Zurück in die Druckliste</button><button class="btn" data-remove="${p.id}">${icon('trash', 16)} Löschen</button></div></div>`).join('')
      : '<p class="hint">Noch nichts gedruckt.</p>'}
  </section>`;

  $$('[data-printed]', main).forEach(b => b.onclick = () => { store.update(s => { s.packs.find(p => p.id === b.dataset.printed).printed = Date.now(); }); pageDruck(main); });
  $$('[data-undo]', main).forEach(b => b.onclick = () => { store.update(s => { s.packs.find(p => p.id === b.dataset.undo).printed = null; }); pageDruck(main); });
  $$('[data-remove]', main).forEach(b => b.onclick = () => {
    if (!confirm('Diesen Pack wirklich löschen?')) return;
    store.update(s => { s.packs = s.packs.filter(p => p.id !== b.dataset.remove); });
    pageDruck(main);
  });
}

import { RARITIES, ALBUMS, CARD_BY_ID } from '../data.js';
import { drawPack, SIZES, BUILTIN_PRESETS, guarantees } from '../draw.js';
import { cardURL } from '../card.js';
import * as store from '../store.js';
import { $, $$, esc, icon, raritySymbol } from '../ui.js';

let cfg = { rarity: 0, size: 'klein', albums: null, count: 1, label: '', presetName: '' };
let drawn = [];     // noch nicht übernommene Ergebnisse
let note = '';

const allPresets = () => [...BUILTIN_PRESETS, ...store.get().presets.map(p => ({ ...p, own: true }))];

function packName() {
  return cfg.presetName || `${RARITIES[cfg.rarity].name}-Pack`;
}

function hint() {
  const g = guarantees(cfg.rarity, cfg.size);
  const n = SIZES[cfg.size].count;
  return `${n} Karten, ${SIZES[cfg.size].hint}.` + (g ? ` Mindestens ${g} Karte${g > 1 ? 'n' : ''} ab ${RARITIES[cfg.rarity].name}.` : ' Keine Garantie, meist Gewöhnlich und Ungewöhnlich.');
}

function render(main) {
  const st = store.get();
  const profile = st.ui.profile;
  const albumsSel = cfg.albums;
  main.innerHTML = `
  <h1>Packs</h1>
  <p class="sub">Pack zusammenstellen, ziehen und in die Druckliste legen.</p>

  <section class="box"><h3>Für wen</h3>
    <div class="chips">${st.profiles.map(p => `<button class="chip ${p.id === profile ? 'on' : ''}" data-profile="${p.id}">${esc(p.name)}</button>`).join('')}</div></section>

  <section class="box"><h3>Vorlagen</h3>
    <div class="chips">${allPresets().map(p => `<span class="chip ${cfg.presetName === p.name ? 'on' : ''}" data-preset="${p.id}">${esc(p.name)}${p.own ? `<button class="x" data-delpreset="${p.id}" aria-label="Vorlage löschen">${icon('close', 14)}</button>` : ''}</span>`).join('')}</div></section>

  <section class="box"><h3>Seltenheit des Packs</h3>
    <div class="chips">${RARITIES.map(r => `<button class="chip ${cfg.rarity === r.id ? 'on' : ''}" data-rarity="${r.id}">${raritySymbol(r.id, 20)} ${r.name}</button>`).join('')}</div>
    <h3>Größe</h3>
    <div class="chips">${Object.values(SIZES).map(s => `<button class="chip ${cfg.size === s.id ? 'on' : ''}" data-size="${s.id}">${s.name} - ${s.count} Karten (${s.hint})</button>`).join('')}</div>
    <p class="hint">${hint()}</p>
    <h3>Alben</h3>
    <div class="chips"><button class="chip ${!albumsSel ? 'on' : ''}" data-album="*">Alle</button>${ALBUMS.map(a => `<button class="chip ${albumsSel && albumsSel.includes(a.id) ? 'on' : ''}" data-album="${a.id}">${a.name}</button>`).join('')}</div>
    <div class="row">
      <label>Anzahl Packs <span class="stepper"><button data-cnt="-1" aria-label="Weniger">${icon('minus', 16)}</button><b>${cfg.count}</b><button data-cnt="1" aria-label="Mehr">${icon('plus', 16)}</button></span></label>
      <label class="grow">Beschriftung (optional) <input id="label" type="text" maxlength="40" placeholder="z. B. Geburtstag" value="${esc(cfg.label)}"></label>
    </div>
    <div class="actions"><button class="btn primary" id="draw">Ziehen</button><button class="btn" id="savepreset">Als Vorlage speichern</button></div>
  </section>
  ${note ? `<p class="note">${note}</p>` : ''}
  ${drawn.map((d, i) => `
    <section class="box pack" data-pack="${i}">
      <div class="packhead"><b>${esc(d.name)}</b> - ${SIZES[d.size].name}, für ${esc(store.profileName(d.profile))}${d.label ? `, ${esc(d.label)}` : ''}</div>
      <div class="strip">${d.cards.map(id => `<img src="${cardURL(CARD_BY_ID[id])}" alt="">`).join('')}</div>
      <div class="actions"><button class="btn primary" data-add="${i}">${icon('plus', 16)} In die Druckliste</button><button class="btn" data-discard="${i}">${icon('close', 16)} Verwerfen</button></div>
    </section>`).join('')}
  ${drawn.length > 1 ? `<div class="actions"><button class="btn primary" id="addall">Alle ${drawn.length} in die Druckliste</button></div>` : ''}`;
  bind(main);
}

function bind(main) {
  $$('[data-profile]', main).forEach(b => b.onclick = () => { store.update(s => { s.ui.profile = b.dataset.profile; }); render(main); });
  $$('[data-preset]', main).forEach(el => el.onclick = e => {
    if (e.target.closest('[data-delpreset]')) return;
    const p = allPresets().find(x => x.id === el.dataset.preset);
    cfg = { ...cfg, rarity: p.rarity, size: p.size, albums: p.albums ? [...p.albums] : null, presetName: p.name };
    render(main);
  });
  $$('[data-delpreset]', main).forEach(b => b.onclick = e => {
    e.stopPropagation();
    store.update(s => { s.presets = s.presets.filter(p => p.id !== b.dataset.delpreset); });
    render(main);
  });
  $$('[data-rarity]', main).forEach(b => b.onclick = () => { cfg.rarity = +b.dataset.rarity; cfg.presetName = ''; render(main); });
  $$('[data-size]', main).forEach(b => b.onclick = () => { cfg.size = b.dataset.size; cfg.presetName = ''; render(main); });
  $$('[data-album]', main).forEach(b => b.onclick = () => {
    const id = b.dataset.album;
    if (id === '*') cfg.albums = null;
    else {
      const cur = cfg.albums ? [...cfg.albums] : [];
      const k = cur.indexOf(id);
      if (k >= 0) cur.splice(k, 1); else cur.push(id);
      cfg.albums = cur.length ? cur : null;
    }
    cfg.presetName = '';
    render(main);
  });
  $$('[data-cnt]', main).forEach(b => b.onclick = () => { cfg.count = Math.min(6, Math.max(1, cfg.count + +b.dataset.cnt)); render(main); });
  $('#label', main).oninput = e => { cfg.label = e.target.value; };

  $('#draw', main).onclick = () => {
    note = '';
    try {
      const profile = store.get().ui.profile;
      drawn = Array.from({ length: cfg.count }, () => ({
        profile, rarity: cfg.rarity, size: cfg.size, name: packName(), label: cfg.label.trim(),
        cards: drawPack({ rarity: cfg.rarity, size: cfg.size, albums: cfg.albums }),
      }));
    } catch (e) { note = esc(e.message); drawn = []; }
    render(main);
  };
  $('#savepreset', main).onclick = () => {
    const name = (prompt('Name der Vorlage?') || '').trim();
    if (!name) return;
    store.update(s => { s.presets.push({ id: store.uid(), name, rarity: cfg.rarity, size: cfg.size, albums: cfg.albums }); });
    cfg.presetName = name;
    render(main);
  };
  const add = list => {
    store.update(s => { for (const d of list) s.packs.push({ id: store.uid(), ts: Date.now(), printed: null, ...d }); });
    note = `${list.length === 1 ? 'Pack liegt' : list.length + ' Packs liegen'} in der <a href="#/druck">Druckliste</a>.`;
  };
  $$('[data-add]', main).forEach(b => b.onclick = () => { const i = +b.dataset.add; add([drawn[i]]); drawn.splice(i, 1); render(main); });
  $$('[data-discard]', main).forEach(b => b.onclick = () => { drawn.splice(+b.dataset.discard, 1); render(main); });
  const all = $('#addall', main);
  if (all) all.onclick = () => { add(drawn); drawn = []; render(main); };
}

export function pagePacks(main) { render(main); }

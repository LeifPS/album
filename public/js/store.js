// Spielstand im Browser (localStorage) mit Export/Import als Sicherung.
const KEY = 'album.v1';

const fresh = () => ({
  v: 1,
  profiles: [
    { id: 'leif', name: 'Leif' },
    { id: 'erik', name: 'Erik' },
    { id: 'thore', name: 'Thore' },
  ],
  packs: [],      // { id, ts, profile, rarity, size, name, label, cards:[ids], printed: null|timestamp }
  presets: [],    // eigene Vorlagen { id, name, rarity, size, albums }
  settings: { duplex: true, backFirst: true, flip: 'long', offsetX: 0, offsetY: 0 },
  ui: { profile: 'erik' },
});

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && s.v === 1) {
      const f = fresh();
      return { ...f, ...s, settings: { ...f.settings, ...(s.settings || {}) }, ui: { ...f.ui, ...(s.ui || {}) } };
    }
  } catch (e) { /* ignorieren */ }
  return fresh();
}

let state = load();
export const get = () => state;
export function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { console.warn('Speichern fehlgeschlagen', e); }
}
export function update(fn) { fn(state); save(); }

export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
export const profileName = id => (state.profiles.find(p => p.id === id) || { name: id }).name;

// Nur gedruckte Packs zählen zur Sammlung
export function collection(profileId) {
  const m = {};
  for (const p of state.packs) {
    if (p.profile !== profileId || !p.printed) continue;
    for (const c of p.cards) m[c] = (m[c] || 0) + 1;
  }
  return m;
}

export function exportJSON() { return JSON.stringify(state, null, 1); }

export function importJSON(text) {
  const s = JSON.parse(text);
  if (!s || s.v !== 1 || !Array.isArray(s.packs) || !Array.isArray(s.profiles)) throw new Error('Das ist keine gültige Sicherung.');
  state = { ...fresh(), ...s };
  save();
}

export function reset() { state = fresh(); save(); }

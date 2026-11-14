// Pack-Ziehung: gewichtet nach Pack-Seltenheit, ohne doppelte Karten innerhalb eines Packs.
import { ALL_CARDS } from './data.js';

export const SIZES = {
  klein: { id: 'klein', name: 'Klein', count: 4, hint: 'halbe Seite' },
  jumbo: { id: 'jumbo', name: 'Jumbo', count: 8, hint: 'ganze Seite' },
};

// Zeile = Pack-Seltenheit, Spalte = Karten-Seltenheit (Gewöhnlich ... Exotisch), Gewichte in Prozentpunkten.
export const WEIGHTS = [
  [62, 26, 9, 2.5, 0.5, 0, 0],
  [40, 34, 17, 7, 2, 0, 0],
  [22, 28, 28, 15, 6, 1, 0],
  [10, 18, 26, 28, 14, 4, 0],
  [4, 10, 18, 26, 26, 14, 2],
  [1, 4, 10, 20, 28, 29, 8],
  [0, 2, 6, 14, 24, 34, 20],
];

// Garantierte Karten mit mindestens der Pack-Seltenheit
export function guarantees(rarity, size) {
  if (rarity === 0) return 0;
  return size === 'jumbo' && rarity >= 2 ? 2 : 1;
}

export function secureRand() {
  const a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return a[0] / 4294967296;
}

function pickCard(cands, W, rand) {
  const rs = [...new Set(cands.map(c => c.rarity))];
  const tot = rs.reduce((s, r) => s + W[r], 0);
  if (tot <= 0) return cands[Math.floor(rand() * cands.length)];
  let x = rand() * tot, r = rs[rs.length - 1];
  for (const k of rs) { x -= W[k]; if (x < 0) { r = k; break; } }
  const list = cands.filter(c => c.rarity === r);
  return list[Math.floor(rand() * list.length)];
}

// cfg: { rarity: 0..6, size: 'klein'|'jumbo', albums: null | [albumIds] }  ->  [cardIds], schwächste zuerst
export function drawPack(cfg, rand = secureRand) {
  const count = SIZES[cfg.size].count;
  let pool = ALL_CARDS.filter(c => !cfg.albums || cfg.albums.includes(c.album));
  if (pool.length < count) throw new Error('Zu wenige Karten in den gewählten Alben');
  const W = WEIGHTS[cfg.rarity];
  const picked = [];
  const take = c => { picked.push(c); pool = pool.filter(x => x !== c); };

  for (let i = 0; i < guarantees(cfg.rarity, cfg.size); i++) {
    let cand = pool.filter(c => c.rarity >= cfg.rarity);
    if (!cand.length) {
      const mx = Math.max(...pool.map(c => c.rarity));
      cand = pool.filter(c => c.rarity === mx);
    }
    take(pickCard(cand, W, rand));
  }
  while (picked.length < count) take(pickCard(pool, W, rand));

  // mischen, dann stabil nach Seltenheit sortieren (Seltenstes zuletzt)
  for (let i = picked.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [picked[i], picked[j]] = [picked[j], picked[i]];
  }
  picked.sort((a, b) => a.rarity - b.rarity);
  return picked.map(c => c.id);
}

export const BUILTIN_PRESETS = [
  { id: 'alltag', name: 'Alltag', rarity: 0, size: 'klein', albums: null },
  { id: 'belohnung', name: 'Belohnung', rarity: 2, size: 'klein', albums: null },
  { id: 'wochenende', name: 'Wochenende', rarity: 1, size: 'jumbo', albums: null },
  { id: 'sammler', name: 'Sammler', rarity: 3, size: 'jumbo', albums: null },
  { id: 'geburtstag', name: 'Geburtstag', rarity: 4, size: 'jumbo', albums: null },
  { id: 'glueck', name: 'Glückspack', rarity: 6, size: 'klein', albums: null },
];

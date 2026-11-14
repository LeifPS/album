// Kleine UI-Helfer. Im ganzen Spiel keine Emojis oder Textsymbole: Pfeile & Co. sind gezeichnete SVGs.
import { RARITIES } from './data.js';
import { rarityShape } from './icons.js';

export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const ICONS = {
  arrowLeft: 'M19 12H5 M11 6l-6 6 6 6',
  chevL: 'M15 5l-7 7 7 7',
  chevR: 'M9 5l7 7-7 7',
  close: 'M6 6l12 12 M18 6L6 18',
  plus: 'M12 5v14 M5 12h14',
  minus: 'M5 12h14',
  trash: 'M5 7h14 M9 7V4h6v3 M7 7l1 13h8l1-13',
  print: 'M7 9V4h10v5 M7 17H4v-7h16v7h-3 M7 14h10v6H7z',
  download: 'M12 4v11 M7 11l5 5 5-5 M5 20h14',
  upload: 'M12 16V5 M7 9l5-5 5 5 M5 20h14',
  check: 'M5 13l4 4 10-11',
};
export const icon = (n, size = 18) =>
  `<svg class="ic" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="${ICONS[n]}"/></svg>`;

export function raritySymbol(r, size = 22) {
  const stops = RARITIES[r].stops.map((c, i, a) => `<stop offset="${(i / (a.length - 1)).toFixed(3)}" stop-color="${c}"/>`).join('');
  const dir = r >= 4 ? 'x1="0" y1="0" x2="1" y2="1"' : 'x1="0" y1="0" x2="0" y2="1"';
  return `<svg class="rs" viewBox="0 0 100 100" width="${size}" height="${size}"><defs><linearGradient id="fr${r}" ${dir}>${stops}</linearGradient></defs>${rarityShape(r, `url(#fr${r})`)}</svg>`;
}

export const fmtDate = ts => new Date(ts).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

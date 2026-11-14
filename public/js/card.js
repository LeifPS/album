// Zeichnet eine Karte komplett als SVG (45 x 70 mm = 450 x 700 Einheiten).
// Rahmen nach Seltenheit, Bild, Name, Seltenheits- und Album-Symbol. Alles selbst gezeichnet.
import { RARITIES, ALBUM_BY_ID } from './data.js';
import { artFor } from './art/index.js';
import { ALBUM_ICONS, rarityShape } from './icons.js';
import { K } from './art/helpers.js';

export const CARD_W = 450, CARD_H = 700;      // Einheiten (10 pro mm)
export const BLEED = 15;                       // 1,5 mm Anschnitt

const FONT = "'Arial Narrow','Helvetica Neue','Liberation Sans Narrow','DejaVu Sans Condensed',Arial,sans-serif";

function gradients(card) {
  const r = card.rarity;
  const stops = RARITIES[r].stops.map((c, i, a) => `<stop offset="${(i / (a.length - 1)).toFixed(3)}" stop-color="${c}"/>`).join('');
  const dir = r >= 4 ? 'x1="0" y1="0" x2="1" y2="1"' : 'x1="0" y1="0" x2="0" y2="1"';
  const al = ALBUM_BY_ID[card.album];
  return `<linearGradient id="fr${r}" ${dir}>${stops}</linearGradient>` +
    `<linearGradient id="bg-${al.id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${al.bg[0]}"/><stop offset="1" stop-color="${al.bg[1]}"/></linearGradient>` +
    `<radialGradient id="vig" cx="50%" cy="45%" r="75%"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient>`;
}

function rays(cx, cy, n) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const a0 = (i * 2 * Math.PI) / n, a1 = a0 + Math.PI / n, R = 400;
    s += `<polygon points="${cx},${cy} ${(cx + R * Math.cos(a0)).toFixed(1)},${(cy + R * Math.sin(a0)).toFixed(1)} ${(cx + R * Math.cos(a1)).toFixed(1)},${(cy + R * Math.sin(a1)).toFixed(1)}"/>`;
  }
  return `<g fill="#fff" opacity=".08">${s}</g>`;
}

// Name auf 1-2 Zeilen verteilen
function nameLines(name) {
  const t = name.toUpperCase();
  const MAXW = 372;
  const one = Math.min(54, MAXW / (t.length * 0.6));
  if (t.length <= 11 || !t.includes(' ')) return [{ text: t, fs: one, y: 612 }];
  // an der Leerstelle teilen, die die Zeilen am gleichmäßigsten macht
  const words = t.split(' ');
  let best = null;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(' '), b = words.slice(i).join(' ');
    const m = Math.max(a.length, b.length);
    if (!best || m < best.m) best = { a, b, m };
  }
  const fs = Math.min(46, MAXW / (best.m * 0.6));
  return [{ text: best.a, fs, y: 594 }, { text: best.b, fs, y: 594 + fs * 1.05 }];
}

export function cardSVG(card, { bleed = false, round = true, px = null } = {}) {
  const al = ALBUM_BY_ID[card.album];
  const r = card.rarity;
  const b = bleed ? BLEED : 0;
  const vb = `${-b} ${-b} ${CARD_W + 2 * b} ${CARD_H + 2 * b}`;
  const art = artFor(card);
  const motif = art
    ? `<g transform="translate(100 130) scale(1.1) translate(-100 -128)" stroke="${K}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round">${art}</g>`
    : `<g opacity=".35" transform="translate(40 78) scale(1.2)">${ALBUM_ICONS[al.id]({ fill: '#fff', dark: 'none' })}</g>`;

  const lines = nameLines(card.name).map(l =>
    `<text x="225" y="${l.y.toFixed(1)}" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="${l.fs.toFixed(1)}" fill="#fff" stroke="${K}" stroke-width="${(l.fs * 0.12).toFixed(1)}" paint-order="stroke" textLength="${(l.text.length * l.fs * 0.6).toFixed(1)}" lengthAdjust="spacingAndGlyphs">${l.text.replace(/&/g, '&amp;')}</text>`).join('');

  const body = `
<defs>${gradients(card)}
<clipPath id="win"><rect x="18" y="18" width="414" height="500" rx="8"/></clipPath>
<clipPath id="outer"><rect width="450" height="700" rx="30"/></clipPath></defs>
<g ${round && !bleed ? 'clip-path="url(#outer)"' : ''}>
<rect x="${-b}" y="${-b}" width="${CARD_W + 2 * b}" height="${CARD_H + 2 * b}" fill="url(#fr${r})"/>
<rect x="12" y="12" width="426" height="676" rx="14" fill="#101522" stroke="${K}" stroke-width="3"/>
<g clip-path="url(#win)">
<svg x="18" y="18" width="414" height="500" viewBox="0 0 200 256" preserveAspectRatio="xMidYMid slice">
<rect width="200" height="256" fill="url(#bg-${al.id})"/>
${rays(100, 150, 14)}
<rect width="200" height="256" fill="url(#vig)"/>
${motif}
</svg></g>
<rect x="18" y="18" width="414" height="500" rx="8" fill="none" stroke="${K}" stroke-width="4"/>
<svg x="22" y="22" width="92" height="92" viewBox="0 0 100 100">${rarityShape(r, `url(#fr${r})`)}</svg>
<svg x="22" y="112" width="92" height="92" viewBox="0 0 100 100"><g stroke="${K}" stroke-width="12" stroke-linejoin="round" stroke-linecap="round">${ALBUM_ICONS[al.id]({ fill: K, dark: K })}</g>${ALBUM_ICONS[al.id]({ fill: '#fff', dark: al.bg[1] })}</svg>
<rect x="18" y="530" width="414" height="152" rx="8" fill="#0f1424" stroke="${K}" stroke-width="3"/>
<rect x="18" y="530" width="414" height="9" fill="url(#fr${r})"/>
<rect x="18" y="673" width="414" height="9" fill="url(#fr${r})"/>
${lines}
</g>`;
  const ww = CARD_W + 2 * b, hh = CARD_H + 2 * b;
  const wAttr = px ? px : ww, hAttr = px ? Math.round(px * hh / ww) : hh;   // px: feste Pixelgröße (für den Druck)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${wAttr}" height="${hAttr}">${body}</svg>`;
}

const cache = new Map();
export function cardURL(card, opts = {}) {
  const key = card.id + (opts.bleed ? ':b' : '') + (opts.round === false ? ':s' : '');
  if (!cache.has(key)) cache.set(key, 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(cardSVG(card, opts)));
  return cache.get(key);
}

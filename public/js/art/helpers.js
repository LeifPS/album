// Kleine Zeichen-Helfer für alle Kartenmotive.
// Koordinatensystem jedes Motivs: 200 x 256, Mitte ca. (100,128).
// Alle Formen bekommen die dunkle Umrandung automatisch (siehe card.js).

export const K = '#1d1b2e';

export const Co = {
  red: '#e8473b', orange: '#ff9b3d', yellow: '#ffd43b', green: '#3fb15a', teal: '#2cb5b0',
  blue: '#3c82da', navy: '#1f2c52', purple: '#8e5bd0', pink: '#f2799f', brown: '#9a5b32',
  wood: '#c98b4e', skin: '#f6c8a2', gray: '#9aa3b2', lgray: '#dbe0ea', dgray: '#586174',
  white: '#fffdf5', sky: '#9fd8f5', gold: '#f2c230',
};

export const NO = 'stroke="none"';
const a = x => (x ? ' ' + x : '');

export const R = (x, y, w, h, fill, rx = 0, ex) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}"${rx ? ` rx="${rx}"` : ''} fill="${fill}"${a(ex)}/>`;
export const Ci = (x, y, r, fill, ex) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"${a(ex)}/>`;
export const El = (x, y, rx, ry, fill, ex) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}"${a(ex)}/>`;
export const P = (d, fill = 'none', ex) => `<path d="${d}" fill="${fill}"${a(ex)}/>`;
export const Pg = (pts, fill, ex) => `<polygon points="${pts}" fill="${fill}"${a(ex)}/>`;
export const L = (x1, y1, x2, y2, ex) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"${a(ex)}/>`;
export const G = (inner, tf) => `<g transform="${tf}">${inner}</g>`;
export const HL = (d, o = 0.4) => `<path d="${d}" fill="#fff" opacity="${o}" stroke="none"/>`;
export const SH = (cx, cy, rx, ry = 7) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity=".22" stroke="none"/>`;

// Sternpunkte als String für <polygon>
export function star(cx, cy, R1, r1, n = 5, rot = -90) {
  const pts = [];
  for (let i = 0; i < n * 2; i++) {
    const ang = (rot + (i * 180) / n) * Math.PI / 180;
    const rr = i % 2 ? r1 : R1;
    pts.push(`${(cx + rr * Math.cos(ang)).toFixed(1)},${(cy + rr * Math.sin(ang)).toFixed(1)}`);
  }
  return pts.join(' ');
}

// Dicke Linie mit Umrandung (für Schläuche, Kabel, Riemen)
export const tube = (d, col, w = 8, ex = '') =>
  P(d, 'none', `stroke="${K}" stroke-width="${w + 5}" ${ex}`) + P(d, 'none', `stroke="${col}" stroke-width="${w}" ${ex}`);

// Fünfeck-Punkte
export function pent(cx, cy, r, rot = -90) { return star(cx, cy, r, r, 5, rot).split(' ').filter((_, i) => i % 2 === 0).join(' '); }

// Spirale als Pfad (Mittelpunkt cx,cy; Radius r0..r1; Umdrehungen)
export function spiral(cx, cy, r0, r1, turns, rot = 0, steps = 60) {
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const t = i / steps, a = rot + t * turns * 2 * Math.PI, r = r0 + (r1 - r0) * t;
    d += (i ? 'L' : 'M') + (cx + r * Math.cos(a)).toFixed(1) + ' ' + (cy + r * Math.sin(a)).toFixed(1) + ' ';
  }
  return d;
}

// Zufall mit festem Startwert (damit jede Karte immer gleich aussieht)
export function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

// Handschuh (Finger oben), Mittelpunkt (0,0)
export function glove(fill, cuff, line) {
  const f = (x, h) => R(x, -52 + (44 - h), 11.5, h + 6, fill, 5.5);
  return R(-26, 34, 52, 24, cuff, 5) +
    G(R(-34, -8, 13, 36, fill, 6), 'rotate(-32 -28 20)') +
    f(-24, 40) + f(-12, 48) + f(0, 50) + f(12, 44) +
    R(-26, -12, 52, 50, fill, 10) +
    P('M-14 8 L14 8 M-14 20 L14 20', 'none', `stroke="${line}" stroke-width="3" opacity=".7"`) +
    R(-26, 36, 52, 4, line, 0, 'opacity=".6" stroke="none"');
}

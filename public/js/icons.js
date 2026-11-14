// Selbst gezeichnete Symbole (Koordinaten 0..100): Seltenheiten und Alben.
// Keine Emojis, keine Schriftzeichen-Symbole.
import { star } from './art/helpers.js';

const pent = (cx, cy, r) => star(cx, cy, r, r, 5).split(' ').filter((_, i) => i % 2 === 0).join(' ');

// fill: z.B. 'url(#fr4)' oder eine Farbe
export function rarityShape(r, fill) {
  const f = `fill="${fill}" stroke="#1d1b2e" stroke-width="5" stroke-linejoin="round"`;
  switch (r) {
    case 0: return `<circle cx="50" cy="50" r="26" ${f}/>`;
    case 1: return `<polygon points="50,20 82,76 18,76" ${f}/>`;
    case 2: return `<polygon points="50,14 84,50 50,86 16,50" ${f}/>`;
    case 3: return `<polygon points="${pent(50, 54, 36)}" ${f}/>`;
    case 4: return `<polygon points="${star(50, 53, 40, 17)}" ${f}/>`;
    case 5: return `<polygon points="${star(50, 50, 42, 22, 8, -90)}" ${f}/>` +
      `<circle cx="50" cy="50" r="10" fill="#fff6bd" stroke="#1d1b2e" stroke-width="3"/>`;
    default: return `<path d="M26 20 L74 20 L92 42 L50 88 L8 42Z" ${f}/>` +
      `<path d="M8 42 L92 42 M26 20 L36 42 L50 88 M74 20 L64 42 L50 88 M36 42 L50 20 L64 42" fill="none" stroke="#1d1b2e" stroke-width="3" stroke-linejoin="round" opacity=".85"/>`;
  }
}

const wing = 'M46 54 Q30 38 6 40 Q18 48 14 52 Q28 54 24 60 Q36 62 34 70 Q42 68 46 62Z';

// Album-Symbole: einfarbige Silhouetten (weiß), Details in dunkel
export const ALBUM_ICONS = {
  baecker: d => `<path d="M16 66 Q8 42 28 36 Q50 26 72 36 Q92 42 84 66 Q84 78 74 78 L26 78 Q16 78 16 66Z" fill="${d.fill}"/>` +
    `<path d="M34 42 L40 56 M50 38 L56 54 M66 42 L70 56" stroke="${d.dark}" stroke-width="5" stroke-linecap="round" fill="none"/>`,
  postbote: d => `<rect x="12" y="26" width="76" height="50" rx="7" fill="${d.fill}"/>` +
    `<path d="M14 30 L50 56 L86 30" stroke="${d.dark}" stroke-width="5" fill="none" stroke-linejoin="round"/>`,
  lehrer: d => `<path d="M50 30 Q30 22 10 28 L10 74 Q30 68 50 78 Q70 68 90 74 L90 28 Q70 22 50 30Z" fill="${d.fill}"/>` +
    `<path d="M50 30 L50 78" stroke="${d.dark}" stroke-width="5" fill="none"/>`,
  koch: d => `<circle cx="32" cy="40" r="17" fill="${d.fill}"/><circle cx="50" cy="32" r="19" fill="${d.fill}"/><circle cx="68" cy="40" r="17" fill="${d.fill}"/>` +
    `<rect x="30" y="44" width="40" height="32" rx="4" fill="${d.fill}"/><path d="M30 62 L70 62" stroke="${d.dark}" stroke-width="5"/>`,
  feuerwehr: d => `<path d="M50 10 Q64 30 74 46 Q88 66 72 82 Q60 92 44 88 Q26 82 24 62 Q24 48 36 38 Q36 52 44 54 Q40 32 50 10Z" fill="${d.fill}"/>` +
    `<path d="M50 84 Q38 78 40 66 Q44 58 50 52 Q58 62 60 70 Q60 80 50 84Z" fill="${d.dark}"/>`,
  polizist: d => `<path d="M50 10 L84 22 L82 56 Q78 76 50 92 Q22 76 18 56 L16 22Z" fill="${d.fill}"/>` +
    `<polygon points="${star(50, 50, 20, 8)}" fill="${d.dark}"/>`,
  tierarzt: d => `<ellipse cx="50" cy="66" rx="24" ry="19" fill="${d.fill}"/>` +
    `<circle cx="22" cy="46" r="10" fill="${d.fill}"/><circle cx="40" cy="30" r="10" fill="${d.fill}"/><circle cx="60" cy="30" r="10" fill="${d.fill}"/><circle cx="78" cy="46" r="10" fill="${d.fill}"/>`,
  pilot: d => `<path d="${wing}" fill="${d.fill}"/><path d="${wing}" fill="${d.fill}" transform="translate(100 0) scale(-1 1)"/>` +
    `<circle cx="50" cy="58" r="8" fill="${d.fill}"/><circle cx="50" cy="58" r="3.5" fill="${d.dark}"/>`,
  fussballprofi: d => `<circle cx="50" cy="50" r="38" fill="${d.fill}"/>` +
    `<polygon points="${pent(50, 50, 14)}" fill="${d.dark}"/>` +
    `<path d="M50 36 L50 14 M62 46 L84 40 M58 62 L72 82 M42 62 L28 82 M38 46 L16 40" stroke="${d.dark}" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  arzt: d => `<rect x="36" y="14" width="28" height="72" rx="6" fill="${d.fill}"/><rect x="14" y="36" width="72" height="28" rx="6" fill="${d.fill}"/>`,
  forscher: d => `<path d="M40 12 L60 12 L60 38 L84 80 Q88 90 77 90 L23 90 Q12 90 16 80 L40 38Z" fill="${d.fill}"/>` +
    `<path d="M26 70 L74 70" stroke="${d.dark}" stroke-width="5"/><circle cx="46" cy="80" r="4" fill="${d.dark}"/><circle cx="60" cy="78" r="3" fill="${d.dark}"/>`,
  astronaut: d => `<path d="M50 8 Q70 28 70 58 L70 72 L30 72 L30 58 Q30 28 50 8Z" fill="${d.fill}"/>` +
    `<path d="M30 56 L14 78 L30 72Z M70 56 L86 78 L70 72Z" fill="${d.fill}"/>` +
    `<circle cx="50" cy="42" r="9" fill="${d.dark}"/><path d="M40 76 Q50 98 60 76Z" fill="${d.fill}"/>`,
};

export function albumIconSVG(albumId, { size = 64, fill = '#fff', dark = '#1d1b2e' } = {}) {
  const f = ALBUM_ICONS[albumId];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size}" height="${size}">${f ? f({ fill, dark }) : ''}</svg>`;
}

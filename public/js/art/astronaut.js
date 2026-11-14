import { K, Co, NO, R, Ci, El, P, Pg, L, G, HL, SH, star, tube, rng } from './helpers.js';

const sp = (x, y, s) => `<polygon points="${star(x, y, s, s * 0.3, 4, -90)}" fill="#fff" stroke="#1d1b2e" stroke-width="2.5" stroke-linejoin="round"/>`;
const dot = (x, y, r = 2.5) => Ci(x, y, r, '#fff', NO);
const rocket = (fill, big = 1) => P('M0 -70 Q22 -42 22 -6 L22 36 L-22 36 L-22 -6 Q-22 -42 0 -70Z', fill) + Ci(0, -14, 10, '#6bc4ff', 'stroke-width="3"') + P('M-22 14 L-44 44 L-22 36Z M22 14 L44 44 L22 36Z', '#e8473b') + R(-14, 36, 28, 10, '#586174', 4);
const flame = () => P('M-12 46 Q0 86 12 46Z', '#ff9b3d') + P('M-6 46 Q0 70 6 46Z', Co.yellow, 'stroke="none"');

export default {
  raumanzug() {
    return SH(100, 214, 62) +
      R(40, 98, 22, 74, '#f4f4f4', 10, 'transform="rotate(14 51 135)"') + R(138, 98, 22, 74, '#f4f4f4', 10, 'transform="rotate(-14 149 135)"') +
      R(66, 92, 68, 82, '#f4f4f4', 14) + R(78, 112, 44, 30, '#586174', 6) + Ci(88, 127, 5, Co.red, 'stroke="none"') + Ci(104, 127, 5, '#6bc4ff', 'stroke="none"') + Ci(116, 127, 3, Co.green, 'stroke="none"') +
      R(66, 170, 30, 40, '#f4f4f4', 10) + R(104, 170, 30, 40, '#f4f4f4', 10) + R(62, 202, 38, 12, '#586174', 5) + R(100, 202, 38, 12, '#586174', 5) +
      Ci(100, 68, 32, '#f4f4f4') + Ci(100, 70, 22, '#2a3358') + P('M88 62 Q94 54 104 56', 'none', 'stroke="#fff" stroke-width="5" opacity=".6"') +
      R(56, 154, 88, 8, '#e8473b', 0, NO) + Pg(star(90, 100, 8, 3.2), '#e8473b', 'stroke-width="2"') + Ci(52, 172, 10, '#9aa3b2') + Ci(148, 172, 10, '#9aa3b2');
  },

  astronautenhelm() {
    return SH(100, 212, 70) +
      Ci(100, 118, 70, '#f4f4f4') + R(60, 176, 80, 26, '#9aa3b2', 8) + R(54, 166, 92, 14, '#586174', 5) +
      R(44, 76, 112, 82, '#2a3358', 38) + R(44, 76, 112, 82, 'none', 38, 'stroke-width="5"') +
      P('M60 98 Q70 80 100 80 Q82 88 78 110Z', '#6bc4ff', 'opacity=".85" stroke="none"') + P('M120 140 Q140 128 144 112', 'none', 'stroke="#6bc4ff" stroke-width="4" opacity=".6"') +
      R(32, 100, 14, 30, '#9aa3b2', 5) + R(154, 100, 14, 30, '#9aa3b2', 5) + HL('M42 100 Q44 66 86 52 Q56 66 56 100Z', 0.7) + Ci(68, 166, 4, Co.red, NO);
  },

  sternenkarte() {
    const pts = [[48, 70], [74, 98], [102, 84], [124, 120], [152, 104], [134, 160], [88, 168], [60, 150]];
    let ln = 'M' + pts.map(p => p.join(' ')).join(' L');
    return SH(100, 214, 76) +
      R(20, 38, 160, 170, '#233a7a', 8) + R(28, 46, 144, 154, '#18285a', 4, 'stroke-width="2.5"') +
      P(ln, 'none', 'stroke="#9fb4ff" stroke-width="2.5" stroke-dasharray="6 5"') +
      pts.map(([x, y], i) => `<polygon points="${star(x, y, i % 3 ? 7 : 10, 3.4, 4, -90)}" fill="${i % 2 ? '#fff' : '#ffd43b'}" stroke="#1d1b2e" stroke-width="2" stroke-linejoin="round"/>`).join('') +
      Ci(150, 62, 14, '#f0be1f', 'stroke-width="3"') + Ci(156, 58, 12, '#233a7a', NO) + dot(40, 186) + dot(168, 184) + dot(110, 64, 2) + dot(40, 120, 2);
  },

  rakete() {
    return SH(100, 216, 52) + G(rocket('#f4f4f4') + P('M-22 -6 L22 -6 L22 12 L-22 12Z', '#e8473b', 'stroke="none"') + P('M0 -70 Q22 -42 22 -20 L-22 -20 Q-22 -42 0 -70Z', '#e8473b') + flame() + HL('M-16 -30 L-10 -30 L-10 30 L-16 30Z', 0.6), 'translate(100 112) scale(1.2)');
  },

  satellit() {
    const panel = x => R(x, 112, 54, 36, '#2a62b4', 3) + L(x + 18, 112, x + 18, 148, 'stroke-width="2.5" opacity=".6"') + L(x + 36, 112, x + 36, 148, 'stroke-width="2.5" opacity=".6"') + L(x, 130, x + 54, 130, 'stroke-width="2.5" opacity=".6"');
    return SH(100, 214, 70) +
      G(panel(10) + panel(136) + R(64, 126, 12, 8, '#9aa3b2', 0, NO) + R(124, 126, 12, 8, '#9aa3b2', 0, NO) + R(68, 98, 64, 60, '#f0be1f', 8) + R(68, 98, 64, 14, '#d9a520', 8) + Ci(100, 134, 16, '#c9d1de', 'stroke-width="3"') + Ci(100, 134, 7, '#2a3358') + L(100, 98, 100, 72, 'stroke-width="3"') + Ci(100, 70, 6, Co.red), 'rotate(-14 100 128)') +
      P('M146 46 Q176 56 182 90 M152 62 Q168 68 170 86', 'none', 'stroke="#6bc4ff" stroke-width="4" opacity=".8"') + sp(40, 60, 9);
  },

  raumfaehre() {
    return SH(100, 214, 76) +
      P('M86 46 Q100 24 114 46 L120 150 L80 150Z', '#f4f4f4') + R(76, 118, 48, 62, '#e8473b', 6, 'opacity="0"') +
      G(P('M0 -24 Q16 -14 18 10 L56 78 L-56 78 L-18 10 Q-16 -14 0 -24Z', '#f4f4f4') + P('M-18 10 L-56 78 L-30 78Z M18 10 L56 78 L30 78Z', '#2a2f3c', 'opacity=".9"') + P('M-8 -10 Q0 -18 8 -10 L8 0 L-8 0Z', '#6bc4ff', 'stroke-width="2.5"'), 'translate(100 96) scale(1.1)') +
      R(84, 150, 32, 44, '#d9a520', 6) + R(60, 150, 20, 40, '#e8473b', 6) + R(120, 150, 20, 40, '#e8473b', 6) + P('M84 194 Q100 232 116 194Z', '#ff9b3d') + P('M92 194 Q100 214 108 194Z', Co.yellow, 'stroke="none"');
  },

  raumstation() {
    const panel = (x, y) => R(x, y, 34, 52, '#2a62b4', 3) + L(x + 17, y, x + 17, y + 52, 'stroke-width="2" opacity=".6"') + L(x, y + 26, x + 34, y + 26, 'stroke-width="2" opacity=".6"');
    return SH(100, 216, 76) +
      panel(8, 44) + panel(8, 104) + panel(158, 44) + panel(158, 104) + R(40, 74, 120, 8, '#9aa3b2', 2) + R(40, 126, 120, 8, '#9aa3b2', 2) + R(98, 40, 8, 120, '#9aa3b2', 2, 'opacity="0"') +
      R(50, 62, 100, 86, '#e8edf6', 12) + R(50, 62, 100, 24, '#c9d1de', 12) + R(70, 40, 60, 28, '#f0be1f', 8) + R(70, 140, 60, 28, '#e8edf6', 8) +
      Ci(100, 104, 20, '#2a3358', 'stroke-width="4"') + Ci(94, 98, 6, '#6bc4ff', 'stroke="none" opacity=".7"') + R(58, 106, 20, 10, '#e8473b', 3) + R(122, 106, 20, 10, '#e8473b', 3) + L(100, 40, 100, 24, 'stroke-width="3"') + Ci(100, 22, 5, '#e8473b');
  },

  mondlandung() {
    return SH(100, 222, 0.01) +
      P('M0 196 Q60 168 100 176 Q150 164 200 190 L200 256 L0 256Z', '#c9c4d6') + El(60, 214, 22, 8, '#aaa5bd', 'stroke="none"') + El(150, 226, 28, 9, '#aaa5bd', 'stroke="none"') + Ci(40, 62, 3, '#fff', NO) + Ci(166, 46, 3, '#fff', NO) + Ci(150, 90, 2, '#fff', NO) +
      Ci(158, 66, 24, '#2a62b4', 'stroke-width="3"') + P('M146 54 Q160 52 164 64 Q156 70 150 80 Q142 70 146 54Z', Co.green, 'stroke="none"') + Ci(158, 66, 24, 'none', 'stroke-width="3"') +
      G(P('M-22 -2 L22 -2 L26 24 L-26 24Z', '#d9a520') + P('M-22 -2 Q0 -26 22 -2Z', '#f4f4f4') + Ci(0, -6, 6, '#6bc4ff') + L(-26, 24, -40, 52, 'stroke-width="5"') + L(26, 24, 40, 52, 'stroke-width="5"') + L(0, 24, 0, 52, 'stroke-width="5"') + R(-48, 50, 16, 5, '#9aa3b2', 2) + R(32, 50, 16, 5, '#9aa3b2', 2), 'translate(60 128) scale(1.05)') +
      R(116, 140, 3, 50, '#c9d1de', 0, 'stroke-width="2.5"') + P('M119 142 L152 150 L119 160Z', '#f4f4f4') + Ci(106, 168, 14, '#f4f4f4') + R(98, 176, 16, 24, '#f4f4f4', 6) + Ci(104, 166, 7, '#2a3358');
  },

  mars() {
    return SH(100, 218, 0.01) +
      Ci(100, 126, 76, '#d9663a') + P('M56 92 Q86 70 128 84 Q142 96 120 106 Q84 98 62 116Z', '#b9482a', 'stroke="none" opacity=".75"') + P('M44 150 Q80 140 108 160 Q134 166 150 150 Q146 176 110 186 Q70 180 44 150Z', '#b9482a', 'stroke="none" opacity=".75"') +
      Ci(130, 110, 10, '#b9482a', 'stroke="none"') + Ci(68, 134, 7, '#b9482a', 'stroke="none"') + P('M60 74 Q100 54 140 74 Q112 66 100 66 Q76 68 60 74Z', '#f6f6f6', 'stroke="none" opacity=".85"') +
      Ci(100, 126, 76, 'none', 'stroke-width="4"') + HL('M46 96 Q54 62 96 54 Q62 70 58 112Z', 0.35) +
      Ci(160, 54, 6, '#c9c4d6') + Ci(40, 194, 4, '#c9c4d6') + sp(30, 56, 9) + sp(170, 196, 8);
  },

  galaxie() {
    const r = rng(7);
    let st = '';
    for (let i = 0; i < 34; i++) { const t = r() * 3.2 * Math.PI * 2, rad = 10 + t * 11 + (r() - 0.5) * 16, arm = (i % 2) * Math.PI; st += dot((100 + rad * Math.cos(t + arm) * 1.05).toFixed(1), (128 + rad * Math.sin(t + arm) * 0.8).toFixed(1), (1.4 + r() * 2.2).toFixed(1)); }
    return SH(100, 218, 0.01) +
      El(100, 128, 90, 66, '#2a2f6e', 'stroke="none" transform="rotate(-24 100 128)"') + El(100, 128, 66, 44, '#4a3a9a', 'stroke="none" transform="rotate(-24 100 128)"') + El(100, 128, 36, 24, '#9a6adf', 'stroke="none" transform="rotate(-24 100 128)"') +
      G(st, 'rotate(-24 100 128)') + El(100, 128, 16, 11, '#fff6bd', 'stroke="none" transform="rotate(-24 100 128)"') + sp(40, 50, 11) + sp(166, 202, 10) + sp(170, 60, 7) + sp(36, 196, 6);
  },
};

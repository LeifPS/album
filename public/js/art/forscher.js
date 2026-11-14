import { K, Co, NO, R, Ci, El, P, Pg, L, G, HL, SH, star, tube, spiral } from './helpers.js';

const sp = (x, y, s) => `<polygon points="${star(x, y, s, s * 0.3, 4, -90)}" fill="#fff" stroke="#1d1b2e" stroke-width="2.5" stroke-linejoin="round"/>`;
const bubble = (x, y, r) => Ci(x, y, r, '#fff', 'opacity=".7"');

export default {
  lupe() {
    return SH(100, 212, 66) +
      G(R(-9, 36, 18, 76, '#7d5a3c', 8) + R(-12, 28, 24, 14, '#c9d1de', 4) + Ci(0, -16, 54, '#c9d1de') + Ci(0, -16, 42, '#bfe8fa') + Ci(0, -16, 42, 'none', 'stroke-width="3"') +
        P('M-28 -30 Q-22 -50 0 -54 Q-18 -46 -22 -22Z', '#fff', 'opacity=".75" stroke="none"') + HL('M-30 -4 Q-20 18 6 20 Q-14 16 -30 -4Z', 0.3), 'translate(88 108) rotate(-24)') +
      sp(160, 64, 12) + sp(44, 188, 9);
  },

  reagenzglas() {
    return SH(100, 212, 62) +
      G(P('M-22 -86 L22 -86 L22 40 Q22 82 0 82 Q-22 82 -22 40Z', '#d9f0fb') + R(-28, -94, 56, 12, '#c9d1de', 6) + P('M-22 6 L22 6 L22 40 Q22 82 0 82 Q-22 82 -22 40Z', '#5be0a8') + El(0, 6, 22, 5, '#9af0cc', 'stroke="none"') +
        bubble(-6, 36, 6) + bubble(8, 54, 4) + bubble(2, 14, 3) + HL('M-15 -78 L-9 -78 L-9 40 Q-9 60 -15 54Z', 0.7), 'translate(100 130) rotate(18)') +
      P('M60 62 L74 78 M150 100 L168 92', 'none', 'stroke="#fff" stroke-width="4" opacity=".6"') + Ci(156, 140, 5, '#5be0a8') + Ci(46, 168, 3.5, '#5be0a8');
  },

  mikroskop() {
    return SH(100, 214, 62) +
      R(52, 196, 96, 14, '#2a2f3c', 6) + P('M70 196 L70 176 Q70 160 96 160 L130 160 L130 196Z', '#586174', 'opacity="0"') +
      P('M130 196 Q176 190 168 140 Q160 96 116 92', 'none', `stroke="${K}" stroke-width="26"`) + P('M130 196 Q176 190 168 140 Q160 96 116 92', 'none', 'stroke="#3c82da" stroke-width="20"') +
      G(R(-14, -64, 28, 90, '#c9d1de', 6) + R(-18, -72, 36, 14, '#2a2f3c', 5) + R(-10, 26, 20, 16, '#586174', 4) + R(-8, 40, 16, 8, '#2a2f3c', 3), 'translate(96 112) rotate(-12)') +
      R(60, 168, 80, 10, '#9aa3b2', 4) + R(76, 160, 48, 8, '#f6f6f6', 2, 'stroke-width="2.5"') + Ci(150, 170, 8, '#f0be1f', 'stroke-width="3"') + HL('M82 82 L90 82 L88 130 L82 130Z', 0.5);
  },

  laborkittel() {
    return SH(100, 214, 66) +
      P('M52 80 L84 66 Q100 80 116 66 L148 80 L166 100 L148 118 L146 208 L54 208 L52 118 L34 100Z', Co.white) +
      P('M84 66 L100 130 L116 66 Q100 82 84 66Z', '#e8e8e8') + P('M84 66 L100 130 L70 96Z', '#fff') + P('M116 66 L100 130 L130 96Z', '#fff') +
      P('M100 130 L100 208', 'none', 'stroke-width="3"') + Ci(96, 150, 3, '#c9d1de') + Ci(104, 170, 3, '#c9d1de') +
      R(58, 160, 32, 30, '#fff', 4, 'stroke-width="3"') + R(66, 150, 5, 18, '#3c82da', 2, 'stroke-width="2"') + R(74, 152, 5, 16, Co.red, 2, 'stroke-width="2"') +
      P('M36 100 L52 118', 'none', 'stroke-width="3" opacity=".4"') + HL('M58 84 L74 76 L66 112 L58 112Z', 0.5);
  },

  fossil() {
    let ribs = '';
    for (let i = 0; i < 5; i++) ribs += P(`M${74 + i * 12} 118 Q${78 + i * 12} 150 ${96 + i * 10} 164`, 'none', 'stroke="#9a7a4e" stroke-width="5"');
    return SH(100, 212, 76) +
      P('M24 108 Q40 76 84 82 Q130 70 170 100 Q184 130 164 166 Q140 200 84 194 Q36 192 22 156Z', '#b8a07a') +
      P('M36 112 Q56 88 90 94 Q130 86 160 108 Q172 132 154 160 Q130 186 88 182 Q46 178 36 150Z', '#d9c39a', 'stroke="none"') +
      Ci(66, 128, 16, '#b8a07a', 'stroke="#9a7a4e"') + Ci(66, 128, 5, '#7a5f38', NO) + P('M52 120 L38 104 M80 120 L90 106', 'none', 'stroke="#9a7a4e" stroke-width="3"') +
      P('M80 128 Q114 118 150 138', 'none', 'stroke="#9a7a4e" stroke-width="6"') + ribs +
      Pg('94,176 100,166 106,176', '#9a7a4e', 'stroke="none"') + Ci(140, 94, 4, '#9a7a4e', NO) + Ci(46, 160, 3, '#9a7a4e', NO);
  },

  teleskop() {
    return SH(100, 214, 70) +
      L(100, 140, 62, 208, `stroke="${K}" stroke-width="13"`) + L(100, 140, 138, 208, `stroke="${K}" stroke-width="13"`) + L(100, 140, 100, 208, `stroke="${K}" stroke-width="13"`) +
      L(100, 140, 62, 208, 'stroke="#7d5a3c" stroke-width="8"') + L(100, 140, 138, 208, 'stroke="#7d5a3c" stroke-width="8"') + L(100, 140, 100, 208, 'stroke="#a8692f" stroke-width="8"') +
      G(R(-70, -16, 78, 32, '#3c82da', 8) + R(0, -22, 54, 44, '#2a62b4', 8) + R(46, -26, 40, 52, '#c9d1de', 6) + Ci(86, 0, 18, '#6bc4ff', 'stroke-width="3"') + HL('M-60 -12 L-4 -12 L-4 -6 L-60 -6Z', 0.5) + R(-12, -22, 8, 44, '#f0be1f', 0, NO), 'translate(80 118) rotate(-28)') +
      Ci(100, 140, 10, '#c9d1de');
  },

  atommodell() {
    const orbit = r => El(100, 126, 70, 24, 'none', `stroke="${K}" stroke-width="10" transform="rotate(${r} 100 126)"`) + El(100, 126, 70, 24, 'none', `stroke="#6bc4ff" stroke-width="5" transform="rotate(${r} 100 126)"`);
    const el = (r, t) => { const a = t * Math.PI / 180, x = 70 * Math.cos(a), y = 24 * Math.sin(a), q = r * Math.PI / 180; return Ci((100 + x * Math.cos(q) - y * Math.sin(q)).toFixed(1), (126 + x * Math.sin(q) + y * Math.cos(q)).toFixed(1), 9, '#f0be1f', 'stroke-width="3"'); };
    return SH(100, 214, 70) + orbit(0) + orbit(60) + orbit(120) + el(0, 40) + el(60, 220) + el(120, 130) +
      Ci(100, 126, 22, '#e8473b') + Ci(92, 120, 7, '#ff8b7d', 'stroke-width="2.5"') + Ci(108, 128, 7, '#6bc4ff', 'stroke-width="2.5"') + Ci(100, 136, 6, '#ff8b7d', 'stroke-width="2.5"');
  },

  roboter() {
    return SH(100, 214, 62) +
      L(100, 40, 100, 62, 'stroke-width="6"') + Ci(100, 36, 8, Co.red) +
      R(56, 62, 88, 66, '#c9d1de', 14) + R(66, 74, 68, 40, '#2a2f3c', 8) + Ci(84, 94, 10, '#6bc4ff', 'stroke="none"') + Ci(116, 94, 10, '#6bc4ff', 'stroke="none"') + P('M88 108 L112 108', 'none', 'stroke="#6bc4ff" stroke-width="3"') +
      R(44, 80, 12, 30, '#9aa3b2', 4) + R(144, 80, 12, 30, '#9aa3b2', 4) +
      R(64, 134, 72, 60, '#3c82da', 10) + R(78, 146, 44, 26, '#2a2f3c', 5) + Ci(90, 159, 5, Co.red, 'stroke="none"') + Ci(110, 159, 5, Co.green, 'stroke="none"') +
      R(34, 138, 24, 12, '#9aa3b2', 6) + R(142, 138, 24, 12, '#9aa3b2', 6) + R(72, 192, 20, 16, '#586174', 4) + R(108, 192, 20, 16, '#586174', 4) +
      HL('M62 70 L72 68 L66 120 L60 118Z', 0.5);
  },

  zeitmaschine() {
    let t = '';
    for (let i = 0; i < 12; i++) { const a = i * 30 * Math.PI / 180; t += L((100 + 38 * Math.sin(a)).toFixed(1), (112 - 38 * Math.cos(a)).toFixed(1), (100 + 46 * Math.sin(a)).toFixed(1), (112 - 46 * Math.cos(a)).toFixed(1), 'stroke-width="3"'); }
    return SH(100, 214, 72) +
      R(34, 190, 132, 16, '#586174', 6) + R(46, 34, 14, 160, '#9aa3b2', 6) + R(140, 34, 14, 160, '#9aa3b2', 6) + R(40, 30, 120, 18, '#7d869a', 7) +
      El(100, 120, 50, 62, '#6bc4ff', 'opacity=".5"') + Ci(100, 112, 46, '#fffdf5') + t + L(100, 112, 100, 82, 'stroke-width="5"') + L(100, 112, 122, 124, 'stroke-width="4"') + Ci(100, 112, 5, K, NO) +
      Ci(60, 30, 5, '#e8473b') + Ci(140, 30, 5, '#3fb15a') + sp(100, 160, 8) + P('M60 190 Q70 150 90 160 M140 190 Q130 150 110 160', 'none', 'stroke="#fff" stroke-width="4" opacity=".6"');
  },

  nobelpreis() {
    return SH(100, 214, 74) +
      El(100, 200, 62, 12, '#b98a14') + R(54, 184, 92, 16, '#8a6a10', 5) + R(66, 176, 68, 12, '#c9981a', 4) +
      Ci(100, 118, 62, '#f6d35b', 'stroke-width="5"') + Ci(100, 118, 50, 'none', 'stroke="#b98a14" stroke-width="3"') + Ci(100, 118, 40, '#f0be1f') +
      Ci(100, 106, 18, '#fff0b8', 'stroke-width="3"') + P('M74 148 Q74 126 100 124 Q126 126 126 148 Q100 160 74 148Z', '#fff0b8', 'stroke-width="3"') +
      P('M62 80 Q76 60 100 56', 'none', 'stroke="#fff" stroke-width="7" opacity=".6"') + sp(42, 60, 14) + sp(162, 52, 12) + sp(170, 170, 9) + sp(30, 150, 8);
  },
};

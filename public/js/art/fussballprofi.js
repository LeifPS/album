import { K, Co, NO, R, Ci, El, P, Pg, L, G, HL, SH, star, tube, glove, pent } from './helpers.js';

const ball = (x, y, r) => {
  let o = Ci(x, y, r, '#fff') + Pg(pent(x, y, r * 0.38), K, 'stroke="none"');
  for (let i = 0; i < 5; i++) { const a = (i * 72 - 90) * Math.PI / 180, ex = x + Math.cos(a) * r * 0.9, ey = y + Math.sin(a) * r * 0.9, mx = x + Math.cos(a) * r * 0.38, my = y + Math.sin(a) * r * 0.38; o += L(mx.toFixed(1), my.toFixed(1), ((mx + ex) / 2).toFixed(1), ((my + ey) / 2).toFixed(1), 'stroke-width="3"') + Pg(pent(x + Math.cos(a) * r * 0.86, y + Math.sin(a) * r * 0.86, r * 0.2, (i * 72 - 90) + 180), K, 'stroke="none"'); }
  return o + HL(`M${x - r * 0.7} ${y - r * 0.3} Q${x - r * 0.5} ${y - r * 0.75} ${x} ${y - r * 0.85} Q${x - r * 0.5} ${y - r * 0.5} ${x - r * 0.6} ${y}Z`, 0.5);
};
const sp = (x, y, s) => `<polygon points="${star(x, y, s, s * 0.3, 4, -90)}" fill="#fff" stroke="#1d1b2e" stroke-width="2.5" stroke-linejoin="round"/>`;
const boot = (fill, lace = '#fff') =>
  P('M30 168 L38 96 Q52 84 70 92 L84 112 Q112 120 150 130 Q182 140 182 162 L182 174 L30 174Z', fill) +
  R(30, 172, 152, 14, '#2a2f3c', 5) + [44, 68, 92, 118, 148, 170].map(x => Pg(`${x},186 ${x + 8},186 ${x + 4},198`, '#c9d1de')).join('') +
  P('M74 108 L88 98 M84 120 L98 108 M96 126 L110 114', 'none', `stroke="${lace}" stroke-width="5"`) + HL('M40 160 L40 106 Q52 98 62 102 Q50 110 50 160Z', 0.35);

export default {
  fussball() { return SH(100, 212, 70) + ball(100, 126, 66); },

  fussballschuhe() { return SH(100, 212, 84) + boot('#e8473b'); },

  schienbeinschoner() {
    const sg = (x, rot) => G(P('M-22 -62 Q0 -72 22 -62 L26 40 Q0 76 -26 40Z', '#f6f6f6') + P('M-22 -62 Q0 -72 22 -62 L20 -40 Q0 -48 -20 -40Z', '#3c82da', 'stroke="none"') + P('M-6 -20 L6 -20 L6 30 L-6 30Z', '#c9d1de', 'stroke="none"') + Pg(star(0, 0, 10, 4), Co.gold, 'stroke-width="2"') + HL('M-18 -50 L-10 -50 L-14 24 L-20 24Z', 0.6), `translate(${x} 128) rotate(${rot}) scale(1.05)`);
    return SH(100, 212, 70) + sg(64, -8) + sg(138, 8) + tube('M30 160 Q64 170 98 160', '#2a2f3c', 3) + tube('M104 164 Q138 174 170 162', '#2a2f3c', 3);
  },

  torwarthandschuhe() {
    return SH(100, 212, 76) +
      G(glove(Co.green, '#2a2f3c', K) + R(-20, -4, 40, 28, '#fff', 8, 'opacity=".9"') + Pg(star(0, 10, 9, 4), Co.green, 'stroke-width="2"'), 'translate(66 130) rotate(-10) scale(1)') +
      G(glove('#2f9d52', '#2a2f3c', K) + R(-20, -4, 40, 28, '#fff', 8, 'opacity=".9"') + Pg(star(0, 10, 9, 4), '#2f9d52', 'stroke-width="2"'), 'translate(138 134) rotate(10) scale(1)');
  },

  tor() {
    let net = '';
    for (let x = 36; x <= 164; x += 14) net += L(x, 86, x - ((x - 100) * 0.0), 168, 'stroke="#fff" stroke-width="1.5" opacity=".6"');
    for (let y = 98; y <= 160; y += 13) net += L(32, y, 168, y, 'stroke="#fff" stroke-width="1.5" opacity=".6"');
    return SH(100, 212, 84) + R(32, 82, 136, 90, '#000', 0, 'opacity=".15" stroke="none"') + net +
      R(28, 78, 144, 8, '#f6f6f6', 4) + R(28, 78, 9, 104, '#f6f6f6', 4) + R(163, 78, 9, 104, '#f6f6f6', 4) +
      P('M32 182 L168 182', 'none', 'stroke="#fff" stroke-width="3" opacity=".6"') + ball(102, 170, 15);
  },

  kapitaensbinde() {
    return SH(100, 210, 66) +
      P('M44 70 L156 70 L162 190 L38 190Z', '#f0be1f') + P('M40 100 Q100 116 160 100 L162 120 Q100 136 38 120Z', '#d9a520', 'opacity=".5" stroke="none"') +
      R(50, 84, 100, 90, '#ffd43b', 6, 'opacity="0"') + R(34, 92, 132, 14, '#2a2f3c', 3, 'opacity="0"') +
      R(40, 70, 120, 120, '#f0be1f', 8, 'opacity="0"') + R(38, 94, 124, 70, '#e8473b', 8, 'opacity="0"') +
      P('M80 130 Q80 100 104 100 L124 100 M80 130 Q80 160 104 160 L124 160', 'none', `stroke="${K}" stroke-width="22" stroke-linecap="butt"`) +
      P('M80 130 Q80 100 104 100 L124 100 M80 130 Q80 160 104 160 L124 160', 'none', 'stroke="#fff" stroke-width="14" stroke-linecap="butt"') +
      L(40, 76, 160, 76, 'stroke-width="2.5" opacity=".5"') + L(42, 184, 158, 184, 'stroke-width="2.5" opacity=".5"') + HL('M48 80 L58 80 L54 184 L44 184Z', 0.4);
  },

  stadion() {
    let rows = '';
    for (let i = 0; i < 4; i++) rows += P(`M${30 + i * 8} ${96 + i * 14} Q100 ${84 + i * 14} ${170 - i * 8} ${96 + i * 14}`, 'none', 'stroke="#fff" stroke-width="2" opacity=".5"');
    return SH(100, 212, 88) +
      P('M16 130 Q16 70 100 62 Q184 70 184 130 L184 188 Q100 214 16 188Z', '#9aa3b2') +
      P('M30 134 Q100 150 170 134 L170 176 Q100 196 30 176Z', '#586174') + rows +
      El(100, 150, 74, 24, '#3fb15a') + El(100, 150, 58, 16, 'none', 'stroke="#fff" stroke-width="2.5"') + L(100, 134, 100, 166, 'stroke="#fff" stroke-width="2.5"') +
      R(34, 72, 6, 36, '#c9d1de', 2) + R(160, 72, 6, 36, '#c9d1de', 2) + Ci(37, 68, 7, '#fff6bd') + Ci(163, 68, 7, '#fff6bd') +
      P('M30 134 Q100 120 170 134', 'none', 'stroke-width="4"');
  },

  meisterschale() {
    return SH(100, 214, 72) +
      El(100, 196, 56, 12, '#b98a14') + R(88, 160, 24, 36, '#f0be1f', 4) + R(70, 184, 60, 16, '#d9a520', 5) +
      P('M30 78 L170 78 Q160 150 100 160 Q40 150 30 78Z', '#f6d35b') + El(100, 78, 70, 12, '#e6b820') + El(100, 78, 56, 8, '#c9981a', 'stroke="none"') +
      P('M46 96 L90 150 M62 90 L110 156', 'none', 'stroke="#fff" stroke-width="5" opacity=".5"') + Pg(star(100, 118, 14, 6), '#fff', 'stroke-width="2.5"') +
      HL('M40 88 Q46 130 76 150 Q56 124 52 90Z', 0.5) + sp(32, 46, 12) + sp(172, 60, 9);
  },

  goldenerschuh() {
    return SH(100, 212, 84) + boot('#f6d35b', '#b98a14') + sp(44, 70, 14) + sp(168, 98, 10) + sp(150, 60, 8) +
      P('M130 134 L154 142', 'none', 'stroke="#fff" stroke-width="4" opacity=".6"');
  },

  weltpokal() {
    return SH(100, 216, 66) +
      R(60, 192, 80, 14, '#3fb15a', 4) + R(52, 204, 96, 12, '#2f9d52', 4) + R(66, 160, 68, 36, '#3fb15a', 6) + R(78, 140, 44, 28, '#f0be1f', 6) +
      P('M78 64 Q100 40 122 64 Q150 90 128 120 Q120 140 112 146 L88 146 Q80 140 72 120 Q50 90 78 64Z', '#f6d35b') +
      Ci(100, 98, 30, '#4a8fe0', 'stroke-width="3"') + P('M80 84 Q92 74 104 82 Q94 92 100 104 Q86 106 80 84Z M108 92 Q122 90 124 104 Q116 118 106 112Z', '#3fb15a', 'stroke="none"') +
      P('M100 68 L100 128 M70 98 L130 98', 'none', 'stroke="#fff" stroke-width="1.5" opacity=".5"') +
      HL('M78 74 Q84 60 98 54 Q84 68 84 96Z', 0.55) + sp(36, 56, 13) + sp(166, 76, 11) + sp(150, 40, 8);
  },
};

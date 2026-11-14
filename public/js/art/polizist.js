import { K, Co, NO, R, Ci, El, P, Pg, L, G, HL, SH, star, tube } from './helpers.js';

const PB = '#2a4fa8', PBd = '#1c3778';
const wheel = (x, y, r = 16) => Ci(x, y, r, '#2a2f3c') + Ci(x, y, r * 0.45, '#c9d1de');
const badge = (cx, cy, s) => G(P('M0 -44 L38 -32 L36 6 Q30 32 0 48 Q-30 32 -36 6 L-38 -32Z', '#d9dde6') + P('M0 -34 L28 -25 L26 4 Q22 24 0 36 Q-22 24 -26 4 L-28 -25Z', PB) + Pg(star(0, -2, 17, 7), Co.gold, 'stroke-width="2.5"'), `translate(${cx} ${cy}) scale(${s})`);
const blue = (cx, cy, r, on = true) => Ci(cx, cy, r, on ? '#6ec6ff' : '#2a6fe0');

export default {
  trillerpfeife() {
    return SH(100, 210, 66) + G(
      tube('M70 96 Q40 70 70 56 Q100 44 96 78', '#9aa3b2', 5) +
      Ci(98, 148, 46, '#c9d1de') + Ci(98, 148, 30, '#aeb7c6', 'stroke-width="2.5"') + Ci(98, 148, 10, K, NO) +
      P('M54 118 L18 104 L14 128 L54 150Z', '#dbe0ea') + R(14, 106, 12, 22, '#2a2f3c', 3, 'transform="rotate(-18 20 117)"') +
      Ci(96, 106, 10, '#9aa3b2') + Ci(96, 106, 4, K, NO) +
      HL('M70 128 Q84 112 108 112 Q84 118 76 136Z', 0.6), 'translate(22 0)');
  },

  polizeimuetze() {
    return SH(100, 208, 74) +
      P('M30 150 Q24 96 100 86 Q176 96 170 150Z', PB) +
      P('M26 150 L174 150 L182 172 Q100 200 18 172Z', PBd) +
      P('M50 172 Q100 196 150 172 Q150 182 100 190 Q50 182 50 172Z', '#2a2f3c', 'opacity=".8"') +
      R(34, 148, 132, 14, '#e8edf6', 0, NO) + Ci(100, 128, 24, '#d9dde6', 'stroke-width="3"') + Pg(star(100, 128, 17, 7), Co.gold, 'stroke-width="2"') +
      HL('M40 138 Q42 104 76 94 Q56 112 56 140Z', 0.3);
  },

  handschellen() {
    const cuff = (x) => Ci(x, 150, 38, 'none', `stroke="${K}" stroke-width="20"`) + Ci(x, 150, 38, 'none', 'stroke="#c9d1de" stroke-width="15"') + R(x - 14, 104, 28, 22, '#9aa3b2', 5) + Ci(x, 115, 4, K, NO);
    return SH(100, 214, 82) +
      tube('M82 150 L118 150', '#9aa3b2', 5) + Ci(100, 150, 6, '#c9d1de', 'stroke-width="3"') +
      cuff(46) + cuff(154) + HL('M26 132 Q34 118 52 114', 0.0);
  },

  funkgeraet() {
    let g = '';
    for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) g += R(70 + j * 36, 170 + i * 12, 28, 7, '#586174', 3);
    return SH(100, 214, 54) +
      R(120, 22, 12, 56, '#2a2f3c', 6) + R(112, 60, 36, 12, '#2a2f3c', 4) +
      R(62, 64, 76, 142, '#3a4260', 16) + R(70, 78, 60, 54, '#9ad9b8', 6) + L(78, 92, 122, 92, 'stroke-width="3" opacity=".6"') + L(78, 104, 112, 104, 'stroke-width="3" opacity=".6"') + L(78, 116, 118, 116, 'stroke-width="3" opacity=".6"') +
      Ci(100, 150, 8, '#e23d34') + g +
      R(50, 96, 14, 36, '#2a2f3c', 5) + HL('M68 70 L78 70 L76 130 L68 130Z', 0.2);
  },

  abzeichen() {
    return SH(100, 214, 62) + badge(100, 126, 1.9);
  },

  blaulicht() {
    return SH(100, 212, 66) +
      R(46, 160, 108, 40, '#586174', 8) + R(46, 160, 108, 12, '#7d869a', 8) +
      P('M54 164 L54 108 Q56 60 100 60 Q144 60 146 108 L146 164Z', '#3c82da') +
      P('M72 160 L72 112 Q74 84 100 84 Q126 84 128 112 L128 160Z', '#8cd0ff', 'stroke="none"') +
      P('M62 140 L62 110 Q64 76 90 70', 'none', 'stroke="#fff" stroke-width="7" opacity=".6"') +
      P('M30 88 L14 76 M172 88 L186 76 M100 46 L100 28 M44 62 L32 48 M156 62 L168 48', 'none', 'stroke="#6ec6ff" stroke-width="6"');
  },

  streifenwagen() {
    return SH(100, 188, 86, 6) +
      P('M14 150 L14 124 Q14 112 28 110 L52 106 Q62 84 84 82 L126 82 Q146 84 158 106 L176 112 Q188 116 188 128 L188 150Z', Co.white) +
      P('M14 130 L188 130 L188 150 L14 150Z', PB) + R(14, 134, 174, 6, Co.white, 0, NO) +
      P('M66 106 Q72 90 86 90 L100 90 L100 106Z', Co.sky) + P('M106 90 L124 90 Q140 92 148 106 L106 106Z', Co.sky) +
      R(88, 72, 26, 11, '#2a6fe0', 3) + Ci(94, 70, 3, '#6ec6ff') + Ci(108, 70, 3, '#e8473b') +
      R(176, 128, 10, 8, Co.yellow, 2) + R(14, 128, 8, 10, '#c93a30', 2) + R(110, 118, 20, 5, '#e6e6e6', 2) +
      wheel(54, 154, 17) + wheel(148, 154, 17) + P('M24 144 L62 144', 'none', 'stroke="#fff" stroke-width="0"');
  },

  polizeimotorrad() {
    return SH(100, 208, 86, 6) +
      Ci(44, 162, 32, 'none', `stroke="${K}" stroke-width="12"`) + Ci(44, 162, 32, 'none', 'stroke="#586174" stroke-width="6"') + Ci(44, 162, 6, K, NO) +
      Ci(158, 162, 32, 'none', `stroke="${K}" stroke-width="12"`) + Ci(158, 162, 32, 'none', 'stroke="#586174" stroke-width="6"') + Ci(158, 162, 6, K, NO) +
      tube('M158 162 L138 112 L124 90', '#9aa3b2', 8) + R(116, 80, 30, 8, '#2a2f3c', 4) +
      P('M52 140 Q60 108 100 106 L134 106 Q148 112 144 134 L128 152 L86 152 Q64 156 52 140Z', Co.white) +
      R(54, 128, 84, 12, PB, 5, 'stroke="none"') +
      P('M64 106 Q80 90 110 92 L130 98 L124 108 L72 112Z', '#2a2f3c') + Ci(100, 78, 8, '#6ec6ff') + R(92, 70, 16, 6, '#2a6fe0', 3) +
      R(38, 112, 40, 20, '#e8edf6', 6) + R(40, 116, 36, 5, PB, 0, NO) + Ci(100, 150, 12, '#586174');
  },

  polizeihund() {
    return SH(100, 212, 66) +
      P('M52 214 L52 176 Q46 150 62 132 L78 110 Q74 90 90 78 Q106 70 122 82 L146 76 L156 94 L140 104 Q146 124 134 140 Q128 160 134 176 L134 214Z', '#c98b4e') +
      P('M62 132 Q76 120 94 140 Q100 168 86 196 L74 214 L52 214 L52 176 Q46 150 62 132Z', '#7d5a3c', 'opacity=".8"') +
      P('M90 80 L80 54 L108 70Z', '#7d5a3c') + P('M124 78 L132 52 L144 78Z', '#7d5a3c') +
      Ci(132, 94, 4.5, K, NO) + Ci(152, 94, 5, K, NO) + P('M140 104 Q148 112 156 104', 'none', 'stroke-width="3"') +
      R(70, 132, 40, 12, '#2a4fa8', 4, 'transform="rotate(-20 90 138)"') + Pg(star(90, 138, 5, 2), Co.gold, 'stroke="none"') +
      R(52, 190, 12, 24, '#a8692f', 4) + R(82, 190, 12, 24, '#a8692f', 4);
  },

  polizeihubschrauber() {
    return SH(100, 214, 80, 6) +
      P('M22 112 L58 106 L58 120 L22 124Z', PB) + R(10, 100, 10, 30, '#9aa3b2', 3) +
      P('M52 90 Q96 76 134 96 Q148 106 146 124 Q140 140 100 142 Q56 142 48 124Z', PB) +
      P('M120 98 Q138 102 142 118 L120 120Z', Co.sky) + R(54, 120, 90, 8, Co.white, 0, NO) + Ci(78, 112, 7, Co.white, 'stroke-width="2.5"') + Pg(star(78, 112, 5, 2), PB, 'stroke="none"') +
      L(100, 78, 100, 90, 'stroke-width="6"') + R(26, 70, 148, 8, '#586174', 4) +
      L(66, 142, 66, 152, 'stroke-width="4"') + L(124, 142, 124, 152, 'stroke-width="4"') + R(48, 150, 96, 7, '#586174', 3) +
      P('M92 160 L60 232 L144 232 L112 160Z', '#ffe9a0', 'opacity=".5" stroke="none"') + Ci(102, 154, 6, '#fff6bd') +
      HL('M62 98 Q84 88 106 90 Q80 96 66 112Z', 0.4);
  },
};

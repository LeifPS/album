import { K, Co, NO, R, Ci, El, P, Pg, L, G, HL, SH, star, tube } from './helpers.js';

const Y = '#ffd43b', Yd = '#e0a800';

export default {
  briefmarke() {
    let d = 'M40 56';
    for (let i = 0; i < 10; i++) d += ' a6 6 0 0 0 12 0';
    for (let i = 0; i < 12; i++) d += ' a6 6 0 0 0 0 12';
    for (let i = 0; i < 10; i++) d += ' a6 6 0 0 0 -12 0';
    for (let i = 0; i < 12; i++) d += ' a6 6 0 0 0 0 -12';
    return SH(100, 214, 62) + G(
      P(d + 'Z', Co.white) +
      R(54, 70, 92, 92, '#8fd3ff', 3, 'stroke-width="2.5"') + Ci(78, 92, 9, Co.yellow, 'stroke-width="2.5"') +
      P('M54 162 Q80 120 102 146 Q122 110 146 162Z', Co.green, 'stroke-width="2.5"') +
      R(58, 172, 40, 8, '#9aa3b2', 3, NO) + R(58, 186, 64, 8, '#9aa3b2', 3, NO) + R(112, 172, 24, 8, Co.red, 3, NO) +
      P('M104 150 Q118 138 132 150 T160 150 M104 160 Q118 148 132 160 T160 160 M104 170 Q118 158 132 170 T160 170', 'none', 'stroke="#2a2f3c" stroke-width="3" opacity=".75"'),
      'translate(0 0) rotate(-3 100 130)');
  },

  brief() {
    return SH(100, 208, 70) +
      R(30, 78, 140, 100, Co.white, 7) +
      P('M32 82 L100 138 L168 82', 'none', 'stroke-width="3"') + P('M32 176 L84 128 M168 176 L116 128', 'none', 'stroke-width="2.5" opacity=".6"') +
      R(138, 88, 22, 26, Co.pink, 3, 'stroke-width="2.5"') + Ci(149, 98, 5, '#fff', NO) +
      L(44, 150, 84, 150, 'stroke="#9aa3b2" stroke-width="4"') + L(44, 162, 70, 162, 'stroke="#9aa3b2" stroke-width="4"') +
      Ci(100, 138, 11, Co.red, 'stroke-width="3"') + Ci(100, 138, 4.5, '#b32f27', NO);
  },

  postkarte() {
    return SH(100, 208, 74) + G(
      R(-72, -52, 144, 104, Co.white, 5) +
      R(-64, -44, 62, 88, '#8fd3ff', 3, 'stroke-width="2.5"') + Ci(-34, -22, 8, Y, 'stroke-width="2.5"') +
      P('M-64 44 L-38 2 L-22 24 L-8 -2 L-2 44Z', '#6a7fb5', 'stroke-width="2.5"') + P('M-64 44 Q-40 28 -22 44Z', Co.green, 'stroke-width="2.5"') +
      L(8, -44, 8, 44, 'stroke-width="2"') +
      R(40, -42, 24, 28, Co.pink, 3, 'stroke-width="2.5"') +
      L(16, 6, 62, 6, 'stroke="#9aa3b2" stroke-width="4"') + L(16, 20, 62, 20, 'stroke="#9aa3b2" stroke-width="4"') + L(16, 34, 50, 34, 'stroke="#9aa3b2" stroke-width="4"'),
      'translate(100 128) rotate(-7)');
  },

  briefkasten() {
    return SH(100, 214, 54) +
      R(90, 176, 20, 38, '#7d5a3c', 3) +
      Pg('74,100 126,100 122,70 78,70', Co.white) +
      R(48, 66, 104, 114, Y, 16) + R(48, 66, 104, 36, Yd, 16) + R(48, 86, 104, 16, Yd, 0, NO) +
      R(64, 96, 72, 10, K, 4) + Pg('76,98 124,98 120,76 80,76', Co.white, 'stroke-width="2.5"') + R(60, 92, 80, 8, Yd, 2) + R(64, 96, 72, 10, K, 4) +
      R(64, 130, 72, 38, Y, 6, 'stroke-width="2.5"') +
      Ci(100, 148, 12, Co.white, 'stroke-width="2.5"') + P('M92 150 Q100 140 108 150', 'none', 'stroke-width="3"') + Ci(94, 152, 3, K, NO) +
      HL('M54 108 Q54 100 62 100 L66 100 L66 170 L54 170Z', 0.45);
  },

  paket() {
    return SH(100, 208, 74) +
      Pg('46,108 72,82 168,82 142,108', '#e8b86f') + Pg('142,108 168,82 168,162 142,190', '#a8692f') +
      R(46, 108, 96, 82, '#c98b4e') +
      Pg('90,108 116,82 130,82 104,108', '#f1e2b3', 'stroke-width="2.5"') + R(90, 108, 14, 82, '#f1e2b3', 0, 'stroke-width="2.5"') +
      R(108, 140, 28, 30, Co.white, 2, 'stroke-width="2.5"') + L(113, 150, 131, 150, 'stroke-width="2.5"') + L(113, 158, 127, 158, 'stroke-width="2.5"') +
      HL('M52 114 L84 114 L84 120 L52 120Z', 0.35);
  },

  posttasche() {
    return SH(100, 212, 66) +
      tube('M56 98 Q100 20 144 98', '#7d5a3c', 10) +
      P('M40 104 Q40 92 52 92 L148 92 Q160 92 160 104 L158 198 Q100 212 42 198Z', Y) +
      P('M36 98 L164 98 L154 142 Q100 160 46 142Z', Yd) +
      R(90, 134, 20, 24, '#c9d1de', 4) + L(100, 140, 100, 152, 'stroke-width="2.5"') +
      R(52, 168, 96, 22, '#f0be1f', 6, 'stroke-width="2.5"') +
      Ci(100, 118, 12, Co.white, 'stroke-width="2.5"') + P('M94 120 Q100 110 106 120', 'none', 'stroke-width="3"') +
      HL('M46 106 L58 106 L56 190 L48 190Z', 0.4);
  },

  postfahrrad() {
    const wheel = x => Ci(x, 170, 34, 'none', `stroke="${K}" stroke-width="10"`) + Ci(x, 170, 34, 'none', 'stroke="#586174" stroke-width="5"') + Ci(x, 170, 4, K, NO) +
      L(x - 28, 170, x + 28, 170, 'stroke-width="1.5"') + L(x, 142, x, 198, 'stroke-width="1.5"');
    return SH(100, 208, 90) + wheel(50) + wheel(150) +
      R(30, 104, 44, 34, Y, 6) + L(36, 120, 68, 120, 'stroke-width="2"') +
      tube('M50 170 L96 170 L84 108', Y, 8) + tube('M84 108 L130 102 L136 130 L96 170', Y, 8) + tube('M50 170 L84 108', Y, 7) + tube('M136 130 L150 170', Y, 7) +
      R(70, 98, 28, 9, '#2a2f3c', 4) + tube('M122 100 L128 86 L148 84', '#2a2f3c', 6) + Ci(96, 170, 7, '#9aa3b2');
  },

  poststempel() {
    return SH(100, 214, 70) +
      R(30, 176, 140, 32, Co.white, 3) +
      Ci(100, 190, 32, 'none', 'stroke="#3c82da" stroke-width="5"') + Ci(100, 190, 22, 'none', 'stroke="#3c82da" stroke-width="3"') +
      P('M80 190 Q90 182 100 190 T120 190', 'none', 'stroke="#3c82da" stroke-width="3"') +
      P('M72 76 Q72 36 100 36 Q128 36 128 76 L122 100 L78 100Z', '#a8652f') +
      R(56, 100, 88, 18, '#7d869a', 5) + R(48, 118, 104, 26, '#d9a566', 5) + R(48, 140, 104, 6, '#3c82da', 0, 'opacity=".7" stroke="none"') +
      HL('M80 44 Q80 40 90 40 L92 40 L90 96 L82 96Z', 0.4);
  },

  posthorn() {
    return SH(100, 214, 64) +
      P('M132 120 Q162 92 190 84 L190 184 Q162 176 132 148Z', '#f2c230') + Ci(190, 134, 4, '#fff6bd', NO) +
      tube('M96 88 A46 46 0 1 0 96 180 A46 46 0 1 0 96 88', '#f2c230', 14) +
      tube('M96 106 A28 28 0 1 0 96 162 A28 28 0 1 0 96 106', '#f2c230', 11) +
      R(30, 118, 30, 14, '#f2c230', 6) + R(40, 112, 8, 26, '#c9d1de', 3) +
      R(124, 124, 12, 28, '#d9a520', 3) + Ci(96, 134, 6, '#d9a520') +
      P('M62 98 A40 40 0 0 0 58 150', 'none', 'stroke="#fff6bd" stroke-width="5" opacity=".7"');
  },

  postauto() {
    return SH(100, 188, 80, 6) +
      R(14, 84, 118, 84, Y, 8) +
      P('M130 112 L130 84 L156 84 Q172 90 182 112 L188 130 L188 168 L130 168Z', Y) +
      R(16, 136, 170, 8, Co.red, 0, NO) +
      P('M138 94 L156 94 Q166 98 172 112 L138 112Z', Co.sky) + R(24, 96, 22, 20, Co.sky, 3) +
      Ci(86, 112, 18, Co.white, 'stroke-width="3"') + P('M76 114 Q86 98 96 114', 'none', 'stroke-width="4"') + Ci(80, 118, 4, K, NO) +
      R(176, 148, 10, 8, Co.white, 2) + R(12, 150, 8, 12, '#c93a30', 2) +
      Ci(52, 168, 18, '#2a2f3c') + Ci(52, 168, 8, '#c9d1de') + Ci(152, 168, 18, '#2a2f3c') + Ci(152, 168, 8, '#c9d1de') +
      HL('M20 90 L60 90 L50 96 L20 96Z', 0.45);
  },
};

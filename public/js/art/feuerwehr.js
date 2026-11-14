import { K, Co, NO, R, Ci, El, P, Pg, L, G, HL, SH, star, tube, glove } from './helpers.js';

const FR = '#e23d34', FRd = '#b92a24';
const wheel = (x, y, r = 17) => Ci(x, y, r, '#2a2f3c') + Ci(x, y, r * 0.45, '#c9d1de');
const flames = (x, y, s) => G(P('M0 -26 Q12 -8 16 4 Q20 20 6 26 Q-6 30 -14 20 Q-20 8 -10 -4 Q-8 6 -2 8 Q-6 -10 0 -26Z', '#ff9b3d') + P('M0 26 Q-8 20 -6 10 Q-2 4 2 -2 Q8 6 8 14 Q8 22 0 26Z', Co.yellow), `translate(${x} ${y}) scale(${s})`);

export default {
  feuerwehrhelm() {
    return SH(100, 210, 70) +
      P('M24 164 Q20 76 100 70 Q180 76 176 164Z', FR) +
      P('M20 164 L180 164 Q196 186 168 192 L32 192 Q4 186 20 164Z', FRd) +
      R(84, 66, 32, 100, '#f0be1f', 10) + R(92, 30, 16, 40, '#f0be1f', 8) + P('M70 76 Q100 24 130 76', 'none', 'stroke-width="3" opacity=".6"') +
      P('M86 120 L100 96 L114 120 L100 152Z', Co.white, 'stroke-width="2.5"') + Ci(100, 124, 5, Co.red, 'stroke-width="2"') +
      HL('M36 150 Q36 96 76 84 Q54 106 52 150Z', 0.35);
  },

  feuerloescher() {
    return SH(100, 214, 54) +
      tube('M104 62 Q150 56 152 92 L152 108', '#2a2f3c', 6) +
      R(62, 70, 76, 138, '#e23d34', 22) + R(76, 46, 48, 30, '#586174', 8) +
      R(78, 36, 54, 12, '#2a2f3c', 5) + R(122, 40, 36, 8, '#9aa3b2', 4) + Ci(126, 62, 10, '#dbe0ea', 'stroke-width="3"') + L(126, 62, 130, 56, 'stroke-width="3"') +
      R(62, 120, 76, 40, Co.white, 0, 'stroke-width="2.5"') + P('M92 150 Q88 130 100 124 Q106 136 112 134 Q116 146 108 152Z', Co.red, 'stroke-width="2"') +
      HL('M70 90 L82 90 L80 200 L70 200Z', 0.4);
  },

  handschuhe() {
    return SH(100, 212, 76) +
      G(glove('#c9892f', '#7d5a3c', K), 'translate(64 128) rotate(-12) scale(.95)') +
      G(glove('#c9892f', '#7d5a3c', K), 'translate(138 134) rotate(12) scale(.95)') +
      R(34, 164, 62, 6, Co.yellow, 2, 'stroke="none" opacity=".9" transform="rotate(-12 64 167)"') +
      R(106, 168, 62, 6, Co.yellow, 2, 'stroke="none" opacity=".9" transform="rotate(12 138 171)"');
  },

  schlauch() {
    return SH(100, 212, 70) +
      Ci(100, 138, 62, 'none', `stroke="${K}" stroke-width="40"`) + Ci(100, 138, 62, 'none', 'stroke="#f0be1f" stroke-width="35"') +
      Ci(100, 138, 47, 'none', `stroke="${K}" stroke-width="3"`) + Ci(100, 138, 77, 'none', `stroke="${K}" stroke-width="3"`) +
      Ci(100, 138, 30, 'none', `stroke="${K}" stroke-width="3" opacity=".4"`) +
      tube('M100 76 Q150 60 176 100 L184 136', '#f0be1f', 12) + R(172, 130, 24, 20, '#c9d1de', 4) + R(174, 148, 20, 8, '#9aa3b2', 3) +
      Ci(100, 138, 18, '#9aa3b2') + Ci(100, 138, 7, K, NO);
  },

  beil() {
    return SH(100, 212, 60) +
      G(R(-8, -90, 16, 180, Co.wood, 7) + P('M-8 -92 Q-60 -108 -66 -60 Q-60 -26 -8 -40Z', '#d83a30') + P('M-8 -92 Q-60 -108 -66 -60 Q-52 -62 -40 -58', '#c9d1de', 'opacity="0"') +
        R(-8, -40, 16, 20, '#9aa3b2', 3) + HL('M-6 -80 L-2 -80 L-2 70 L-6 70Z', 0.4),
        'translate(100 128) rotate(32)') +
      P('M70 58 Q56 70 60 100', 'none', 'stroke="#fff" stroke-width="4" opacity=".4"');
  },

  hydrant() {
    return SH(100, 214, 62) +
      R(66, 96, 68, 106, FR, 8) + R(60, 192, 80, 16, FRd, 5) + R(60, 94, 80, 14, FRd, 5) +
      P('M70 94 Q70 56 100 56 Q130 56 130 94Z', FR) + R(92, 38, 16, 20, '#c9d1de', 4) + R(84, 30, 32, 12, '#9aa3b2', 4) +
      R(34, 122, 40, 28, '#c9d1de', 6) + R(26, 118, 12, 36, '#9aa3b2', 4) + R(126, 122, 40, 28, '#c9d1de', 6) + R(162, 118, 12, 36, '#9aa3b2', 4) +
      Ci(100, 150, 15, '#c9d1de', 'stroke-width="3"') + Ci(100, 150, 5, K, NO) + HL('M72 104 L82 104 L80 190 L72 190Z', 0.35);
  },

  leiter() {
    let rungs = '';
    for (let i = 0; i < 6; i++) rungs += R(58, 62 + i * 28, 84, 9, '#d9a566', 3);
    return SH(100, 216, 56) +
      G(R(48, 24, 14, 190, Co.wood, 6) + R(138, 24, 14, 190, Co.wood, 6) + rungs + R(48, 24, 14, 30, '#d83a30', 6, 'opacity=".95"') + R(138, 24, 14, 30, '#d83a30', 6), 'rotate(8 100 128)') +
      HL('M52 40 L56 40 L56 200 L52 200Z', 0.3);
  },

  feuerwehrauto() {
    return SH(100, 196, 88, 6) +
      R(10, 100, 112, 66, FR, 6) + P('M118 100 L150 100 Q164 106 172 122 L190 134 L190 166 L118 166Z', FR) +
      R(12, 128, 176, 8, Co.white, 0, NO) + R(12, 140, 110, 5, '#f0be1f', 0, NO) +
      P('M128 108 L148 108 Q158 112 164 124 L128 124Z', Co.sky) +
      G(R(0, 0, 100, 10, '#c9d1de', 3) + R(4, -4, 92, 5, '#9aa3b2', 2), 'translate(14 90) rotate(-4)') +
      R(60, 84, 24, 12, '#2a6fe0', 3) + Ci(72, 82, 5, '#9fd8f5') + R(172, 150, 14, 8, Co.yellow, 2) + R(8, 150, 8, 10, '#c93a30', 2) +
      wheel(48, 170) + wheel(150, 170) + HL('M18 106 L100 106 L96 112 L18 112Z', 0.35);
  },

  drehleiter() {
    return SH(100, 202, 86, 6) +
      G(R(0, -6, 150, 14, '#c9d1de', 3) + [0, 1, 2, 3, 4, 5, 6, 7].map(i => L(10 + i * 18, -6, 10 + i * 18, 8, 'stroke-width="2.5"')).join('') + R(0, -6, 150, 4, '#e23d34', 0, NO), 'translate(36 128) rotate(-24)') +
      R(12, 134, 104, 44, FR, 5) + P('M112 134 L136 134 Q148 138 154 150 L176 158 L176 178 L112 178Z', FR) +
      R(14, 150, 162, 6, Co.white, 0, NO) + P('M118 140 L134 140 Q142 144 146 152 L118 152Z', Co.sky) +
      R(40, 126, 36, 14, '#586174', 4) + Ci(58, 128, 6, '#f0be1f') + Ci(150, 120, 0.1, 'none') +
      wheel(38, 184, 15) + wheel(70, 184, 15) + wheel(148, 184, 15);
  },

  loeschhubschrauber() {
    return SH(100, 214, 80, 6) +
      P('M22 112 L58 106 L58 120 L22 124Z', '#c93a30') + R(10, 100, 10, 30, '#9aa3b2', 3) +
      P('M52 90 Q96 76 134 96 Q148 106 146 124 Q140 140 100 142 Q56 142 48 124Z', FR) +
      P('M120 98 Q138 102 142 118 L120 120Z', Co.sky) + R(54, 120, 90, 7, Co.white, 0, NO) +
      L(100, 78, 100, 90, 'stroke-width="6"') + R(26, 70, 148, 8, '#586174', 4) + L(24, 66, 176, 82, 'stroke="#586174" stroke-width="3" opacity=".5"') +
      L(66, 142, 66, 150, 'stroke-width="4"') + L(124, 142, 124, 150, 'stroke-width="4"') + R(48, 148, 96, 7, '#586174', 3) +
      tube('M84 142 Q86 172 88 182', '#586174', 4) + P('M70 182 Q100 168 130 182 L124 204 Q100 214 76 204Z', '#7f8ba0') + R(82, 196, 36, 6, '#2a6fe0', 0, NO) +
      P('M96 208 Q100 222 100 232 M110 208 Q114 220 112 230', 'none', 'stroke="#6ec6ff" stroke-width="5" opacity=".8"') +
      HL('M62 98 Q84 88 106 90 Q80 96 66 112Z', 0.4);
  },
};

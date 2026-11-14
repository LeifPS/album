import { K, Co, NO, R, Ci, El, P, Pg, L, G, HL, SH, star, tube } from './helpers.js';

const eye = (x, y, r = 4.5) => Ci(x, y, r, K, NO) + Ci(x + r * 0.3, y - r * 0.3, r * 0.3, '#fff', NO);
const bone = (x, y, s, rot = 0) => G(R(-18, -5, 36, 10, '#fff6e0', 4) + Ci(-20, -5, 6.5, '#fff6e0') + Ci(-20, 5, 6.5, '#fff6e0') + Ci(20, -5, 6.5, '#fff6e0') + Ci(20, 5, 6.5, '#fff6e0'), `translate(${x} ${y}) rotate(${rot}) scale(${s})`);

export default {
  verband() {
    return SH(100, 210, 70) +
      G(Ci(0, 0, 58, '#f4efe0') + Ci(0, 0, 58, 'none', 'stroke-dasharray="14 8" stroke-width="2" opacity=".25"') + Ci(0, 0, 36, '#e8e2cf') + Ci(0, 0, 16, '#2a2f3c') + Ci(0, 0, 36, 'none', 'stroke-width="2.5" opacity=".5"'), 'translate(100 126)') +
      P('M42 128 Q38 188 90 198 L168 200 L168 178 L100 176 Q70 168 72 128Z', '#f4efe0') + L(90, 186, 164, 188, 'stroke-width="2.5" opacity=".4"') +
      R(112, 112, 64, 30, '#f0be1f', 4, 'transform="rotate(-8 144 127)" opacity="0"') + HL('M60 100 Q70 76 100 72 Q72 84 66 112Z', 0.6) + Pg(star(144, 80, 9, 3.5, 4), Co.red, 'stroke-width="2.5"');
  },

  wassernapf() {
    return SH(100, 210, 74) +
      P('M26 128 L174 128 L156 196 Q100 212 44 196Z', '#3c82da') + El(100, 128, 74, 18, '#6bc4ff') + El(100, 130, 62, 12, '#9adbff', 'stroke="none"') +
      P('M44 196 L156 196 L152 172 L48 172Z', '#2a62b4', 'opacity=".5" stroke="none"') +
      P('M80 150 Q100 142 120 150', 'none', 'stroke="#fff" stroke-width="4" opacity=".7"') + bone(100, 178, 0.9) +
      Ci(70, 96, 6, '#6bc4ff') + P('M70 80 Q64 90 70 96 Q76 90 70 80Z', '#6bc4ff', 'stroke="none"') + Ci(134, 84, 4, '#6bc4ff');
  },

  katzenkorb() {
    let bars = '';
    for (let i = 0; i < 6; i++) bars += R(54 + i * 18, 92, 6, 78, '#d6dde8', 3);
    return SH(100, 212, 74) +
      tube('M62 92 Q100 34 138 92', '#9aa3b2', 7) +
      R(36, 90, 128, 14, '#7d869a', 6) + R(36, 166, 128, 36, '#7d869a', 8) + bars +
      El(100, 150, 22, 20, '#f2a65a', 'stroke="none"') +
      R(44, 98, 112, 70, '#000', 0, 'opacity=".12" stroke="none"') + R(30, 190, 140, 10, '#586174', 5) +
      Ci(100, 128, 24, '#f2a65a', 'opacity="0"') + R(88, 76, 24, 16, '#c9d1de', 4);
  },

  leine() {
    return SH(100, 212, 70) +
      El(66, 70, 30, 36, 'none', `stroke="${K}" stroke-width="17"`) + El(66, 70, 30, 36, 'none', `stroke="${Co.red}" stroke-width="11"`) +
      tube('M80 100 Q112 130 84 156 Q64 176 104 186', Co.red, 10) +
      R(94, 176, 40, 20, '#c9d1de', 7) + R(100, 182, 18, 8, K, 3, NO) + Ci(140, 186, 9, 'none', `stroke="${K}" stroke-width="9"`) + Ci(140, 186, 9, 'none', 'stroke="#c9d1de" stroke-width="4"') +
      P('M130 90 Q170 90 170 124 Q170 152 134 152 Q130 120 130 90Z', '#7d5a3c') + R(134, 98, 30, 8, '#c9d1de', 3, NO) + Ci(152, 128, 11, '#f0be1f', 'stroke-width="3"') + bone(152, 128, 0.32);
  },

  hund() {
    return SH(100, 212, 66) +
      P('M52 216 Q50 150 66 128 Q76 100 100 94 Q124 100 134 128 Q150 150 148 216Z', '#d9a566') +
      P('M46 100 Q30 132 44 168 Q62 150 64 108Z', '#7d5a3c') + P('M154 100 Q170 132 156 168 Q138 150 136 108Z', '#7d5a3c') +
      Ci(100, 100, 38, '#d9a566') + El(100, 120, 22, 17, '#fff0d4', 'stroke-width="3"') + El(100, 112, 8, 6, K, NO) +
      eye(84, 94) + eye(116, 94) + P('M100 118 L100 128 M90 130 Q100 138 110 130', 'none', 'stroke-width="3"') + El(100, 138, 8, 7, '#f2799f') +
      Ci(100, 176, 7, '#f0be1f', 'stroke-width="3"') + R(66, 160, 68, 8, Co.red, 4) + HL('M70 90 Q78 70 98 68 Q80 80 76 100Z', 0.4);
  },

  katze() {
    return SH(100, 212, 64) +
      P('M54 216 Q48 156 66 132 L134 132 Q152 156 146 216Z', '#f2a65a') +
      P('M56 98 L52 52 L88 76Z', '#f2a65a') + P('M144 98 L148 52 L112 76Z', '#f2a65a') + P('M60 88 L60 66 L76 78Z', '#f2799f', 'stroke="none"') + P('M140 88 L140 66 L124 78Z', '#f2799f', 'stroke="none"') +
      Ci(100, 108, 44, '#f2a65a') + P('M100 66 L100 84 M84 70 L88 84 M116 70 L112 84', 'none', 'stroke="#c27a2d" stroke-width="5"') +
      El(100, 128, 18, 13, '#fff0d4', 'stroke="none"') + Pg('94,118 106,118 100,126', '#f2799f', 'stroke-width="2.5"') + P('M100 126 Q92 134 86 130 M100 126 Q108 134 114 130', 'none', 'stroke-width="3"') +
      El(82, 104, 7, 9, '#9be07a') + El(118, 104, 7, 9, '#9be07a') + El(82, 104, 2.5, 8, K, NO) + El(118, 104, 2.5, 8, K, NO) +
      P('M60 124 L36 118 M60 132 L36 136 M140 124 L164 118 M140 132 L164 136', 'none', 'stroke-width="2.5"');
  },

  kaninchen() {
    return SH(100, 212, 62) +
      El(70, 62, 15, 48, '#e8e2d4') + El(130, 62, 15, 48, '#e8e2d4') + El(70, 66, 7, 34, '#f4a8bd', 'stroke="none"') + El(130, 66, 7, 34, '#f4a8bd', 'stroke="none"') +
      P('M54 216 Q46 160 64 138 L136 138 Q154 160 146 216Z', '#e8e2d4') +
      Ci(100, 118, 44, '#e8e2d4') + El(100, 134, 20, 14, '#fff', 'stroke="none"') + Ci(100, 128, 6, '#f2799f', 'stroke-width="2.5"') + P('M100 134 L100 144 M92 148 Q100 152 108 148', 'none', 'stroke-width="3"') +
      R(94, 146, 12, 12, '#fff', 3, 'stroke-width="2.5"') + eye(80, 112, 5.5) + eye(120, 112, 5.5) +
      Ci(66, 130, 8, '#f4a8bd', 'stroke="none" opacity=".6"') + Ci(134, 130, 8, '#f4a8bd', 'stroke="none" opacity=".6"');
  },

  pferd() {
    return SH(100, 214, 64) +
      P('M60 218 L66 150 Q40 110 66 78 Q82 54 108 50 L134 36 L140 58 Q156 66 156 92 L172 128 Q176 150 150 154 L136 156 L128 218Z', '#a8692f') +
      P('M108 50 L134 36 L140 58 L124 70Z', '#7d4a1f', 'opacity=".5"') + P('M96 44 Q70 52 62 86 Q58 118 70 140 L84 130 Q74 100 88 74 Q100 58 114 56Z', '#2a2f3c') +
      P('M112 38 L112 18 L126 34Z', '#a8692f') + Ci(134, 76, 5.5, K, NO) + Ci(136, 74, 1.8, '#fff', NO) + Ci(160, 112, 4, K, NO) +
      P('M130 90 Q150 96 156 108', 'none', 'stroke="#7d4a1f" stroke-width="3"') + P('M136 62 Q154 82 152 100', 'none', 'stroke="#f4e6c8" stroke-width="7"') +
      HL('M72 130 Q60 100 78 80 Q70 106 84 128Z', 0.25);
  },

  behandlungsraum() {
    return SH(100, 210, 84) +
      R(20, 56, 160, 140, '#d9eef5', 6) + R(20, 160, 160, 36, '#b8d4dc', 0, NO) + R(34, 70, 44, 40, '#fff', 3) + L(56, 70, 56, 110, 'stroke-width="2.5"') + L(34, 90, 78, 90, 'stroke-width="2.5"') +
      P('M30 56 L70 56 L56 70 L40 70Z', Co.red, 'stroke="none" opacity="0"') +
      R(44, 148, 112, 14, '#586174', 5) + R(52, 160, 12, 36, '#586174', 3) + R(136, 160, 12, 36, '#586174', 3) + R(40, 138, 120, 14, '#7ec8b8', 6) +
      R(100, 66, 62, 30, '#fff', 3) + Pg(star(131, 81, 9, 3.6, 4), Co.red, 'stroke-width="2"') +
      R(150, 100, 22, 36, '#c9d1de', 4) + R(154, 94, 14, 8, '#9aa3b2', 3) + Ci(72, 132, 6, '#f2799f', 'stroke-width="3"') + bone(112, 124, 0.6) +
      P('M22 198 L178 198', 'none', 'stroke-width="3"');
  },

  goldenerarztkoffer() {
    const sp = (x, y, s) => `<polygon points="${star(x, y, s, s * 0.3, 4, -90)}" fill="#fff" stroke="#1d1b2e" stroke-width="2.5" stroke-linejoin="round"/>`;
    return SH(100, 212, 72) +
      tube('M72 92 Q72 62 100 62 Q128 62 128 92', '#b98a14', 8) +
      R(32, 90, 136, 110, '#f6d35b', 14) + R(32, 90, 136, 40, '#f0be1f', 14) + R(32, 118, 136, 12, '#f0be1f', 0, NO) +
      R(86, 120, 28, 22, '#c9d1de', 5) + Ci(100, 131, 4, K, NO) +
      R(70, 150, 60, 40, '#fffdf5', 6, 'stroke-width="3"') + P('M100 156 L100 184 M86 170 L114 170', 'none', `stroke="${Co.red}" stroke-width="9" stroke-linecap="butt"`) +
      R(36, 188, 14, 10, '#b98a14', 3, NO) + R(150, 188, 14, 10, '#b98a14', 3, NO) + HL('M40 98 L52 98 L50 190 L42 190Z', 0.5) +
      sp(30, 70, 14) + sp(172, 64, 11) + sp(166, 214, 9) + sp(26, 206, 8);
  },
};

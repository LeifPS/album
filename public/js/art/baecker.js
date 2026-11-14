import { K, Co, NO, R, Ci, El, P, Pg, L, G, HL, SH, star, tube } from './helpers.js';

const dough = '#e0a850', doughD = '#b87326';

export default {
  mehlsack() {
    let ear = '';
    for (let i = 0; i < 3; i++) ear += El(93, 144 + i * 9, 6.5, 3.2, '#d9a520', `stroke-width="1.5" transform="rotate(-35 93 ${144 + i * 9})"`) + El(107, 144 + i * 9, 6.5, 3.2, '#d9a520', `stroke-width="1.5" transform="rotate(35 107 ${144 + i * 9})"`);
    return SH(100, 212, 68) +
      P('M54 90 Q36 140 46 198 Q100 214 154 198 Q164 140 146 90Z', '#efe3c8') +
      P('M58 92 Q100 62 142 92 L148 76 Q100 38 52 76Z', '#d9c9a4') +
      L(62, 92, 138, 92, 'stroke="#9a5b32" stroke-width="7"') +
      R(76, 120, 48, 62, Co.white, 4, 'stroke-width="2.5"') + L(100, 176, 100, 134, 'stroke-width="2.5"') + ear +
      El(100, 208, 62, 8, '#fff', 'opacity=".85" stroke="none"') + Ci(60, 60, 8, '#fff', 'opacity=".7" stroke="none"') + Ci(78, 48, 5, '#fff', 'opacity=".7" stroke="none"') + Ci(140, 56, 7, '#fff', 'opacity=".7" stroke="none"');
  },

  nudelholz() {
    return SH(100, 208, 70) + El(100, 190, 74, 16, '#fff2d0') +
      G(R(-100, -8, 34, 16, Co.wood, 8) + R(66, -8, 34, 16, Co.wood, 8) + R(-70, -22, 140, 44, '#e6b878', 20) +
        HL('M-60 -14 L56 -14 L56 -8 L-60 -8Z', 0.5) + L(-70, 10, 70, 10, 'stroke-width="2" opacity=".3"'),
        'translate(100 126) rotate(-16)') +
      Ci(44, 152, 3, '#fff') + Ci(160, 120, 3, '#fff') + Ci(150, 170, 2.5, '#fff');
  },

  broetchen() {
    const roll = (x, y, s) => G(El(0, 0, 40, 30, dough) + P('M-20 -14 Q-10 -4 -14 10 M0 -18 Q10 -6 6 12 M18 -14 Q26 -4 22 8', 'none', `stroke="${doughD}" stroke-width="4"`) + HL('M-30 -8 Q-24 -24 0 -26 Q-22 -16 -22 0Z', 0.45), `translate(${x} ${y}) scale(${s})`);
    return SH(100, 206, 76) + roll(100, 116, 0.95) + roll(64, 160, 1.05) + roll(138, 162, 1.05);
  },

  backblech() {
    const cookie = (x, y) => Ci(x, y, 13, '#d9a35a') + Ci(x - 4, y - 3, 2.5, '#5b3a1e', NO) + Ci(x + 5, y + 2, 2.5, '#5b3a1e', NO) + Ci(x - 1, y + 6, 2, '#5b3a1e', NO);
    return SH(100, 212, 84) +
      R(2, 150, 14, 10, '#586174', 3) + R(184, 150, 14, 10, '#586174', 3) +
      Pg('30,108 170,108 192,196 8,196', '#9aa3b2') + Pg('40,116 160,116 178,186 22,186', '#6f7889') +
      cookie(68, 136) + cookie(100, 136) + cookie(132, 136) + cookie(58, 164) + cookie(100, 164) + cookie(142, 164) +
      HL('M30 112 L90 112 L70 190 L16 190Z', 0.12);
  },

  schuerze() {
    return SH(100, 214, 68) +
      tube('M78 74 Q100 28 122 74', '#e8473b', 6) +
      L(62, 128, 34, 156, 'stroke-width="6"') + L(138, 128, 166, 156, 'stroke-width="6"') +
      R(72, 68, 56, 62, Co.white, 7) +
      P('M60 120 L140 120 L172 208 L28 208Z', '#f6f6f6') +
      R(76, 160, 48, 32, '#e6e6e6', 6) + L(100, 160, 100, 192, 'stroke-width="2"') +
      P('M31 198 L169 198 L172 208 L28 208Z', Co.red) + Ci(100, 100, 9, Co.red, 'stroke-width="2.5"') +
      HL('M64 126 L84 126 L60 200 L48 200Z', 0.5);
  },

  baeckermuetze() {
    return SH(100, 206, 66) +
      P('M38 150 Q30 86 100 76 Q170 86 162 150Z', Co.white) +
      P('M38 150 Q30 120 50 100 Q40 130 62 150Z', '#e3e8f2', NO) +
      Ci(100, 76, 7, '#e3e8f2') +
      R(36, 146, 128, 30, '#e8eef7', 12) +
      P('M60 94 Q70 120 64 146 M140 94 Q130 120 136 146', 'none', 'stroke-width="2.5" opacity=".5"') +
      L(46, 160, 154, 160, 'stroke="#c3cbe0" stroke-width="2.5"') +
      HL('M48 130 Q50 100 78 90 Q60 108 60 134Z', 0.6);
  },

  brezel() {
    let salt = '';
    for (const [x, y] of [[48, 110], [64, 84], [100, 92], [136, 84], [152, 110], [86, 142], [114, 142], [70, 168], [130, 168], [100, 124]]) salt += Ci(x, y, 3, '#fff', 'stroke-width="1.5"');
    return SH(100, 210, 70) +
      tube('M52 184 Q22 126 46 88 Q68 56 100 88 Q132 56 154 88 Q178 126 148 184', '#c27c36', 20) +
      tube('M148 184 C112 156 96 134 70 94', '#c27c36', 18) + tube('M52 184 C88 156 104 134 130 94', '#c27c36', 18) +
      P('M52 184 Q22 126 46 88 Q68 56 100 88', 'none', 'stroke="#e0a45a" stroke-width="5" opacity=".6"') + salt;
  },

  waage() {
    let ticks = '';
    for (let a = -60; a <= 60; a += 20) { const r = a * Math.PI / 180; ticks += L((100 + 16 * Math.sin(r)).toFixed(1), (176 - 16 * Math.cos(r)).toFixed(1), (100 + 21 * Math.sin(r)).toFixed(1), (176 - 21 * Math.cos(r)).toFixed(1), 'stroke-width="2"'); }
    return SH(100, 212, 66) +
      P('M38 208 L162 208 L152 146 L48 146Z', '#c9d1de') +
      El(100, 142, 60, 9, '#9aa3b2') + R(86, 128, 28, 18, '#9aa3b2', 4) +
      P('M46 112 Q100 156 154 112Z', '#e8ecf3') + El(100, 112, 54, 9, '#c9d1de') +
      Ci(100, 178, 26, '#fffdf5') + ticks + L(100, 178, 112, 164, `stroke="${Co.red}" stroke-width="4"`) + Ci(100, 178, 4, K, NO) +
      HL('M48 150 L62 150 L56 204 L44 204Z', 0.5);
  },

  backofen() {
    return SH(100, 214, 70) +
      R(30, 66, 140, 146, '#9aa3b2', 10) + R(30, 66, 140, 34, '#7d869a', 10) + R(30, 90, 140, 10, '#7d869a', 0, NO) +
      [0, 1, 2, 3].map(i => Ci(54 + i * 31, 84, 8, '#dbe0ea', 'stroke-width="3"') + L(54 + i * 31, 84, 54 + i * 31, 78, 'stroke-width="2.5"')).join('') +
      R(46, 114, 108, 84, '#2a2f3c', 9) + R(54, 122, 92, 68, '#ff9b3d', 5) +
      P('M64 186 Q64 150 86 150 Q108 150 108 186Z', '#c98b4e') + P('M104 186 Q104 156 124 156 Q142 156 142 186Z', '#d9a35a') +
      R(52, 106, 96, 7, '#dbe0ea', 3) + HL('M58 126 L90 126 L74 188 L58 188Z', 0.18) +
      R(44, 210, 14, 8, K, 2) + R(142, 210, 14, 8, K, 2);
  },

  torte() {
    return SH(100, 210, 72) +
      R(34, 148, 132, 52, '#f2799f', 10) + R(50, 108, 100, 46, '#fff2d0', 10) +
      P('M34 156 Q40 176 52 156 Q60 180 72 158 Q82 178 94 158 Q104 182 116 158 Q126 178 138 158 Q148 176 156 158 L166 156 L166 148 L34 148Z', '#fffdf5') +
      P('M50 116 Q58 134 66 116 Q76 136 88 116 Q98 138 110 116 Q120 134 130 116 Q140 130 148 116 L150 108 L50 108Z', '#f2799f') +
      Ci(100, 98, 12, Co.red) + HL('M94 92 Q98 88 104 90 Q98 92 96 98Z', 0.7) + P('M100 86 Q104 72 114 66', 'none', 'stroke-width="3"') +
      [0, 1, 2, 3, 4].map(i => R(64 + i * 18, 176, 8, 8, i % 2 ? Co.yellow : '#fff', 3, 'stroke-width="2"')).join('');
  },
};

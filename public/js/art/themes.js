// Eigene Set-Symbole für die Themenkarten (nicht aus den Kartenmotiven übernommen).
// Koordinaten wie bei den Motiven: 200 x 256.
import { K, Co, NO, R, Ci, El, P, Pg, L, G, HL, SH, star, tube } from './helpers.js';

const sp = (x, y, s) => `<polygon points="${star(x, y, s, s * 0.3, 4, -90)}" fill="#fff" stroke="#1d1b2e" stroke-width="2.5" stroke-linejoin="round"/>`;

export default {
  lehrer() {
    const feather = (x, y) => P(`M${x - 7} ${y} Q${x} ${y + 9} ${x + 7} ${y}`, 'none', 'stroke="#c9a06a" stroke-width="3"');
    return SH(100, 232, 70) +
      R(40, 212, 116, 18, Co.green, 4) + R(46, 214, 104, 4, '#fff6e0', 0, 'stroke="none" opacity=".8"') +
      R(52, 194, 100, 18, Co.red, 4) + R(58, 196, 88, 4, '#fff6e0', 0, 'stroke="none" opacity=".8"') +
      R(46, 176, 108, 18, Co.blue, 4) + R(52, 178, 96, 4, '#fff6e0', 0, 'stroke="none" opacity=".8"') +
      P('M54 96 Q32 130 52 168 Q64 150 66 116Z', '#8a5a2b') + P('M146 96 Q168 130 148 168 Q136 150 134 116Z', '#8a5a2b') +
      P('M56 92 L60 62 L82 80Z', '#a8723a') + P('M144 92 L140 62 L118 80Z', '#a8723a') +
      El(100, 128, 50, 56, '#a8723a') + El(100, 146, 32, 38, '#f2dfb8', 'stroke-width="3"') +
      feather(88, 140) + feather(112, 140) + feather(100, 156) + feather(88, 168) + feather(112, 168) +
      Ci(80, 104, 19, '#fffdf5') + Ci(120, 104, 19, '#fffdf5') + Ci(82, 106, 9, K, NO) + Ci(118, 106, 9, K, NO) + Ci(85, 102, 3, '#fff', NO) + Ci(121, 102, 3, '#fff', NO) +
      Pg('92,116 108,116 100,132', '#ff9b3d', 'stroke-width="3"') +
      El(88, 182, 10, 5, '#ff9b3d', 'stroke-width="3"') + El(112, 182, 10, 5, '#ff9b3d', 'stroke-width="3"') +
      Pg('52,76 100,56 148,76 100,94', '#1f2c52') + R(78, 82, 44, 14, '#2a3a6e', 5) +
      tube('M140 77 Q150 90 146 108', Co.gold, 4) + Ci(146, 112, 6, Co.gold, 'stroke-width="2.5"') + HL('M62 76 L96 62 L90 70 L68 80Z', 0.35);
  },

  astronaut() {
    return SH(100, 232, 66) +
      P('M14 120 A86 24 0 0 1 186 120', 'none', `stroke="${K}" stroke-width="15" transform="rotate(-16 100 120)"`) + P('M14 120 A86 24 0 0 1 186 120', 'none', 'stroke="#f6d35b" stroke-width="9" transform="rotate(-16 100 120)"') +
      Ci(100, 120, 50, '#9a6adf') +
      P('M56 96 Q100 82 144 96 M52 114 Q100 100 148 114 M52 134 Q100 148 148 134 M60 154 Q100 166 140 154', 'none', 'stroke="#c9a8f5" stroke-width="7" opacity=".7" stroke-linecap="round"') +
      HL('M62 92 Q72 72 98 70 Q74 82 70 108Z', 0.45) +
      P('M14 120 A86 24 0 0 0 186 120', 'none', `stroke="${K}" stroke-width="15" transform="rotate(-16 100 120)"`) + P('M14 120 A86 24 0 0 0 186 120', 'none', 'stroke="#f6d35b" stroke-width="9" transform="rotate(-16 100 120)"') +
      P('M30 126 A80 20 0 0 0 170 126', 'none', 'stroke="#fff6bd" stroke-width="3" opacity=".7" transform="rotate(-16 100 120)"') +
      G(P('M0 -26 Q9 -14 9 -2 L9 14 L-9 14 L-9 -2 Q-9 -14 0 -26Z', '#f4f4f4') + Ci(0, -4, 4, '#6bc4ff', 'stroke-width="2.5"') + P('M-9 4 L-18 18 L-9 14Z M9 4 L18 18 L9 14Z', Co.red) + P('M-5 14 Q0 30 5 14Z', '#ff9b3d'), 'translate(158 58) rotate(32) scale(1.1)') +
      Ci(46, 198, 17, '#c9c4d6') + Ci(40, 194, 4, '#aaa5bd', 'stroke="none"') + Ci(52, 206, 3, '#aaa5bd', 'stroke="none"') +
      sp(30, 150, 11) + sp(166, 188, 10) + sp(150, 226, 7) + sp(100, 40, 6);
  },

  baecker() {
    const ear = (x, y, rot) => G(P('M0 0 Q0 -30 0 -62', 'none', 'stroke="#c9981a" stroke-width="3"') + [0, 1, 2, 3].map(i => El(i % 2 ? 6 : -6, -26 - i * 11, 6, 3.6, '#f0be1f', 'stroke-width="2"')).join('') + Ci(0, -64, 4, '#f0be1f', 'stroke-width="2"'), `translate(${x} ${y}) rotate(${rot})`);
    return SH(100, 226, 76) +
      ear(34, 176, -18) + ear(166, 176, 18) +
      P('M92 190 L108 190 L112 230 L88 230Z', '#a8692f') + R(86, 224, 28, 8, '#7d5a3c', 4) +
      El(100, 190, 82, 14, '#d9a566') +
      El(100, 142, 70, 52, '#d08a3a') + P('M42 130 Q48 90 100 88 Q152 90 158 130 Q150 100 100 100 Q50 100 42 130Z', '#e3a550', 'stroke="none"') +
      P('M62 120 Q74 106 86 122 M92 112 Q104 98 116 114 M118 126 Q130 112 142 128', 'none', 'stroke="#f6d89a" stroke-width="7" stroke-linecap="round"') +
      HL('M52 146 Q54 116 80 104 Q64 124 64 150Z', 0.35) +
      P('M70 74 Q60 56 74 44 M100 70 Q90 50 104 38 M130 74 Q120 58 134 46', 'none', 'stroke="#fff" stroke-width="6" opacity=".65" stroke-linecap="round"');
  },

  postbote() {
    return `<g opacity=".95">${El(40, 214, 30, 10, '#fff', 'stroke="none" opacity=".8"')}${El(166, 70, 26, 9, '#fff', 'stroke="none" opacity=".7"')}</g>` +
      P('M44 138 L10 118 L14 156 L48 154Z', '#b8c0d2') +
      El(92, 142, 52, 38, '#e8ebf2') + P('M54 134 Q96 82 138 128 Q100 168 54 134Z', '#c9d1de') + P('M62 134 Q96 100 126 128', 'none', 'stroke="#aab3c8" stroke-width="3"') +
      Ci(140, 104, 26, '#e8ebf2') + Ci(148, 98, 5.5, K, NO) + Ci(150, 96, 1.8, '#fff', NO) + P('M130 124 Q142 132 154 122', 'none', 'stroke="#7d869a" stroke-width="5" opacity=".7" stroke-linecap="round"') +
      Pg('160,104 182,112 160,118', '#ff9b3d', 'stroke-width="3"') +
      G(R(-22, -15, 44, 30, Co.white, 4) + P('M-22 -13 L0 4 L22 -13', 'none', 'stroke-width="2.5"') + Ci(0, 4, 5, Co.red, 'stroke-width="2"'), 'translate(176 146) rotate(14)') +
      L(82, 176, 76, 196, 'stroke="#ff9b3d" stroke-width="5"') + L(104, 176, 110, 196, 'stroke="#ff9b3d" stroke-width="5"') +
      HL('M70 124 Q86 108 108 112 Q84 118 74 136Z', 0.5) + sp(30, 70, 9) + sp(100, 40, 7);
  },

  koch() {
    const whisk = G(R(-5, 40, 10, 44, Co.wood, 5) + El(0, 0, 18, 42, 'none', 'stroke-width="3.5"') + El(0, 0, 8, 42, 'none', 'stroke-width="3.5"') + R(-6, 36, 12, 10, '#c9d1de', 3), 'translate(54 92) rotate(-38)');
    const spoon = G(R(-5, 20, 10, 78, Co.wood, 5) + El(0, 4, 18, 26, '#d9a566'), 'translate(146 92) rotate(38)');
    return SH(100, 228, 70) + spoon + whisk +
      Ci(60, 118, 26, Co.white) + Ci(140, 118, 26, Co.white) + Ci(100, 98, 34, Co.white) +
      R(60, 122, 80, 64, Co.white, 5) + R(60, 168, 80, 30, '#e8eef7', 8) +
      P('M80 120 Q82 150 80 172 M100 124 Q100 150 100 172 M120 120 Q118 150 120 172', 'none', 'stroke-width="2.5" opacity=".3"') +
      L(66, 182, 134, 182, 'stroke="#c3cbe0" stroke-width="3"') + HL('M52 112 Q54 90 78 82 Q62 98 64 120Z', 0.6) + sp(176, 190, 9);
  },

  feuerwehr() {
    const spot = (x, y, r) => Ci(x, y, r, K, NO);
    return SH(100, 228, 66) +
      P('M52 232 Q50 188 64 168 L136 168 Q150 188 148 232Z', '#f6f6f6') + spot(76, 200, 6) + spot(124, 212, 7) + spot(98, 186, 4) + R(60, 168, 80, 12, Co.red, 6) + Ci(100, 188, 7, '#f0be1f', 'stroke-width="2.5"') +
      P('M50 100 Q26 120 34 160 Q54 156 62 118Z', K) + P('M150 100 Q174 120 166 160 Q146 156 138 118Z', K) +
      Ci(100, 118, 46, '#f6f6f6') + spot(124, 98, 8) + spot(74, 112, 6) + spot(132, 126, 5) +
      El(100, 138, 24, 19, '#fff', 'stroke-width="3"') + El(100, 130, 9, 7, K, NO) + P('M100 136 L100 146 M88 148 Q100 156 112 148', 'none', 'stroke-width="3"') + El(100, 156, 8, 8, '#f2799f') +
      Ci(80, 108, 5.5, K, NO) + Ci(120, 108, 5.5, K, NO) + Ci(82, 106, 1.8, '#fff', NO) + Ci(122, 106, 1.8, '#fff', NO) +
      P('M54 88 Q54 38 100 34 Q146 38 146 88Z', Co.red) + P('M48 88 L152 88 Q164 104 144 104 L56 104 Q36 104 48 88Z', '#b92a24') + R(90, 30, 20, 56, '#f0be1f', 8) + P('M86 66 L100 48 L114 66 L100 90Z', Co.white, 'stroke-width="2.5"') + HL('M62 80 Q62 54 88 44 Q72 62 72 84Z', 0.35) +
      P('M168 60 Q176 78 168 88 Q160 78 168 60Z', '#6bc4ff', 'stroke-width="2.5"') + P('M26 80 Q34 98 26 108 Q18 98 26 80Z', '#6bc4ff', 'stroke-width="2.5"');
  },

  polizist() {
    const leaf = (x, y, rot) => El(x, y, 5, 11, '#3fb15a', `stroke-width="2" transform="rotate(${rot} ${x} ${y})"`);
    let lw = '';
    for (let i = 0; i < 6; i++) { const t = i / 5, y = 188 - t * 110, x = 40 + Math.sin(t * 1.2) * 6 - t * 4; lw += leaf(x, y, -20 + t * 40) + leaf(200 - x, y, 20 - t * 40); }
    return SH(100, 228, 70) +
      P('M44 186 Q26 140 44 84', 'none', 'stroke="#2f8a48" stroke-width="5"') + P('M156 186 Q174 140 156 84', 'none', 'stroke="#2f8a48" stroke-width="5"') + lw +
      R(76, 34, 48, 22, '#586174', 6) + P('M82 36 Q82 16 100 16 Q118 16 118 36Z', '#3c82da') + P('M64 32 L50 24 M136 32 L150 24 M100 12 L100 2', 'none', 'stroke="#6ec6ff" stroke-width="5"') +
      P('M100 56 L156 72 L152 128 Q146 170 100 204 Q54 170 48 128 L44 72Z', '#d9dde6') +
      P('M100 68 L144 80 L141 124 Q136 158 100 184 Q64 158 59 124 L56 80Z', '#2a4fa8') +
      `<polygon points="${star(100, 126, 40, 17)}" fill="#f6d35b" stroke="#1d1b2e" stroke-width="3" stroke-linejoin="round"/>` + HL('M64 88 L84 84 L80 130 Q74 150 66 128Z', 0.3);
  },

  tierarzt() {
    const eye = (x, y) => Ci(x, y, 4.5, K, NO) + Ci(x + 1.5, y - 1.5, 1.5, '#fff', NO);
    return SH(100, 228, 74) +
      P('M10 190 Q100 214 190 190 L190 222 Q100 246 10 222Z', '#fffdf5', 'opacity="0"') +
      Ci(100, 60, 22, Co.white) + R(94, 46, 12, 28, Co.red, 2, 'stroke="none"') + R(86, 54, 28, 12, Co.red, 2, 'stroke="none"') + Ci(100, 60, 22, 'none', 'stroke-width="3"') +
      P('M30 110 Q14 130 22 168 Q42 160 48 124Z', '#7d5a3c') +
      Ci(66, 136, 38, '#d9a566') + El(66, 152, 20, 15, '#fff0d4', 'stroke-width="3"') + El(66, 146, 7, 6, K, NO) + P('M66 152 L66 160 M58 162 Q66 170 74 162', 'none', 'stroke-width="3"') + El(66, 172, 7, 8, '#f2799f') + eye(54, 126) + eye(78, 126) +
      P('M126 120 L122 78 L148 98Z', '#f2a65a') + P('M178 120 L182 78 L156 98Z', '#f2a65a') +
      Ci(152, 142, 36, '#f2a65a') + P('M152 108 L152 122 M138 110 L142 122 M166 110 L162 122', 'none', 'stroke="#c27a2d" stroke-width="4"') +
      El(152, 158, 15, 11, '#fff0d4', 'stroke="none"') + Pg('147,150 157,150 152,157', '#f2799f', 'stroke-width="2"') + P('M152 157 Q146 164 140 160 M152 157 Q158 164 164 160', 'none', 'stroke-width="2.5"') +
      El(138, 134, 6, 7.5, '#9be07a') + El(166, 134, 6, 7.5, '#9be07a') + El(138, 134, 2, 6.5, K, NO) + El(166, 134, 2, 6.5, K, NO) +
      G(R(-52, -13, 104, 26, '#f0c89a', 13) + R(-16, -13, 32, 26, '#e0aa78', 0, 'stroke="none"') + Ci(-30, 0, 2, '#c98f5c', NO) + Ci(-40, 0, 2, '#c98f5c', NO) + Ci(30, 0, 2, '#c98f5c', NO) + Ci(40, 0, 2, '#c98f5c', NO), 'translate(100 204) rotate(-6)');
  },

  pilot() {
    const wing = (sx) => G(P('M0 0 Q44 -34 92 -30 L96 -22 Q60 -18 0 14Z', '#f0be1f') + P('M0 10 Q40 -14 86 -10 L88 -2 Q54 0 0 28Z', '#f6d35b') + P('M0 24 Q34 4 76 8 L76 16 Q46 18 0 40Z', '#f0be1f') + P('M0 38 Q28 22 62 26 L60 34 Q38 36 0 52Z', '#f6d35b'), `translate(100 118) scale(${sx} 1)`);
    return SH(100, 228, 76) +
      wing(1) + wing(-1) +
      Ci(100, 120, 46, '#f6d35b') + Ci(100, 120, 38, '#1a4f93', 'stroke-width="3"') + Ci(100, 120, 38, 'none', 'stroke="#fff" stroke-width="2" opacity=".5"') +
      `<polygon points="${star(100, 122, 26, 11)}" fill="#f6d35b" stroke="#1d1b2e" stroke-width="3" stroke-linejoin="round"/>` +
      P('M82 172 L100 196 L118 172Z', Co.red) + P('M70 168 L100 220 L130 168 L118 168 L100 196 L82 168Z', '#f0be1f') + sp(30, 64, 10) + sp(172, 56, 8) + HL('M72 100 Q80 84 98 82 Q80 92 76 108Z', 0.5);
  },

  fussballprofi() {
    const r = 56, cx = 100, cy = 142;
    let ball = Ci(cx, cy, r, '#fff') + Pg(star(cx, cy, r * 0.38, r * 0.38, 5).split(' ').filter((_, i) => i % 2 === 0).join(' '), K, 'stroke="none"');
    for (let i = 0; i < 5; i++) { const a = (i * 72 - 90) * Math.PI / 180; ball += L((cx + Math.cos(a) * r * 0.38).toFixed(1), (cy + Math.sin(a) * r * 0.38).toFixed(1), (cx + Math.cos(a) * r * 0.9).toFixed(1), (cy + Math.sin(a) * r * 0.9).toFixed(1), 'stroke-width="3"') + Ci((cx + Math.cos(a) * r * 0.86).toFixed(1), (cy + Math.sin(a) * r * 0.86).toFixed(1), 7, K, NO); }
    return SH(100, 228, 70) +
      `<polygon points="${star(100, 142, 92, 66, 12, -90)}" fill="#f6d35b" stroke="#1d1b2e" stroke-width="3" stroke-linejoin="round" opacity=".9"/>` +
      ball + HL('M58 128 Q64 100 96 92 Q70 106 68 134Z', 0.55) +
      P('M6 120 L36 126 M2 146 L30 146 M8 170 L38 164', 'none', 'stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".75"') +
      P('M62 56 L72 24 L88 44 L100 18 L112 44 L128 24 L138 56Z', '#f0be1f') + R(62, 52, 76, 12, '#d9a520', 4) + Ci(100, 58, 4, Co.red, 'stroke-width="2"') + Ci(78, 58, 3, '#6bc4ff', 'stroke-width="2"') + Ci(122, 58, 3, '#6bc4ff', 'stroke-width="2"') + sp(176, 60, 10) + sp(26, 206, 9);
  },

  arzt() {
    return SH(100, 228, 70) +
      tube('M58 46 Q22 150 100 206', '#586174', 5) + tube('M142 46 Q178 150 100 206', '#586174', 5) + Ci(58, 44, 6, '#c9d1de', 'stroke-width="3"') + Ci(142, 44, 6, '#c9d1de', 'stroke-width="3"') +
      P('M100 194 C16 140 26 62 68 62 C88 62 100 78 100 88 C100 78 112 62 132 62 C174 62 184 140 100 194Z', Co.red) +
      HL('M44 100 Q44 76 68 72 Q52 84 52 110Z', 0.5) +
      P('M30 128 L72 128 L84 100 L100 156 L114 112 L124 128 L170 128', 'none', `stroke="${K}" stroke-width="12" stroke-linejoin="round" stroke-linecap="round"`) + P('M30 128 L72 128 L84 100 L100 156 L114 112 L124 128 L170 128', 'none', 'stroke="#fff" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"') +
      Ci(100, 208, 13, '#c9d1de', 'stroke-width="3"') + Ci(100, 208, 5, '#586174', NO);
  },

  forscher() {
    return SH(100, 228, 66) +
      Ci(100, 30, 16, '#ffe680') + R(92, 44, 16, 10, '#9aa3b2', 3) + P('M100 6 L100 -4 M80 14 L72 8 M120 14 L128 8 M72 32 L62 32 M128 32 L138 32', 'none', 'stroke="#ffe680" stroke-width="5" stroke-linecap="round"') + P('M94 30 L100 22 L106 30', 'none', 'stroke-width="2.5"') +
      P('M80 72 L80 112 L36 192 Q30 212 52 212 L148 212 Q170 212 164 192 L120 112 L120 72Z', '#d9f0fb') +
      P('M60 158 L140 158 L162 194 Q168 210 148 210 L52 210 Q32 210 38 194Z', '#5be0a8') + El(100, 158, 40, 5, '#9af0cc', 'stroke="none"') +
      R(74, 62, 52, 12, '#c9d1de', 6) + P('M88 76 L88 112 L56 168', 'none', 'stroke="#fff" stroke-width="6" opacity=".65" stroke-linecap="round"') +
      Ci(88, 186, 9, '#fff', 'opacity=".75"') + Ci(116, 176, 6, '#fff', 'opacity=".75"') + Ci(104, 196, 5, '#fff', 'opacity=".75"') + Ci(98, 128, 6, '#9af0cc', 'stroke-width="2.5"') + Ci(110, 104, 4, '#9af0cc', 'stroke-width="2"') +
      sp(34, 96, 10) + sp(170, 112, 11) + sp(160, 60, 7);
  },
};

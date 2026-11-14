import { K, Co, NO, R, Ci, El, P, Pg, L, G, HL, SH, star, tube } from './helpers.js';

const toque = (puff, band) =>
  Ci(62, 92, 26, puff) + Ci(138, 92, 26, puff) + Ci(100, 76, 32, puff) +
  R(62, 98, 76, 70, puff, 4) + R(62, 150, 76, 26, band, 6) +
  P('M80 96 Q82 130 80 150 M100 100 Q100 130 100 150 M120 96 Q118 130 120 150', 'none', 'stroke-width="2.5" opacity=".35"');

export default {
  kochloeffel() {
    return SH(100, 210, 60) +
      G(R(-7, -96, 14, 120, Co.wood, 7) + El(0, 60, 28, 38, '#d9a566') + El(0, 60, 20, 28, '#b8753a', 'stroke="none"') + HL('M-20 36 Q-14 24 -4 26 Q-16 34 -16 52Z', 0.5),
        'translate(100 118) rotate(32)') +
      Ci(46, 190, 3, '#e8473b') + Ci(158, 196, 2.5, '#e8473b');
  },

  topf() {
    return SH(100, 210, 72) +
      P('M72 56 Q64 36 78 24 M100 52 Q92 32 106 18 M126 56 Q118 38 132 26', 'none', 'stroke="#fff" stroke-width="6" opacity=".6"') +
      R(24, 124, 26, 14, '#2a2f3c', 6) + R(150, 124, 26, 14, '#2a2f3c', 6) +
      R(44, 112, 112, 88, '#7d869a', 10) +
      P('M40 114 Q100 64 160 114Z', '#c9d1de') + Ci(100, 78, 9, '#2a2f3c') +
      L(44, 130, 156, 130, 'stroke-width="2.5" opacity=".5"') + HL('M52 134 L66 134 L64 196 L54 196Z', 0.35);
  },

  schneidebrett() {
    const slice = (x, y) => Ci(x, y, 12, '#ff9b3d') + Ci(x, y, 5, '#ffc477', 'stroke="none"');
    return SH(100, 212, 70) + G(
      R(-56, -86, 112, 172, '#d9a566', 16) + Ci(0, -68, 8, '#a8692f') +
      slice(-24, -26) + slice(2, -18) + slice(26, -26) +
      G(R(-8, 0, 16, 62, '#ff9b3d', 8) + Pg('-8,56 8,56 0,76', '#ff9b3d') + P('M-6 -2 Q0 -14 6 -2Z', Co.green), 'translate(-18 14) rotate(-8)') +
      G(Pg('-8,4 8,4 6,66 -8,60', '#dbe0ea') + R(-8, -40, 16, 46, '#2a2f3c', 5) + Ci(0, -26, 2.5, '#c9d1de', NO) + Ci(0, -10, 2.5, '#c9d1de', NO), 'translate(36 18) rotate(10)'),
      'translate(100 130) rotate(-5)');
  },

  pfanne() {
    return SH(100, 208, 82) +
      G(R(0, -9, 66, 18, '#2a2f3c', 8) + Ci(54, 0, 3, '#9aa3b2', NO), 'translate(120 154) rotate(14)') +
      El(86, 140, 76, 60, '#2a2f3c') + El(86, 142, 64, 48, '#586174') +
      El(84, 142, 34, 24, Co.white) + Ci(88, 142, 12, Co.yellow) + HL('M82 136 Q86 132 92 134 Q86 136 84 142Z', 0.7) +
      P('M48 120 Q40 100 52 88 M120 110 Q112 92 124 80', 'none', 'stroke="#fff" stroke-width="5" opacity=".55"') +
      HL('M30 128 Q34 108 56 100 Q40 114 38 134Z', 0.25);
  },

  kochmuetze() { return SH(100, 206, 62) + toque(Co.white, '#e8eef7') + HL('M46 100 Q48 84 66 76 Q52 90 54 108Z', 0.6); },

  salzstreuer() {
    let holes = '', grains = '';
    for (const [x, y] of [[86, 84], [100, 84], [114, 84], [93, 92], [107, 92]]) holes += Ci(x, y, 2.4, K, NO);
    for (const [x, y] of [[150, 186], [162, 200], [48, 196], [38, 184], [152, 170]]) grains += Ci(x, y, 3, '#fff');
    return SH(100, 210, 62) +
      P('M66 100 L134 100 L142 196 Q100 210 58 196Z', '#d9f0fb') +
      P('M62 156 Q100 164 138 156 L142 196 Q100 210 58 196Z', '#fff') +
      R(62, 72, 76, 32, '#c9d1de', 9) + R(66, 100, 68, 6, '#9aa3b2', 2) + holes +
      HL('M72 110 L84 110 L80 190 L70 190Z', 0.55) + grains;
  },

  herd() {
    return SH(100, 214, 72) +
      R(34, 112, 132, 98, '#c9d1de', 8) +
      Pg('34,112 166,112 178,84 22,84', '#2a2f3c') + El(70, 98, 28, 8, 'none', 'stroke="#ff7a3d" stroke-width="5"') + El(130, 98, 28, 8, 'none', 'stroke="#ff7a3d" stroke-width="5"') +
      [0, 1, 2, 3].map(i => Ci(58 + i * 28, 126, 5.5, '#586174', 'stroke-width="2.5"')).join('') +
      R(46, 140, 108, 58, '#7d869a', 6) + R(54, 148, 92, 38, '#2a2f3c', 4) + R(54, 190, 92, 5, '#dbe0ea', 2) +
      HL('M54 152 L84 152 L70 184 L54 184Z', 0.15);
  },

  messerblock() {
    const handle = (x, y, r) => G(R(-6, -46, 12, 50, '#2a2f3c', 5) + Ci(0, -32, 2, '#c9d1de', NO) + Ci(0, -16, 2, '#c9d1de', NO), `translate(${x} ${y}) rotate(${r})`);
    return SH(100, 212, 60) +
      handle(66, 118, -10) + handle(88, 114, -4) + handle(110, 112, 3) + handle(132, 114, 9) +
      P('M46 134 L154 112 L148 206 L54 206Z', '#b8753a') + P('M46 134 L154 112 L154 122 L46 144Z', '#d9a566') +
      L(60, 160, 144, 144, 'stroke-width="2" opacity=".3"') + L(60, 180, 144, 164, 'stroke-width="2" opacity=".3"') + HL('M52 150 L64 148 L62 200 L56 200Z', 0.3);
  },

  gourmetteller() {
    return SH(100, 208, 90) +
      R(16, 130, 10, 64, '#c9d1de', 4) + R(174, 130, 10, 64, '#c9d1de', 4) +
      El(100, 152, 80, 38, Co.white) + El(100, 152, 62, 27, '#eef1f6', 'stroke-width="2"') +
      P('M62 158 Q80 172 100 160 T140 162', 'none', 'stroke="#c0392b" stroke-width="6"') +
      El(100, 140, 30, 16, '#9a5b32') + El(100, 134, 24, 10, '#b8753a', 'stroke="none"') +
      Ci(128, 146, 9, Co.green) + Ci(72, 146, 9, Co.green) + Ci(118, 128, 6, Co.orange) + Ci(84, 130, 6, Co.orange) +
      P('M100 126 Q96 110 106 100 M92 124 Q84 108 94 96', 'none', 'stroke="#fff" stroke-width="5" opacity=".6"') +
      HL('M40 146 Q50 132 72 130 Q54 138 48 150Z', 0.6);
  },

  goldenekochmuetze() {
    const sp = (x, y, s) => `<polygon points="${star(x, y, s, s * 0.3, 4, -90)}" fill="#fff" stroke="#1d1b2e" stroke-width="2.5" stroke-linejoin="round"/>`;
    return SH(100, 206, 62) + toque('#f6d35b', '#d9a520') + HL('M46 100 Q48 84 66 76 Q52 90 54 108Z', 0.7) +
      sp(38, 72, 14) + sp(166, 60, 11) + sp(160, 150, 9) + sp(32, 142, 8);
  },
};

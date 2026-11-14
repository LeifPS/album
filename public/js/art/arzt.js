import { K, Co, NO, R, Ci, El, P, Pg, L, G, HL, SH, star, tube } from './helpers.js';

export default {
  medizinischemaske() {
    const loop = 'M52 112 Q16 98 20 142 Q24 176 58 166';
    return SH(100, 202, 62) +
      tube(loop, '#cfe9f7', 5) + G(tube(loop, '#cfe9f7', 5), 'translate(200 0) scale(-1 1)') +
      P('M44 94 Q100 76 156 94 L160 152 Q100 192 40 152Z', '#bfe3f7') +
      P('M42 112 Q100 128 158 112', 'none', 'stroke-width="2.5" opacity=".6"') +
      P('M41 128 Q100 148 159 128', 'none', 'stroke-width="2.5" opacity=".6"') +
      P('M40 144 Q100 168 160 144', 'none', 'stroke-width="2.5" opacity=".6"') +
      HL('M52 100 Q80 90 104 92 Q72 98 58 118Z', 0.6);
  },

  tabletten() {
    const tab = (x, y, r, c) => Ci(x, y, r, c) + L(x - r * 0.6, y, x + r * 0.6, y, 'stroke-width="2.5"') + HL(`M${x - r * 0.7} ${y - r * 0.25} Q${x - r * 0.4} ${y - r * 0.8} ${x + r * 0.1} ${y - r * 0.8} Q${x - r * 0.3} ${y - r * 0.5} ${x - r * 0.4} ${y - r * 0.1}Z`, 0.55);
    return SH(100, 208, 70) +
      G(R(-36, -15, 72, 30, Co.white, 15) + P('M0 -15 L21 -15 Q36 -15 36 0 Q36 15 21 15 L0 15Z', Co.red) + L(0, -15, 0, 15, 'stroke-width="2.5"') + HL('M-28 -9 Q-24 -12 -8 -12 L-8 -6 L-26 -5Z', 0.6),
        'translate(100 78) rotate(-22)') +
      tab(58, 150, 28, Co.white) + tab(132, 140, 24, Co.yellow) + tab(98, 182, 20, '#8fd3ff') + tab(150, 190, 14, Co.pink);
  },

  stethoskop() {
    return SH(100, 208, 52) +
      tube('M58 56 Q58 122 100 126', '#6b7a99', 6) + tube('M142 56 Q142 122 100 126', '#6b7a99', 6) +
      tube('M100 126 L100 164 Q100 184 126 184', '#6b7a99', 6) +
      Ci(58, 50, 8, '#c9d1de') + Ci(142, 50, 8, '#c9d1de') +
      Ci(140, 184, 24, '#c9d1de') + Ci(140, 184, 16, '#eef1f6') + Ci(140, 184, 6, Co.gray) +
      HL('M122 172 Q130 162 146 164 Q130 170 126 182Z', 0.6);
  },

  dienstausweis() {
    let code = '';
    for (let i = 0; i < 14; i++) code += R(60 + i * 5.6, 188, i % 3 ? 2.4 : 3.6, 10, K, 0, NO);
    return SH(100, 214, 58) +
      tube('M62 18 L92 72', Co.red, 8) + tube('M138 18 L108 72', Co.red, 8) +
      R(88, 62, 24, 18, '#c9d1de', 5) +
      R(46, 76, 108, 132, Co.white, 11) + R(46, 76, 108, 34, Co.teal, 11) + R(46, 96, 108, 14, Co.teal, 0, NO) +
      R(94, 84, 12, 22, '#fff', 2, NO) + R(89, 89, 22, 12, '#fff', 2, NO) +
      R(58, 120, 44, 54, '#cfe6f7', 4, 'stroke-width="2.5"') + Ci(80, 140, 10, '#6b7a99', NO) + P('M62 174 Q80 150 98 174Z', '#6b7a99', NO) +
      R(110, 124, 32, 6, '#9aa3b2', 3, NO) + R(110, 138, 26, 6, '#9aa3b2', 3, NO) + R(110, 152, 32, 6, '#9aa3b2', 3, NO) + code;
  },

  arztkittel() {
    return SH(100, 212, 68) +
      P('M56 66 L100 80 L144 66 L182 100 L174 144 L156 134 L156 208 L44 208 L44 134 L26 144 L18 100Z', Co.white) +
      L(44, 134, 44, 208, 'stroke-width="2.5"') + L(156, 134, 156, 208, 'stroke-width="2.5"') +
      Pg('86,76 100,122 114,76 100,72', Co.teal) +
      Pg('72,70 100,140 62,142 56,94', '#e8eef7') + Pg('128,70 100,140 138,142 144,94', '#e8eef7') +
      R(54, 162, 34, 34, '#e8eef7', 4) + R(112, 162, 34, 34, '#e8eef7', 4) +
      R(66, 150, 6, 26, Co.blue, 2) + R(76, 152, 6, 24, Co.red, 2) +
      L(100, 148, 100, 208, 'stroke-width="2.5"') +
      Ci(92, 156, 3.5, Co.gray) + Ci(92, 178, 3.5, Co.gray) + Ci(92, 198, 3.5, Co.gray) +
      HL('M26 100 L52 86 L48 120 L30 132Z', 0.5);
  },

  krankenakte() {
    return SH(100, 214, 62) +
      G(R(-62, -88, 124, 176, Co.brown, 8) + R(-50, -76, 100, 152, Co.white, 3) + R(-22, -100, 44, 24, '#c9d1de', 6) +
        R(-38, -62, 12, 30, Co.red, 2, 'stroke-width="2.5"') + R(-47, -53, 30, 12, Co.red, 2, 'stroke-width="2.5"') +
        R(-14, -56, 50, 6, '#9aa3b2', 3, NO) + R(-14, -42, 38, 6, '#9aa3b2', 3, NO) +
        P('M-44 20 L-24 20 L-16 2 L-6 44 L6 -8 L14 20 L44 20', 'none', 'stroke="#e8473b" stroke-width="4.5"') +
        R(-44, 52, 88, 6, '#9aa3b2', 3, NO) + R(-44, 64, 62, 6, '#9aa3b2', 3, NO),
        'translate(100 130) rotate(4)');
  },

  roentgen() {
    let spine = '', ribs = '';
    for (let i = 0; i < 10; i++) spine += R(95, 78 + i * 12, 10, 9, '#cfe9ff', 3, NO);
    for (let i = 0; i < 5; i++) {
      const y = 92 + i * 15;
      ribs += P(`M96 ${y} Q58 ${y - 8} ${58 + i * 5} ${y + 28}`, 'none', 'stroke="#cfe9ff" stroke-width="4.5"') +
        P(`M104 ${y} Q142 ${y - 8} ${142 - i * 5} ${y + 28}`, 'none', 'stroke="#cfe9ff" stroke-width="4.5"');
    }
    return SH(100, 214, 68) +
      R(32, 58, 136, 154, '#1a2233', 6) + R(41, 67, 118, 136, '#0b1424', 3) +
      Ci(100, 78, 9, '#cfe9ff', NO) + spine + ribs +
      R(78, 50, 44, 16, '#c9d1de', 5) +
      HL('M46 72 L76 72 L46 120Z', 0.12);
  },

  erstehilfeset() {
    return SH(100, 210, 70) +
      P('M70 92 Q70 62 100 62 Q130 62 130 92', 'none', 'stroke-width="10"') +
      R(28, 88, 144, 116, Co.red, 15) + R(28, 120, 144, 8, '#b32f27', 0, NO) + L(28, 124, 172, 124, 'stroke-width="2.5"') +
      R(90, 112, 20, 22, '#c9d1de', 4) +
      R(88, 140, 24, 52, '#fff', 4, 'stroke-width="3"') + R(75, 152, 50, 26, '#fff', 4, 'stroke-width="3"') + R(88, 152, 24, 26, '#fff', 0, NO) +
      HL('M36 96 Q36 92 44 92 L60 92 L60 116 L36 116Z', 0.3);
  },

  krankenwagen() {
    return SH(100, 188, 80, 6) +
      R(60, 74, 32, 11, Co.blue, 4) + Ci(76, 70, 12, Co.blue, 'opacity=".35" stroke="none"') +
      R(14, 84, 118, 84, Co.white, 8) +
      P('M130 112 L130 84 L156 84 Q172 90 182 112 L188 130 L188 168 L130 168Z', Co.white) +
      R(16, 130, 170, 10, Co.red, 0, NO) +
      P('M138 94 L156 94 Q166 98 172 112 L138 112Z', Co.sky) + R(24, 96, 22, 20, Co.sky, 3) +
      R(78, 92, 14, 34, Co.red, 2) + R(68, 102, 34, 14, Co.red, 2) + R(78, 102, 14, 14, Co.red, 0, NO) +
      R(176, 146, 10, 8, Co.yellow, 2) +
      Ci(52, 168, 18, '#2a2f3c') + Ci(52, 168, 8, '#c9d1de') + Ci(152, 168, 18, '#2a2f3c') + Ci(152, 168, 8, '#c9d1de');
  },

  hermesstab() {
    const wing = 'M94 78 Q60 52 18 68 Q44 74 40 84 Q60 82 56 94 Q76 92 76 104 Q90 100 94 94Z';
    const snake1 = 'M100 102 Q62 118 100 134 Q138 150 100 166 Q70 178 100 192';
    const snake2 = 'M100 102 Q138 118 100 134 Q62 150 100 166 Q130 178 100 192';
    return SH(100, 214, 40) +
      R(94, 56, 12, 152, Co.gold, 3) + Ci(100, 52, 13, Co.gold) +
      P(wing, Co.gold) + G(P(wing, Co.gold), 'translate(200 0) scale(-1 1)') +
      tube(snake1, Co.green, 8) + tube(snake2, '#2f9a49', 8) +
      Ci(86, 100, 8, Co.green) + Ci(114, 100, 8, '#2f9a49') + Ci(84, 98, 2, K, NO) + Ci(116, 98, 2, K, NO) +
      HL('M97 62 L97 200 L99 200 L99 62Z', 0.5);
  },
};

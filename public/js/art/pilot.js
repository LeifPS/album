import { K, Co, NO, R, Ci, El, P, Pg, L, G, HL, SH, star, tube } from './helpers.js';

const gold = '#e8c24a';

// Verkehrsflugzeug von der Seite (Nase rechts), im Bereich x 10..192, y 70..198
const airliner = () =>
  Pg('26,128 12,72 40,72 68,120', Co.red) +
  P('M12 140 Q12 112 62 108 L150 108 Q188 112 192 134 Q186 154 152 156 L52 156 Q12 156 12 140Z', Co.white) +
  P('M16 140 L188 140 Q186 148 152 152 L52 152 Q20 152 16 140Z', Co.blue, NO) +
  P('M164 118 Q184 120 188 132 L164 132Z', Co.sky) +
  [0, 1, 2, 3, 4, 5, 6].map(i => Ci(54 + i * 14, 126, 4.2, Co.sky, 'stroke-width="2"')).join('') +
  Pg('90,146 130,146 92,198 64,198', '#c9d1de') +
  R(86,172,34,16,Co.gray,8);

export default {
  pilotenbrille() {
    const lens = 'M-36 -22 Q-36 -32 -10 -32 Q22 -32 24 -8 Q22 34 -6 36 Q-36 36 -36 -22Z';
    const one = P(lens, 'none', `stroke="${K}" stroke-width="13"`) + P(lens, '#2e3a52', `stroke="${gold}" stroke-width="7"`) +
      HL('M-26 -18 Q-22 -26 -8 -26 L-10 -14Z', 0.55) + HL('M2 0 Q10 0 14 -8 L14 14 Q8 14 2 14Z', 0.18);
    return G(SH(100, 188, 70) +
      L(24, 104, 6, 96, `stroke="${K}" stroke-width="9"`) + L(176, 104, 194, 96, `stroke="${K}" stroke-width="9"`) +
      L(24, 104, 6, 96, `stroke="${gold}" stroke-width="5"`) + L(176, 104, 194, 96, `stroke="${gold}" stroke-width="5"`) +
      G(one, 'translate(58 128)') + G(one, 'translate(142 128) scale(-1 1)') +
      tube('M80 112 Q100 98 120 112', gold, 6) + L(100, 106, 100, 118, `stroke="${gold}" stroke-width="5"`), 'translate(100 128) scale(.9) translate(-100 -128)');
  },

  kopfhoerer() {
    const band = 'M46 132 Q44 54 100 54 Q156 54 154 132';
    return SH(100, 210, 58) +
      tube(band, '#aab4c6', 10) +
      R(28, 112, 36, 66, Co.green, 15) + R(136, 112, 36, 66, Co.green, 15) +
      R(22, 124, 14, 42, '#2a3550', 6) + R(164, 124, 14, 42, '#2a3550', 6) +
      HL('M34 120 Q34 116 42 116 L48 116 L48 140 L34 140Z', 0.35) +
      tube('M32 174 Q30 202 70 198', Co.dgray, 5) + Ci(76, 198, 8, Co.dgray) + Ci(76, 198, 3, '#c9d1de', NO);
  },

  pilotenlizenz() {
    return SH(100, 208, 68) +
      G(R(-70, -48, 140, 96, Co.white, 9) + R(-70, -48, 140, 26, Co.blue, 9) + R(-70, -34, 140, 12, Co.blue, 0, NO) +
        Pg(star(52, -35, 10, 4.5), Co.yellow, 'stroke-width="2"') +
        R(-58, -14, 42, 50, '#cfe6f7', 3, 'stroke-width="2.5"') + Ci(-37, 0, 9, '#6b7a99', NO) + P('M-54 36 Q-37 12 -20 36Z', '#6b7a99', NO) +
        R(-6, -8, 54, 6, '#9aa3b2', 3, NO) + R(-6, 6, 44, 6, '#9aa3b2', 3, NO) + R(-6, 20, 54, 6, '#9aa3b2', 3, NO) +
        P('M-6 36 Q6 26 18 36 T42 36', 'none', 'stroke="#3c82da" stroke-width="3"'),
        'translate(100 128) rotate(-8)');
  },

  pilotenmuetze() {
    return SH(100, 208, 66) +
      P('M36 92 Q36 60 100 60 Q164 60 164 92 L160 122 L40 122Z', Co.white) +
      El(100, 70, 58, 12, '#e9edf5') +
      R(38, 116, 124, 34, Co.navy, 6) +
      Ci(100, 100, 16, Co.yellow, 'stroke-width="3"') + Ci(100, 100, 7, Co.navy, 'stroke="none"') +
      P('M80 102 Q70 92 56 96 Q64 100 60 104 Q70 104 78 110Z', gold, 'stroke-width="2.5"') +
      P('M120 102 Q130 92 144 96 Q136 100 140 104 Q130 104 122 110Z', gold, 'stroke-width="2.5"') +
      P('M42 148 Q100 204 158 148 Q150 172 100 180 Q50 172 42 148Z', K) +
      P('M58 158 Q100 192 142 158', 'none', `stroke="${gold}" stroke-width="3.5"`);
  },

  steuerhorn() {
    const yoke = 'M36 82 Q36 132 100 140 Q164 132 164 82';
    return SH(100, 212, 54) +
      R(90, 132, 20, 72, Co.dgray, 4) + R(66, 196, 68, 14, '#3a4358', 5) +
      tube(yoke, '#2a3550', 15) +
      R(22, 50, 26, 54, '#2a3550', 11) + R(152, 50, 26, 54, '#2a3550', 11) +
      Ci(35, 66, 5.5, Co.red, 'stroke-width="2"') + Ci(165, 66, 5.5, Co.red, 'stroke-width="2"') +
      Ci(35, 84, 4, Co.yellow, 'stroke-width="2"') + Ci(165, 84, 4, Co.yellow, 'stroke-width="2"') +
      Ci(100, 118, 12, Co.yellow) + Ci(100, 118, 5, Co.navy, NO) +
      HL('M26 56 Q26 54 32 54 L36 54 L36 90 L26 90Z', 0.2);
  },

  flugzeug() {
    return G(SH(102, 204, 78, 6) + airliner(), 'translate(100 130) scale(.94) translate(-101 -134)');
  },

  pilotenuniform() {
    return SH(100, 210, 66) +
      P('M60 70 L100 82 L140 70 L176 94 L180 208 L20 208 L24 94Z', Co.navy) +
      Pg('84,76 100,138 116,76 100,70', Co.white) +
      Pg('84,76 100,138 66,150 52,98', '#2b3c6e') + Pg('116,76 100,138 134,150 148,98', '#2b3c6e') +
      Pg('96,92 104,92 108,152 100,164 92,152', Co.red) + Pg('94,84 106,84 104,95 96,95', '#c93a30') +
      R(24, 84, 38, 11, '#2b3c6e', 2, 'transform="rotate(-18 43 90)"') +
      R(138, 84, 38, 11, '#2b3c6e', 2, 'transform="rotate(18 157 90)"') +
      [0, 1, 2].map(i => R(30 + i * 10, 86, 6, 8, gold, 1, 'stroke-width="1.5" transform="rotate(-18 43 90)"')).join('') +
      [0, 1, 2].map(i => R(140 + i * 10, 86, 6, 8, gold, 1, 'stroke-width="1.5" transform="rotate(18 157 90)"')).join('') +
      Ci(100, 176, 4.5, gold, 'stroke-width="2"') + Ci(100, 196, 4.5, gold, 'stroke-width="2"') +
      P('M120 126 Q132 118 146 126 Q132 132 120 126Z', Co.yellow, 'stroke-width="2.5"') + Ci(133, 126, 3, Co.navy, NO) +
      L(36, 190, 36, 208, `stroke="${gold}" stroke-width="3"`) + L(164, 190, 164, 208, `stroke="${gold}" stroke-width="3"`);
  },

  flugprotokoll() {
    const wing = 'M0 -6 Q-18 -22 -42 -14 Q-32 -8 -36 -2 Q-22 -2 -18 4 Q-10 4 0 6Z';
    return SH(100, 212, 66) +
      G(R(-52, -76, 112, 156, '#fff6e0', 4) + R(-52, -76, 112, 156, 'none', 4, 'opacity="0"') +
        R(-62, -86, 112, 156, '#6b3b1f', 6) + R(-62, -86, 18, 156, '#4d2812', 6) +
        G(P(wing, gold, 'stroke-width="2.5"'), 'translate(-4 -22)') + G(P(wing, gold, 'stroke-width="2.5"'), 'translate(-4 -22) scale(-1 1)') +
        Ci(-4, -22, 6, gold, 'stroke-width="2.5"') +
        R(-30, 16, 52, 6, gold, 3, NO) + R(-22, 30, 36, 5, gold, 2.5, 'opacity=".7" stroke="none"') +
        R(12, 66, 11, 44, Co.red, 2),
        'translate(100 126) rotate(-4)');
  },

  flug() {
    const cloud = (x, y, s) => G(Ci(0, 0, 20, '#fff') + Ci(22, 6, 15, '#fff') + Ci(-22, 8, 14, '#fff') + R(-30, 6, 62, 14, '#fff', 0, NO), `translate(${x} ${y}) scale(${s})`);
    return cloud(46, 206, 1.15) + cloud(150, 214, 0.9) +
      P('M26 188 Q54 158 82 150', 'none', 'stroke="#fff" stroke-width="12" opacity=".65"') +
      G(El(0, 0, 12, 62, Co.white) + Pg('-8,-4 -70,30 -70,42 -8,22', '#c9d1de') + Pg('8,-4 70,30 70,42 8,22', '#c9d1de') +
        Pg('-6,46 -28,62 -28,70 -6,60', '#c9d1de') + Pg('6,46 28,62 28,70 6,60', '#c9d1de') +
        P('M-12 -40 Q0 -70 12 -40Z', Co.sky) + R(-3, 28, 6, 30, Co.red, 3, NO) + El(-40, 20, 8, 12, Co.gray) + El(40, 20, 8, 12, Co.gray),
        'translate(112 108) rotate(38)');
  },

  landung() {
    let lights = '';
    for (let i = 0; i <= 5; i++) {
      const t = i / 5, y = 134 + t * 90, xl = 86 - 78 * t, xr = 114 + 78 * t, r = 2 + t * 2.6;
      lights += Ci(xl.toFixed(1), y.toFixed(1), r * 2.4, Co.yellow, 'opacity=".28" stroke="none"') + Ci(xr.toFixed(1), y.toFixed(1), r * 2.4, Co.yellow, 'opacity=".28" stroke="none"') +
        Ci(xl.toFixed(1), y.toFixed(1), r, Co.yellow, 'stroke-width="1.5"') + Ci(xr.toFixed(1), y.toFixed(1), r, Co.yellow, 'stroke-width="1.5"');
    }
    const dashes = [[134, 3, 7], [150, 4, 10], [170, 5, 14], [196, 7, 20]]
      .map(([y, w, h]) => R(100 - w / 2, y, w, h, '#fff', 0, NO)).join('');
    return Pg('84,130 116,130 196,232 4,232', '#4a5163') + dashes + lights +
      G(airliner() + Ci(60, 170, 8, '#2a2f3c') + Ci(138, 168, 8, '#2a2f3c') + Ci(60, 170, 3.5, '#c9d1de', NO) + Ci(138, 168, 3.5, '#c9d1de', NO) + L(60, 156, 60, 168) + L(138, 156, 138, 166),
        'translate(30 22) scale(.72) rotate(9 100 130)');
  },
};

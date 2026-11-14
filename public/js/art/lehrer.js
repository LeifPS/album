import { K, Co, NO, R, Ci, El, P, Pg, L, G, HL, SH, star } from './helpers.js';

const book = (x, y, w, h, col, rot = 0) => G(
  R(x, y, w, h, col, 4) +
  R(x + w - 12, y + 4, 9, h - 8, '#fff6e0', 2, 'stroke-width="2"') +
  R(x + 9, y, 8, h, '#000', 0, 'opacity=".15" stroke="none"') +
  L(x + 26, y + h / 2, x + w - 28, y + h / 2, 'stroke="#fff" stroke-width="3" opacity=".75"'),
  `rotate(${rot} ${x + w / 2} ${y + h / 2})`);

const stick = c =>
  R(-14, -64, 28, 128, c, 7) +
  R(-14, -64, 28, 22, '#fff', 7, 'opacity=".35" stroke="none"') +
  L(-14, -30, 14, -30, 'stroke-width="2" opacity=".4"');

const desk = (x, y, s) => G(
  R(2, -26, 26, 20, '#d9a566', 4) + L(6, -4, 4, 18) + L(36, -4, 38, 18) + R(0, -6, 44, 9, Co.wood, 2) + L(18, 3, 18, 18), `translate(${x} ${y}) scale(${s})`);

export default {
  geodreieck() {
    let ticks = '';
    for (let ang = 0; ang <= 180; ang += 10) {
      const r = ang / 180 * Math.PI, ca = Math.cos(r), sa = Math.sin(r), l = ang % 30 ? 5 : 9;
      ticks += L((100 - 50 * ca).toFixed(1), (170 - 50 * sa).toFixed(1), (100 - (50 - l) * ca).toFixed(1), (170 - (50 - l) * sa).toFixed(1), 'stroke-width="2"');
    }
    let rule = '';
    for (let i = 0; i <= 14; i++) rule += L(26 + i * 10.6, 170, 26 + i * 10.6, i % 5 ? 163 : 157, 'stroke-width="2"');
    return SH(100, 186, 80) +
      Pg('16,170 184,170 100,86', '#a9e6f7', 'opacity=".95"') +
      P('M50 170 A50 50 0 0 1 150 170', 'none', 'stroke-width="2.5"') + ticks + rule +
      L(100, 170, 100, 138, 'stroke-width="2.5"') + Ci(100, 138, 3, K, NO) +
      HL('M26 164 L100 94 L106 102 L40 164Z', 0.5);
  },

  schulbuecher() {
    return SH(100, 202, 78) +
      book(26, 158, 148, 38, Co.blue) +
      book(38, 122, 126, 36, Co.red, -2) +
      book(30, 88, 134, 34, Co.green, 2) +
      P('M150 88 L150 62 L162 70 L174 62 L174 90', Co.yellow, 'stroke-width="3"');
  },

  kreide() {
    return SH(100, 208, 70) +
      G(stick(Co.yellow), 'translate(58 136) rotate(-20)') +
      G(stick(Co.pink), 'translate(102 130) rotate(2)') +
      G(stick('#5bb0f0'), 'translate(146 136) rotate(22)') +
      Ci(38, 198, 4, '#fff') + Ci(52, 206, 3, '#fff') + Ci(160, 200, 3.5, '#fff') + Ci(172, 192, 2.5, '#fff');
  },

  tafel() {
    return SH(100, 210, 78) +
      L(40, 180, 32, 206, 'stroke-width="6"') + L(160, 180, 168, 206, 'stroke-width="6"') +
      R(20, 70, 160, 112, '#a8652f', 6) + R(29, 79, 142, 94, '#2f6b52', 3) +
      Pg('46,150 70,106 94,150', 'none', 'stroke="#fff" stroke-width="3" opacity=".9"') +
      L(108, 100, 154, 100, 'stroke="#fff" stroke-width="3" opacity=".85"') +
      L(108, 114, 140, 114, 'stroke="#fff" stroke-width="3" opacity=".85"') +
      L(108, 128, 154, 128, 'stroke="#fff" stroke-width="3" opacity=".85"') +
      P('M110 150 Q122 138 134 150 T158 150', 'none', 'stroke="#ffd43b" stroke-width="3"') +
      R(24, 176, 152, 10, '#7a4620', 3) + R(40, 168, 24, 7, '#fff', 3) + R(122, 164, 28, 12, Co.yellow, 3);
  },

  schultasche() {
    return SH(100, 210, 62) +
      P('M80 82 Q80 54 100 54 Q120 54 120 82', 'none', 'stroke-width="10"') +
      R(30, 128, 24, 50, '#b32f27', 10) + R(146, 128, 24, 50, '#b32f27', 10) +
      R(42, 76, 116, 132, Co.red, 20) +
      P('M42 112 Q42 76 78 76 L122 76 Q158 76 158 112 L158 150 L42 150Z', '#cf3b30') +
      R(90, 136, 20, 26, Co.yellow, 4) + L(100, 144, 100, 154, 'stroke-width="2.5"') +
      R(56, 168, 88, 32, '#f2685c', 10) + L(100, 168, 100, 200, 'stroke-width="2.5"') +
      R(52, 90, 14, 50, '#fff', 4, 'opacity=".45" stroke="none"') + HL('M52 90 Q52 84 60 84 L66 84 L66 130 L52 130Z', 0.25);
  },

  globus() {
    return SH(100, 212, 54) + R(68, 198, 64, 12, Co.brown, 5) + R(94, 176, 12, 24, Co.wood, 2) +
      G(
        Ci(100, 122, 58, Co.blue) +
        P('M78 100 Q92 90 104 100 Q112 118 100 140 Q92 152 84 138 Q74 120 78 100Z', Co.green) +
        P('M58 98 Q66 88 72 96 L70 112 Q60 120 56 108Z', Co.green) +
        P('M118 96 Q136 90 146 106 Q140 122 124 120 Q114 110 118 96Z', Co.green) +
        P('M120 144 Q136 142 138 154 Q126 162 118 154Z', Co.green) +
        P('M100 64 Q134 122 100 180', 'none', 'stroke-width="2" opacity=".35"') +
        P('M42 122 Q100 138 158 122', 'none', 'stroke-width="2" opacity=".35"') +
        HL('M64 100 Q70 78 96 72 Q78 86 74 106Z', 0.5),
        'rotate(-14 100 122)') +
      P('M44.3 83 A68 68 0 0 0 117.6 187.7', 'none', 'stroke="#1d1b2e" stroke-width="12"') +
      P('M44.3 83 A68 68 0 0 0 117.6 187.7', 'none', 'stroke="#e0a63a" stroke-width="7"');
  },

  projektor() {
    return SH(100, 212, 62) +
      Pg('90,178 110,178 162,124 38,124', '#ffe98a', 'opacity=".6" stroke="none"') +
      R(34, 46, 132, 80, '#fffdf5', 4) + R(41, 53, 118, 66, '#bfe3f7', 2) +
      Ci(72, 78, 9, Co.yellow, 'stroke-width="2.5"') +
      P('M41 119 Q68 92 98 108 Q128 88 159 119Z', Co.green, 'stroke-width="2.5"') +
      R(54, 172, 92, 36, '#dbe0ea', 9) + Ci(100, 188, 12, '#2a3550') + Ci(100, 188, 5.5, '#6fd0ff', NO) +
      L(64, 200, 82, 200, 'stroke-width="2.5"') + L(118, 200, 136, 200, 'stroke-width="2.5"') +
      R(64, 208, 10, 6, K, 2) + R(126, 208, 10, 6, K, 2);
  },

  klassenzimmer() {
    let planks = '';
    for (let i = 0; i < 6; i++) planks += L(-4 + i * 42, 226, 8 + i * 37, 158, 'stroke-width="1.5" opacity=".4"');
    return R(8, 54, 184, 104, '#f1ead2', 4) +
      R(34, 66, 132, 52, '#a8652f', 3) + R(39, 71, 122, 42, '#2f6b52', 2) +
      L(48, 86, 100, 86, 'stroke="#fff" stroke-width="2.5" opacity=".85"') + L(48, 98, 82, 98, 'stroke="#fff" stroke-width="2.5" opacity=".85"') +
      Ci(176, 76, 10, '#fffdf5', 'stroke-width="2.5"') + L(176, 76, 176, 70, 'stroke-width="2"') + L(176, 76, 181, 78, 'stroke-width="2"') +
      Pg('8,158 192,158 204,228 -4,228', '#d9a566') + planks +
      desk(52, 168, 0.7) + desk(106, 168, 0.7) +
      desk(18, 200, 1.1) + desk(110, 200, 1.1);
  },

  hausaufgaben() {
    let lines = '';
    for (let i = 0; i < 5; i++) {
      const y = 120 + i * 14;
      lines += L(34, y, 90, y + 9, 'stroke="#9fc4e6" stroke-width="2"') + L(110, y + 9, 166, y, 'stroke="#9fc4e6" stroke-width="2"');
    }
    return SH(100, 208, 82) +
      Pg('16,98 100,112 184,98 184,194 100,208 16,194', Co.blue) +
      Pg('24,102 98,114 98,196 24,184', '#fffdf5') + Pg('102,114 176,102 176,184 102,196', '#fffdf5') +
      lines +
      P('M40 104 L58 107', 'none', 'stroke="#e8473b" stroke-width="4"') +
      G(R(-8, -64, 16, 100, Co.yellow, 2) + R(-8, -66, 16, 12, '#f2799f', 4) + R(-8, -54, 16, 6, '#c0c7d4', 0) +
        Pg('-8,36 8,36 0,58', Co.skin) + Pg('-3.5,50 3.5,50 0,58', K, NO), 'translate(142 122) rotate(35)');
  },

  perfektenote() {
    let grid = '';
    for (let i = -4; i <= 4; i++) {
      grid += L(i * 14, -76, i * 14, 76, 'stroke="#b9d9f2" stroke-width="1.5"');
    }
    for (let j = -5; j <= 5; j++) grid += L(-56, j * 14, 56, j * 14, 'stroke="#b9d9f2" stroke-width="1.5"');
    return SH(100, 214, 66) +
      G(R(-62, -84, 124, 168, '#fffdf5', 4) + grid +
        P('M-34 -6 Q-36 -52 4 -54 Q46 -52 44 -4 Q42 38 -2 38 Q-42 36 -34 -6Z', 'none', 'stroke="#e8473b" stroke-width="6"') +
        P('M-10 -28 L8 -42 L8 22', 'none', 'stroke="#e8473b" stroke-width="10"') +
        P('M-14 22 L30 22', 'none', 'stroke="#e8473b" stroke-width="9"'),
        'translate(100 128) rotate(-6)') +
      Pg(star(154, 72, 28, 13), Co.yellow, 'stroke-width="3.5"') + HL('M146 62 L154 50 L158 64Z', 0.6);
  },
};

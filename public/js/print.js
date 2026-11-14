// Druck-Layout und PDF-Erzeugung: A4, Packs Klein (4 Karten, halbe Seite) und Jumbo (8 Karten, ganze Seite).
// Vorderseite: Karten mit Anschnitt und Schnittlinien. Rückseite: fortlaufendes Muster + Info-Feld, spiegelbar und mit Versatz.
import { CARD_BY_ID, RARITIES } from './data.js';
import { cardSVG } from './card.js';
import { SIZES } from './draw.js';
import { rarityShape } from './icons.js';
import { makePDF } from './pdf.js';

export const DPI = 300;
export const PX = DPI / 25.4;
export const PAGE = { W: 210, H: 297 };
export const LAY = { cw: 45, ch: 70, bleed: 1.5, gap: 4, over: 4, x0: 9, cols: 4 };
const mm = v => v * PX;
const PW = Math.round(mm(PAGE.W)), PH = Math.round(mm(PAGE.H));

// ---- Layout ---------------------------------------------------------------

const SLOT = {
  full:   { gridY: 12,    rows: 2, panelY: 166,   panelH: 120 },
  top:    { gridY: 12,    rows: 1, panelY: 92,    panelH: 46 },
  bottom: { gridY: 158.5, rows: 1, panelY: 238.5, panelH: 47.5 },
};

function makeSlot(pack, where) {
  const g = SLOT[where];
  const gridW = LAY.cols * LAY.cw + (LAY.cols - 1) * LAY.gap;
  const gridH = g.rows * LAY.ch + (g.rows - 1) * LAY.gap;
  const cards = pack.cards.map((id, i) => ({
    id, x: LAY.x0 + (i % LAY.cols) * (LAY.cw + LAY.gap), y: g.gridY + Math.floor(i / LAY.cols) * (LAY.ch + LAY.gap),
  }));
  return {
    pack, where, cards, grid: { x: LAY.x0, y: g.gridY, w: gridW, h: gridH, rows: g.rows },
    block: { x: LAY.x0 - LAY.over, y: g.gridY - LAY.over, w: gridW + 2 * LAY.over, h: gridH + 2 * LAY.over },
    panel: { x: LAY.x0, y: g.panelY, w: gridW, h: g.panelH },
  };
}

export function planSheets(packs) {
  const sheets = [];
  let open = null;
  for (const p of packs) {
    if (p.size === 'jumbo') sheets.push({ slots: [makeSlot(p, 'full')] });
    else if (open) { open.slots.push(makeSlot(p, 'bottom')); open = null; }
    else { open = { slots: [makeSlot(p, 'top')] }; sheets.push(open); }
  }
  return sheets;
}

// Rechteck der Rückseite zu einem Rechteck der Vorderseite (Wende-Art und Versatz-Korrektur)
export function backRect(r, S, corr = true) {
  const X = r.x + (corr ? S.offsetX : 0), Y = r.y + (corr ? S.offsetY : 0);
  return S.flip === 'short'
    ? { x: X, y: PAGE.H - (Y + r.h), w: r.w, h: r.h }
    : { x: PAGE.W - (X + r.w), y: Y, w: r.w, h: r.h };
}

// ---- Zeichnen -------------------------------------------------------------

const pageCanvas = () => {
  const c = document.createElement('canvas');
  c.width = PW; c.height = PH;
  return c;
};

async function svgImg(svg, w, h) {
  const img = new Image();
  img.width = w; img.height = h;
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  await img.decode();
  return img;
}

const cardImgs = new Map();
async function cardImg(id) {
  if (!cardImgs.has(id)) {
    const px = Math.round(mm(LAY.cw + 2 * LAY.bleed));
    cardImgs.set(id, svgImg(cardSVG(CARD_BY_ID[id], { bleed: true, round: false, px }), px, Math.round(px * (700 + 30) / (450 + 30))));
  }
  return cardImgs.get(id);
}

function rarityGradient(ctx, r, x, y, w, h) {
  const g = ctx.createLinearGradient(x, y, x + w, y + h);
  const st = RARITIES[r].stops;
  st.forEach((c, i) => g.addColorStop(i / (st.length - 1), c));
  return g;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}

let tilePattern = null;
function backPattern(ctx) {
  const s = Math.round(mm(10));
  const t = document.createElement('canvas');
  t.width = t.height = s;
  const c = t.getContext('2d');
  c.fillStyle = '#16224a'; c.fillRect(0, 0, s, s);
  c.strokeStyle = '#2d428f'; c.lineWidth = mm(0.5);
  c.beginPath(); c.moveTo(s / 2, 0); c.lineTo(s, s / 2); c.lineTo(s / 2, s); c.lineTo(0, s / 2); c.closePath(); c.stroke();
  c.strokeStyle = '#223575'; c.lineWidth = mm(0.35);
  c.beginPath(); c.moveTo(s / 2, s * 0.22); c.lineTo(s * 0.78, s / 2); c.lineTo(s / 2, s * 0.78); c.lineTo(s * 0.22, s / 2); c.closePath(); c.stroke();
  c.fillStyle = '#ffd43b'; c.globalAlpha = 0.8;
  const d = s * 0.07;
  c.beginPath(); c.moveTo(s / 2, s / 2 - d); c.lineTo(s / 2 + d, s / 2); c.lineTo(s / 2, s / 2 + d); c.lineTo(s / 2 - d, s / 2); c.closePath(); c.fill();
  c.globalAlpha = 0.6; c.fillStyle = '#5d7bd6';
  for (const [x, y] of [[0, 0], [s, 0], [0, s], [s, s]]) { c.beginPath(); c.arc(x, y, s * 0.045, 0, 7); c.fill(); }
  return ctx.createPattern(t, 'repeat');
}

function fitFont(ctx, text, weight, mmSize, maxMM) {
  let size = mmSize;
  for (let i = 0; i < 40; i++) {
    ctx.font = `${weight} ${mm(size)}px "Helvetica Neue", Arial, sans-serif`;
    if (ctx.measureText(text).width <= mm(maxMM) || size < 2) break;
    size *= 0.94;
  }
  return size;
}

async function drawPanel(ctx, r, pack) {
  const u = r.h > 70 ? 2 : 1;
  const { x, y, w, h } = r;
  const rid = pack.rarity;
  roundRect(ctx, mm(x), mm(y), mm(w), mm(h), mm(4));
  ctx.fillStyle = '#101a3a'; ctx.fill();
  ctx.lineWidth = mm(1.4); ctx.strokeStyle = rarityGradient(ctx, rid, mm(x), mm(y), mm(w), mm(h)); ctx.stroke();

  const sym = 30 * u;
  const stops = RARITIES[rid].stops.map((c, i, a) => `<stop offset="${(i / (a.length - 1)).toFixed(3)}" stop-color="${c}"/>`).join('');
  const symSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${Math.round(mm(sym))}" height="${Math.round(mm(sym))}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">${stops}</linearGradient></defs>${rarityShape(rid, 'url(#g)')}</svg>`;
  const sx = x + 8 * u, sy = y + (h - sym) / 2;
  ctx.drawImage(await svgImg(symSVG, Math.round(mm(sym)), Math.round(mm(sym))), mm(sx), mm(sy), mm(sym), mm(sym));

  const tx = sx + sym + 8 * u, maxW = x + w - tx - 8 * u;
  const lines = [];
  const k = u === 1 ? 0.88 : 1;     // kleines Feld: etwas kompakter, damit alles Platz hat
  lines.push({ t: pack.name, wgt: '800', size: 9 * u * k, col: '#ffffff' });
  lines.push({ t: `Für ${pack.profileName}`, wgt: '800', size: 13 * u * k, col: '#ffd43b' });
  lines.push({ t: `${SIZES[pack.size].name}-Pack, ${SIZES[pack.size].count} Karten, ${RARITIES[rid].name}`, wgt: '600', size: 5 * u * k, col: '#c8d2f2' });
  if (pack.label) lines.push({ t: pack.label, wgt: '600', size: 5 * u * k, col: '#c8d2f2' });
  const gap = 1.6 * u;
  const total = lines.reduce((s, l) => s + l.size, 0) + gap * (lines.length - 1);
  const noteH = 3.4 * u;
  const room = h - noteH - 6 * u;                  // Platz über der Hinweiszeile
  let cy = y + Math.max(3.5 * u, (room - total) / 2 + 1.5 * u);
  ctx.textBaseline = 'top'; ctx.textAlign = 'left';
  for (const l of lines) {
    const sz = fitFont(ctx, l.t, l.wgt, l.size, maxW);
    ctx.fillStyle = l.col;
    ctx.fillText(l.t, mm(tx), mm(cy));
    cy += l.size + gap;
  }
  const small = noteH;
  const note = 'Umdrehen und aufdecken. Entlang der gestrichelten Linien ausschneiden.';
  const sz = fitFont(ctx, note, '500', small, maxW);
  ctx.fillStyle = '#8f9cc8';
  ctx.fillText(note, mm(tx), mm(y + h - small - 3 * u));
}

function dashed(ctx, x1, y1, x2, y2, solid = false) {
  ctx.setLineDash(solid ? [] : [mm(1.6), mm(1.2)]);
  ctx.beginPath(); ctx.moveTo(mm(x1), mm(y1)); ctx.lineTo(mm(x2), mm(y2)); ctx.stroke();
}

function drawCutMarks(ctx, sheet) {
  ctx.strokeStyle = '#444'; ctx.lineWidth = mm(0.25);
  for (const s of sheet.slots) {
    const { x, y, w, h, rows } = s.grid;
    for (let c = 1; c < LAY.cols; c++) {
      const gxc = x + c * (LAY.cw + LAY.gap) - LAY.gap / 2;
      dashed(ctx, gxc, y - 3.5, gxc, y + h + 3.5);
    }
    if (rows === 2) { const gy = y + LAY.ch + LAY.gap / 2; dashed(ctx, x - 4.5, gy, x + w + 4.5, gy); }
    // Eckmarken außen
    for (const ex of [x, x + w]) { dashed(ctx, ex, y - 4.5, ex, y - 2.5, true); dashed(ctx, ex, y + h + 2.5, ex, y + h + 4.5, true); }
    for (const ey of [y, y + h]) { dashed(ctx, x - 4.5, ey, x - 2.5, ey, true); dashed(ctx, x + w + 2.5, ey, x + w + 4.5, ey, true); }
  }
  if (sheet.slots.length === 2) { ctx.strokeStyle = '#777'; dashed(ctx, 4.5, PAGE.H / 2, PAGE.W - 4.5, PAGE.H / 2); }
  ctx.setLineDash([]);
}

export async function drawFront(ctx, sheet, S) {
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, PW, PH);
  ctx.imageSmoothingQuality = 'high';
  for (const slot of sheet.slots) {
    for (const c of slot.cards) {
      const img = await cardImg(c.id);
      ctx.drawImage(img, mm(c.x - LAY.bleed), mm(c.y - LAY.bleed), mm(LAY.cw + 2 * LAY.bleed), mm(LAY.ch + 2 * LAY.bleed));
    }
    if (!S.duplex) await drawPanel(ctx, slot.panel, slot.pack);
  }
  if (S.cutMarks) drawCutMarks(ctx, sheet);
}

export async function drawBack(ctx, sheet, S) {
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, PW, PH);
  const pat = backPattern(ctx);
  for (const slot of sheet.slots) {
    const b = backRect(slot.block, S);
    ctx.fillStyle = pat; ctx.fillRect(mm(b.x), mm(b.y), mm(b.w), mm(b.h));
    await drawPanel(ctx, backRect(slot.panel, S), slot.pack);
  }
}

const toJpeg = canvas => new Promise((res, rej) => canvas.toBlob(async b => {
  if (!b) return rej(new Error('JPEG konnte nicht erzeugt werden'));
  res({ jpeg: new Uint8Array(await b.arrayBuffer()), w: canvas.width, h: canvas.height });
}, 'image/jpeg', 0.92));

const PT = { W: 595.276, H: 841.89 };

// packs: [{ name, label, size, rarity, profile, profileName, cards }]
export async function renderPDF(packs, S, onProgress = () => {}) {
  const sheets = planSheets(packs);
  const canvas = pageCanvas();
  const ctx = canvas.getContext('2d');
  const pages = [];
  const total = sheets.length * (S.duplex ? 2 : 1);
  let done = 0;
  for (const sheet of sheets) {
    await drawFront(ctx, sheet, S); pages.push(await toJpeg(canvas)); onProgress(++done, total);
    if (S.duplex) { await drawBack(ctx, sheet, S); pages.push(await toJpeg(canvas)); onProgress(++done, total); }
  }
  return { bytes: makePDF(pages, PT.W, PT.H), sheets: sheets.length, pages: pages.length };
}

// ---- Testseite zum Ausmessen des Rückseiten-Versatzes --------------------------

const TEST_POINTS = [[25, 30], [160, 42], [40, 150], [175, 165], [30, 262], [150, 252]];

function cross(ctx, x, y, col, label) {
  ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = mm(0.2); ctx.setLineDash([]);
  dashed(ctx, x - 8, y, x + 8, y, true); dashed(ctx, x, y - 8, x, y + 8, true);
  for (let k = -8; k <= 8; k++) {
    const t = k % 5 === 0 ? 2.2 : 1.1;
    dashed(ctx, x + k, y - t / 2, x + k, y + t / 2, true);
    dashed(ctx, x - t / 2, y + k, x + t / 2, y + k, true);
  }
  ctx.font = `${mm(3)}px Arial, sans-serif`; ctx.textBaseline = 'middle';
  ctx.fillText(String(label), mm(x + 9), mm(y - 6));
}

export async function renderTestPDF(S, applyCorr) {
  const canvas = pageCanvas();
  const ctx = canvas.getContext('2d');
  const pages = [];
  // Vorderseite: schwarz
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, PW, PH);
  TEST_POINTS.forEach(([x, y], i) => cross(ctx, x, y, '#000', i + 1));
  ctx.fillStyle = '#000'; ctx.font = `bold ${mm(5)}px Arial, sans-serif`; ctx.textBaseline = 'top';
  ctx.fillText('VORDERSEITE - Testseite', mm(30), mm(8));
  ctx.strokeStyle = '#000'; ctx.lineWidth = mm(0.3); dashed(ctx, 55, 100, 155, 100, true);
  dashed(ctx, 55, 97, 55, 103, true); dashed(ctx, 155, 97, 155, 103, true);
  ctx.font = `${mm(3.5)}px Arial, sans-serif`; ctx.fillText('Diese Linie muss genau 100 mm lang sein', mm(58), mm(103.5));
  pages.push(await toJpeg(canvas));
  // Rückseite: rot, an den gespiegelten Punkten
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, PW, PH);
  TEST_POINTS.forEach(([x, y], i) => {
    const r = backRect({ x: x - 0.0001, y, w: 0, h: 0 }, S, applyCorr);
    cross(ctx, r.x, r.y, '#d00', i + 1);
  });
  ctx.fillStyle = '#d00'; ctx.font = `bold ${mm(5)}px Arial, sans-serif`; ctx.textBaseline = 'top';
  ctx.fillText('RÜCKSEITE - Testseite', mm(30), mm(8));
  pages.push(await toJpeg(canvas));
  return { bytes: makePDF(pages, PT.W, PT.H), pages: 2 };
}

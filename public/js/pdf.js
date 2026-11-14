// Minimaler PDF-Schreiber: jede Seite ist ein JPEG in voller Seitengröße.
const enc = new TextEncoder();

export function makePDF(pages, pageWpt, pageHpt) {
  const chunks = [];
  let len = 0;
  const push = x => { const b = typeof x === 'string' ? enc.encode(x) : x; chunks.push(b); len += b.length; };
  const offsets = [];
  const begin = n => { offsets[n] = len; push(`${n} 0 obj\n`); };
  const end = () => push('\nendobj\n');

  push(new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, 0x0a, 0x25, 0xe2, 0xe3, 0xcf, 0xd3, 0x0a])); // %PDF-1.4 + Binärmarker
  const n = pages.length;
  begin(1); push('<< /Type /Catalog /Pages 2 0 R >>'); end();
  begin(2); push(`<< /Type /Pages /Count ${n} /Kids [${pages.map((_, i) => `${3 + 3 * i} 0 R`).join(' ')}] >>`); end();
  pages.forEach((pg, i) => {
    const po = 3 + 3 * i, co = po + 1, io = po + 2;
    begin(po);
    push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWpt.toFixed(3)} ${pageHpt.toFixed(3)}] /Resources << /XObject << /Im0 ${io} 0 R >> >> /Contents ${co} 0 R >>`);
    end();
    const content = `q ${pageWpt.toFixed(3)} 0 0 ${pageHpt.toFixed(3)} 0 0 cm /Im0 Do Q`;
    begin(co); push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`); end();
    begin(io);
    push(`<< /Type /XObject /Subtype /Image /Width ${pg.w} /Height ${pg.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${pg.jpeg.length} >>\nstream\n`);
    push(pg.jpeg);
    push('\nendstream');
    end();
  });
  const total = 3 + 3 * n;
  const xref = len;
  push(`xref\n0 ${total}\n0000000000 65535 f \n`);
  for (let k = 1; k < total; k++) push(`${String(offsets[k]).padStart(10, '0')} 00000 n \n`);
  push(`trailer\n<< /Size ${total} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`);

  const out = new Uint8Array(len);
  let o = 0;
  for (const c of chunks) { out.set(c, o); o += c.length; }
  return out;
}

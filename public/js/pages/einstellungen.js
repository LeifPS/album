import * as store from '../store.js';
import { renderTestPDF } from '../print.js';
import { $, icon } from '../ui.js';

let testUrl = '';

export function pageEinstellungen(main) {
  const S = store.get().settings;
  main.innerHTML = `<h1>Einstellungen</h1>
  <section class="box"><h3>Druck</h3>
    <label class="check"><input type="checkbox" id="duplex" ${S.duplex ? 'checked' : ''}> Beidseitig drucken (Rückseite mit Muster und Info-Feld)</label>
    <h3>Wende-Art des Druckers</h3>
    <div class="chips">
      <button class="chip ${S.flip === 'long' ? 'on' : ''}" data-flip="long">Lange Kante (Standard)</button>
      <button class="chip ${S.flip === 'short' ? 'on' : ''}" data-flip="short">Kurze Kante</button>
    </div>
    <h3>Versatz der Rückseite</h3>
    <p class="hint">Gilt als Korrektur, gemessen von der Vorderseite aus betrachtet. Plus = nach rechts bzw. nach unten.</p>
    <div class="row">
      <label>Rechts/links (mm) <input type="number" step="0.1" id="ox" value="${S.offsetX}"></label>
      <label>Unten/oben (mm) <input type="number" step="0.1" id="oy" value="${S.offsetY}"></label>
    </div>
  </section>
  <section class="box"><h3>Testseite zum Einmessen</h3>
    <p class="hint">1. Testseite beidseitig drucken (Größe 100 %). 2. Prüfen, ob die 100-mm-Linie wirklich 100 mm lang ist. 3. Blatt gegen das Licht halten und bei jedem der 6 Kreuze ablesen, wo das rote Kreuz auf dem schwarzen Lineal liegt (1 Strich = 1 mm). 4. Werte unten eintragen. 5. Testseite noch einmal drucken: die Kreuze sollten jetzt übereinander liegen. Liegen die Kreuze spiegelverkehrt (oben und unten vertauscht), wähle die andere Wende-Art.</p>
    <div class="actions"><button class="btn" id="test">${icon('print', 16)} Testseite erstellen</button></div>
    <div id="testout"></div>
    <div class="row">
      <label>Rotes Kreuz liegt mm weiter rechts (links = minus) <input type="number" step="0.1" id="mx" value="0"></label>
      <label>Rotes Kreuz liegt mm weiter unten (oben = minus) <input type="number" step="0.1" id="my" value="0"></label>
    </div>
    <div class="actions"><button class="btn" id="apply">Messwert in die Korrektur übernehmen</button></div>
  </section>
  <section class="box"><h3>Sicherung</h3>
    <p class="hint">Der Spielstand liegt nur in diesem Browser. Mach ab und zu eine Sicherung, falls der Browser seine Daten löscht.</p>
    <div class="actions">
      <button class="btn" id="exp">${icon('download', 16)} Sicherung speichern</button>
      <label class="btn">${icon('upload', 16)} Sicherung laden<input id="imp" type="file" accept="application/json,.json" hidden></label>
    </div>
    <p class="note" id="msg" hidden></p>
  </section>
  <section class="box"><h3>Alles zurücksetzen</h3>
    <p class="hint">Löscht Druckliste, Verlauf, Sammlungen und eigene Vorlagen (die Druck-Einstellungen auch).</p>
    <div class="actions"><button class="btn danger" id="reset">${icon('trash', 16)} Alles löschen</button></div>
  </section>`;

  const msg = t => { const m = $('#msg', main); m.hidden = false; m.textContent = t; };
  const set = fn => store.update(s => fn(s.settings));
  $('#duplex', main).onchange = e => set(s => { s.duplex = e.target.checked; });
  main.querySelectorAll('[data-flip]').forEach(b => b.onclick = () => { set(s => { s.flip = b.dataset.flip; }); pageEinstellungen(main); });
  const num = v => { const n = parseFloat(String(v).replace(',', '.')); return Number.isFinite(n) ? n : 0; };
  $('#ox', main).onchange = e => set(s => { s.offsetX = num(e.target.value); });
  $('#oy', main).onchange = e => set(s => { s.offsetY = num(e.target.value); });

  $('#test', main).onclick = async () => {
    const out = $('#testout', main);
    out.innerHTML = '<p class="hint">Erstelle Testseite ...</p>';
    try {
      const r = await renderTestPDF(store.get().settings, true);
      if (testUrl) URL.revokeObjectURL(testUrl);
      const blob = new Blob([r.bytes], { type: 'application/pdf' });
      testUrl = URL.createObjectURL(blob);
      out.innerHTML = `<div class="actions"><button class="btn primary" id="topen">Testseite öffnen</button><button class="btn" id="tshare">Teilen oder speichern</button></div>`;
      $('#topen', main).onclick = () => window.open(testUrl, '_blank');
      $('#tshare', main).onclick = async () => {
        const file = new File([blob], 'album-testseite.pdf', { type: 'application/pdf' });
        try { if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file] }); return; } } catch (e) { if (e.name === 'AbortError') return; }
        const a = document.createElement('a'); a.href = testUrl; a.download = 'album-testseite.pdf'; a.click();
      };
    } catch (e) { out.innerHTML = `<p class="note">Fehler: ${e.message}</p>`; }
  };
  $('#apply', main).onclick = () => {
    const mx = num($('#mx', main).value), my = num($('#my', main).value);
    set(s => { s.offsetX = Math.round((s.offsetX - mx) * 10) / 10; s.offsetY = Math.round((s.offsetY - my) * 10) / 10; });
    pageEinstellungen(main);
  };

  $('#exp', main).onclick = () => {
    const blob = new Blob([store.exportJSON()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `album-sicherung-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  };
  $('#imp', main).onchange = async e => {
    const f = e.target.files[0];
    if (!f) return;
    try { store.importJSON(await f.text()); msg('Sicherung geladen.'); } catch (err) { msg(err.message); }
  };
  $('#reset', main).onclick = () => {
    if (confirm('Wirklich alles löschen? Das geht nicht rückgängig.')) { store.reset(); pageEinstellungen(main); }
  };
}

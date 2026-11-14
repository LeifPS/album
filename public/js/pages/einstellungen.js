import * as store from '../store.js';
import { $, icon } from '../ui.js';

export function pageEinstellungen(main) {
  main.innerHTML = `<h1>Einstellungen</h1>
  <section class="box"><h3>Sicherung</h3>
    <p class="hint">Der Spielstand liegt nur in diesem Browser. Mach ab und zu eine Sicherung, falls der Browser seine Daten löscht.</p>
    <div class="actions">
      <button class="btn" id="exp">${icon('download', 16)} Sicherung speichern</button>
      <label class="btn">${icon('upload', 16)} Sicherung laden<input id="imp" type="file" accept="application/json,.json" hidden></label>
    </div>
    <p class="note" id="msg" hidden></p>
  </section>
  <section class="box"><h3>Alles zurücksetzen</h3>
    <p class="hint">Löscht Druckliste, Verlauf, Sammlungen und eigene Vorlagen.</p>
    <div class="actions"><button class="btn danger" id="reset">${icon('trash', 16)} Alles löschen</button></div>
  </section>`;
  const msg = t => { const m = $('#msg', main); m.hidden = false; m.textContent = t; };
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
    if (confirm('Wirklich alles löschen? Das geht nicht rückgängig.')) { store.reset(); msg('Alles zurückgesetzt.'); }
  };
}

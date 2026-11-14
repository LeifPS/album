import { ALBUMS, ALBUM_BY_ID, ALL_CARDS } from '../data.js';
import * as store from '../store.js';
import { albumIconSVG } from '../icons.js';
import { icon } from '../ui.js';
import { cardGrid, bindGrid } from './alben.js';

// Zeigt, welche Karten schon einmal gedruckt wurden - unabhängig davon, für wen.
export function pageSammlung(main, a1, a2) {
  const printed = store.printedCards();
  const albumId = ALBUM_BY_ID[a1] ? a1 : a2;      // alte Links (#/sammlung/erik/album) funktionieren weiter

  if (albumId && ALBUM_BY_ID[albumId]) {
    const a = ALBUM_BY_ID[albumId];
    const have = a.gallery.filter(c => printed[c.id]).length;
    main.innerHTML = `<a class="back" href="#/sammlung">${icon('arrowLeft')} Gedruckt</a><h1>${a.name}</h1>
      <p class="sub">${have} von 11 Karten schon gedruckt (10 Karten und die Set-Karte)</p>${cardGrid(a, printed)}`;
    bindGrid(main, a, printed);
    return;
  }

  const total = ALL_CARDS.filter(c => printed[c.id]).length;
  main.innerHTML = `<h1>Gedruckt</h1>
  <p class="sub">${total} von ${ALL_CARDS.length} verschiedenen Karten wurden schon gedruckt. Nur als gedruckt markierte Packs zählen.</p>
  <div class="albums">${ALBUMS.map(a => {
    const have = a.gallery.filter(c => printed[c.id]).length;
    return `<a class="tile" href="#/sammlung/${a.id}" style="background:linear-gradient(160deg,${a.bg[0]},${a.bg[1]});${have ? '' : 'filter:saturate(.4) brightness(.8)'}">
      <span class="ico">${albumIconSVG(a.id, { size: 48 })}</span><b>${a.name}</b>
      <div class="bar"><i style="width:${have / 11 * 100}%"></i></div><small>${have} von 11${have === 11 ? ' - komplett' : ''}</small></a>`;
  }).join('')}</div>`;
}

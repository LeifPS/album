import { RARITIES, ALBUMS, ALBUM_BY_ID } from '../data.js';
import { cardURL } from '../card.js';
import { albumIconSVG } from '../icons.js';
import { $, icon, raritySymbol } from '../ui.js';

const best = a => Math.max(...a.cards.map(c => c.rarity));
const pips = a => `<div class="pips">${[...new Set(a.cards.map(c => c.rarity))].sort((x, y) => x - y).map(r => raritySymbol(r, 18)).join('')}</div>`;

export function pageAlben(main) {
  main.innerHTML = `<h1>Alben</h1><p class="sub">12 Berufe mit je 10 Karten. Je schwieriger der Job, desto seltener die besten Karten.</p>
  <div class="albums">${ALBUMS.map(a => `
    <a class="tile" href="#/album/${a.id}" style="background:linear-gradient(160deg,${a.bg[0]},${a.bg[1]})">
      <span class="ico">${albumIconSVG(a.id, { size: 56 })}</span>
      <b>${a.name}</b><small>Beste Karte: ${RARITIES[best(a)].name}</small>${pips(a)}
    </a>`).join('')}</div>`;
}

// Gemeinsame Kartenansicht mit Großansicht; owned = null (alle zeigen) oder { cardId: Anzahl }
export function cardGrid(album, owned = null) {
  return `<div class="cards">${album.cards.map((c, i) => {
    const n = owned ? (owned[c.id] || 0) : 1;
    return `<button data-i="${i}" class="${n ? '' : 'missing'}"><span class="cw"><img src="${cardURL(c)}" alt="${c.name}" loading="lazy">${n > 1 ? `<span class="cnt">${n}x</span>` : ''}</span>
      <div class="cap">${n ? c.name : 'Fehlt noch'} - ${RARITIES[c.rarity].name}</div></button>`;
  }).join('')}</div>`;
}

let modalState = null;
export function bindGrid(root, album, owned = null) {
  root.querySelectorAll('.cards button').forEach(b => b.onclick = () => { modalState = { album, i: +b.dataset.i, owned }; drawModal(); $('#modal').hidden = false; });
}
function drawModal() {
  const { album, i, owned } = modalState;
  const c = album.cards[i];
  const n = owned ? (owned[c.id] || 0) : 1;
  $('#modal').innerHTML = `<button data-d="-1" aria-label="Zurück">${icon('chevL', 26)}</button>
    <div class="card-wrap"><img class="big ${n ? '' : 'missing'}" src="${cardURL(c)}" alt="${c.name}">
    <div class="info">${c.name} - ${RARITIES[c.rarity].name} - Karte ${i + 1} von ${album.cards.length}${owned ? (n ? ` - ${n}x gedruckt` : ' - noch nie gedruckt') : ''}</div></div>
    <button data-d="1" aria-label="Weiter">${icon('chevR', 26)}</button>`;
  $('#modal').querySelectorAll('button').forEach(b => b.onclick = e => { e.stopPropagation(); step(+b.dataset.d); });
}
function step(d) {
  const n = modalState.album.cards.length;
  modalState.i = (modalState.i + d + n) % n;
  drawModal();
}
export function modalKeys(e) {
  if ($('#modal').hidden || !modalState) return;
  if (e.key === 'Escape') $('#modal').hidden = true;
  if (e.key === 'ArrowLeft') step(-1);
  if (e.key === 'ArrowRight') step(1);
}

export function pageAlbum(main, id) {
  const a = ALBUM_BY_ID[id];
  if (!a) return pageAlben(main);
  main.innerHTML = `<a class="back" href="#/">${icon('arrowLeft')} Alle Alben</a><h1>${a.name}</h1>
  <p class="sub">10 Karten - beste Karte: ${RARITIES[best(a)].name}</p>${cardGrid(a)}`;
  bindGrid(main, a);
}

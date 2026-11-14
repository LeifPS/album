import { RARITIES, ALBUMS, ALBUM_BY_ID } from './data.js';
import { cardURL } from './card.js';
import { albumIconSVG } from './icons.js';

const $ = s => document.querySelector(s);
const main = $('#main');

const PAGES = [
  { id: 'alben', label: 'Alben', hash: '#/' },
];

function renderNav(active) {
  $('#nav').innerHTML = PAGES.map(p => `<a href="${p.hash}" class="${p.id === active ? 'on' : ''}">${p.label}</a>`).join('');
}

const pips = a => `<div class="pips">${[...new Set(a.cards.map(c => c.rarity))].sort((x, y) => x - y)
  .map(r => `<i style="background:${RARITIES[r].color}" title="${RARITIES[r].name}"></i>`).join('')}</div>`;

function best(a) { return Math.max(...a.cards.map(c => c.rarity)); }

function pageAlben() {
  renderNav('alben');
  main.innerHTML = `<h1>Alben</h1><p class="sub">12 Berufe mit je 10 Karten. Je schwieriger der Job, desto seltener die besten Karten.</p>
  <div class="albums">${ALBUMS.map(a => `
    <a class="tile" href="#/album/${a.id}" style="background:linear-gradient(160deg,${a.bg[0]},${a.bg[1]})">
      <span class="ico">${albumIconSVG(a.id, { size: 56 })}</span>
      <b>${a.name}</b><small>Beste Karte: ${RARITIES[best(a)].name}</small>${pips(a)}
    </a>`).join('')}</div>`;
}

function pageAlbum(id) {
  const a = ALBUM_BY_ID[id];
  if (!a) return pageAlben();
  renderNav('alben');
  main.innerHTML = `<a class="back" href="#/">← Alle Alben</a><h1>${a.name}</h1>
  <p class="sub">10 Karten · beste Karte: ${RARITIES[best(a)].name}</p>
  <div class="cards">${a.cards.map((c, i) => `
    <button data-i="${i}"><img src="${cardURL(c)}" alt="${c.name}" loading="lazy"><div class="cap">${c.name} · ${RARITIES[c.rarity].name}</div></button>`).join('')}</div>`;
  main.querySelectorAll('.cards button').forEach(b => b.onclick = () => openModal(a, +b.dataset.i));
}

let modalState = null;
function openModal(a, i) {
  modalState = { a, i };
  drawModal();
  $('#modal').hidden = false;
}
function drawModal() {
  const { a, i } = modalState;
  const c = a.cards[i];
  $('#modal').innerHTML = `<button data-d="-1" aria-label="Zurück">‹</button>
    <div class="card-wrap"><img class="big" src="${cardURL(c)}" alt="${c.name}"><div class="info">${c.name} · ${RARITIES[c.rarity].name} · ${i + 1}/10</div></div>
    <button data-d="1" aria-label="Weiter">›</button>`;
  $('#modal').querySelectorAll('button').forEach(b => b.onclick = e => { e.stopPropagation(); step(+b.dataset.d); });
}
function step(d) {
  const n = modalState.a.cards.length;
  modalState.i = (modalState.i + d + n) % n;
  drawModal();
}
$('#modal').addEventListener('click', e => { if (e.target.id === 'modal') $('#modal').hidden = true; });
document.addEventListener('keydown', e => {
  if ($('#modal').hidden) return;
  if (e.key === 'Escape') $('#modal').hidden = true;
  if (e.key === 'ArrowLeft') step(-1);
  if (e.key === 'ArrowRight') step(1);
});

function route() {
  const h = location.hash || '#/';
  const m = h.match(/^#\/album\/(\w+)/);
  $('#modal').hidden = true;
  if (m) pageAlbum(m[1]); else pageAlben();
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
route();

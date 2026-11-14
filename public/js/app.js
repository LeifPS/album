import { $ } from './ui.js';
import { pageAlben, pageAlbum, modalKeys } from './pages/alben.js';
import { pagePacks } from './pages/packs.js';
import { pageDruck } from './pages/druck.js';
import { pageSammlung } from './pages/sammlung.js';
import { pageEinstellungen } from './pages/einstellungen.js';

const main = $('#main');
const PAGES = [
  { id: 'alben', label: 'Alben', hash: '#/' },
  { id: 'packs', label: 'Packs', hash: '#/packs' },
  { id: 'druck', label: 'Druck', hash: '#/druck' },
  { id: 'sammlung', label: 'Sammlung', hash: '#/sammlung' },
  { id: 'einstellungen', label: 'Einstellungen', hash: '#/einstellungen' },
];

function renderNav(active) {
  $('#nav').innerHTML = PAGES.map(p => `<a href="${p.hash}" class="${p.id === active ? 'on' : ''}">${p.label}</a>`).join('');
}

function route() {
  const parts = (location.hash || '#/').replace(/^#\//, '').split('/');
  $('#modal').hidden = true;
  let active = 'alben';
  if (parts[0] === 'packs') { active = 'packs'; pagePacks(main); }
  else if (parts[0] === 'druck') { active = 'druck'; pageDruck(main); }
  else if (parts[0] === 'sammlung') { active = 'sammlung'; pageSammlung(main, parts[1], parts[2]); }
  else if (parts[0] === 'einstellungen') { active = 'einstellungen'; pageEinstellungen(main); }
  else if (parts[0] === 'album' && parts[1]) pageAlbum(main, parts[1]);
  else pageAlben(main);
  renderNav(active);
  window.scrollTo(0, 0);
}

$('#modal').addEventListener('click', e => { if (e.target.id === 'modal') $('#modal').hidden = true; });
document.addEventListener('keydown', modalKeys);
window.addEventListener('hashchange', route);
route();

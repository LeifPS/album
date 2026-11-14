import { RARITIES, ALBUMS, ALBUM_BY_ID, ALL_CARDS } from '../data.js';
import * as store from '../store.js';
import { albumIconSVG } from '../icons.js';
import { esc, icon } from '../ui.js';
import { cardGrid, bindGrid } from './alben.js';

export function pageSammlung(main, profileId, albumId) {
  const st = store.get();
  const pid = st.profiles.some(p => p.id === profileId) ? profileId : st.ui.profile;
  const own = store.collection(pid);
  const tabs = `<div class="chips">${st.profiles.map(p => `<a class="chip ${p.id === pid ? 'on' : ''}" href="#/sammlung/${p.id}">${esc(p.name)}</a>`).join('')}</div>`;

  if (albumId && ALBUM_BY_ID[albumId]) {
    const a = ALBUM_BY_ID[albumId];
    const have = a.cards.filter(c => own[c.id]).length;
    main.innerHTML = `<a class="back" href="#/sammlung/${pid}">${icon('arrowLeft')} Sammlung von ${esc(store.profileName(pid))}</a><h1>${a.name}</h1>
      <p class="sub">${have} von 10 Karten gesammelt</p>${cardGrid(a, own)}`;
    bindGrid(main, a, own);
    return;
  }

  const total = ALL_CARDS.filter(c => own[c.id]).length;
  main.innerHTML = `<h1>Sammlung</h1>${tabs}
  <p class="sub">${esc(store.profileName(pid))} hat ${total} von ${ALL_CARDS.length} verschiedenen Karten gesammelt.</p>
  <div class="albums">${ALBUMS.map(a => {
    const have = a.cards.filter(c => own[c.id]).length;
    return `<a class="tile" href="#/sammlung/${pid}/${a.id}" style="background:linear-gradient(160deg,${a.bg[0]},${a.bg[1]});${have ? '' : 'filter:saturate(.4) brightness(.8)'}">
      <span class="ico">${albumIconSVG(a.id, { size: 48 })}</span><b>${a.name}</b>
      <div class="bar"><i style="width:${have * 10}%"></i></div><small>${have} von 10${have === 10 ? ' - komplett' : ''}</small></a>`;
  }).join('')}</div>`;
}

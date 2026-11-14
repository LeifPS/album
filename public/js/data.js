// Seltenheiten, Alben und Karten – alle Daten an einem Ort.

export const RARITIES = [
  { id: 0, key: 'gewoehnlich',   name: 'Gewöhnlich',   color: '#8d94a0', stops: ['#d9dde3', '#8d94a0', '#c3c8d0'] },
  { id: 1, key: 'ungewoehnlich', name: 'Ungewöhnlich', color: '#3fb15a', stops: ['#8be79a', '#2f9a49', '#6ed07f'] },
  { id: 2, key: 'selten',        name: 'Selten',       color: '#3c82da', stops: ['#8cc0ff', '#2a62c9', '#6aa4f5'] },
  { id: 3, key: 'episch',        name: 'Episch',       color: '#8e5bd0', stops: ['#d0a8ff', '#7a35c4', '#b585f0'] },
  { id: 4, key: 'legendaer',     name: 'Legendär',     color: '#f2c230', stops: ['#fff6bd', '#f2c230', '#b7791a', '#f9dc6b', '#fff6bd'] },
  { id: 5, key: 'mythisch',      name: 'Mythisch',     color: '#ff5a1f', stops: ['#ff2e2e', '#ff7a1a', '#ffc23d', '#ff5a1f', '#e01e1e'] },
  { id: 6, key: 'exotisch',      name: 'Exotisch',     color: '#d45cff', stops: ['#ff4d4d', '#ff9f1a', '#ffe14d', '#4dd96b', '#3dc5ff', '#6a6cff', '#d45cff', '#ff4d9d'] },
];

export function slug(s) {
  return s.toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '');
}

// Karten je Album: [Name, Seltenheit]. Genau 10 pro Album.
// Reihenfolge der Alben: leicht -> schwer (je schwieriger und begehrter der Job, desto seltener).
const RAW = [
  { id: 'baecker', name: 'Bäcker', bg: ['#f3c07a', '#b36a2e'], cards: [
    ['Mehlsack', 0], ['Nudelholz', 0], ['Brötchen', 0], ['Backblech', 0], ['Schürze', 0],
    ['Bäckermütze', 1], ['Brezel', 1], ['Waage', 1],
    ['Backofen', 2], ['Torte', 2] ] },
  { id: 'postbote', name: 'Postbote', bg: ['#f7d154', '#c98a14'], cards: [
    ['Briefmarke', 0], ['Brief', 0], ['Postkarte', 0], ['Briefkasten', 0],
    ['Paket', 1], ['Posttasche', 1], ['Postfahrrad', 1], ['Poststempel', 1],
    ['Posthorn', 2], ['Postauto', 2] ] },
  { id: 'lehrer', name: 'Lehrer', bg: ['#3aa078', '#1a5a45'], cards: [
    ['Geodreieck', 0], ['Schulbücher', 0], ['Kreide', 0], ['Tafel', 0],
    ['Schultasche', 1], ['Globus', 1],
    ['Projektor', 2], ['Klassenzimmer', 2], ['Hausaufgaben', 2],
    ['Perfekte Note', 3] ] },
  { id: 'koch', name: 'Koch', bg: ['#f58f63', '#b8472a'], cards: [
    ['Kochlöffel', 0], ['Topf', 0], ['Schneidebrett', 0],
    ['Pfanne', 1], ['Kochmütze', 1], ['Salzstreuer', 1],
    ['Herd', 2], ['Messerblock', 2],
    ['Gourmetteller', 3], ['Goldene Kochmütze', 3] ] },
  { id: 'feuerwehr', name: 'Feuerwehrmann', bg: ['#ff7a66', '#9b1c1c'], cards: [
    ['Feuerwehrhelm', 0], ['Feuerlöscher', 0], ['Handschuhe', 0],
    ['Schlauch', 1], ['Beil', 1],
    ['Hydrant', 2], ['Leiter', 2],
    ['Feuerwehrauto', 3], ['Drehleiter', 3],
    ['Löschhubschrauber', 4] ] },
  { id: 'polizist', name: 'Polizist', bg: ['#6b8be0', '#1f2f6b'], cards: [
    ['Trillerpfeife', 0], ['Polizeimütze', 0],
    ['Handschellen', 1], ['Funkgerät', 1], ['Abzeichen', 1],
    ['Blaulicht', 2], ['Streifenwagen', 2],
    ['Polizeimotorrad', 3], ['Polizeihund', 3],
    ['Polizeihubschrauber', 4] ] },
  { id: 'tierarzt', name: 'Tierarzt', bg: ['#f7a3cf', '#a6407a'], cards: [
    ['Verband', 0], ['Wassernapf', 0],
    ['Katzenkorb', 1], ['Leine', 1],
    ['Hund', 2], ['Katze', 2], ['Kaninchen', 2],
    ['Pferd', 3], ['Behandlungsraum', 3],
    ['Goldener Arztkoffer', 4] ] },
  { id: 'pilot', name: 'Pilot', bg: ['#52b0f0', '#1a4f93'], cards: [
    ['Pilotenbrille', 0], ['Kopfhörer', 0],
    ['Pilotenlizenz', 1], ['Pilotenmütze', 1], ['Steuerhorn', 1],
    ['Flugzeug', 2], ['Pilotenuniform', 2],
    ['Flugprotokoll', 3],
    ['Flug', 4],
    ['Landung', 5] ] },
  { id: 'fussballprofi', name: 'Fußballprofi', bg: ['#7ddc5c', '#237a2e'], cards: [
    ['Fußball', 0], ['Fußballschuhe', 0],
    ['Schienbeinschoner', 1], ['Torwarthandschuhe', 1],
    ['Tor', 2], ['Kapitänsbinde', 2],
    ['Stadion', 3], ['Meisterschale', 3],
    ['Goldener Schuh', 4],
    ['Weltpokal', 5] ] },
  { id: 'arzt', name: 'Arzt', bg: ['#34c1bb', '#146a73'], cards: [
    ['Medizinische Maske', 0], ['Tabletten', 0],
    ['Stethoskop', 1], ['Dienstausweis', 1],
    ['Arztkittel', 2], ['Krankenakte', 2],
    ['Röntgen', 3], ['Erste-Hilfe-Set', 3],
    ['Krankenwagen', 4],
    ['Hermesstab', 5] ] },
  { id: 'forscher', name: 'Forscher', bg: ['#9a7bea', '#3f2a8f'], cards: [
    ['Lupe', 2],
    ['Reagenzglas', 3], ['Mikroskop', 3], ['Laborkittel', 3],
    ['Fossil', 4], ['Teleskop', 4], ['Atommodell', 4],
    ['Roboter', 5], ['Zeitmaschine', 5],
    ['Nobelpreis', 6] ] },
  { id: 'astronaut', name: 'Astronaut', bg: ['#4a3fb0', '#0b0b2e'], cards: [
    ['Raumanzug', 3], ['Astronautenhelm', 3], ['Sternenkarte', 3],
    ['Rakete', 4], ['Satellit', 4], ['Raumfähre', 4],
    ['Raumstation', 5], ['Mondlandung', 5],
    ['Mars', 6], ['Galaxie', 6] ] },
];

export const ALBUMS = RAW.map((a, ai) => ({
  id: a.id,
  name: a.name,
  bg: a.bg,
  order: ai,
  cards: a.cards.map(([name, rarity], i) => ({
    id: `${a.id}-${slug(name)}`,
    album: a.id,
    key: slug(name),
    name,
    rarity,
    slot: i,
  })),
}));

export const ALBUM_BY_ID = Object.fromEntries(ALBUMS.map(a => [a.id, a]));
export const ALL_CARDS = ALBUMS.flatMap(a => a.cards);
export const CARD_BY_ID = Object.fromEntries(ALL_CARDS.map(c => [c.id, c]));

// Sanity-Check beim Laden: jedes Album hat genau 10 Karten.
for (const a of ALBUMS) {
  if (a.cards.length !== 10) console.error('Album mit falscher Kartenzahl:', a.id, a.cards.length);
}

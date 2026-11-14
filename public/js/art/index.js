// Sammelt alle Motive. Schlüssel: Album-ID -> Karten-Schlüssel -> Funktion, die den SVG-Inhalt liefert.
import lehrer from './lehrer.js';
import pilot from './pilot.js';
import arzt from './arzt.js';
import baecker from './baecker.js';
import postbote from './postbote.js';
import koch from './koch.js';

export const ART = { lehrer, pilot, arzt, baecker, postbote, koch };

export function artFor(card) {
  const fn = ART[card.album] && ART[card.album][card.key];
  return fn ? fn() : null;
}

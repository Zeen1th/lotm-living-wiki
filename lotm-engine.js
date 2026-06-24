// lotm-engine.js — pure, no DOM/React. Dual Node + browser export.
(function (global) {
  'use strict';

  function currentState(entity, chapter) {
    const states = (entity && entity.states) || [];
    let best = null;
    for (const s of states) {
      if (s.since_chapter <= chapter && (!best || s.since_chapter >= best.since_chapter)) {
        best = s;
      }
    }
    return best;
  }

  function isVisible(entity, chapter) {
    const f = entity && entity.first_appeared_chapter;
    return typeof f === 'number' ? f <= chapter : true;
  }

  function visibleAliases(entity, chapter) {
    return ((entity && entity.aliases) || [])
      .filter(a => a.since_chapter <= chapter)
      .map(a => a.name);
  }

  function visibleEvents(entity, chapter) {
    return ((entity && entity.events) || [])
      .filter(e => e.chapter <= chapter)
      .slice()
      .sort((a, b) => a.chapter - b.chapter);
  }

  function resolveCharacter(char, chapter) {
    if (!isVisible(char, chapter)) return null;
    return {
      id: char.id,
      name_ar: char.name_ar,
      name_en: char.name_en,
      pathway: char.pathway || null,
      status: char.status || 'unknown',
      first_appeared_chapter: char.first_appeared_chapter,
      aliases: visibleAliases(char, chapter),
      state: currentState(char, chapter),
      events: visibleEvents(char, chapter),
    };
  }

  function visibleCharacters(list, chapter) {
    return (list || [])
      .filter(c => isVisible(c, chapter))
      .map(c => resolveCharacter(c, chapter));
  }

  function encodedThrough(data) {
    return (data && data.meta && data.meta.encodedThroughChapter) || 0;
  }

  const API = {
    currentState, isVisible, visibleAliases, visibleEvents,
    resolveCharacter, visibleCharacters, encodedThrough,
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else global.LOTMEngine = API;
})(typeof window !== 'undefined' ? window : globalThis);

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
      image: char.image || null,
      pathway: char.pathway || null,
      // status is chapter-aware: a death only shows once the reader reaches death_chapter
      status: (char.death_chapter && char.death_chapter <= chapter) ? 'dead' : (char.status || 'unknown'),
      first_appeared_chapter: char.first_appeared_chapter,
      aliases: visibleAliases(char, chapter),
      state: currentState(char, chapter),
      events: visibleEvents(char, chapter),
    };
  }

  // ── Phase-2 primitives ────────────────────────────────────────────────────

  /**
   * visibleSub(arr, chapter, key='since_chapter')
   * Returns items in arr whose item[key] <= chapter, sorted ascending by key.
   */
  function visibleSub(arr, chapter, key) {
    var k = key || 'since_chapter';
    return (arr || [])
      .filter(function (item) { return item[k] <= chapter; })
      .slice()
      .sort(function (a, b) { return a[k] - b[k]; });
  }

  /**
   * byId(list, id)
   * Returns the first entity in list with matching id, or null.
   */
  function byId(list, id) {
    for (var i = 0; i < (list || []).length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  /**
   * visibleOf(list, chapter, resolveFn)
   * Filters list to visible entities at chapter, maps each through resolveFn.
   */
  function visibleOf(list, chapter, resolveFn) {
    return (list || [])
      .filter(function (e) { return isVisible(e, chapter); })
      .map(function (e) { return resolveFn(e, chapter); });
  }

  // ── Per-type resolvers ────────────────────────────────────────────────────

  function resolvePathway(p, chapter) {
    if (!isVisible(p, chapter)) return null;
    return Object.assign({}, p, {
      sequences: visibleSub(p.sequences || [], chapter, 'known_chapter'),
    });
  }

  function resolveOrganization(o, chapter) {
    if (!isVisible(o, chapter)) return null;
    return Object.assign({}, o, {
      state: currentState(o, chapter),
      events: visibleSub(o.events || [], chapter, 'chapter'),
      member_ids: o.member_ids || [],
    });
  }

  function resolveEra(e, chapter) {
    if (!isVisible(e, chapter)) return null;
    return Object.assign({}, e, {
      facts: visibleSub(e.facts || [], chapter, 'chapter'),
    });
  }

  function resolveDocument(d, chapter) {
    if (!isVisible(d, chapter)) return null;
    return Object.assign({}, d, {
      entries: visibleSub(d.entries || [], chapter, 'chapter'),
    });
  }

  function resolveLocation(l, chapter) {
    if (!isVisible(l, chapter)) return null;
    return Object.assign({}, l, {
      state: currentState(l, chapter),
      contains_ids: l.contains_ids || [],
    });
  }

  function resolveArtifact(a, chapter) {
    if (!isVisible(a, chapter)) return null;
    return Object.assign({}, a, {
      events: visibleSub(a.events || [], chapter, 'chapter'),
    });
  }

  // ── Refactored visibleCharacters (via visibleOf) ──────────────────────────

  function visibleCharacters(list, chapter) {
    return visibleOf(list, chapter, resolveCharacter);
  }

  // ── Entities (gods / evil gods / emperors / supernatural beings) ──────────

  function resolveEntity(e, chapter) {
    if (!isVisible(e, chapter)) return null;
    return Object.assign({}, e, {
      state: currentState(e, chapter),
      events: visibleSub(e.events || [], chapter, 'chapter'),
      aliases: visibleAliases(e, chapter),
    });
  }

  function visibleEntities(list, chapter) {
    return visibleOf(list, chapter, resolveEntity);
  }

  function encodedThrough(data) {
    return (data && data.meta && data.meta.encodedThroughChapter) || 0;
  }

  const API = {
    currentState, isVisible, visibleAliases, visibleEvents,
    resolveCharacter, visibleCharacters, encodedThrough,
    visibleSub, byId, visibleOf,
    resolvePathway, resolveOrganization, resolveEra, resolveDocument, resolveLocation, resolveArtifact,
    resolveEntity, visibleEntities,
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else global.LOTMEngine = API;
})(typeof window !== 'undefined' ? window : globalThis);

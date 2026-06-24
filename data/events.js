// data/events.js — legacy stub (Phase-1 top-level events not used by new model)
(function (g) {
  const L = (g.LOTM = g.LOTM || {});
  L.events = [];
  if (typeof module !== 'undefined' && module.exports) module.exports = L.events;
})(typeof window !== 'undefined' ? window : globalThis);

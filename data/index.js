// data/index.js — Node-side assembler for tests.
// Requiring each file runs its IIFE, populating globalThis.LOTM.
require('./meta.js');
require('./characters.js');
require('./families.js');
require('./pathways.js');
require('./organizations.js');
require('./locations.js');
require('./eras.js');
require('./documents.js');
require('./events.js');
require('./glossary.js');
require('./artifacts.js');
module.exports = globalThis.LOTM;

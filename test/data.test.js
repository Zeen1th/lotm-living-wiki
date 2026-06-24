// test/data.test.js
const test = require('node:test');
const assert = require('node:assert');
const E = require('../lotm-engine.js');
const LOTM = require('../data/index.js');

// ── Existing Phase-1 tests (unchanged) ──────────────────────────────────────

test('meta is well-formed and cutoff is 250', () => {
  assert.equal(LOTM.meta.encodedThroughChapter, 250);
  assert.ok(Array.isArray(LOTM.meta.volumes) && LOTM.meta.volumes.length >= 1);
});

test('every collection exists as an array', () => {
  for (const k of ['characters', 'pathways', 'locations', 'organizations', 'events',
                   'families', 'eras', 'documents', 'glossary']) {
    assert.ok(Array.isArray(LOTM[k]), `${k} must be an array`);
  }
});

test('no fact is stamped beyond the encoded cutoff (spoiler-safety)', () => {
  const cap = E.encodedThrough(LOTM);
  for (const c of LOTM.characters) {
    assert.ok(c.first_appeared_chapter <= cap, `${c.id} appears after cap`);
    for (const s of c.states) assert.ok(s.since_chapter <= cap, `${c.id} state after cap`);
    for (const a of c.aliases) assert.ok(a.since_chapter <= cap, `${c.id} alias after cap`);
    for (const e of c.events) assert.ok(e.chapter <= cap, `${c.id} event after cap`);
    for (const rel of (c.relationships || [])) assert.ok(rel.since_chapter <= cap, `${c.id} relationship after cap`);
  }
});

test('every character has required identity fields and ids are unique', () => {
  const ids = new Set();
  for (const c of LOTM.characters) {
    for (const f of ['id', 'name_ar', 'name_en', 'first_appeared_chapter']) {
      assert.ok(c[f] !== undefined, `${c.id || '?'} missing ${f}`);
    }
    assert.ok(!ids.has(c.id), `duplicate id ${c.id}`);
    ids.add(c.id);
    assert.ok(c.states.length >= 1, `${c.id} needs >=1 state`);
  }
});

test('resolver runs cleanly over seed at the cutoff', () => {
  const out = E.visibleCharacters(LOTM.characters, 250);
  assert.ok(out.length >= 1);
  for (const r of out) assert.ok(r.state, `${r.id} has no state at ch.250`);
});

// ── Phase-2 spoiler-safety — ALL new collections ─────────────────────────────

test('chapter stamps ≤ cap across all new collections', () => {
  const cap = E.encodedThrough(LOTM);

  // families
  for (const f of LOTM.families) {
    assert.ok(f.first_appeared_chapter <= cap, `family ${f.id} first_appeared_chapter after cap`);
    for (const s of (f.states || [])) assert.ok(s.since_chapter <= cap, `family ${f.id} state after cap`);
    for (const ev of (f.events || [])) assert.ok(ev.chapter <= cap, `family ${f.id} event after cap`);
  }

  // pathways
  for (const p of LOTM.pathways) {
    assert.ok(p.first_appeared_chapter <= cap, `pathway ${p.id} first_appeared_chapter after cap`);
    for (const s of (p.sequences || [])) {
      if (s.known_chapter !== undefined) assert.ok(s.known_chapter <= cap, `pathway ${p.id} sequence known_chapter after cap`);
    }
    for (const ev of (p.events || [])) assert.ok(ev.chapter <= cap, `pathway ${p.id} event after cap`);
  }

  // organizations
  for (const o of LOTM.organizations) {
    assert.ok(o.first_appeared_chapter <= cap, `org ${o.id} first_appeared_chapter after cap`);
    for (const s of (o.states || [])) assert.ok(s.since_chapter <= cap, `org ${o.id} state after cap`);
    for (const ev of (o.events || [])) assert.ok(ev.chapter <= cap, `org ${o.id} event after cap`);
  }

  // eras
  for (const e of LOTM.eras) {
    assert.ok(e.first_appeared_chapter <= cap, `era ${e.id} first_appeared_chapter after cap`);
    for (const f of (e.facts || [])) assert.ok(f.chapter <= cap, `era ${e.id} fact after cap`);
  }

  // documents
  for (const d of LOTM.documents) {
    assert.ok(d.first_appeared_chapter <= cap, `doc ${d.id} first_appeared_chapter after cap`);
    for (const en of (d.entries || [])) assert.ok(en.chapter <= cap, `doc ${d.id} entry after cap`);
  }

  // locations
  for (const l of LOTM.locations) {
    assert.ok(l.first_appeared_chapter <= cap, `location ${l.id} first_appeared_chapter after cap`);
    for (const s of (l.states || [])) assert.ok(s.since_chapter <= cap, `location ${l.id} state after cap`);
    for (const ev of (l.events || [])) assert.ok(ev.chapter <= cap, `location ${l.id} event after cap`);
  }
});

// ── Unique IDs per collection ─────────────────────────────────────────────────

test('ids are unique within each collection', () => {
  const collections = {
    characters: LOTM.characters,
    families: LOTM.families,
    pathways: LOTM.pathways,
    organizations: LOTM.organizations,
    eras: LOTM.eras,
    documents: LOTM.documents,
    locations: LOTM.locations,
    glossary: LOTM.glossary,
  };
  for (const [name, list] of Object.entries(collections)) {
    const ids = new Set();
    const idField = name === 'glossary' ? 'id' : 'id';
    for (const item of list) {
      const id = item[idField];
      assert.ok(id !== undefined, `${name} item missing id`);
      assert.ok(!ids.has(id), `duplicate id '${id}' in ${name}`);
      ids.add(id);
    }
  }
});

// ── Referential integrity ─────────────────────────────────────────────────────

test('referential integrity — pathway.family_id references a real family', () => {
  const familyIds = new Set(LOTM.families.map(f => f.id));
  for (const p of LOTM.pathways) {
    if (p.family_id !== null && p.family_id !== undefined) {
      assert.ok(familyIds.has(p.family_id),
        `pathway ${p.id}: family_id '${p.family_id}' not found in families`);
    }
  }
});

test('referential integrity — character pathway.id references a real pathway', () => {
  const pathwayIds = new Set(LOTM.pathways.map(p => p.id));
  for (const c of LOTM.characters) {
    if (c.pathway && c.pathway.id) {
      assert.ok(pathwayIds.has(c.pathway.id),
        `character ${c.id}: pathway.id '${c.pathway.id}' not found in pathways`);
    }
  }
});

test('referential integrity — organization.member_ids reference real characters', () => {
  const charIds = new Set(LOTM.characters.map(c => c.id));
  for (const o of LOTM.organizations) {
    for (const memberId of (o.member_ids || [])) {
      assert.ok(charIds.has(memberId),
        `org ${o.id}: member_id '${memberId}' not found in characters`);
    }
  }
});

test('referential integrity — organization.states leader_id references real character', () => {
  const charIds = new Set(LOTM.characters.map(c => c.id));
  for (const o of LOTM.organizations) {
    for (const s of (o.states || [])) {
      if (s.leader_id !== null && s.leader_id !== undefined) {
        assert.ok(charIds.has(s.leader_id),
          `org ${o.id} state: leader_id '${s.leader_id}' not found in characters`);
      }
    }
  }
});

test('referential integrity — organization.states hq_location_id references real location', () => {
  const locationIds = new Set(LOTM.locations.map(l => l.id));
  for (const o of LOTM.organizations) {
    for (const s of (o.states || [])) {
      if (s.hq_location_id !== null && s.hq_location_id !== undefined) {
        assert.ok(locationIds.has(s.hq_location_id),
          `org ${o.id} state: hq_location_id '${s.hq_location_id}' not found in locations`);
      }
    }
  }
});

test('referential integrity — location.parent_id references real location', () => {
  const locationIds = new Set(LOTM.locations.map(l => l.id));
  for (const l of LOTM.locations) {
    if (l.parent_id !== null && l.parent_id !== undefined) {
      assert.ok(locationIds.has(l.parent_id),
        `location ${l.id}: parent_id '${l.parent_id}' not found in locations`);
    }
  }
});

test('referential integrity — location.contains_ids reference real locations', () => {
  const locationIds = new Set(LOTM.locations.map(l => l.id));
  for (const l of LOTM.locations) {
    for (const cid of (l.contains_ids || [])) {
      assert.ok(locationIds.has(cid),
        `location ${l.id}: contains_id '${cid}' not found in locations`);
    }
  }
});

test('referential integrity — glossary ref.id references real entity in right collection', () => {
  const collections = {
    pathways: new Set(LOTM.pathways.map(p => p.id)),
    organization: new Set(LOTM.organizations.map(o => o.id)),
    organizations: new Set(LOTM.organizations.map(o => o.id)),
    families: new Set(LOTM.families.map(f => f.id)),
    characters: new Set(LOTM.characters.map(c => c.id)),
    locations: new Set(LOTM.locations.map(l => l.id)),
    // 'collection' is a meta-ref, not a real entity ref, skip id check
  };
  for (const g of LOTM.glossary) {
    if (g.ref && g.ref.id && g.ref.kind !== 'collection') {
      const set = collections[g.ref.kind];
      assert.ok(set, `glossary ${g.id}: unknown ref.kind '${g.ref.kind}'`);
      assert.ok(set.has(g.ref.id),
        `glossary ${g.id}: ref.id '${g.ref.id}' not found in ${g.ref.kind}`);
    }
  }
});

// ── Field shape checks for new collections ────────────────────────────────────

test('families have required fields', () => {
  for (const f of LOTM.families) {
    for (const field of ['id', 'name_ar', 'name_en', 'color', 'first_appeared_chapter', 'blurb_ar']) {
      assert.ok(f[field] !== undefined, `family ${f.id || '?'} missing ${field}`);
    }
  }
});

test('pathways have required fields and sequences array', () => {
  for (const p of LOTM.pathways) {
    for (const field of ['id', 'name_ar', 'name_en', 'first_appeared_chapter', 'blurb_ar']) {
      assert.ok(p[field] !== undefined, `pathway ${p.id || '?'} missing ${field}`);
    }
    assert.ok(Array.isArray(p.sequences), `pathway ${p.id} sequences must be array`);
  }
});

test('organizations have required fields', () => {
  const validKinds = new Set(['sect', 'club', 'church', 'state']);
  for (const o of LOTM.organizations) {
    for (const field of ['id', 'name_ar', 'name_en', 'kind', 'first_appeared_chapter']) {
      assert.ok(o[field] !== undefined, `org ${o.id || '?'} missing ${field}`);
    }
    assert.ok(validKinds.has(o.kind), `org ${o.id} kind '${o.kind}' invalid`);
    assert.ok(Array.isArray(o.member_ids), `org ${o.id} member_ids must be array`);
    assert.ok(Array.isArray(o.events), `org ${o.id} events must be array`);
    assert.ok(Array.isArray(o.states), `org ${o.id} states must be array`);
  }
});

test('eras have required fields and correct order', () => {
  const orders = LOTM.eras.map(e => e.order).sort((a, b) => a - b);
  for (let i = 0; i < orders.length; i++) {
    assert.equal(orders[i], i + 1, `eras orders must be sequential 1..n`);
  }
  for (const e of LOTM.eras) {
    for (const field of ['id', 'order', 'name_ar', 'name_en', 'first_appeared_chapter', 'blurb_ar']) {
      assert.ok(e[field] !== undefined, `era ${e.id || '?'} missing ${field}`);
    }
    assert.ok(Array.isArray(e.facts), `era ${e.id} facts must be array`);
  }
});

test('documents have required fields', () => {
  for (const d of LOTM.documents) {
    for (const field of ['id', 'name_ar', 'name_en', 'kind', 'first_appeared_chapter', 'blurb_ar']) {
      assert.ok(d[field] !== undefined, `doc ${d.id || '?'} missing ${field}`);
    }
    assert.ok(Array.isArray(d.entries), `doc ${d.id} entries must be array`);
  }
});

test('locations have required fields', () => {
  const validKinds = new Set(['kingdom', 'city', 'sea', 'region']);
  for (const l of LOTM.locations) {
    for (const field of ['id', 'name_ar', 'name_en', 'kind', 'first_appeared_chapter']) {
      assert.ok(l[field] !== undefined, `location ${l.id || '?'} missing ${field}`);
    }
    assert.ok(validKinds.has(l.kind), `location ${l.id} kind '${l.kind}' not in allowed set`);
    assert.ok(l.map && typeof l.map.cx === 'number' && typeof l.map.cy === 'number',
      `location ${l.id} missing map.cx/cy`);
    assert.ok(Array.isArray(l.contains_ids), `location ${l.id} contains_ids must be array`);
    assert.ok(Array.isArray(l.states), `location ${l.id} states must be array`);
  }
});

test('glossary has required fields', () => {
  for (const g of LOTM.glossary) {
    for (const field of ['id', 'term_ar', 'def_ar']) {
      assert.ok(g[field] !== undefined, `glossary ${g.id || '?'} missing ${field}`);
    }
  }
});

// ── Resolver smoke-tests for new entity types ─────────────────────────────────

test('resolvers run cleanly over new collections at cap', () => {
  const cap = E.encodedThrough(LOTM);

  // pathways
  const visiblePathways = E.visibleOf(LOTM.pathways, cap, E.resolvePathway);
  assert.ok(visiblePathways.length >= 1, 'at least one pathway visible at cap');

  // organizations
  const visibleOrgs = E.visibleOf(LOTM.organizations, cap, E.resolveOrganization);
  assert.ok(visibleOrgs.length >= 1, 'at least one org visible at cap');

  // eras
  const visibleEras = E.visibleOf(LOTM.eras, cap, E.resolveEra);
  assert.ok(visibleEras.length >= 1, 'at least one era visible at cap');

  // documents
  const visibleDocs = E.visibleOf(LOTM.documents, cap, E.resolveDocument);
  assert.ok(visibleDocs.length >= 1, 'at least one document visible at cap');

  // locations
  const visibleLocs = E.visibleOf(LOTM.locations, cap, E.resolveLocation);
  assert.ok(visibleLocs.length >= 1, 'at least one location visible at cap');
});

test('org HQ is not introduced after the org itself (temporal invariant)', () => {
  for (const o of LOTM.organizations) {
    for (const s of (o.states || [])) {
      if (!s.hq_location_id) continue;
      const loc = LOTM.locations.find(l => l.id === s.hq_location_id);
      assert.ok(loc, `${o.id} hq ${s.hq_location_id} missing`);
      assert.ok(loc.first_appeared_chapter <= o.first_appeared_chapter,
        `${o.id} (ch${o.first_appeared_chapter}) references HQ ${loc.id} introduced later (ch${loc.first_appeared_chapter})`);
    }
  }
});

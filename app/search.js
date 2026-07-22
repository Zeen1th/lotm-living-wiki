/** @jsxRuntime classic */ /** @jsx React.createElement */
/* ----------------------------------------------------------------
   GLOBAL SEARCH — searches across all wiki collections (spoiler-safe,
   chapter-filtered), opens results in a modal overlay, and navigates
   to the matching entity via the existing navigate(kind, id) mechanism.
-----------------------------------------------------------------*/

// ── lightweight Arabic normalization (search-forgiving, no EPUB dep) ──
function normAr(s){
  return String(s == null ? '' : s)
    .replace(/[ً-ْٰـ]/g, '')        // tashkeel + tatweel
    .replace(/[آأإٱ]/g, 'ا')       // alef variants
    .replace(/ى/g, 'ي')            // alef-maqsura
    .replace(/ة/g, 'ه')            // ta-marbuta
    .replace(/[«»""]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

// kind → Arabic type label + accent color (matches the section identity)
const TYPE_LABEL = {
  character:    { label:'شخصية',      color:'var(--brass)' },
  entity:       { label:'كيان',       color:'var(--brass)' },
  organization: { label:'منظمة',      color:'var(--brass)' },
  pathway:      { label:'مسار',       color:'var(--brass)' },
  artifact:     { label:'تحفة',       color:'var(--brass)' },
  location:     { label:'مكان',       color:'var(--brass)' },
  era:          { label:'حقبة',       color:'var(--brass)' },
  glossary:     { label:'مصطلح',      color:'var(--brass)' },
  family:       { label:'سلالة',      color:'var(--brass)' },
};

// collect aliases text from the various alias shapes across collections
function aliasesText(item){
  const a = item.aliases;
  if(!a || !a.length) return '';
  return a.map(x => typeof x === 'string' ? x : (x.name || '')).join(' ');
}

// one-line context for a result
function blurbOf(item){
  if(item.blurb_ar) return item.blurb_ar;
  if(item.def_ar)   return item.def_ar;            // glossary
  const st = item.state || (item.states && item.states[item.states.length-1]);
  if(st){
    if(st.notes)    return st.notes;
    if(st.blurb_ar) return st.blurb_ar;
    if(st.role)     return st.role;
    if(st.sequence) return st.sequence;
  }
  return '';
}

// Build the searchable index for a given chapter (spoiler-filtered).
// Each record: { kind, id, name_ar, name_en, text (normalized), typeLabel, blurb }
function buildSearchIndex(LOTM, chapter){
  const idx = [];
  const push = (kind, item) => {
    if(!item || !item.id) return;
    // spoiler filter where the engine supports it
    try { if(Eng.isVisible && !Eng.isVisible(item, chapter)) return; } catch(e){}
    const name_ar = item.name_ar || item.term_ar || item.id;
    const name_en = item.name_en || '';
    idx.push({
      kind,
      id: item.id,
      name_ar,
      name_en,
      text: normAr(name_ar + ' ' + name_en + ' ' + aliasesText(item)),
      typeLabel: TYPE_LABEL[kind] || { label:kind, color:'var(--brass)' },
      blurb: blurbOf(item),
      item,
    });
  };

  (LOTM.characters    || []).forEach(c => push('character', c));
  (LOTM.entities      || []).forEach(e => push('entity', e));
  (LOTM.organizations || []).forEach(o => push('organization', o));
  (LOTM.pathways      || []).forEach(p => push('pathway', p));
  (LOTM.artifacts     || []).forEach(a => push('artifact', a));
  (LOTM.locations     || []).forEach(l => push('location', l));
  (LOTM.eras          || []).forEach(e => push('era', e));
  (LOTM.families      || []).forEach(f => push('family', f));
  (LOTM.glossary      || []).forEach(g => push('glossary', g));
  return idx;
}

// Run a query against the index. Returns ranked results (starts-with first),
// capped at 24. Each result gains a `matched` flag (true = name_ar starts-with).
function runSearch(query, index){
  const q = normAr(query);
  if(!q) return [];
  const starts = [], contains = [];
  for(const r of index){
    const i = r.text.indexOf(q);
    if(i === -1) continue;
    if(i < (r.text.length - r.text.trim().length) || r.text.startsWith(q) ||
       normAr(r.name_ar).startsWith(q)){
      starts.push(r);
    } else {
      contains.push(r);
    }
  }
  return starts.concat(contains).slice(0, 24);
}

/* ----------------------------------------------------------------
   SearchModal — centered overlay with input + live results.
-----------------------------------------------------------------*/
function SearchModal({ chapter, fontScale, onClose, onNavigate }){
  const [q, setQ]         = useState('');
  const [highlight, setH] = useState(0);
  const inputRef = useRef(null);

  // memoize the index per chapter (rebuild only when chapter changes)
  const index  = useMemo(()=> buildSearchIndex(LOTM, chapter), [chapter]);
  const results= useMemo(()=> runSearch(q, index), [q, index]);

  useEffect(()=>{ inputRef.current && inputRef.current.focus(); }, []);
  useEffect(()=>{ setH(0); }, [q]); // reset highlight on new query
  useEffect(()=>{
    const h = (e)=>{
      if(e.key==='Escape'){ onClose(); }
      else if(e.key==='ArrowDown'){ e.preventDefault(); setH(h => Math.min(h+1, results.length-1)); }
      else if(e.key==='ArrowUp'){ e.preventDefault(); setH(h => Math.max(h-1, 0)); }
      else if(e.key==='Enter' && results[highlight]){ choose(results[highlight]); }
    };
    window.addEventListener('keydown', h);
    return ()=> window.removeEventListener('keydown', h);
  }, [results, highlight, onClose]);

  function choose(r){
    // glossary has no detail page — just close (its def shows inline)
    if(r.kind === 'glossary'){ onClose(); return; }
    onNavigate(r.kind, r.id);
    onClose();
  }

  return (
    <div className="backdrop fixed inset-0 z-50 grid place-items-start justify-center pt-[12vh] p-4"
         style={{ background:'rgba(4,5,8,.74)', backdropFilter:'blur(4px)', zoom: fontScale || 1 }}
         onClick={onClose} role="dialog" aria-modal="true" aria-label="بحث">
      <div className="sheet glass w-full max-w-[560px] rounded-xl overflow-hidden relative"
           style={{ border:'1px solid var(--brass)' }}
           onClick={e=>e.stopPropagation()}>
        <div style={{ height:3, background:'linear-gradient(90deg,transparent,var(--crimson-glow),transparent)' }}/>

        {/* search input row */}
        <div className="flex items-center gap-2 px-4 h-14"
             style={{ borderBottom:'1px solid var(--line)' }}>
          <Search size={18} style={{ color:'var(--brass)', flexShrink:0 }}/>
          <input ref={inputRef} value={q} onChange={e=>setQ(e.target.value)}
                 placeholder="ابحث في كل الموسوعة…"
                 aria-label="ابحث في كل الموسوعة"
                 className="bg-transparent outline-none w-full text-[15px] font-old"
                 style={{ color:'#dfe4ea' }}/>
          <button onClick={onClose} aria-label="إغلاق"
            className="shrink-0 w-8 h-8 grid place-items-center rounded-md focus-ring"
            style={{ background:'rgba(0,0,0,.4)', border:'1px solid var(--line)', color:'var(--parchment-dim)' }}>
            <X size={16}/>
          </button>
        </div>

        {/* results */}
        <div className="scroller overflow-y-auto" style={{ maxHeight:'54vh' }}>
          {q.trim() === ''
            ? <p className="font-old text-center py-8 text-[13px]" style={{ color:'var(--parchment-dim)' }}>
                اكتب اسم شخصية أو كيان أو منظمة أو مسار…
              </p>
            : results.length === 0
              ? <p className="font-old text-center py-8 text-[13px]" style={{ color:'var(--parchment-dim)' }}>
                  لا نتائج مطابقة.
                </p>
              : results.map((r, i)=>(
                  <button key={r.kind+'/'+r.id} onClick={()=>choose(r)}
                    onMouseEnter={()=>setH(i)}
                    className="w-full text-right px-4 py-2.5 flex items-center gap-3 focus-ring transition-colors"
                    style={{ borderBottom:'1px solid var(--line)',
                             background: i===highlight ? 'rgba(245,197,66,.08)' : 'transparent' }}>
                    {/* type badge */}
                    <span className="shrink-0 eyebrow text-[10px] px-1.5 py-0.5 rounded"
                          style={{ border:'1px solid ' + r.typeLabel.color, color:r.typeLabel.color, minWidth:48, textAlign:'center' }}>
                      {r.typeLabel.label}
                    </span>
                    {/* names + blurb */}
                    <span className="min-w-0 flex-1">
                      <span className="block">
                        <span className="font-display text-[14px]" style={{ color:'var(--parchment)' }}>{r.name_ar}</span>
                        {r.name_en && <span className="eyebrow text-[11px] mr-2" style={{ color:'var(--parchment-dim)' }}>{r.name_en}</span>}
                      </span>
                      {r.blurb && (
                        <span className="block text-[11.5px] truncate mt-0.5 font-old" style={{ color:'var(--parchment-dim)' }}>{r.blurb}</span>
                      )}
                    </span>
                  </button>
                ))
          }
        </div>

        {/* footer hint */}
        <div className="px-4 py-2 flex items-center justify-between"
             style={{ borderTop:'1px solid var(--line)', background:'rgba(0,0,0,.2)' }}>
          <span className="eyebrow text-[10px]" style={{ color:'var(--parchment-dim)', opacity:.6 }}>
            {q.trim() ? (results.length + ' نتيجة') : 'حتى فصلك الحالي'}
          </span>
          <span className="eyebrow text-[10px]" style={{ color:'var(--parchment-dim)', opacity:.6 }}>
            ↑↓ تنقّل · Enter فتح · Esc إغلاق
          </span>
        </div>
      </div>
    </div>
  );
}

window.buildSearchIndex = buildSearchIndex;
window.runSearch        = runSearch;
window.SearchModal      = SearchModal;
window.TYPE_LABEL       = TYPE_LABEL;

/** @jsxRuntime classic */ /** @jsx React.createElement */
/* ---- ARTIFACTS ---- */

const ARTIFACT_TYPE_AR = {
  sealed: 'تحفة مختومة',
  relic:  'أثر مقدّس',
  item:   'أداة',
};

function ArtifactDetail({ artifact, chapter, onClose, navigate }){
  useEffect(()=>{
    const h = (e)=>{ if(e.key==='Escape') onClose(); };
    window.addEventListener('keydown', h);
    return ()=> window.removeEventListener('keydown', h);
  }, [onClose]);
  if(!artifact) return null;

  /* resolve owner — try characters first, then organizations */
  const owner = (function(){
    if(!artifact.owner_id) return null;
    const asChar = Eng.byId(LOTM.characters, artifact.owner_id);
    if(asChar){
      const resolved = Eng.resolveCharacter(asChar, chapter);
      if(resolved) return { kind:'character', id:resolved.id, label:resolved.name_ar };
    }
    const asOrg = Eng.byId(LOTM.organizations, artifact.owner_id);
    if(asOrg && Eng.isVisible(asOrg, chapter)) return { kind:'organization', id:asOrg.id, label:asOrg.name_ar };
    return null;
  })();

  const events = artifact.events || [];
  const typeLabel = ARTIFACT_TYPE_AR[artifact.type] || artifact.type;

  return (
    <div className="backdrop fixed inset-0 z-40 grid place-items-center p-4"
         style={{ background:'rgba(4,5,8,.74)', backdropFilter:'blur(4px)' }}
         onClick={onClose} role="dialog" aria-modal="true" aria-label={artifact.name_ar}>
      <div className="sheet glass w-full max-w-[600px] rounded-xl overflow-y-auto scroller relative max-h-[88vh]"
           onClick={e=>e.stopPropagation()}>
        <div style={{ height:3, background:'linear-gradient(90deg,transparent,var(--crimson-glow),transparent)' }}/>
        <div className="px-6 pt-5 pb-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h2 className="font-deco text-[24px] leading-tight" style={{ color:'var(--parchment)' }}>{artifact.name_ar}</h2>
              {artifact.name_en && (
                <p className="text-[12.5px] mt-0.5" style={{ color:'var(--parchment-dim)' }}>{artifact.name_en}</p>
              )}
              <span className="eyebrow text-[11px] mt-1 inline-block" style={{ color:'var(--brass)' }}>
                {typeLabel}{artifact.grade != null ? ` — درجة ${artifact.grade}` : ''}{artifact.code ? ` — ${artifact.code}` : ''}
              </span>
            </div>
            <button onClick={onClose} aria-label="إغلاق"
              className="shrink-0 w-9 h-9 grid place-items-center rounded-md focus-ring"
              style={{ background:'rgba(0,0,0,.4)', border:'1px solid var(--line)', color:'var(--parchment-dim)' }}>
              <X size={17}/>
            </button>
          </div>
        </div>
        <div className="px-6 pb-6 scroller overflow-y-auto" style={{ maxHeight:'70vh' }}>
          {artifact.blurb_ar && (
            <p className="font-old text-[13.5px] leading-relaxed mb-4" style={{ color:'#c2c9d1' }}>{artifact.blurb_ar}</p>
          )}

          {/* owner */}
          {owner && (
            <div className="rounded-lg px-3 py-2 mb-4" style={{ background:'rgba(0,0,0,.3)', border:'1px solid var(--line)' }}>
              <div className="eyebrow text-[11px] mb-1" style={{ color:'var(--brass-dim)' }}>المالك/المستخدم</div>
              <LinkChip kind={owner.kind} id={owner.id} label={owner.label} navigate={navigate}/>
            </div>
          )}

          {/* events */}
          <div className="eyebrow text-[11px] mb-2 mt-3" style={{ color:'var(--brass-dim)' }}>الأحداث</div>
          {events.length === 0
            ? <EmptyNote text="لا أحداث مسجّلة بعد"/>
            : (
              <ol className="relative" style={{ borderRight:'1px solid var(--line)' }}>
                {events.map((ev,i)=>(
                  <li key={i} className="relative pr-5 pb-3">
                    <span className="absolute right-[-5px] top-1.5 w-2.5 h-2.5 rounded-full"
                          style={{ background:'var(--crimson-glow)' }}/>
                    <span className="eyebrow text-[11px]" style={{ color:'var(--brass)' }}>فصل {ev.chapter}</span>
                    <p className="text-[13px] mt-0.5" style={{ color:'var(--parchment)' }}>{ev.text}</p>
                  </li>
                ))}
              </ol>
            )
          }
        </div>
      </div>
    </div>
  );
}

function ArtifactsView({ chapter, focus, clearFocus, navigate }){
  const [openId, setOpenId] = useState(null);
  const [query, setQuery] = useState('');

  const list = useMemo(()=>
    Eng.visibleOf(LOTM.artifacts, chapter, Eng.resolveArtifact).filter(Boolean),
    [chapter]
  );

  const filtered = useMemo(()=>{
    if(!query.trim()) return list;
    const q = query.trim().toLowerCase();
    return list.filter(a=>
      (a.name_ar && a.name_ar.toLowerCase().includes(q)) ||
      (a.name_en && a.name_en.toLowerCase().includes(q))
    );
  }, [list, query]);

  const open = openId ? Eng.resolveArtifact(Eng.byId(LOTM.artifacts, openId), chapter) : null;

  /* Auto-open focused artifact */
  useEffect(()=>{
    if(!focus || focus.kind !== 'artifact') return;
    const exists = list.find(a => a.id === focus.id);
    if(exists){ setOpenId(focus.id); }
    clearFocus && clearFocus();
  }, [focus]);

  return (
    <div className="h-full flex flex-col max-w-[760px] mx-auto px-4 pt-6">
      <div className="eyebrow text-[11px] mb-2" style={{ color:'var(--brass-dim)' }}>
        التحف المعروفة حتى الفصل {chapter} — {list.length}
      </div>
      {/* Search */}
      <div className="relative mb-3 shrink-0">
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color:'var(--brass-dim)' }}>
          <Search size={14}/>
        </span>
        <input
          type="text"
          value={query}
          onChange={e=>setQuery(e.target.value)}
          placeholder="بحث في التحف…"
          className="w-full bg-transparent rounded-md px-3 py-2 pr-8 text-[13px] focus-ring"
          style={{
            border:'1px solid var(--line)',
            color:'var(--parchment)',
            outline:'none',
            fontFamily:'Amiri, Georgia, serif',
          }}
          dir="rtl"
        />
      </div>
      <SectionList
        items={filtered}
        emptyLabel="لا تحف مكتشفة بعد"
        renderRow={a=>(
          <button key={a.id} onClick={()=>setOpenId(a.id)}
            className="listrow w-full text-right px-3 py-3 rounded-md flex items-center gap-3 mb-1.5 focus-ring"
            style={{ border:'1px solid var(--line)', background:'rgba(255,255,255,.015)' }}>
            <span className="grid place-items-center w-10 h-10 rounded-full shrink-0"
                  style={{ background:'rgba(0,0,0,.45)', color:'var(--brass)', border:'1px solid var(--brass)' }}>
              <Zap size={18}/>
            </span>
            <span className="min-w-0 flex-1">
              <span className="font-display block text-[15px] truncate" style={{ color:'var(--parchment)' }}>{a.name_ar}</span>
              <span className="block text-[12px] truncate" style={{ color:'var(--brass)' }}>
                {ARTIFACT_TYPE_AR[a.type] || a.type}{a.grade != null ? ` — درجة ${a.grade}` : ''}
              </span>
            </span>
          </button>
        )}
      />
      {open && <ArtifactDetail artifact={open} chapter={chapter} onClose={()=>setOpenId(null)} navigate={navigate}/>}
    </div>
  );
}

window.ArtifactDetail  = ArtifactDetail;
window.ArtifactsView   = ArtifactsView;

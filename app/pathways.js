/** @jsxRuntime classic */ /** @jsx React.createElement */
function PathwayDetail({ pathway, chapter, onClose, navigate, fontScale }){
  useEffect(()=>{
    const h = (e)=>{ if(e.key==='Escape') onClose(); };
    window.addEventListener('keydown', h);
    return ()=> window.removeEventListener('keydown', h);
  }, [onClose]);

  if(!pathway) return null;

  // Build sequence ladder 9 → 0
  const ladder = [];
  for(let n = 9; n >= 0; n--){
    // spoiler gate: a sequence is "known" only if revealed by the current chapter
    const seq = (pathway.sequences || []).find(s => s.n === n && s.known_chapter <= chapter);
    ladder.push({ n, seq });
  }

  // Characters on this pathway visible at chapter
  const pathChars = useMemo(()=>{
    return Eng.visibleCharacters(LOTM.characters, chapter)
      .filter(c => c.pathway && c.pathway.id === pathway.id);
  }, [pathway.id, chapter]);

  const dotColor = pathway.color || 'var(--brass)';

  return (
    <div className="backdrop fixed inset-0 z-40 grid place-items-center p-4"
         style={{ background:'rgba(4,5,8,.74)', backdropFilter:'blur(4px)', zoom: fontScale || 1 }}
         onClick={onClose} role="dialog" aria-modal="true" aria-label={pathway.name_ar}>
      <div className="sheet glass w-full max-w-[600px] rounded-xl overflow-y-auto scroller relative max-h-[88vh]"
           onClick={e=>e.stopPropagation()}>
        <div style={{ height:3, background:'linear-gradient(90deg,transparent,'+dotColor+',transparent)' }}/>
        <div className="px-6 pt-5 pb-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <span className="shrink-0 w-3 h-3 rounded-full" style={{ background:dotColor }}/>
              <h2 className="font-deco text-[24px] leading-tight" style={{ color:'var(--parchment)' }}>{pathway.name_ar}</h2>
            </div>
            <button onClick={onClose} aria-label="إغلاق"
              className="shrink-0 w-9 h-9 grid place-items-center rounded-md focus-ring"
              style={{ background:'rgba(0,0,0,.4)', border:'1px solid var(--line)', color:'var(--parchment-dim)' }}>
              <X size={17}/>
            </button>
          </div>
          <p className="text-[12.5px] mt-1" style={{ color:'var(--parchment-dim)' }}>{pathway.name_en}</p>
        </div>

        <div className="px-6 pb-6 scroller overflow-y-auto" style={{ maxHeight:'70vh' }}>
          {pathway.blurb_ar && (
            <p className="font-old text-[13.5px] leading-relaxed mb-4" style={{ color:'#c2c9d1' }}>
              {pathway.blurb_ar}
            </p>
          )}

          {/* Sequence ladder 9→0 */}
          <div className="eyebrow text-[11px] mb-2" style={{ color:'var(--brass-dim)' }}>سلّم التسلسلات</div>
          <div className="rounded-lg overflow-hidden" style={{ border:'1px solid var(--line)' }}>
            {ladder.map(({ n, seq }, idx)=>{
              const known = seq != null;
              return (
                <div key={n}
                  className="flex items-center gap-3 px-3 py-2"
                  style={{
                    borderBottom: idx < ladder.length-1 ? '1px solid var(--line)' : 'none',
                    background: known ? 'rgba(255,255,255,.02)' : 'transparent',
                    opacity: known ? 1 : 0.4,
                  }}>
                  <span className="eyebrow text-[11px] shrink-0" style={{ color: known ? dotColor : 'var(--parchment-dim)', minWidth:28 }}>
                    {n}
                  </span>
                  {known
                    ? <span className="font-display text-[13px]" style={{ color:'var(--parchment)' }}>
                        التسلسل {n}: {seq.name_ar}
                      </span>
                    : <span className="font-old text-[12.5px] italic" style={{ color:'var(--parchment-dim)' }}>
                        التسلسل {n}: ؟؟؟
                      </span>
                  }
                </div>
              );
            })}
          </div>

          {/* Characters on this pathway */}
          {pathChars.length > 0 && (
            <div className="mt-4">
              <div className="eyebrow text-[11px] mb-2" style={{ color:'var(--brass-dim)' }}>يسلكه</div>
              <div className="flex flex-wrap gap-1.5">
                {pathChars.map(c=>(
                  <LinkChip key={c.id} kind="character" id={c.id} label={c.name_ar} navigate={navigate}/>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PathwaysView({ chapter, focus, clearFocus, navigate, fontScale }){
  const [openPathway, setOpenPathway] = useState(null);

  // Auto-open focused pathway
  useEffect(()=>{
    if(!focus || focus.kind !== 'pathway') return;
    const pw = (LOTM.pathways || []).find(p => p.id === focus.id && Eng.isVisible(p, chapter));
    if(pw){ setOpenPathway(pw); }
    clearFocus && clearFocus();
  }, [focus]);

  // All pathways visible at chapter
  const visiblePathways = useMemo(()=>{
    return (LOTM.pathways || []).filter(p => Eng.isVisible(p, chapter));
  }, [chapter]);

  // All families visible at chapter (family has first_appeared_chapter)
  const visibleFamilies = useMemo(()=>{
    return (LOTM.families || []).filter(f => Eng.isVisible(f, chapter));
  }, [chapter]);

  // Group: family columns — only families that have ≥1 visible child pathway
  const familyColumns = useMemo(()=>{
    return visibleFamilies
      .map(f => ({
        family: f,
        pathways: visiblePathways.filter(p => p.family_id === f.id),
      }))
      .filter(col => col.pathways.length > 0);
  }, [visibleFamilies, visiblePathways]);

  // Catch-all: pathways whose family_id is null or whose family is not visible
  const visibleFamilyIds = new Set(visibleFamilies.map(f => f.id));
  const orphanPathways = useMemo(()=>{
    return visiblePathways.filter(p =>
      !p.family_id || !visibleFamilyIds.has(p.family_id)
    );
  }, [visiblePathways, visibleFamilies]);

  const totalVisible = visiblePathways.length;

  function openDetail(p){
    setOpenPathway(p);
  }

  function renderPathwayCard(p){
    const dotColor = p.color || 'var(--brass)';
    return (
      <button key={p.id}
        onClick={()=>openDetail(p)}
        className="listrow w-full text-right px-3 py-3 rounded-md flex items-center gap-3 mb-1.5 focus-ring"
        style={{ border:'1px solid var(--line)', background:'rgba(255,255,255,.015)' }}>
        <span className="shrink-0 w-3 h-3 rounded-full" style={{ background:dotColor }}/>
        <span className="min-w-0 flex-1">
          <span className="font-display block text-[14px]" style={{ color:'var(--parchment)' }}>{p.name_ar}</span>
          <span className="block text-[11.5px]" style={{ color:'var(--parchment-dim)' }}>{p.name_en}</span>
        </span>
      </button>
    );
  }

  return (
    <div className="h-full flex flex-col max-w-[900px] mx-auto px-4 pt-6 overflow-hidden">
      {/* Header */}
      <div className="mb-4">
        <h2 className="font-deco text-[24px]" style={{ color:'var(--parchment)' }}>المسارات والتسلسلات</h2>
        <p className="font-old text-[13px] mt-0.5" style={{ color:'var(--parchment-dim)' }}>
          تظهر المسارات تباعًا كلما تقدّمت في القراءة
        </p>
        <div className="eyebrow text-[11px] mt-2" style={{ color:'var(--brass-dim)' }}>
          المسارات المكتشفة حتى الفصل {chapter} — {totalVisible}
        </div>
      </div>

      {/* Columns area */}
      <div className="flex-1 overflow-y-auto scroller pb-6">
        {totalVisible === 0 ? (
          <p className="font-old italic text-center mt-10" style={{ color:'var(--parchment-dim)' }}>
            لم تُكتشف مسارات بعد في هذا الفصل.
          </p>
        ) : (
          <div className="grid gap-4" style={{ gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))' }}>
            {/* Family columns */}
            {familyColumns.map(col => (
              <div key={col.family.id} className="glass rounded-xl p-3">
                <div className="flex items-center gap-2 mb-3">
                  <span className="shrink-0 w-2.5 h-2.5 rounded-full"
                        style={{ background: col.family.color || 'var(--brass)' }}/>
                  <div className="min-w-0">
                    <div className="font-display text-[13px]" style={{ color:'var(--parchment)' }}>{col.family.name_ar}</div>
                    <div className="eyebrow text-[10px]" style={{ color:'var(--parchment-dim)' }}>{col.family.name_en}</div>
                  </div>
                </div>
                <div>
                  {col.pathways.map(p => renderPathwayCard(p))}
                </div>
              </div>
            ))}

            {/* Catch-all column for orphan/unlinked pathways */}
            {orphanPathways.length > 0 && (
              <div className="glass rounded-xl p-3">
                <div className="flex items-center gap-2 mb-3">
                  <span className="shrink-0 w-2.5 h-2.5 rounded-full"
                        style={{ background:'var(--brass-dim)' }}/>
                  <div className="min-w-0">
                    <div className="font-display text-[13px]" style={{ color:'var(--parchment)' }}>مسارات معروفة</div>
                    <div className="eyebrow text-[10px]" style={{ color:'var(--parchment-dim)' }}>Known Pathways</div>
                  </div>
                </div>
                <div>
                  {orphanPathways.map(p => renderPathwayCard(p))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Detail modal */}
      {openPathway && (
        <PathwayDetail
          pathway={openPathway}
          chapter={chapter}
          onClose={()=>setOpenPathway(null)}
          navigate={navigate}
          fontScale={fontScale}
        />
      )}
    </div>
  );
}

window.PathwayDetail  = PathwayDetail;
window.PathwaysView   = PathwaysView;

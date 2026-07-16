/** @jsxRuntime classic */ /** @jsx React.createElement */
function CharacterCard({ r, onOpen }){
  const hasImg = !!r.image;
  return (
    <button onClick={()=>onOpen(r.id)}
      className="group text-right rounded-lg overflow-hidden focus-ring transition-all"
      style={{ border:'1px solid var(--line)', background:'rgba(255,255,255,.015)' }}>
      {/* portrait — fills the top of the card */}
      <div className="relative w-full" style={{ aspectRatio:'3 / 4.6', overflow:'hidden' }}>
        {hasImg ? (
          <img src={'assets/' + r.image} alt={r.name_ar} loading="lazy"
               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
        ) : (
          <div className="w-full h-full grid place-items-center"
               style={{ background:'rgba(0,0,0,.45)', color:'var(--brass)' }}>
            <Users size={42}/>
          </div>
        )}
        {/* gradient + status badge overlay */}
        <div className="absolute inset-0 pointer-events-none"
             style={{ background:'linear-gradient(to top, rgba(4,5,8,.92) 0%, rgba(4,5,8,0) 45%)' }}/>
        <span className="absolute top-2 left-2">{statusBadge(r.status)}</span>
      </div>
      {/* caption: name on top, pathway below */}
      <div className="px-2.5 py-2">
        <div className="font-display text-[14px] truncate" style={{ color:'var(--parchment)' }}>{r.name_ar}</div>
        <div className="eyebrow text-[9px] truncate mt-0.5" style={{ color:'var(--brass)' }}>
          {r.pathway ? r.pathway.name_ar : '—'}
        </div>
      </div>
    </button>
  );
}

function CharacterDetail({ r, onClose, navigate }){
  useEffect(()=>{
    const h = (e)=>{ if(e.key==='Escape') onClose(); };
    window.addEventListener('keydown', h);
    return ()=> window.removeEventListener('keydown', h);
  }, [onClose]);
  if(!r) return null;
  const s = r.state;
  return (
    <div className="backdrop fixed inset-0 z-40 grid place-items-center p-4"
         style={{ background:'rgba(4,5,8,.74)', backdropFilter:'blur(4px)' }}
         onClick={onClose} role="dialog" aria-modal="true" aria-label={r.name_ar}>
      <div className="sheet glass w-full max-w-[520px] rounded-xl overflow-y-auto scroller relative max-h-[88vh]"
           onClick={e=>e.stopPropagation()}>
        <div style={{ height:3, background:'linear-gradient(90deg,transparent,var(--crimson-glow),transparent)' }}/>

        {/* ── hero: large centered portrait, name + quick facts below ── */}
        <div className="relative pt-5 pb-4 text-center">
          {/* close button floats top-left */}
          <button onClick={onClose} aria-label="إغلاق"
            className="absolute top-3 left-3 w-9 h-9 grid place-items-center rounded-md focus-ring"
            style={{ background:'rgba(0,0,0,.5)', border:'1px solid var(--line)', color:'var(--parchment-dim)', zIndex:2 }}>
            <X size={17}/>
          </button>
          {/* status badge floats top-right */}
          <div className="absolute top-4 right-4" style={{ zIndex:2 }}>{statusBadge(r.status)}</div>

          {/* large centered portrait */}
          {r.image ? (
            <img src={'assets/' + r.image} alt={r.name_ar}
                 className="mx-auto rounded-xl object-cover"
                 style={{ width:180, height:225, border:'1px solid var(--brass)',
                          boxShadow:'0 0 28px rgba(0,0,0,.6)' }}/>
          ) : (
            <div className="mx-auto rounded-xl grid place-items-center"
                 style={{ width:180, height:225, background:'rgba(0,0,0,.45)', color:'var(--brass)', border:'1px solid var(--brass)' }}>
              <Users size={56}/>
            </div>
          )}

          {/* name + english + aliases */}
          <h2 className="font-deco text-[26px] mt-3" style={{ color:'var(--parchment)' }}>{r.name_ar}</h2>
          <p className="text-[12.5px] mt-0.5" style={{ color:'var(--parchment-dim)' }}>{r.name_en}</p>
          {r.aliases.length>0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-2.5">
              {r.aliases.map(a=>(
                <span key={a} className="eyebrow text-[10px] px-2 py-0.5 rounded"
                  style={{ border:'1px solid var(--brass)', color:'var(--brass)' }}>{a}</span>
              ))}
            </div>
          )}
        </div>

        {/* ── current status cards: sequence / pathway / location / faction ── */}
        <div className="px-6 pb-6">
          {s && (
            <div className="grid grid-cols-2 gap-2.5">
              {/* pathway first — primary */}
              {r.pathway && (
                <div className="rounded-lg px-3 py-2" style={{ background:'rgba(0,0,0,.3)', border:'1px solid var(--line)' }}>
                  <div className="eyebrow text-[9px] mb-1" style={{ color:'var(--brass-dim)' }}>المسار</div>
                  <LinkChip kind="pathway" id={r.pathway.id} label={r.pathway.name_ar} navigate={navigate}/>
                </div>
              )}
              {/* sequence */}
              {s.sequence && (
                <div className="rounded-lg px-3 py-2" style={{ background:'rgba(0,0,0,.3)', border:'1px solid var(--line)' }}>
                  <div className="eyebrow text-[9px] mb-1" style={{ color:'var(--brass-dim)' }}>التسلسل</div>
                  <div className="font-display text-[13.5px]" style={{ color:'var(--parchment)' }}>{s.sequence}</div>
                </div>
              )}
              {/* location */}
              {s.location && (
                <div className="rounded-lg px-3 py-2" style={{ background:'rgba(0,0,0,.3)', border:'1px solid var(--line)' }}>
                  <div className="eyebrow text-[9px] mb-1" style={{ color:'var(--brass-dim)' }}>الموقع الحالي</div>
                  <div className="font-display text-[13.5px]" style={{ color:'var(--parchment)' }}>{s.location}</div>
                </div>
              )}
              {/* faction */}
              {s.faction && (
                <div className="rounded-lg px-3 py-2" style={{ background:'rgba(0,0,0,.3)', border:'1px solid var(--line)' }}>
                  <div className="eyebrow text-[9px] mb-1" style={{ color:'var(--brass-dim)' }}>الانتماء</div>
                  <div className="font-display text-[13.5px]" style={{ color:'var(--parchment)' }}>{s.faction}</div>
                </div>
              )}
            </div>
          )}
          {s && s.notes && (
            <p className="text-[13.5px] leading-relaxed mt-4" style={{ color:'#c2c9d1' }}>{s.notes}</p>
          )}
          {/* timeline + other details at the bottom */}
          {r.events.length>0 && (
            <div className="mt-5">
              <div className="eyebrow text-[9.5px] mb-2.5" style={{ color:'var(--brass-dim)' }}>الجدول الزمني (حتى فصلك)</div>
              <ol className="relative" style={{ borderRight:'1px solid var(--line)' }}>
                {r.events.map((e,i)=>(
                  <li key={i} className="relative pr-5 pb-3">
                    <span className="absolute right-[-5px] top-1.5 w-2.5 h-2.5 rounded-full"
                          style={{ background:'var(--crimson-glow)' }}/>
                    <span className="eyebrow text-[9px]" style={{ color:'var(--brass)' }}>فصل {e.chapter}</span>
                    <p className="text-[13px] mt-0.5" style={{ color:'var(--parchment)' }}>{e.text}</p>
                    {e.doc_ref && navigate && (
                      <button onClick={()=>navigate('document', e.doc_ref)}
                        className="chip focus-ring inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-display"
                        style={{ border:'1px solid var(--brass)', color:'var(--brass)' }}>
                        ↪ من المذكرات
                      </button>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CharactersSection({ chapter, focus, clearFocus, navigate }){
  const [q, setQ] = useState('');
  const [openId, setOpenId] = useState(null);
  const list = useMemo(()=> Eng.visibleCharacters(LOTM.characters, chapter), [chapter]);
  const filtered = useMemo(()=>{
    const t = q.trim();
    if(!t) return list;
    return list.filter(r => (r.name_ar+r.name_en+r.aliases.join(' ')+(r.pathway?r.pathway.name_ar:'')).includes(t));
  }, [list, q]);
  const open = openId ? Eng.resolveCharacter(LOTM.characters.find(c=>c.id===openId), chapter) : null;

  // Auto-open focused character
  useEffect(()=>{
    if(!focus || focus.kind !== 'character') return;
    const exists = list.find(r => r.id === focus.id);
    if(exists){ setOpenId(focus.id); }
    clearFocus && clearFocus();
  }, [focus]);

  return (
    <div className="h-full flex flex-col px-4 pt-6">
      <div className="max-w-[920px] w-full mx-auto flex items-center gap-2 px-3 h-11 rounded-md mb-3"
           style={{ background:'rgba(0,0,0,.35)', border:'1px solid var(--line)' }}>
        <Search size={16} style={{ color:'var(--brass)' }}/>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="ابحث عن شخصية…"
               aria-label="ابحث عن شخصية"
               className="bg-transparent outline-none w-full text-[14px] focus-ring" style={{ color:'#dfe4ea' }}/>
      </div>
      <div className="max-w-[920px] w-full mx-auto eyebrow text-[9px] mb-2" style={{ color:'var(--brass-dim)' }}>
        الشخصيات المعروفة حتى الفصل {chapter} — {filtered.length}
      </div>
      <div className="scroller overflow-y-auto flex-1 pb-6 max-w-[920px] w-full mx-auto">
        {filtered.length===0
          ? <p className="font-old italic text-center mt-10" style={{ color:'var(--parchment-dim)' }}>لا شخصيات مطابقة بعد.</p>
          : <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filtered.map(r => <CharacterCard key={r.id} r={r} onOpen={setOpenId}/>)}
            </div>
        }
      </div>
      {open && <CharacterDetail r={open} onClose={()=>setOpenId(null)} navigate={navigate}/>}
    </div>
  );
}

window.CharacterCard      = CharacterCard;
window.CharacterDetail    = CharacterDetail;
window.CharactersSection  = CharactersSection;

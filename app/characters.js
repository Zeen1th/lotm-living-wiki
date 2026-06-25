/** @jsxRuntime classic */ /** @jsx React.createElement */
function CharacterCard({ r, onOpen }){
  return (
    <button onClick={()=>onOpen(r.id)}
      className="listrow w-full text-right px-3 py-3 rounded-md flex items-center gap-3 mb-1.5 focus-ring"
      style={{ border:'1px solid var(--line)', background:'rgba(255,255,255,.015)' }}>
      <span className="grid place-items-center w-10 h-10 rounded-full shrink-0"
            style={{ background:'rgba(0,0,0,.45)', color:'var(--brass)', border:'1px solid var(--brass)' }}>
        <Users size={18}/>
      </span>
      <span className="min-w-0 flex-1">
        <span className="font-display block text-[15px] truncate" style={{ color:'var(--parchment)' }}>{r.name_ar}</span>
        <span className="block text-[11px] truncate" style={{ color:'var(--brass)' }}>
          {r.aliases[0] || (r.pathway && r.pathway.name_ar) || ''}
        </span>
      </span>
      {statusBadge(r.status)}
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
      <div className="sheet glass w-full max-w-[600px] rounded-xl overflow-y-auto scroller relative max-h-[88vh]"
           onClick={e=>e.stopPropagation()}>
        <div style={{ height:3, background:'linear-gradient(90deg,transparent,var(--crimson-glow),transparent)' }}/>
        <div className="px-6 pt-5 pb-4">
          <div className="flex items-center justify-between">
            <h2 className="font-deco text-[26px]" style={{ color:'var(--parchment)' }}>{r.name_ar}</h2>
            <button onClick={onClose} aria-label="إغلاق"
              className="w-9 h-9 grid place-items-center rounded-md focus-ring"
              style={{ background:'rgba(0,0,0,.4)', border:'1px solid var(--line)', color:'var(--parchment-dim)' }}>
              <X size={17}/>
            </button>
          </div>
          <p className="text-[13px] mt-1" style={{ color:'var(--parchment-dim)' }}>{r.name_en}</p>
          {r.aliases.length>0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {r.aliases.map(a=>(
                <span key={a} className="eyebrow text-[10px] px-2 py-1 rounded"
                  style={{ border:'1px solid var(--brass)', color:'var(--brass)' }}>{a}</span>
              ))}
            </div>
          )}
        </div>
        <div className="px-6 pb-6">
          {s && (
            <div className="hairline pt-4 grid sm:grid-cols-2 gap-3">
              {/* sequence — plain text */}
              {s.sequence && (
                <div className="rounded-lg px-3 py-2" style={{ background:'rgba(0,0,0,.3)', border:'1px solid var(--line)' }}>
                  <div className="eyebrow text-[9px] mb-1" style={{ color:'var(--brass-dim)' }}>التسلسل</div>
                  <div className="font-display text-[14px]" style={{ color:'var(--parchment)' }}>{s.sequence}</div>
                </div>
              )}
              {/* pathway — LinkChip if navigate available */}
              {r.pathway && (
                <div className="rounded-lg px-3 py-2" style={{ background:'rgba(0,0,0,.3)', border:'1px solid var(--line)' }}>
                  <div className="eyebrow text-[9px] mb-1" style={{ color:'var(--brass-dim)' }}>المسار</div>
                  <LinkChip kind="pathway" id={r.pathway.id} label={r.pathway.name_ar} navigate={navigate}/>
                </div>
              )}
              {/* location */}
              {s.location && (
                <div className="rounded-lg px-3 py-2" style={{ background:'rgba(0,0,0,.3)', border:'1px solid var(--line)' }}>
                  <div className="eyebrow text-[9px] mb-1" style={{ color:'var(--brass-dim)' }}>الموقع الحالي</div>
                  <div className="font-display text-[14px]" style={{ color:'var(--parchment)' }}>{s.location}</div>
                </div>
              )}
              {/* faction */}
              {s.faction && (
                <div className="rounded-lg px-3 py-2" style={{ background:'rgba(0,0,0,.3)', border:'1px solid var(--line)' }}>
                  <div className="eyebrow text-[9px] mb-1" style={{ color:'var(--brass-dim)' }}>الانتماء</div>
                  <div className="font-display text-[14px]" style={{ color:'var(--parchment)' }}>{s.faction}</div>
                </div>
              )}
            </div>
          )}
          {s && s.notes && (
            <p className="text-[13.5px] leading-relaxed mt-4" style={{ color:'#c2c9d1' }}>{s.notes}</p>
          )}
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
    <div className="h-full flex flex-col max-w-[760px] mx-auto px-4 pt-6">
      <div className="flex items-center gap-2 px-3 h-11 rounded-md mb-3"
           style={{ background:'rgba(0,0,0,.35)', border:'1px solid var(--line)' }}>
        <Search size={16} style={{ color:'var(--brass)' }}/>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="ابحث عن شخصية…"
               aria-label="ابحث عن شخصية"
               className="bg-transparent outline-none w-full text-[14px] focus-ring" style={{ color:'#dfe4ea' }}/>
      </div>
      <div className="eyebrow text-[9px] mb-2" style={{ color:'var(--brass-dim)' }}>
        الشخصيات المعروفة حتى الفصل {chapter} — {filtered.length}
      </div>
      <div className="scroller overflow-y-auto flex-1 pb-6">
        {filtered.length===0
          ? <p className="font-old italic text-center mt-10" style={{ color:'var(--parchment-dim)' }}>لا شخصيات مطابقة بعد.</p>
          : filtered.map(r => <CharacterCard key={r.id} r={r} onOpen={setOpenId}/>)}
      </div>
      {open && <CharacterDetail r={open} onClose={()=>setOpenId(null)} navigate={navigate}/>}
    </div>
  );
}

window.CharacterCard      = CharacterCard;
window.CharacterDetail    = CharacterDetail;
window.CharactersSection  = CharactersSection;

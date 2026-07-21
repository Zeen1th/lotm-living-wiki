/** @jsxRuntime classic */ /** @jsx React.createElement */
/* ----------------------------------------------------------------
   ENTITIES — الآلهة والكيانات فوق الطبيعية (الحكام / الكيانات)
   Icon-based cards grouped by kind (god / evil_god / emperor) + detail modal.
   No deity images yet — large themed Lucide glyphs on a dark card.
-----------------------------------------------------------------*/

// kind → icon + color + Arabic label
const ENTITY_KIND = {
  god:     { icon: Sun,   label: 'كيان أرثوذكسي', color: 'var(--brass)' },
  evil_god:{ icon: Eye,   label: 'كيان شرير',     color: 'var(--crimson-glow)' },
  emperor: { icon: Crown, label: 'إمبراطور',     color: 'var(--brass)' },
  mystery: { icon: Moon,  label: 'كيان غامض',    color: 'var(--brass)' },
  ancient: { icon: Eye,   label: 'كائن قديم',     color: 'var(--brass)' },
};

function kindOf(e){ return ENTITY_KIND[e.kind] || ENTITY_KIND.god; }

function EntityCard({ e, onOpen }){
  const k = kindOf(e);
  const Icon = k.icon;
  return (
    <button onClick={()=>onOpen(e.id)}
      className="group text-right rounded-lg overflow-hidden focus-ring transition-all w-full"
      style={{ border:'1px solid var(--line)', background:'rgba(255,255,255,.015)' }}>
      {/* glyph region — portrait-shaped, themed icon on dark bg */}
      <div className="relative w-full grid place-items-center"
           style={{ aspectRatio:'4 / 5', overflow:'hidden',
                    background:'radial-gradient(circle at 50% 35%, rgba(40,30,12,.45), rgba(4,5,8,.6))' }}>
        <div className="transition-transform duration-500 group-hover:scale-110"
             style={{ color:k.color, filter:'drop-shadow(0 0 14px ' + k.color + ')' }}>
          <Icon size={56}/>
        </div>
        {/* gradient + kind badge */}
        <div className="absolute inset-0 pointer-events-none"
             style={{ background:'linear-gradient(to top, rgba(4,5,8,.92) 0%, rgba(4,5,8,0) 50%)' }}/>
        <span className="absolute top-2 left-2 eyebrow text-[11px]" style={{ color:k.color }}>{k.label}</span>
      </div>
      <div className="px-2.5 py-2">
        <div className="font-display text-[14px] truncate" style={{ color:'var(--parchment)' }}>{e.name_ar}</div>
        <div className="eyebrow text-[11px] truncate mt-0.5" style={{ color:'var(--parchment-dim)' }}>{e.name_en}</div>
      </div>
    </button>
  );
}

function EntityDetail({ e, onClose, navigate, fontScale }){
  useEffect(()=>{
    const h = (ev)=>{ if(ev.key==='Escape') onClose(); };
    window.addEventListener('keydown', h);
    return ()=> window.removeEventListener('keydown', h);
  }, [onClose]);
  if(!e) return null;
  const k = kindOf(e);
  const Icon = k.icon;
  const s = e.state;
  const aliases = e.aliases || [];
  const events = e.events || [];
  return (
    <div className="backdrop fixed inset-0 z-40 grid place-items-center p-4"
         style={{ background:'rgba(4,5,8,.74)', backdropFilter:'blur(4px)', zoom: fontScale || 1 }}
         onClick={onClose} role="dialog" aria-modal="true" aria-label={e.name_ar}>
      <div className="sheet glass w-full max-w-[520px] rounded-xl overflow-y-auto scroller relative max-h-[88vh]"
           onClick={ev=>ev.stopPropagation()}>
        <div style={{ height:3, background:'linear-gradient(90deg,transparent,var(--crimson-glow),transparent)' }}/>

        {/* hero */}
        <div className="relative pt-5 pb-4 text-center">
          <button onClick={onClose} aria-label="إغلاق"
            className="absolute top-3 left-3 w-9 h-9 grid place-items-center rounded-md focus-ring"
            style={{ background:'rgba(0,0,0,.5)', border:'1px solid var(--line)', color:'var(--parchment-dim)', zIndex:2 }}>
            <X size={17}/>
          </button>
          {/* large glyph medallion */}
          <div className="mx-auto mb-3 rounded-full grid place-items-center"
               style={{ width:96, height:96,
                        background:'radial-gradient(circle, rgba(40,30,12,.6), rgba(4,5,8,.7))',
                        border:'1px solid ' + k.color,
                        boxShadow:'0 0 28px rgba(0,0,0,.6)' }}>
            <div style={{ color:k.color, filter:'drop-shadow(0 0 10px ' + k.color + ')' }}>
              <Icon size={44}/>
            </div>
          </div>
          <h2 className="font-deco text-[26px]" style={{ color:'var(--parchment)' }}>{e.name_ar}</h2>
          <p className="text-[12.5px] mt-0.5" style={{ color:'var(--parchment-dim)' }}>{e.name_en}</p>
          <span className="eyebrow text-[11px] mt-2 inline-block px-2 py-0.5 rounded"
                style={{ border:'1px solid ' + k.color, color:k.color }}>{k.label}</span>
          {aliases.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-2.5">
              {aliases.map(a=>(
                <span key={a.name} className="eyebrow text-[11px] px-2 py-0.5 rounded"
                  style={{ border:'1px solid var(--brass)', color:'var(--brass)' }}>{a.name}</span>
              ))}
            </div>
          )}
        </div>

        {/* status cards */}
        <div className="px-6 pb-6">
          {s && (
            <div className="grid grid-cols-2 gap-2.5">
              {s.role && (
                <div className="rounded-lg px-3 py-2" style={{ background:'rgba(0,0,0,.3)', border:'1px solid var(--line)' }}>
                  <div className="eyebrow text-[11px] mb-1" style={{ color:'var(--brass-dim)' }}>الصفة</div>
                  <div className="font-display text-[13.5px]" style={{ color:'var(--parchment)' }}>{s.role}</div>
                </div>
              )}
              {s.domain && (
                <div className="rounded-lg px-3 py-2" style={{ background:'rgba(0,0,0,.3)', border:'1px solid var(--line)' }}>
                  <div className="eyebrow text-[11px] mb-1" style={{ color:'var(--brass-dim)' }}>النطاق</div>
                  <div className="font-display text-[13.5px]" style={{ color:'var(--parchment)' }}>{s.domain}</div>
                </div>
              )}
            </div>
          )}
          {s && s.notes && (
            <p className="text-[13.5px] leading-relaxed mt-4" style={{ color:'#c2c9d1' }}>{s.notes}</p>
          )}
          {e.blurb_ar && (!s || !s.notes) && (
            <p className="font-old text-[13.5px] leading-relaxed mt-4" style={{ color:'#c2c9d1' }}>{e.blurb_ar}</p>
          )}

          {/* timeline */}
          {events.length > 0 && (
            <div className="mt-5">
              <div className="eyebrow text-[11px] mb-2.5" style={{ color:'var(--brass-dim)' }}>الجدول الزمني (حتى فصلك)</div>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EntitiesView({ chapter, focus, clearFocus, navigate, fontScale }){
  const [openId, setOpenId] = useState(null);
  const list = useMemo(()=> Eng.visibleEntities(LOTM.entities, chapter), [chapter]);
  const open = openId ? Eng.resolveEntity(LOTM.entities.find(e=>e.id===openId), chapter) : null;

  // group by kind for display
  const groups = useMemo(()=>{
    const order = ['god','evil_god','emperor','ancient','mystery'];
    const map = {};
    for(const e of list){ (map[e.kind] = map[e.kind] || []).push(e); }
    return order.filter(k=>map[k] && map[k].length).map(k=>({ kind:k, items:map[k] }));
  }, [list]);

  // Auto-open focused entity
  useEffect(()=>{
    if(!focus || focus.kind !== 'entity') return;
    const exists = list.find(e=>e.id === focus.id);
    if(exists){ setOpenId(focus.id); }
    clearFocus && clearFocus();
  }, [focus]);

  return (
    <div className="h-full flex flex-col px-4 pt-6">
      <div className="max-w-[920px] w-full mx-auto eyebrow text-[11px] mb-2" style={{ color:'var(--brass-dim)' }}>
        الآلهة والكيانات فوق الطبيعية حتى الفصل {chapter} — {list.length}
      </div>
      <div className="scroller overflow-y-auto flex-1 pb-6 max-w-[920px] w-full mx-auto">
        {groups.map(g=>(
          <div key={g.kind} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background:(ENTITY_KIND[g.kind]||{}).color || 'var(--brass)' }}/>
              <span className="font-display text-[15px]" style={{ color:'var(--parchment)' }}>
                {(ENTITY_KIND[g.kind]||{}).label || g.kind}
              </span>
              <span className="eyebrow text-[11px]" style={{ color:'var(--parchment-dim)' }}>— {g.items.length}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {g.items.map(e=> <EntityCard key={e.id} e={e} onOpen={setOpenId}/>)}
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <p className="font-old italic text-center mt-10" style={{ color:'var(--parchment-dim)' }}>
            لا كيانات معروفة بعد.
          </p>
        )}
      </div>
      {open && <EntityDetail e={open} onClose={()=>setOpenId(null)} navigate={navigate} fontScale={fontScale}/>}
    </div>
  );
}

window.EntityCard    = EntityCard;
window.EntityDetail  = EntityDetail;
window.EntitiesView  = EntitiesView;
window.ENTITY_KIND   = ENTITY_KIND;

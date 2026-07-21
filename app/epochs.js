/** @jsxRuntime classic */ /** @jsx React.createElement */
/* ---- EPOCHS ---- */
function EraDetail({ era, onClose, fontScale }){
  useEffect(()=>{
    const h = (e)=>{ if(e.key==='Escape') onClose(); };
    window.addEventListener('keydown', h);
    return ()=> window.removeEventListener('keydown', h);
  }, [onClose]);
  if(!era) return null;

  return (
    <div className="backdrop fixed inset-0 z-40 grid place-items-center p-4"
         style={{ background:'rgba(4,5,8,.74)', backdropFilter:'blur(4px)', zoom: fontScale || 1 }}
         onClick={onClose} role="dialog" aria-modal="true" aria-label={era.name_ar}>
      <div className="sheet glass w-full max-w-[600px] rounded-xl overflow-y-auto scroller relative max-h-[88vh]"
           onClick={e=>e.stopPropagation()}>
        <div style={{ height:3, background:'linear-gradient(90deg,transparent,var(--brass),transparent)' }}/>
        <div className="px-6 pt-5 pb-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h2 className="font-deco text-[24px] leading-tight" style={{ color:'var(--parchment)' }}>{era.name_ar}</h2>
              <p className="text-[12.5px] mt-0.5" style={{ color:'var(--parchment-dim)' }}>{era.name_en}</p>
            </div>
            <button onClick={onClose} aria-label="إغلاق"
              className="shrink-0 w-9 h-9 grid place-items-center rounded-md focus-ring"
              style={{ background:'rgba(0,0,0,.4)', border:'1px solid var(--line)', color:'var(--parchment-dim)' }}>
              <X size={17}/>
            </button>
          </div>
        </div>
        <div className="px-6 pb-6 scroller overflow-y-auto" style={{ maxHeight:'70vh' }}>
          {era.blurb_ar && (
            <p className="font-old text-[13.5px] leading-relaxed mb-4" style={{ color:'#c2c9d1' }}>{era.blurb_ar}</p>
          )}
          <div className="eyebrow text-[11px] mb-2" style={{ color:'var(--brass-dim)' }}>الحقائق المسجّلة</div>
          {(era.facts||[]).length === 0
            ? <EmptyNote text="لا حقائق مسجّلة بعد"/>
            : (
              <ol className="relative" style={{ borderRight:'1px solid var(--line)' }}>
                {era.facts.map((f,i)=>(
                  <li key={i} className="relative pr-5 pb-3">
                    <span className="absolute right-[-5px] top-1.5 w-2.5 h-2.5 rounded-full"
                          style={{ background:'var(--brass)' }}/>
                    <span className="eyebrow text-[11px]" style={{ color:'var(--brass)' }}>فصل {f.chapter}</span>
                    <p className="text-[13px] mt-0.5" style={{ color:'var(--parchment)' }}>{f.text}</p>
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

function EpochsView({ chapter, fontScale }){
  const [openId, setOpenId] = useState(null);
  const list = useMemo(()=>
    Eng.visibleOf(LOTM.eras, chapter, Eng.resolveEra)
      .filter(Boolean)
      .sort((a,b)=>a.order-b.order),
    [chapter]
  );
  const open = openId ? Eng.resolveEra(Eng.byId(LOTM.eras, openId), chapter) : null;

  return (
    <div className="h-full flex flex-col max-w-[760px] mx-auto px-4 pt-6">
      <div className="eyebrow text-[11px] mb-2" style={{ color:'var(--brass-dim)' }}>
        الحقب المعروفة حتى الفصل {chapter} — {list.length}
      </div>
      <SectionList
        items={list}
        emptyLabel="لا حقب مكتشفة بعد"
        renderRow={era=>(
          <button key={era.id} onClick={()=>setOpenId(era.id)}
            className="listrow w-full text-right px-3 py-3 rounded-md flex items-center gap-3 mb-1.5 focus-ring"
            style={{ border:'1px solid var(--line)', background:'rgba(255,255,255,.015)' }}>
            <span className="grid place-items-center w-10 h-10 rounded-full shrink-0 font-deco text-[16px]"
                  style={{ background:'rgba(0,0,0,.45)', color:'var(--brass)', border:'1px solid var(--brass)' }}>
              {era.order}
            </span>
            <span className="min-w-0 flex-1">
              <span className="font-display block text-[15px] truncate" style={{ color:'var(--parchment)' }}>{era.name_ar}</span>
              <span className="block text-[12px] truncate" style={{ color:'var(--brass)' }}>{era.name_en}</span>
            </span>
          </button>
        )}
      />
      {open && <EraDetail era={open} onClose={()=>setOpenId(null)} fontScale={fontScale}/>}
    </div>
  );
}

window.EraDetail   = EraDetail;
window.EpochsView  = EpochsView;

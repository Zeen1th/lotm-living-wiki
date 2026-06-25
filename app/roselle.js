/** @jsxRuntime classic */ /** @jsx React.createElement */
/* ---- ROSELLE DIARY ---- */
function RoselleView({ chapter }){
  const doc = useMemo(()=>{
    const raw = Eng.byId(LOTM.documents, 'roselle_diary');
    return raw ? Eng.resolveDocument(raw, chapter) : null;
  }, [chapter]);

  if(!doc) return <EmptyNote text="المذكرات غير متاحة بعد"/>;

  /* group entries by topic_ar */
  const groups = useMemo(()=>{
    const map = {};
    (doc.entries || []).forEach(e=>{
      const k = e.topic_ar || 'عام';
      if(!map[k]) map[k] = [];
      map[k].push(e);
    });
    return Object.entries(map);
  }, [doc]);

  return (
    <div className="h-full flex flex-col max-w-[760px] mx-auto px-4 pt-6">
      <h2 className="font-deco text-[22px] mb-1" style={{ color:'var(--parchment)' }}>{doc.name_ar}</h2>
      {doc.blurb_ar && (
        <p className="font-old text-[13.5px] leading-relaxed mb-4" style={{ color:'#c2c9d1' }}>{doc.blurb_ar}</p>
      )}
      <div className="eyebrow text-[9px] mb-3" style={{ color:'var(--brass-dim)' }}>
        المدخلات المكتشفة حتى الفصل {chapter} — {(doc.entries||[]).length}
      </div>
      <div className="scroller overflow-y-auto flex-1 pb-6">
        {groups.length === 0
          ? <EmptyNote text="لا مدخلات بعد — تُضاف مع تقدّم القراءة"/>
          : groups.map(([topic, entries])=>(
            <div key={topic} className="mb-6">
              <div className="eyebrow text-[9px] mb-2" style={{ color:'var(--brass)' }}>{topic}</div>
              <ol className="relative" style={{ borderRight:'1px solid var(--line)' }}>
                {entries.map((e,i)=>(
                  <li key={i} className="relative pr-5 pb-3">
                    <span className="absolute right-[-5px] top-1.5 w-2.5 h-2.5 rounded-full"
                          style={{ background:'var(--crimson-glow)' }}/>
                    <span className="eyebrow text-[9px]" style={{ color:'var(--brass)' }}>فصل {e.chapter}</span>
                    <p className="text-[13px] mt-0.5" style={{ color:'var(--parchment)' }}>{e.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          ))
        }
      </div>
    </div>
  );
}

window.RoselleView = RoselleView;

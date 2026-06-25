/** @jsxRuntime classic */ /** @jsx React.createElement */
/* ---- reading-progress state, persisted ---- */
function useChapter(){
  const [chapter, setChapter] = useState(()=>{
    const raw = parseInt(localStorage.getItem('lotm.chapter'), 10);
    const start = Number.isFinite(raw) ? raw : CAP;
    return Math.min(CAP, Math.max(1, start));
  });
  useEffect(()=>{ localStorage.setItem('lotm.chapter', String(chapter)); }, [chapter]);
  const set = (n)=> setChapter(Math.min(CAP, Math.max(1, n|0)));
  return [chapter, set];
}

/* ---- the spoiler slider ---- */
function ChapterSlider({ chapter, setChapter }){
  const vol = (LOTM.meta.volumes||[]).find(v=> chapter>=v.start_chapter && chapter<=v.end_chapter);
  return (
    <div className="glass rounded-lg px-4 py-2.5 flex items-center gap-3">
      <span className="eyebrow text-[9px]" style={{ color:'var(--brass)' }}>أقصى فصل قرأته</span>
      <input type="range" min="1" max={CAP} value={chapter}
             onChange={e=>setChapter(parseInt(e.target.value,10))}
             aria-label="أقصى فصل قرأته"
             className="w-44 accent-[color:var(--crimson-glow)]" />
      <span className="font-display text-[15px]" style={{ color:'var(--parchment)' }}>
        {chapter} / {CAP}
      </span>
      {vol && <span className="eyebrow text-[8.5px]" style={{ color:'var(--parchment-dim)' }}>{vol.name_ar}</span>}
    </div>
  );
}

/* ----------------------------------------------------------------
   NAV BAR — RTL horizontal navigation
-----------------------------------------------------------------*/
function NavBar({ view, setView }){
  return (
    <nav className="glass shrink-0 flex items-center gap-1 px-3 py-1.5 overflow-x-auto"
         style={{ borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)' }}
         aria-label="التنقل بين الأقسام">
      {NAV_VIEWS.map(v => {
        const active = v.id === view;
        return (
          <button key={v.id}
            onClick={()=>setView(v.id)}
            className="focus-ring shrink-0 px-3 py-1.5 rounded-md font-display text-[13px] transition-colors"
            style={{
              background: active ? 'rgba(179,18,43,.22)' : 'transparent',
              color:       active ? 'var(--crimson-glow)' : 'var(--parchment-dim)',
              border:      active ? '1px solid rgba(179,18,43,.45)' : '1px solid transparent',
            }}
            aria-current={active ? 'page' : undefined}>
            {v.label}
          </button>
        );
      })}
    </nav>
  );
}

/* ----------------------------------------------------------------
   WELCOME OVERLAY — shown only when localStorage was empty at boot
-----------------------------------------------------------------*/
function WelcomeOverlay({ chapter, setChapter, onDismiss }){
  useEffect(()=>{
    const h = (e)=>{ if(e.key==='Escape') onDismiss(); };
    window.addEventListener('keydown', h);
    return ()=> window.removeEventListener('keydown', h);
  }, [onDismiss]);

  return (
    <div className="backdrop fixed inset-0 z-50 grid place-items-center p-4"
         style={{ background:'rgba(4,5,8,.82)', backdropFilter:'blur(6px)' }}
         role="dialog" aria-modal="true" aria-label="اختر فصلك">
      <div className="sheet glass w-full max-w-[480px] rounded-xl overflow-hidden"
           onClick={e=>e.stopPropagation()}>
        <div style={{ height:3, background:'linear-gradient(90deg,transparent,var(--crimson-glow),transparent)' }}/>
        <div className="px-6 pt-6 pb-8 text-center">
          <div className="mb-4 flex justify-center">
            <Crest size={52} accent="crimson"/>
          </div>
          <h2 className="font-deco text-[24px] mb-2" style={{ color:'var(--parchment)' }}>
            إلى أي فصل وصلت؟
          </h2>
          <p className="font-old text-[14px] mb-6" style={{ color:'var(--parchment-dim)' }}>
            اختر آخر فصل قرأته لتفادي الحرق
          </p>
          <div className="flex flex-col items-center gap-3 mb-6">
            <input type="range" min="1" max={CAP} value={chapter}
                   onChange={e=>setChapter(parseInt(e.target.value,10))}
                   aria-label="أقصى فصل قرأته"
                   className="w-full accent-[color:var(--crimson-glow)]"/>
            <span className="font-display text-[18px]" style={{ color:'var(--parchment)' }}>
              {chapter} / {CAP}
            </span>
          </div>
          <button onClick={onDismiss}
            className="focus-ring px-8 py-2.5 rounded-lg font-display text-[15px]"
            style={{ background:'var(--crimson)', color:'#fff', border:'1px solid var(--crimson-glow)' }}>
            ابدأ
          </button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   GENERAL HUB — landing page linking to all sections
-----------------------------------------------------------------*/
function GeneralHub({ setView, navigate }){
  return (
    <div className="h-full overflow-y-auto scroller">
      <div className="bloodmoon"/>
      <div className="relative z-10 max-w-[720px] mx-auto px-4 pt-16 pb-10">
        <div className="text-center mb-8">
          <div className="eyebrow text-[10px] mb-1" style={{ color:'var(--brass)' }}>سيد الألغاز</div>
          <h2 className="font-deco text-[28px]" style={{ color:'var(--parchment)' }}>الموسوعة الحية</h2>
          <p className="font-old text-[14px] mt-2" style={{ color:'var(--parchment-dim)' }}>
            دليلك الشامل لعالم المسارات — مقيَّد بفصلك الحالي
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {HUB_CARDS.map(c=>(
            <button key={c.id} onClick={()=>setView(c.id)}
              className="chip glass text-right rounded-xl px-4 py-4 focus-ring"
              style={{ border:'1px solid var(--line)' }}>
              <div className="font-display text-[16px] mb-1" style={{ color:'var(--parchment)' }}>{c.label}</div>
              <div className="font-old text-[13px]" style={{ color:'var(--parchment-dim)' }}>{c.desc}</div>
            </button>
          ))}
        </div>

        {/* مفاهيم أساسية — hoverable glossary terms */}
        <div className="mt-8 glass rounded-xl px-5 py-4" style={{ border:'1px solid var(--line)' }}>
          <div className="eyebrow text-[9px] mb-3" style={{ color:'var(--brass)' }}>مفاهيم أساسية</div>
          <div className="flex flex-wrap gap-3">
            {HUB_CONCEPTS.map(gid=>{
              const entry = (LOTM.glossary || []).find(g => g.id === gid);
              if(!entry) return null;
              return (
                <span key={gid}
                  className="glass rounded-lg px-3 py-2 font-old text-[13px]"
                  style={{ border:'1px solid var(--line)', color:'var(--parchment-dim)' }}>
                  <Term id={gid} navigate={navigate}>
                    <span style={{ color:'var(--parchment)', fontWeight:700 }}>{entry.term_ar}</span>
                  </Term>
                </span>
              );
            })}
          </div>
          <p className="font-old text-[11px] mt-3" style={{ color:'var(--parchment-dim)', opacity:0.7 }}>
            مرّر المؤشر فوق أي مصطلح للاطلاع على تعريفه
          </p>
        </div>
      </div>
    </div>
  );
}

window.useChapter      = useChapter;
window.ChapterSlider   = ChapterSlider;
window.NavBar          = NavBar;
window.WelcomeOverlay  = WelcomeOverlay;
window.GeneralHub      = GeneralHub;

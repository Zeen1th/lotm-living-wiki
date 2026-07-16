/** @jsxRuntime classic */ /** @jsx React.createElement */
/* ---- ORGANIZATIONS ---- */
function OrgDetail({ org, chapter, onClose, navigate }){
  useEffect(()=>{
    const h = (e)=>{ if(e.key==='Escape') onClose(); };
    window.addEventListener('keydown', h);
    return ()=> window.removeEventListener('keydown', h);
  }, [onClose]);
  if(!org) return null;

  const state   = org.state;
  const blurb   = state ? state.blurb_ar : null;

  /* resolve leader */
  const leaderChar = (state && state.leader_id)
    ? Eng.resolveCharacter(Eng.byId(LOTM.characters, state.leader_id), chapter)
    : null;

  /* resolve hq — only when the location is visible at current chapter */
  const hqLoc = (function(){
    if(!(state && state.hq_location_id)) return null;
    const l = Eng.byId(LOTM.locations, state.hq_location_id);
    return (l && Eng.isVisible(l, chapter)) ? l : null;
  })();

  /* visible members */
  const members = (org.member_ids || [])
    .map(id => Eng.resolveCharacter(Eng.byId(LOTM.characters, id), chapter))
    .filter(Boolean);

  /* visible events */
  const events = org.events || [];

  return (
    <div className="backdrop fixed inset-0 z-40 grid place-items-center p-4"
         style={{ background:'rgba(4,5,8,.74)', backdropFilter:'blur(4px)' }}
         onClick={onClose} role="dialog" aria-modal="true" aria-label={org.name_ar}>
      <div className="sheet glass w-full max-w-[600px] rounded-xl overflow-y-auto scroller relative max-h-[88vh]"
           onClick={e=>e.stopPropagation()}>
        <div style={{ height:3, background:'linear-gradient(90deg,transparent,var(--crimson-glow),transparent)' }}/>
        <div className="px-6 pt-5 pb-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h2 className="font-deco text-[24px] leading-tight" style={{ color:'var(--parchment)' }}>{org.name_ar}</h2>
              <p className="text-[12.5px] mt-0.5" style={{ color:'var(--parchment-dim)' }}>{org.name_en}</p>
              <span className="eyebrow text-[11px] mt-1 inline-block" style={{ color:'var(--brass)' }}>
                {ORG_KIND_AR[org.kind] || org.kind}
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
          {blurb && (
            <p className="font-old text-[13.5px] leading-relaxed mb-4" style={{ color:'#c2c9d1' }}>{blurb}</p>
          )}

          {/* leader + hq */}
          {(leaderChar || hqLoc) && (
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {leaderChar && (
                <div className="rounded-lg px-3 py-2" style={{ background:'rgba(0,0,0,.3)', border:'1px solid var(--line)' }}>
                  <div className="eyebrow text-[11px] mb-1" style={{ color:'var(--brass-dim)' }}>القائد</div>
                  <LinkChip kind="character" id={leaderChar.id} label={leaderChar.name_ar} navigate={navigate}/>
                </div>
              )}
              {hqLoc && (
                <div className="rounded-lg px-3 py-2" style={{ background:'rgba(0,0,0,.3)', border:'1px solid var(--line)' }}>
                  <div className="eyebrow text-[11px] mb-1" style={{ color:'var(--brass-dim)' }}>المقر</div>
                  <LinkChip kind="location" id={hqLoc.id} label={hqLoc.name_ar} navigate={navigate}/>
                </div>
              )}
            </div>
          )}

          {/* members */}
          <div className="eyebrow text-[11px] mb-2" style={{ color:'var(--brass-dim)' }}>الأعضاء</div>
          {members.length === 0
            ? <EmptyNote text="لا أعضاء معروفون بعد"/>
            : (
              <div className="flex flex-wrap gap-2 mb-4">
                {members.map(m=>(
                  <LinkChip key={m.id} kind="character" id={m.id} label={m.name_ar} navigate={navigate}/>
                ))}
              </div>
            )
          }

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

function OrganizationsView({ chapter, focus, clearFocus, navigate }){
  const [openId, setOpenId] = useState(null);
  const list = useMemo(()=>
    Eng.visibleOf(LOTM.organizations, chapter, Eng.resolveOrganization).filter(Boolean),
    [chapter]
  );
  const open = openId ? Eng.resolveOrganization(Eng.byId(LOTM.organizations, openId), chapter) : null;

  // Auto-open focused organization
  useEffect(()=>{
    if(!focus || focus.kind !== 'organization') return;
    const exists = list.find(o => o.id === focus.id);
    if(exists){ setOpenId(focus.id); }
    clearFocus && clearFocus();
  }, [focus]);

  return (
    <div className="h-full flex flex-col max-w-[760px] mx-auto px-4 pt-6">
      <div className="eyebrow text-[11px] mb-2" style={{ color:'var(--brass-dim)' }}>
        المنظمات المعروفة حتى الفصل {chapter} — {list.length}
      </div>
      <SectionList
        items={list}
        emptyLabel="لا منظمات مكتشفة بعد"
        renderRow={org=>(
          <button key={org.id} onClick={()=>setOpenId(org.id)}
            className="listrow w-full text-right px-3 py-3 rounded-md flex items-center gap-3 mb-1.5 focus-ring"
            style={{ border:'1px solid var(--line)', background:'rgba(255,255,255,.015)' }}>
            <span className="grid place-items-center w-10 h-10 rounded-full shrink-0"
                  style={{ background:'rgba(0,0,0,.45)', color:'var(--brass)', border:'1px solid var(--brass)' }}>
              <Landmark size={18}/>
            </span>
            <span className="min-w-0 flex-1">
              <span className="font-display block text-[15px] truncate" style={{ color:'var(--parchment)' }}>{org.name_ar}</span>
              <span className="block text-[12px] truncate" style={{ color:'var(--brass)' }}>
                {ORG_KIND_AR[org.kind] || org.kind}
              </span>
            </span>
          </button>
        )}
      />
      {open && <OrgDetail org={open} chapter={chapter} onClose={()=>setOpenId(null)} navigate={navigate}/>}
    </div>
  );
}

window.OrgDetail          = OrgDetail;
window.OrganizationsView  = OrganizationsView;

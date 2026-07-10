/** @jsxRuntime classic */ /** @jsx React.createElement */
/* ----------------------------------------------------------------
   LOCATION DETAIL PANEL — shown when a location is clicked
-----------------------------------------------------------------*/
function LocationPanel({ loc, chapter, onClose, onSelectChild, navigate }){
  useEffect(()=>{
    const h = (e)=>{ if(e.key==='Escape') onClose(); };
    window.addEventListener('keydown', h);
    return ()=> window.removeEventListener('keydown', h);
  }, [onClose]);

  if(!loc) return null;

  const state = Eng.currentState(loc, chapter);
  const blurb = state ? state.blurb_ar : 'لا توجد تفاصيل بعد';

  // Children visible at chapter
  const children = (loc.contains_ids || [])
    .map(cid => Eng.byId(LOTM.locations, cid))
    .filter(c => c && Eng.isVisible(c, chapter));

  // Characters here: string-match loc.name_ar in character's state.location
  const visChars = Eng.visibleCharacters(LOTM.characters, chapter);
  const hereChars = visChars.filter(c => {
    const st = c.state;
    return st && st.location && st.location.includes(loc.name_ar);
  });

  return (
    <div className="backdrop fixed inset-0 z-40 flex items-start justify-end p-4 pointer-events-none"
         style={{ background:'rgba(4,5,8,.55)', backdropFilter:'blur(3px)' }}>
      <div className="sheet glass w-full max-w-[360px] rounded-xl overflow-hidden pointer-events-auto"
           style={{ marginTop:'4rem' }}
           onClick={e=>e.stopPropagation()}>
        {/* accent bar */}
        <div style={{ height:3, background:'linear-gradient(90deg,transparent,var(--brass),transparent)' }}/>
        <div className="px-5 pt-4 pb-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="font-deco text-[22px] leading-tight" style={{ color:'var(--parchment)' }}>{loc.name_ar}</h2>
              <p className="text-[11px] mt-0.5" style={{ color:'var(--parchment-dim)' }}>{loc.name_en}</p>
              <span className="eyebrow text-[9px] mt-1 inline-block" style={{ color:'var(--brass)' }}>
                {KIND_AR[loc.kind] || loc.kind}
              </span>
            </div>
            <button onClick={onClose} aria-label="إغلاق"
              className="shrink-0 w-8 h-8 grid place-items-center rounded-md focus-ring mt-0.5"
              style={{ background:'rgba(0,0,0,.4)', border:'1px solid var(--line)', color:'var(--parchment-dim)' }}>
              <X size={15}/>
            </button>
          </div>
        </div>
        <div className="px-5 pb-5 scroller overflow-y-auto" style={{ maxHeight:'60vh' }}>
          {/* blurb */}
          <p className="font-old text-[13.5px] leading-relaxed mt-3" style={{ color:'#c2c9d1' }}>{blurb}</p>

          {/* contains */}
          {children.length > 0 && (
            <div className="mt-4">
              <div className="eyebrow text-[9px] mb-2" style={{ color:'var(--brass-dim)' }}>ما بداخلها</div>
              <div className="flex flex-wrap gap-1.5">
                {children.map(c=>(
                  <button key={c.id}
                    onClick={()=>onSelectChild(c)}
                    className="chip focus-ring px-2.5 py-1 rounded-md text-[12px] font-display"
                    style={{ background:'rgba(0,0,0,.35)', border:'1px solid var(--line)', color:'var(--parchment)' }}>
                    {c.name_ar}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* who's here */}
          {hereChars.length > 0 && (
            <div className="mt-4">
              <div className="eyebrow text-[9px] mb-2" style={{ color:'var(--brass-dim)' }}>من هنا الآن</div>
              <div className="flex flex-wrap gap-1.5">
                {hereChars.map(c=>(
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

/* ----------------------------------------------------------------
   MAP VIEW — data-driven interactive world map
-----------------------------------------------------------------*/
function MapView({ chapter, focus, clearFocus, navigate }){
  const [focusedId, setFocusedId] = useState(null);
  const [panelLoc, setPanelLoc] = useState(null);

  // Locations visible at chapter
  const visLocs = useMemo(()=>
    (LOTM.locations || []).filter(loc => Eng.isVisible(loc, chapter)),
    [chapter]);

  // Auto-open focused location
  useEffect(()=>{
    if(!focus || focus.kind !== 'location') return;
    const loc = (LOTM.locations || []).find(l => l.id === focus.id && Eng.isVisible(l, chapter));
    if(loc){ setFocusedId(loc.id); setPanelLoc(loc); }
    clearFocus && clearFocus();
  }, [focus]);

  // Pan/zoom math ported from atlas WorldMap
  const rawTarget = focusedId ? visLocs.find(l=>l.id===focusedId) : null;
  const target = (rawTarget && rawTarget.map) ? rawTarget : null;  // guard: only pan to mappable locations
  const s = target ? 1.85 : 1;
  const tcx = target ? target.map.cx : 500;
  const tcy = target ? target.map.cy : 320;
  const tx = target ? (500 - s*tcx) : 0;
  const ty = target ? (320 - s*tcy) : 0;
  const transform = 'translate(' + tx + 'px, ' + ty + 'px) scale(' + s + ')';

  function handlePlace(loc){
    setFocusedId(loc.id);
    setPanelLoc(loc);
  }

  function handleClose(){
    setPanelLoc(null);
  }

  function handleSelectChild(child){
    setFocusedId(child.id);
    setPanelLoc(child);
  }

  function handleReset(){
    setFocusedId(null);
    setPanelLoc(null);
  }

  // Partition locations
  const regions = visLocs.filter(l => l.kind === 'region');
  const seas    = visLocs.filter(l => l.kind === 'sea');
  const cities  = visLocs.filter(l => l.kind === 'city');

  // Is forsaken visible?
  const forsakenVisible = visLocs.some(l=>l.id==='forsaken');
  const rorstedVisible  = visLocs.some(l=>l.id==='rorsted');
  const fogseaVisible   = visLocs.some(l=>l.id==='fogsea');

  return (
    <div className="h-full w-full relative overflow-hidden" style={{ background:'var(--void)' }}>
      {/* bloodmoon stays visible behind the map */}
      <div className="bloodmoon"/>

      {/* main SVG */}
      <svg viewBox="0 0 1000 640" className="w-full h-full block absolute inset-0"
           preserveAspectRatio="xMidYMid meet"
           role="img" aria-label="خريطة عالم سيد الغوامض">
        <defs>
          <radialGradient id="mvSeaGrad" cx="50%" cy="38%" r="80%">
            <stop offset="0%" stopColor="#11212c"/>
            <stop offset="55%" stopColor="var(--sea)"/>
            <stop offset="100%" stopColor="#05080c"/>
          </radialGradient>
          <linearGradient id="mvLandGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2b3543"/>
            <stop offset="100%" stopColor="#161d27"/>
          </linearGradient>
          <linearGradient id="mvAbyssGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0c12"/>
            <stop offset="100%" stopColor="var(--abyss)"/>
          </linearGradient>
          <radialGradient id="mvStormGrad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="rgba(120,40,55,.30)"/>
            <stop offset="100%" stopColor="rgba(120,40,55,0)"/>
          </radialGradient>
          <filter id="mvSoft"><feGaussianBlur stdDeviation="7"/></filter>
          <filter id="mvGlowF" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.4" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <pattern id="mvLatlong" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M56 0H0V56" fill="none" stroke="rgba(200,162,74,.05)" strokeWidth="1"/>
          </pattern>
        </defs>

        {/* base sea */}
        <rect x="0" y="0" width="1000" height="640" fill="url(#mvSeaGrad)"/>
        <rect x="0" y="0" width="1000" height="640" fill="url(#mvLatlong)"/>

        <g className="panZoom" style={{ transform }}>
          {/* faint current lines */}
          <g stroke="rgba(120,160,180,.10)" strokeWidth="1" fill="none">
            <path d="M40 130 C 200 110, 360 150, 520 120"/>
            <path d="M60 420 C 260 400, 520 440, 760 415"/>
            <path d="M540 280 C 640 300, 720 270, 820 300"/>
          </g>

          {/* Berserk Sea storm band — static decoration */}
          <ellipse cx="500" cy="376" rx="470" ry="58" fill="url(#mvStormGrad)"/>
          <g opacity="0.7">
            <rect x="40" y="332" width="920" height="92" fill="rgba(40,60,72,.10)"/>
            <g stroke="rgba(150,180,200,.18)" strokeWidth="1.4" fill="none">
              <path d="M70 360q14-10 28 0t28 0 28 0 28 0"/>
              <path d="M360 396q14-10 28 0t28 0 28 0 28 0"/>
              <path d="M640 356q14-10 28 0t28 0 28 0 28 0"/>
              <path d="M150 410q14-10 28 0t28 0 28 0"/>
            </g>
          </g>

          {/* LAND regions from LOTM.locations (data-driven) */}
          {regions.map(loc=>{
            if(!loc.map || !loc.map.poly) return null;
            const active = focusedId === loc.id;
            const isAbyss = loc.id === 'forsaken';
            const fill   = isAbyss ? 'url(#mvAbyssGrad)' : 'url(#mvLandGrad)';
            const stroke = isAbyss ? 'rgba(120,60,75,.5)' : 'rgba(200,162,74,.30)';
            const cls = 'region' + (active ? ' active' : '');
            return (
              <polygon key={loc.id} points={loc.map.poly} className={cls}
                       fill={fill}
                       stroke={active ? 'var(--brass)' : stroke}
                       strokeWidth={active ? 2 : 1.2}
                       onClick={()=>handlePlace(loc)}/>
            );
          })}

          {/* Forsaken Land — lightning bolts and embers (static decoration, shown when visible) */}
          {forsakenVisible && (
            <g opacity="0.8" pointerEvents="none">
              <polyline className="bolt" points="905,160 898,210 916,214 902,275" fill="none"
                        stroke="var(--brass)" strokeWidth="1.6" filter="url(#mvGlowF)"/>
              <polyline className="bolt b" points="936,340 928,392 945,396 930,452" fill="none"
                        stroke="var(--crimson-glow)" strokeWidth="1.4" filter="url(#mvGlowF)"/>
              {[[875,470],[940,250],[955,420],[870,360]].map((p,i)=>(
                <circle key={i} className="ember" cx={p[0]} cy={p[1]} r="1.6" fill="rgba(200,162,74,.7)"/>
              ))}
            </g>
          )}

          {/* Rorsted archipelago islets (static decoration) */}
          {rorstedVisible && (
            <g>
              {[[568,256,7],[592,250,5],[582,276,6],[604,268,4]].map((p,i)=>(
                <ellipse key={i} cx={p[0]} cy={p[1]} rx={p[2]} ry={p[2]*0.7}
                         fill="url(#mvLandGrad)" stroke="rgba(200,162,74,.3)" strokeWidth=".8"/>
              ))}
            </g>
          )}

          {/* Fog wisps over Fog Sea */}
          {fogseaVisible && (
            <g pointerEvents="none" opacity="0.9">
              <ellipse className="fogwisp"   cx="95"  cy="200" rx="70" ry="34" fill="rgba(180,190,200,.10)" filter="url(#mvSoft)"/>
              <ellipse className="fogwisp b" cx="120" cy="250" rx="58" ry="26" fill="rgba(180,190,200,.08)" filter="url(#mvSoft)"/>
            </g>
          )}
          {/* faint fog over Loen / Backlund (always soft) */}
          <ellipse className="fogwisp b" cx="455" cy="165" rx="60" ry="22"
                   fill="rgba(190,200,210,.07)" filter="url(#mvSoft)" pointerEvents="none"/>

          {/* SEA labels — data-driven, Arabic names */}
          {seas.map(loc=>{
            const lx = loc.map ? loc.map.cx : 0;
            const ly = loc.map ? loc.map.cy : 0;
            const isBerserk = loc.id === 'berserksea';
            return (
              <text key={loc.id} x={lx} y={ly}
                    textAnchor="middle"
                    className="eyebrow"
                    style={{ fontSize: isBerserk ? 13 : 11,
                             fill:'rgba(180,196,210,.5)',
                             letterSpacing:'.3em',
                             cursor:'pointer' }}
                    onClick={()=>handlePlace(loc)}>
                {loc.name_ar}
              </text>
            );
          })}

          {/* LAND labels — data-driven, Arabic names */}
          {regions.map(loc=>{
            if(!loc.map) return null;
            const isAbyss = loc.id === 'forsaken';
            return (
              <text key={'lbl'+loc.id} x={loc.map.cx} y={loc.map.cy}
                    textAnchor="middle"
                    className="font-display"
                    style={{ fontSize: isAbyss ? 11 : 12,
                             fontWeight:600,
                             fill: isAbyss ? 'rgba(200,140,150,.65)' : 'rgba(216,195,154,.78)',
                             pointerEvents:'none',
                             letterSpacing:'.08em' }}>
                {loc.name_ar}
              </text>
            );
          })}

          {/* CITY PINS — data-driven */}
          {cities.map(loc=>{
            if(!loc.map) return null;
            const open = focusedId === loc.id;
            // cities near Forsaken use brass, others use crimson
            const isBrass = loc.id === 'rorsted' || loc.id === 'silver';
            const col = isBrass ? 'var(--brass)' : 'var(--crimson-glow)';
            return (
              <g key={loc.id}
                 className={'pin' + (open ? ' open' : '')}
                 transform={'translate(' + loc.map.cx + ',' + loc.map.cy + ')'}
                 onClick={()=>handlePlace(loc)}
                 role="button" tabIndex="0"
                 aria-label={loc.name_ar}
                 onKeyDown={(e)=>{ if(e.key==='Enter') handlePlace(loc); }}>
                <circle className="halo" r="9" fill={col} opacity="0.55"/>
                <circle r="6.5" fill="rgba(8,10,13,.95)" stroke={col} strokeWidth="2" filter="url(#mvGlowF)"/>
                <circle r="2.4" fill={col}/>
                {/* label plate */}
                <g className="label-plate" transform="translate(0,-16)">
                  <rect x="-52" y="-15" width="104" height="19" rx="3"
                        fill="rgba(8,10,13,.92)" stroke={col} strokeWidth=".8"/>
                  <text x="0" y="-2" textAnchor="middle" className="font-display"
                        style={{ fontSize:9.5, fill:'var(--parchment)', letterSpacing:'.08em', fontWeight:600 }}>
                    {loc.name_ar}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </svg>

      {/* reset view button — shown when a location is focused */}
      {focusedId && (
        <button onClick={handleReset}
          className="absolute bottom-5 left-1/2 focus-ring px-4 py-2 rounded-lg font-display text-[13px] z-10"
          style={{ transform:'translateX(-50%)',
                   background:'rgba(8,10,13,.88)', border:'1px solid var(--brass)',
                   color:'var(--brass)', backdropFilter:'blur(6px)' }}>
          إعادة الضبط
        </button>
      )}

      {/* location detail panel */}
      {panelLoc && (
        <LocationPanel loc={panelLoc} chapter={chapter}
                       onClose={handleClose}
                       onSelectChild={handleSelectChild}
                       navigate={navigate}/>
      )}
    </div>
  );
}

window.LocationPanel = LocationPanel;
window.MapView       = MapView;

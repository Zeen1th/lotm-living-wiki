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
   MAP VIEW — image-backed interactive world map with per-continent zoom

   Architecture:
   - <img> background: either the full world map (WORLD_IMG) or a continent's
     zoom image when a continent is active and has one (CONTINENTS[active].img).
   - Absolutely-positioned HTML markers placed via percentage coordinates
     (map.world for the world view, map.zoom for a continent view), so the
     layout stays correct at any rendered image size.
   - Continents without a dedicated zoom image fall back to the world image
     with a CSS focus rectangle framing that continent's region.
   - Clicking a continent region (in world view) zooms into it; the "back"
     button returns to the full world view.
-----------------------------------------------------------------*/
const WORLD_IMG = 'assets/map/world.webp';
const CONTINENTS = {
  north:    { img: 'assets/map/north.webp', label: 'القارة الشمالية' },
  south:    { img: null,                    label: 'القارة الجنوبية' },
  forsaken: { img: null,                    label: 'أرض الآلهة المهجورة' },
};
// fallback focus rectangles on the WORLD image for continents that have no
// dedicated zoom image yet. { x, y, w, h } are percentages of the world image.
const CONTINENT_FOCUS = {
  south:    { x: 24,  y: 66,  w: 56, h: 30, label: 'القارة الجنوبية' },
  forsaken: { x: 84,  y: 20,  w: 14, h: 50, label: 'أرض الآلهة المهجورة' },
};

/* ----------------------------------------------------------------
   EDIT MODE — patch locations.js source text with dragged coordinates.

   We fetch the original `data/locations.js` text and surgically replace
   ONLY the numbers inside each edited location's `world: { x, y }` /
   `zoom: { x, y }` blocks, scoped to that location's object literal (found
   via `id: 'xxx'`). Every comment, quote, and line of structure is preserved.
-----------------------------------------------------------------*/

// Scope a patch to a single location's object literal: find its own `id: 'ID'`
// (a top-level property, NOT parent_id/contains_id/etc.), then take the text up
// to the NEXT top-level `id: '` (or end of array) as that location's block.
// We require the `id:` to be line-leading (only whitespace before it on its line)
// so that `parent_id:`, `contains_ids`, `leader_id`, etc. don't match.
function blockForId(src, id){
  const re = new RegExp("(?:^|\\n)\\s*id: '" + id + "'", "");
  const m = re.exec(src);
  if(!m) return null;
  const start = m.index + m[0].length;  // position right after the matched id literal
  const reNext = /(?:^|\n)\s*id: '/g;
  reNext.lastIndex = start;
  const nm = reNext.exec(src);
  const end = nm ? nm.index + nm[0].length - "id: '".length : src.length;
  return { start, end };
}

// Replace the numbers in a `world: { x: .., y: .. }` / `zoom:  { x: .., y: .. }`
// block within [start,end). Keeps the `world:` / `zoom:` prefix (and its
// indentation) intact so file alignment doesn't shift.
function patchCoord(src, start, end, key, x, y){
  const re = new RegExp('(' + key + ':\\s*)\\{\\s*x:\\s*[\\d.]+,\\s*y:\\s*[\\d.]+\\s*\\}');
  const block = src.slice(start, end);
  const patched = block.replace(re, '$1{ x: ' + (Math.round(x*100)/100) + ', y: ' + (Math.round(y*100)/100) + ' }');
  return src.slice(0, start) + patched + src.slice(end);
}

// edits: { [locId]: { world?:{x,y}, zoom?:{x,y} } }
function applyEditsToSource(src, edits){
  let out = src;
  for(const id of Object.keys(edits)){
    const blk = blockForId(out, id);
    if(!blk) continue;
    const e = edits[id];
    if(e.world){ out = patchCoord(out, blk.start, blk.end, 'world', e.world.x, e.world.y); }
    if(e.zoom){  out = patchCoord(out, blk.start, blk.end, 'zoom',  e.zoom.x,  e.zoom.y);  }
  }
  return out;
}

function MapView({ chapter, focus, clearFocus, navigate }){
  const [focusedId, setFocusedId] = useState(null);   // selected place (for pin highlight)
  const [panelLoc, setPanelLoc]   = useState(null);   // open detail panel
  const [activeContinent, setActiveContinent] = useState(null); // null = world view

  // ── edit mode ──
  const [editMode, setEditMode] = useState(false);
  // edits: { [locId]: { world?:{x,y}, zoom?:{x,y} } }  — overrides base coords
  const [edits, setEdits] = useState(()=> {
    try { return JSON.parse(localStorage.getItem('lotm.mapEdits') || '{}'); }
    catch { return {}; }
  });
  const [drag, setDrag] = useState(null); // { locId, space } while dragging
  const containerRef = useRef(null);     // the overlay box (image-sized) for % math

  useEffect(()=>{ localStorage.setItem('lotm.mapEdits', JSON.stringify(edits)); }, [edits]);

  const visLocs = useMemo(()=>
    (LOTM.locations || []).filter(loc => Eng.isVisible(loc, chapter)),
    [chapter]);

  // Auto-open focused location (cross-link navigation)
  useEffect(()=>{
    if(!focus || focus.kind !== 'location') return;
    const loc = (LOTM.locations || []).find(l => l.id === focus.id && Eng.isVisible(l, chapter));
    if(loc){ setFocusedId(loc.id); setPanelLoc(loc); }
    clearFocus && clearFocus();
  }, [focus]);

  function handlePlace(loc){
    setFocusedId(loc.id);
    setPanelLoc(loc);
  }
  function handleClose(){ setPanelLoc(null); }
  function handleSelectChild(child){ setFocusedId(child.id); setPanelLoc(child); }
  function handleBackToWorld(){
    setActiveContinent(null);
    setFocusedId(null);
    setPanelLoc(null);
  }

  // Which image are we showing, and which coordinate space do markers use?
  const cont = activeContinent ? CONTINENTS[activeContinent] : null;
  const hasZoomImage = !!(cont && cont.img);
  const imgSrc = hasZoomImage ? cont.img : WORLD_IMG;
  // markers use 'zoom' coords only when a real zoom image is active; otherwise 'world'
  const coordSpace = hasZoomImage ? 'zoom' : 'world';
  // editing is allowed on world view and on real zoom images (not fallback focus views)
  const editAllowed = editMode && (coordSpace === 'world' || hasZoomImage);

  // Places to render as markers in the current view.
  const markers = useMemo(()=>{
    if(!activeContinent) return visLocs;
    if(hasZoomImage) return visLocs.filter(l => l.continent === activeContinent);
    return visLocs; // fallback draws on the world image
  }, [visLocs, activeContinent, hasZoomImage]);

  // Continents clickable in world view = those with a focus rect OR a zoom image.
  const clickableContinents = Object.keys(CONTINENTS).filter(k =>
    CONTINENTS[k].img || CONTINENT_FOCUS[k]);

  function posOf(loc){
    const m = loc.map || {};
    const e = edits[loc.id];
    const p = (e && e[coordSpace]) || m[coordSpace] || m.world;
    return p ? { x: p.x, y: p.y } : null;
  }

  // ── drag handlers ──
  function pctFromPointer(clientX, clientY){
    const el = containerRef.current;
    if(!el) return null;
    const r = el.getBoundingClientRect();
    const x = ((clientX - r.left) / r.width) * 100;
    const y = ((clientY - r.top) / r.height) * 100;
    return {
      x: Math.max(0, Math.min(100, Math.round(x*100)/100)),
      y: Math.max(0, Math.min(100, Math.round(y*100)/100)),
    };
  }
  function startDrag(locId, e){
    if(!editAllowed) return;
    e.preventDefault();
    e.stopPropagation();
    setDrag({ locId, moved: false, sx: e.clientX, sy: e.clientY });
  }
  useEffect(()=>{
    if(!drag) return;
    function onMove(ev){
      const p = pctFromPointer(ev.clientX, ev.clientY);
      if(!p) return;
      const movedEnough = Math.abs(ev.clientX - drag.sx) + Math.abs(ev.clientY - drag.sy) > 4;
      setEdits(prev => ({
        ...prev,
        [drag.locId]: { ...(prev[drag.locId]||{}), [coordSpace]: p },
      }));
      if(movedEnough) setDrag(d => d ? { ...d, moved: true } : d);
    }
    function onUp(){ setDrag(null); }
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
    return ()=>{
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
    };
  }, [drag, coordSpace]);

  // ── save: fetch source, patch, download ──
  const editedCount = Object.keys(edits).length;
  async function handleSave(){
    try{
      const res = await fetch('data/locations.js', { cache: 'no-store' });
      if(!res.ok) throw new Error('fetch failed: ' + res.status);
      const src = await res.text();
      const patched = applyEditsToSource(src, edits);
      const blob = new Blob([patched], { type:'text/javascript;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'locations.js';
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
      // keep edits in localStorage until the user confirms the file replaced;
      // clear the "unsaved" feeling by noting success.
      setEdits({});   // clear in-memory + localStorage now that it's exported
    }catch(err){
      console.error('map save failed', err);
      alert('تعذّر حفظ التعديلات: ' + (err.message || err));
    }
  }
  function handleCancelEdit(){
    setEdits({});
    setEditMode(false);
  }

  return (
    <div className="h-full w-full relative overflow-hidden" style={{ background:'var(--void)' }}>
      <div className="bloodmoon"/>

      {/* ── image layer ── */}
      <img src={imgSrc} alt="خريطة عالم سيد الغوامض"
           className="absolute inset-0 w-full h-full block select-none"
           style={{ objectFit:'contain', pointerEvents:'none', filter:'drop-shadow(0 6px 24px rgba(0,0,0,.5))' }}
           draggable="false"/>

      {/* ── overlay layer: continent hotspots + markers ──
          Sized to the actual rendered image box via an aspect-ratio inner wrapper
          so percentage coordinates line up with the contained image. */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents:'none' }}>
        <div ref={containerRef} className="relative" style={{ aspectRatio: imgSrc === WORLD_IMG ? '2400 / 1743' : '1654 / 2000', maxWidth:'100%', maxHeight:'100%', width:'100%', height:'100%' }}>

          {/* continent click hotspots (only in world view) */}
          {!activeContinent && clickableContinents.map(key=>{
            const focus = CONTINENT_FOCUS[key];
            // For continents WITH a zoom image we still want a clickable area: synthesize a
            // rough box around the northern landmass. Only 'north' here.
            let box;
            if(focus) box = focus;
            else if(key === 'north') box = { x: 8, y: 10, w: 78, h: 40, label: 'القارة الشمالية' };
            else return null;
            return (
              <button key={key}
                onClick={()=> setActiveContinent(key)}
                className="absolute focus-ring rounded-md group transition-colors"
                style={{
                  left: box.x + '%', top: box.y + '%', width: box.w + '%', height: box.h + '%',
                  background: 'rgba(200,162,74,.06)',
                  border: '1px dashed rgba(200,162,74,.28)',
                  pointerEvents:'auto', cursor:'pointer',
                }}
                aria-label={box.label} title={box.label}>
                <span className="absolute top-1 right-2 eyebrow text-[9px] opacity-70 group-hover:opacity-100"
                      style={{ color:'var(--brass)', letterSpacing:'.2em' }}>{box.label}</span>
              </button>
            );
          })}

          {/* focus frame for continents without a zoom image (fallback) */}
          {activeContinent && !hasZoomImage && (()=>{
            const f = CONTINENT_FOCUS[activeContinent];
            if(!f) return null;
            return (
              <div className="absolute rounded-md pointer-events-none"
                   style={{
                     left: f.x + '%', top: f.y + '%', width: f.w + '%', height: f.h + '%',
                     boxShadow: '0 0 0 9999px rgba(4,5,8,.45), inset 0 0 0 1px rgba(200,162,74,.5)',
                     transition:'box-shadow .3s',
                   }}/>
            );
          })()}

          {/* markers */}
          {markers.map(loc=>{
            const pos = posOf(loc);
            if(!pos) return null;
            const open = focusedId === loc.id;
            const isCity = loc.kind === 'city';
            const isBrass = loc.id === 'rorsted' || loc.id === 'silver' || loc.kind === 'sea';
            const col = isBrass ? 'var(--brass)' : 'var(--crimson-glow)';
            const edited = !!(edits[loc.id] && edits[loc.id][coordSpace]);
            return (
              <button key={loc.id}
                onPointerDown={(e)=> startDrag(loc.id, e)}
                onClick={()=> { if(!(drag && drag.moved)) handlePlace(loc); }}
                className={'mappin' + (open ? ' open' : '') + (isCity ? ' city' : '') + (edited ? ' edited' : '') + (editAllowed ? ' editable' : '')}
                style={{
                  position:'absolute',
                  left: pos.x + '%', top: pos.y + '%',
                  transform:'translate(-50%,-50%)',
                  pointerEvents:'auto',
                  cursor: editAllowed ? (drag && drag.locId===loc.id ? 'grabbing' : 'grab') : 'pointer',
                  '--pin': edited ? '#f5c542' : col,
                  background:'none', border:'none', padding:0,
                }}
                role="button" tabIndex={0}
                aria-label={loc.name_ar}
                onKeyDown={(e)=>{ if(e.key==='Enter') handlePlace(loc); }}>
                <span className="pin-dot" style={{ borderColor: edited ? '#f5c542' : col }}/>
                <span className="pin-label" style={{ color:'var(--parchment)', borderColor: edited ? '#f5c542' : col }}>
                  {loc.name_ar}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* active-continent badge + back button */}
      {activeContinent && (
        <div className="absolute top-3 left-1/2 z-10 flex items-center gap-2"
             style={{ transform:'translateX(-50%)' }}>
          <span className="glass rounded-md px-3 py-1 eyebrow text-[10px]"
                style={{ color:'var(--brass)', border:'1px solid var(--line)', letterSpacing:'.2em' }}>
            {CONTINENTS[activeContinent].label}{!hasZoomImage ? ' — معاينة' : ''}
          </span>
          <button onClick={handleBackToWorld}
            className="focus-ring rounded-md px-3 py-1 font-display text-[12px]"
            style={{ background:'rgba(8,10,13,.88)', border:'1px solid var(--brass)', color:'var(--brass)', backdropFilter:'blur(6px)' }}>
            ↺ الخريطة الكاملة
          </button>
        </div>
      )}

      {/* ── edit mode UI ── */}
      {editMode ? (
        <div className="absolute bottom-4 left-1/2 z-20 flex items-center gap-2 glass rounded-lg px-3 py-2"
             style={{ transform:'translateX(-50%)', border:'1px solid var(--brass)', backdropFilter:'blur(8px)' }}>
          <span className="eyebrow text-[10px]" style={{ color:'#f5c542', letterSpacing:'.15em' }}>
            وضع التعديل
          </span>
          <span className="text-[12px] font-display" style={{ color:'var(--parchment)' }}>
            {editedCount > 0 ? (editedCount + ' معدّلة') : 'اسحب النقاط'}
          </span>
          {!editAllowed && (
            <span className="text-[10px] font-old" style={{ color:'var(--parchment-dim)' }}>
              (وفّر صورة القارة لتحرير مواقعها التفصيلية)
            </span>
          )}
          <button onClick={handleSave} disabled={editedCount === 0}
            className="focus-ring rounded-md px-3 py-1 font-display text-[12px] disabled:opacity-40"
            style={{ background:'#f5c542', color:'#1a1300', border:'1px solid #d9a92a' }}
            title="تنزيل locations.js مُحدّث">
            💾 حفظ وتنزيل
          </button>
          <button onClick={handleCancelEdit}
            className="focus-ring rounded-md px-3 py-1 font-display text-[12px]"
            style={{ background:'rgba(8,10,13,.6)', border:'1px solid var(--line)', color:'var(--parchment-dim)' }}>
            ✕ إلغاء
          </button>
        </div>
      ) : (
        <button onClick={()=> setEditMode(true)}
          className="absolute bottom-4 right-4 z-20 focus-ring w-9 h-9 grid place-items-center rounded-md"
          style={{ background:'rgba(8,10,13,.7)', border:'1px solid var(--line)', color:'var(--parchment-dim)', backdropFilter:'blur(6px)' }}
          title="تعديل مواضع النقاط" aria-label="تعديل مواضع النقاط">
          ✎
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

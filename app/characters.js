/** @jsxRuntime classic */ /** @jsx React.createElement */
function CharacterCard({ r, onOpen, isAdmin, onEdit, onRemove }){
  const hasImg = !!r.image;
  return (
    <div className="relative group rounded-lg overflow-hidden transition-all"
      style={{ border:'1px solid var(--line)', background:'rgba(255,255,255,.015)' }}>
      <button onClick={()=>onOpen(r.id)}
        className="w-full text-right focus-ring">
        {/* portrait — fills the top of the card */}
        <div className="relative w-full" style={{ aspectRatio:'3 / 5.52', overflow:'hidden' }}>
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
          <div className="eyebrow text-[11px] truncate mt-0.5" style={{ color:'var(--brass)' }}>
            {r.pathway ? r.pathway.name_ar : '—'}
          </div>
        </div>
      </button>
      {/* admin quick-actions overlay (top-right) */}
      {isAdmin && (
        <div className="absolute top-2 right-2 z-10 flex gap-1">
          <button onClick={(e)=>{ e.stopPropagation(); onEdit && onEdit(r.id); }} title="تحرير"
            className="w-7 h-7 grid place-items-center rounded-md focus-ring"
            style={{ background:'rgba(0,0,0,.6)', border:'1px solid var(--brass)', color:'var(--brass)' }}>✎</button>
          <button onClick={(e)=>{ e.stopPropagation(); onRemove && onRemove(r.id, r.name_ar); }} title="حذف"
            className="w-7 h-7 grid place-items-center rounded-md focus-ring"
            style={{ background:'rgba(0,0,0,.6)', border:'1px solid var(--crimson-glow)', color:'var(--crimson-glow)' }}>✕</button>
        </div>
      )}
    </div>
  );
}

function CharacterDetail({ r, onClose, navigate, isAdmin, onEdit, fontScale }){
  useEffect(()=>{
    const h = (e)=>{ if(e.key==='Escape') onClose(); };
    window.addEventListener('keydown', h);
    return ()=> window.removeEventListener('keydown', h);
  }, [onClose]);
  if(!r) return null;
  const s = r.state;
  return (
    <div className="backdrop fixed inset-0 z-40 grid place-items-center p-4"
         style={{ background:'rgba(4,5,8,.74)', backdropFilter:'blur(4px)', zoom: fontScale || 1 }}
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
          {/* admin edit button floats next to close */}
          {isAdmin && onEdit && (
            <button onClick={()=>onEdit(r.id)} aria-label="تحرير الشخصية" title="تحرير"
              className="absolute top-3 left-14 w-9 h-9 grid place-items-center rounded-md focus-ring"
              style={{ background:'rgba(0,0,0,.5)', border:'1px solid var(--brass)', color:'var(--brass)', zIndex:2 }}>
              ✎
            </button>
          )}
          {/* status badge floats top-right */}
          <div className="absolute top-4 right-4" style={{ zIndex:2 }}>{statusBadge(r.status)}</div>

          {/* large centered portrait — tall box + contain so the full image shows */}
          {r.image ? (
            <img src={'assets/' + r.image} alt={r.name_ar}
                 className="mx-auto rounded-xl object-contain"
                 style={{ width:160, height:240, border:'1px solid var(--brass)',
                          boxShadow:'0 0 28px rgba(0,0,0,.6)' }}/>
          ) : (
            <div className="mx-auto rounded-xl grid place-items-center"
                 style={{ width:160, height:240, background:'rgba(0,0,0,.45)', color:'var(--brass)', border:'1px solid var(--brass)' }}>
              <Users size={56}/>
            </div>
          )}

          {/* name + english + aliases */}
          <h2 className="font-deco text-[26px] mt-3" style={{ color:'var(--parchment)' }}>{r.name_ar}</h2>
          <p className="text-[13px] mt-0.5" style={{ color:'var(--parchment-dim)' }}>{r.name_en}</p>
          {r.aliases.length>0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-2.5">
              {r.aliases.map(a=>(
                <span key={a} className="eyebrow text-[11.5px] px-2 py-0.5 rounded"
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
                  <div className="eyebrow text-[11px] mb-1" style={{ color:'var(--brass-dim)' }}>المسار</div>
                  <LinkChip kind="pathway" id={r.pathway.id} label={r.pathway.name_ar} navigate={navigate}/>
                </div>
              )}
              {/* sequence */}
              {s.sequence && (
                <div className="rounded-lg px-3 py-2" style={{ background:'rgba(0,0,0,.3)', border:'1px solid var(--line)' }}>
                  <div className="eyebrow text-[11px] mb-1" style={{ color:'var(--brass-dim)' }}>التسلسل</div>
                  <div className="font-display text-[13.5px]" style={{ color:'var(--parchment)' }}>{s.sequence}</div>
                </div>
              )}
              {/* location */}
              {s.location && (
                <div className="rounded-lg px-3 py-2" style={{ background:'rgba(0,0,0,.3)', border:'1px solid var(--line)' }}>
                  <div className="eyebrow text-[11px] mb-1" style={{ color:'var(--brass-dim)' }}>الموقع الحالي</div>
                  <div className="font-display text-[13.5px]" style={{ color:'var(--parchment)' }}>{s.location}</div>
                </div>
              )}
              {/* faction */}
              {s.faction && (
                <div className="rounded-lg px-3 py-2" style={{ background:'rgba(0,0,0,.3)', border:'1px solid var(--line)' }}>
                  <div className="eyebrow text-[11px] mb-1" style={{ color:'var(--brass-dim)' }}>الانتماء</div>
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
              <div className="eyebrow text-[11px] mb-2.5" style={{ color:'var(--brass-dim)' }}>الجدول الزمني (حتى فصلك)</div>
              <ol className="relative" style={{ borderRight:'1px solid var(--line)' }}>
                {r.events.map((e,i)=>(
                  <li key={i} className="relative pr-5 pb-3">
                    <span className="absolute right-[-5px] top-1.5 w-2.5 h-2.5 rounded-full"
                          style={{ background:'var(--crimson-glow)' }}/>
                    <span className="eyebrow text-[11px]" style={{ color:'var(--brass)' }}>فصل {e.chapter}</span>
                    <p className="text-[13px] mt-0.5" style={{ color:'var(--parchment)' }}>{e.text}</p>
                    {e.doc_ref && navigate && (
                      <button onClick={()=>navigate('document', e.doc_ref)}
                        className="chip focus-ring inline-block mt-1 px-2 py-0.5 rounded text-[11.5px] font-display"
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

function CharactersSection({ chapter, focus, clearFocus, navigate, isAdmin, fontScale }){
  const [q, setQ] = useState('');
  const [openId, setOpenId] = useState(null);
  const [editId, setEditId] = useState(null);     // character being edited (raw id)
  const [addingNew, setAddingNew] = useState(false);
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

  function handleRemove(id, name){
    if(!confirm('حذف «' + name + '» نهائيًا؟ سيُنزّل ملف characters.js محدّثًا بدونه.')) return;
    removeCharacterFromFile(id).then(
      ()=> alert('✓ نُزّل characters.js محدّث. استبدل الملف في المستودع وأعد النشر.'),
      (e)=> alert('تعذّر الحذف: ' + (e.message||e))
    );
  }

  return (
    <div className="h-full flex flex-col px-4 pt-6">
      <div className="max-w-[920px] w-full mx-auto flex items-center gap-2 px-3 h-11 rounded-md mb-3"
           style={{ background:'rgba(0,0,0,.35)', border:'1px solid var(--line)' }}>
        <Search size={16} style={{ color:'var(--brass)' }}/>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="ابحث عن شخصية…"
               aria-label="ابحث عن شخصية"
               className="bg-transparent outline-none w-full text-[14px] focus-ring" style={{ color:'#dfe4ea' }}/>
        {isAdmin && (
          <button onClick={()=>setAddingNew(true)} title="إضافة شخصية جديدة"
            className="focus-ring shrink-0 w-8 h-8 grid place-items-center rounded-md"
            style={{ background:'rgba(0,0,0,.4)', border:'1px solid var(--brass)', color:'var(--brass)' }}>
            ＋
          </button>
        )}
      </div>
      <div className="max-w-[920px] w-full mx-auto eyebrow text-[11px] mb-2" style={{ color:'var(--brass-dim)' }}>
        الشخصيات المعروفة حتى الفصل {chapter} — {filtered.length}
        {isAdmin && <span style={{ color:'var(--brass)' }}> — وضع المدير</span>}
      </div>
      <div className="scroller overflow-y-auto flex-1 pb-6 max-w-[920px] w-full mx-auto">
        {filtered.length===0
          ? <p className="font-old italic text-center mt-10" style={{ color:'var(--parchment-dim)' }}>لا شخصيات مطابقة بعد.</p>
          : <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filtered.map(r => <CharacterCard key={r.id} r={r} onOpen={setOpenId}
                              isAdmin={isAdmin} onEdit={setEditId} onRemove={handleRemove}/>)}
            </div>
        }
      </div>
      {open && <CharacterDetail r={open} onClose={()=>setOpenId(null)} navigate={navigate}
                               isAdmin={isAdmin} fontScale={fontScale} onEdit={(id)=>{ setOpenId(null); setEditId(id); }}/>}
      {editId && <CharacterEditPanel id={editId} onClose={()=>setEditId(null)}/>}
      {addingNew && <CharacterEditPanel isNew={true} onClose={()=>setAddingNew(false)}/>}
    </div>
  );
}

/* ================================================================
   ADMIN: source-text patching for data/characters.js
   Same strategy as the map editor (app/map.js): fetch the source,
   scope to one record via its line-leading `id:`, patch fields with
   slice → regex-replace → splice, then download the patched file.
================================================================ */

// Find a single record's text block (from its line-leading `id: 'X'` up to
// the next line-leading `id:` or the closing `];`). Generic — works on any
// data file with top-level records keyed by `id`.
function charBlockForId(src, id){
  const re = new RegExp("(?:^|\\n)(\\s*)id: '" + id + "'");
  const m = re.exec(src);
  if(!m) return null;
  const start = m.index;  // include leading whitespace (whole record incl. id line)
  const reNext = /(?:^|\n)(\s*)id: '/g;
  reNext.lastIndex = m.index + m[0].length;
  const nm = reNext.exec(src);
  let end;
  if(nm) end = nm.index;
  else {
    // last record: up to the closing `];`
    const close = src.lastIndexOf('];');
    end = close === -1 ? src.length : close;
  }
  return { start, end };
}

// Replace a scalar string field's value within [start,end), preserving the
// `key: ` prefix. value is JS-string-escaped + single-quoted.
function patchStringField(src, start, end, key, value){
  const block = src.slice(start, end);
  const re = new RegExp('(' + key + ":\\s*)'[^']*'");
  const patched = block.replace(re, "$1'" + escapeJsString(value) + "'");
  return src.slice(0, start) + patched + src.slice(end);
}

// Replace a scalar numeric field.
function patchNumberField(src, start, end, key, value){
  const block = src.slice(start, end);
  const re = new RegExp('(' + key + ":\\s*)[\\d.]+");
  const patched = block.replace(re, '$1' + value);
  return src.slice(0, start) + patched + src.slice(end);
}

function escapeJsString(s){
  return String(s == null ? '' : s).replace(/\\/g,'\\\\').replace(/'/g,"\\'");
}

// Build a new record block text (for "add character").
function newRecordText(id, name_ar, name_en, image, firstChapter){
  const img = image ? "      image: '" + escapeJsString(image) + "', " : '      ';
  return (
    "    {\n" +
    "      id: '" + escapeJsString(id) + "',\n" +
    img + "name_ar: '" + escapeJsString(name_ar) + "', name_en: '" + escapeJsString(name_en) + "',\n" +
    "      first_appeared_chapter: " + (parseInt(firstChapter,10)||1) + ", status: 'alive',\n" +
    "      pathway: null,\n" +
    "      aliases: [],\n" +
    "      states: [\n" +
    "        { since_chapter: " + (parseInt(firstChapter,10)||1) + ", location: '', faction: '' },\n" +
    "      ],\n" +
    "      events: [],\n" +
    "      relationships: [],\n" +
    "      abilities: [],\n" +
    "      tags: [],\n" +
    "      blurb_ar: '',\n" +
    "      sources: [" + (parseInt(firstChapter,10)||1) + "],\n" +
    "    },\n"
  );
}

// Fetch + patch + download a character's edited scalar fields.
// edits: { name_ar?, name_en?, blurb_ar?, status?, first_appeared_chapter? }
async function saveCharacterEdits(id, edits){
  const res = await fetch('data/characters.js', { cache:'no-store' });
  if(!res.ok) throw new Error('fetch failed: ' + res.status);
  let src = await res.text();
  const blk = charBlockForId(src, id);
  if(!blk) throw new Error('لم يُعثر على الشخصية ' + id);
  if(edits.name_ar   != null) src = patchStringField(src, blk.start, blk.end, 'name_ar',   edits.name_ar);
  if(edits.name_en   != null) src = patchStringField(src, blk.start, blk.end, 'name_en',   edits.name_en);
  if(edits.blurb_ar  != null) src = patchStringField(src, blk.start, blk.end, 'blurb_ar',  edits.blurb_ar);
  if(edits.status    != null) src = patchStringField(src, blk.start, blk.end, 'status',    edits.status);
  if(edits.first_appeared_chapter != null)
    src = patchNumberField(src, blk.start, blk.end, 'first_appeared_chapter', edits.first_appeared_chapter);
  downloadPatched(src, 'characters.js');
}

// Remove a whole record by id → download patched file.
async function removeCharacterFromFile(id){
  const res = await fetch('data/characters.js', { cache:'no-store' });
  if(!res.ok) throw new Error('fetch failed: ' + res.status);
  let src = await res.text();
  const blk = charBlockForId(src, id);
  if(!blk) throw new Error('لم يُعثر على الشخصية ' + id);
  src = src.slice(0, blk.start) + src.slice(blk.end);
  downloadPatched(src, 'characters.js');
}

// Append a new record before the closing `];` → download patched file.
async function addCharacterToFile(id, name_ar, name_en, image, firstChapter){
  const res = await fetch('data/characters.js', { cache:'no-store' });
  if(!res.ok) throw new Error('fetch failed: ' + res.status);
  let src = await res.text();
  const close = src.lastIndexOf('];');
  if(close === -1) throw new Error('تعذّر إيجاد نهاية المصفوفة');
  src = src.slice(0, close) + newRecordText(id, name_ar, name_en, image, firstChapter) + '\n' + src.slice(close);
  downloadPatched(src, 'characters.js');
}

function downloadPatched(text, filename){
  const blob = new Blob([text], { type:'text/javascript;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

/* ---- image normalization (browser canvas) ----
   Mirrors tools/normalize-characters.py: fit the full figure onto a 200×400
   dark canvas, re-encode to WebP, and download as {id}.webp. */
function normalizeAndDownloadImage(file, outId){
  const reader = new FileReader();
  reader.onload = ()=>{
    const img = new Image();
    img.onload = ()=>{
      const TW = 200, TH = 400, BG = '#0e1016';
      const scale = Math.min(TW / img.width, TH / img.height);
      const nw = Math.max(1, Math.round(img.width * scale));
      const nh = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = TW; canvas.height = TH;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, TW, TH);
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, Math.round((TW - nw)/2), Math.round((TH - nh)/2), nw, nh);
      canvas.toBlob((blob)=>{
        if(!blob){ alert('تعذّر ترميز الصورة (جرّب متصفحًا آخر)'); return; }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = outId + '.webp';
        document.body.appendChild(a); a.click(); a.remove();
        URL.revokeObjectURL(url);
      }, 'image/webp', 0.9);
    };
    img.onerror = ()=> alert('تعذّر تحميل الصورة');
    img.src = reader.result;
  };
  reader.onerror = ()=> alert('تعذّر قراءة الملف');
  reader.readAsDataURL(file);
}

/* ================================================================
   CharacterEditPanel — modal to edit a character's fields (or add new).
================================================================ */
function CharacterEditPanel({ id, isNew, onClose }){
  useEffect(()=>{
    const h = (e)=>{ if(e.key==='Escape') onClose(); };
    window.addEventListener('keydown', h);
    return ()=> window.removeEventListener('keydown', h);
  }, [onClose]);

  const existing = !isNew ? LOTM.characters.find(c=>c.id===id) : null;
  const [nameAr, setNameAr]   = useState(existing ? existing.name_ar : '');
  const [nameEn, setNameEn]   = useState(existing ? existing.name_en : '');
  const [statusV, setStatusV] = useState(existing ? (existing.status||'alive') : 'alive');
  const [blurb, setBlurb]     = useState(existing ? (existing.blurb_ar||'') : '');
  const [imagePath, setImagePath] = useState(existing ? (existing.image||'') : '');
  const [firstCh, setFirstCh] = useState(existing ? existing.first_appeared_chapter : 1);
  const [busy, setBusy] = useState(false);

  async function handleSave(){
    setBusy(true);
    try{
      if(isNew){
        const newId = (nameEn || nameAr).toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'') || 'new_character';
        await addCharacterToFile(newId, nameAr, nameEn, imagePath, firstCh);
      } else {
        await saveCharacterEdits(id, {
          name_ar: nameAr, name_en: nameEn, status: statusV,
          blurb_ar: blurb, first_appeared_chapter: firstCh,
        });
      }
      alert('✓ نُزّل characters.js محدّث. استبدل الملف في المستودع وأعد النشر.');
      onClose();
    }catch(e){
      alert('تعذّر الحفظ: ' + (e.message||e));
    }finally{
      setBusy(false);
    }
  }

  function handleImagePick(e){
    const f = e.target.files && e.target.files[0];
    if(!f) return;
    const targetId = isNew
      ? (nameEn || nameAr).toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'')
      : id;
    if(!targetId){ alert('أدخل الاسم أولًا'); return; }
    normalizeAndDownloadImage(f, targetId);
    setImagePath('characters/' + targetId + '.webp');
  }

  const fieldCls = "w-full bg-transparent rounded-md px-3 py-2 text-[13px] focus-ring outline-none";
  const fieldStyle = { border:'1px solid var(--line)', color:'#dfe4ea' };
  const labelCls = "block eyebrow text-[11px] mb-1";

  return (
    <div className="backdrop fixed inset-0 z-50 grid place-items-center p-4"
         style={{ background:'rgba(4,5,8,.78)', backdropFilter:'blur(4px)' }}
         onClick={onClose} role="dialog" aria-modal="true" aria-label="تحرير شخصية">
      <div className="sheet glass w-full max-w-[480px] rounded-xl overflow-y-auto scroller relative max-h-[88vh]"
           style={{ border:'1px solid var(--brass)' }}
           onClick={e=>e.stopPropagation()}>
        <div style={{ height:3, background:'linear-gradient(90deg,transparent,var(--crimson-glow),transparent)' }}/>
        <div className="px-6 pt-5 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-deco text-[22px]" style={{ color:'var(--parchment)' }}>
              {isNew ? 'إضافة شخصية' : 'تحرير ' + (existing?existing.name_ar:'')}
            </h2>
            <button onClick={onClose} aria-label="إغلاق"
              className="w-9 h-9 grid place-items-center rounded-md focus-ring"
              style={{ background:'rgba(0,0,0,.4)', border:'1px solid var(--line)', color:'var(--parchment-dim)' }}>
              <X size={17}/>
            </button>
          </div>

          <label className={labelCls} style={{ color:'var(--brass-dim)' }}>الاسم (عربي)</label>
          <input value={nameAr} onChange={e=>setNameAr(e.target.value)} className={fieldCls} style={fieldStyle}/>

          <label className={labelCls + ' mt-3'} style={{ color:'var(--brass-dim)' }}>الاسم (إنجليزي)</label>
          <input value={nameEn} onChange={e=>setNameEn(e.target.value)} className={fieldCls} style={fieldStyle}
                 placeholder="Klein Moretti"/>

          <div className="grid grid-cols-2 gap-3 mt-3">
            <div>
              <label className={labelCls} style={{ color:'var(--brass-dim)' }}>الحالة</label>
              <select value={statusV} onChange={e=>setStatusV(e.target.value)} className={fieldCls} style={fieldStyle}>
                <option value="alive" style={{color:'#000'}}>حيّ</option>
                <option value="dead" style={{color:'#000'}}>متوفّى</option>
                <option value="unknown" style={{color:'#000'}}>غير معروف</option>
              </select>
            </div>
            <div>
              <label className={labelCls} style={{ color:'var(--brass-dim)' }}>أول فصل</label>
              <input type="number" min="1" value={firstCh} onChange={e=>setFirstCh(e.target.value)}
                     className={fieldCls} style={fieldStyle}/>
            </div>
          </div>

          <label className={labelCls + ' mt-3'} style={{ color:'var(--brass-dim)' }}>نبذة</label>
          <textarea value={blurb} onChange={e=>setBlurb(e.target.value)} rows={3}
                    className={fieldCls} style={fieldStyle}/>

          <label className={labelCls + ' mt-3'} style={{ color:'var(--brass-dim)' }}>الصورة</label>
          <input type="file" accept="image/*" onChange={handleImagePick}
                 className="block text-[11.5px] mb-1" style={{ color:'var(--parchment-dim)' }}/>
          <p className="text-[11.5px] font-old" style={{ color:'var(--parchment-dim)', opacity:.7 }}>
            تُموّعَج الصورة تلقائيًا (200×400) وتُنزّل كملف .webp — ضعها في assets/characters/.
          </p>
          <input value={imagePath} onChange={e=>setImagePath(e.target.value)} placeholder="characters/klein.webp"
                 className={fieldCls + ' mt-1'} style={fieldStyle}/>

          <button onClick={handleSave} disabled={busy}
            className="w-full mt-5 rounded-md py-2 font-display text-[13px] focus-ring disabled:opacity-50"
            style={{ background:'var(--brass)', color:'#1a1300', border:'1px solid var(--brass)' }}>
            {busy ? '…' : (isNew ? '＋ إضافة وتنزيل' : '💾 حفظ وتنزيل')}
          </button>
        </div>
      </div>
    </div>
  );
}

window.CharacterCard      = CharacterCard;
window.CharacterDetail    = CharacterDetail;
window.CharactersSection  = CharactersSection;

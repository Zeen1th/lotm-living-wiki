/** @jsxRuntime classic */ /** @jsx React.createElement */
const { useState, useMemo, useEffect } = React;
const LOTM = window.LOTM;
const Eng  = window.LOTMEngine;
const CAP  = Eng.encodedThrough(LOTM);

/* ----------------------------------------------------------------
   ICONS — hand-set Lucide glyphs (MIT) so the app stays self-contained
-----------------------------------------------------------------*/
const I = ({ size=20, sw=2, children, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" {...p}>{children}</svg>
);
const Search   = (p)=> <I {...p}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></I>;
const X        = (p)=> <I {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></I>;
const Pin      = (p)=> <I {...p}><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></I>;
const Compass  = (p)=> <I {...p}><path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/><circle cx="12" cy="12" r="10"/></I>;
const Anchor   = (p)=> <I {...p}><path d="M12 22V8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/><circle cx="12" cy="5" r="3"/></I>;
const Crown    = (p)=> <I {...p}><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.52l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></I>;
const Skull    = (p)=> <I {...p}><path d="M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="12" r="1"/></I>;
const Eye      = (p)=> <I {...p}><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></I>;
const Zap      = (p)=> <I {...p}><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></I>;
const Users    = (p)=> <I {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></I>;
const Scroll   = (p)=> <I {...p}><path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/></I>;
const Landmark = (p)=> <I {...p}><path d="M10 18v-7"/><path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M3 22h18"/><path d="M6 18v-7"/></I>;
const Moon     = (p)=> <I {...p}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9"/></I>;
const Scale    = (p)=> <I {...p}><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></I>;
const Sun      = (p)=> <I {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></I>;
const Rope     = (p)=> <I {...p}><path d="M12 22V8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/><circle cx="12" cy="5" r="3"/></I>;

/* ----------------------------------------------------------------
   LINK CHIP — clickable chip that navigates to another entity
-----------------------------------------------------------------*/
function LinkChip({ kind, id, label, navigate }){
  if(!navigate || !label) return <span className="font-display text-[13px]" style={{ color:'var(--parchment)' }}>{label}</span>;
  return (
    <button
      onClick={()=> navigate(kind, id)}
      className="chip focus-ring px-2.5 py-1 rounded-md text-[12px] font-display"
      style={{ background:'rgba(0,0,0,.35)', border:'1px solid var(--line)', color:'var(--parchment)', cursor:'pointer' }}>
      {label}
    </button>
  );
}

/* ----------------------------------------------------------------
   TERM — inline span with hover/focus tooltip for glossary defs
-----------------------------------------------------------------*/
function Term({ children, def: defProp, id, navigate }){
  const [show, setShow] = useState(false);

  // resolve def from glossary if not supplied directly
  const glossEntry = id ? (LOTM.glossary || []).find(g => g.id === id) : null;
  const def = defProp || (glossEntry ? glossEntry.def_ar : null);
  const ref = glossEntry ? glossEntry.ref : null;

  function handleClick(e){
    e.stopPropagation();
    if(ref && navigate){
      navigate(ref.kind, ref.id);
    }
  }

  if(!def) return <span>{children}</span>;

  return (
    <span className="relative inline-block">
      <span
        tabIndex={0}
        role="button"
        aria-label={def}
        style={{
          borderBottom:'1px dotted var(--brass)',
          cursor: ref && navigate ? 'pointer' : 'help',
          color:'var(--parchment)',
        }}
        onMouseEnter={()=>setShow(true)}
        onMouseLeave={()=>setShow(false)}
        onFocus={()=>setShow(true)}
        onBlur={()=>setShow(false)}
        onKeyDown={(e)=>{ if(e.key==='Escape') setShow(false); if(e.key==='Enter') handleClick(e); }}
        onClick={handleClick}
      >
        {children}
      </span>
      {show && (
        <span
          role="tooltip"
          style={{
            position:'absolute',
            bottom:'calc(100% + 6px)',
            right:0,
            zIndex:60,
            minWidth:200,
            maxWidth:280,
            padding:'8px 12px',
            borderRadius:8,
            background:'linear-gradient(160deg, rgba(22,28,38,.98), rgba(10,13,18,.98))',
            border:'1px solid var(--line)',
            backdropFilter:'blur(10px)',
            boxShadow:'0 4px 24px rgba(0,0,0,.7)',
            color:'var(--parchment)',
            fontSize:12,
            lineHeight:1.6,
            fontFamily:'Amiri, Georgia, serif',
            pointerEvents:'none',
            whiteSpace:'normal',
          }}>
          {def}
          {ref && navigate && (
            <span style={{ display:'block', marginTop:4, fontSize:10, color:'var(--brass)' }}>
              ← انقر للانتقال
            </span>
          )}
        </span>
      )}
    </span>
  );
}

/* ----------------------------------------------------------------
   CREST — shield brand mark
-----------------------------------------------------------------*/
const accentHex = (a)=> a==='crimson' ? 'var(--crimson-glow)' : 'var(--brass)';

function Crest({ size=42, accent='crimson' }){
  const c = accentHex(accent);
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 3l17 6v13c0 12-8 19-17 23C15 41 7 34 7 22V9z"
            fill="rgba(8,10,13,.9)" stroke={c} strokeWidth="1.3"/>
      <path d="M24 9l11 4v9c0 8-5 12.5-11 15-6-2.5-11-7-11-15v-9z"
            fill="none" stroke="rgba(216,195,154,.45)" strokeWidth=".8"/>
      <circle cx="24" cy="22" r="3.4" fill={c}/>
      <path d="M24 13v18M14 22h20" stroke="rgba(216,195,154,.5)" strokeWidth=".8"/>
    </svg>
  );
}

function statusBadge(status){
  const map = { alive:'حيّ', dead:'متوفّى', unknown:'غير معروف' };
  const col = status==='dead' ? 'var(--crimson-glow)' : status==='alive' ? 'var(--brass)' : 'var(--parchment-dim)';
  return <span className="eyebrow text-[9px]" style={{ color:col }}>{map[status]||status}</span>;
}

/* ----------------------------------------------------------------
   EMPTY NOTE + SECTION LIST — shared across views
-----------------------------------------------------------------*/
function EmptyNote({ text }){
  return (
    <p className="font-old italic text-center py-4 text-[13px]"
       style={{ color:'var(--parchment-dim)' }}>{text}</p>
  );
}

function SectionList({ items, renderRow, emptyLabel }){
  return (
    <div className="scroller overflow-y-auto flex-1 pb-6">
      {items.length === 0
        ? <EmptyNote text={emptyLabel}/>
        : items.map(renderRow)}
    </div>
  );
}

/* ----------------------------------------------------------------
   PLACEHOLDER PANEL — for unbuilt views
-----------------------------------------------------------------*/
function PlaceholderPanel({ label }){
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 px-4">
      <div className="bloodmoon" style={{ position:'relative', top:'unset', left:'unset', transform:'none',
                                          width:80, height:80 }}/>
      <h2 className="font-deco text-[26px]" style={{ color:'var(--parchment)' }}>{label}</h2>
      <p className="font-old text-[15px]" style={{ color:'var(--parchment-dim)' }}>
        قيد الإنشاء — يُملأ قريبًا
      </p>
    </div>
  );
}

/* ----------------------------------------------------------------
   SHARED CONSTANTS
-----------------------------------------------------------------*/
const NAV_VIEWS = [
  { id:'general',       label:'الرئيسية' },
  { id:'characters',    label:'الشخصيات' },
  { id:'pathways',      label:'المسارات' },
  { id:'map',           label:'الخريطة' },
  { id:'organizations', label:'المنظمات' },
  { id:'roselle',       label:'مذكرات روزيل' },
  { id:'epochs',        label:'الحقب' },
];

const KIND_AR = {
  region: 'منطقة',
  city:   'مدينة',
  sea:    'بحر',
};

const KIND_TO_VIEW = {
  character:    'characters',
  pathway:      'pathways',
  location:     'map',
  organization: 'organizations',
  era:          'epochs',
  document:     'roselle',
};

const ORG_KIND_AR = { club:'نادٍ', sect:'طائفة', church:'كنيسة', state:'دولة' };

const HUB_CARDS = [
  { id:'characters',    label:'الشخصيات',      desc:'تصفح الشخصيات المعروفة حتى فصلك الحالي' },
  { id:'pathways',      label:'المسارات',      desc:'مسارات التحول والتسلسلات المكتشفة' },
  { id:'map',           label:'الخريطة',       desc:'مملكات وجزر العالم المرتبطة بالشخصيات' },
  { id:'organizations', label:'المنظمات',      desc:'المنظمات السرية والكنائس والأندية' },
  { id:'roselle',       label:'مذكرات روزيل',  desc:'مقتطفات من يوميات روزيل الغامضة' },
  { id:'epochs',        label:'الحقب',          desc:'الحقب الخمس الكبرى لتاريخ العالم' },
];

const HUB_CONCEPTS = [
  'gloss_pathway',
  'gloss_sequence',
  'gloss_beyonder',
  'gloss_gray_fog',
  'gloss_tarot',
];

/* ----------------------------------------------------------------
   EXPORT to window — required for cross-file access under Babel standalone
-----------------------------------------------------------------*/
window.useState      = useState;
window.useMemo       = useMemo;
window.useEffect     = useEffect;
window.LOTM          = LOTM;
window.Eng           = Eng;
window.CAP           = CAP;
window.I             = I;
window.Search        = Search;
window.X             = X;
window.Pin           = Pin;
window.Compass       = Compass;
window.Anchor        = Anchor;
window.Crown         = Crown;
window.Skull         = Skull;
window.Eye           = Eye;
window.Zap           = Zap;
window.Users         = Users;
window.Scroll        = Scroll;
window.Landmark      = Landmark;
window.Moon          = Moon;
window.Scale         = Scale;
window.Sun           = Sun;
window.Rope          = Rope;
window.LinkChip      = LinkChip;
window.Term          = Term;
window.accentHex     = accentHex;
window.Crest         = Crest;
window.statusBadge   = statusBadge;
window.EmptyNote     = EmptyNote;
window.SectionList   = SectionList;
window.PlaceholderPanel = PlaceholderPanel;
window.NAV_VIEWS     = NAV_VIEWS;
window.KIND_AR       = KIND_AR;
window.KIND_TO_VIEW  = KIND_TO_VIEW;
window.ORG_KIND_AR   = ORG_KIND_AR;
window.HUB_CARDS     = HUB_CARDS;
window.HUB_CONCEPTS  = HUB_CONCEPTS;

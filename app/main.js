/** @jsxRuntime classic */ /** @jsx React.createElement */
/* ----------------------------------------------------------------
   APP ROOT
-----------------------------------------------------------------*/
function App(){
  const [chapter, setChapter] = useChapter();
  const [view, setView] = useState('general');
  const [focus, setFocus] = useState(null);
  const [isAdmin, adminLogin, adminLogout] = useAdmin();
  const [loginOpen, setLoginOpen] = useState(false);
  const [fontScale, bumpFont, resetFont] = useFontScale();
  const [searchFocusSignal, setSearchFocusSignal] = useState(0);

  // global keyboard shortcut: "/" or Ctrl+K focuses the header search
  useEffect(()=>{
    const h = (e)=>{
      if((e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA')
         || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')){
        e.preventDefault(); setSearchFocusSignal(s => s + 1);
      }
    };
    window.addEventListener('keydown', h);
    return ()=> window.removeEventListener('keydown', h);
  }, []);

  // Compute ONCE at mount whether storage was empty before useChapter wrote to it.
  // useChapter reads storage in its useState initializer and writes it in its effect.
  // We capture the "was-empty" flag as a state initializer so it's evaluated synchronously
  // before any renders run the useChapter effect.
  const [storageWasEmpty] = useState(()=> localStorage.getItem('lotm.chapter') == null);
  const [overlayOpen, setOverlayOpen] = useState(storageWasEmpty);

  const showOverlay = overlayOpen;

  function handleDismiss(){
    setOverlayOpen(false);
  }

  function navigate(kind, id){
    const targetView = KIND_TO_VIEW[kind];
    if(!targetView) return;
    setView(targetView);
    setFocus({ kind, id });
  }

  const clearFocus = ()=> setFocus(null);

  function renderView(){
    switch(view){
      case 'characters': return <CharactersSection chapter={chapter} focus={focus} clearFocus={clearFocus} navigate={navigate} isAdmin={isAdmin} fontScale={fontScale}/>;
      case 'general':    return <GeneralHub setView={setView} navigate={navigate}/>;
      case 'pathways':   return <PathwaysView chapter={chapter} focus={focus} clearFocus={clearFocus} navigate={navigate} fontScale={fontScale}/>;
      case 'map':        return <MapView chapter={chapter} focus={focus} clearFocus={clearFocus} navigate={navigate} isAdmin={isAdmin} fontScale={fontScale}/>;
      case 'organizations': return <OrganizationsView chapter={chapter} focus={focus} clearFocus={clearFocus} navigate={navigate} fontScale={fontScale}/>;
      case 'artifacts':     return <ArtifactsView chapter={chapter} focus={focus} clearFocus={clearFocus} navigate={navigate} fontScale={fontScale}/>;
      case 'roselle':    return <RoselleView chapter={chapter}/>;
      case 'epochs':     return <EpochsView chapter={chapter} fontScale={fontScale}/>;
      case 'entities':   return <EntitiesView chapter={chapter} focus={focus} clearFocus={clearFocus} navigate={navigate} fontScale={fontScale}/>;
      default:           return <GeneralHub setView={setView} navigate={navigate}/>;
    }
  }

  return (
    <div className="h-full w-full flex flex-col">
      <header className="glass flex items-center justify-between px-4 md:px-6 h-16 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <Crest size={34}/>
          <div className="leading-tight">
            <div className="eyebrow text-[11px]" style={{ color:'var(--brass)' }}>سيد الغوامض</div>
            <h1 className="font-deco text-[20px]" style={{ color:'var(--parchment)' }}>الموسوعة الحية</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ChapterSlider chapter={chapter} setChapter={setChapter}/>
          <button onClick={()=>setOverlayOpen(true)}
            className="focus-ring w-9 h-9 grid place-items-center rounded-md"
            style={{ background:'rgba(0,0,0,.4)', border:'1px solid var(--line)', color:'var(--parchment-dim)' }}
            title="الفصل" aria-label="إعادة فتح اختيار الفصل">
            <Compass size={17}/>
          </button>
          {/* font-size zoom: A− / A / A+ — scales the content area + detail panels */}
          <div className="flex items-center gap-0.5" style={{ background:'rgba(0,0,0,.4)', border:'1px solid var(--line)', borderRadius:6 }}>
            <button onClick={()=>bumpFont(-0.1)} disabled={fontScale <= 0.8}
              className="focus-ring w-8 h-9 grid place-items-center rounded-md disabled:opacity-30"
              style={{ color:'var(--parchment-dim)' }}
              title="تصغير الخط" aria-label="تصغير الخط">
              <span style={{ fontSize:11, fontWeight:700 }}>A−</span>
            </button>
            <button onClick={resetFont} disabled={fontScale === 1}
              className="focus-ring w-8 h-9 grid place-items-center rounded-md disabled:opacity-30"
              style={{ color:'var(--parchment-dim)' }}
              title="حجم الخط الافتراضي" aria-label="حجم الخط الافتراضي">
              <span style={{ fontSize:13, fontWeight:700 }}>A</span>
            </button>
            <button onClick={()=>bumpFont(0.1)} disabled={fontScale >= 1.4}
              className="focus-ring w-8 h-9 grid place-items-center rounded-md disabled:opacity-30"
              style={{ color:'var(--parchment-dim)' }}
              title="تكبير الخط" aria-label="تكبير الخط">
              <span style={{ fontSize:15, fontWeight:700 }}>A+</span>
            </button>
          </div>
          {/* global search — inline header field with dropdown results; shortcut / or Ctrl+K */}
          <HeaderSearch chapter={chapter} onNavigate={navigate} focusSignal={searchFocusSignal}/>
          {/* admin lock: opens login when logged out, confirms logout when logged in */}
          <button onClick={()=> isAdmin ? (confirm('تسجيل خروج المدير؟') && adminLogout()) : setLoginOpen(true)}
            className="focus-ring w-9 h-9 grid place-items-center rounded-md"
            style={{ background:'rgba(0,0,0,.4)',
                     border:'1px solid ' + (isAdmin ? 'var(--brass)' : 'var(--line)'),
                     color: isAdmin ? 'var(--brass)' : 'var(--parchment-dim)' }}
            title={isAdmin ? 'وضع المدير مُفعّل — اضغط لتسجيل الخروج' : 'دخول المدير'}
            aria-label={isAdmin ? 'خروج المدير' : 'دخول المدير'}>
            {isAdmin ? '🔓' : '🔒'}
          </button>
        </div>
      </header>
      <NavBar view={view} setView={setView}/>
      <main className="flex-1 relative min-h-0 overflow-hidden" style={{ zoom: fontScale }}>
        {renderView()}
      </main>
      {showOverlay && (
        <WelcomeOverlay chapter={chapter} setChapter={setChapter} onDismiss={handleDismiss}/>
      )}
      {loginOpen && (
        <LoginModal onLogin={async (u,p)=>{ const ok = await adminLogin(u,p); if(ok) setLoginOpen(false); return ok; }} onClose={()=>setLoginOpen(false)}/>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);

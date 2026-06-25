/** @jsxRuntime classic */ /** @jsx React.createElement */
/* ----------------------------------------------------------------
   APP ROOT
-----------------------------------------------------------------*/
function App(){
  const [chapter, setChapter] = useChapter();
  const [view, setView] = useState('general');
  const [focus, setFocus] = useState(null);

  // Compute ONCE at mount whether storage was empty before useChapter wrote to it.
  // useChapter reads storage in its useState initializer and writes it in useEffect.
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
      case 'characters': return <CharactersSection chapter={chapter} focus={focus} clearFocus={clearFocus} navigate={navigate}/>;
      case 'general':    return <GeneralHub setView={setView} navigate={navigate}/>;
      case 'pathways':   return <PathwaysView chapter={chapter} focus={focus} clearFocus={clearFocus} navigate={navigate}/>;
      case 'map':        return <MapView chapter={chapter} focus={focus} clearFocus={clearFocus} navigate={navigate}/>;
      case 'organizations': return <OrganizationsView chapter={chapter} focus={focus} clearFocus={clearFocus} navigate={navigate}/>;
      case 'artifacts':     return <ArtifactsView chapter={chapter} focus={focus} clearFocus={clearFocus} navigate={navigate}/>;
      case 'roselle':    return <RoselleView chapter={chapter}/>;
      case 'epochs':     return <EpochsView chapter={chapter}/>;
      default:           return <GeneralHub setView={setView} navigate={navigate}/>;
    }
  }

  return (
    <div className="h-full w-full flex flex-col">
      <header className="glass flex items-center justify-between px-4 md:px-6 h-16 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <Crest size={34}/>
          <div className="leading-tight">
            <div className="eyebrow text-[9px]" style={{ color:'var(--brass)' }}>سيد الألغاز</div>
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
        </div>
      </header>
      <NavBar view={view} setView={setView}/>
      <main className="flex-1 relative min-h-0 overflow-hidden">
        {renderView()}
      </main>
      {showOverlay && (
        <WelcomeOverlay chapter={chapter} setChapter={setChapter} onDismiss={handleDismiss}/>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);

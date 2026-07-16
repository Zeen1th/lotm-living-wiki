/** @jsxRuntime classic */ /** @jsx React.createElement */
/* ----------------------------------------------------------------
   ADMIN AUTH — client-side only.

   A static site has no backend, so this is "keep honest visitors out"
   security: the edit UI is hidden unless you log in, and the session
   persists in localStorage. The password is stored ONLY as a SHA-256
   hash of `username:password`, so a casual source-reader sees a hash,
   not a readable credential. (A determined reverse-engineer can still
   brute-force it — acceptable for this site.)

   To CHANGE the admin password: regenerate the hash with
     node -e "const c=require('crypto');\
       console.log(c.createHash('sha256')\
       .update('USER:PASS').digest('hex'))"
   and paste it into ADMIN_HASH below.
-----------------------------------------------------------------*/
const { useState, useEffect } = React;

// Admin credentials (hashed). username:password -> sha256.
const ADMIN_USER = 'warden';
const ADMIN_HASH = '5606ee7f3ac9742cd3ba5c2a10ceed19bfa2b20cdae96ee0356a60f5eb04d852';

const LS_KEY = 'lotm.isAdmin';

/* ---- hashing helper (async — crypto.subtle is Promise-based) ---- */
async function sha256Hex(str){
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

/* ----------------------------------------------------------------
   useAdmin — persisted boolean login state.
   Mirrors useChapter: useState-initialize from localStorage, persist
   on change via useEffect.
   Returns [isAdmin, login(user, pass) -> Promise<bool>, logout()].
-----------------------------------------------------------------*/
function useAdmin(){
  const [isAdmin, setIsAdmin] = useState(()=>{
    try { return localStorage.getItem(LS_KEY) === '1'; }
    catch { return false; }
  });
  useEffect(()=>{
    try { localStorage.setItem(LS_KEY, isAdmin ? '1' : '0'); } catch {}
  }, [isAdmin]);

  async function login(user, pass){
    const hash = await sha256Hex((user||'').trim() + ':' + (pass||''));
    const ok = (user||'').trim() === ADMIN_USER && hash === ADMIN_HASH;
    if(ok) setIsAdmin(true);
    return ok;
  }
  function logout(){ setIsAdmin(false); }

  return [isAdmin, login, logout];
}

/* ----------------------------------------------------------------
   LoginModal — centered glass modal with username + password fields.
   Props: onLogin(user, pass) -> Promise<bool>, onClose().
   Shows an error message on failed attempt.
-----------------------------------------------------------------*/
function LoginModal({ onLogin, onClose }){
  const [user, setUser]   = useState('');
  const [pass, setPass]   = useState('');
  const [err, setErr]     = useState('');
  const [busy, setBusy]   = useState(false);

  useEffect(()=>{
    const h = (e)=>{ if(e.key==='Escape') onClose(); };
    window.addEventListener('keydown', h);
    return ()=> window.removeEventListener('keydown', h);
  }, [onClose]);

  async function submit(e){
    e.preventDefault();
    if(busy) return;
    setBusy(true); setErr('');
    const ok = await onLogin(user, pass);
    setBusy(false);
    if(!ok) setErr('اسم المستخدم أو كلمة المرور غير صحيحة');
    // on success the caller unmounts this modal (isAdmin flips)
  }

  return (
    <div className="backdrop fixed inset-0 z-50 grid place-items-center p-4"
         style={{ background:'rgba(4,5,8,.78)', backdropFilter:'blur(4px)' }}
         onClick={onClose} role="dialog" aria-modal="true" aria-label="دخول المدير">
      <div className="sheet glass w-full max-w-[360px] rounded-xl relative"
           style={{ border:'1px solid var(--brass)' }}
           onClick={e=>e.stopPropagation()}>
        <div style={{ height:3, background:'linear-gradient(90deg,transparent,var(--crimson-glow),transparent)' }}/>
        <form onSubmit={submit} className="px-6 pt-5 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-deco text-[22px]" style={{ color:'var(--parchment)' }}>دخول المدير</h2>
            <button type="button" onClick={onClose} aria-label="إغلاق"
              className="w-9 h-9 grid place-items-center rounded-md focus-ring"
              style={{ background:'rgba(0,0,0,.4)', border:'1px solid var(--line)', color:'var(--parchment-dim)' }}>
              <X size={17}/>
            </button>
          </div>
          <label className="block eyebrow text-[11px] mb-1" style={{ color:'var(--brass-dim)' }}>اسم المستخدم</label>
          <input value={user} onChange={e=>setUser(e.target.value)} autoFocus
                 className="w-full bg-transparent rounded-md px-3 py-2 mb-3 text-[13px] focus-ring outline-none"
                 style={{ border:'1px solid var(--line)', color:'#dfe4ea' }} autoComplete="username"/>
          <label className="block eyebrow text-[11px] mb-1" style={{ color:'var(--brass-dim)' }}>كلمة المرور</label>
          <input type="password" value={pass} onChange={e=>setPass(e.target.value)}
                 className="w-full bg-transparent rounded-md px-3 py-2 mb-1 text-[13px] focus-ring outline-none"
                 style={{ border:'1px solid var(--line)', color:'#dfe4ea' }} autoComplete="current-password"/>
          {err && <p className="text-[11.5px] mt-2" style={{ color:'var(--crimson-glow)' }}>{err}</p>}
          <button type="submit" disabled={busy}
            className="w-full mt-4 rounded-md py-2 font-display text-[13px] focus-ring disabled:opacity-50"
            style={{ background:'var(--brass)', color:'#1a1300', border:'1px solid var(--brass)' }}>
            {busy ? '…' : 'دخول'}
          </button>
          <p className="text-center text-[11.5px] mt-3 font-old" style={{ color:'var(--parchment-dim)', opacity:.7 }}>
            للمدير فقط — يُخفي التعديلات عن الزوار
          </p>
        </form>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   EXPORT
-----------------------------------------------------------------*/
window.useAdmin    = useAdmin;
window.LoginModal  = LoginModal;

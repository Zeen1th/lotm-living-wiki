// tools/fetch-characters.js
//
// One-shot scraper: downloads a profile image for each character from the
// Lord of the Mysteries Fandom wiki, via the MediaWiki API (prop=pageimages).
// Run:  node tools/fetch-characters.js
//
// Output: assets/characters/{id}.webp
//
// The API returns JSON (no HTML scraping, no Cloudflare challenge for API
// calls), and gives us the infobox thumbnail URL directly. We re-encode the
// downloaded image to optimized WebP for small size.
//
// Page-name overrides: a few characters sit under a different page title than
// their name_en. Map them explicitly.

const fs = require('fs');
const path = require('path');
const https = require('https');

const LOTM = require('../data/index.js');
const OUT_DIR = path.join(__dirname, '..', 'assets', 'characters');

// Fandom page title overrides (id -> wiki page title).
// Names that differ from name_en or whose plain name_en has no page.
const PAGE_OVERRIDES = {
  azik: 'Azik Eggers',
  emperor_roselle: 'Roselle Gustav',
};

const UA = 'LordOfMysteriesWikiBot/1.0 (https://github.com/Zeen1th/lotm-living-wiki)';

function fetch(url){
  return new Promise((resolve, reject)=>{
    const opts = { headers: { 'User-Agent': UA } };
    https.get(url, opts, (res)=>{
      if(res.statusCode >= 300 && res.statusCode < 400 && res.headers.location){
        // follow redirect
        return resolve(fetch(res.headers.location));
      }
      let data = '';
      res.setEncoding('utf8');
      res.on('data', c => data += c);
      res.on('end', ()=> resolve({ status: res.statusCode, body: data, headers: res.headers }));
    }).on('error', reject);
  });
}

function fetchBinary(url, dest){
  return new Promise((resolve, reject)=>{
    const file = fs.createWriteStream(dest);
    const opts = { headers: { 'User-Agent': UA } };
    const req = (u) => {
      https.get(u, opts, (res)=>{
        if(res.statusCode >= 300 && res.statusCode < 400 && res.headers.location){
          file.close(); fs.unlinkSync(dest);
          return req(res.headers.location);
        }
        if(res.statusCode !== 200){
          file.close(); try { fs.unlinkSync(dest); } catch {}
          return reject(new Error('HTTP ' + res.statusCode + ' for ' + u));
        }
        res.pipe(file);
        file.on('finish', ()=> file.close(()=> resolve()));
      }).on('error', reject);
    };
    req(url);
  });
}

async function getPageImage(title){
  const api = 'https://lordofthemysteries.fandom.com/api.php?action=query'
            + '&titles=' + encodeURIComponent(title)
            + '&prop=pageimages&format=json&pithumbsize=400';
  const r = await fetch(api);
  if(r.status !== 200) throw new Error('API HTTP ' + r.status);
  const data = JSON.parse(r.body);
  const pages = data.query && data.query.pages;
  if(!pages) return null;
  const page = pages[Object.keys(pages)[0]];
  if(page.missing !== undefined) return null;          // page does not exist
  if(!page.thumbnail) return null;                      // page exists, no image
  return { url: page.thumbnail.source, file: page.pageimage };
}

(async ()=>{
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const results = [];
  for(const c of LOTM.characters){
    const title = PAGE_OVERRIDES[c.id] || c.name_en;
    try{
      const info = await getPageImage(title);
      if(!info){
        results.push({ id: c.id, name: c.name_en, status: 'NO IMAGE', title });
        console.log('  SKIP  ' + c.id.padEnd(18) + '(' + title + ') — no image on wiki');
        continue;
      }
      const dest = path.join(OUT_DIR, c.id + '_raw');
      await fetchBinary(info.url, dest);
      results.push({ id: c.id, name: c.name_en, status: 'OK', title, src: info.file });
      console.log('  OK    ' + c.id.padEnd(18) + '<- ' + title);
    }catch(err){
      results.push({ id: c.id, name: c.name_en, status: 'ERROR', title, error: err.message });
      console.log('  FAIL  ' + c.id.padEnd(18) + '(' + title + ') — ' + err.message);
    }
  }

  const ok = results.filter(r => r.status === 'OK').length;
  const miss = results.filter(r => r.status !== 'OK').length;
  console.log('\n' + ok + ' downloaded, ' + miss + ' skipped/failed');
  fs.writeFileSync(path.join(OUT_DIR, '_fetch-report.json'), JSON.stringify(results, null, 2));
})();

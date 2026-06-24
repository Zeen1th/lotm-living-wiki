// tools/grounding.js — pure Node helper; verifies a quote exists in its cited chapter file.
const fs = require('node:fs');
const path = require('node:path');

const OEBPS = path.join(__dirname, '..', '_epub_extract', 'OEBPS');

function stripHtml(s){ return String(s).replace(/<[^>]*>/g, ' '); }

function normalizeArabic(s){
  return stripHtml(s)
    .replace(/[ً-ْٰـ]/g, '')              // tashkeel, superscript alef, tatweel
    .replace(/[آأإٱ]/g, 'ا')          // أ إ آ ٱ -> ا
    .replace(/ى/g, 'ي')                              // ى -> ي
    .replace(/ة/g, 'ه')                              // ة -> ه
    .replace(/[​-‏‪-‮ ]/g, ' ')       // zero-width / bidi / nbsp
    .replace(/[«»"""''.,،؛:!؟؟()\[\]{}\-—–_/\\]/g, ' ')        // punctuation -> space
    .replace(/\s+/g, ' ')
    .trim();
}

function chapterFileFor(chapter){
  return path.join(OEBPS, 'chapter' + (chapter - 1) + '.html');
}

function extractPresent(){
  try { return fs.statSync(OEBPS).isDirectory(); } catch { return false; }
}

const _cache = new Map();
function chapterText(chapter){
  if(_cache.has(chapter)) return _cache.get(chapter);
  const f = chapterFileFor(chapter);
  let norm = null;
  try { norm = normalizeArabic(fs.readFileSync(f, 'utf8')); } catch { norm = null; }
  _cache.set(chapter, norm);
  return norm;
}

function quoteInChapter(quote, chapter){
  if(!extractPresent()) return { ok:false, reason:'no-extract' };
  const text = chapterText(chapter);
  if(text == null) return { ok:false, reason:'no-file' };
  const q = normalizeArabic(quote);
  if(!q) return { ok:false, reason:'empty-quote' };
  return text.includes(q) ? { ok:true } : { ok:false, reason:'not-found' };
}

module.exports = { normalizeArabic, stripHtml, chapterFileFor, extractPresent, quoteInChapter };

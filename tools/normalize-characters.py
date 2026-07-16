#!/usr/bin/env python3
# tools/normalize-characters.py
#
# Standardize character portrait art to match Klein's style:
#   - full-body portrait kept WHOLE (no head/feet chopped off)
#   - placed on a uniform 1:2.0 dark canvas, so the whole set reads as one
#     consistent "card" series — identical size + background = "like Klein's"
#   - re-encoded to optimized WebP, RGB
#   - RGBA sources (transparent PNGs) composited onto the solid dark backdrop
#
# Pipeline per image:
#   1. open, convert to RGBA
#   2. composite alpha over a dark solid color (#0e1016 ~ the app's bg)
#   3. FIT (contain) onto a 200x400 canvas — nothing cropped, padding is bg
#
# SOURCE MAP: which raw to use for each final id.
#   - klein and the 5 already-good Official portraits: keep current webp as-is
#     (just re-normalize ratio so the whole set is uniform)
#   - 4 off-style + Don/Dunn: use newly-fetched better sources

from PIL import Image, ImageOps
import os, glob

CHARS = 'assets/characters'
TARGET_W, TARGET_H = 200, 400          # klein is 197x399 -> match ~1:2.0
BG = (14, 16, 22)                       # #0e1016, matches app background
QUALITY = 90

# (final_id_without_ext, source_file)
# Sources: existing good webps are re-used; off-style ones use new raw fetches.
SOURCES = [
    ('klein',            'klein.webp'),
    ('audrey',           'audrey.webp'),
    ('alger',            'alger.webp'),
    ('derrick',          'derrick.webp'),
    ('emperor_roselle',  'emperor_roselle.webp'),
    ('leonard',          'leonard.webp'),
    # NEW / replaced sources (full-body portrait art, matching Klein's style)
    ('ence_zangwill',    'ince_official_raw'),
    ('azik',             'azik_donghua_raw'),
    ('benson_moretti',   'benson_qidian_raw'),
    ('melissa_moretti',  'melissa_manhua2020_raw'),
    ('don_smith',        'dunn_official_raw'),   # wiki name is "Dunn Smith"
]

def normalize(src_path, dst_path):
    im = Image.open(src_path)
    im = ImageOps.exif_transpose(im)
    if im.mode == 'P':
        im = im.convert('RGBA')
    im = im.convert('RGBA')

    # Composite alpha onto solid dark bg (kills transparent fringes)
    bg = Image.new('RGBA', im.size, BG)
    bg.alpha_composite(im)
    im = bg.convert('RGB')

    # AUTO-CROP to the character's bounding box first.
    # Source art carries inconsistent whitespace (some figures fill the frame,
    # others sit tiny in the middle). Trimming the near-background margin makes
    # every character fill the canvas by the same amount — so the set looks
    # uniform "like Klein's", without ever cropping the figure itself.
    bbox = _art_bbox(im)
    if bbox:
        im = im.crop(bbox)

    # FIT (contain) the full figure onto a uniform 1:2.0 canvas.
    # Nothing of the character gets cropped — head & feet always intact. Shared
    # dark canvas + identical fill = a consistent portrait series.
    tw, th = TARGET_W, TARGET_H
    scale = min(tw / im.width, th / im.height)
    nw, nh = max(1, int(im.width * scale)), max(1, int(im.height * scale))
    im = im.resize((nw, nh), Image.LANCZOS)
    # leave a tiny margin so art isn't flush to the card edge
    nw = min(nw, tw); nh = min(nh, th)
    canvas = Image.new('RGB', (tw, th), BG)
    canvas.paste(im, ((tw - nw) // 2, (th - nh) // 2))
    canvas.save(dst_path, 'WEBP', quality=QUALITY, method=6)
    return canvas.size


def _art_bbox(im, thresh=26):
    """Bounding box of non-background pixels (the character art)."""
    px = im.load(); w, h = im.size
    minx, miny, maxx, maxy = w, h, 0, 0
    found = False
    for y in range(0, h, 2):
        for x in range(0, w, 2):
            r, g, b = px[x, y][:3]
            if abs(r - BG[0]) > thresh or abs(g - BG[1]) > thresh or abs(b - BG[2]) > thresh:
                found = True
                if x < minx: minx = x
                if y < miny: miny = y
                if x > maxx: maxx = x
                if y > maxy: maxy = y
    if not found:
        return None
    # expand sampled coords back to full resolution + a small breathing margin
    minx = max(0, minx - 2); miny = max(0, miny - 2)
    maxx = min(w - 1, maxx + 3); maxy = min(h - 1, maxy + 3)
    return (minx, miny, maxx + 1, maxy + 1)

if __name__ == '__main__':
    os.makedirs(CHARS, exist_ok=True)
    report = []
    for out_id, src in SOURCES:
        sp = os.path.join(CHARS, src)
        dp = os.path.join(CHARS, out_id + '.webp')
        if not os.path.exists(sp):
            report.append((out_id, src, 'MISSING SRC'))
            print(f'  SKIP  {out_id:18s} src {src} not found')
            continue
        w, h = normalize(sp, dp)
        kb = os.path.getsize(dp) / 1024
        report.append((out_id, src, f'{w}x{h} {kb:.0f}KB'))
        print(f'  OK    {out_id:18s} <- {src:28s} -> {w}x{h}  {kb:.0f}KB')
    print('\n' + str(len([r for r in report if 'x' in str(r[2])])) + ' images normalized')

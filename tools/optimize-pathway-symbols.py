#!/usr/bin/env python3
"""Optimize pathway symbol PNGs → webp thumbnails.

Source PNGs are 2000x2000 RGBA (~370KB each) from the LotM Fandom wiki.
The UI displays them as small icons (~28-64px), so we downscale to 256x256
preserving the alpha channel, which cuts payload ~95% with no visible loss.

Only the 16 symbols actually referenced by data/pathways.js are produced;
unused wiki symbols are left as-is (they can be deleted later if desired).
"""
import os
from PIL import Image

SRC = os.path.dirname(os.path.abspath(__file__)) + '/../assets/pathways'
TARGET_PX = 256

# ids that data/pathways.js wires up (keep in sync with PATHWAY_SYMBOLS)
USED = {
    'fool', 'visionary', 'tyrant', 'sun', 'twilight_giant', 'darkness',
    'death', 'abyss', 'paragon', 'hermit', 'red_priest', 'chained',
    'black_emperor', 'door', 'demoness',
}

for name in sorted(USED):
    png = os.path.join(SRC, name + '.png')
    webp = os.path.join(SRC, name + '.webp')
    if not os.path.exists(png):
        print(f'  MISSING source: {png}')
        continue
    im = Image.open(png).convert('RGBA')
    # high-quality downscale
    im = im.resize((TARGET_PX, TARGET_PX), Image.LANCZOS)
    im.save(webp, 'WEBP', quality=90, lossless=False, method=6)
    sz_in = os.path.getsize(png) // 1024
    sz_out = os.path.getsize(webp) // 1024
    print(f'  {name:18} {sz_in:4}KB -> {sz_out:3}KB  ({100*(1-sz_out/sz_in):.0f}% smaller)')
print('done.')

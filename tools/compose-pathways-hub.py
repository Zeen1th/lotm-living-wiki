#!/usr/bin/env python3
"""Compose the Pathways hub-card image: all 15 pathway sigils arranged on a
dark themed background, matching the site's --void/--brass palette and the
4:5 aspect ratio used by hub cards (object-fit:cover will crop to the visible box).

Output: assets/pathways/_hub-card.webp
"""
import math
import os
from PIL import Image, ImageDraw, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, '..', 'assets', 'pathways')

# Pathway sigils (the 15 wired-up ones), in a deliberate visual order.
# Group by the Above-the-Sequence deity family so related sigils cluster.
SIGILS = [
    'fool', 'door',           # Mysteries (Klein / Mr. Door)
    'visionary', 'tyrant', 'sun',  # God Almighty (Spectator / Sailor / Sun)
    'darkness', 'death',      # Eternal Darkness
    'twilight_giant',         # Eternal Darkness (shared) / Giant
    'demoness', 'red_priest', # Calamity of Destruction
    'hermit', 'paragon',      # Demon of Knowledge
    'chained', 'abyss',       # Father of Devils
    'black_emperor',          # The Anarchy
]

CANVAS_W, CANVAS_H = 600, 750          # 4:5
BG = (8, 10, 13)                        # --void #080a0d
GLOW = (200, 162, 74)                   # --brass #c8a24a

# Grid layout: 3 columns x 5 rows = 15 cells
COLS, ROWS = 3, 5
MARGIN = 70
CELL_W = (CANVAS_W - 2 * MARGIN) // COLS
CELL_H = (CANVAS_H - 2 * MARGIN) // ROWS
SIGIL_PX = min(CELL_W, CELL_H) - 18     # leave padding inside cell

canvas = Image.new('RGB', (CANVAS_W, CANVAS_H), BG)

# Subtle radial vignette + brass tint in upper third (matches other hub art)
glow_layer = Image.new('RGB', (CANVAS_W, CANVAS_H), BG)
gd = ImageDraw.Draw(glow_layer)
# a soft warm bloom near top-center
for r, alpha in [(CANVAS_W, 26), (CANVAS_W * 2 // 3, 20), (CANVAS_W // 3, 14)]:
    bloom = Image.new('RGB', (CANVAS_W, CANVAS_H), (0, 0, 0))
    bd = ImageDraw.Draw(bloom)
    cx, cy = CANVAS_W // 2, int(CANVAS_H * 0.30)
    bd.ellipse([cx - r, cy - r, cx + r, cy + r], fill=tuple(int(c * alpha / 255) for c in GLOW))
    bloom = bloom.filter(ImageFilter.GaussianBlur(r // 2))
    glow_layer = Image.blend(glow_layer, bloom, 0.5)
canvas = Image.alpha_composite(canvas.convert('RGBA'), glow_layer.convert('RGBA')).convert('RGB')

# Paste each sigil into its cell, centered, with a brass drop-shadow
for i, name in enumerate(SIGILS):
    path = os.path.join(SRC, name + '.webp')
    if not os.path.exists(path):
        print('  MISSING', path); continue
    im = Image.open(path).convert('RGBA')
    im = im.resize((SIGIL_PX, SIGIL_PX), Image.LANCZOS)

    col = i % COLS
    row = i // COLS
    cx = MARGIN + col * CELL_W + CELL_W // 2
    cy = MARGIN + row * CELL_H + CELL_H // 2
    x = cx - SIGIL_PX // 2
    y = cy - SIGIL_PX // 2

    # brass-tinted shadow halo: tint the sigil's alpha, blur, paste beneath
    halo = Image.new('RGBA', (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    tint = Image.new('RGBA', im.size, GLOW + (0,))
    # use sigil alpha as mask for the tint
    tinted = Image.composite(
        Image.new('RGBA', im.size, GLOW + (90,)),
        Image.new('RGBA', im.size, (0, 0, 0, 0)),
        im.split()[-1]
    )
    halo.paste(tinted, (x, y), tinted)
    halo = halo.filter(ImageFilter.GaussianBlur(SIGIL_PX // 12))
    canvas.paste(halo, (0, 0), halo)

    canvas.paste(im, (x, y), im)

OUT = os.path.join(SRC, '_hub-card.webp')
canvas.save(OUT, 'WEBP', quality=88, method=6)
print('wrote', OUT, canvas.size, str(os.path.getsize(OUT) // 1024) + 'KB')

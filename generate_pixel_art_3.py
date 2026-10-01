import os

def generate_pixel_svg(matrix, color_map, filename):
    svg_out = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">\n'
    for y, row in enumerate(matrix):
        for x, char in enumerate(row):
            if char in color_map and color_map[char]:
                svg_out += f'  <rect x="{x}" y="{y}" width="1" height="1" fill="{color_map[char]}"/>\n'
    svg_out += '</svg>'
    
    path = os.path.join('public', 'images', filename)
    with open(path, 'w') as f:
        f.write(svg_out)

colors = {
    'B': '#000000', # Black border
    'W': '#FFFFFF', # White
    'R': '#D84315', # Red
    'O': '#FFB300', # Orange
    'G': '#4CAF50', # Green
    'Y': '#FBC02D', # Yellow
    'D': '#5D4037', # Dark Brown
    'L': '#D7CCC8', # Light brown/meat
    'C': '#FFCC80', # Chicken/Skin
    'P': '#EF6C00', # Carrot orange
    'U': '#FFF9C4', # Udon yellow
    'F': '#FFA000', # Fried breading (Heo/Tom)
    'S': '#FF5722', # Shrimp tail
    'E': '#795548', # Eye
}

# Heo chiên xù (Tonkatsu)
pork = [
    "                ",
    "                ",
    "     FFFFFF     ",
    "    FFFFFFFF    ",
    "    FFFLFFFF    ",
    "   FFFFLFFFFF   ",
    "   FFLFFFFLFF   ",
    "   FFFFFFFFFF   ",
    "    FFFFFFFF    ",
    "     FFFFFF     ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                "
]

# Tôm chiên xù (Fried Shrimp)
shrimp = [
    "                ",
    "                ",
    "         SSS    ",
    "        S  SS   ",
    "       F  SS    ",
    "      FFF       ",
    "     FFFFF      ",
    "    FFFFF       ",
    "   FFFFF        ",
    "  FFFFF         ",
    "  FFFF          ",
    "   FF           ",
    "                ",
    "                ",
    "                ",
    "                "
]

generate_pixel_svg(pork, colors, 'pork.svg')
generate_pixel_svg(shrimp, colors, 'shrimp.svg')
print("Generated new ingredients.")

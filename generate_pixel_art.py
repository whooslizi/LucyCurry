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
}

# Rice Bowl
rice = [
    "                ",
    "                ",
    "                ",
    "      WWWW      ",
    "     WWWWWW     ",
    "    WWWWWWWW    ",
    "    WWWWWWWW    ",
    "   WWWWWWWWWW   ",
    "  BBBBBBBBBBBB  ",
    "  BLLLLLLLLLLB  ",
    "  BLLLLLLLLLLB  ",
    "   BBLLLLLLBB   ",
    "     BBBBBB     ",
    "                ",
    "                ",
    "                "
]

# Chicken Leg
chicken = [
    "                ",
    "                ",
    "                ",
    "     CCCCC      ",
    "    CCCCCCC     ",
    "    CCCCCCC     ",
    "    CCCCCCC     ",
    "     CCCCC      ",
    "      BBB       ",
    "      BWB       ",
    "      BWB       ",
    "     BBWBB      ",
    "     BW WB      ",
    "     BB BB      ",
    "                ",
    "                "
]

# Beef piece
beef = [
    "                ",
    "                ",
    "                ",
    "      DDDD      ",
    "     DDDDDD     ",
    "    DDLDDDDD    ",
    "    DDDDDDDD    ",
    "    DDDDLDDD    ",
    "    DDDDDDDD    ",
    "     DDDDDD     ",
    "      DDDD      ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                "
]

# Carrot
carrot = [
    "                ",
    "                ",
    "       G        ",
    "      GGG       ",
    "       G        ",
    "      PPP       ",
    "     PPPPP      ",
    "     PPWPP      ",
    "     PPPPP      ",
    "      PPP       ",
    "      PPP       ",
    "       P        ",
    "                ",
    "                ",
    "                ",
    "                "
]

# Potato
potato = [
    "                ",
    "                ",
    "                ",
    "                ",
    "      YYYY      ",
    "     YYYYYY     ",
    "    YDBYYYYY    ",
    "    YYYYYYYY    ",
    "    YYYYYDBY    ",
    "     YYYYYY     ",
    "      YYYY      ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                "
]

# Udon noodles
udon = [
    "                ",
    "                ",
    "                ",
    "   UU      UU   ",
    "  U  U    U  U  ",
    " U    U  U    U ",
    " U    U  U    U ",
    "  U  U    U  U  ",
    "   UU      UU   ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                "
]

# Pothole
pothole = [
    "                ",
    "                ",
    "                ",
    "                ",
    "      BBBB      ",
    "    BBBBBBBB    ",
    "   BBDBBBBBDB   ",
    "   BBBBBBBBBB   ",
    "    BBBBBBBB    ",
    "      BBBB      ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                "
]

generate_pixel_svg(rice, colors, 'rice.svg')
generate_pixel_svg(chicken, colors, 'chicken.svg')
generate_pixel_svg(beef, colors, 'beef.svg')
generate_pixel_svg(carrot, colors, 'carrot.svg')
generate_pixel_svg(potato, colors, 'potato.svg')
generate_pixel_svg(udon, colors, 'udon.svg')
generate_pixel_svg(pothole, colors, 'pothole.svg')
print("Generated chibi 8-bit SVGs.")

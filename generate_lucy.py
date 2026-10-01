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
    'B': '#000000', # Black
    'S': '#FFE0BD', # Skin
    'H': '#F5F5DC', # Hair (Platinum Blonde / White as in the photo)
    'L': '#D32F2F', # Lips (Red)
    'C': '#FFCC80', # Coat/Fluffy stuff
}

lucy = [
    "                ",
    "      HHHH      ",
    "     HHHHHH     ",
    "    HHHHHHHH    ",
    "    H SSSS H    ",
    "    H BSSB H    ",
    "    H SSSL H    ",
    "     HSSSS      ",
    "      SSSS      ",
    "     CCCCCC     ",
    "    CCCCCCCC    ",
    "    CCCCCCCC    ",
    "    CCCCCCCC    ",
    "                ",
    "                ",
    "                "
]

generate_pixel_svg(lucy, colors, 'lucy_8bit.svg')
print("Generated Lucy 8-bit avatar.")

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
    'B': '#000000',
    'W': '#FFFFFF',
    'O': '#FF9800', # Orange Cone
    'D': '#795548', # Dog Brown
    'R': '#F44336', # Red
    'G': '#9E9E9E', # Road grey
    'L': '#EEEEEE', # Line white
}

cone = [
    "                ",
    "       W        ",
    "      WWW       ",
    "      OOO       ",
    "     OOOOO      ",
    "     WWWWW      ",
    "    WWWWWWW     ",
    "    OOOOOOO     ",
    "   OOOOOOOOO    ",
    "   OOOOOOOOO    ",
    "  OOOOOOOOOOO   ",
    "  OOOOOOOOOOO   ",
    " OOOOOOOOOOOOO  ",
    "BBBBBBBBBBBBBBB ",
    "                ",
    "                "
]

dog = [
    "                ",
    "                ",
    "       DD       ",
    "      DDDD  DD  ",
    "      DBDDDDDD  ",
    "      DDDDDDDD  ",
    "        DDDDDD  ",
    "        DDDDDD  ",
    "        DD  DD  ",
    "        DD  DD  ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                "
]

road = [
    "GGGGGLGGGGGLGGGG",
    "GGGGGLGGGGGLGGGG",
    "GGGGGLGGGGGLGGGG",
    "GGGGG GGGGG GGGG",
    "GGGGG GGGGG GGGG",
    "GGGGGLGGGGGLGGGG",
    "GGGGGLGGGGGLGGGG",
    "GGGGGLGGGGGLGGGG",
    "GGGGG GGGGG GGGG",
    "GGGGG GGGGG GGGG",
    "GGGGGLGGGGGLGGGG",
    "GGGGGLGGGGGLGGGG",
    "GGGGGLGGGGGLGGGG",
    "GGGGG GGGGG GGGG",
    "GGGGG GGGGG GGGG",
    "GGGGGLGGGGGLGGGG"
]

generate_pixel_svg(cone, colors, 'cone.svg')
generate_pixel_svg(dog, colors, 'dog.svg')
generate_pixel_svg(road, colors, 'road.svg')
print("Generated hazards.")

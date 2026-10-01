import os

def save_svg(filename, content):
    path = os.path.join('public', 'images', filename)
    with open(path, 'w') as f:
        f.write(content)

# Rice bowl
rice_svg = """<svg xmlns="http://www.w3.org/20advantage" viewBox="0 0 100 100">
  <path d="M 10 50 Q 50 90 90 50 Z" fill="#e0e0e0" stroke="#757575" stroke-width="4"/>
  <path d="M 20 45 Q 50 20 80 45 Z" fill="#ffffff"/>
</svg>"""

# Chicken piece
chicken_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="60" rx="30" ry="20" fill="#d84315"/>
  <rect x="70" y="55" width="20" height="10" fill="#ffcc80" rx="5"/>
</svg>"""

# Beef piece
beef_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M 30 40 Q 70 20 80 60 Q 40 80 20 50 Z" fill="#5d4037"/>
</svg>"""

# Carrot piece
carrot_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <polygon points="20,20 80,40 25,80" fill="#ef6c00"/>
</svg>"""

# Potato
potato_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="50" rx="25" ry="20" fill="#fbc02d"/>
  <circle cx="40" cy="45" r="2" fill="#795548"/>
  <circle cx="60" cy="55" r="2" fill="#795548"/>
</svg>"""

# Udon noodles
udon_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M 20 30 Q 50 10 80 30 T 20 50 T 80 70" fill="none" stroke="#fff9c4" stroke-width="8" stroke-linecap="round"/>
</svg>"""

# Pothole (Obstacle)
pothole_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="50" rx="40" ry="20" fill="#212121"/>
  <ellipse cx="45" cy="48" rx="20" ry="10" fill="#424242"/>
</svg>"""

save_svg('rice.svg', rice_svg)
save_svg('chicken.svg', chicken_svg)
save_svg('beef.svg', beef_svg)
save_svg('carrot.svg', carrot_svg)
save_svg('potato.svg', potato_svg)
save_svg('udon.svg', udon_svg)
save_svg('pothole.svg', pothole_svg)

print("Generated all SVGs.")

import os

def save_svg(filename, content):
    path = os.path.join('public', 'images', filename)
    with open(path, 'w') as f:
        f.write(content)

# Brick wall background pattern (simple tile)
brick_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <rect width="40" height="40" fill="#795548"/>
  <rect x="0" y="0" width="40" height="18" fill="#5d4037"/>
  <rect x="0" y="20" width="20" height="18" fill="#5d4037"/>
  <rect x="22" y="20" width="18" height="18" fill="#5d4037"/>
</svg>"""

# Window with moon
window_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect x="10" y="10" width="80" height="80" fill="#1a237e" stroke="#3e2723" stroke-width="10"/>
  <circle cx="70" cy="30" r="10" fill="#fff59d"/>
  <line x1="30" y1="10" x2="30" y2="90" stroke="#3e2723" stroke-width="5"/>
  <line x1="50" y1="10" x2="50" y2="90" stroke="#3e2723" stroke-width="5"/>
  <line x1="70" y1="10" x2="70" y2="90" stroke="#3e2723" stroke-width="5"/>
</svg>"""

# Big Stove and Curry Pot
stove_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <!-- Stove base -->
  <rect x="20" y="60" width="60" height="40" fill="#d32f2f" stroke="#b71c1c" stroke-width="4"/>
  <!-- Fire hole -->
  <path d="M 40 100 Q 50 70 60 100 Z" fill="#212121"/>
  <!-- Fire flames -->
  <path d="M 45 100 Q 50 80 55 100 Z" fill="#ff5722"/>
  <path d="M 48 100 Q 50 85 52 100 Z" fill="#ffeb3b"/>
  <!-- Big Silver Pot -->
  <rect x="10" y="10" width="80" height="50" fill="#9e9e9e" stroke="#616161" stroke-width="4" rx="5"/>
  <rect x="5" y="20" width="90" height="10" fill="#bdbdbd"/>
  <rect x="40" y="0" width="20" height="10" fill="#757575" rx="2"/>
</svg>"""

# Wood stack
wood_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="80" r="15" fill="#a1887f" stroke="#5d4037" stroke-width="3"/>
  <circle cx="20" cy="80" r="15" fill="#a1887f" stroke="#5d4037" stroke-width="3"/>
  <circle cx="80" cy="80" r="15" fill="#a1887f" stroke="#5d4037" stroke-width="3"/>
  <circle cx="35" cy="55" r="15" fill="#a1887f" stroke="#5d4037" stroke-width="3"/>
  <circle cx="65" cy="55" r="15" fill="#a1887f" stroke="#5d4037" stroke-width="3"/>
  <circle cx="50" cy="30" r="15" fill="#a1887f" stroke="#5d4037" stroke-width="3"/>
</svg>"""

save_svg('brick.svg', brick_svg)
save_svg('window.svg', window_svg)
save_svg('stove.svg', stove_svg)
save_svg('wood.svg', wood_svg)
print("Generated kitchen SVGs.")

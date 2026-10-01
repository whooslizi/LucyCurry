import os

def save_svg(filename, content):
    path = os.path.join('public', 'images', filename)
    with open(path, 'w') as f:
        f.write(content)

# Pot Curry
pot_curry_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M 10 40 L 90 40 L 80 80 Q 50 90 20 80 Z" fill="#424242" stroke="#212121" stroke-width="4"/>
  <ellipse cx="50" cy="40" rx="40" ry="10" fill="#ffb300"/>
  <path d="M 5 45 L 15 45 M 85 45 L 95 45" stroke="#212121" stroke-width="6"/>
</svg>"""

# Pot Udon
pot_udon_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M 15 40 L 85 40 L 75 80 Q 50 90 25 80 Z" fill="#212121" stroke="#000" stroke-width="4"/>
  <ellipse cx="50" cy="40" rx="35" ry="8" fill="#8d6e63"/>
  <path d="M 10 45 L 20 45 M 80 45 L 90 45" stroke="#000" stroke-width="6"/>
</svg>"""

# Notebook (Sổ tay)
notebook_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect x="20" y="10" width="60" height="80" fill="#fbc02d" stroke="#f57f17" stroke-width="4" rx="5"/>
  <rect x="15" y="15" width="10" height="70" fill="#3e2723"/>
  <line x1="35" y1="30" x2="70" y2="30" stroke="#f57f17" stroke-width="2"/>
  <line x1="35" y1="50" x2="70" y2="50" stroke="#f57f17" stroke-width="2"/>
  <line x1="35" y1="70" x2="60" y2="70" stroke="#f57f17" stroke-width="2"/>
</svg>"""

# Bell (Giao món)
bell_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M 50 20 Q 20 20 20 60 L 10 80 L 90 80 L 80 60 Q 80 20 50 20 Z" fill="#ffca28"/>
  <circle cx="50" cy="90" r="8" fill="#ffca28"/>
</svg>"""

# Trash (Đổ tô)
trash_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect x="25" y="30" width="50" height="60" fill="#e53935"/>
  <rect x="20" y="20" width="60" height="10" fill="#b71c1c"/>
  <rect x="40" y="10" width="20" height="10" fill="#b71c1c"/>
  <line x1="35" y1="40" x2="35" y2="80" stroke="#b71c1c" stroke-width="4"/>
  <line x1="50" y1="40" x2="50" y2="80" stroke="#b71c1c" stroke-width="4"/>
  <line x1="65" y1="40" x2="65" y2="80" stroke="#b71c1c" stroke-width="4"/>
</svg>"""

# Checkmark (Kiểm tra)
check_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M 20 50 L 40 70 L 80 20" fill="none" stroke="#4caf50" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>
</svg>"""

save_svg('pot_curry.svg', pot_curry_svg)
save_svg('pot_udon.svg', pot_udon_svg)
save_svg('notebook.svg', notebook_svg)
save_svg('bell.svg', bell_svg)
save_svg('trash.svg', trash_svg)
save_svg('check.svg', check_svg)

print("Generated new SVGs.")

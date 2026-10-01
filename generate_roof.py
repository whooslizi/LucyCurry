import os

def save_svg(filename, content):
    path = os.path.join('public', 'images', filename)
    with open(path, 'w') as f:
        f.write(content)

roof_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" preserveAspectRatio="none">
  <path d="M 0 40 L 50 0 L 100 40 Z" fill="#d32f2f"/>
  <rect x="0" y="35" width="100" height="5" fill="#b71c1c"/>
  <rect x="20" y="10" width="60" height="30" fill="#f44336"/>
</svg>"""

save_svg('roof.svg', roof_svg)
print("Generated roof.")

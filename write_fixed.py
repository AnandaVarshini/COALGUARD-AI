with open('index.html', 'w', encoding='utf-8') as f:
    f.write('<!doctype html>\n<html lang="en" class="dark">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Coal-Vault AI | Smart Coal Mine Governance</title>\n    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />\n  </head>\n  <body class="bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-black font-sans antialiased overflow-x-hidden min-h-screen">\n    <div id="root"></div>\n    <script type="module" src="/src/main.jsx"></script>\n  </body>\n</html>\n')

with open('src/index.css', 'w', encoding='utf-8') as f:
    f.write('@import "tailwindcss";\n\nbody {\n  background-color: #050811;\n  color: #e2e8f0;\n}\n\n.glass-panel {\n  background: rgba(13, 21, 38, 0.75);\n  backdrop-filter: blur(12px);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n}\n')

print('Success writing index.html and index.css')

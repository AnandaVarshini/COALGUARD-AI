import os

html_content = "<!doctype html>
<html lang=en class=dark>
  <head>
    <meta charset=UTF-8 />
    <meta name=viewport content=width=device-width, initial-scale=1.0 />
    <title>Coal-Vault AI | Smart Mine Governance & Compliance Monitoring System</title>
    <link rel=stylesheet href=https://unpkg.com/leaflet@1.9.4/dist/leaflet.css />
    <link rel=preconnect href=https://fonts.googleapis.com>
    <link rel=preconnect href=https://fonts.gstatic.com crossorigin>
    <link href=https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap rel=stylesheet>
  </head>
  <body class=bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-black font-sans antialiased overflow-x-hidden min-h-screen>
    <div id=root></div>
    <script type=module src=/src/main.jsx></script>
  </body>
</html>"

css_content = "@import tailwindcss;

@layer base {
  * {
    border-color: rgba(255, 255, 255, 0.1);
  }
  body {
    font-family: 'Inter', sans-serif;
    background-color: #050811;
    color: #e2e8f0;
    overflow-x: hidden;
  }
  h1, h2, h3, .font-tech {
    font-family: 'Chakra Petch', sans-serif;
  }
  code, pre, .font-mono {
    font-family: 'JetBrains Mono', monospace;
  }
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #090d16;
}
::-webkit-scrollbar-thumb {
  background: #253347;
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: #f59e0b;
}

/* Glassmorphism Styles */
.glass-panel {
  background: rgba(13, 21, 38, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.45);
}

/* Map Custom Styling */
.leaflet-container {
  width: 100%;
  height: 100%;
  background: #090e1a !important;
  font-family: 'Inter', sans-serif !important;
  border-radius: 0.75rem;
}

.leaflet-popup-content-wrapper {
  background: rgba(13, 21, 38, 0.95) !important;
  color: #e2e8f0 !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 0.75rem !important;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 8px 10px -6px rgba(0, 0, 0, 0.7) !important;
}

.leaflet-popup-tip {
  background: #0d1526 !important;
}

/* Custom Marker Pulsing Dots */
.custom-pin {
  display: flex;
  align-items: center;
  justify-content: center;
}"

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

with open('src/index.css', 'w', encoding='utf-8') as f:
    f.write(css_content)

print('Updated index.html and src/index.css')

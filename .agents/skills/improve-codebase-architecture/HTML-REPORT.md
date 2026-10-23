# Artron Architecture Review HTML Report Template

Self-contained HTML template using Tailwind CSS and Mermaid via CDN, formatted to match Artron's visual identity.

```html
<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Artron Architecture & Codebase Health Review</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        darkMode: 'class',
        theme: {
          extend: {
            colors: {
              brand: '#00A3FF',
              canvas: '#0B0E14',
              surface: '#121722',
              card: '#1A202C'
            }
          }
        }
      }
    </script>
    <script type="module">
      import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
      mermaid.initialize({ startOnLoad: true, theme: "dark", securityLevel: "loose" });
    </script>
    <style>
      body { background-color: #0B0E14; color: #F8FAFC; }
      .seam { stroke-dasharray: 4 4; }
      .leak { stroke: #EF4444; }
    </style>
  </head>
  <body class="min-h-screen p-6 md:p-12 font-sans antialiased">
    <div class="max-w-5xl mx-auto space-y-10">
      <!-- Header -->
      <header class="border-b border-white/10 pb-6 flex items-center justify-between">
        <div>
          <div class="flex items-center gap-3">
            <span class="w-3 h-3 rounded-full bg-[#00A3FF] animate-pulse"></span>
            <h1 class="text-2xl font-bold tracking-tight text-white">ARTRON Architecture Deepening Review</h1>
          </div>
          <p class="text-sm text-slate-400 mt-1">Autonomous Codebase Health & Deep Modules Audit</p>
        </div>
      </header>

      <!-- Top Recommendation -->
      <section class="bg-gradient-to-r from-blue-950/40 to-slate-900 border border-[#00A3FF]/30 rounded-xl p-6 shadow-xl">
        <span class="text-xs font-semibold uppercase tracking-wider text-[#00A3FF]">Top Recommendation</span>
        <h2 class="text-xl font-bold text-white mt-1">{{TOP_CANDIDATE_TITLE}}</h2>
        <p class="text-slate-300 text-sm mt-2 leading-relaxed">{{TOP_CANDIDATE_SUMMARY}}</p>
      </section>

      <!-- Candidates List -->
      <section id="candidates" class="space-y-8">
        {{CANDIDATE_CARDS}}
      </section>
    </div>
  </body>
</html>
```

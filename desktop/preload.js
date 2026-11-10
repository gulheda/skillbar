// Bridges the shared web UI to Electron: copy, shrink/expand, close, and a draggable title strip.
const { ipcRenderer } = require('electron');
const post = m => ipcRenderer.send('native', m);

try {
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: t => { post({ copy: String(t) }); return Promise.resolve(); } }
  });
} catch (e) {}

window.__setMini = on => document.documentElement.classList.toggle('mini', !!on);
const isMini = () => document.documentElement.classList.contains('mini');

document.addEventListener('DOMContentLoaded', () => {
  const st = document.createElement('style');
  st.textContent = `
    html, body { height: 100%; margin: 0; }
    body { padding: 0 !important; background: var(--win) !important; overflow: hidden; }
    .panel { max-width: none !important; height: calc(100% - 28px) !important; margin: 0 !important; border-radius: 0 !important; box-shadow: none !important; }
    #sb-strip { height: 28px; display: flex; align-items: center; gap: 8px; padding: 0 10px; background: var(--win); -webkit-app-region: drag; user-select: none; }
    #sb-strip button { -webkit-app-region: no-drag; width: 12px; height: 12px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; }
    #sb-strip .c { background: #FF5F57; } #sb-strip .m { background: #28C840; }
    #sb-strip button:hover { filter: brightness(.85); }
    #sb-strip span { flex: 1; text-align: center; font: 600 11px -apple-system, "Segoe UI", sans-serif; color: var(--ter); margin-right: 40px; }
    .body::-webkit-scrollbar { width: 8px; } .body::-webkit-scrollbar-thumb { background: var(--sep); border-radius: 4px; } .body::-webkit-scrollbar-track { background: transparent; }
    html.mini .body, html.mini .foot { display: none !important; }
    html.mini .panel { grid-template-rows: auto !important; }
    html.mini .top { border-bottom: 0 !important; }`;
  document.head.appendChild(st);
  const strip = document.createElement('div');
  strip.id = 'sb-strip';
  strip.innerHTML = '<button class="c" title="Close" aria-label="Close"></button><button class="m" title="Shrink / expand" aria-label="Shrink or expand"></button><span>Skillbar</span>';
  document.body.prepend(strip);
  strip.querySelector('.c').addEventListener('click', () => post({ close: true }));
  strip.querySelector('.m').addEventListener('click', () => post(isMini() ? { expand: true } : { mini: true }));
});

document.addEventListener('mousedown', e => { if (isMini() && !e.target.closest('#sb-strip')) post({ expand: true }); }, true);
document.addEventListener('input', () => { if (isMini()) post({ expand: true }); }, true);
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  const b = document.getElementById('back'), q = document.getElementById('q');
  if (b && b.hidden && q && !q.hidden && !q.value) { e.preventDefault(); e.stopImmediatePropagation(); post({ mini: true }); }
}, true);

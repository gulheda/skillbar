// Skillbar for Windows, Linux and macOS (Electron).
// Same UI as the native macOS app: a small widget that remembers where you put it,
// shrinks to a search bar when you click away, and opens with Alt+Shift+Space.

const { app, BrowserWindow, Tray, Menu, globalShortcut, ipcMain, clipboard, shell, screen, nativeImage } = require('electron');
const path = require('path');
const fs = require('fs');

const HOTKEY = 'Alt+Shift+Space';
const STRIP = 28;
const BAR = 48;
const MINI_H = STRIP + BAR;

if (!app.requestSingleInstanceLock()) { app.quit(); }

let win, tray, mini = false, applying = false, quitting = false;
const stateFile = () => path.join(app.getPath('userData'), 'state.json');
let state = { w: 420, h: 460, x: null, top: null, onTop: false };
try { state = { ...state, ...JSON.parse(fs.readFileSync(stateFile(), 'utf8')) }; } catch (e) {}
const save = () => { try { fs.writeFileSync(stateFile(), JSON.stringify(state)); } catch (e) {} };

function defaultPos() {
  const a = screen.getPrimaryDisplay().workArea;
  return { x: a.x + a.width - state.w - 24, top: a.y + 24 };
}

function create() {
  const pos = state.x == null ? defaultPos() : { x: state.x, top: state.top };
  win = new BrowserWindow({
    x: Math.round(pos.x), y: Math.round(pos.top), width: state.w, height: state.h,
    minWidth: 340, minHeight: 300,
    frame: false, show: false, skipTaskbar: true, alwaysOnTop: state.onTop,
    backgroundColor: '#00000000', transparent: false, hasShadow: true,
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: false, nodeIntegration: false, sandbox: false }
  });
  win.setVisibleOnAllWorkspaces(true);
  win.loadFile(path.join(__dirname, 'web', 'index.html'));
  win.once('ready-to-show', () => show());

  win.on('blur', () => setMini(true));
  win.on('focus', () => {});
  const remember = () => {
    if (applying || !win) return;
    const b = win.getBounds();
    state.x = b.x; state.top = b.y; state.w = b.width;
    if (!mini) state.h = b.height;
    save();
  };
  win.on('moved', remember);
  win.on('resized', remember);
  win.on('close', e => { if (!quitting) { e.preventDefault(); win.hide(); } });

  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, url) => { if (/^https?:/i.test(url)) { e.preventDefault(); shell.openExternal(url); } });
}

function setMini(on) {
  if (!win || on === mini) return;
  mini = on;
  const b = win.getBounds();
  applying = true;
  if (on) {
    win.webContents.executeJavaScript('window.__setMini && window.__setMini(true)').catch(() => {});
    win.setMinimumSize(340, MINI_H);
    win.setBounds({ x: b.x, y: b.y, width: b.width, height: MINI_H });
    win.setResizable(false);
  } else {
    win.setResizable(true);
    win.setMinimumSize(340, 300);
    win.setBounds({ x: b.x, y: b.y, width: b.width, height: state.h });
    win.webContents.executeJavaScript('window.__setMini && window.__setMini(false)').catch(() => {});
  }
  setTimeout(() => { applying = false; }, 50);
}

function show() {
  if (!win) return;
  win.show();
  win.focus();
  setMini(false);
  win.webContents.executeJavaScript("(function(){var q=document.getElementById('q'); if(q && !q.hidden){q.focus(); q.select();}})()").catch(() => {});
}

function toggle() {
  if (!win.isVisible() || mini || !win.isFocused()) show();
  else win.hide();
}

function buildTray() {
  const icon = nativeImage.createFromPath(path.join(__dirname, process.platform === 'darwin' ? 'tray-16.png' : 'tray.png'));
  if (process.platform === 'darwin') icon.setTemplateImage(true);
  tray = new Tray(icon.resize({ width: 16, height: 16 }));
  tray.setToolTip(`Skillbar (${HOTKEY})`);
  const menu = () => Menu.buildFromTemplate([
    { label: `Open (${HOTKEY})`, click: show },
    { label: 'Keep above other windows', type: 'checkbox', checked: state.onTop, click: i => { state.onTop = i.checked; win.setAlwaysOnTop(i.checked); save(); } },
    { label: 'Reset position', click: () => { const p = defaultPos(); state = { ...state, w: 420, h: 460, x: p.x, top: p.top }; save(); mini = false; applying = true; win.setResizable(true); win.setMinimumSize(340, 300); win.setBounds({ x: p.x, y: p.top, width: 420, height: 460 }); applying = false; win.webContents.executeJavaScript('window.__setMini && window.__setMini(false)').catch(() => {}); show(); } },
    { type: 'separator' },
    { label: 'Quit', click: () => { quitting = true; app.quit(); } }
  ]);
  tray.on('click', toggle);
  tray.on('right-click', () => tray.popUpContextMenu(menu()));
  if (process.platform === 'linux') tray.setContextMenu(menu());
}

ipcMain.on('native', (_e, m) => {
  if (!m) return;
  if (typeof m.copy === 'string') clipboard.writeText(m.copy);
  if (m.mini) setMini(true);
  if (m.expand) setMini(false);
  if (m.close) win.hide();
});

app.on('second-instance', show);
app.whenReady().then(() => {
  if (process.platform === 'darwin') app.dock.hide();
  create();
  buildTray();
  if (!globalShortcut.register(HOTKEY, toggle)) console.warn(`Could not register ${HOTKEY}; use the tray icon.`);
});
app.on('will-quit', () => globalShortcut.unregisterAll());
app.on('window-all-closed', e => e.preventDefault());

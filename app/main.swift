// Skillbar: a desktop widget and launcher for your Claude Code skills.
// - Drag it by the top strip; position and size are remembered.
// - Click elsewhere and it shrinks to a one-line search bar; click to expand.
// - Red closes it; ⌥⇧Space or the menu bar icon brings it back.
// To change the hotkey, edit the two lines below and run build.sh again.

import Cocoa
import WebKit
import Carbon.HIToolbox

let HOTKEY_CODE = UInt32(kVK_Space)
let HOTKEY_MODS = UInt32(optionKey | shiftKey)   // ⌥ ⇧ Space
let HOTKEY_LABEL = "⌥⇧Space"

let STRIP: CGFloat = 28      // drag strip (traffic lights live here)
let BAR: CGFloat = 48        // search bar height
let MINI_H = STRIP + BAR

let bridgeJS = """
(function () {
  var post = function (m) { window.webkit.messageHandlers.native.postMessage(m); };
  try {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: function (t) { post({ copy: String(t) }); return Promise.resolve(); } }
    });
  } catch (e) {}
  window.__setMini = function (on) { document.documentElement.classList.toggle('mini', !!on); };
  document.addEventListener('DOMContentLoaded', function () {
    var st = document.createElement('style');
    st.textContent = 'html.mini .body, html.mini .foot { display: none !important; } html.mini .panel { grid-template-rows: auto !important; } html.mini .top { border-bottom: 0 !important; }';
    document.head.appendChild(st);
  });
  var isMini = function () { return document.documentElement.classList.contains('mini'); };
  document.addEventListener('mousedown', function () { if (isMini()) post({ expand: true }); }, true);
  document.addEventListener('input', function () { if (isMini()) post({ expand: true }); }, true);
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var b = document.getElementById('back'), q = document.getElementById('q');
    if (b && b.hidden && q && !q.hidden && !q.value) {
      e.preventDefault();
      e.stopImmediatePropagation();
      post({ mini: true });
    }
  }, true);
})();
"""

final class AppDelegate: NSObject, NSApplicationDelegate, NSWindowDelegate, WKScriptMessageHandler, WKUIDelegate, WKNavigationDelegate {
    var win: NSWindow!
    var web: WKWebView!
    var statusItem: NSStatusItem!
    var hotKeyRef: EventHotKeyRef?
    var mini = false
    var applying = false
    let defaults = UserDefaults.standard

    var expandedHeight: CGFloat {
        get { let h = defaults.double(forKey: "h"); return h > 0 ? CGFloat(h) : 460 }
        set { defaults.set(Double(newValue), forKey: "h") }
    }
    var onTop: Bool {
        get { defaults.bool(forKey: "onTop") }
        set { defaults.set(newValue, forKey: "onTop") }
    }

    func applicationDidFinishLaunching(_ notification: Notification) {
        buildMainMenu()
        buildWindow()
        buildStatusItem()
        registerHotKey()
        show()
    }

    func buildMainMenu() {
        let main = NSMenu()
        let appItem = NSMenuItem(); main.addItem(appItem)
        let appMenu = NSMenu()
        appMenu.addItem(withTitle: "Close", action: #selector(closePanel), keyEquivalent: "w")
        appMenu.addItem(withTitle: "Quit", action: #selector(NSApplication.terminate(_:)), keyEquivalent: "q")
        appItem.submenu = appMenu
        let editItem = NSMenuItem(); main.addItem(editItem)
        let edit = NSMenu(title: "Edit")
        edit.addItem(withTitle: "Undo", action: Selector(("undo:")), keyEquivalent: "z")
        edit.addItem(withTitle: "Cut", action: #selector(NSText.cut(_:)), keyEquivalent: "x")
        edit.addItem(withTitle: "Copy", action: #selector(NSText.copy(_:)), keyEquivalent: "c")
        edit.addItem(withTitle: "Paste", action: #selector(NSText.paste(_:)), keyEquivalent: "v")
        edit.addItem(withTitle: "Select All", action: #selector(NSText.selectAll(_:)), keyEquivalent: "a")
        editItem.submenu = edit
        NSApp.mainMenu = main
    }

    func buildWindow() {
        win = NSWindow(contentRect: NSRect(x: 0, y: 0, width: 420, height: expandedHeight),
                       styleMask: [.titled, .closable, .resizable, .fullSizeContentView],
                       backing: .buffered, defer: false)
        win.titleVisibility = .hidden
        win.titlebarAppearsTransparent = true
        win.isMovableByWindowBackground = true
        win.standardWindowButton(.miniaturizeButton)?.isHidden = true
        if let z = win.standardWindowButton(.zoomButton) {
            z.target = self
            z.action = #selector(toggleMiniButton)
            z.toolTip = "Shrink / expand"
        }
        // .stationary: Show Desktop / Mission Control leave the window in place, like a widget.
        win.collectionBehavior = [.canJoinAllSpaces, .stationary, .ignoresCycle, .fullScreenAuxiliary]
        win.isReleasedWhenClosed = false
        win.level = restLevel
        win.minSize = NSSize(width: 340, height: 300)
        win.delegate = self
        win.backgroundColor = NSColor(name: nil) { ap in
            ap.bestMatch(from: [.darkAqua, .aqua]) == .darkAqua
                ? NSColor(srgbRed: 0x23/255, green: 0x23/255, blue: 0x25/255, alpha: 1)
                : .white
        }

        let container = NSView(frame: NSRect(x: 0, y: 0, width: 420, height: expandedHeight))
        container.autoresizingMask = [.width, .height]

        let content = WKUserContentController()
        content.addUserScript(WKUserScript(source: bridgeJS, injectionTime: .atDocumentStart, forMainFrameOnly: true))
        content.add(self, name: "native")
        let config = WKWebViewConfiguration()
        config.userContentController = content
        config.websiteDataStore = WKWebsiteDataStore.default()

        var f = container.bounds; f.size.height -= STRIP
        web = WKWebView(frame: f, configuration: config)
        web.autoresizingMask = [.width, .height]
        web.uiDelegate = self
        web.navigationDelegate = self
        web.setValue(false, forKey: "drawsBackground")
        container.addSubview(web)
        win.contentView = container

        if let url = Bundle.main.url(forResource: "index", withExtension: "html") {
            web.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        }

        // Saved position, or the top right of the screen.
        let screen = NSScreen.main ?? NSScreen.screens[0]
        let area = screen.visibleFrame
        let w = defaults.double(forKey: "w") > 0 ? CGFloat(defaults.double(forKey: "w")) : 420
        let x = defaults.object(forKey: "x") != nil ? CGFloat(defaults.double(forKey: "x")) : area.maxX - w - 24
        let top = defaults.object(forKey: "top") != nil ? CGFloat(defaults.double(forKey: "top")) : area.maxY - 24
        applying = true
        win.setFrame(NSRect(x: x, y: top - expandedHeight, width: w, height: expandedHeight), display: false)
        applying = false
        placeGreen()
    }

    func buildStatusItem() {
        statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.squareLength)
        if let b = statusItem.button {
            let img = NSImage(systemSymbolName: "wrench.and.screwdriver", accessibilityDescription: "Skillbar")
            img?.isTemplate = true
            b.image = img
            b.toolTip = "Skillbar (\(HOTKEY_LABEL))"
            b.target = self
            b.action = #selector(statusClicked(_:))
            b.sendAction(on: [.leftMouseUp, .rightMouseUp])
        }
    }

    @objc func statusClicked(_ sender: Any?) {
        let e = NSApp.currentEvent
        if e?.type == .rightMouseUp || e?.modifierFlags.contains(.control) == true {
            let menu = NSMenu()
            let open = NSMenuItem(title: "Open (\(HOTKEY_LABEL))", action: #selector(showPanel), keyEquivalent: ""); open.target = self
            let top = NSMenuItem(title: "Keep above other windows", action: #selector(toggleOnTop), keyEquivalent: ""); top.target = self
            top.state = onTop ? .on : .off
            let reset = NSMenuItem(title: "Reset position", action: #selector(resetPosition), keyEquivalent: ""); reset.target = self
            let quit = NSMenuItem(title: "Quit", action: #selector(NSApplication.terminate(_:)), keyEquivalent: ""); quit.target = NSApp
            [open, top, reset, .separator(), quit].forEach { menu.addItem($0) }
            statusItem.menu = menu
            statusItem.button?.performClick(nil)
            statusItem.menu = nil
        } else {
            toggle()
        }
    }

    // When idle it sits on the desktop, just above the icons and behind other windows.
    var restLevel: NSWindow.Level {
        onTop ? .floating : NSWindow.Level(rawValue: Int(CGWindowLevelForKey(.desktopIconWindow)) + 1)
    }
    @objc func toggleOnTop() { onTop.toggle(); win.level = win.isKeyWindow ? .floating : restLevel }
    @objc func resetPosition() {
        ["x", "top", "w", "h"].forEach { defaults.removeObject(forKey: $0) }
        let area = (NSScreen.main ?? NSScreen.screens[0]).visibleFrame
        mini = false; setMiniInPage(false)
        applying = true
        win.setFrame(NSRect(x: area.maxX - 444, y: area.maxY - 24 - 460, width: 420, height: 460), display: true, animate: true)
        applying = false
        show()
    }

    func registerHotKey() {
        var type = EventTypeSpec(eventClass: OSType(kEventClassKeyboard), eventKind: UInt32(kEventHotKeyPressed))
        let me = Unmanaged.passUnretained(self).toOpaque()
        _ = InstallEventHandler(GetApplicationEventTarget(), { _, _, data in
            guard let data = data else { return noErr }
            let d = Unmanaged<AppDelegate>.fromOpaque(data).takeUnretainedValue()
            DispatchQueue.main.async { d.toggle() }
            return noErr
        }, 1, &type, me, nil)
        _ = RegisterEventHotKey(HOTKEY_CODE, HOTKEY_MODS, EventHotKeyID(signature: OSType(0x414C4554), id: 1), GetApplicationEventTarget(), 0, &hotKeyRef)
    }

    @objc func toggleMiniButton() { if mini { show() } else { setMini(true) } }

    // Move the green button right next to the red one (where yellow would be).
    func placeGreen() {
        guard let y = win.standardWindowButton(.miniaturizeButton),
              let g = win.standardWindowButton(.zoomButton) else { return }
        g.setFrameOrigin(y.frame.origin)
    }
    func windowDidResize(_ n: Notification) { placeGreen() }
    func windowDidBecomeKey(_ n: Notification) { placeGreen(); win.level = .floating }

    @objc func showPanel() { show() }
    @objc func closePanel() { win.orderOut(nil) }

    // Hotkey: open if closed, expand if collapsed, close if open and in front.
    func toggle() {
        if !win.isVisible { show() }
        else if mini || !win.isKeyWindow { show() }
        else { win.orderOut(nil) }
    }

    func show() {
        win.level = .floating
        NSApp.activate(ignoringOtherApps: true)
        win.makeKeyAndOrderFront(nil)
        setMini(false)
        win.makeFirstResponder(web)
        web.evaluateJavaScript("(function(){var q=document.getElementById('q'); if(q && !q.hidden){q.focus(); q.select();}})()", completionHandler: nil)
    }

    func setMiniInPage(_ on: Bool) { web.evaluateJavaScript("window.__setMini && window.__setMini(\(on))", completionHandler: nil) }

    // Shrink / expand while keeping the top edge fixed.
    func setMini(_ on: Bool) {
        guard on != mini else { return }
        mini = on
        let f = win.frame
        let h = on ? MINI_H : expandedHeight
        if on { setMiniInPage(true) }
        win.minSize = NSSize(width: 340, height: on ? MINI_H : 300)
        win.maxSize = NSSize(width: 10000, height: on ? MINI_H : 10000)
        applying = true
        win.setFrame(NSRect(x: f.minX, y: f.maxY - h, width: f.width, height: h), display: true, animate: true)
        applying = false
        if !on { setMiniInPage(false) }
        placeGreen()
    }

    func saveFrame() {
        guard !applying else { return }
        let f = win.frame
        defaults.set(Double(f.minX), forKey: "x")
        defaults.set(Double(f.maxY), forKey: "top")
        defaults.set(Double(f.width), forKey: "w")
        if !mini { expandedHeight = f.height }
    }

    func windowDidMove(_ n: Notification) { saveFrame() }
    func windowDidEndLiveResize(_ n: Notification) { saveFrame() }
    func windowDidResignKey(_ n: Notification) { setMini(true); win.level = restLevel }
    func windowShouldClose(_ sender: NSWindow) -> Bool { win.orderOut(nil); return false }

    func userContentController(_ c: WKUserContentController, didReceive message: WKScriptMessage) {
        guard let body = message.body as? [String: Any] else { return }
        if let text = body["copy"] as? String {
            NSPasteboard.general.clearContents()
            NSPasteboard.general.setString(text, forType: .string)
        }
        if body["mini"] != nil { setMini(true) }
        if body["expand"] != nil { setMini(false) }
    }

    func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for action: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
        if let url = action.request.url { NSWorkspace.shared.open(url) }
        return nil
    }

    func webView(_ webView: WKWebView, decidePolicyFor action: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        if let url = action.request.url, let s = url.scheme?.lowercased(), s == "http" || s == "https" {
            NSWorkspace.shared.open(url); decisionHandler(.cancel); return
        }
        decisionHandler(.allow)
    }
}

let app = NSApplication.shared
let appDelegate = AppDelegate()
app.delegate = appDelegate
app.setActivationPolicy(.accessory)
app.run()

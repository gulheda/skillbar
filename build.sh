#!/bin/bash
# Builds Skillbar and installs it to ~/Applications.
set -euo pipefail
cd "$(dirname "$0")/app"

APP="$HOME/Applications/Skillbar.app"
BUILD="$(mktemp -d)"

if ! command -v swiftc >/dev/null 2>&1; then
  echo "Swift compiler not found. Run this, then run build.sh again:"
  echo "  xcode-select --install"
  exit 1
fi

echo "→ Compiling..."
swiftc -O -swift-version 5 main.swift -o "$BUILD/Skillbar" \
  -framework Cocoa -framework WebKit -framework Carbon

echo "→ Making the icon..."
ICON_OK=0
if swift icon.swift "$BUILD/icon.png" >/dev/null 2>&1; then
  mkdir -p "$BUILD/AppIcon.iconset"
  for s in 16 32 128 256 512; do
    sips -z "$s" "$s" "$BUILD/icon.png" --out "$BUILD/AppIcon.iconset/icon_${s}x${s}.png" >/dev/null
    d=$((s * 2))
    sips -z "$d" "$d" "$BUILD/icon.png" --out "$BUILD/AppIcon.iconset/icon_${s}x${s}@2x.png" >/dev/null
  done
  iconutil -c icns "$BUILD/AppIcon.iconset" -o "$BUILD/AppIcon.icns" && ICON_OK=1
fi

echo "→ Installing to $APP"
pkill -x Skillbar 2>/dev/null || true
mkdir -p "$HOME/Applications"
rm -rf "$APP"
mkdir -p "$APP/Contents/MacOS" "$APP/Contents/Resources"
cp "$BUILD/Skillbar" "$APP/Contents/MacOS/Skillbar"
cp Info.plist "$APP/Contents/Info.plist"
cp index.html skills.js "$APP/Contents/Resources/"
[ "$ICON_OK" = 1 ] && cp "$BUILD/AppIcon.icns" "$APP/Contents/Resources/AppIcon.icns"
codesign --force --deep -s - "$APP" >/dev/null 2>&1 || true

open "$APP"
echo ""
echo "✓ Done. Press ⌥ ⇧ Space anywhere, or click the menu bar icon."

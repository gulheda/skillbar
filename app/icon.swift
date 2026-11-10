// Draws the app icon: a white "/" on a dark rounded square.
import AppKit

let canvas: CGFloat = 1024
let image = NSImage(size: NSSize(width: canvas, height: canvas))
image.lockFocus()

let tile = NSBezierPath(roundedRect: NSRect(x: 100, y: 100, width: 824, height: 824), xRadius: 185, yRadius: 185)
NSColor(calibratedRed: 0.11, green: 0.11, blue: 0.12, alpha: 1).setFill()
tile.fill()

let slash = NSBezierPath()
slash.lineWidth = 80
slash.lineCapStyle = .round
slash.move(to: NSPoint(x: 590, y: 704))
slash.line(to: NSPoint(x: 434, y: 320))
NSColor.white.setStroke()
slash.stroke()

let dot = NSBezierPath(ovalIn: NSRect(x: 640, y: 300, width: 64, height: 64))
NSColor(calibratedRed: 0.04, green: 0.52, blue: 1.0, alpha: 1).setFill()
dot.fill()

image.unlockFocus()

guard let tiff = image.tiffRepresentation,
      let bitmap = NSBitmapImageRep(data: tiff),
      let png = bitmap.representation(using: .png, properties: [:]) else {
    exit(1)
}
do {
    try png.write(to: URL(fileURLWithPath: CommandLine.arguments[1]))
} catch {
    exit(1)
}

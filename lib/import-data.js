module.exports = function loadSave ({ canvas, blobUrl }) {
  const data = [{
    left: 332.24,
    top: 329.54,
    scaleX: 0.37,
    scaleY: 0.37,
    angle: 325.58,
    blob: '&6thhZj5FPAhcVlTD9qbRiLZlc0subH6tX62q7kXqddc=.sha256'
  }, {
    left: 249,
    top: 511.67,
    scaleX: 0.26,
    scaleY: 0.26,
    angle: 0,
    blob: '&6thhZj5FPAhcVlTD9qbRiLZlc0subH6tX62q7kXqddc=.sha256'
  }, {
    left: 196.42,
    top: 405.06,
    scaleX: 0.14,
    scaleY: 0.14,
    angle: 28.34,
    blob: '&6thhZj5FPAhcVlTD9qbRiLZlc0subH6tX62q7kXqddc=.sha256'
  }]

  data.forEach(d => {
    const { left, top, scaleX, scaleY, angle, blob } = d

    canvas.fabric.Image.fromURL(
      blobUrl(blob),
      img => {
        img.scale(scaleX)
        // img.scale(scaleY)
        canvas.add(img)
      },
      { left, top, angle }
    )
  })
}

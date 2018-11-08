const config = require('../config')

module.exports = function addImage ({ canvas, blobUrl }) {
  return function (blobId) {
    canvas.fabric.Image.fromURL(
      blobUrl(blobId),
      img => {
        const scaleFactor = img.height > config.max_initial_height
          ? config.max_initial_height / img.height
          : 1

        img.scale(scaleFactor)
        canvas.add(img)
      },
      { left: config.width / 2 - 100, top: config.height / 3 - config.max_initial_height / 2 }
    )
  }
}

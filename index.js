const html = require('yo-yo')
const { fabric } = require('fabric')
const pick = require('lodash.pick')

const HEIGHT = 800
const WIDTH = 1000

const MAX_INITIAL_IMG_HEIGHT = 300

const App = html`
  <div className="App" style="background: black;">
    <canvas id="c" height="${HEIGHT}" width="${WIDTH}" ></canvas>
    <button onclick=${addImage}>Add Image</button>
    <button onclick=${exportData}>Export Data</button>
    <button onclick=${loadSave}>Load Save</button>
  </div>
`
document.body.appendChild(App)

const canvas = new fabric.Canvas('c')

function addImage () {
  const blobId = '&QT5YAIrMuMeCYYT1ncJtDMJ09Br9yl3M6+Xb5PERWgU=.sha256'

  fabric.Image.fromURL(
    blobUrl(blobId),
    img => {
      const scaleFactor = img.height > MAX_INITIAL_IMG_HEIGHT
        ? MAX_INITIAL_IMG_HEIGHT / img.height
        : 1

      img.scale(scaleFactor)
      canvas.add(img)
    },
    { left: WIDTH / 2 - 100, top: HEIGHT / 3 - MAX_INITIAL_IMG_HEIGHT / 2 }
  )
}

function exportData () {
  const data = canvas.toObject().objects
    .map(obj => {
      const _obj = pick(obj, ['src', 'left', 'top', 'scaleX', 'scaleY', 'angle'])
      _obj.blob = getBlobId(_obj.src)
      delete _obj.src
      return _obj
    })
  console.log(JSON.stringify(data, null, 2))
}

function loadSave () {
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

    fabric.Image.fromURL(
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

function blobUrl (blobId) {
  return 'http://localhost:8989/blobs/get/' + blobId
}

function getBlobId (url) {
  return url.replace('http://localhost:8989/blobs/get/', '')
}

// - export state
//   - blob, xy-position, scale, angle
// - import state
// - diff states

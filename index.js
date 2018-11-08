const html = require('yo-yo')
const { fabric } = require('fabric')
const Connection = require('ssb-client')

const config = require('./config')
const exportData = require('./lib/export-data')
const addImage = require('./lib/add-image')
const importData = require('./lib/import-data')

const blobId = '&QT5YAIrMuMeCYYT1ncJtDMJ09Br9yl3M6+Xb5PERWgU=.sha256'

Connection((err, server) => {
  if (err) throw err

  document.body.appendChild(BlobParty())
  document.body.style.background = 'black'
})

function BlobParty () {
  var canvas
  const blobParty = html`
    <div className="BlobParty">
      <canvas id="c" height="${config.height}" width="${config.width}"></canvas>
      <button onclick=${() => addImage({ canvas, blobUrl })(blobId)}>Add Image</button>
      <button onclick=${() => exportData(canvas)}>Export Data</button>
      <button onclick=${() => importData({ canvas, blobUrl })}>Load Save</button>
    </div>
  `

  setCanvas()
  return blobParty
  function setCanvas () {
    if (!blobParty.isConnected) return setTimeout(setCanvas, 200)
    canvas = new fabric.Canvas('c')
    canvas.fabric = fabric
  }
}

function blobUrl (blobId) {
  return 'http://localhost:8989/blobs/get/' + blobId
}

//
// - export state
//   - blob, xy-position, scale, angle
//   -format
//     - canvas state: background, size
//     - obejects
// - import state
// - diff states

// function toSuggestion (value, key) {
//   const topPick = value[0]
//   // TODO get a better topPick (filter by user, frequency etc?)
//   //
//   // return {
//   //   image: api.blob.sync.url(key),
//   //   title: topPick.name,
//   //   // subtitle: topPick.name,
//   //   value: '![' + topPick.name + '](' + key + ')'
//   // }
//   //
//   return {
//     // image:
//     title: h('img.meme', { src: api.blob.sync.url(key) }),
//     subtitle: topPick.name,
//     value: '![' + topPick.name + '](' + key + ')'
//   }
/* } */

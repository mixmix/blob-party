const html = require('yo-yo')
const { fabric } = require('fabric')
const Connection = require('ssb-client')
const map = require('lodash.map')
const suggestify = require('suggest-box')
const onload = require('on-load')

const config = require('./config')
const exportData = require('./lib/export-data')
const addImage = require('./lib/add-image')
const importData = require('./lib/import-data')
const css = require('./styles')

const blobId = '&QT5YAIrMuMeCYYT1ncJtDMJ09Br9yl3M6+Xb5PERWgU=.sha256'

document.head.appendChild(html`
  <style>${css}</style>
`)

Connection((err, server) => {
  if (err) throw err

  document.body.appendChild(BlobParty(server))
  document.body.style.background = 'black'
})

function BlobParty (server) {
  var canvas

  const blobParty = html`
    <div className="BlobParty">
      <canvas id="c" height="${config.height}" width="${config.width}"></canvas>
      <button onclick=${() => addImage({ canvas, blobUrl })(blobId)}>Add Image</button>
      <button onclick=${() => exportData(canvas)}>Export Data</button>
      <button onclick=${() => importData({ canvas, blobUrl })}>Load Save</button>
    </div>
  `
  onload(blobParty, () => {
    canvas = new fabric.Canvas('c')
    canvas.fabric = fabric

    blobParty.appendChild(Search(server, canvas))
  })

  return blobParty
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

function Search (server, canvas) {
  const input = html`
    <input ></input>
  `
  onload(input, () => {
    suggestify(input, suggestBlob(server), { cls: 'PatchSuggest' })
    input.addEventListener('suggestselect', ev => {
      addImage({ canvas, blobUrl })(ev.detail.value)
      input.value = ''
    })
  })

  return input
}

function suggestBlob (server) {
  return function (word, cb) {
    if (word.length < 3) return
    // TODO suggest a random 10?

    word = word.toLowerCase()

    server.meme.search(word, (err, data) => {
      if (err) return console.error(err)

      cb(null, map(data, toSuggestion))
    })
  }
}

function toSuggestion (value, key) {
  const topPick = value[0]
  // TODO get a better topPick (filter by user, frequency etc?)
  //
  // return {
  //   image: api.blob.sync.url(key),
  //   title: topPick.name,
  //   // subtitle: topPick.name,
  //   value: '![' + topPick.name + '](' + key + ')'
  // }
  //
  return {
    // image:
    title: html`
      <img class='meme' src='${blobUrl(key)}' />
    `,
    subtitle: topPick.name,
    // value: '![' + topPick.name + '](' + key + ')'
    value: key
  }
}

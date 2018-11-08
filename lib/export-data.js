const pick = require('lodash.pick')

module.exports = function exportData (canvas) {
  const data = canvas.toObject().objects
    .map(obj => {
      const _obj = pick(obj, ['src', 'left', 'top', 'scaleX', 'scaleY', 'angle'])
      _obj.blob = getBlobId(_obj.src)
      delete _obj.src
      return _obj
    })
  console.log(JSON.stringify(data, null, 2))
}

function getBlobId (url) {
  return url.replace('http://localhost:8989/blobs/get/', '')
}


const util = require('util')
const fs = require('fs')
const path = require('path')

module.exports = require('express').Router()

// defunct route; replaced by /roster-list
// .get('/roster/:name', (req, res) => {
//   fs.readFile(path.resolve(__dirname, '../rosters/' + req.params.name + '.html'), 'utf-8', (err, data) => {
//     if (err) {
//       console.error(err)
//       res.send(err)
//     } else {
//       res.send(data)
//     }
//   })
// })

// read and return all files in /rosters directory
.get('/roster-list', (req, res) => {
  let files
  util.promisify(fs.readdir)(path.resolve(__dirname, '../rosters'))
  .then(contents => {
    files = contents
    return Promise.all(contents.map(file => (
      util.promisify(fs.readFile)(path.resolve(__dirname, '../rosters/' + file), 'utf-8')
    )))
  })
  .then(rosters => {
    res.send(rosters.map((roster, index) => (
      {name: files[index].slice(0, -5), html: roster}
    )))
  })
  .catch(err => {
    console.error(err)
    res.send(err)
  })
})
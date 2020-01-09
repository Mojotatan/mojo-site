const fs = require('fs')
const path = require('path')

module.exports = require('express').Router()

.get('/roster/:name', (req, res) => {
  fs.readFile(path.resolve(__dirname, '../rosters/' + req.params.name + '.html'), 'utf-8', (err, data) => {
    if (err) {
      console.error(err)
      res.send(err)
    } else {
      res.send(data)
    }
  })
})
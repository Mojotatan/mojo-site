const fs = require('fs')

module.exports = require('express').Router()

.get('/roster/:name', (req, res) => {
  fs.readFile('./rosters/' + req.params.name + '.html', 'utf-8', (err, data) => {
    if (err) {
      console.error(err)
      res.send(err)
    } else {
      res.send(data)
    }
  })
})
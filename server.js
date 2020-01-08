const express = require('express')
const morgan = require('morgan')
// const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')

const port = 3000
const app = express()

app.use(morgan('tiny'))

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('dist'))

app.get('/roster/:name', (req, res) => {
  fs.readFile('./rosters/' + req.params.name + '.html', 'utf-8', (err, data) => {
    if (err) {
      console.error(err)
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist/index.html'))
})

app.listen(port, () => console.log(`Listening on port ${port}...`))
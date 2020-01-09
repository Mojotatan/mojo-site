const express = require('express')
const morgan = require('morgan')
// const bodyParser = require('body-parser')
const path = require('path')

const port = 3000
const app = express()

app.use(morgan('tiny'))

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('dist'))

app.use('/api', require('./api/index'))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist/index.html'))
})

app.listen(port, () => console.log(`Listening on port ${port}...`))
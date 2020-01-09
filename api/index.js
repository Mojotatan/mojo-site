const api = module.exports = require('express').Router()

api
  .use('/40k', require('./40k'))


api.use((req, res) => res.status(404).end())
const express = require('express')
const app = express()
const routes = require('./routes')
const { NOT_FOUND, INTERNAL_ERROR } = require('./utils/statusCode')
// const { INTERNAL_ERROR } = require('./utils/statusCode')

app.use('/artists', routes.artists)

app.use('/albums', routes.albums)

app.use('/musics', routes.musics)

app.all('*', (_req, res) => {
  res.status(NOT_FOUND).json({ message: 'Not Found' })
})

app.use((error, _req, res, _next) => {
  if (error.status) return res.status(error.status).json({ message: error.message })
  return res.status(INTERNAL_ERROR).json({ message: error.message })
})

app.listen(3001, () => console.log('RUY GOSTOSO'))

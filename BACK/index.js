const express = require('express')
const app = express()
const routes = require('./routes')

app.use('/artists', routes.artists)

app.use('/albums', routes.albums)

app.use('/musics', routes.musics)

app.listen(3001, () => console.log('RUY GOSTOSO'))

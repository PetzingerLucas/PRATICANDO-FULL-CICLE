const express = require('express')
const connection = require('../server')
const { SUCCESS } = require('../utils/statusCode')

const artistsRouter = express.Router()

const getArtists = async () => {
  const query = 'SELECT * FROM artists'
  const [artists] = await connection.execute(query)
  return artists
}

const getArtistsById = async (id) => {
  const query = 'SELECT * FROM artists WHERE artist_id = ?'
  const [artist] = await connection.execute(query, [id])
  return artist
}

artistsRouter.get('/', async (_req, res) => {
  const artists = await getArtists()
  res.status(SUCCESS).json(artists)
})

artistsRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const artists = await getArtistsById(+id)
  res.status(SUCCESS).json(artists)
})

module.exports = artistsRouter

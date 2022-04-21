const express = require('express')
const artistRouter = express.Router()
const connection = require('../server')

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

artistRouter.get('/', async (_req, res) => {
  const artists = await getArtists()
  res.status(200).json(artists)
})

artistRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const artists = await getArtistsById(+id)
  res.status(200).json(artists)
})

module.exports = artistRouter

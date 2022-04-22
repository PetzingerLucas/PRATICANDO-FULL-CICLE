const express = require('express')
const connection = require('../server')
const query = require('../utils/querys')
const { SUCCESS } = require('../utils/statusCode')

const artistsRouter = express.Router()

const getArtists = async () => {
  const [artists] = await connection.execute(query.getArtists)
  return artists
}

const getArtistsById = async (id) => {
  const [artist] = await connection.execute(query.getArtistsById, [id])
  return artist
}

artistsRouter.get('/', async (_req, res, next) => {
  try {
    const artists = await getArtists()
    return res.status(SUCCESS).json(artists)
  } catch (error) {
    next(error)
  }
})

artistsRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const artists = await getArtistsById(+id)
    res.status(SUCCESS).json(artists)
  } catch (error) {
    next(error)
  }
})

module.exports = artistsRouter

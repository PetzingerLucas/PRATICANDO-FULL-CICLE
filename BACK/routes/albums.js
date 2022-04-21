const connection = require('../server')
const express = require('express')

const albumsRouter = express.Router()

const getAlbums = async () => {
  const query = 'SELECT * FROM albums'
  const [albums] = await connection.execute(query)
  return albums
}

const getAlbumsById = async (id) => {
  const query = 'SELECT * FROM albums WHERE albums_id = ?'
  const [album] = await connection.execute(query, [id])
  return album
}

albumsRouter.get('/', async (_req, res) => {
  const albums = await getAlbums()
  res.status(200).json(albums)
})

albumsRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const album = await getAlbumsById(+id)
  res.status(200).json(album)
})

module.exports = albumsRouter

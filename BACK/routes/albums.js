const connection = require('../server')
const express = require('express')
const query = require('../utils/querys')
const helper = require('../helpers')

const albumsRouter = express.Router()

const pharseAlbuns = (albums) => {
  const albumsList = []
  const albumStructure = {}
  helper.createListMusicByAlbumId(albums, albumStructure)
  helper.setAlbumsToString(albums, albumsList)
  return helper.removePharsedDuplicateAlbums(albumsList, albumStructure)
}

const getAlbums = async () => {
  const [albums] = await connection.execute(query.getAlbums)
  return pharseAlbuns(albums)
}

const getAlbumsById = async (id) => {
  const [album] = await connection.execute(query.getAlbumsById, [id])
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

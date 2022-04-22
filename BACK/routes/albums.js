const connection = require('../server')
const express = require('express')
const query = require('../utils/querys')
const helper = require('../helpers')
const { SUCCESS } = require('../utils/statusCode')

const albumsRouter = express.Router()

const parseAlbuns = (albums) => {
  const albumsList = []
  const albumStructure = {}
  helper.createListMusicByAlbumId(albums, albumStructure)
  helper.setAlbumsToString(albums, albumsList)
  return helper.removePharsedDuplicateAlbums(albumsList, albumStructure)
}

const getAlbums = async () => {
  const [albums] = await connection.execute(query.getAlbums)
  return parseAlbuns(albums)
}

const getAlbumsById = async (id) => {
  const [album] = await connection.execute(query.getAlbumsById, [id])
  return album
}

albumsRouter.get('/', async (_req, res, next) => {
  try {
    const albums = await getAlbums()
    return res.status(SUCCESS).json(albums)
  } catch (error) {
    next(error)
  }
})

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const album = await getAlbumsById(+id)
    return res.status(SUCCESS).json(album)
  } catch (error) {
    next(error)
  }
})

module.exports = albumsRouter

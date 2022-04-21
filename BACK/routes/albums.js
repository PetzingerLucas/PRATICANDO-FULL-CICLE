const connection = require('../server')
const express = require('express')
const query = require('../utils/querys')

const albumsRouter = express.Router()

const parseAlbuns = (albums) => {
  const array = []
  const filteredAlbuns = albums.map((alb) => ({ id: alb.album_id, music: alb.music_name }))
  albums.forEach((a) => {
    delete a.music_name
    array.push(JSON.stringify(a))
  })
  const albumsObj = {}
  filteredAlbuns.forEach(e => {
    albumsObj[e.id] ? albumsObj[e.id] = [...albumsObj[e.id], e.music] : albumsObj[e.id] = [e.music]
  })

  const teste = [...new Set(array)].map((ab) => {
    const parse = JSON.parse(ab)
    parse.musics = albumsObj[parse.album_id]

    return parse
  })

  console.log(teste)
  return teste
}

const getAlbums = async () => {
  const [albums] = await connection.execute(query.getAlbums)
  parseAlbuns(albums)
  return albums
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

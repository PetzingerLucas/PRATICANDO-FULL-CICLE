const connection = require('../server')
const express = require('express')
const query = require('../utils/querys')
const { SUCCESS } = require('../utils/statusCode')
const musicsRouter = express.Router()

const getMusics = async () => {
  const [musics] = await connection.execute(query.getMusics)
  return musics
}

const getMusicsById = async (id) => {
  const [music] = await connection.execute(query.getMusicsById, [id])
  return music
}

musicsRouter.get('/', async (req, res) => {
  res.status(SUCCESS).json(await getMusics())
})

musicsRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  res.status(SUCCESS).json(await getMusicsById(+id))
})

module.exports = musicsRouter

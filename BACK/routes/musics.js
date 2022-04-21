const connection = require('../server')
const express = require('express')
const query = require('../utils/querys')
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
  res.status(200).json(await getMusics())
})

musicsRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  res.status(200).json(await getMusicsById(+id))
})

module.exports = musicsRouter

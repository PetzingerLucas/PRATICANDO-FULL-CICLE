const getMusicsByAlbumId = (albums) => {
  return albums.map((alb) => ({ id: alb.album_id, music: alb.music_name }))
}

const setAlbumsToString = (albums) => {
  const array = []
  albums.forEach((a) => {
    delete a.music_name
    array.push(JSON.stringify(a))
  })

  return array
}
const createListMusicByAlbumId = (albums) => {
  const albumsObj = {}
  getMusicsByAlbumId(albums).forEach(e => {
    albumsObj[e.id] ? albumsObj[e.id] = [...albumsObj[e.id], e.music] : albumsObj[e.id] = [e.music]
  })
  return albumsObj
}

const parseStringAlbuns = (result, albums) => {
  return result.map((ab) => {
    const parse = JSON.parse(ab)
    parse.musics = createListMusicByAlbumId(albums)[parse.album_id]
    return parse
  })
}

const removeDuplicateAlbums = (albums) => {
  const result = [...new Set(setAlbumsToString(albums))]
  return parseStringAlbuns(result, albums)
}

module.exports = {
  removeDuplicateAlbums,
  setAlbumsToString
}

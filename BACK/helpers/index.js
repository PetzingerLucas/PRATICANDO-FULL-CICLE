
const setAlbumsToString = (albums, array) => {
  albums.forEach((a) => {
    delete a.music_name
    array.push(JSON.stringify(a))
  })
}
const createListMusicByAlbumId = (albums, obj) => {
  albums
    .map((album) => ({ id: album.album_id, music: album.music_name }))
    .forEach(e => {
      obj[e.id] ? obj[e.id] = [...obj[e.id], e.music] : obj[e.id] = [e.music]
    })
}

const removePharsedDuplicateAlbums = (albumsList, albumStructure) => {
  return [...new Set(albumsList)]
    .map((ab) => {
      const parse = JSON.parse(ab)
      parse.musics = albumStructure[parse.album_id]

      return parse
    })
}

module.exports = {
  removePharsedDuplicateAlbums,
  setAlbumsToString,
  createListMusicByAlbumId
}

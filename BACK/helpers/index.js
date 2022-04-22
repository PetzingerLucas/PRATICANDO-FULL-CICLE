const setAlbumsToString = (albums, array) => {
  albums.forEach((album) => {
    delete album.music_name
    array.push(JSON.stringify(album))
  })
}

const createListMusicByAlbumId = (albums, obj) => {
  albums
    .map((album) => ({ id: album.album_id, music: album.music_name }))
    .forEach(listMusicByAlbumId => {
      obj[listMusicByAlbumId.id]
        ? obj[listMusicByAlbumId.id] = [...obj[listMusicByAlbumId.id], listMusicByAlbumId.music]
        : obj[listMusicByAlbumId.id] = [listMusicByAlbumId.music]
    })
}

const removePharsedDuplicateAlbums = (albumsList, albumStructure) => {
  return [...new Set(albumsList)]
    .map((album) => {
      const parse = JSON.parse(album)
      parse.musics = albumStructure[parse.album_id]

      return parse
    })
}

module.exports = {
  removePharsedDuplicateAlbums,
  setAlbumsToString,
  createListMusicByAlbumId
}

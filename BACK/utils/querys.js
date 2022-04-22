const getAlbums = `SELECT
ab.album_id,
ab.album_name,
ab.album_year,
ar.artist_name,
mu.music_name
FROM
albums AS ab
JOIN artists AS ar 
ON ab.artist_id = ar.artist_id
JOIN musics AS mu
ON mu.album_id = ab.album_id`

const getAlbumsById = `SELECT ab.album_id, ab.album_name, ab.album_year, ar.artist_name
FROM albums AS ab 
JOIN artists as ar 
ON ab.artist_id = ar.artist_id 
WHERE ab.album_id = ?`

const getMusics = `SELECT mu.music_id, mu.music_name,mu.music_duration,ab.album_name
FROM musics AS mu 
JOIN albums AS ab
ON mu.album_id = ab.album_id;`

const getMusicsById = `SELECT mu.music_id, mu.music_name,mu.music_duration,ab.album_name
FROM musics AS mu 
JOIN albums AS ab
ON mu.album_id = ab.album_id 
WHERE music_id = ?;`

const getArtists = 'SELECT * FROM artists'

const getArtistsById = 'SELECT * FROM artists WHERE artist_id = ?'

module.exports = {
  getAlbums,
  getAlbumsById,
  getMusics,
  getMusicsById,
  getArtistsById,
  getArtists

}

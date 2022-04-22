import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Albums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('http://localhost:3001/albums');
      setAlbums(data.sort((a, b) => a.album_name.localeCompare(b.album_name)));
    })();
  }, []);

  return (
    <div style={{ width: 'fit-content', margin: '0 auto' }}>
      {albums.map((album) => (
        <div key={album.album_id}>
          <h1>{album.album_name}</h1>
          <h3>{album.artist_name}</h3>
          {album.musics.map((m) => (
            <p key={m}>{m}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Albums;

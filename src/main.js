export const search = (query, type) =>
  fetch(`https://api.spotify.com/v1/search?query=${query}&type=${type}`)
    .then(res => res.json());



export const searchAlbums = () => {}
export const searchArtists = () => {}
export const searchTracks = () => {}
export const searchPlaylists = () => {}

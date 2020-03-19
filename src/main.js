export const search = (query, type) =>
  fetch(`https://api.spotify.com/v1/search?query=${query}&type=${type}`)
    .then(res => res.json());

export const searchArtists = (query) =>
  search(query, 'artist');

export const searchAlbums = (query) =>
  search(query, 'album');

export const searchTracks = (query) =>
  search(query, 'track');

export const searchPlaylists = (query) =>
  search(query, 'playlist');

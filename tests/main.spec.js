import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/main';
chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {
  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.resolves({ json: () => ({ album: 'name' }) });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke tests', () => {

    it('should exists the search method', () => {
      expect(search).to.be.exist;
    });

    it('should exists the searchAlbums method', () => {
      expect(searchAlbums).to.be.exist;
    });

    it('should exists the searchArtists method', () => {
      expect(searchArtists).to.be.exist;
    });

    it('should exists the searchTracks method', () => {
      expect(searchTracks).to.be.exist;
    });

    it('should exists the searchPlaylists method', () => {
      expect(searchPlaylists).to.be.exist;
    });

  });

  describe('Generic Searchs', () => {

    it('should call fetch function', () => {
      search();
      expect(fetchedStub).to.have.been.calledOnce;

    });

    it('should recieve the correct url to fetch', () => {
      context('passing one type', () => {
        search('Incubus', 'artist');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?query=Incubus&type=artist');

        search('Incubus', 'album')
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?query=Incubus&type=album');

      });

      context('passing more than one type', () => {

        search('Incubus', ['artist', 'album']);

        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?query=Incubus&type=artist,album');
      });

    });

    it('should return the JSON Data from the Promise', () => {
      const artists = search('Incubus', 'artist');

      artists.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      })
    });
  });

  describe('searchArtists', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = searchArtists('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?query=Incubus&type=artist');

      const artists2 = searchArtists('Supercombo');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?query=Supercombo&type=artist');
    });
  });

  describe('searchAlbums', () => {
    it('should call fetch function', () => {
      const albums = searchAlbums('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albums = searchAlbums('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?query=Incubus&type=album');

      const albums2 = searchAlbums('Supercombo');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?query=Supercombo&type=album');
    });
  });

  describe('searchTracks', () => {
    it('should call fetch function', () => {
      const tracks = searchTracks('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const tracks = searchTracks('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?query=Incubus&type=track');

      const tracks2 = searchTracks('Supercombo');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?query=Supercombo&type=track');
    });
  });

  describe('searchPlaylists', () => {
    it('should call fetch function', () => {
      const playlist = searchPlaylists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const playlist = searchPlaylists('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?query=Incubus&type=playlist');

      const playlist2 = searchPlaylists('Supercombo');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?query=Supercombo&type=playlist');
    });
  });
});

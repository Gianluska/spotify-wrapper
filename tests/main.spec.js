import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/main';
chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {

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
    let fetchedStub;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });

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
  });
});

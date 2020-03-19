// getAlbum
// getAlbumTracks

import chai, { expect } from 'chai';
import { getAlbum, getAlbumTracks, getAlbums } from '../src/album';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Album', () => {
  let stubedFetch;
  let promise;

  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.resolves({ json: () => ({ album: 'name' }) });
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('Smoke tests', () => {

    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });

  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const album = getAlbum('7d4zNXpbzKsvJpjQi4cIfj');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/7d4zNXpbzKsvJpjQi4cIfj');

      const album2 = getAlbum('7d4zNXpbzKsvJpjQi4cIfk');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/7d4zNXpbzKsvJpjQi4cIfk');
    });

    it('should return the JSON Data from the Promise', () => {
      const album = getAlbum('7d4zNXpbzKsvJpjQi4cIfk');

      album.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      })
    });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const album = getAlbums();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const album = getAlbums(['7d4zNXpbzKsvJpjQi4cIfj', '7d4zNXpbzKsvJpjQi4cIfu']);
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=7d4zNXpbzKsvJpjQi4cIfj,7d4zNXpbzKsvJpjQi4cIfu');

      const album2 = getAlbums(['7d4zNXpbzKsvJpjQi4cIfj', '7d4zNXpbzKsvJpjQi4cIfu']);
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=7d4zNXpbzKsvJpjQi4cIfj,7d4zNXpbzKsvJpjQi4cIfu');
    });

    it('should return the JSON Data from the Promise', () => {
      const album = getAlbums(['7d4zNXpbzKsvJpjQi4cIfj', '7d4zNXpbzKsvJpjQi4cIfu']);

      album.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      })
    });
  });

  describe('getAlbumTracks', () => {
    it('should call fetch method', () => {
      const album = getAlbumTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const album = getAlbumTracks('7d4zNXpbzKsvJpjQi4cIfj');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/7d4zNXpbzKsvJpjQi4cIfj/tracks');

      const album2 = getAlbumTracks('7d4zNXpbzKsvJpjQi4cIfk');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/7d4zNXpbzKsvJpjQi4cIfk/tracks');
    });

    it('should return the JSON Data from the Promise', () => {
      const album = getAlbumTracks('7d4zNXpbzKsvJpjQi4cIfk');

      album.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      })
    });
  });
});

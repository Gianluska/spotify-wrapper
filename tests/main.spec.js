import { expect } from 'chai';
import { sum, sub, mult, div } from '../src/main';

describe('Calc', () => {

  describe('Smoke tests', () => {

    it('should exists method sum', () => {
      expect(sum).to.exist;
    });

    it('should exists method sub', () => {
      expect(sub).to.exist;
    });

    it('should exists method mult', () => {
      expect(mult).to.exist;
    });

    it('should exists method div', () => {
      expect(div).to.exist;
    });
  });

  describe('Sum', () => {
    it('should return 4 when sum(2, 2)', () => {
      expect(sum(2, 2)).to.be.equal(4);
    });
  });

  describe('Sub', () => {
    it('should return 4 when sum(6, 2)', () => {
      expect(sub(6, 2)).to.be.equal(4);
    });

    it('should return -4 when sum(6, 10)', () => {
      expect(sub(6, 10)).to.be.equal(-4);
    });
  });

  describe('Mult', () => {
    it('should return 4 when sum(2, 2)', () => {
      expect(mult(2, 2)).to.be.equal(4);
    });
  });

  describe('Div', () => {
    it('should return 4 when sum(16, 4)', () => {
      expect(div(16, 4)).to.be.equal(4);
    });

    it('should return `Não é possivel dividir por 0!` when divided by zero', () => {
      expect(div(16, 0)).to.be.equal('Não é possivel dividir por 0!');
    });
  });

});

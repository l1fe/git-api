const proxyquire = require('proxyquire');
const { expect } = require('chai');

const apiService = proxyquire('../api.service', { });

describe('# Api service unit tests', () => {
  describe('## get() method tests', () => {
    it('should be defined', async () => {
      expect(apiService).to.have.property('get').that.is.a('function');
    });
  });

  describe('## post() method tests', () => {
    it('should be defined', async () => {
      expect(apiService).to.have.property('post').that.is.a('function');
    });
  });

  describe('## patch() method tests', () => {
    it('should be defined', async () => {
      expect(apiService).to.have.property('patch').that.is.a('function');
    });
  });

  describe('## put() method tests', () => {
    it('should be defined', async () => {
      expect(apiService).to.have.property('put').that.is.a('function');
    });
  });

  describe('## delete() method tests', () => {
    it('should be defined', async () => {
      expect(apiService).to.have.property('delete').that.is.a('function');
    });
  });
});

const proxyquire = require('proxyquire');
const { expect } = require('chai');

const repoIdValue = 'repo-id';
const searchQuery = 'tetris';

const gitService = proxyquire('../git.service', { });

describe('# Git service unit tests', () => {
  describe('## get() method tests', () => {
    it('should be defined', async () => {
      expect(gitService).to.have.property('get').that.is.a('function');
    });

    it('should return a promise', () => {
      const returnValue = gitService.get(repoIdValue);
      expect(returnValue).to.have.property('then').that.is.a('function');
    });
  });

  describe('## search() method tests', () => {
    it('should be defined', async () => {
      expect(gitService).to.have.property('search').that.is.a('function');
    });

    it('should return a promise', () => {
      const returnValue = gitService.search(searchQuery);
      expect(returnValue).to.have.property('then').that.is.a('function');
    });
  });
});

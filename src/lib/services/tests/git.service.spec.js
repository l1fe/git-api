const proxyquire = require('proxyquire');
const { expect } = require('chai');
const sinon = require('sinon');

const repositoryMock = require('../../mock-data/repository.mock.json');
const searchRepositoriesMock = require('../../mock-data/search-repositories.mock.json');

const { GITHUB_API_URL } = require('../../../config');

const repoIdValue = '1';
const searchQuery = 'tetris';

const alwaysResolveWithItem = itemToResolveWith => () => Promise.resolve(itemToResolveWith);

const apiServiceStub = { };

const gitService = proxyquire('../git.service', {
  './api.service': apiServiceStub,
});

describe('# Git service unit tests', () => {
  describe('## get() method tests', () => {
    before(() => {
      apiServiceStub.get = alwaysResolveWithItem(repositoryMock);
    });

    after(() => {
      delete apiServiceStub.get;
    });

    beforeEach(() => {
      sinon.spy(apiServiceStub, 'get');
    });

    afterEach(() => {
      apiServiceStub.get.restore();
    });

    it('should be defined', async () => {
      expect(gitService).to.have.property('get').that.is.a('function');
    });

    it('should return a promise', () => {
      const returnValue = gitService.get(repoIdValue);
      expect(returnValue).to.have.property('then').that.is.a('function');
    });

    it('should call apiService\'s get() method to retrieve an item with given \'id\' from GitHub API url', async () => {
      const apiEndpointUrl = `${GITHUB_API_URL}/repositories/${repoIdValue}`;
      await gitService.get(repoIdValue);
      expect(apiServiceStub.get.calledOnce).to.be.true;
      expect(apiServiceStub.get.getCall(0).args[0]).to.be.equal(apiEndpointUrl);
    });
  });

  describe('## search() method tests', () => {
    before(() => {
      apiServiceStub.get = alwaysResolveWithItem(searchRepositoriesMock);
    });

    after(() => {
      delete apiServiceStub.get;
    });

    beforeEach(() => {
      sinon.spy(apiServiceStub, 'get');
    });

    afterEach(() => {
      apiServiceStub.get.restore();
    });

    it('should be defined', async () => {
      expect(gitService).to.have.property('search').that.is.a('function');
    });

    it('should return a promise', () => {
      const returnValue = gitService.search(searchQuery);
      expect(returnValue).to.have.property('then').that.is.a('function');
    });

    it(`should call apiService's get() method to search for the items that match given query '${searchQuery}' from GitHub API url`, async () => {
      const apiEndpointUrl = `${GITHUB_API_URL}/search/repositories`;
      const params = { q: searchQuery };
      await gitService.search(searchQuery);
      expect(apiServiceStub.get.calledOnce).to.be.true;
      expect(apiServiceStub.get.getCall(0).args[0]).to.be.equal(apiEndpointUrl);
      expect(apiServiceStub.get.getCall(0).args[1]).to.be.eql({ params });
    });
  });
});

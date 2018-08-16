const proxyquire = require('proxyquire');
const { expect } = require('chai');
const sinon = require('sinon');

const mockData = require('../../mock-data');
const { GITHUB_API_URL } = require('../../../config');

const repoIdValue = '1';

const defaultOptions = {
  name: 'tetris',
};

const alwaysResolveWithItem = itemToResolveWith => () => Promise.resolve(itemToResolveWith);

const apiServiceStub = { };

const gitService = proxyquire('../git.service', {
  './api.service': apiServiceStub,
});

describe('# Git service unit tests', () => {
  describe('## get() method tests', () => {
    before(() => {
      apiServiceStub.get = alwaysResolveWithItem(mockData.repository);
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

  describe('## getAll() method tests', () => {
    before(() => {
      apiServiceStub.get = alwaysResolveWithItem(mockData.allRepositories);
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
      expect(gitService).to.have.property('getAll').that.is.a('function');
    });

    it('should return a promise', () => {
      const returnValue = gitService.get(repoIdValue);
      expect(returnValue).to.have.property('then').that.is.a('function');
    });

    it('should call apiService\'s get() method to retrieve all items from GitHub API url', async () => {
      const apiEndpointUrl = `${GITHUB_API_URL}/repositories`;
      await gitService.getAll();
      expect(apiServiceStub.get.calledOnce).to.be.true;
      expect(apiServiceStub.get.getCall(0).args[0]).to.be.equal(apiEndpointUrl);
    });
  });

  describe('## search() method tests', () => {
    before(() => {
      apiServiceStub.get = alwaysResolveWithItem(mockData.searchRepositories);
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
      const returnValue = gitService.search(defaultOptions);
      expect(returnValue).to.have.property('then').that.is.a('function');
    });

    it('should call apiService\'s get() method to search for all items from valid GitHub API url', async () => {
      const apiEndpointUrl = `${GITHUB_API_URL}/repositories`;
      await gitService.search();
      expect(apiServiceStub.get.calledOnce).to.be.true;
      expect(apiServiceStub.get.getCall(0).args[0]).to.be.equal(apiEndpointUrl);
    });

    it('should call apiService\'s get() method to search for the items that match given query from valid GitHub API url', async () => {
      const apiEndpointUrl = `${GITHUB_API_URL}/search/repositories`;
      await gitService.search(defaultOptions);
      expect(apiServiceStub.get.calledOnce).to.be.true;
      expect(apiServiceStub.get.getCall(0).args[0]).to.be.equal(apiEndpointUrl);
      expect(apiServiceStub.get.getCall(0).args[1]).to.be.eql({
        params: { q: defaultOptions.name },
      });
    });
  });
});

import proxyquire from 'proxyquire';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';

chai.use(chaiAsPromised);

const searchQuery = 'tetris';
const repoIdValue = 'repo-id';
const repoName = 'repo-name';
const repoLanguage = 'javascript';
const repoStarsCount = 5;
const item = {
  id: repoIdValue,
  name: repoName,
  language: repoLanguage,
  starsCount: repoStarsCount,
};
const repositoryMock = require('../../mock-data/repository.mock.json');
const searchRepositoriesMock = require('../../mock-data/search-repositories.mock.json');

const alwaysReject = () => Promise.reject(new Error('Got error'));
const alwaysResolveWithItem = itemToResolveWith => () => Promise.resolve(itemToResolveWith);

const gitServiceStub = {
  get: alwaysResolveWithItem(repositoryMock),
  search: alwaysResolveWithItem(searchRepositoriesMock),
};

const repoRepository = proxyquire('../repo.repository', {
  '../services/git.service': gitServiceStub,
});

describe('# Repo repository unit tests', () => {
  describe('## create() method tests', () => {
    it('should be defined', async () => {
      expect(repoRepository).to.have.property('create').that.is.a('function');
    });

    it('should return a promise that is rejected (not implemented)', () => {
      const params = { ...item };
      const returnValue = repoRepository.create(params);
      expect(returnValue).to.have.property('then').that.is.a('function');
      expect(returnValue).to.be.rejectedWith(Error);
    });
  });

  describe('## get() method tests', () => {
    beforeEach(() => {
      sinon.spy(gitServiceStub, 'get');
    });

    afterEach(() => {
      gitServiceStub.get.restore();
    });

    it('should be defined', async () => {
      expect(repoRepository).to.have.property('get').that.is.a('function');
    });

    it('should return a promise', async () => {
      const params = { id: repoIdValue };
      const returnValue = repoRepository.get(params);
      expect(returnValue).to.have.property('then').that.is.a('function');
    });

    it('should reject a promise on gitService inner error', () => {
      gitServiceStub.get.restore();
      sinon.stub(gitServiceStub, 'get').callsFake(alwaysReject);
      const params = { id: repoIdValue };
      const returnValue = repoRepository.get(params);
      expect(returnValue).to.be.rejectedWith(Error);
    });

    it('should call gitService\'s get() method to retrieve an item with given \'id\'', async () => {
      const params = { id: repoIdValue };
      await repoRepository.get(params);
      expect(gitServiceStub.get.calledOnce).to.be.true;
      expect(gitServiceStub.get.getCall(0).args[0]).to.be.equal(params.id);
    });
  });

  describe('## search() method tests', () => {
    beforeEach(() => {
      sinon.spy(gitServiceStub, 'search');
    });

    afterEach(() => {
      gitServiceStub.search.restore();
    });

    it('should be defined', async () => {
      expect(repoRepository).to.have.property('search').that.is.a('function');
    });

    it('should return a promise', async () => {
      const params = { query: searchQuery };
      const returnValue = repoRepository.search(params);
      expect(returnValue).to.have.property('then').that.is.a('function');
    });

    it('should reject a promise on gitService inner error', () => {
      gitServiceStub.search.restore();
      sinon.stub(gitServiceStub, 'search').callsFake(alwaysReject);
      const params = { query: searchQuery };
      const returnValue = repoRepository.search(params);
      expect(returnValue).to.be.rejectedWith(Error);
    });

    it(`should call gitService's search() method to search for the items that match given query '${searchQuery}'`, async () => {
      const params = { query: searchQuery };
      await repoRepository.search(params);
      expect(gitServiceStub.search.calledOnce).to.be.true;
      expect(gitServiceStub.search.getCall(0).args[0]).to.be.equal(params.query);
    });
  });

  describe('## remove() method tests', () => {
    it('should be defined', async () => {
      expect(repoRepository).to.have.property('remove').that.is.a('function');
    });

    it('should return a promise that is rejected (not implemented)', () => {
      const params = { id: repoIdValue };
      const returnValue = repoRepository.remove(params);
      expect(returnValue).to.have.property('then').that.is.a('function');
      expect(returnValue).to.be.rejectedWith(Error);
    });
  });

  describe('## clear() method tests', () => {
    it('should be defined', async () => {
      expect(repoRepository).to.have.property('clear').that.is.a('function');
    });

    it('should return a promise that is rejected (not implemented)', () => {
      const returnValue = repoRepository.clear();
      expect(returnValue).to.have.property('then').that.is.a('function');
      expect(returnValue).to.be.rejectedWith(Error);
    });
  });
});

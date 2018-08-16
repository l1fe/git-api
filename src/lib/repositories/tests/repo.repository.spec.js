const proxyquire = require('proxyquire');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

const { expect } = chai;

chai.use(chaiAsPromised);

const defaultSearchOptions = { name: 'tetris' };
const defaultItem = {
  id: 'repo-id',
  name: 'repo-name',
  language: 'javascript',
  stars: 5,
  bookmarked: false,
};

const repositoryMock = require('../../mock-data/repository.mock.json');
const searchRepositoriesMock = require('../../mock-data/search-repositories.mock.json');

const alwaysReject = () => Promise.reject(new Error('Got error'));
const alwaysResolveWithItem = itemToResolveWith => () => Promise.resolve(itemToResolveWith);

const gitServiceStub = {
  get: alwaysResolveWithItem(repositoryMock),
  search: alwaysResolveWithItem(searchRepositoriesMock),
};

const ramStorageStub = {
  get: () => null,
  add: () => defaultItem,
  addOrUpdate: () => defaultItem,
};

const repoRepository = proxyquire('../repo.repository', {
  '../services/git.service': gitServiceStub,
  '../ram-storage': ramStorageStub,
});

describe('# Repo repository unit tests', () => {
  describe('## create() method tests', () => {
    it('should be defined', async () => {
      expect(repoRepository).to.have.property('create').that.is.a('function');
    });

    it('should return a promise that is rejected (not implemented)', () => {
      const params = { ...defaultItem };
      const returnValue = repoRepository.create(params);
      expect(returnValue).to.have.property('then').that.is.a('function');
      expect(returnValue).to.be.rejectedWith(Error);
    });
  });

  describe('## get() method tests', () => {
    beforeEach(() => {
      sinon.spy(gitServiceStub, 'get');
      sinon.spy(ramStorageStub, 'get');
    });

    afterEach(() => {
      gitServiceStub.get.restore();
      ramStorageStub.get.restore();
    });

    it('should be defined', async () => {
      expect(repoRepository).to.have.property('get').that.is.a('function');
    });

    it('should return a promise', async () => {
      const returnValue = repoRepository.get(defaultItem.id);
      expect(returnValue).to.have.property('then').that.is.a('function');
    });

    it('should reject a promise on gitService inner error', () => {
      gitServiceStub.get.restore();
      sinon.stub(gitServiceStub, 'get').callsFake(alwaysReject);
      const returnValue = repoRepository.get(defaultItem.id);
      expect(returnValue).to.be.rejectedWith(Error);
    });

    it('should call ramStorage\'s get() method to implement in-memory caching', async () => {
      await repoRepository.get(defaultItem.id);
      expect(ramStorageStub.get.calledOnce).to.be.true;
      expect(ramStorageStub.get.getCall(0).args[0]).to.be.equal(defaultItem.id);
    });

    it('should call gitService\'s get() method to retrieve an item with given id (if it is not in-memory yet)', async () => {
      await repoRepository.get(defaultItem.id);
      expect(gitServiceStub.get.calledOnce).to.be.true;
      expect(gitServiceStub.get.getCall(0).args[0]).to.be.equal(defaultItem.id);
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
      const returnValue = repoRepository.search(defaultSearchOptions);
      expect(returnValue).to.have.property('then').that.is.a('function');
    });

    it('should reject a promise on gitService inner error', () => {
      gitServiceStub.search.restore();
      sinon.stub(gitServiceStub, 'search').callsFake(alwaysReject);
      const returnValue = repoRepository.search(defaultSearchOptions);
      expect(returnValue).to.be.rejectedWith(Error);
    });

    it('should call gitService\'s search() method to search for the items that match given query', async () => {
      await repoRepository.search(defaultSearchOptions);
      expect(gitServiceStub.search.calledOnce).to.be.true;
      expect(gitServiceStub.search.getCall(0).args[0]).to.be.equal(defaultSearchOptions);
    });
  });

  describe('## remove() method tests', () => {
    it('should be defined', async () => {
      expect(repoRepository).to.have.property('remove').that.is.a('function');
    });

    it('should return a promise that is rejected (not implemented)', () => {
      const returnValue = repoRepository.remove(defaultItem.id);
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

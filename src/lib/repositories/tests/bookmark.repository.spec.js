import proxyquire from 'proxyquire';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';

chai.use(chaiAsPromised);

const shortidValue = 'generated-shortid';
const repoIdValue = 'repo-id';
const item = { id: shortidValue, repoId: repoIdValue };
const alwaysReject = () => Promise.reject(new Error('Got error'));

const alwaysResolveWithItem = itemToResolveWith => () => Promise.resolve(itemToResolveWith);

const storageStub = {
  setItem: alwaysResolveWithItem(item),
  getItem: alwaysResolveWithItem(item),
  queryItems: alwaysResolveWithItem([item]),
  removeItem: alwaysResolveWithItem(true),
  clear: alwaysResolveWithItem(true),
};

const shortidStub = {
  generate: () => shortidValue,
};

const bookmarkRepository = proxyquire('../bookmark.repository', {
  '../ram-storage': storageStub,
  shortid: shortidStub,
});

describe('# Bookmark repository unit tests', () => {
  describe('## create() method tests', () => {
    beforeEach(() => {
      sinon.spy(storageStub, 'setItem');
    });

    afterEach(() => {
      storageStub.setItem.restore();
    });

    it('should be defined', async () => {
      expect(bookmarkRepository).to.have.property('create').that.is.a('function');
    });

    it('should return a promise', () => {
      const params = { repoId: 'repository-id' };
      const returnValue = bookmarkRepository.create(params);
      expect(returnValue).to.have.property('then').that.is.a('function');
    });

    it('should reject a promise on storage inner error', () => {
      storageStub.setItem.restore();
      sinon.stub(storageStub, 'setItem').callsFake(alwaysReject);
      const params = { repoId: 'repository-id' };
      const returnValue = bookmarkRepository.create(params);
      expect(returnValue).to.be.rejectedWith(Error);
    });

    it('should call storage\'s setItem() method to create a valid item', async () => {
      const params = { repoId: '25' };
      await bookmarkRepository.create(params);

      expect(storageStub.setItem.calledOnce).to.be.true;
      expect(storageStub.setItem.getCall(0).args[0]).to.be.eql(shortidValue);
      expect(storageStub.setItem.getCall(0).args[1]).to.be.eql({ id: shortidValue, ...params });
    });
  });

  describe('## get() method tests', () => {
    beforeEach(() => {
      sinon.spy(storageStub, 'getItem');
    });

    afterEach(() => {
      storageStub.getItem.restore();
    });

    it('should be defined', async () => {
      expect(bookmarkRepository).to.have.property('get').that.is.a('function');
    });

    it('should return a promise', async () => {
      const params = { id: shortidValue };
      const returnValue = bookmarkRepository.get(params.id);
      expect(returnValue).to.have.property('then').that.is.a('function');
    });

    it('should reject a promise on storage inner error', () => {
      storageStub.getItem.restore();
      sinon.stub(storageStub, 'getItem').callsFake(alwaysReject);
      const params = { id: shortidValue };
      const returnValue = bookmarkRepository.get(params);
      expect(returnValue).to.be.rejectedWith(Error);
    });

    it('should call storage\'s getItem() method to retrieve an item with given \'id\'', async () => {
      const params = { id: shortidValue };
      await bookmarkRepository.get(params.id);
      expect(storageStub.getItem.calledOnce).to.be.true;
      expect(storageStub.getItem.getCall(0).args[0]).to.be.equal(params.id);
    });
  });

  describe('## filter() method tests', () => {
    beforeEach(() => {
      sinon.spy(storageStub, 'queryItems');
    });

    afterEach(() => {
      storageStub.queryItems.restore();
    });

    it('should be defined', async () => {
      expect(bookmarkRepository).to.have.property('filter').that.is.a('function');
    });

    it('should return a promise', async () => {
      const params = { repoId: repoIdValue };
      const returnValue = bookmarkRepository.filter(params);
      expect(returnValue).to.have.property('then').that.is.a('function');
    });

    it('should reject a promise on storage inner error', () => {
      storageStub.queryItems.restore();
      sinon.stub(storageStub, 'queryItems').callsFake(alwaysReject);
      const params = { repoId: repoIdValue };
      const returnValue = bookmarkRepository.filter(params);
      expect(returnValue).to.be.rejectedWith(Error);
    });

    it('should call storage\'s queryItems() method to filter an items with given params', async () => {
      const params = { repoId: repoIdValue };
      const collection = [{ id: '25', repoId: repoIdValue }, { id: '26', repoId: '222' }];
      await bookmarkRepository.filter(params);
      expect(storageStub.queryItems.calledOnce).to.be.true;
      const query = storageStub.queryItems.getCall(0).args[0];
      expect(query).to.be.a('function');
      const filtered = collection.filter(query);
      expect(filtered).to.have.lengthOf(1);
      expect(filtered[0].repoId).to.be.equal(params.repoId);
    });
  });

  describe('## list() method tests', () => {
    beforeEach(() => {
      sinon.spy(storageStub, 'queryItems');
    });

    afterEach(() => {
      storageStub.queryItems.restore();
    });

    it('should be defined', async () => {
      expect(bookmarkRepository).to.have.property('list').that.is.a('function');
    });

    it('should return a promise', async () => {
      const returnValue = bookmarkRepository.list();
      expect(returnValue).to.have.property('then').that.is.a('function');
    });

    it('should reject a promise on storage inner error', () => {
      storageStub.queryItems.restore();
      sinon.stub(storageStub, 'queryItems').callsFake(alwaysReject);
      const returnValue = bookmarkRepository.list();
      expect(returnValue).to.be.rejectedWith(Error);
    });

    it('should call storage\'s queryItems() method to get all items with given params', async () => {
      const collection = [{ id: '25', repoId: '59' }, { id: '26', repoId: '222' }];
      await bookmarkRepository.list();
      expect(storageStub.queryItems.calledOnce).to.be.true;
      const query = storageStub.queryItems.getCall(0).args[0];
      expect(query).to.be.a('function');
      const filtered = collection.filter(query);
      expect(filtered).to.have.lengthOf(collection.length);
      expect(filtered).to.be.eql(collection);
    });
  });

  describe('## remove() method tests', () => {
    beforeEach(() => {
      sinon.spy(storageStub, 'removeItem');
    });

    afterEach(() => {
      storageStub.removeItem.restore();
    });

    it('should be defined', async () => {
      expect(bookmarkRepository).to.have.property('remove').that.is.a('function');
    });

    it('should return a promise', async () => {
      const params = { id: shortidValue };
      const returnValue = bookmarkRepository.remove(params.id);
      expect(returnValue).to.have.property('then').that.is.a('function');
    });

    it('should reject a promise on storage inner error', () => {
      storageStub.removeItem.restore();
      sinon.stub(storageStub, 'removeItem').callsFake(alwaysReject);
      const params = { id: shortidValue };
      const returnValue = bookmarkRepository.remove(params.id);
      expect(returnValue).to.be.rejectedWith(Error);
    });

    it('should call storage\'s removeItemById() method to remove an item with given \'id\'', async () => {
      const params = { id: shortidValue };
      await bookmarkRepository.remove(params.id);
      expect(storageStub.removeItem.calledOnce).to.be.true;
      expect(storageStub.removeItem.getCall(0).args[0]).to.be.equal(params.id);
    });
  });

  describe('## clear() method tests', () => {
    beforeEach(() => {
      sinon.spy(storageStub, 'clear');
    });

    afterEach(() => {
      storageStub.clear.restore();
    });

    it('should be defined', async () => {
      expect(bookmarkRepository).to.have.property('clear').that.is.a('function');
    });

    it('should return a promise', async () => {
      const returnValue = bookmarkRepository.clear();
      expect(returnValue).to.have.property('then').that.is.a('function');
    });

    it('should reject a promise on storage inner error', () => {
      storageStub.clear.restore();
      sinon.stub(storageStub, 'clear').callsFake(alwaysReject);
      const returnValue = bookmarkRepository.clear();
      expect(returnValue).to.be.rejectedWith(Error);
    });

    it('should call storage\'s clear() method to remove all items', async () => {
      await bookmarkRepository.clear();
      expect(storageStub.clear.calledOnce).to.be.true;
    });
  });
});

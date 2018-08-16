import proxyquire from 'proxyquire';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';

chai.use(chaiAsPromised);

const shortidValue = 'generated-shortid';
const repoIdValue = 'repo-id';
const collectionName = 'bookmarks';
const item = { id: shortidValue, repoId: repoIdValue };
const alwaysResolve = () => Promise.resolve();
const alwaysReject = () => Promise.reject(new Error('Got error'));

const alwaysResolveWithItem = itemToResolveWith => () => Promise.resolve(itemToResolveWith);

const storageStub = {
  addItem: alwaysResolveWithItem(item),
  getItemById: alwaysResolveWithItem(item),
  getItems: alwaysResolveWithItem([item]),
  removeItemById: alwaysResolve,
  clearCollection: alwaysResolve,
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
      sinon.spy(storageStub, 'addItem');
    });

    afterEach(() => {
      storageStub.addItem.restore();
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
      storageStub.addItem.restore();
      sinon.stub(storageStub, 'addItem').callsFake(alwaysReject);
      const params = { repoId: 'repository-id' };
      const returnValue = bookmarkRepository.create(params);
      expect(returnValue).to.be.rejectedWith(Error);
    });

    it(`should call storage's addItem() method to create a valid item to collection '${collectionName}'`, async () => {
      const params = { repoId: 'repository-id' };
      await bookmarkRepository.create(params);

      expect(storageStub.addItem.calledOnce).to.be.true;
      expect(storageStub.addItem.getCall(0).args[0]).to.be.equal(collectionName);
      expect(storageStub.addItem.getCall(0).args[1]).to.be.eql({ id: shortidValue, ...params });
    });
  });

  describe('## get() method tests', () => {
    beforeEach(() => {
      sinon.spy(storageStub, 'getItemById');
    });

    afterEach(() => {
      storageStub.getItemById.restore();
    });

    it('should be defined', async () => {
      expect(bookmarkRepository).to.have.property('get').that.is.a('function');
    });

    it('should return a promise', async () => {
      const params = { id: shortidValue };
      const returnValue = bookmarkRepository.get(params);
      expect(returnValue).to.have.property('then').that.is.a('function');
    });

    it('should reject a promise on storage inner error', () => {
      storageStub.getItemById.restore();
      sinon.stub(storageStub, 'getItemById').callsFake(alwaysReject);
      const params = { id: shortidValue };
      const returnValue = bookmarkRepository.get(params);
      expect(returnValue).to.be.rejectedWith(Error);
    });

    it(`should call storage's getItemById() method to retrieve an item with given 'id' from collection '${collectionName}'`, async () => {
      const params = { id: shortidValue };
      await bookmarkRepository.get(params);
      expect(storageStub.getItemById.calledOnce).to.be.true;
      expect(storageStub.getItemById.getCall(0).args[0]).to.be.equal(collectionName);
      expect(storageStub.getItemById.getCall(0).args[1]).to.be.eql(params.id);
    });
  });

  describe('## filter() method tests', () => {
    beforeEach(() => {
      sinon.spy(storageStub, 'getItems');
    });

    afterEach(() => {
      storageStub.getItems.restore();
    });

    it('should be defined', async () => {
      expect(bookmarkRepository).to.have.property('filter').that.is.a('function');
    });

    it('should return a promise', async () => {
      const params = { id: shortidValue };
      const returnValue = bookmarkRepository.filter(params);
      expect(returnValue).to.have.property('then').that.is.a('function');
    });

    it('should reject a promise on storage inner error', () => {
      storageStub.getItems.restore();
      sinon.stub(storageStub, 'getItems').callsFake(alwaysReject);
      const params = { id: shortidValue };
      const returnValue = bookmarkRepository.filter(params);
      expect(returnValue).to.be.rejectedWith(Error);
    });

    it(`should call storage's getItems() method to filter an items with given params stored in collection '${collectionName}'`, async () => {
      const params = { id: '25' };
      const collection = [{ id: '25', repoId: '59' }, { id: '26', repoId: '222' }];
      await bookmarkRepository.filter(params);
      expect(storageStub.getItems.calledOnce).to.be.true;
      expect(storageStub.getItems.getCall(0).args[0]).to.be.equal(collectionName);
      const query = storageStub.getItems.getCall(0).args[1];
      expect(query).to.be.a('function');
      const filtered = collection.filter(query);
      expect(filtered).to.have.lengthOf(1);
      expect(filtered[0].id).to.be.equal(params.id);
    });
  });

  describe('## remove() method tests', () => {
    beforeEach(() => {
      sinon.spy(storageStub, 'removeItemById');
    });

    afterEach(() => {
      storageStub.removeItemById.restore();
    });

    it('should be defined', async () => {
      expect(bookmarkRepository).to.have.property('remove').that.is.a('function');
    });

    it('should return a promise', async () => {
      const params = { id: shortidValue };
      const returnValue = bookmarkRepository.remove(params);
      expect(returnValue).to.have.property('then').that.is.a('function');
    });

    it('should reject a promise on storage inner error', () => {
      storageStub.removeItemById.restore();
      sinon.stub(storageStub, 'removeItemById').callsFake(alwaysReject);
      const params = { id: shortidValue };
      const returnValue = bookmarkRepository.remove(params);
      expect(returnValue).to.be.rejectedWith(Error);
    });

    it(`should call storage's removeItemById() method to remove an item with given 'id' from collection '${collectionName}'`, async () => {
      const params = { id: shortidValue };
      await bookmarkRepository.remove(params);
      expect(storageStub.removeItemById.calledOnce).to.be.true;
      expect(storageStub.removeItemById.getCall(0).args[0]).to.be.equal(collectionName);
      expect(storageStub.removeItemById.getCall(0).args[1]).to.be.eql(params.id);
    });
  });

  describe('## clear() method tests', () => {
    beforeEach(() => {
      sinon.spy(storageStub, 'clearCollection');
    });

    afterEach(() => {
      storageStub.clearCollection.restore();
    });

    it('should be defined', async () => {
      expect(bookmarkRepository).to.have.property('clear').that.is.a('function');
    });

    it('should return a promise', async () => {
      const returnValue = bookmarkRepository.clear();
      expect(returnValue).to.have.property('then').that.is.a('function');
    });

    it('should reject a promise on storage inner error', () => {
      storageStub.clearCollection.restore();
      sinon.stub(storageStub, 'clearCollection').callsFake(alwaysReject);
      const returnValue = bookmarkRepository.clear();
      expect(returnValue).to.be.rejectedWith(Error);
    });

    it(`should call storage's clear() method to remove all items in collection '${collectionName}'`, async () => {
      await bookmarkRepository.clear();
      expect(storageStub.clearCollection.calledOnce).to.be.true;
      expect(storageStub.clearCollection.getCall(0).args[0]).to.be.equal(collectionName);
    });
  });
});

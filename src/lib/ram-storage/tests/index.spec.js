const proxyquire = require('proxyquire');
const { expect } = require('chai');

const defaultItem = {
  id: '5',
  name: 'item',
};

const storageStub = { };

const ramStorage = proxyquire('../', {
  './storage': storageStub,
});

describe('# ramStorage unit tests', () => {
  describe('## add() method tests', () => {
    beforeEach(() => {
      Object.keys(storageStub).forEach(key => delete storageStub[key]);
    });

    it('should be defined', async () => {
      expect(ramStorage).to.have.property('add').that.is.a('function');
    });

    it('should return added element', () => {
      const item = ramStorage.add(defaultItem.id, defaultItem);
      expect(item).to.be.eql(defaultItem);
    });
  });

  describe('## addOrUpdate() method tests', () => {
    beforeEach(() => {
      Object.keys(storageStub).forEach(key => delete storageStub[key]);
    });

    it('should be defined', async () => {
      expect(ramStorage).to.have.property('addOrUpdate').that.is.a('function');
    });

    it('should return added / updated element', () => {
      const item = ramStorage.addOrUpdate(defaultItem.id, defaultItem);
      expect(item).to.be.eql(defaultItem);
    });
  });

  describe('## get() method tests', () => {
    beforeEach(() => {
      Object.keys(storageStub).forEach(key => delete storageStub[key]);
    });

    it('should be defined', () => {
      expect(ramStorage).to.have.property('get').that.is.a('function');
    });

    it('should return null if element doesn\'t exist', () => {
      const item = ramStorage.get(defaultItem.id);
      expect(item).to.be.a('null');
    });

    it('should return the actual item', () => {
      storageStub[defaultItem.id] = defaultItem;
      const item = ramStorage.get(defaultItem.id);
      expect(item).to.be.eql(defaultItem);
    });
  });

  describe('## queryItems() method tests', () => {
    beforeEach(() => {
      Object.keys(storageStub).forEach(key => delete storageStub[key]);
    });

    it('should be defined', () => {
      expect(ramStorage).to.have.property('queryItems').that.is.a('function');
    });
  });

  describe('## remove() method tests', () => {
    beforeEach(() => {
      Object.keys(storageStub).forEach(key => delete storageStub[key]);
    });

    it('should be defined', () => {
      expect(ramStorage).to.have.property('remove').that.is.a('function');
    });

    it('should remove the given item', () => {
      storageStub[defaultItem.id] = defaultItem;
      ramStorage.remove(defaultItem.id);
      expect(storageStub).not.to.have.property(defaultItem.id);
    });
  });

  describe('## clear() method tests', () => {
    beforeEach(() => {
      Object.keys(storageStub).forEach(key => delete storageStub[key]);
    });

    it('should be defined', () => {
      expect(ramStorage).to.have.property('clear').that.is.a('function');
    });

    it('should empty the storage', () => {
      storageStub.one = defaultItem;
      storageStub.two = defaultItem;
      ramStorage.clear();
      expect(storageStub).not.to.have.property('one');
      expect(storageStub).not.to.have.property('two');
    });
  });
});

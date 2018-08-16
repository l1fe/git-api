// Very simple storage
const storage = require('./storage');

function ramStorage() {
  // Add an item for the given key
  const add = (key, value) => {
    if (storage[key]) {
      throw new Error('Value for this key already exists');
    }
    storage[key] = value;
    return value;
  };

  // Add or update an item with the given key
  const addOrUpdate = (key, value) => {
    storage[key] = value;
    return value;
  };

  // Get an item with with the given key
  const get = key => storage[key] || null;

  // Get an items that match the given query
  const queryItems = (query) => {
    const items = Object.values(storage).filter(query);
    return items;
  };

  // Remove an item with the given key
  const remove = (key) => {
    if (!storage[key]) {
      throw new Error('Item not found');
    }

    delete storage[key];
    return true;
  };

  // Empty the storage
  const clear = () => {
    Object.keys(storage).forEach(key => delete storage[key]);
    return true;
  };

  return {
    add,
    addOrUpdate,
    get,
    queryItems,
    remove,
    clear,
  };
}

module.exports = ramStorage();

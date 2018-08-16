// Very simple storage

function ramStorage() {
  const storage = { };

  // Set an item for the given key
  const setItem = async (key, value) => {
    if (storage[key]) {
      return Promise.reject(new Error('Value for this key already exists'));
    }
    storage[key] = value;
    return value;
  };

  // Get an item with the given key
  const getItem = async (key) => {
    if (!storage[key]) {
      return Promise.reject(new Error('Item not found'));
    }
    return storage[key];
  };

  // Get all items that match the given query
  const queryItems = async (query) => {
    const items = Object.values(storage).filter(query);
    return items;
  };

  // Remove an item with the given key
  const removeItem = async (key) => {
    if (!storage[key]) {
      return Promise.reject(new Error('Item not found'));
    }
    delete storage[key];
    return true;
  };

  // Empty the storage
  const clear = async () => {
    Object.keys(storage).forEach(key => delete storage[key]);
  };

  return {
    setItem,
    getItem,
    queryItems,
    removeItem,
    clear,
  };
}

module.exports = ramStorage();

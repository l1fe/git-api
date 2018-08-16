// Very simple abstraction of in-memory db
// Assume we have only one connection by default

function ramStorage() {
  const collections = { };

  const getOrCreateCollection = (collectionName) => {
    if (!collections[collectionName]) {
      collections[collectionName] = [];
    }
    return collections[collectionName];
  };

  // Add an item to specific collection
  const addItem = async (collectionName, item) => {
    const collection = getOrCreateCollection(collectionName);
    collection.push(item);
    return item;
  };

  // Get an item from specific collection
  const getItemById = async (collectionName, id) => {
    const collection = getOrCreateCollection(collectionName);
    const item = collection.find(collectionItem => typeof collectionItem === 'object' && collectionItem.id === id);
    if (!item) {
      return Promise.reject(new Error('Item not found'));
    }
    return item;
  };

  // Get all items that match given params from specific collection
  const getItems = async (collectionName, query) => {
    const collection = getOrCreateCollection(collectionName);
    return collection.filter(query);
  };

  // Remove an item from specific collection
  const removeItemById = async (collectionName, id) => {
    const collection = getOrCreateCollection(collectionName);
    const idx = collection.findIndex(item => typeof item === 'object' && item.id === id);
    if (idx === -1) {
      return Promise.reject(new Error('Item not found'));
    }
    collection.split(idx, 1);
    return true;
  };

  // Remove a collection
  const clearCollection = async (collectionName) => {
    const collection = getOrCreateCollection(collectionName);
    collection.length = 0;
  };

  return {
    addItem,
    getItemById,
    getItems,
    removeItemById,
    clearCollection,
  };
}

module.exports = ramStorage();

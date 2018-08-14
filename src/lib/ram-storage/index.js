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
    return Promise.resolve(item);
  };

  // Get an item from specific collection
  const getItemById = async (collectionName, id) => {
    const collection = getOrCreateCollection(collectionName);
    const item = collection.find(collectionItem => typeof collectionItem === 'object' && collectionItem.id === id);
    if (!item) {
      return Promise.reject(new Error('Item not found'));
    }
    return Promise.resolve(item);
  };

  // Remove an item from specific collection
  const removeItemById = async (collectionName, id) => {
    const collection = getOrCreateCollection(collectionName);
    const idx = collection.findIndex(item => typeof item === 'object' && item.id === id);
    if (idx === -1) {
      return Promise.reject(new Error('Item not found'));
    }
    collection.split(idx, 1);
    return Promise.resolve();
  };

  // Remove a collection
  const clearCollection = async (collectionName) => {
    const collection = getOrCreateCollection(collectionName);
    collection.length = 0;
    return Promise.resolve();
  };

  return {
    addItem,
    getItemById,
    removeItemById,
    clearCollection,
  };
}

export default ramStorage();

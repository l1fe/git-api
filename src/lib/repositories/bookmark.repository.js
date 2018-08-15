// We use require to provide compatibility with proxyquire (to stub this dependency in unit tests)
const shortid = require('shortid');

const Bookmark = require('../models/bookmark.model');
const ramStorage = require('../ram-storage');

// Bookmark repository
function bookmarkRepository() {
  const create = async function create({ repoId }) {
    const bookmark = { id: shortid.generate(), repoId };
    try {
      const savedBookmark = await ramStorage.addItem('bookmarks', bookmark);
      return Promise.resolve(savedBookmark);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const get = async function get({ id }) {
    try {
      const bookmark = await ramStorage.getItemById('bookmarks', id);
      return Promise.resolve(new Bookmark(bookmark));
    } catch (err) {
      return Promise.reject(new Error('Bookmark not found'));
    }
  };

  const remove = async function remove({ id }) {
    try {
      await ramStorage.removeItemById('bookmarks', id);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(new Error('Bookmark not found'));
    }
  };

  const clear = async function clear() {
    await ramStorage.clearCollection('bookmarks');
    return Promise.resolve();
  };

  return {
    create,
    get,
    remove,
    clear,
  };
}

module.exports = bookmarkRepository();

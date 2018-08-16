// We use require to provide compatibility with proxyquire (to stub this dependency in unit tests)
const shortid = require('shortid');

const Bookmark = require('../models/bookmark.model');
const ramStorage = require('../ram-storage');

// Bookmark repository
function bookmarkRepository() {
  const create = async function create({ repoId }) {
    const bookmark = { id: shortid.generate(), repoId };

    try {
      // assuming that repoId is unique we should check if it already exists
      const query = item => item.repoId === repoId;
      const bookmarks = await ramStorage.queryItems(query);
      if (bookmarks.length > 0) {
        return Promise.reject(new Error('Item with given repoId already exists'));
      }

      const savedBookmark = await ramStorage.setItem(bookmark.id, bookmark);
      return savedBookmark;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const get = async function get(id) {
    if (!id) {
      return Promise.reject(new Error('Item id is not specified'));
    }

    try {
      const bookmark = await ramStorage.getItem(id);
      return new Bookmark(bookmark);
    } catch (err) {
      return Promise.reject(new Error('Bookmark not found'));
    }
  };

  const filter = async function filter({ repoId } = {}) {
    const query = item => (!repoId || item.repoId === repoId);
    try {
      const bookmarks = await ramStorage.queryItems(query);
      return bookmarks;
    } catch (err) {
      return Promise.reject(new Error(err));
    }
  };

  const list = async function list() {
    return filter();
  };

  const remove = async function remove(id) {
    if (!id) {
      return Promise.reject(new Error('Item id is not specified'));
    }

    try {
      await ramStorage.removeItem(id);
      return true;
    } catch (err) {
      return Promise.reject(new Error('Bookmark not found'));
    }
  };

  const clear = async function clear() {
    try {
      await ramStorage.clear();
      return true;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return {
    create,
    get,
    filter,
    list,
    remove,
    clear,
  };
}

module.exports = bookmarkRepository();

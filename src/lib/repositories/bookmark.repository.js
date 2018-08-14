import shortid from 'shortid';

import Bookmark from '../models/bookmark.model';

// Bookmark Repository
function BookmarkRepository({ storage }) {
  this.storage = storage;
}

// Create a new bookmark
BookmarkRepository.prototype.create = async function create({ repoId }) {
  const bookmark = new Bookmark({ id: shortid.generate(), repoId });
  const savedBookmark = await this.storage.addItem('bookmarks', bookmark);
  return Promise.resolve(savedBookmark);
};

// Get a bookmark by id
BookmarkRepository.prototype.get = async function get({ id }) {
  try {
    const bookmark = await this.storage.getItemById('bookmarks', id);
    return Promise.resolve(bookmark);
  } catch (err) {
    return Promise.reject(new Error('Bookmark not found'));
  }
};

// Remove a bookmark by id
BookmarkRepository.prototype.remove = async function remove({ id }) {
  try {
    const bookmark = await this.storage.removeItemById('bookmarks', id);
    return Promise.resolve(bookmark);
  } catch (err) {
    return Promise.reject(new Error('Bookmark not found'));
  }
};

// Remove all bookmarks
BookmarkRepository.prototype.clear = async function clear() {
  await this.storage.clearCollection('bookmarks');
  return Promise.resolve();
};

export default BookmarkRepository;

import Bookmark from '../models/bookmark.model';

// Bookmark Repository
function repoRepository() {
  // Store all bookmarks in-memory
  const bookmarks = [];

  // Create new bookmark
  const create = async ({ repoId }) => {
    const bookmark = new Bookmark({ repoId });
    bookmarks.push(bookmark);
    return Promise.resolve(bookmark);
  };

  // Get a bookmark by id
  const get = async ({ id }) => {
    const bookmark = bookmarks.find(item => item.id === id);
    if (bookmark) {
      return Promise.resolve(bookmark);
    }
    return Promise.reject(new Error('Bookmark not found'));
  };

  // Remove a bookmark by id
  const remove = async ({ id }) => {
    const idx = bookmarks.findIndex(item => item.id === id);
    if (idx > -1) {
      bookmarks.splice(idx, 1);
      return Promise.resolve();
    }
    return Promise.reject(new Error('Bookmark not found'));
  };

  // Remove all bookmarks
  const clear = async () => {
    bookmarks.length = 0;
  };

  return {
    create,
    get,
    remove,
    clear,
  };
}

export default repoRepository();

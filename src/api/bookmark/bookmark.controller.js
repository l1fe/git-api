const httpStatus = require('http-status');

const repos = require('../../lib/repositories');

// Get bookmarks
function bookmarkCtrl() {
  const getAllBookmarks = async function getAllBookmarks(req, res, next) {
    try {
      const bookmarks = await repos.bookmark.list();
      return res.status(httpStatus.OK).json(bookmarks);
    } catch (err) {
      return next(err);
    }
  };

  const createBookmark = async function createBookmark(req, res, next) {
    try {
      const { repoId } = req.body;
      const bookmark = await repos.bookmark.create({ repoId });
      return res.status(httpStatus.CREATED).json(bookmark);
    } catch (err) {
      return next(err);
    }
  };

  const getBookmark = async function getBookmark(req, res, next) {
    try {
      const { id } = req.params;
      const bookmark = await repos.bookmark.get({ id });
      return res.status(httpStatus.OK).json(bookmark);
    } catch (err) {
      return next(err);
    }
  };

  const removeBookmark = async function removeBookmark(req, res, next) {
    try {
      const { id } = req.params;
      await repos.bookmark.remove({ id });
      return res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      return next(err);
    }
  };

  return {
    getAllBookmarks,
    createBookmark,
    getBookmark,
    removeBookmark,
  };
}

export default bookmarkCtrl();

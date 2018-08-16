import { Router } from 'express';
import validate from 'express-validation';

import requestValidation from './request-validation';
import bookmarkCtrl from './bookmark.controller';

const router = Router();

router.route('/')
  /**
   * GET /bookmarks
   * Get all bookmarks
   */
  .get(validate(requestValidation.getAllBookmarks), bookmarkCtrl.getAllBookmarks)
  /**
   * POST /bookmarks
   * Create a new bookmark
   */
  .post(validate(requestValidation.createBookmark), bookmarkCtrl.createBookmark);

router.route('/:id')
  /**
   * GET /bookmarks/:id
   * Get a bookmark with the given id
   */
  .get(validate(requestValidation.getBookmark), bookmarkCtrl.getBookmark)
  /**
   * DELETE /bookmarks/:id
   * Remove a bookmark with the given id
   */
  .delete(validate(requestValidation.removeBookmark), bookmarkCtrl.removeBookmark);

export default router;

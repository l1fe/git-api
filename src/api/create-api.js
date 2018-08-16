import { Router } from 'express';

import repoRoutes from './repo/repo.route';
import bookmarkRoutes from './bookmark/bookmark.route';

const createApi = () => {
  const api = Router();

  api.use('/repos', repoRoutes);
  api.use('/bookmarks', bookmarkRoutes);

  return api;
};

export default createApi;

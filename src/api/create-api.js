const { Router } = require('express');

const repoRoutes = require('./repo/repo.route');
const bookmarkRoutes = require('./bookmark/bookmark.route');

const createApi = () => {
  const api = Router();

  api.use('/repos', repoRoutes);
  api.use('/bookmarks', bookmarkRoutes);

  return api;
};

module.exports = createApi;

const { Router } = require('express');

const repoRoutes = require('./repo/repo.route');

const createApi = () => {
  const api = Router();

  api.use('/repos', repoRoutes);

  return api;
};

module.exports = createApi;

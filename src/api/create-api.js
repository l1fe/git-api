import { Router } from 'express';

import repoRoutes from './repo/repo.route';

const createApi = () => {
  const api = Router();

  api.use('/repos', repoRoutes);

  return api;
};

export default createApi;

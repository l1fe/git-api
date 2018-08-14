import { Router } from 'express';
import validate from 'express-validation';

import requestValidation from './request-validation';
import repoCtrl from './repo.controller';

const router = Router();

router.route('/')
  /**
   * GET /repos
   * Get all GitHub repositories with given params
   */
  .get(validate(requestValidation.getRepos), repoCtrl.getRepos);

export default router;

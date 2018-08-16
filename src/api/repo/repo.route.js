const { Router } = require('express');
const validate = require('express-validation');

const requestValidation = require('./request-validation');
const repoController = require('./repo.controller');

const router = Router();

router.route('/')
  /**
   * GET /repos
   * Get all GitHub repositories with given params
   */
  .get(validate(requestValidation.getRepos), repoController.getRepos);

router.route('/:id')
  /**
   * GET /repos/:id
   * Get GitHub repository with given id
   */
  .get(validate(requestValidation.getRepo), repoController.getRepo)
  /**
   * PATCH /repos/:id
   * Update GitHub repository with given options
   */
  .patch(validate(requestValidation.updateRepo), repoController.updateRepo);

module.exports = router;

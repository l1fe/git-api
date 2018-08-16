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

module.exports = router;

const Joi = require('joi');

const requestValidation = {
  getRepos: {
    query: {
      name: Joi.string(),
      bookmarked: Joi.boolean(),
    },
  },
  getRepo: {
    params: {
      id: Joi.string(),
    },
  },
};

module.exports = requestValidation;

const Joi = require('joi');

const requestValidation = {
  getRepos: {
    query: {
      name: Joi.string(),
    },
  },
  getRepo: {
    params: {
      id: Joi.string(),
    },
  },
};

module.exports = requestValidation;

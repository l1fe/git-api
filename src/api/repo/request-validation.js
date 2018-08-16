const Joi = require('joi');

const requestValidation = {
  getRepos: {
    query: {
      name: Joi.string(),
    },
  },
};

module.exports = requestValidation;

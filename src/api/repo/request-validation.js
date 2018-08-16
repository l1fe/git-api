const Joi = require('joi');

const requestValidation = {
  getRepos: {
    params: {
      q: Joi.string(),
    },
  },
};

module.exports = requestValidation;

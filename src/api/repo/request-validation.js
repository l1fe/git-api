const Joi = require('joi');

const requestValidation = {
  getRepos: {
    params: {
      name: Joi.string(),
    },
  },
};

module.exports = requestValidation;

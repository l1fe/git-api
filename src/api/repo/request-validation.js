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
      id: Joi.string().required(),
    },
  },
  updateRepo: {
    params: {
      id: Joi.string().required(),
    },
    body: {
      bookmarked: Joi.boolean().required(),
    },
  },
};

module.exports = requestValidation;

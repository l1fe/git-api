import Joi from 'joi';

const requestValidation = {
  getRepos: {
    params: {
      q: Joi.string(),
    },
  },
};

export default requestValidation;

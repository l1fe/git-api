import Joi from 'joi';

const requestValidation = {
  getRepos: {
    params: {
      name: Joi.string(),
    },
  },
};

export default requestValidation;

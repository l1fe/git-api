const Joi = require('joi');

const requestValidation = {
  getAllBookmarks: { },
  createBookmark: {
    body: {
      repoId: Joi.string().required(),
    },
  },
  getBookmark: {
    params: {
      id: Joi.string().required(),
    },
  },
  removeBookmark: {
    params: {
      id: Joi.string().required(),
    },
  },
};

export default requestValidation;

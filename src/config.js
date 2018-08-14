module.exports = {
  DEV_MODE: process.env.NODE_ENV === 'development',

  API_V1: '/crypto_api',
  API_PORT: process.env.API_PORT || 3000,
};

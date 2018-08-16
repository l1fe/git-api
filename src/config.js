module.exports = {
  DEV_MODE: process.env.NODE_ENV === 'development',
  GITHUB_API_ENABLED: process.env.GITHUB_API === 'github',

  GITHUB_API_URL: 'https://api.github.com',

  API_V1: '/api',
  API_PORT: process.env.API_PORT || 3000,
};

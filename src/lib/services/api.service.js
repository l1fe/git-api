const axios = require('axios');

const { GITHUB_API_URL, GITHUB_API_ENABLED } = require('../../config');
const mockData = require('../mock-data');

function apiService() {
  const mapMethods = { };
  const methods = ['get', 'post', 'patch', 'put', 'delete'];

  methods.forEach((method) => {
    mapMethods[method] = (endpoint, options = {}) => {
      const { body = {}, params = {}, headers = {} } = options;
      const path = endpoint;

      // return mocked data if GitHub API is disabled
      if (!GITHUB_API_ENABLED) {
        let resolvedData = { };

        if (path === `${GITHUB_API_URL}/repositories`) {
          resolvedData = mockData.allRepositories;
        } else if (path.startsWith(`${GITHUB_API_URL}/repositories/`)) {
          resolvedData = mockData.repository;
        } else if (path.startsWith(`${GITHUB_API_URL}/search/repositories`)) {
          resolvedData = mockData.searchRepositories;
        }

        return Promise.resolve(resolvedData);
      }

      if (['post', 'put', 'patch'].indexOf(method) !== -1) {
        return axios[method](path, body, {
          headers,
        });
      }

      return axios[method](path, {
        body,
        params,
        headers,
      });
    };
  });

  return mapMethods;
}

module.exports = apiService();

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
          const lastSlashIdx = path.lastIndexOf('/');
          const id = path.substr(lastSlashIdx);
          const item = mockData.allRepositories.data.search(entry => entry.id === id);
          if (item === -1) {
            return Promise.reject(new Error('Item not found'));
          }
          resolvedData = item;
        } else if (path.startsWith(`${GITHUB_API_URL}/search/repositories`)) {
          const plusCharIdx = params.q.indexOf('+');
          let searchName = params.q;
          if (plusCharIdx > 0) {
            searchName = params.q.substr(0, plusCharIdx);
          }
          resolvedData = {
            data: {
              items: mockData.allRepositories.data.filter(item => item.name.includes(searchName)),
            },
          };
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

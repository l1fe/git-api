const axios = require('axios');

function apiService() {
  const mapMethods = { };
  const methods = ['get', 'post', 'patch', 'put', 'delete'];

  methods.forEach((method) => {
    mapMethods[method] = (endpoint, options = {}) => {
      const { body = {}, params = {}, headers = {} } = options;
      const path = endpoint;

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

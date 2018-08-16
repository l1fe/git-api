const { GITHUB_API_URL } = require('../../config');
const apiService = require('./api.service');

function gitService() {
  // Encode git query
  const encodeGitQuery = (options) => {
    let query = options.name;
    Object.keys(options).forEach((key) => {
      if (options[key] && key !== 'name') {
        query += `+${key}:${options[key]}`;
      }
    });
    return query;
  };

  // Get repository by id
  const get = async (id) => {
    if (!id) {
      return Promise.reject(new Error('Repository id is not specified'));
    }
    const url = `${GITHUB_API_URL}/repositories/${id}`;
    try {
      const resp = await apiService.get(url);
      return resp;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  // Search for repositories with given params
  const search = async ({ name, language, stars } = { }) => {
    if (!name) {
      return Promise.reject(new Error('Search query is not specified'));
    }

    const url = `${GITHUB_API_URL}/search/repositories`;
    const query = encodeGitQuery({ name, language, stars });
    const params = { q: query };

    try {
      const resp = await apiService.get(url, { params });
      return resp;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return {
    get,
    search,
  };
}

module.exports = gitService();

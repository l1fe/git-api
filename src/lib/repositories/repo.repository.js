const Repo = require('../models/repo.model');
const gitService = require('../services/git.service');

// Repo Repository
function repoRepository() {
  // Create a new repo
  const create = function create() {
    return Promise.reject(new Error('Not implemented'));
  };

  // Remove a repo by id
  const remove = function remove() {
    return Promise.reject(new Error('Not implemented'));
  };

  // Remove all repos
  const clear = function clear() {
    return Promise.reject(new Error('Not implemented'));
  };

  // Get a repo by id
  const get = async function get({ id }) {
    try {
      const { name, language, starsCount } = await gitService.get(id);
      return new Repo({ id, name, language, starsCount });
    } catch (err) {
      return Promise.reject(err);
    }
  };

  // Search for a repo with a given query
  const search = async function search({ query }) {
    try {
      const repos = await gitService.search(query);
      return repos
        .slice(0, 5)
        .map(({ id, name, language, starsCount }) => (
          new Repo({ id, name, language, starsCount })
        ));
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return {
    create,
    get,
    search,
    remove,
    clear,
  };
}

module.exports = repoRepository();

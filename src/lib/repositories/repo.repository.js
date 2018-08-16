const Repo = require('../models/repo.model');
const gitService = require('../services/git.service');
const ramStorage = require('../ram-storage');

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

  // Get a repo by id (with in-memory caching)
  const get = async function get(repoId) {
    const savedRepo = ramStorage.get(repoId);
    if (!savedRepo) {
      try {
        const { id, name, language, stars } = await gitService.get(repoId);
        const repo = new Repo({ id, name, language, stars, bookmarked: false });
        ramStorage.addOrUpdate(id, repo);
        return repo;
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return savedRepo;
  };

  // Search for a repositories with given query options
  const search = async function filter(options) {
    try {
      const resp = await gitService.search(options);
      const repos = resp.map(({ id, name, language, stars }) => {
        // Get bookmarked status from in-memory storage
        const savedRepo = ramStorage.get(id);
        const bookmarked = savedRepo && savedRepo.bookmarked;
        return new Repo({ id, name, language, stars, bookmarked });
      });

      // Put those items into in-memory storage
      repos.forEach((repo) => {
        ramStorage.addOrUpdate(repo);
      });

      return repos;
    } catch (err) {
      return Promise.reject(new Error(err));
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

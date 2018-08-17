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
  const get = async function get(id) {
    const savedRepo = ramStorage.get(id);
    if (!savedRepo) {
      try {
        const { name, description, url } = await gitService.get(id);
        const repo = new Repo({ id, name, description, url, bookmarked: false });
        ramStorage.addOrUpdate(id, repo);
        return repo;
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return savedRepo;
  };

  // Update a repo by id
  const update = async function update(id, values) {
    let savedRepo = ramStorage.get(id);

    if (!savedRepo) {
      try {
        const { name, description, url } = await gitService.get(id);
        const repo = new Repo({ id, name, description, url, bookmarked: false, ...values });
        ramStorage.addOrUpdate(id, repo);
        return repo;
      } catch (err) {
        return Promise.reject(err);
      }
    }

    savedRepo = { ...savedRepo, ...values };
    ramStorage.addOrUpdate(id, savedRepo);

    return savedRepo;
  };

  // Search for a repositories with given query options
  const search = async function filter(options, showOnlyBookmarked) {
    try {
      const resp = await gitService.search(options);
      const repos = resp.map((item) => {
        // Get bookmarked status from in-memory storage
        const savedRepo = ramStorage.get(item.id);
        const bookmarked = !!(savedRepo && savedRepo.bookmarked);
        return new Repo({ ...item, bookmarked });
      });

      // Put those items into in-memory storage
      repos.forEach((repo) => {
        ramStorage.addOrUpdate(repo.id, repo);
      });

      if (showOnlyBookmarked) {
        return repos.filter(item => item.bookmarked);
      }

      return repos;
    } catch (err) {
      return Promise.reject(new Error(err));
    }
  };

  return {
    create,
    get,
    search,
    update,
    remove,
    clear,
  };
}

module.exports = repoRepository();

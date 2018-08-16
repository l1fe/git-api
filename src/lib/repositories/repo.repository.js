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
        const { name, language, stars } = await gitService.get(id);
        const repo = new Repo({ id, name, language, stars, bookmarked: false });
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
        const { name, language, stars } = await gitService.get(id);
        const repo = new Repo({ id, name, language, stars, bookmarked: false, ...values });
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
  const search = async function filter(options, showBookmarked) {
    try {
      const resp = await gitService.search(options);
      const repos = resp.map(({ id, name, language, stars }) => {
        // Get bookmarked status from in-memory storage
        const savedRepo = ramStorage.get(id);
        const bookmarked = !!(savedRepo && savedRepo.bookmarked);
        return new Repo({ id, name, language, stars, bookmarked });
      });

      // Put those items into in-memory storage
      repos.forEach((repo) => {
        ramStorage.addOrUpdate(repo.id, repo);
      });

      if (!options.name && showBookmarked) {
        // In case we don't have any options and just want to show only bookmarked ones
        // Check other elements that were cached before and not included in the current API call
        const reposIds = repos.map(({ id }) => id);
        const otherRepos = ramStorage.queryItems(item => (
          !reposIds.includes(item.id) && item.bookmarked
        ));
        const currentRepos = repos.filter(item => item.bookmarked);
        return [...currentRepos, ...otherRepos];
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

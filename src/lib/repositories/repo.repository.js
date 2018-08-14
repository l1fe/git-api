import Repo from '../models/repo.model';
import gitService from '../services/git.service';

// Repo Repository
function repoRepository() {
  // Create a new repository
  const create = async () => Promise.reject(new Error('Not allowed'));

  // Get a repository by id
  const get = async ({ id }) => {
    try {
      const { name, language, starsCount } = await gitService.get({ id });
      return new Repo({ id, name, language, starsCount });
    } catch (err) {
      return Promise.reject(err);
    }
  };

  // Search a repository with given name query
  const search = async ({ query }) => {
    try {
      const repos = await gitService.search({ query });
      return repos
        .slice(0, 5)
        .map(({ id, name, language, starsCount }) => (
          new Repo({ id, name, language, starsCount })
        ));
    } catch (err) {
      return Promise.reject(err);
    }
  };

  // Remove a repository by id
  const remove = async () => Promise.reject(new Error('Not allowed'));

  // Remove all repositories
  const clear = async () => Promise.reject(new Error('Not allowed'));

  return {
    create,
    get,
    search,
    remove,
    clear,
  };
}

export default repoRepository();

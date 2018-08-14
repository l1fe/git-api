import Repo from '../models/repo.model';
import gitService from '../services/git.service';

// Repo Repository
function RepoRepository() { }

// Create a new repo
RepoRepository.prototype.create = async function create() {
  return Promise.reject(new Error('Not allowed'));
};

// Remove a repo by id
RepoRepository.prototype.remove = async function remove() {
  return Promise.reject(new Error('Not allowed'));
};

// Remove all repos
RepoRepository.prototype.clear = async function clear() {
  return Promise.reject(new Error('Not allowed'));
};

// Get a repo by id
RepoRepository.prototype.get = async function get({ id }) {
  try {
    const { name, language, starsCount } = await gitService.get({ id });
    return new Repo({ id, name, language, starsCount });
  } catch (err) {
    return Promise.reject(err);
  }
};

// Search for a repo with a given query
RepoRepository.prototype.search = async function search({ query }) {
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

export default RepoRepository;

const repoRepository = require('../../lib/repositories/repo.repository');

function repoController() {
  // Get repos
  const getRepos = async function getRepos(req, res, next) {
    const { name } = req.query;

    try {
      const repos = await repoRepository.search({ name });
      return res.json(repos);
    } catch (err) {
      return next(err);
    }
  };

  // Get single repo
  const getRepo = async function getRepo(req, res, next) {
    const { id } = req.params;

    try {
      const repo = await repoRepository.get(id);
      return res.json(repo);
    } catch (err) {
      return next(err);
    }
  };

  return {
    getRepos,
    getRepo,
  };
}

module.exports = repoController();

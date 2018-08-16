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

  return {
    getRepos,
  };
}

module.exports = repoController();

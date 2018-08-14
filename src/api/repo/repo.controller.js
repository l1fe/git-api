import repoRepository from '../../lib/repositories/repo.repository';

// Get repos
async function getRepos(req, res, next) {
  const { q: query } = req.query;

  try {
    const repos = await repoRepository.search({ query });
    return res.json(repos);
  } catch (err) {
    return next(err);
  }
}

export default { getRepos };

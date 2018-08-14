import repoRepository from '../../lib/repositories/repo.repository';

// Get repos
async function getRepos(req, res, next) {
  const { name } = req.query;

  try {
    const repos = await repoRepository.search({ name });
    return res.json(repos);
  } catch (err) {
    return next(err);
  }
}

export default { getRepos };

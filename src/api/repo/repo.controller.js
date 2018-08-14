import GitService from '../../lib/services/git.service';

// Get repos
async function getRepos(req, res, next) {
  const { name } = req.query;

  try {
    const repos = await GitService.search({ name });
    return res.json(repos);
  } catch (err) {
    return next(err);
  }
}

export default { getRepos };

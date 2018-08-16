const repoRepository = require('./repo.repository');

function getRepositories() {
  const repos = {};

  const repositories = [
    { name: 'repo', source: repoRepository },
  ];

  repositories.forEach(({ name, source }) => {
    repos[name] = source;
  });

  return repos;
}

module.exports = getRepositories();

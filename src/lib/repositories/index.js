const repoRepository = require('./repo.repository');
const bookmarkRepository = require('./bookmark.repository');

function getRepositories() {
  const repos = {};

  const repositories = [
    { name: 'repo', source: repoRepository },
    { name: 'bookmark', source: bookmarkRepository },
  ];

  repositories.forEach(({ name, source }) => {
    repos[name] = source;
  });

  return repos;
}

module.exports = getRepositories();

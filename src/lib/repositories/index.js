import repoRepository from './repo.repository';
import bookmarkRepository from './bookmark.repository';

function repositoryFactory() {
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

export default repositoryFactory();

const repositoryMock = require('./repository.mock.json');
const allRepositoriesMock = require('./all-repositories.mock.json');
const searchRepositoriesMock = require('./search-repositories.mock.json');

function getMockData() {
  const mocks = {};

  const mocksArray = [
    { name: 'repository', source: repositoryMock },
    { name: 'allRepositories', source: allRepositoriesMock },
    { name: 'searchRepositories', source: searchRepositoriesMock },
  ];

  mocksArray.forEach(({ name, source }) => {
    mocks[name] = source;
  });

  return mocks;
}

module.exports = getMockData();

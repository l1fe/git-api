const { expect } = require('chai');

const Repo = require('../repo.model');

describe('Repo Model', () => {
  it('should construct valid model with given params', () => {
    const params = {
      id: 1,
      name: 'Repository',
      description: 'This is a simple description',
      bookmarked: true,
      url: 'https://github.com/l1fe/git-api',
    };
    const repo = new Repo(params);

    expect(repo.id).to.be.equal(params.id);
    expect(repo.name).to.be.equal(params.name);
    expect(repo.description).to.be.equal(params.description);
    expect(repo.bookmarked).to.be.equal(params.bookmarked);
    expect(repo.url).to.be.equal(params.url);
  });
});

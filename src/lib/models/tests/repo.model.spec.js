const { expect } = require('chai');

const Repo = require('../repo.model');

describe('Repo Model', () => {
  it('should construct valid model with given params', () => {
    const params = {
      id: 1,
      name: 'Repository',
      language: 'javascript',
      stars: 5,
      bookmarked: true,
    };
    const repo = new Repo(params);

    expect(repo.id).to.be.equal(params.id);
    expect(repo.name).to.be.equal(params.name);
    expect(repo.language).to.be.equal(params.language);
    expect(repo.stars).to.be.equal(params.stars);
    expect(repo.bookmarked).to.be.equal(params.bookmarked);
  });
});

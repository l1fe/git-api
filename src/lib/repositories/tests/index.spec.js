const { expect } = require('chai');

const repos = require('../');

describe('# getRepositories unit tests', () => {
  it('should contain accessible repoRepository', () => {
    expect(repos).to.have.property('repo').that.is.an('object');
    expect(repos.repo).to.have.property('create').that.is.a('function');
    expect(repos.repo).to.have.property('get').that.is.a('function');
    expect(repos.repo).to.have.property('search').that.is.a('function');
    expect(repos.repo).to.have.property('remove').that.is.a('function');
    expect(repos.repo).to.have.property('clear').that.is.a('function');
  });

  it('should contain accessible bookmarkRepository', () => {
    expect(repos).to.have.property('bookmark').that.is.an('object');
    expect(repos.bookmark).to.have.property('create').that.is.a('function');
    expect(repos.bookmark).to.have.property('get').that.is.a('function');
    expect(repos.bookmark).to.have.property('remove').that.is.a('function');
    expect(repos.bookmark).to.have.property('clear').that.is.a('function');
  });
});

const { expect } = require('chai');

const mockData = require('../');

describe('# getMocks unit tests', () => {
  it('should contain accessible mocks', () => {
    expect(mockData).to.have.property('repository').that.is.an('object');
    expect(mockData).to.have.property('allRepositories').that.is.an('object');
    expect(mockData).to.have.property('searchRepositories').that.is.an('object');
  });

  it('should be axios-response-like', () => {
    expect(mockData.repository).to.have.property('data').that.is.an('object');
    expect(mockData.allRepositories).to.have.property('data').that.is.an('array');
    expect(mockData.searchRepositories).to.have.property('data').that.is.an('object');
    expect(mockData.searchRepositories.data).to.have.property('items').that.is.an('array');
  });
});

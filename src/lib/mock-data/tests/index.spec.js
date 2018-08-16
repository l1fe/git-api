const { expect } = require('chai');

const mockData = require('../');

describe('# getMocks unit tests', () => {
  it('should contain accessible mocks', () => {
    expect(mockData).to.have.property('repository').that.is.an('object');
    expect(mockData).to.have.property('allRepositories').that.is.an('array');
    expect(mockData).to.have.property('searchRepositories').that.is.an('object');
  });
});

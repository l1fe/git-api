const { expect } = require('chai');

const services = require('../');

describe('# getServices unit tests', () => {
  it('should contain accessible gitService', () => {
    expect(services).to.have.property('git').that.is.an('object');
    expect(services.git).to.have.property('get').that.is.a('function');
    expect(services.git).to.have.property('search').that.is.a('function');
  });

  it('should contain accessible apiService', () => {
    expect(services).to.have.property('api').that.is.an('object');
    expect(services.api).to.have.property('get').that.is.a('function');
    expect(services.api).to.have.property('post').that.is.a('function');
    expect(services.api).to.have.property('patch').that.is.a('function');
    expect(services.api).to.have.property('put').that.is.a('function');
    expect(services.api).to.have.property('delete').that.is.a('function');
  });
});

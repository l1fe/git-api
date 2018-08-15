const { expect } = require('chai');

const services = require('../');

describe('# getServices unit tests', () => {
  it('should contain accessible gitService', () => {
    expect(services).to.have.property('git').that.is.an('object');
    expect(services.git).to.have.property('get').that.is.a('function');
    expect(services.git).to.have.property('search').that.is.a('function');
  });
});

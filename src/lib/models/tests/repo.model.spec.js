import { expect } from 'chai';

import Repo from '../repo.model';

describe('Repo Model', () => {
  it('should construct valid model with given params', () => {
    const params = { id: 1, name: 'Repository', language: 'javascript', starsCount: 5 };
    const repo = new Repo(params);

    expect(repo.id).to.be.equal(params.id);
    expect(repo.name).to.be.equal(params.name);
    expect(repo.language).to.be.equal(params.language);
    expect(repo.starsCount).to.be.equal(params.starsCount);
  });
});

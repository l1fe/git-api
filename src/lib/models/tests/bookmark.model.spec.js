import { expect } from 'chai';

import Bookmark from '../bookmark.model';

describe('Bookmark Model', () => {
  it('should construct valid model with given params', () => {
    const params = { id: 1, repoId: 25 };
    const bookmark = new Bookmark(params);

    expect(bookmark.id).to.be.equal(params.id);
    expect(bookmark.repoId).to.be.equal(params.repoId);
  });
});

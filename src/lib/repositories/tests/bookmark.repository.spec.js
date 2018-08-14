import { expect } from 'chai';

import ramStorage from '../../ram-storage';
import BookmarkRepository from '../bookmark.repository';

describe('# Bookmark Repository Tests', () => {
  let bookmarkRepository;

  beforeEach(() => {
    bookmarkRepository = new BookmarkRepository({ storage: ramStorage });
  });

  afterEach(() => {
    bookmarkRepository.clear();
  });

  it('should create a valid bookmark with given params', async () => {
    const params = { repoId: 25 };
    const bookmark = await bookmarkRepository.create(params);

    expect(bookmark).to.be.an('object');
    expect(bookmark.id).to.be.a('string');
    expect(bookmark.repoId).to.be.equal(params.repoId);
  });
});

import request from 'supertest';
import { expect } from 'chai';
import httpStatus from 'http-status';

import { API_V1 } from '../../config';
import app from '../../app';

describe('# Repo API', () => {
  describe('Get All Repos', () => {
    it('should search available repos', (done) => {
      const name = 'tetris';
      const url = `${API_V1}/repos?name=${name}`;
      request(app)
        .get(url)
        .expect(httpStatus.OK)
        .then((resp) => {
          const repos = resp.body;
          expect(repos).to.have.lengthOf(5);
          done();
        })
        .catch(done);
    });
  });
});

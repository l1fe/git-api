import fetch from 'node-fetch';
import querystring from 'querystring';

import { GITHUB_API_URL } from '../../config';

function gitService() {
  // Get repository by id
  const get = async ({ id }) => {
    if (!id) {
      return Promise.reject(new Error('Repository id is not specified'));
    }
    const url = `${GITHUB_API_URL}/repositories/${id}`;

    try {
      const data = await fetch(url);
      const repo = await data.json();
      return repo;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  // Search for repositories with given params
  const search = async ({ query }) => {
    if (!query) {
      return Promise.reject(new Error('Search query is not specified'));
    }

    const queryParams = querystring.stringify({ q: query });
    const url = `${GITHUB_API_URL}/search/repositories?${queryParams}`;

    try {
      const data = await fetch(url);
      const repos = await data.json();
      return repos.items;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return {
    get,
    search,
  };
}

export default gitService();

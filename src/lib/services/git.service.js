import fetch from 'node-fetch';
import querystring from 'querystring';

import { GITHUB_API_URL } from '../../config';

function gitService() {
  // Search for repositories with given params
  const search = async ({ name }) => {
    if (!name) {
      return Promise.reject(new Error('Please specify the repository name'));
    }

    const queryParams = querystring.stringify({ q: name });
    const url = `${GITHUB_API_URL}/repositories?${queryParams}`;

    try {
      const data = await fetch(url);
      const repos = await data.json();
      return repos;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return {
    search,
  };
}

export default gitService();

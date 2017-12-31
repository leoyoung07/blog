'use strict';
import axios from 'axios';
const allClosedIssuesUrl = 'https://api.github.com/repos/leoyoung07/blog/issues?state=closed';

export default class GitHubApiService {
  static fetchIssues (options) {
    return new Promise((resolve, reject) => {
      axios
        .get(allClosedIssuesUrl)
        .then(response => {
          resolve(response.data);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
};

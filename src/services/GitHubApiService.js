'use strict';
import axios from 'axios';
import GitHubIssue from '../models/GitHubIssue';
import RenderService from './RenderService';

const allClosedIssuesUrl = 'https://api.github.com/repos/leoyoung07/blog/issues?state=closed';

export default class GitHubApiService {
  static fetchIssues (options) {
    return new Promise((resolve, reject) => {
      axios
        .get(allClosedIssuesUrl)
        .then(response => {
          const issues = [];
          response.data.forEach(o => {
            const issue = new GitHubIssue();
            issue.url = o.url;
            issue.repositoryUrl = o.repository_url;
            issue.labelsUrl = o.labels_url;
            issue.commentsUrl = o.comments_url;
            issue.eventsUrl = o.events_url;
            issue.htmlUrl = o.html_url;
            issue.id = o.id;
            issue.number = o.number;
            issue.title = o.title;
            issue.labels = o.labels;
            issue.state = o.state;
            issue.milestone = o.milestone;
            issue.comments = o.comments;
            issue.createdAt = o.created_at;
            issue.updatedAt = o.updated_at;
            issue.closedAt = o.closed_at;
            issue.body = o.body;
            issue.summary = RenderService.getSummary(o.body, 300);
            issues.push(issue);
          });
          resolve(issues);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  static getLabelHtmlUrl (label) {
    return 'https://github.com/leoyoung07/blog/issues/?q=is%3Aclosed+label%3A' + label;
  }
};

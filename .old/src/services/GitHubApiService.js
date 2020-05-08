'use strict';
import axios from 'axios';
import RenderService from './RenderService';
import Util from '../util/util';

const allClosedIssuesUrl = 'https://api.github.com/repos/leoyoung07/blog/issues?state=closed&assignee=leoyoung07';
const publicEventsUrl = 'https://api.github.com/users/leoyoung07/events';
const githubRootUrl = 'https://github.com/';
const cache = {};

export default class GitHubApiService {
  static fetchIssues (options) {
    return new Promise((resolve, reject) => {
      if (cache['allClosedIssues']) {
        resolve(cache['allClosedIssues']);
        return;
      }
      axios
        .get(allClosedIssuesUrl)
        .then(response => {
          const issues = [];
          response.data.forEach(o => {
            const issue = {};
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
            issue.createdAt = Util.getLocalDateTime(o.created_at);
            issue.updatedAt = Util.getLocalDateTime(o.updated_at);
            issue.closedAt = Util.getLocalDateTime(o.closed_at);
            issue.body = o.body;
            issue.summary = RenderService.getSummary(o.body, 300);
            issue.newCommentUrl = o.html_url + '#new_comment_field';
            issues.push(issue);
          });
          cache['allClosedIssues'] = issues;
          resolve(issues);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  static fetchPublicEvents () {
    return new Promise((resolve, reject) => {
      if (cache['publicEvents']) {
        resolve(cache['publicEvents']);
        return;
      }
      axios
        .get(publicEventsUrl)
        .then(response => {
          const events = [];
          response.data.forEach(e => {
            if (e.type === 'PushEvent') {
              events.push({
                title: 'Commits',
                dateTime: Util.getLocalDateTime(e.created_at),
                detail: `Pushed ${e.payload.size} commits to repo ${e.repo.name}.`,
                htmlUrl: `${githubRootUrl}${e.repo.name}`
              });
            }
            if (e.type === 'IssuesEvent') {
              events.push({
                title: 'Issues',
                dateTime: Util.getLocalDateTime(e.created_at),
                detail: `${e.payload.action} ${e.payload.issue.title} on repo ${e.repo.name}`,
                htmlUrl: e.payload.issue.html_url
              });
            }
            cache['publicEvents'] = events;
            resolve(events);
          });
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  static getLabelHtmlUrl (label) {
    label = encodeURIComponent(label);
    return `https://github.com/leoyoung07/blog/issues/?q=is%3Aclosed+label%3A${label}`;
  }

  static get closedMilestonesHtmlUrl () {
    return 'https://github.com/leoyoung07/blog/milestones?state=closed';
  }

  static get labelsHtmlUrl () {
    return 'https://github.com/leoyoung07/blog/labels';
  }

  static get githubUserHtmlUrl () {
    return 'https://github.com/leoyoung07';
  }

  static get allClosedIssuesHtmlUrl () {
    return 'https://github.com/leoyoung07/blog/issues?q=is%3Aissue+is%3Aclosed';
  }

  static getIssueSearchHtmlUrl (keyword) {
    keyword = encodeURIComponent(keyword);
    return `https://github.com/leoyoung07/blog/issues?utf8=%E2%9C%93&q=is%3Aclosed+assignee%3Aleoyoung07+${keyword}`;
  }

  static get userAvatarUrl () {
    return 'https://avatars1.githubusercontent.com/u/8199708?v=4';
  }
};

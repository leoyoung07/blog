import { Injectable } from '@angular/core';
import axios from 'axios';
import { RenderService } from './render.service';
import Util from '../util/util';
import { GithubIssue } from '../models/github-issue';

const allClosedIssuesUrl = 'https://leo-blog-api.azurewebsites.net/blog/list';
const publicEventsUrl = 'https://api.github.com/users/leoyoung07/events';
const githubRootUrl = 'https://github.com/';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private renderService: RenderService) {}

  async fetchIssues(params?: any) {
    const response = await axios.get(allClosedIssuesUrl, { params });
    const issues: GithubIssue[] = response.data.map((o) => {
      const issue: GithubIssue = {
        ...o,
        summary: this.renderService.getSummary(o.body, 300),
        newCommentUrl: o.htmlUrl + '#new_comment_field',
      };
      return issue;
    });
    return issues;
  }

  fetchPublicEvents() {
    return new Promise((resolve, reject) => {
      axios
        .get(publicEventsUrl)
        .then((response) => {
          const events = [];
          response.data.forEach((e) => {
            if (e.type === 'PushEvent') {
              events.push({
                title: 'Commits',
                dateTime: Util.getLocalDateTime(e.created_at),
                detail: `Pushed ${e.payload.size} commits to repo ${e.repo.name}.`,
                htmlUrl: `${githubRootUrl}${e.repo.name}`,
              });
            }
            if (e.type === 'IssuesEvent') {
              events.push({
                title: 'Issues',
                dateTime: Util.getLocalDateTime(e.created_at),
                detail: `${e.payload.action} ${e.payload.issue.title} on repo ${e.repo.name}`,
                htmlUrl: e.payload.issue.html_url,
              });
            }
            resolve(events);
          });
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  getLabelHtmlUrl(label) {
    label = encodeURIComponent(label);
    return `https://github.com/leoyoung07/blog/issues/?q=is%3Aclosed+label%3A${label}`;
  }

  get closedMilestonesHtmlUrl() {
    return 'https://github.com/leoyoung07/blog/milestones?state=closed';
  }

  get labelsHtmlUrl() {
    return 'https://github.com/leoyoung07/blog/labels';
  }

  get githubUserHtmlUrl() {
    return 'https://github.com/leoyoung07';
  }

  get allClosedIssuesHtmlUrl() {
    return 'https://github.com/leoyoung07/blog/issues?q=is%3Aissue+is%3Aclosed';
  }

  getIssueSearchHtmlUrl(keyword) {
    keyword = encodeURIComponent(keyword);
    return `https://github.com/leoyoung07/blog/issues?utf8=%E2%9C%93&q=is%3Aclosed+assignee%3Aleoyoung07+${keyword}`;
  }

  get userAvatarUrl() {
    return 'https://avatars1.githubusercontent.com/u/8199708?v=4';
  }
}

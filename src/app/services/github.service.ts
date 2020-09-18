import { Injectable } from '@angular/core';
import axios from 'axios';
import { RenderService } from './render.service';
import Util from '../util/util';
import { GithubIssue } from '../models/github-issue';

const allClosedIssuesUrl = 'https://leo-blog-api.azurewebsites.net/blog/list';
const publicEventsUrl = 'https://api.github.com/users/leoyoung07/events';
const githubRootUrl = 'https://github.com/';
const cache: { allClosedIssues?: GithubIssue[]; [key: string]: any } = {};

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private renderService: RenderService) {}

  async fetchIssues() {
    if (cache.allClosedIssues) {
      return cache.allClosedIssues;
    } else {
      const response = await axios.get(allClosedIssuesUrl);
      const issues: GithubIssue[] = response.data.map((o) => {
        const issue: GithubIssue = {
          url: o.url,
          repositoryUrl: o.repository_url,
          labelsUrl: o.labels_url,
          commentsUrl: o.comments_url,
          eventsUrl: o.events_url,
          htmlUrl: o.html_url,
          id: o.id,
          number: o.number,
          title: o.title,
          labels: o.labels,
          state: o.state,
          milestone: o.milestone,
          comments: o.comments,
          createdAt: Util.getLocalDateTime(o.created_at),
          updatedAt: Util.getLocalDateTime(o.updated_at),
          closedAt: Util.getLocalDateTime(o.closed_at),
          body: o.body,
          summary: this.renderService.getSummary(o.body, 300),
          newCommentUrl: o.html_url + '#new_comment_field',
        };
        return issue;
      });
      cache.allClosedIssues = issues;
      return issues;
    }
  }

  fetchPublicEvents() {
    return new Promise((resolve, reject) => {
      if (cache.publicEvents) {
        resolve(cache.publicEvents);
        return;
      }
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
            cache.publicEvents = events;
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
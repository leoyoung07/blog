import { Injectable } from '@angular/core';
import axios from 'axios';
import { RenderService } from './render.service';
import Util from '../util/util';
import { GithubIssue, IssueLabel, IssueMilestone } from '../models/github-issue';

const blogApiUrl = 'https://leo-blog-api.azurewebsites.net/blog/list';
const tagApiUrl = 'https://leo-blog-api.azurewebsites.net/label/list';
const archiveApiUrl = 'https://leo-blog-api.azurewebsites.net/milestone/list';
const githubRootUrl = 'https://github.com/';
const githubBlogRepoUrl = 'https://github.com/leoyoung07/blog';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private renderService: RenderService) {}

  async fetchBlogs(params?: any) {
    const response = await axios.get(blogApiUrl, { params });
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

  async fetchTags(params?: any) {
    const response = await axios.get(tagApiUrl, { params });
    const tags: IssueLabel[] = response.data.map((o) => {
      const tag: IssueLabel = {
        ...o,
      };
      return tag;
    });
    return tags;
  }

  async fetchArchives(params?: any) {
    const response = await axios.get(archiveApiUrl, { params });
    const tags: IssueMilestone[] = response.data.map((o) => {
      const tag: IssueMilestone = {
        ...o,
      };
      return tag;
    });
    return tags;
  }

  getLabelHtmlUrl(label: string) {
    label = encodeURIComponent(label);
    return `https://github.com/leoyoung07/blog/issues/?q=is%3Aissue+is%3Aclosed+label%3A${label}+assignee%3Aleoyoung07`;
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

  getIssueSearchHtmlUrl(keyword: string) {
    keyword = encodeURIComponent(keyword);
    return `https://github.com/leoyoung07/blog/issues?utf8=%E2%9C%93&q=is%3Aclosed+assignee%3Aleoyoung07+${keyword}`;
  }

  get userAvatarUrl() {
    return 'https://avatars1.githubusercontent.com/u/8199708?v=4';
  }

  get blogRepoUrl() {
    return githubBlogRepoUrl;
  }
}

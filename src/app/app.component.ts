import { Component, OnInit } from '@angular/core';
import { GithubService } from './services/github.service';
import { GithubIssue, IssueLabel, IssueMilestone } from './models/github-issue';
import { MatSnackBar } from '@angular/material/snack-bar';
import Util from './util/util';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private githubService: GithubService,
    private snackBar: MatSnackBar
  ) {}

  public title = `Leo Young's Blog`;
  public blogs: GithubIssue[] = [];
  public tags: IssueLabel[] = [];

  public archives: IssueMilestone[] = [];

  public loading = false;

  public searchKeyword = '';

  public selectedTabIndex = 0;

  /**
   * getGithubIssues
   */
  public async getBlogs() {
    try {
      this.loading = true;
      this.blogs = await this.githubService.fetchBlogs({
        q: this.searchKeyword,
      });
    } catch (error) {
      console.error(error);
      this.snackBar.open(error, 'OK', {
        duration: 5000,
      });
    } finally {
      this.loading = false;
    }
  }

  public async getTags() {
    try {
      this.loading = true;
      this.tags = await this.githubService.fetchTags();
    } catch (error) {
      console.error(error);
      this.snackBar.open(error, 'OK', {
        duration: 5000,
      });
    } finally {
      this.loading = false;
    }
  }

  public async getArchives() {
    try {
      this.loading = true;
      this.archives = await this.githubService.fetchArchives();
    } catch (error) {
      console.error(error);
      this.snackBar.open(error, 'OK', {
        duration: 5000,
      });
    } finally {
      this.loading = false;
    }
  }

  /**
   * onSearchKeyword
   */
  public async onSearchKeyword() {
    this.selectedTabIndex = 0;
    await this.getBlogs();
  }

  /**
   * onViewBlogDetail
   */
  public onViewBlogDetail(issue: GithubIssue) {
    Util.navTo(issue.htmlUrl);
  }

  /**
   * onSelectedTabChange
   */
  public async onSelectedTabChange(e: MatTabChangeEvent) {
    if (e.index === 0) {
      await this.getBlogs();
    } else if (e.index === 1) {
      await this.getTags();
    } else if (e.index === 2) {
      await this.getArchives();
    } else {
    }
  }

  /**
   * onTagSelected
   */
  public onTagClick(e: IssueLabel) {
    Util.navTo(this.githubService.getLabelHtmlUrl(e.name));
  }

  public onArchiveClick(e: IssueMilestone) {
    Util.navTo(`${e.htmlUrl}?closed=1`);
  }

  /**
   * onGithubIconClick
   */
  public onGithubIconClick() {
    Util.navTo(this.githubService.blogRepoUrl);
  }
  ngOnInit(): void {
    this.getBlogs();
  }
}

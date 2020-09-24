import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GithubService } from './services/github.service';
import { GithubIssue } from './models/github-issue';
import { MatSnackBar } from '@angular/material/snack-bar';
import Util from './util/util';

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
  public githubIssues: GithubIssue[] = [];

  public loading = false;

  public searchKeyword = '';

  /**
   * getGithubIssues
   */
  public async getGithubIssues() {
    try {
      this.loading = true;
      this.githubIssues = await this.githubService.fetchIssues({
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

  /**
   * onSearchKeyword
   */
  public async onSearchKeyword() {
    await this.getGithubIssues();
  }

  /**
   * onViewBlogDetail
   */
  public onViewBlogDetail(issue: GithubIssue) {
    Util.navTo(issue.htmlUrl);
  }
  ngOnInit(): void {
    this.getGithubIssues();
  }
}

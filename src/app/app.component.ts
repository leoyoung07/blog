import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
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
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private githubService: GithubService,
    private snackBar: MatSnackBar
  ) {
    this.iconRegistry.addSvgIcon(
      'github-circle-white-transparent',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'assets/img/github-circle-white-transparent.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'numeric-7-box',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'assets/img/numeric-7-box.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'numeric-7-circle',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'assets/img/numeric-7-circle.svg'
      )
    );
  }

  public title = `Leo Young's Blog`;
  public githubIssues: GithubIssue[] = [];

  public loading = false;

  public searchKeyword = '';

  public showSearchBar = false;

  @ViewChild('searchInput') searchInput: ElementRef;

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
   * clearSearchKeyword
   */
  public clearSearchKeyword() {
    this.searchKeyword = '';
  }

  /**
   * onSearchIconClick
   */
  public onSearchIconClick() {
    if (!this.showSearchBar) {
      this.showSearchBar = true;
      setTimeout(() => {
        // this will make the execution after the above boolean has changed
        this.searchInput.nativeElement.focus();
      }, 0);
    } else {
      this.onSearchKeyword();
    }
  }

  /**
   * onCloseSearchBar
   */
  public async onCloseSearchBar() {
    this.clearSearchKeyword();
    this.showSearchBar = false;
    await this.onSearchKeyword();
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

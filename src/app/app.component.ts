import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { GithubService } from './services/github.service';
import { GithubIssue } from './models/github-issue';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  /**
   * getGithubIssues
   */
  public async getGithubIssues() {
    try {
      this.loading = true;
      this.githubIssues = await this.githubService.fetchIssues();
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
   * clearSearchKeyword
   */
  public clearSearchKeyword() {
    this.searchKeyword = '';
  }
  ngOnInit(): void {
    this.getGithubIssues();
  }
}

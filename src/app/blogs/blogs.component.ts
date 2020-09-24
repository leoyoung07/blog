import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GithubIssue } from '../models/github-issue';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
  @Input() public githubIssues: GithubIssue[];

  @Output() viewBlogDetail = new EventEmitter<GithubIssue>();
  constructor() {}

  ngOnInit(): void {}

  /**
   * onViewBlogDetail
   */
  public onViewBlogDetail(issue: GithubIssue) {
    this.viewBlogDetail.emit(issue);
  }
}

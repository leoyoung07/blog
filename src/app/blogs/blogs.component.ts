import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GithubIssue, IssueLabel } from '../models/github-issue';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
  @Input() public blogs: GithubIssue[];

  @Output() viewBlogDetail = new EventEmitter<GithubIssue>();
  @Output() tagClick = new EventEmitter<IssueLabel>();
  constructor() {}

  ngOnInit(): void {}

  /**
   * onViewBlogDetail
   */
  public onViewBlogDetail(issue: GithubIssue) {
    this.viewBlogDetail.emit(issue);
  }

  /**
   * onTagClick
   */
  public onTagClick(label: IssueLabel) {
    this.tagClick.emit(label);
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IssueLabel } from '../models/github-issue';
import { MatChipSelectionChange } from '@angular/material/chips';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  @Input() public tags: IssueLabel[] = [];

  @Output() public tagClick = new EventEmitter<IssueLabel>();

  constructor() {}

  /**
   * onChipSelectionChange
   */
  public onChipClick(tag: IssueLabel) {
    this.tagClick.emit(tag);
  }

  ngOnInit(): void {}
}

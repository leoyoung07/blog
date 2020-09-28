import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IssueMilestone } from '../models/github-issue';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.scss']
})
export class ArchivesComponent implements OnInit {

  @Input() public archives: IssueMilestone[] = [];

  @Output() public archiveClick = new EventEmitter<IssueMilestone>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * onChipClick
   */
  public onChipClick(archive: IssueMilestone) {
    this.archiveClick.emit(archive);
  }

}

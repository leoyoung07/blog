import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() public title = '';

  @Input() public keyword = '';

  @Output() public keywordChange = new EventEmitter<string>();

  @Output() public search = new EventEmitter<string>();

  public showSearchBar = false;

  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
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

  ngOnInit(): void {}

  /**
   * onSearchKeyword
   */
  public onSearchKeyword() {
    this.search.emit(this.keyword);
  }

  /**
   * onCloseSearchBar
   */
  public async onCloseSearchBar() {
    this.clearSearchKeyword();
    this.showSearchBar = false;
    this.onSearchKeyword();
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
   * clearSearchKeyword
   */
  public clearSearchKeyword() {
    this.keyword = '';
    this.keywordChange.emit(this.keyword);
  }
}

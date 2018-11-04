import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-user-list-chevron',
  templateUrl: './chevron.component.html',
  styleUrls: ['./chevron.component.scss']
})
export class ChevronComponent implements OnInit {
  @Input() isDropdownHidden = true;
  @Output() isDropdownHiddenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
  ) {
  }

  ngOnInit() {
  }

  toggleDropdown() {
    this.isDropdownHiddenChange.emit(!this.isDropdownHidden);
  }
}

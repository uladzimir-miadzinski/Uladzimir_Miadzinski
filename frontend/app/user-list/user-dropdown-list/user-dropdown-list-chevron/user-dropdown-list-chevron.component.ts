import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-dropdown-list-chevron',
  templateUrl: './user-dropdown-list-chevron.component.html',
  styleUrls: ['./user-dropdown-list-chevron.component.scss']
})
export class UserDropdownListChevronComponent implements OnInit {
  @Input()
  dropdownHidden!: boolean;

  @Output()
  dropdownHiddenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.dropdownHidden = !this.dropdownHidden;
    this.dropdownHiddenChange.emit(this.dropdownHidden);
    console.log(this.dropdownHidden);
  }
}

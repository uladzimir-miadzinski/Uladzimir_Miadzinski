import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../user-service.interface';

@Component({
  selector: 'app-search-results-item',
  templateUrl: './search-results-item.component.html',
  styleUrls: ['./search-results-item.component.scss']
})
export class SearchResultsItemComponent implements OnInit {
  @Input() user!: User;
  @Output() selectedUserChange: EventEmitter<User> = new EventEmitter<User>();

  constructor(
  ) {
  }

  ngOnInit() {
  }

  changeSelectedUser() {
    this.selectedUserChange.emit(this.user);
  }
}

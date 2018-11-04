import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../user-service.interface';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  @Input() users?: User[];
  @Output() selectedUserChange: EventEmitter<User> = new EventEmitter<User>();

  constructor(
  ) {
  }

  ngOnInit() {
  }

  onSelectedUserChange(user: User) {
    this.selectedUserChange.emit(user);
  }

}

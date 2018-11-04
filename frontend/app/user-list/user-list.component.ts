import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { User } from './user-service.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnChanges {
  isDropdownHidden = true;
  selectedUser?: User;

  @Output() selectedUserChange: EventEmitter<User> = new EventEmitter<User>();

  constructor(
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  closeDropdown() {
    this.isDropdownHidden = true;
  }

  onSelectedUserChange(user: User) {
    this.selectedUser = user;
    this.selectedUserChange.emit(this.selectedUser);
    this.closeDropdown();
  }
}

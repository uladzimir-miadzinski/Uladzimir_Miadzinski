import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from './user-service.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  isDropdownHidden = true;

  @Input() selectedUser?: User;
  @Output() selectedUserChange: EventEmitter<User> = new EventEmitter<User>();

  constructor(
  ) {
  }

  ngOnInit() {
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

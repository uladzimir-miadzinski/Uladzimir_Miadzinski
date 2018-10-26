import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../services/auth.service';

@Component({
  selector: 'app-user-dropdown-item',
  templateUrl: './user-dropdown-item.component.html',
  styleUrls: ['./user-dropdown-item.component.scss']
})
export class UserDropdownItemComponent implements OnInit {
  @Input()
  public user!: User;
  @Input()
  public selectedUser!: User;

  @Output()
  public selectedUserChange: EventEmitter<User> = new EventEmitter<User>();

  constructor() {
  }

  ngOnInit() {

  }

  selectUser() {
    this.selectedUserChange.emit(this.user);
  }

}

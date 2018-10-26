import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-dropdown-list',
  templateUrl: './user-dropdown-list.component.html',
  styleUrls: ['./user-dropdown-list.component.scss']
})
export class UserDropdownListComponent implements OnInit, OnChanges {

  public users!: User[];
  public selectedUser?: User;
  public dropdownHidden = true;

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  onSelectedUserChange(user: User) {
    this.selectedUser = user;
    this.dropdownHidden = true;
  }
}

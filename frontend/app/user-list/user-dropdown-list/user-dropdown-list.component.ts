import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../user-service.interface';
import { DropdownUserService } from '../dropdown-user.service';

@Component({
  selector: 'app-user-dropdown-list',
  templateUrl: './user-dropdown-list.component.html',
  styleUrls: ['./user-dropdown-list.component.scss']
})
export class UserDropdownListComponent implements OnInit, OnChanges {

  users!: User[];
  selectedUser?: User;
  dropdownHidden = true;

  constructor(
    private userService: UserService,
    private dropdownUserService: DropdownUserService,
  ) {
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });

    this.dropdownUserService.currDropdownHidden.subscribe((isHidden: boolean) => this.dropdownHidden = isHidden);
  }

  ngOnChanges(changes: SimpleChanges) {
  }
}

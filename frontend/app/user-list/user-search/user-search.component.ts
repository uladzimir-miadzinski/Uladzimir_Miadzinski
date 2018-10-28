import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../services/auth.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  users?: User[];
  name = '';

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {
  }

  search() {
    this.userService.getUsersByName(this.name).subscribe((users: User[]) => {
      this.users = users;
    });
  }
}

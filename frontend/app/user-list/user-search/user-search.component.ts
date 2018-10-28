import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../user-service.interface';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  users?: User[];
  name = '';

  @Input() dropdownHidden!: boolean;

  @Output() dropdownHiddenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.search();
  }

  searchOnEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.search();
      event.preventDefault();
    }
  }

  search() {
    this.userService.getUsersByName(this.name).subscribe((users: User[]) => {
      this.users = users;
    });
  }
}

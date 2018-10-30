import { Component, OnInit } from '@angular/core';
import { User } from '../user-service.interface';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  users$!: Observable<User[]>;
  name = '';

  constructor(
    private userService: UserService
  ) {
    this.search();
  }

  ngOnInit() {
  }

  searchOnEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.search();
      event.preventDefault();
    }
  }

  search() {
    this.users$ = this.userService.getUsersByName(this.name);
  }
}

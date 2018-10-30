import { Component, OnInit } from '@angular/core';
import { DropdownUserService } from './dropdown-user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  isDropdownHidden$!: Observable<boolean>;

  constructor(
    private dropdownUserService: DropdownUserService
  ) {
  }

  ngOnInit() {
    this.isDropdownHidden$ = this.dropdownUserService.isDropdownHidden$;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { DropdownUserService } from '../dropdown-user.service';
import { User } from '../user-service.interface';

@Component({
  selector: 'app-user-list-chosen',
  templateUrl: './user-chosen.component.html',
  styleUrls: ['./user-chosen.component.scss']
})
export class UserChosenComponent implements OnInit {
  @Input() selectedUser?: User;

  constructor(
    private dropdownUserService: DropdownUserService
  ) {
  }

  ngOnInit() {
    this.dropdownUserService.getCurrentUser$.subscribe((user: User | undefined) => this.selectedUser = user);
  }

  openList() {
    this.dropdownUserService.toggleDropdown();
  }

}

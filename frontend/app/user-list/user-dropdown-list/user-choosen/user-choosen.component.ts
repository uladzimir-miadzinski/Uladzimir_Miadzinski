import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../user-service.interface';
import { DropdownUserService } from '../../dropdown-user.service';

@Component({
  selector: 'app-user-choosen',
  templateUrl: './user-choosen.component.html',
  styleUrls: ['./user-choosen.component.scss']
})
export class UserChoosenComponent implements OnInit {
  @Input() selectedUser?: User;

  constructor(
    private dropdownUserService: DropdownUserService
  ) {
  }

  ngOnInit() {
    this.dropdownUserService.currUser.subscribe((user: User | undefined) => this.selectedUser = user);
  }

  openList() {
    this.dropdownUserService.toggleDropdown();
  }

}

import { Component, OnInit } from '@angular/core';
import { DropdownUserService } from '../../dropdown-user.service';

@Component({
  selector: 'app-user-dropdown-list-chevron',
  templateUrl: './user-dropdown-list-chevron.component.html',
  styleUrls: ['./user-dropdown-list-chevron.component.scss']
})
export class UserDropdownListChevronComponent implements OnInit {

  constructor(
    private dropdownUserService: DropdownUserService
  ) { }

  ngOnInit() {
  }

  openList() {
    this.dropdownUserService.toggleDropdown();
  }
}

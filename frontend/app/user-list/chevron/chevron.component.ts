import { Component, OnInit } from '@angular/core';
import { DropdownUserService } from '../dropdown-user.service';


@Component({
  selector: 'app-user-list-chevron',
  templateUrl: './chevron.component.html',
  styleUrls: ['./chevron.component.scss']
})
export class ChevronComponent implements OnInit {

  constructor(
    private dropdownUserService: DropdownUserService
  ) {
  }

  ngOnInit() {
  }

  toggleOptions() {
    this.dropdownUserService.toggleDropdown();
  }
}

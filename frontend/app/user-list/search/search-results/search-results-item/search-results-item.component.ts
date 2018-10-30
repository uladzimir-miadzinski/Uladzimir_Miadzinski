import { Component, Input, OnInit} from '@angular/core';
import { DropdownUserService } from '../../../dropdown-user.service';
import { User } from '../../../user-service.interface';

@Component({
  selector: 'app-search-results-item',
  templateUrl: './search-results-item.component.html',
  styleUrls: ['./search-results-item.component.scss']
})
export class SearchResultsItemComponent implements OnInit {
  @Input() user!: User;

  constructor(
    private dropdownUserService: DropdownUserService
  ) {
  }

  ngOnInit() {
  }

  changeSelectedUser() {
    this.dropdownUserService.changeUser(this.user);
    this.dropdownUserService.toggleDropdown();
  }
}

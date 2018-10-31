import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user-list/user-service.interface';
import { DropdownUserService } from '../user-list/dropdown-user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  @Input() user!: User;
  selectedUser$!: Observable<User | undefined>;

  constructor(
    private dropdownUserService: DropdownUserService
  ) {
  }

  ngOnInit() {
    this.selectedUser$ = this.dropdownUserService.getCurrentUser$;
  }

}

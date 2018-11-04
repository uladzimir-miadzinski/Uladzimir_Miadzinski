import { Component, OnInit } from '@angular/core';
import { User } from '../user-list/user-service.interface';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  selectedUser!: User;

  constructor(
  ) {
  }

  ngOnInit() {
  }

  onSelectedUserChange(user: User) {
    this.selectedUser = user;
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user-list/user-service.interface';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  @Input() user!: User;
  //selectedUser$!: Observable<User>;

  constructor(
  ) {
  }

  ngOnInit() {
     //this.selectedUser$ = this.dropdownUserService.getCurrentUser$;
  }

}

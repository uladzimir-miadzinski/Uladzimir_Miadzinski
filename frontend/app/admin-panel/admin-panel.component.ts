import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user-list/user-service.interface';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  @Input() user!: User;

  constructor() { }

  ngOnInit() {
  }

}

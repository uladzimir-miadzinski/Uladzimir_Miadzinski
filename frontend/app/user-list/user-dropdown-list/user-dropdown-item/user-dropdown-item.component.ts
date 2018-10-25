import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../services/auth.service';

@Component({
  selector: 'app-user-dropdown-item',
  templateUrl: './user-dropdown-item.component.html',
  styleUrls: ['./user-dropdown-item.component.scss']
})
export class UserDropdownItemComponent implements OnInit {
  @Input()
  public user?: User;

  constructor() { }

  ngOnInit() {

  }

}

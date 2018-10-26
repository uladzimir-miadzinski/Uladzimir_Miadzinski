import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../services/auth.service';

@Component({
  selector: 'app-user-choosen',
  templateUrl: './user-choosen.component.html',
  styleUrls: ['./user-choosen.component.scss']
})
export class UserChoosenComponent implements OnInit {
  @Input()
  public selectedUser?: User;

  constructor() {
  }

  ngOnInit() {
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  @Input()
  userForm!: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }

  get formControls() {
    return Object.keys(this.form);
  }

  get form() {
    return this.userForm.controls;
  }

}

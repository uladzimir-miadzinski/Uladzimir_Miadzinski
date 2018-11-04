import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../user-service.interface';

@Component({
  selector: 'app-user-list-chosen',
  templateUrl: './user-chosen.component.html',
  styleUrls: ['./user-chosen.component.scss']
})
export class UserChosenComponent implements OnInit {
  @Input() selectedUser?: User;
  @Input() isDropdownHidden = true;
  @Output() isDropdownHiddenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  openList() {
    this.isDropdownHiddenChange.emit(!this.isDropdownHidden);
  }

  userSelected() {
    return this.selectedUser !== undefined && this.selectedUser !== null && Object.keys(this.selectedUser).length !== 0;
  }

}

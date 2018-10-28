import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../user-service.interface';
import { DropdownUserService } from '../../dropdown-user.service';

@Component({
  selector: 'app-user-choosen',
  templateUrl: './user-choosen.component.html',
  styleUrls: ['./user-choosen.component.scss']
})
export class UserChoosenComponent implements OnInit {
  @Input() selectedUser?: User;
  @Input() dropdownHidden!: boolean;

  @Output() dropdownHiddenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private selectedUserService: DropdownUserService
  ) {
  }

  ngOnInit() {
    this.selectedUserService.currUser.subscribe((user: User | undefined) => this.selectedUser = user);
  }

  openList() {
    this.dropdownHidden = !this.dropdownHidden;
    this.dropdownHiddenChange.emit(this.dropdownHidden);
    console.log(this.dropdownHidden);
  }

}

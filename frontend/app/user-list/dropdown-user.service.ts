import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user-service.interface';

@Injectable()
export class DropdownUserService {

  private selectedUser = new BehaviorSubject<User | undefined>(undefined);
  private dropdownHidden = new BehaviorSubject<boolean>(true);

  currUser = this.selectedUser.asObservable();
  currDropdownHidden = this.dropdownHidden.asObservable();

  constructor() {
  }

  changeUser(user: User | undefined) {
    this.selectedUser.next(user);
  }

  toggleDropdown() {
    this.dropdownHidden.next(!this.dropdownHidden.value);
  }
}

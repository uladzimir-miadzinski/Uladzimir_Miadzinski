import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user-service.interface';

@Injectable()
export class DropdownUserService {

  private currentUser = new BehaviorSubject<User | undefined>(undefined);
  private dropdownHidden = new BehaviorSubject<boolean>(true);

  getCurrentUser$ = this.currentUser.asObservable();
  isDropdownHidden$ = this.dropdownHidden.asObservable();

  constructor() {
  }

  changeUser(user: User | undefined) {
    this.currentUser.next(user);
  }

  toggleDropdown() {
    this.dropdownHidden.next(!this.dropdownHidden.value);
  }
}

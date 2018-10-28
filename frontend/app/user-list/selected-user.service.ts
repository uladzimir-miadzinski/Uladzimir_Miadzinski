import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user-service.interface';

@Injectable({
  providedIn: 'root'
})
export class SelectedUserService {

  private selectedUser = new BehaviorSubject<User | undefined>(undefined);
  currentUser = this.selectedUser.asObservable();

  constructor() {
  }

  changeUser(user: User | undefined) {
    this.selectedUser.next(user);
  }
}

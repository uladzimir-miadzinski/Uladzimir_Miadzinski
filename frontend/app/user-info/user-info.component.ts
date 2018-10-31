import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from '../user-list/user-service.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnChanges {

  @Input()
  currentUser$!: Observable<User>;

  userKeys!: string[];

  constructor(
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {/*
    if (typeof changes.user.currentValue !== 'undefined') {
      this.userKeys = Object.keys(changes.user.currentValue);
    }*/
  }

}

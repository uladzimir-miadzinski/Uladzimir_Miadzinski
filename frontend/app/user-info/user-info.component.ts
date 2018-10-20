import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../services/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  user!: User | null;
  userKeys!: string[];

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    console.log('init user info component');
    this.loadUserInfo();
    /*
      .pipe(
        map(
          user => {
            console.log(user);
            this.user = user;
          }), catchError((err => {
          console.error(err);
          this.user = null;
          return of(null);
        }))
      );*/
  }

  loadUserInfo() {
    this.authService.getCurrentUser()
      .subscribe((user: User) => {
        this.user = user;
        this.userKeys = Object.keys(this.user).sort();
        console.log(this.user);
      }, err => {
        console.error(err);
      });
  }

}

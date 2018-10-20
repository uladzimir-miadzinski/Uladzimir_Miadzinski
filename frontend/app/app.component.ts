import { Component, OnInit } from '@angular/core';
import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private loginGuard: LoginGuard,
    public authGuard: AuthGuard
  ) {
  }

  ngOnInit(): void {
    this.loginGuard.navigateDefaultPage();
  }

}

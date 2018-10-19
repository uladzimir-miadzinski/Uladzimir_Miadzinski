import { Component, OnInit } from '@angular/core';
import { LoginGuard } from './guards/login.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'App';

  constructor(
    private loginGuard: LoginGuard
  ) {
  }

  ngOnInit(): void {
    this.loginGuard.navigateDefaultPage();
  }

}

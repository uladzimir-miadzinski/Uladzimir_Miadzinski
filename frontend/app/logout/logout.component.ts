import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private authGuard: AuthGuard,
  ) {
  }

  logout() {
    this.authService.logout().subscribe(
      () => {
        this.authGuard.navigateLogin();
      }
    );
  }

  ngOnInit() {
  }

}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve) => {
      return this.authService.isLoggedIn().toPromise()
        .then(() => {
          this.navigateDefaultPage();
          resolve(false);
        })
        .catch(() => {
          resolve(true);
        });
    });
  }

  navigateDefaultPage() {
    this.router.navigateByUrl('/');
  }
}

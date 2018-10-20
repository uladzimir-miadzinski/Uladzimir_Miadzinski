import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  /*return new Promise((resolve) => {
    return this.authService.isLoggedIn().toPromise()
      .then(() => {
        this.navigateDefaultPage();
        resolve(false);
      })
      .catch(() => {
        resolve(true);
      });
  });*/

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedIn()
      .pipe(
        map(this.redirectDefaultPage),
        catchError(() => this.allowRoute())
      );
  }

  allowRoute() {
    return of(true);
  }

  redirectDefaultPage() {
    this.navigateDefaultPage();
    return true;
  }

  navigateDefaultPage() {
    this.router.navigateByUrl('/');
  }
}

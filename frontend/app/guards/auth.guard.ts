import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedIn()
      .pipe(
        map(this.allowRoute),
        catchError(() => this.throwOut())
      );
  }

  throwOut() {
    this.navigateLogin();
    return of(false);
  }

  navigateLogin() {
    this.router.navigate(['login']);
  }

  allowRoute() {
    return true;
  }
}

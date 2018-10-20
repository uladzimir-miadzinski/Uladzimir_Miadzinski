import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public loader$ = new Subject<boolean>();

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.loader$.next(true);
    return this.authService.isLoggedIn()
      .pipe(
        map(() => {
          this.loader$.next(false);
          return this.allowRoute();
        }),
        catchError(() => {
          this.loader$.next(false);
          return this.throwOut();
        })
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

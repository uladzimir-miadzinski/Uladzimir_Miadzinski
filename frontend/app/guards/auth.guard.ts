import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { isEmptyObject, SharedService } from '../shared.service';
import { User } from '../user-list/user-service.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private sharedService: SharedService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.sharedService.currentUser$
      .pipe(
        map((user: User) => !isEmptyObject(user) && typeof user['id'] !== 'undefined' ? this.allowRoute() : this.throwOut()),
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

import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { MatDialog } from '@angular/material';
import { DialogLogoutComponent } from '../dialogs/dialog-logout/dialog-logout.component';
import { SessionState } from '../redux/reducers';
import { Store } from '@ngrx/store';
import { LogoutUser } from '../redux/actions/user/user.actions';
import { Observable, Subscription } from 'rxjs';
import { User } from '../user-list/user-service.interface';
import { isEmptyObject, SharedService } from '../shared.service';
import { Router } from '@angular/router';

export enum Tab {
  INFO = 0,
  INFO_UPDATE = 1,
  ADMIN_PANEL = 2,
  LOGOUT = 3
}

@Component({
  selector: 'app-user-tabs',
  templateUrl: './user-tabs.component.html',
  styleUrls: ['./user-tabs.component.scss']
})
export class UserTabsComponent implements AfterViewInit, OnDestroy {
  selectedTab = 0;

  currentUser$: Observable<User | null> = this.sharedService.currentUser$;
  currentUserSubscription!: Subscription;

  constructor(
    private dialog: MatDialog,
    private sharedService: SharedService,
    private sessionStore: Store<SessionState>,
    private router: Router
  ) {
  }

  onTabChange(event: MatTabChangeEvent) {
    if (event.index === Tab.LOGOUT) {
      const dialogRef = this.dialog.open(DialogLogoutComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.logout();
        } else {
          this.blurTabs();
          this.selectedTab = Tab.INFO;
        }
      });
    }
  }

  logout() {
    // this.authService.logout().subscribe(() => this.authGuard.navigateLogin());
    this.sessionStore.dispatch(new LogoutUser());
  }

  private blurTabs() {
    const matTabs: HTMLCollectionOf<Element> = document.getElementsByClassName('mat-tab-label');
    [].slice.call(matTabs).forEach((tab: Element) => {
      tab.classList.remove('cdk-program-focused', 'cdk-mouse-focused');
    });
  }

  ngAfterViewInit(): void {
    this.currentUserSubscription = this.currentUser$.subscribe(
      (user: User | null) => {
        if (user === null || isEmptyObject(user)) {
          this.router.navigateByUrl('/login');
        }
      },
      () => this.router.navigateByUrl('/login'));
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}

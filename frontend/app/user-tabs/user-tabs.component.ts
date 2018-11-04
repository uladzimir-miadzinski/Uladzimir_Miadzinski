import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogLogoutComponent } from '../dialogs/dialog-logout/dialog-logout.component';
import { currentUser, SessionState } from '../redux/reducers';
import { select, Store } from '@ngrx/store';
import { LogoutUser } from '../redux/actions/user/user.actions';
import { Observable, Subscription } from 'rxjs';
import { User } from '../user-list/user-service.interface';
import { isEmptyObject } from '../shared.service';
import { Router } from '@angular/router';

export enum Tab {
  INFO = 1,
}

@Component({
  selector: 'app-user-tabs',
  templateUrl: './user-tabs.component.html',
  styleUrls: ['./user-tabs.component.scss']
})
export class UserTabsComponent implements AfterViewInit, OnDestroy {
  selectedTab = 0;

  currentUser$: Observable<User | null> = this.sessionStore.pipe(select(currentUser));
  currentUserSubscription!: Subscription;

  constructor(
    private dialog: MatDialog,
    private sessionStore: Store<SessionState>,
    private router: Router
  ) {
  }

  logout() {
    this.sessionStore.dispatch(new LogoutUser());
  }

  confirmLogout() {
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
          this.router.navigateByUrl('/login?err=2');
        }
      },
      () => {
        this.router.navigateByUrl('/login?err=1');
      });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { MatDialog } from '@angular/material';
import { DialogLogoutComponent } from '../dialog-logout/dialog-logout.component';
import { AuthService, User } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';


export enum Tab {
  INFO = 0,
  INFO_UPDATE = 1,
  LOGOUT = 2
}

@Component({
  selector: 'app-user-tabs',
  templateUrl: './user-tabs.component.html',
  styleUrls: ['./user-tabs.component.scss']
})
export class UserTabsComponent implements OnInit {
  user!: User;
  selectedTab = 0;

  constructor(
    private authService: AuthService,
    private authGuard: AuthGuard,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.authService.getCurrentUser()
      .subscribe((user: User) => {
        this.user = user;
        console.log(this.user);
      }, err => {
        console.error(err);
      });
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
    this.authService.logout().subscribe(() => this.authGuard.navigateLogin());
  }

  private blurTabs() {
    const matTabs: HTMLCollectionOf<Element> = document.getElementsByClassName('mat-tab-label');
    [].slice.call(matTabs).forEach((tab: Element) => {
      tab.classList.remove('cdk-program-focused', 'cdk-mouse-focused');
    });
  }

}

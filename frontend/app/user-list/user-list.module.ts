import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserChoosenComponent } from './user-dropdown-list/user-choosen/user-choosen.component';
import { UserDropdownListComponent } from './user-dropdown-list/user-dropdown-list.component';
import { UserDropdownItemComponent } from './user-dropdown-list/user-dropdown-item/user-dropdown-item.component';
import { UserDropdownListChevronComponent } from './user-dropdown-list/user-dropdown-list-chevron/user-dropdown-list-chevron.component';
import { UserService } from '../services/user.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UserListComponent,
    UserChoosenComponent,
    UserDropdownListComponent,
    UserDropdownItemComponent,
    UserDropdownListChevronComponent
  ],
  providers: [
    UserService
  ]
})
export class UserListModule { }

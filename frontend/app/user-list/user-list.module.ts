import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserChoosenComponent } from './user-dropdown-list/user-choosen/user-choosen.component';
import { UserDropdownListComponent } from './user-dropdown-list/user-dropdown-list.component';
import { UserDropdownListChevronComponent } from './user-dropdown-list/user-dropdown-list-chevron/user-dropdown-list-chevron.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../http-loader.factory';
import { UserSearchComponent } from './user-search/user-search.component';
import { SearchFieldComponent } from './user-search/search-field/search-field.component';
import { SearchBtnComponent } from './user-search/search-btn/search-btn.component';
import { SearchResultsComponent } from './user-search/search-results/search-results.component';
import { SearchResultsItemComponent } from './user-search/search-results/search-results-item/search-results-item.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [
    UserListComponent,
    UserChoosenComponent,
    UserDropdownListComponent,
    UserDropdownListChevronComponent,
    UserSearchComponent,
    SearchFieldComponent,
    SearchBtnComponent,
    SearchResultsComponent,
    SearchResultsItemComponent
  ]
})
export class UserListModule { }

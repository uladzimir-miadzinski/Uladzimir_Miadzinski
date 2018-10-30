import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { UserChosenComponent } from './user-chosen/user-chosen.component';
import { ChevronComponent } from './chevron/chevron.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../http-loader.factory';
import { SearchComponent } from './search/search.component';
import { SearchFieldComponent } from './search/search-field/search-field.component';
import { SearchBtnComponent } from './search/search-btn/search-btn.component';
import { SearchResultsComponent } from './search/search-results/search-results.component';
import { SearchResultsItemComponent } from './search/search-results/search-results-item/search-results-item.component';
import { MatProgressBarModule } from '@angular/material';

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
    MatProgressBarModule
  ],
  declarations: [
    UserListComponent,
    UserChosenComponent,
    ChevronComponent,
    SearchComponent,
    SearchFieldComponent,
    SearchBtnComponent,
    SearchResultsComponent,
    SearchResultsItemComponent
  ],
  exports: [
    UserListComponent
  ]
})
export class UserListModule { }

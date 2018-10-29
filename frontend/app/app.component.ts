import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { select, Store } from '@ngrx/store';
import { User } from './user-list/user-service.interface';
import { allUsers } from './store/reducers';
//import { LoadUsers } from './store/actions/user.actions';
//import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { LoadUsers } from './store/actions/user.actions';

interface AppState {
  users: User[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {
  selectedLang = 'en';
  users!: User[];

  constructor(
    public loadingService: LoadingService,
    private cdRef: ChangeDetectorRef,
    public translate: TranslateService,
    private store: Store<AppState>
  ) {
    this.store.pipe(select(allUsers)).subscribe((users) => {
      this.users = users;
    });
  }

  ngAfterViewChecked(): void {
    this.translate.use(this.selectedLang);
    this.cdRef.detectChanges();
  }

  dispatch() {
    console.log(this.users);
    console.log(this.store.dispatch(new LoadUsers()));
    //this.store.dispatch(new LoadUsers());
  }

  ngOnInit(): void {

    this.translate.addLangs(['en', 'ru']);
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
  }

  onLangChange() {
    this.translate.use(this.selectedLang);
  }

}

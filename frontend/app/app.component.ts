import { AfterViewChecked, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { select, Store } from '@ngrx/store';
import { User } from './user-list/user-service.interface';
import { allUsers } from './redux/reducers';
import { LoadUsers, PostUser } from './redux/actions/user/user.actions';
import { Observable } from 'rxjs';
import { UsersState } from './redux/reducers/user/user.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked, OnChanges {
  selectedLang = 'en';
  users$!: Observable<User[]>;

  constructor(
    public loadingService: LoadingService,
    private cdRef: ChangeDetectorRef,
    public translate: TranslateService,
    private store: Store<UsersState>
  ) {
    this.users$ = this.store.pipe(select(allUsers));
  }

  ngAfterViewChecked(): void {
    this.translate.use(this.selectedLang);
    this.cdRef.detectChanges();
  }

  dispatch() {
    console.log(this.store.dispatch(new LoadUsers()));
  }

  add() {
    console.log(this.store.dispatch(new PostUser({
      age: 18,
      birthday: '2018/10/12',
      deleted: 0,
      firstLogin: '2017/12/12',
      info: 'hjhj hjh j jh jh',
      name: 'niii',
      nextNotify: '2016/10/01',
      password: '123'
    })));
  }

  show() {
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

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.users$.subscribe((users) => {
      console.log(users);
    });
  }

}

import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {
  selectedLang = 'en';

  constructor(
    public loadingService: LoadingService,
    private cdRef: ChangeDetectorRef,
    public translate: TranslateService
  ) {
  }

  ngAfterViewChecked(): void {
    this.translate.use(this.selectedLang);
    this.cdRef.detectChanges();
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

import { AfterViewChecked, Component } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {

  constructor(
    public loadingService: LoadingService,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }


}

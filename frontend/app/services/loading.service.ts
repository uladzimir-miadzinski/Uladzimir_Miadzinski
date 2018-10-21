import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public loader$ = new Subject<boolean>();

  constructor() { }

  showLoading() {
    this.loader$.next(true);
    return true;
  }

  hideLoading() {
    this.loader$.next(false);
    return false;
  }
}

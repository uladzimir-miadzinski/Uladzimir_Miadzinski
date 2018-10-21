import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private loadingService: LoadingService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.showLoading();
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.loadingService.hideLoading();
        }
      },
      () => {
        this.loadingService.hideLoading();
      }));
  }

}

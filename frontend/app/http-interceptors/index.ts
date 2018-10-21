import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieInterceptor } from './cookie-interceptor';
import { LoadingInterceptor } from './loading-interceptor';

export const HttpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CookieInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  },
];

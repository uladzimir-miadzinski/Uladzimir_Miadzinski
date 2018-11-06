import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { AppComponent } from './app.component';
import { LoadingComponent } from './loading/loading.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatProgressBarModule, MatSelectModule } from '@angular/material';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './http-loader.factory';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSelectModule,
        MatProgressBarModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
      ],
      declarations: [
        AppComponent,
        LoadingComponent,
      ]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  }));

  test('should exist', () => {
    expect(component).toBeDefined();
  });
});

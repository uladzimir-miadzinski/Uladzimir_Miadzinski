import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, AppRoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatDividerModule,
  MatFormFieldModule,
  MatInputModule, MatListModule, MatProgressBarModule
} from '@angular/material';
import { UserInfoComponent } from './user-info/user-info.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserTabsComponent } from './user-tabs/user-tabs.component';
import { HttpInterceptorProviders } from './http-interceptors';
import {JwtModule} from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AppRoutingComponents,
    UserEditorComponent,
    UserInfoComponent,
    LoginComponent,
    ForgotPasswordComponent,
    UserTabsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: AuthService.getToken,
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['localhost:3000/login']
      }
    }),
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatListModule,
    MatInputModule,
    MatProgressBarModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpInterceptorProviders,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

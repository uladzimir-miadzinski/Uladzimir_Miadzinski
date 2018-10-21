import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, AppRoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatProgressBarModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import { UserInfoComponent } from './user-info/user-info.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserTabsComponent } from './user-tabs/user-tabs.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { HttpInterceptorProviders } from './http-interceptors';
import { LoadingComponent } from './loading/loading.component';
import { DialogLogoutComponent } from './dialog-logout/dialog-logout.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    AppRoutingComponents,
    UserEditorComponent,
    UserInfoComponent,
    LoginComponent,
    ForgotPasswordComponent,
    UserTabsComponent,
    LoadingComponent,
    DialogLogoutComponent
  ],
  entryComponents: [
    DialogLogoutComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatListModule,
    MatInputModule,
    MatProgressBarModule,
    MatTableModule,
    MatTabsModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpInterceptorProviders,
    AuthService,
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

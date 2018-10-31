import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { AuthGuard } from './guards/auth.guard';
import { UserTabsComponent } from './user-tabs/user-tabs.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'user-info', component: UserInfoComponent, canActivate: [AuthGuard] },
  { path: 'user-editor', component: UserEditorComponent, canActivate: [AuthGuard] },
  { path: 'user-tabs', component: UserTabsComponent, canActivate: [AuthGuard] },
  { path: '',   redirectTo: '/user-tabs', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}

export const AppRoutingComponents = [
  LoginComponent
];

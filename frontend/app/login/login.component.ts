import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { camelCaseValidator } from '../validators/camel-case-validator.directive';
import { usernameExistsValidator } from '../validators/username-exists-validator.directive';
import { maxTwoWordsValidator } from '../validators/max-two-words-validator.directive';
import { LoginGuard } from '../guards/login.guard';
import { DialogLoginErrComponent } from '../dialogs/dialog-login-err/dialog-login-err.component';
import { MatDialog } from '@angular/material';

export enum STATUS {
  UNAUTHORIZED = 401,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private loginGuard: LoginGuard,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {

    this.authService.isLoggedIn().subscribe(() => {
      this.loginGuard.navigateDefaultPage();
    });

    this.loginForm = this.fb.group({
      name: ['', {
        validators: [Validators.required],
        asyncValidators: [usernameExistsValidator(this.authService), camelCaseValidator(), maxTwoWordsValidator()],
        updateOn: 'blur'
      }],
      password: ['', {
        validators: [Validators.required]
      }]
    });
  }

  onSubmit() {
    const form = this.loginForm.value;
    if (form.name && form.password) {
      this.authService.login(form.name, form.password)
        .subscribe(
          () => {
            this.router.navigateByUrl('/');
          },
          (error) => {
            if (error.status === STATUS.UNAUTHORIZED) {
              this.dialog.open(DialogLoginErrComponent);
            }
          }
        );
    }
  }

  get form() {
    return this.loginForm.controls;
  }

  get name() {
    return this.form.name;
  }

  get password() {
    return this.form.password;
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { camelCaseValidator } from '../validators/camel-case-validator.directive';
import { usernameExistsValidator } from '../validators/username-exists-validator.directive';
import { maxTwoWordsValidator } from '../validators/max-two-words-validator.directive';
import { DialogLoginErrComponent } from '../dialogs/dialog-login-err/dialog-login-err.component';
import { MatDialog } from '@angular/material';
import { isEmptyObject, SharedService } from '../shared.service';
import { Observable, of } from 'rxjs';
import { User, UserCredentials } from '../user-list/user-service.interface';
import { SessionState } from '../redux/reducers';
import { Store } from '@ngrx/store';
import { LoginUser } from '../redux/actions/user/user.actions';

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
  currentUser$: Observable<User | null> = of(null);

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private dialog: MatDialog,
              private sharedService: SharedService,
              private sessionStore: Store<SessionState>) {
  }

  ngOnInit() {
    this.currentUser$ = this.sharedService.currentUser$;

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
      const userCredentials: UserCredentials = {
        name: form.name,
        password: form.password
      };
      this.sessionStore.dispatch(new LoginUser(userCredentials));
      this.currentUser$
        .subscribe(
          (payload: User | null | number) => {
            console.log(payload);
            if (typeof payload !== 'number' && payload !== null && typeof payload['id'] !== 'undefined') {
              this.router.navigateByUrl('/');
            } else {
              this.dialog.open(DialogLoginErrComponent);
            }
          },
          (error) => {
            console.log('my error handler');
            console.warn(error);
            if (error.status === STATUS.UNAUTHORIZED) {
              this.dialog.open(DialogLoginErrComponent);
            }
          });
    }
  }

  isEmptyObject(user: User) {
    return isEmptyObject(user);
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

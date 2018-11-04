import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { usernameExistsValidator } from '../validators/username-exists-validator.directive';
import { camelCaseValidator } from '../validators/camel-case-validator.directive';
import { AuthService } from '../services/auth.service';
import { AssignUserPassword } from '../redux/actions/user/user.actions';
import { Store } from '@ngrx/store';
import { DataState } from '../redux/reducers';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  reassignForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dataStore: Store<DataState>
  ) {
  }

  ngOnInit() {
    this.reassignForm = this.fb.group({
      name: ['', {
        validators: [Validators.required],
        asyncValidators: [usernameExistsValidator(this.authService), camelCaseValidator()],
        updateOn: 'blur'
      }],
      password: ['', {
        validators: [Validators.required]
      }]
    });
  }

  onSubmit() {
    this.dataStore.dispatch(new AssignUserPassword({
      name: this.name.value,
      password: this.password.value
    }));
  }

  get form() {
    return this.reassignForm.controls;
  }

  get name() {
    return this.form.name;
  }

  get password() {
    return this.form.password;
  }
}

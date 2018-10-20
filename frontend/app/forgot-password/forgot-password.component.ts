import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { usernameExistsValidator } from '../validators/username-exists-validator.directive';
import { camelCaseValidator } from '../validators/camel-case-validator.directive';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  reassignForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
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
    this.authService.assignNewPassword(this.name.value, this.password.value).subscribe(
      () => {
        alert('New password was set!');
      }, () => {
        alert('Error setting new password :(');
      }
    );
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

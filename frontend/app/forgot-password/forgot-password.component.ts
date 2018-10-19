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
  remindForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.remindForm = this.fb.group({
      name: ['', {
        validators: [Validators.required],
        asyncValidators: [usernameExistsValidator(this.authService), camelCaseValidator()],
        updateOn: 'blur'
      }]
    });
  }

  onSubmit() {
    alert('your password is ...');
  }

  get form() {
    return this.remindForm.controls;
  }

  get name() {
    return this.form.name;
  }
}

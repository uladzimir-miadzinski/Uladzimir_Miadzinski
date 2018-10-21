import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { usernameExistsValidator } from '../validators/username-exists-validator.directive';
import { camelCaseValidator } from '../validators/camel-case-validator.directive';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material';
import { DialogPasswordAssignedComponent } from '../dialogs/dialog-password-assigned/dialog-password-assigned.component';
import { AuthGuard } from '../guards/auth.guard';

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
    private dialog: MatDialog,
    private authGuard: AuthGuard
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
        const dialogRef = this.dialog.open(DialogPasswordAssignedComponent, {
          data: {
            success: true
          }
        });

        dialogRef.afterClosed().subscribe(() => {
          this.authGuard.navigateLogin();
        });
      }, (err) => {
        this.dialog.open(DialogPasswordAssignedComponent, {
          data: {
            success: false,
            error: err
          }
        });
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

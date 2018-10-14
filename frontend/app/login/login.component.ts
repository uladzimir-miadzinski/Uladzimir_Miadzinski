import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {  } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const form = this.loginForm.value;

    console.log(form.name);
    if (form.name && form.password) {
  
      console.log(form);
      this.authService.login(form.name, form.password)
        .subscribe(
          () => {
            console.log('User is logged in');
            this.router.navigateByUrl('/');
          }
        );
    }
  }

}

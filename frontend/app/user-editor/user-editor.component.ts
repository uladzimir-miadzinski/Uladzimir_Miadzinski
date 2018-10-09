import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {notLegalAgeValidator} from '../validators/not-legal-age-validator.directive';
import {dateValidator} from '../validators/date-validator.directive';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {

  submitted = false;
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.onChanges();
  }

  onChanges(): void {
    this.userForm.valueChanges.subscribe(() => {
      this.submitted = false;
    });
  }

  createForm() {
    this.userForm = this.fb.group({
      name: ['Uladzimir Miadzinski'],
      age: ['55', [notLegalAgeValidator()]],
      info: ['some info'],
      birthday: ['2001/10/14', dateValidator()],
      firstLogin: ['2010/12/14', dateValidator()],
      nextNotify: ['2014/05/23', dateValidator()]
    });
  }

  onSubmit() {
    this.submitted = true;
  }

  showErrors() {
    console.warn(this.form.name.errors);
    console.warn(this.form.age.errors);
    console.warn(this.form.birthday.errors);
    console.warn(this.form.firstLogin.errors);
    console.warn(this.form.nextNotify.errors);
    console.warn(this.form.info.errors);
  }

  get form() {
    return this.userForm.controls;
  }

  get age() {
    return this.form.age;
  }

  get birthday() {
    return this.form.birthday;
  }

  get firstLogin() {
    return this.form.firstLogin;
  }

  get nextNotify() {
    return this.form.nextNotify;
  }
}

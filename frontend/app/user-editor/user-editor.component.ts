import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {notLegalAgeValidator} from '../validators/not-legal-age-validator.directive';
import {dateValidator} from '../validators/date-validator.directive';
import {camelCaseValidator} from '../validators/camel-case-validator.directive';
import {twoWordsValidator} from '../validators/two-words-validator.directive';
import {onlyLatinValidator} from '../validators/only-latin-validator.directive';

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
      name: ['', {
        asyncValidators: [twoWordsValidator(), camelCaseValidator(), onlyLatinValidator()],
        updateOn: 'blur'
      }],
      age: ['', notLegalAgeValidator()],
      info: [''],
      birthday: ['', dateValidator()],
      firstLogin: ['', dateValidator()],
      nextNotify: ['', dateValidator()]
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

  get name() {
    return this.form.name;
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

import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {notLegalAgeValidator} from '../validators/not-legal-age-validator.directive';
import {dateValidator} from '../validators/date-validator.directive';
import {camelCaseValidator} from '../validators/camel-case-validator.directive';
import {maxTwoWordsValidator} from '../validators/max-two-words-validator.directive';
import {onlyLatinValidator} from '../validators/only-latin-validator.directive';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit, AfterViewInit {

  submitted = false;
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  ngAfterViewInit() {
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
        validators: [Validators.required],
        asyncValidators: [maxTwoWordsValidator(), camelCaseValidator(), onlyLatinValidator()],
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
    Object.keys(this.form).forEach(key => {
      console.warn(this.form[key].errors);
    });
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

import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { notLegalAgeValidator } from '../validators/not-legal-age-validator.directive';
import { dateValidator } from '../validators/date-validator.directive';
import { camelCaseValidator } from '../validators/camel-case-validator.directive';
import { maxTwoWordsValidator } from '../validators/max-two-words-validator.directive';
import { onlyLatinValidator } from '../validators/only-latin-validator.directive';
import { User } from '../services/auth.service';
import * as moment from 'moment';
import { integerValidator } from '../validators/integer-validator.directive';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit, AfterViewInit, OnChanges {

  @Input()
  user!: User | null;

  userForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder
  ) {
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

  get info() {
    return this.form.info;
  }

  get password() {
    return this.form.password;
  }

  static formatDate(date: string | undefined) {
    return typeof date === 'undefined' ? '' : moment(date).format('YYYY/MM/DD');
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
        asyncValidators: [maxTwoWordsValidator(), camelCaseValidator(), onlyLatinValidator()],
        updateOn: 'blur'
      }],
      age: ['', [integerValidator(), notLegalAgeValidator()]],
      info: [''],
      password: [''],
      birthday: ['', dateValidator()],
      firstLogin: ['', dateValidator()],
      nextNotify: ['', dateValidator()]
    });
  }

  updateFormValues(user: User) {
    this.form.name.setValue(user.name);
    this.form.age.setValue(user.age);
    this.form.info.setValue(user.info);
    this.form.birthday.setValue(UserEditorComponent.formatDate(user.birthday));
    this.form.firstLogin.setValue(UserEditorComponent.formatDate(user.firstLogin));
    this.form.nextNotify.setValue(UserEditorComponent.formatDate(user.nextNotify));
    this.form.password.setValue(user.password);
  }

  onSubmit() {
    this.submitted = true;
  }

  showErrors() {
    Object.keys(this.form).forEach(key => {
      console.warn(this.form[key].errors);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (typeof this.user !== 'undefined' && this.user !== null) {
      this.updateFormValues(this.user);
    }
  }
}

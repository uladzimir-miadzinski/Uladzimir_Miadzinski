import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { notLegalAgeValidator } from '../../validators/not-legal-age-validator.directive';
import { dateValidator } from '../../validators/date-validator.directive';
import { camelCaseValidator } from '../../validators/camel-case-validator.directive';
import { filterSpaces, maxTwoWordsValidator } from '../../validators/max-two-words-validator.directive';
import { onlyLatinValidator } from '../../validators/only-latin-validator.directive';
import { integerValidator } from '../../validators/integer-validator.directive';
import { User } from '../../user-list/user-service.interface';
import { UserEditorComponent } from '../../user-editor/user-editor.component';
import { DataState } from '../../redux/reducers';
import { Store } from '@ngrx/store';
import { CreateUser, DeleteUser, UpdateUser } from '../../redux/actions/user/user.actions';

@Component({
  selector: 'app-user-admin-editor',
  templateUrl: './user-admin-editor.component.html',
  styleUrls: ['./user-admin-editor.component.scss']
})
export class UserAdminEditorComponent implements OnInit, OnChanges {

  @Input() selectedUser!: User;
  @Output() selectedUserChange: EventEmitter<User> = new EventEmitter<User>();

  userForm!: FormGroup;
  nameChanged = false;
  isUserSelected = false;

  constructor(
    private fb: FormBuilder,
    private dataStore: Store<DataState>
  ) {
    this.createForm();
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

  get role() {
    return this.form.role;
  }

  ngOnInit() {
    this.name.valueChanges
      .subscribe((inputName => {

        if (this.selectedUser !== null && typeof this.selectedUser !== 'undefined') {
          this.nameChanged = inputName !== this.selectedUser.name;
        } else {
          this.nameChanged = true;
        }

        this.isUserSelected = !this.nameChanged;
      }));
  }

  createForm() {
    this.userForm = this.fb.group({
      name: ['', {
        validators: [Validators.required],
        asyncValidators: [maxTwoWordsValidator(), camelCaseValidator(), onlyLatinValidator()]
      }],
      age: ['', [integerValidator(), notLegalAgeValidator()]],
      info: [''],
      role: [''],
      password: ['', [Validators.required]],
      birthday: ['', dateValidator()],
      firstLogin: ['', dateValidator()],
      nextNotify: ['', dateValidator()]
    });
  }

  updateFormValues(user: User) {
    this.form.name.setValue(user.name);
    this.form.age.setValue(user.age);
    this.form.info.setValue(user.info);
    this.form.role.setValue(user.role);
    this.form.birthday.setValue(UserEditorComponent.formatDate(user.birthday));
    this.form.firstLogin.setValue(UserEditorComponent.formatDate(user.firstLogin));
    this.form.nextNotify.setValue(UserEditorComponent.formatDate(user.nextNotify));
    this.form.password.setValue(user.password);
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSubmit() {
    const params: User = {
      name: filterSpaces(this.name.value).join(' ') as string,
      age: this.age.value as number,
      info: this.info.value as string,
      role: this.role.value as string,
      birthday: this.birthday.value as string,
      firstLogin: this.firstLogin.value as string,
      nextNotify: this.nextNotify.value as string,
      password: this.password.value as string,
    };

    if (this.nameChanged) {
      this.dataStore.dispatch(new CreateUser(params));
    } else {
      params.id = this.selectedUser.id;
      this.dataStore.dispatch(new UpdateUser(params));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (typeof this.selectedUser !== 'undefined' && this.selectedUser !== null) {
      this.isUserSelected = true;
      this.updateFormValues(this.selectedUser);
    }
  }

  deleteSelectedUser() {
    this.dataStore.dispatch(new DeleteUser(this.selectedUser.id));
    this.selectedUser = {};
    this.selectedUserChange.emit(this.selectedUser);
  }

}

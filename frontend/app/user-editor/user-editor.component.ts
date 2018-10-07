import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {notLegalAgeValidator} from '../validators/not-legal-age-validator.directive';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {

  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.userForm = this.fb.group({
      name: [''],
      age: ['', [notLegalAgeValidator()]],
      info: [''],
      birthday: [''],
      firstLogin: [''],
      nextNotify: ['']
    });
  }

  onSubmit() {

  }

  showErrors() {
    console.warn(this.form.age.errors);
  }

  get form() {
    return this.userForm.controls;
  }

  get age() {
    return this.form.age;
  }
}

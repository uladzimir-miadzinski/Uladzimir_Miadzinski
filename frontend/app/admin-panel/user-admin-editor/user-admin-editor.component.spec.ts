import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdminEditorComponent } from './user-admin-editor.component';

describe('UserAdminEditorComponent', () => {
  let component: UserAdminEditorComponent;
  let fixture: ComponentFixture<UserAdminEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAdminEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdminEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

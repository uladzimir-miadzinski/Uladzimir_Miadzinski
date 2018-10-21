import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUserSavedComponent } from './dialog-user-saved.component';

describe('DialogUserSavedComponent', () => {
  let component: DialogUserSavedComponent;
  let fixture: ComponentFixture<DialogUserSavedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUserSavedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUserSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

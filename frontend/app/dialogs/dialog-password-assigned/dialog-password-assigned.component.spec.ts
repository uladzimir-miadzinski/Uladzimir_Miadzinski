import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPasswordAssignedComponent } from './dialog-password-assigned.component';

describe('DialogPasswordAssignedComponent', () => {
  let component: DialogPasswordAssignedComponent;
  let fixture: ComponentFixture<DialogPasswordAssignedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPasswordAssignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPasswordAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

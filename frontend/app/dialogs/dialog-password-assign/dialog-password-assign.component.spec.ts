import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPasswordAssignComponent } from './dialog-password-assign.component';

describe('DialogPasswordAssignComponent', () => {
  let component: DialogPasswordAssignComponent;
  let fixture: ComponentFixture<DialogPasswordAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPasswordAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPasswordAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

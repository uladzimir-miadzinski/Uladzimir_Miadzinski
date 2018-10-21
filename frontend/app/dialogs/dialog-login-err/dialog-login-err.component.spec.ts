import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLoginErrComponent } from './dialog-login-err.component';

describe('DialogLoginErrComponent', () => {
  let component: DialogLoginErrComponent;
  let fixture: ComponentFixture<DialogLoginErrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogLoginErrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLoginErrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

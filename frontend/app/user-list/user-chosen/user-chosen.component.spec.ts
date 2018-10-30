import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChosenComponent } from './user-chosen.component';

describe('UserChosenComponent', () => {
  let component: UserChosenComponent;
  let fixture: ComponentFixture<UserChosenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChosenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChosenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

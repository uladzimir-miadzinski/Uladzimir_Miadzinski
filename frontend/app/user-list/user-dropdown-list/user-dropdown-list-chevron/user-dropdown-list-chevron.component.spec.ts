import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDropdownListChevronComponent } from './user-dropdown-list-chevron.component';

describe('UserDropdownListChevronComponent', () => {
  let component: UserDropdownListChevronComponent;
  let fixture: ComponentFixture<UserDropdownListChevronComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDropdownListChevronComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDropdownListChevronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

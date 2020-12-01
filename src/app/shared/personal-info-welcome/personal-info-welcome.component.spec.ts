import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInfoWelcomeComponent } from './personal-info-welcome.component';

describe('PersonalInfoWelcomeComponent', () => {
  let component: PersonalInfoWelcomeComponent;
  let fixture: ComponentFixture<PersonalInfoWelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalInfoWelcomeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInfoWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

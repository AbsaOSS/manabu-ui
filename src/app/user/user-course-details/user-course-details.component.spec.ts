import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCourseDetailsComponent } from './user-course-details.component';

describe('UserCourseDetailsComponent', () => {
  let component: UserCourseDetailsComponent;
  let fixture: ComponentFixture<UserCourseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCourseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCourseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

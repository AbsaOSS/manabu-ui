import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminCourseStatisticsViewComponent } from './super-admin-course-statistics-view.component';

describe('SuperAdminCourseStatisticsViewComponent', () => {
  let component: SuperAdminCourseStatisticsViewComponent;
  let fixture: ComponentFixture<SuperAdminCourseStatisticsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SuperAdminCourseStatisticsViewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminCourseStatisticsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListAnalysisComponent } from './course-list-analysis.component';

describe('CourseStatComponent', () => {
  let component: CourseListAnalysisComponent;
  let fixture: ComponentFixture<CourseListAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseListAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

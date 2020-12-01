import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAnalysisComponent } from './course-analysis.component';

describe('CourseAnalysisComponent', () => {
  let component: CourseAnalysisComponent;
  let fixture: ComponentFixture<CourseAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

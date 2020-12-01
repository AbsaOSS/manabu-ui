import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefCourseOverviewComponent } from './brief-course-overview.component';

describe('BriefCourseOverviewComponent', () => {
  let component: BriefCourseOverviewComponent;
  let fixture: ComponentFixture<BriefCourseOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BriefCourseOverviewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefCourseOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

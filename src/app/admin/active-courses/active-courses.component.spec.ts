import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveCoursesComponent } from './active-courses.component';

describe('ActiveCoursesComponent', () => {
  let component: ActiveCoursesComponent;
  let fixture: ComponentFixture<ActiveCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

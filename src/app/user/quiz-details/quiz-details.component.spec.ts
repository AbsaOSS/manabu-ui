import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizDetailsComponent } from './quiz-details.component';

describe('QuizDetailsComponent', () => {
  let component: QuizDetailsComponent;
  let fixture: ComponentFixture<QuizDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

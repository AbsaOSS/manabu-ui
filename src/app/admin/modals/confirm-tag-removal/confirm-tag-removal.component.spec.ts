import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTagRemovalComponent } from './confirm-tag-removal.component';

describe('ConfirmTagRemovalComponent', () => {
  let component: ConfirmTagRemovalComponent;
  let fixture: ComponentFixture<ConfirmTagRemovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmTagRemovalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmTagRemovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

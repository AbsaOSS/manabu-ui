import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePresentationsComponent } from './manage-presentations.component';

describe('ManagePresentationsComponent', () => {
  let component: ManagePresentationsComponent;
  let fixture: ComponentFixture<ManagePresentationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePresentationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePresentationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

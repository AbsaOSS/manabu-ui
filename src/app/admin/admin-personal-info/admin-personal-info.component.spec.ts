import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPersonalInfoComponent } from './admin-personal-info.component';

describe('AdminPersonalInfoComponent', () => {
  let component: AdminPersonalInfoComponent;
  let fixture: ComponentFixture<AdminPersonalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPersonalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSidePanelComponent } from './admin-side-panel.component';

describe('AdminSidePanelComponent', () => {
  let component: AdminSidePanelComponent;
  let fixture: ComponentFixture<AdminSidePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSidePanelComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSidePanelComponent } from './user-side-panel.component';

describe('UserSidePanelComponent', () => {
  let component: UserSidePanelComponent;
  let fixture: ComponentFixture<UserSidePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSidePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserImageUploadingModalComponent } from './user-image-uploading-modal.component';

describe('UserImageUploadingModalComponent', () => {
  let component: UserImageUploadingModalComponent;
  let fixture: ComponentFixture<UserImageUploadingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserImageUploadingModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserImageUploadingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

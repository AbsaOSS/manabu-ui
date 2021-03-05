/*
 * Copyright 2020 ABSA Group Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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

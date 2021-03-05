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
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import ClassicEditor from 'src/assets/build/ckeditor';
import { Icon } from '../../../models/Icon';
import { AppConfig } from 'src/app/app.config';
import { CourseService } from 'src/app/services/course.service';
import { environment } from 'src/environments/environment';
import IndicatorState from 'src/app/models/LoadingStates';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {
  @Output() updatedCourse: EventEmitter<null> = new EventEmitter<null>();
  protected apiServer = AppConfig.settings.apiServer;
  public Editor = ClassicEditor;

  constructor(public activeModal: NgbActiveModal, private courseService: CourseService) {}

  icons: Icon[];
  selectedIcon: Icon['source'] = '';
  course: any;
  IndicatorState = IndicatorState;
  loadingIndicator: IndicatorState;

  ngOnInit() {
    this.getIcons();
  }

  setIconDataProperties() {
    this.icons.forEach((icon) => {
      if (!environment.production) {
        if (icon.source.startsWith('/api/course_categories/')) {
          icon.source = this.apiServer.urlRepo + icon.source;
        }
      }
    });
  }

  dismissEvent() {
    this.activeModal.dismiss();
  }

  getIcons() {
    this.loadingIndicator = IndicatorState.LOADING;
    this.courseService
      .getIcons()
      .then((res) => {
        this.icons = res;
        this.setIconDataProperties();
        this.loadingIndicator = IndicatorState.LOADED;
      })
      .catch(() => {
        this.loadingIndicator = IndicatorState.LOADED;
      });
  }

  iconSelect(iconSource: Icon['source']) {
    this.selectedIcon = iconSource;
  }

  updateCourse(courseUpdate) {
    this.course = {
      id: courseUpdate.id,
      title: courseUpdate.title,
      description: courseUpdate.description,
      image: this.selectedIcon !== '' ? this.selectedIcon : this.course.image,
      coursePreRequisites: courseUpdate.coursePreRequisites,
      courseAudience: courseUpdate.courseAudience
    };

    this.updatedCourse.emit();
    this.activeModal.dismiss();
    this.courseService.editCourse(this.course);
  }

  leftScroll() {
    document.querySelector('.row-image-display').scrollBy(-100, 0);
  }

  rightScroll() {
    document.querySelector('.row-image-display').scrollBy(100, 0);
  }
}

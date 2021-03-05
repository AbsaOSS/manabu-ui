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
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseService } from 'src/app/services/course.service';
import IndicatorState from 'src/app/models/LoadingStates';

@Component({
  selector: 'app-course-reviews',
  templateUrl: './course-reviews.component.html',
  styleUrls: ['./course-reviews.component.scss']
})
export class CourseReviewsComponent implements OnInit {
  @Input() courseId;
  courseReviews;
  IndicatorState = IndicatorState;
  loadingIndicator: IndicatorState;

  constructor(public activeModal: NgbActiveModal, private courseService: CourseService) {}

  ngOnInit() {
    this.getCourseReviews(this.courseId);
  }

  getCourseReviews(courseId) {
    this.loadingIndicator = IndicatorState.LOADING;
    this.courseService.getAllReviews(courseId).then((response) => {
      this.courseReviews = response.getAllReviewsAssociatedWithCourse;
      this.loadingIndicator = IndicatorState.LOADED;
    });
  }
}

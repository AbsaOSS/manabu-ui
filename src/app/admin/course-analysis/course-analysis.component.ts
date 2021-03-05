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
import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/app.config';
import { environment } from 'src/environments/environment';
import { CourseService } from 'src/app/services/course.service';
import IndicatorState from 'src/app/models/LoadingStates';

@Component({
  selector: 'app-course-analysis',
  templateUrl: './course-analysis.component.html',
  styleUrls: ['./course-analysis.component.scss']
})
export class CourseAnalysisComponent implements OnInit {
  protected apiServer = AppConfig.settings.apiServer;
  courses: any;
  IndicatorState = IndicatorState;
  loadingIndicator: IndicatorState;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.loadingIndicator = IndicatorState.LOADING;
    this.courseService
      .getCoursesAnalysis()
      .then((courses) => {
        this.courses = courses.items;
        this.setCourseDataProperties();
        this.loadingIndicator = IndicatorState.LOADED;
      })
      .catch(() => {
        this.loadingIndicator = IndicatorState.LOADED;
      });
  }

  setCourseDataProperties() {
    this.courses.forEach((course) => {
      course.showStats = false;
      course.isArchiveOptionOn = false;
      if (!environment.production) {
        if (course.image.startsWith('/api/uploads/')) {
          course.image = this.apiServer.urlRepo + course.image;
        }
      }
    });
  }
}

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
import { UserService } from 'src/app/services/user.service';
import { CourseService } from 'src/app/services/course.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ToasterOptions } from 'src/app/models/toasterOptions';
import { ConfirmCourseRemovalFromCompletedComponent } from '../../modals/confirm-course-removal-from-completed/confirm-course-removal-from-completed.component';
import IndicatorState from 'src/app/models/LoadingStates';

@Component({
  selector: 'app-user-side-panel',
  templateUrl: './user-side-panel.component.html',
  styleUrls: ['./user-side-panel.component.scss']
})
export class UserSidePanelComponent implements OnInit {
  protected apiServer = AppConfig.settings.apiServer;
  userData: any;
  percentageCompleted: number;
  favouriteCourses: any[];
  favouriteCoursesIds: any[];
  favourites: any;
  completedCourses: any[];
  watchingCourses: any[];
  isReady = false;
  IndicatorState = IndicatorState;
  loadingIndicator: IndicatorState;

  constructor(
    private userService: UserService,
    private courseService: CourseService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.loadingIndicator = IndicatorState.LOADING;
    this.userService
      .getUserInfo()
      .then((data) => {
        this.userData = data;
        this.setCourseDataProperties();
        this.loadingIndicator = IndicatorState.LOADED;
      })
      .catch(() => {
        this.loadingIndicator = IndicatorState.LOADED;
      });
  }

  refreshPage() {
    this.userService.getUserInfo().then((data) => {
      this.userData = data;
      this.setCourseDataProperties();
    });
  }

  updateCourseFavourite(courseId) {
    this.courseService.addToFavourites(courseId);
    this.refreshPage();
  }

  setCourseDataProperties() {
    if (!environment.production) {
      if (this.userData.user.image.startsWith('/api/uploads/')) {
        this.userData.user.image = this.apiServer.urlRepo + this.userData.user.image;
      }
    }

    this.userData.user.initials = `${this.userData.user.name[0].toUpperCase()}${this.userData.user.surname[0].toUpperCase()}`;

    this.userData.watchingCourses.forEach((course) => {
      if (!environment.production) {
        if (course.image.startsWith('/api/uploads/')) {
          course.image = this.apiServer.urlRepo + course.image;
        }
      }
      this.percentageCompleted = (course.lessonProgress / course.totalLessons) * 100;
      course.percentageCompleted = this.percentageCompleted.toString();
    });

    if (!environment.production) {
      this.userData.completedCoursesExcludingInactiveCourses.forEach((course) => {
        if (course.image.startsWith('/api/uploads/')) {
          course.image = this.apiServer.urlRepo + course.image;
        }
      });
    }
  }

  confirmCourseRemoval(course) {
    const removeCourseFromFavouritesModalRef = this.modalService.open(ConfirmCourseRemovalFromCompletedComponent, {
      windowClass: 'contributor-modal'
    });
    removeCourseFromFavouritesModalRef.componentInstance.course = course;

    removeCourseFromFavouritesModalRef.componentInstance.confirmCourseRemoval.subscribe(() => {
      this.courseService.removeCourseFromCompleted(course.id).then(() => {
        this.toastr.success('Course successfully removed', null, ToasterOptions);
        this.refreshPage();
      });
    });
  }

  viewCourse(courseId) {
    this.router.navigate(['user/courseDetails', courseId]);
  }

  viewUsersPersonalDetails() {
    this.router.navigate(['user/personalInfo']);
  }
}

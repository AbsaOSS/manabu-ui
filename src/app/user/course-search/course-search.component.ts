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
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ToasterOptions, errorToasterOption } from 'src/app/models/toasterOptions';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Course } from 'src/app/models/Course';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import { KeycloakService } from 'src/app/services/keycloak.service';

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.scss']
})
export class CourseSearchComponent implements OnInit {
  userName: string;
  searchCourseTitle = new FormControl();
  coursesLoading = false;
  courses: Observable<Course[]>;
  userRole: string;
  constructor(
    private courseService: CourseService,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.userName = KeycloakService._user === undefined ? '' : KeycloakService._user.firstName;
    this.userRole = KeycloakService.getUserAccessPermissions();

    this.courses = this.searchCourseTitle.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => (this.coursesLoading = true)),
      switchMap((text) => this.courseService.getCoursesbySearch(text)),
      tap(() => (this.coursesLoading = false))
    );
  }

  getCourseForContinuation() {
    this.courseService.getCourseForContinuation().then((course) => {
      this.router.navigate(['/user/courseDetails', course.courseId]);
    });
  }

  getLatestCourse() {
    this.courseService.getLatestCourse().then((course) => {
      this.router.navigate(['/user/courseDetails', course.id]);
    });
  }

  getRandomCourse() {
    this.courseService.getAllCourses().then((courses) => {
      let course = courses.items[Math.floor(Math.random() * courses.items.length)];
      this.router.navigate(['/user/courseDetails', course.id]);
    });
  }

  requestAdminPermissions() {
    this.userService
      .adminPermissionRequest()
      .then((resp) => this.toastr.success('Your request has succesfully been submitted.', null, ToasterOptions))
      .catch(() => this.toastr.success('You have already submitted a request.', null, errorToasterOption));
  }
}

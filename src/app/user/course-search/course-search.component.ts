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

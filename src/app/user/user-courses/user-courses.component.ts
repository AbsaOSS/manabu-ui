import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/app.config';
import { CourseService } from 'src/app/services/course.service';
import { environment } from 'src/environments/environment';
import IndicatorState from 'src/app/models/LoadingStates';
import { ReviewsComponent } from '../modals/reviews/reviews.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseLevel } from 'src/app/models/CourseLevels';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.scss']
})
export class UserCoursesComponent implements OnInit {
  protected apiServer = AppConfig.settings.apiServer;
  courseLevel = CourseLevel;
  courses: any;
  reviews: any;

  IndicatorState = IndicatorState;
  loadingIndicator: IndicatorState;
  constructor(private courseService: CourseService, private router: Router, private modalService: NgbModal) {}

  ngOnInit() {
    this.loadingIndicator = IndicatorState.LOADING;
    this.courseService
      .getAllCourses()
      .then((resp) => {
        this.courses = resp.items;
        this.setupData();
        this.loadingIndicator = IndicatorState.LOADED;
      })
      .catch(() => {
        this.loadingIndicator = IndicatorState.LOADED;
      });
  }

  setupData() {
    let currentDate = new Date();
    this.courses.forEach((course) => {
      if (!environment.production) {
        if (course.image.startsWith('/api/uploads/')) {
          course.image = this.apiServer.urlRepo + course.image;
        }
      }

      course.authors.forEach((author) => {
        author.initials = `${author.name[0].toUpperCase()}${author.surname[0].toUpperCase()}`;
      });

      if (course.description.length > 70) {
        course.shortDescription = course.description.substring(0, 70).replace(/(<([^>]+)>)/gi, '') + ' ...';
      } else {
        course.shortDescription = course.description.replace(/(<([^>]+)>)/gi, '');
      }

      let theDayTheCourseWasCreated = new Date(course.createdAt).getDate();
      let tenDaysProceedingTheDateTheCourseWasCreated = theDayTheCourseWasCreated + 10;
      let theDateTenDaysAfterTheCourseWasCreated = new Date(
        new Date(course.createdAt).setDate(tenDaysProceedingTheDateTheCourseWasCreated)
      );

      if (theDateTenDaysAfterTheCourseWasCreated > currentDate) {
        course.courseIsNew = true;
      } else {
        course.courseIsNew = false;
      }
      let starredItems = new Array(Math.floor(course.rating)).fill('starred');
      let unStarredItems = new Array(5 - Math.floor(course.rating)).fill('unstarred');
      course.starItems = [...starredItems, ...unStarredItems];
    });
  }

  getSelectedReviews(courseId) {
    this.courseService.getAllReviews(courseId).then((resp) => {
      this.reviews = resp.getAllReviewsAssociatedWithCourse;
      const addReviewModalref = this.modalService.open(ReviewsComponent, {
        windowClass: 'contributor-modal',
        scrollable: true
      });
      addReviewModalref.componentInstance.reviews = this.reviews;
    });
  }

  viewCourse(course) {
    this.router.navigate(['user/courseDetails', course.id]);
  }
}

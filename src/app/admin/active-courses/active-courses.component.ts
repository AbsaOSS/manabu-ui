import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppConfig } from 'src/app/app.config';
import { CourseService } from 'src/app/services/course.service';
import { environment } from 'src/environments/environment';
import IndicatorState from 'src/app/models/LoadingStates';

@Component({
  selector: 'app-active-courses',
  templateUrl: './active-courses.component.html',
  styleUrls: ['./active-courses.component.scss']
})
export class ActiveCoursesComponent implements OnInit {
  protected apiServer = AppConfig.settings.apiServer;
  courses: any;
  navigationSubscription;
  IndicatorState = IndicatorState;
  loadingIndicator: IndicatorState;

  constructor(private courseService: CourseService, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.getData();
      }
    });
  }

  ngOnInit() {}

  getData() {
    this.loadingIndicator = IndicatorState.LOADING;
    this.courseService
      .getAdminCourses()
      .then((courses) => {
        this.courses = courses.items;
        this.setCourseDataProperties();
        this.loadingIndicator = IndicatorState.LOADED;
      })
      .catch(() => {
        this.loadingIndicator = IndicatorState.LOADED;
      });
  }

  refreshCourse(courseId) {
    setTimeout(() => {
      this.courseService.getAdminCourses().then((courses) => {
        this.courses = courses.items;
        this.setCourseDataProperties();
        this.courses.forEach((course) => {
          if (course.id === courseId) {
            course.showDetail = true;
            course.isArchiveOptionOn = true;
          }
        });
      });
    });
  }

  refreshPage() {
    setTimeout(() => {
      this.courseService.getAdminCourses().then((courses) => {
        this.courses = courses.items;
        this.setCourseDataProperties();
      });
    });
  }

  setCourseDataProperties() {
    this.courses.forEach((course) => {
      course.showDetail = false;
      course.isArchiveOptionOn = false;
      if (!environment.production) {
        if (course.image.startsWith('/api/uploads/')) {
          course.image = this.apiServer.urlRepo + course.image;
        }
      }

      if (course.description.length > 70) {
        course.shortDescription = course.description.substring(0, 70) + ' ...';
      } else {
        course.shortDescription = course.description;
      }
    });
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}

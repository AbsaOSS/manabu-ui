import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { AppConfig } from 'src/app/app.config';
import { environment } from 'src/environments/environment';
import IndicatorState from 'src/app/models/LoadingStates';

@Component({
  selector: 'app-archive',
  templateUrl: './archive-courses.component.html',
  styleUrls: ['./archive-courses.component.scss']
})
export class ArchiveComponent implements OnInit {
  protected apiServer = AppConfig.settings.apiServer;
  courses: any;
  IndicatorState = IndicatorState;
  loadingIndicator: IndicatorState;
  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.loadingIndicator = IndicatorState.LOADING;
    this.courseService
      .getArchivedCourses()
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
      this.courseService.getArchivedCourses().then((courses) => {
        this.courses = courses.items;
        this.setCourseDataProperties();
        this.courses.forEach((course) => {
          if (course.id === courseId) {
            course.showDetail = true;
          }
        });
      });
    });
  }

  setCourseDataProperties() {
    this.courses.forEach((course) => {
      course.showDetail = false;
      course.isArchiveOptionOn = false;
      course.resetCourse = false;
      if (!environment.production) {
        if (course.image.startsWith('/api/uploads/')) {
          course.image = this.apiServer.urlRepo + course.image;
        }
      }

      if (course.tags !== undefined && course.tags.length !== undefined) {
        course.tagLength = course.tags.length;
      } else {
        course.authors = [];
        course.tagLength = 0;
      }

      if (course.description.length > 70) {
        course.shortDescription = course.description.substring(0, 70) + ' ...';
      } else {
        course.shortDescription = course.description;
      }
    });
  }
}

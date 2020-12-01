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

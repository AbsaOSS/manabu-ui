import { Component, OnInit, Input } from '@angular/core';
import { StatisticsService } from '../../../services/statistics.service';
import IndicatorState from 'src/app/models/LoadingStates';

@Component({
  selector: 'app-course-stats',
  templateUrl: './course-stats.component.html',
  styleUrls: ['./course-stats.component.scss']
})
export class CourseStatsComponent implements OnInit {
  @Input() course;
  users: any;
  IndicatorState = IndicatorState;
  loadingIndicator: IndicatorState;

  constructor(private userCourseStats: StatisticsService) {}

  ngOnInit() {
    this.loadingIndicator = IndicatorState.LOADING;
    this.userCourseStats.getUserCourseStats(this.course.id).then((resp) => {this.users = resp; this.loadingIndicator = IndicatorState.LOADED; });
  }


}

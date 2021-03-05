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

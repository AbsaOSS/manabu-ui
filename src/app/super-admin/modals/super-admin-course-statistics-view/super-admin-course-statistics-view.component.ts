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
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StatisticsService } from '../../../services/statistics.service';
import IndicatorState from 'src/app/models/LoadingStates';

@Component({
  selector: 'app-super-admin-course-statistics-view',
  templateUrl: './super-admin-course-statistics-view.component.html',
  styleUrls: ['./super-admin-course-statistics-view.component.scss']
})
export class SuperAdminCourseStatisticsViewComponent implements OnInit {
  @Input() courseId;
  users;
  IndicatorState = IndicatorState;
  loadingIndicator: IndicatorState;

  constructor(public activeModal: NgbActiveModal, private userCourseStats: StatisticsService) {}

  ngOnInit() {
    this.loadingIndicator = IndicatorState.LOADING;
    this.userCourseStats.getUserCourseStats(this.courseId).then((resp) => {
      this.users = resp;
      this.loadingIndicator = IndicatorState.LOADED;
    });
  }
}

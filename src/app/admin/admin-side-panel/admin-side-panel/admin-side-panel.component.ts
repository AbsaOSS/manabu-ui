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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { environment } from 'src/environments/environment';
import { CourseStatisticsComponent } from '../../modals/course-statistics/course-statistics.component';
import IndicatorState from 'src/app/models/LoadingStates';

@Component({
  selector: 'app-admin-side-panel',
  templateUrl: './admin-side-panel.component.html',
  styleUrls: ['./admin-side-panel.component.scss']
})
export class AdminSidePanelComponent implements OnInit {
  protected apiServer = AppConfig.settings.apiServer;
  isReady = false;
  profile: any;
  courseItems: any;
  courseStats: any;
  show: boolean = false;
  courseLength: any;
  quickStats: any;

  graphDisplayValues: any[];
  statistics = [];
  showYAxis = true;
  showXAxis = false;
  showGridLines = true;
  colorScheme = {
    domain: ['#f5a538', '#af144b']
  };
  showLabels = false;
  gradient: boolean = false;
  animations: boolean = true;

  view: any[] = [240, 200];

  IndicatorState = IndicatorState;
  loadingIndicator: IndicatorState;
  showGraph: boolean;

  constructor(private adminService: AdminService, private modalService: NgbModal, private router: Router) {}

  ngOnInit() {
    this.getAdminSidePanelData();
  }

  getAdminSidePanelData() {
    this.loadingIndicator = IndicatorState.LOADING;
    this.adminService
      .sidePanelData()
      .then((courses) => {
        this.courseItems = courses.coursesByAuthor;
        this.quickStats = courses.quickStats;
        this.courseLength = this.courseItems.length;
        this.profile = courses.adminProfile;
        this.setCourseDataProperties();
        this.prepareAdminProfileData();
        this.loadingIndicator = IndicatorState.LOADED;
      })
      .catch(() => {
        this.loadingIndicator = IndicatorState.LOADED;
      });
  }

  prepareAdminProfileData() {
    if (!environment.production) {
      if (this.profile.user.image.startsWith('/api/uploads/')) {
        this.profile.user.image = this.apiServer.urlRepo + this.profile.user.image;
      }
    }
    this.profile.user.initials = `${this.profile.user.name[0].toUpperCase()}${this.profile.user.surname[0].toUpperCase()}`;
    this.getAuthorCourseStats();
  }

  setCourseDataProperties() {
    this.courseItems.forEach((course) => {
      if (!environment.production) {
        if (course.image.startsWith('/api/uploads/' || '/uploads')) {
          course.image = this.apiServer.urlRepo + course.image;
        }
      }
    });
  }

  getAuthorCourseStats() {
    for (let i = 0; i < this.quickStats.courseTitlesWithstats.length; i++) {
      let courseStat = {
        name: this.quickStats.courseTitlesWithstats[i].title,
        series: [
          {
            name: 'Completed',
            value: parseInt(this.quickStats.courseTitlesWithstats[i].watched)
          },
          {
            name: 'Watching',
            value: parseInt(this.quickStats.courseTitlesWithstats[i].watching)
          }
        ]
      };
      this.statistics.push(courseStat);
    }
    this.graphDisplayValues = this.statistics;
    for (let i = 0; i < this.graphDisplayValues.length; i++) {
      for (let j = 0; j < this.graphDisplayValues[i].series.length; j++) {
        if (this.graphDisplayValues[i].series[j].value >= 1) {
          this.showGraph = true;
          break;
        } else {
          //pass
        }
      }
    }
  }

  viewCourseStats() {
    let courseStatsModalRef = this.modalService.open(CourseStatisticsComponent, {
      windowClass: 'course-lesson-modal',
      size: 'lg',
      backdrop: 'static'
    });

    courseStatsModalRef.componentInstance.graphDisplayValues = this.graphDisplayValues;
    courseStatsModalRef.componentInstance.showYAxis = this.showYAxis;
    courseStatsModalRef.componentInstance.showXAxis = this.showXAxis;
    courseStatsModalRef.componentInstance.showGridLines = this.showGridLines;
    courseStatsModalRef.componentInstance.colorScheme = this.colorScheme;
    courseStatsModalRef.componentInstance.showLabels = this.showLabels;
    courseStatsModalRef.componentInstance.animations = this.animations;
    courseStatsModalRef.componentInstance.courseLength = this.courseLength;
    courseStatsModalRef.componentInstance.courseItems = this.courseItems;
  }

  viewAdminPersonalProfile() {
    this.router.navigate(['admin/personalInfo']);
  }
}

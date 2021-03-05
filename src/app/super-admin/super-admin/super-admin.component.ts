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
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterOptions } from 'src/app/models/toasterOptions';
import { SuperAdminService } from '../../services/superAdmin.service';
import { CourseService } from 'src/app/services/course.service';
import { ConfirmCourseActivationComponent } from 'src/app/admin/modals/confirm-course-activation/confirm-course-activation.component';
import { ConfirmCourseDeactivationComponent } from 'src/app/admin/modals/confirm-course-deactivation/confirm-course-deactivation.component';
import { SuperAdminCourseStatisticsViewComponent } from 'src/app/super-admin/modals/super-admin-course-statistics-view/super-admin-course-statistics-view.component';
import { CourseReviewsComponent } from 'src/app/super-admin/modals/course-reviews/course-reviews.component';
import IndicatorState from 'src/app/models/LoadingStates';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss']
})
export class SuperAdminComponent implements OnInit {
  protected apiServer = AppConfig.settings.apiServer;
  IndicatorState = IndicatorState;
  loadingIndicator: IndicatorState;
  adminPermissionRequests: any[] = [];
  courses: any[] = [];
  authorContributionRequests: any[] = [];

  constructor(
    private superAdminService: SuperAdminService,
    private toastr: ToastrService,
    private courseService: CourseService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getSuperAdminViewData();
  }

  getSuperAdminViewData() {
    this.loadingIndicator = IndicatorState.LOADING;
    this.superAdminService.getSuperAdminViewData().then((response) => {
      this.adminPermissionRequests = response.adminPermissionRequests;
      this.courses = response.courses;
      this.authorContributionRequests = response.authorContributionRequests;
      this.prepareCourseImages();
      this.loadingIndicator = IndicatorState.LOADED;
    });
  }

  approveAdminRequest(requestId: string) {
    this.superAdminService.userAdminPermissionApproval(requestId).then(() => {
      this.toastr.success('Admin role successfully granted.', null, ToasterOptions);
      this.getSuperAdminViewData();
    });
  }

  confirmCourseDeactivation(course) {
    const deactivateCourseModalRef = this.modalService.open(ConfirmCourseDeactivationComponent, {
      windowClass: 'contributor-modal'
    });
    deactivateCourseModalRef.componentInstance.course = course;

    deactivateCourseModalRef.componentInstance.confirmCoursedeActivation.subscribe(() => {
      this.courseService.deactivateCourse(course.id).then(() => {
        this.toastr.success('Course has been deactivated', null, ToasterOptions);
        this.getSuperAdminViewData();
      });
    });
  }

  confirmCourseActivation(course) {
    const activateCourseModalRef = this.modalService.open(ConfirmCourseActivationComponent, {
      windowClass: 'contributor-modal'
    });
    activateCourseModalRef.componentInstance.course = course;

    activateCourseModalRef.componentInstance.confirmCourseActivation.subscribe(() => {
      this.courseService.activateCourse(course.id).then(() => {
        this.toastr.success('Course has been activated', null, ToasterOptions);
        this.getSuperAdminViewData();
      });
    });
  }

  viewDetailedCourseStatistics(course) {
    const detailedCourseStatisticsModalRef = this.modalService.open(SuperAdminCourseStatisticsViewComponent, {
      windowClass: 'stats-modal',
      centered: true
    });

    detailedCourseStatisticsModalRef.componentInstance.courseId = course.id;
  }

  viewCourseReviews(course) {
    const courseReviewsModalRef = this.modalService.open(CourseReviewsComponent, {
      centered: true
    });

    courseReviewsModalRef.componentInstance.courseId = course.id;
  }

  prepareCourseImages() {
    this.courses.forEach((course) => {
      if (course.image.startsWith('/api/uploads/')) {
        course.image = this.apiServer.urlRepo + '/course_categories/' + course.image.split('/api/uploads/')[1];
      }
    });
  }

  approveAuthorContributionRequest(requestId, userId, courseId) {
    this.superAdminService.approveAuthorContributionRequest(requestId, userId, courseId).then(() => {
      this.toastr.success('Admin role and course author role successfully granted.', null, ToasterOptions);
      this.getSuperAdminViewData();
    });
  }
}

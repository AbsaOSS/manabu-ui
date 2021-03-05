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
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { errorToasterOption, ToasterOptions } from 'src/app/models/toasterOptions';
import IndicatorState from 'src/app/models/LoadingStates';
import { BriefCourseOverviewComponent } from 'src/app/admin/modals/brief-course-overview/brief-course-overview.component';
import { ContributionRequestService } from 'src/app/services/contributionRequest.service';
import { NotificationService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  @Output() notificationsSeen: EventEmitter<any> = new EventEmitter<any>();
  @Input() isAdmin: boolean;
  contributionRequests: [];
  contributionRequestStatus: [];
  IndicatorState = IndicatorState;
  loadingIndicator: IndicatorState;
  tabPanelLayout = 'fill';

  constructor(
    private modalService: NgbModal,
    private notificationService: NotificationService,
    private contributionRequestService: ContributionRequestService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.getContributionRequests();
  }

  getContributionRequests() {
    this.loadingIndicator = IndicatorState.LOADING;
    this.notificationService.getContributionRequests().then((response) => {
      this.contributionRequests = response.requests;
      this.markNotificationsAsSeen();
    });
  }

  getContributionRequestStatus() {
    this.loadingIndicator = IndicatorState.LOADING;
    this.notificationService.contributionRequestStatus().then((response) => {
      this.contributionRequestStatus = response.activeRequests;
      this.markNotificationsAsSeen();
    });
  }

  acceptContributionRequest(contributionRequestId: string) {
    this.contributionRequestService.acceptContributionRequest(contributionRequestId).then(() => {
      this.toastr.success('Contribution request successfully accepted', null, ToasterOptions);
      this.getContributionRequests();
    });
  }

  rejectContributionRequest(contributionRequestId: string) {
    this.contributionRequestService.rejectContributionRequest(contributionRequestId).then(() => {
      this.toastr.success('Contribution request successfully rejected', null, ToasterOptions);
      this.getContributionRequests();
    });
  }

  deleteContributionRequestStatus(contributionRequestId: string) {
    this.contributionRequestService.deleteContributionRequestStatus(contributionRequestId).then(() => {
      this.toastr.success('Contribution request status successfully deleted', null, ToasterOptions);
      this.getContributionRequestStatus();
    });
  }

  markNotificationsAsSeen() {
    this.notificationService.markContributionRequestsAsRead().then(() => {
      this.notificationsSeen.emit();
      this.loadingIndicator = IndicatorState.LOADED;
    });
  }

  viewCourseDescription(request) {
    const briefCourseDescriptionModelRef = this.modalService.open(BriefCourseOverviewComponent, {
      windowClass: 'contributor-modal'
    });

    briefCourseDescriptionModelRef.componentInstance.description = request.courseDescription;
    briefCourseDescriptionModelRef.componentInstance.courseTitle = request.courseTitle;
    briefCourseDescriptionModelRef.componentInstance.courseImage = request.courseImage;
  }
}

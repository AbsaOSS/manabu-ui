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
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppConfig } from 'src/app/app.config';
import { ToasterOptions } from 'src/app/models/toasterOptions';
import IndicatorState from 'src/app/models/LoadingStates';
import { AdminService } from 'src/app/services/admin.service';
import { ContributionRequestService } from 'src/app/services/contributionRequest.service';

@Component({
  selector: 'app-add-contributor',
  templateUrl: './add-contributor.component.html',
  styleUrls: ['./add-contributor.component.scss']
})
export class AddContributorComponent implements OnInit {
  protected apiServer = AppConfig.settings.apiServer;
  @Input() courseId: string;
  @Input() description: string;
  @Input() courseTitle: string;
  @Input() courseImage: string;
  @Output() contributorActionCompleted: EventEmitter<string> = new EventEmitter<string>();
  IndicatorState = IndicatorState;
  loadingIndicator: IndicatorState;

  authors;
  requestedAuthorsToBeContributors = [];

  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private adminService: AdminService,
    private contributionRequests: ContributionRequestService
  ) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.loadingIndicator = IndicatorState.LOADING;
    this.adminService.getAllUsers(this.courseId).then((response) => {
      this.authors = response.usersNotLinkedToCourse;
      this.prepareImagesAndInitials();
      this.loadingIndicator = IndicatorState.LOADED;
    });
  }

  pushAuthor(event, authorId) {
    if (this.requestedAuthorsToBeContributors.includes(authorId)) {
      let index = this.requestedAuthorsToBeContributors.indexOf(authorId);
      this.requestedAuthorsToBeContributors.splice(index, 1);
    } else {
      this.requestedAuthorsToBeContributors.push(authorId);
    }
  }

  submitContributionRequest() {
    let contributorsArray = [];
    let contributorsMetaDataArray = [];
    this.requestedAuthorsToBeContributors.forEach((authorsId) => {
      let authorRequest = {
        courseId: this.courseId,
        userId: authorsId,
        courseTitle: this.courseTitle,
        courseImage: this.courseImage,
        courseDescription: this.description.replace(/(<([^>]+)>)/gi, '')
      };

      contributorsArray.push(authorRequest);
    });

    this.requestedAuthorsToBeContributors.forEach((contributorsId) => {
      let author = this.authors.filter((author) => author.id === contributorsId)[0];

      let authorMeta = {
        id: contributorsId,
        name: author.name,
        surname: author.surname
      };

      contributorsMetaDataArray.push(authorMeta);
    });

    this.contributionRequests.addContributor(contributorsArray, contributorsMetaDataArray).then(() => {
      this.toastr.success('Contribution request(s) have been successfully sent.', null, ToasterOptions);
      this.contributorActionCompleted.emit();
      this.activeModal.dismiss();
    });
  }

  prepareImagesAndInitials() {
    this.authors.forEach((author) => {
      author.initials = `${author.name[0].toUpperCase()}${author.surname[0].toUpperCase()}`;
      if (author.image.startsWith('/api/uploads/')) {
        author.image = this.apiServer.urlRepo + author.image;
      }
    });
  }
}

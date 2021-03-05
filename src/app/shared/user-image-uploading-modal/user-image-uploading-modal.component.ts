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
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { AppConfig } from 'src/app/app.config';
import { ToastrService } from 'ngx-toastr';
import { errorToasterOption, ToasterOptions } from 'src/app/models/toasterOptions';
import IndicatorState from 'src/app/models/LoadingStates';
import { FileItem, FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-user-image-uploading-modal',
  templateUrl: './user-image-uploading-modal.component.html',
  styleUrls: ['./user-image-uploading-modal.component.scss']
})
export class UserImageUploadingModalComponent implements OnInit {
  @Output() updatedUserImage: EventEmitter<string> = new EventEmitter<string>();
  protected apiServer = AppConfig.settings.apiServer;
  IndicatorState = IndicatorState;
  loadingIndicator: IndicatorState;
  imageUploader;
  fileUploadedMessage: string;
  imageLink;
  imageName;
  userInfo;

  constructor(public activeModal: NgbActiveModal, private sanitizer: DomSanitizer, private toastr: ToastrService) {
    this.imageUploader = new FileUploader({
      url: this.apiServer.user.updateUserPersonalImage,
      itemAlias: 'file',
      authToken: 'Bearer ' + KeycloakService.getToken()
    });

    this.imageUploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('id', this.userInfo.id);
      form.append('fileExtension', fileItem.file.type.split('/').pop());
    };

    this.imageUploader.onErrorItem = (item) => this.onErrorItem(item);
    this.imageUploader.onSuccessItem = (item) => {
      this.onSuccessItem(item);
    };
  }

  ngOnInit() {
    this.afterFileAdd();
  }

  closeModal() {
    this.activeModal.dismiss();
  }

  afterFileAdd() {
    this.imageUploader.onAfterAddingFile = (file) => {
      this.imageLink = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file._file));
      file.withCredentials = false;
    };
  }

  onFileSelected(file) {
    this.imageName = file.target.files[0].name;
  }

  onErrorItem(item: FileItem): any {
    this.fileUploadedMessage = 'There was an error uploading ' + item.file.name;
    setTimeout(() => {
      this.toastr.success(this.fileUploadedMessage, null, errorToasterOption);
      this.activeModal.dismiss();
    }, 1000);
  }

  uploadImage() {
    this.loadingIndicator = IndicatorState.LOADING;
    this.imageUploader.uploadAll();
  }

  onSuccessItem(item: FileItem): any {
    this.fileUploadedMessage = item.file.name + ' was uploaded successfully';
    setTimeout(() => {
      this.toastr.success(this.fileUploadedMessage, null, ToasterOptions);
      this.updatedUserImage.emit(this.imageLink);
      this.activeModal.dismiss();
    }, 1000);
  }
}

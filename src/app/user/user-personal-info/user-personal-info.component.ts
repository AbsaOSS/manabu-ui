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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CourseService } from 'src/app/services/course.service';
import { ToasterOptions } from 'src/app/models/toasterOptions';
import { UserImageUploadingModalComponent } from '../../shared/user-image-uploading-modal/user-image-uploading-modal.component';
import { ConfirmCourseRemovalFromCompletedComponent } from '../modals/confirm-course-removal-from-completed/confirm-course-removal-from-completed.component';
import IndicatorState from 'src/app/models/LoadingStates';

@Component({
  selector: 'app-user-personal-info',
  templateUrl: './user-personal-info.component.html',
  styleUrls: ['./user-personal-info.component.scss']
})
export class UserPersonalInfoComponent implements OnInit {
  userInfo: any;
  numberOfCoursesAdminIsWatching: number;
  numberOfAdminsFavouriteCourses: number;
  percentageCompleted: number;
  numberOfCoursesCompletedByAdmin: number;
  userComparisonStatistics = [];
  usersFavouriteCourses: [];
  usersCompletedCourses;
  usersActiveCourses;
  imageFile;
  rawUserComparisonstats;
  userUrlLinkIsBeingEdited: boolean = false;
  userAboutIsBeingEdited: boolean = false;
  userAboutIsEmpty: boolean = false;
  userUrlLinkIsEmpty: boolean = false;

  view: any[] = [240, 200];
  colorScheme = {
    domain: ['#f5a538', '#af144b']
  };
  graphDisplayValues: any[];
  gradient: boolean = false;
  showYAxis = true;
  showXAxis = false;
  showGridLines = true;
  animations: boolean = true;

  IndicatorState = IndicatorState;
  loadingIndicator: IndicatorState;

  constructor(
    private userService: UserService,
    private courseService: CourseService,
    private modalService: NgbModal,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getUserPersonalInformation();
  }

  getUserPersonalInformation() {
    this.loadingIndicator = IndicatorState.LOADING;
    this.userService
      .getUserPersonalInfo()
      .then((userInfo) => {
        this.userInfo = userInfo.user;
        this.numberOfCoursesAdminIsWatching = userInfo.numberOfCoursesUserIsWatching;
        this.numberOfAdminsFavouriteCourses = userInfo.numberOfUsersFavouriteCourses;
        this.numberOfCoursesCompletedByAdmin = userInfo.numberOfCompletedCoursesByUser;
        this.usersFavouriteCourses = userInfo.usersFavouriteCourses;
        this.usersCompletedCourses = userInfo.usersCompletedCourses;
        this.usersActiveCourses = userInfo.watchingCourses;
        this.rawUserComparisonstats = userInfo.userPerformanceComparison;
        this.prepareUserProfileData();
        this.setUserPerformanceComparisonStats();
        this.loadingIndicator = IndicatorState.LOADED;
      })
      .catch(() => {
        this.loadingIndicator = IndicatorState.LOADED;
      });
  }

  prepareUserProfileData() {
    if (this.userInfo.profileUrlLink.length === 0) {
      this.userUrlLinkIsEmpty = true;
      this.userUrlLinkIsBeingEdited = true;
    }

    if (this.userInfo.aboutAuthor.length === 0) {
      this.userAboutIsEmpty = true;
      this.userAboutIsBeingEdited = true;
    }

    this.userInfo.initials = `${this.userInfo.name[0].toUpperCase()}${this.userInfo.surname[0].toUpperCase()}`;
    this.usersActiveCourses.forEach((course) => {
      this.percentageCompleted = (course.progress / course.totalLessons) * 100;
      course.percentageCompleted = this.percentageCompleted.toString();
    });

    if (this.userInfo.aboutAuthor.length >= 22) {
      let splitAboutAuthor = this.userInfo.aboutAuthor.split('', 22).join('');
      let abbreviatedAboutAuthor = `${splitAboutAuthor}...`;
      this.userInfo.abbreviatedAboutAuthor = abbreviatedAboutAuthor;
    }

    if (this.userInfo.profileUrlLink.length >= 22) {
      let splitUrlLink = this.userInfo.profileUrlLink.split('', 22).join('');
      let abbreviatedProflileUrlLink = `${splitUrlLink}...`;
      this.userInfo.abbreviatedProflileUrlLink = abbreviatedProflileUrlLink;
    }

    this.usersCompletedCourses.forEach((course) => {
      if (course.courseName.length >= 19) {
        let splitCourseName = course.courseName.split('', 19).join('');
        let abbreviatedCourseName = `${splitCourseName}...`;
        course.courseName = abbreviatedCourseName;
      }
    });
  }

  uploadUserImage() {
    const userImageUploadModalRef = this.modalService.open(UserImageUploadingModalComponent, {
      windowClass: 'user-personal-image-upload-modal',
      size: 'lg',
      backdrop: 'static'
    });

    userImageUploadModalRef.componentInstance.userInfo = this.userInfo;
    userImageUploadModalRef.componentInstance.updatedUserImage.subscribe((image) => {
      this.imageFile = image;
      this.getUserPersonalInformation();
    });
  }

  confirmCourseRemoval(course) {
    const removeCourseFromFavouritesModalRef = this.modalService.open(ConfirmCourseRemovalFromCompletedComponent, {
      windowClass: 'contributor-modal'
    });
    removeCourseFromFavouritesModalRef.componentInstance.course = course;

    removeCourseFromFavouritesModalRef.componentInstance.confirmCourseRemoval.subscribe(() => {
      this.courseService.removeCourseFromCompleted(course.id).then(() => {
        this.toastr.success('Course successfully removed', null, ToasterOptions);
        this.getUserPersonalInformation();
      });
    });
  }

  updateUserAbout(updatedUserInformation) {
    if (this.userAboutIsBeingEdited) {
      this.userService.updateUserPersonalInformation(updatedUserInformation).then((resp) => {
        if (this.userInfo.aboutAuthor.length === 0) {
          this.userAboutIsEmpty = true;
        }
        this.userAboutIsBeingEdited = false;
        this.toastr.success('Personal information succesfully updated.', null, ToasterOptions);
        this.getUserPersonalInformation();
      });
    } else {
      this.userAboutIsBeingEdited = true;
    }
  }

  updateUserExternalBio(updatedUserInformation) {
    if (this.userUrlLinkIsBeingEdited) {
      this.userService.updateUserPersonalInformation(updatedUserInformation).then((resp) => {
        if (this.userInfo.profileUrlLink.length === 0) {
          this.userUrlLinkIsEmpty = true;
        }
        this.userUrlLinkIsBeingEdited = false;
        this.toastr.success('Personal information succesfully updated.', null, ToasterOptions);
        this.getUserPersonalInformation();
      });
    } else {
      this.userUrlLinkIsBeingEdited = true;
    }
  }

  reviewProfileUpdateStatus(label: string, updatedUserInformation) {
    switch (label) {
      case 'ABOUT':
        if (this.userAboutIsEmpty) {
          this.userAboutIsEmpty = false;
        }
        this.updateUserAbout(updatedUserInformation);
        break;
      case 'BIO':
        if (this.userUrlLinkIsEmpty) {
          this.userUrlLinkIsEmpty = false;
        }
        this.updateUserExternalBio(updatedUserInformation);
        break;
    }
  }

  updateUserPersonalDetails(updatedUserInformation) {
    this.userService
      .updateUserPersonalInformation(updatedUserInformation)
      .then(() => this.toastr.success('Personal information succesfully updated.', null, ToasterOptions));
  }

  setUserPerformanceComparisonStats() {
    this.rawUserComparisonstats.forEach((category) => {
      let comparisonFigures = {
        name: category.heading,
        series: [
          {
            name: 'Community',
            value: category.communityContributions
          },
          {
            name: 'You',
            value: category.usersContributions
          }
        ]
      };
      this.userComparisonStatistics.push(comparisonFigures);
    });

    this.graphDisplayValues = this.userComparisonStatistics;
  }

  viewCourse(courseId) {
    this.router.navigate(['user/courseDetails', courseId]);
  }
}

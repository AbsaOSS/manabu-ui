import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ToasterOptions } from 'src/app/models/toasterOptions';
import { UserImageUploadingModalComponent } from '../../shared/user-image-uploading-modal/user-image-uploading-modal.component';
import { CourseService } from 'src/app/services/course.service';
import IndicatorState from 'src/app/models/LoadingStates';

@Component({
  selector: 'app-admin-personal-info',
  templateUrl: './admin-personal-info.component.html',
  styleUrls: ['./admin-personal-info.component.scss']
})
export class AdminPersonalInfoComponent implements OnInit {
  courses: any;
  reviews: any;
  adminInfo: any;
  imageFile;
  opened = -1;
  showReview: boolean = false;
  adminUrlLinkIsBeingEdited: boolean = false;
  adminAboutIsBeingEdited: boolean = false;
  adminAboutIsEmpty: boolean = false;
  adminUrlLinkIsEmpty: boolean = false;

  numberOfCoursesAdminIsWatching: number;
  numberOfAdminsFavouriteCourses: number;
  numberOfCoursesCompletedByAdmin: number;
  IndicatorState = IndicatorState;
  loadingIndicator: IndicatorState;

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private courseService: CourseService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getAdminPersonalInformation();
    this.getAdminCourses();
  }

  toggle(courseId) {
    this.opened = courseId;
  }

  showCourseReview(course) {
    if (course.showReview === true) {
      course.showReview = false;
    } else {
      course.showReview = true;
      this.toggle(course.id);
      this.getSelectedReviews(course.id);
    }
  }

  getAdminPersonalInformation() {
    this.loadingIndicator = IndicatorState.LOADING;
    this.adminService
      .adminPersonalInfo()
      .then((adminInfo) => {
        this.adminInfo = adminInfo.user;
        this.numberOfCoursesAdminIsWatching = adminInfo.numberOfCoursesUserIsWatching;
        this.numberOfAdminsFavouriteCourses = adminInfo.numberOfUsersFavouriteCourses;
        this.numberOfCoursesCompletedByAdmin = adminInfo.numberOfCompletedCoursesByUser;
        this.prepareAdminProfileData();
        this.loadingIndicator = IndicatorState.LOADED;
      })
      .catch(() => {
        this.loadingIndicator = IndicatorState.LOADED;
      });
  }

  getAdminCourses() {
    this.loadingIndicator = IndicatorState.LOADING;
    this.courseService
      .getAdminCourses()
      .then((courses) => {
        this.courses = courses.items;
        this.showCourseReview(this.courses[0])
        this.loadingIndicator = IndicatorState.LOADED;
      })
      .catch(() => {
        this.loadingIndicator = IndicatorState.LOADED;
      });
  }

  prepareAdminProfileData() {
    if (this.adminInfo.profileUrlLink.length === 0) {
      this.adminUrlLinkIsEmpty = true;
      this.adminUrlLinkIsBeingEdited = true;
    }

    if (this.adminInfo.aboutAuthor.length === 0) {
      this.adminAboutIsEmpty = true;
      this.adminAboutIsBeingEdited = true;
    }

    if (this.adminInfo.aboutAuthor.length >= 22) {
      let splitAboutAuthor = this.adminInfo.aboutAuthor.split('', 22).join('');
      let abbreviatedAboutAuthor = `${splitAboutAuthor}...`;
      this.adminInfo.abbreviatedAboutAuthor = abbreviatedAboutAuthor;
    }

    if (this.adminInfo.profileUrlLink.length >= 22) {
      let splitUrlLink = this.adminInfo.profileUrlLink.split('', 22).join('');
      let abbreviatedProflileUrlLink = `${splitUrlLink}...`;
      this.adminInfo.abbreviatedProflileUrlLink = abbreviatedProflileUrlLink;
    }

    this.adminInfo.initials = `${this.adminInfo.name[0].toUpperCase()}${this.adminInfo.surname[0].toUpperCase()}`;
  }
  prepareUserData() {
    this.reviews.initials = `${this.adminInfo.useName[0].toUpperCase()}${this.reviews.userSurname[0].toUpperCase()}`;
  }

  uploadAdminImage() {
    const adminImageUploadModalRef = this.modalService.open(UserImageUploadingModalComponent, {
      windowClass: 'user-personal-image-upload-modal',
      size: 'lg',
      backdrop: 'static'
    });

    adminImageUploadModalRef.componentInstance.userInfo = this.adminInfo;
    adminImageUploadModalRef.componentInstance.updatedAdminImage.subscribe((image) => {
      this.imageFile = image;
      this.getAdminPersonalInformation();
    });
  }

  updateUserAbout(updatedUserInformation) {
    if (this.adminAboutIsBeingEdited) {
      this.userService.updateUserPersonalInformation(updatedUserInformation).then((resp) => {
        if (this.adminInfo.aboutAuthor.length === 0) {
          this.adminAboutIsEmpty = true;
        }
        this.adminAboutIsBeingEdited = false;
        this.toastr.success('Personal information succesfully updated.', null, ToasterOptions);
        this.getAdminPersonalInformation();
      });
    } else {
      this.adminAboutIsBeingEdited = true;
    }
  }

  updateUserExternalBio(updatedUserInformation) {
    if (this.adminUrlLinkIsBeingEdited) {
      this.userService.updateUserPersonalInformation(updatedUserInformation).then((resp) => {
        if (this.adminInfo.profileUrlLink.length === 0) {
          this.adminUrlLinkIsEmpty = true;
        }
        this.adminUrlLinkIsBeingEdited = false;
        this.toastr.success('Personal information succesfully updated.', null, ToasterOptions);
        this.getAdminPersonalInformation();
      });
    } else {
      this.adminUrlLinkIsBeingEdited = true;
    }
  }

  reviewProfileUpdateStatus(label: string, updatedUserInformation) {
    switch (label) {
      case 'ABOUT':
        if (this.adminAboutIsEmpty) {
          this.adminAboutIsEmpty = false;
        }
        this.updateUserAbout(updatedUserInformation);
        break;
      case 'BIO':
        if (this.adminUrlLinkIsEmpty) {
          this.adminUrlLinkIsEmpty = false;
        }
        this.updateUserExternalBio(updatedUserInformation);
        break;
    }
  }

  getSelectedReviews(courseId) {
    this.courseService.getAllReviews(courseId).then((resp) => {
      this.reviews = resp.getAllReviewsAssociatedWithCourse;
    });
  }
}

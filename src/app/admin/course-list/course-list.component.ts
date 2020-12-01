import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ToasterOptions } from 'src/app/models/toasterOptions';
import { CourseService } from 'src/app/services/course.service';
import { ConfirmCourseDeleteComponent } from '../modals/confirm-course-delete/confirm-course-delete.component';
import { ConfirmCourseAddComponent } from '../modals/confirm-course-add/confirm-course-add.component';
import { EditCourseComponent } from '../modals/edit-course/edit-course.component';
import { Course } from 'src/app/models/Course';
import { ConfirmCourseActivationComponent } from '../modals/confirm-course-activation/confirm-course-activation.component';
import { ConfirmCourseDeactivationComponent } from '../modals/confirm-course-deactivation/confirm-course-deactivation.component';
import IndicatorState from 'src/app/models/LoadingStates';

@Component({
  selector: 'app-courses',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CoursesComponent implements OnInit {
  @Input() resetCourseOption = false;
  @Input() courseStats = false;
  @Input() courses: any;
  @Input() loadingIndicator: any;
  @Output() callRefresh: EventEmitter<string> = new EventEmitter<string>();
  IndicatorState = IndicatorState;

  constructor(private courseService: CourseService, private modalService: NgbModal, private toastr: ToastrService) {}

  ngOnInit() {}

  refreshCourse(courseId) {
    this.callRefresh.emit(courseId);
  }

  refreshPage() {
    this.callRefresh.emit();
  }

  showCourseDetail(course) {
    course.showDetail = !course.showDetail;
    if (!this.resetCourseOption) {
      course.isArchiveOptionOn = !course.isArchiveOptionOn;
    } else {
      course.resetCourse = !course.resetCourse;
    }
  }

  confirmDelete(course) {
    const deleteCourseModalRef = this.modalService.open(ConfirmCourseDeleteComponent, {
      windowClass: 'contributor-modal'
    });
    deleteCourseModalRef.componentInstance.course = course;

    deleteCourseModalRef.componentInstance.confirmDeleteCourse.subscribe(() => {
      this.courseService.archiveCourse(course.id).then(() => {
        this.toastr.success('Course successfully archived', null, ToasterOptions);
        this.refreshCourse(course.id);
      });
    });
  }

  confirmCourseAdd(course) {
    const addCourseModalRef = this.modalService.open(ConfirmCourseAddComponent, {
      windowClass: 'contributor-modal'
    });
    addCourseModalRef.componentInstance.course = course;

    addCourseModalRef.componentInstance.confirmAddCourse.subscribe(() => {
      this.courseService.makeCourseActive(course.id).then(() => {
        this.toastr.success('Course successfully added', null, ToasterOptions);
        this.refreshCourse(course.id);
      });
    });
  }

  editCourse(course: Course) {
    let editModalRef = this.modalService.open(EditCourseComponent, {
      windowClass: 'course-lesson-modal',
      size: 'lg',
      backdrop: 'static'
    });

    editModalRef.componentInstance.course = course;
    editModalRef.componentInstance.updatedCourse.subscribe(() => {
      this.toastr.success('Course has been successfuly updated', null, ToasterOptions);
      this.refreshCourse(course.id);
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
        this.refreshPage();
      });
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
        this.refreshPage();
      });
    });
  }
}

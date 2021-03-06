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
import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { ConfirmDismissalOfCourseCreationModalComponent } from '../confirm-dismissal-of-course-creation-modal/confirm-dismissal-of-course-creation-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Lesson } from 'src/app/models/Lessons';

@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-course-lesson.component.html',
  styleUrls: ['../add-quiz/add-quiz.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateCourseLessonComponent implements OnInit {
  @Input() addCourse: boolean = false;
  @Input() courseId: string;
  @Output() isComplete: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() lesson: Lesson;
  headerText = '';
  selectModalReady = false;
  courseContentHasBeenUpdated = false;
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) {}

  ngOnInit() {
    this.headerText = this.addCourse ? 'Add New Course' : 'Add a Lesson';
    this.selectModalReady = true;
  }

  lessonStepActivated(stepHeader) {
    this.headerText = stepHeader;
  }

  lessonCreated(Response) {
    this.activeModal.dismiss();
    this.isComplete.emit(Response);
  }

  closeModal() {
    if (this.courseContentHasBeenUpdated) {
      this.promptModalDismisal();
    } else {
      this.activeModal.dismiss();
    }
  }

  activateCourseContentAlert(hasCourseBeenModifed: boolean) {
    hasCourseBeenModifed ? (this.courseContentHasBeenUpdated = true) : (this.courseContentHasBeenUpdated = false);
  }

  promptModalDismisal() {
    const confirmCourseProgressTermination = this.modalService.open(ConfirmDismissalOfCourseCreationModalComponent, {
      windowClass: 'contributor-modal'
    });
    confirmCourseProgressTermination.componentInstance.confirmCourseProgressTermination.subscribe(() => {
      this.activeModal.dismiss();
    });
  }
}

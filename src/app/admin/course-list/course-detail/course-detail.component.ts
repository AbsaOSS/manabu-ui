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
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import ClassicEditor from 'src/assets/build/ckeditor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Lesson } from 'src/app/models/Lessons';
import { errorToasterOption, ToasterOptions } from 'src/app/models/toasterOptions';
import { CourseService } from 'src/app/services/course.service';
import { LessonService } from 'src/app/services/lesson-service';
import { TagsService } from 'src/app/services/tags.service';
import { AddContributorComponent } from '../../modals/add-contributor/add-contributor.component';
import { AddQuizComponent } from '../../modals/add-quiz/add-quiz.component';
import { AddTagsComponent } from '../../modals/add-tags/add-tags.component';
import { CreateCourseLessonComponent } from '../../modals/create-course-lesson/create-course-lesson.component';
import { DeleteLessonComponent } from '../../modals/delete-lesson/delete-lesson.component';
import { DownloadComponent } from '../../modals/download/download.component';
import { PreviewComponent } from '../../modals/preview/preview.component';
import { ConfirmTagRemovalComponent } from '../../modals/confirm-tag-removal/confirm-tag-removal.component';
import IndicatorState from 'src/app/models/LoadingStates';
import { OrderLessonCompletedComponent } from '../../modals/move-lesson/order-lesson.component';
import { CourseLevel } from 'src/app/models/CourseLevels';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  public Editor = ClassicEditor;
  @Input() course;
  @Output() refreshCourse: EventEmitter<string> = new EventEmitter<string>();
  IndicatorState = IndicatorState;
  loadingIndicator: IndicatorState;
  courseLevel;

  tagAddedMessage: string = '';
  courseDetails: any;
  orderedLessons: any;
  lessonBeingMoved: any;

  courseLevels = [];
  levelInterfaceObjects = CourseLevel;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private courseService: CourseService,
    private lessonService: LessonService,
    private tagsService: TagsService
  ) {}

  ngOnInit() {
    this.loadingIndicator = IndicatorState.LOADING;
    this.turnCourseLevelInterfaceIntoArray();
    this.lessonService.getCourseLessons(this.course.id).then((resp) => {
      this.courseDetails = resp.lessons[0];
      this.loadingIndicator = IndicatorState.LOADED;
    });
  }

  showLessonActionBar(selectedLesson: Lesson) {
    if (selectedLesson.displayActions === true) {
      this.saveLesson(selectedLesson);
    } else {
      this.courseDetails.lessons.forEach((lesson) => {
        lesson.displayActions = false;
        if (lesson === selectedLesson) {
          lesson.displayActions = true;
        }
      });
    }
  }

  editCourse() {
    this.courseService.editCourse(this.course).then((resp) => {
      this.toastr.success('Course information successfully updated!!', null, ToasterOptions);
      this.refreshCourse.emit(this.course.id);
    });
  }

  saveLesson(selectedLesson: Lesson) {
    this.lessonService.editLesson(selectedLesson).then((resp) => {
      selectedLesson.displayActions = false;
      this.toastr.success('Lesson successfully edited!!', null, ToasterOptions);
      this.refreshCourse.emit(this.course.id);
    });
  }

  removeLesson(selectedLesson: Lesson) {
    const deleteLessonModalRef = this.modalService.open(DeleteLessonComponent, {
      windowClass: 'delete-lesson-modal'
    });

    deleteLessonModalRef.componentInstance.lesson = selectedLesson;
    deleteLessonModalRef.componentInstance.deleteConfirmed.subscribe(() => {
      this.toastr.success('Lesson successfully removed!!', null, ToasterOptions);
      this.refreshCourse.emit(this.course.id);
    });
  }

  addTag() {
    const tagModalRef = this.modalService.open(AddTagsComponent, {
      windowClass: 'add-tags-modal'
    });
    tagModalRef.componentInstance.courseId = this.course.id;
    tagModalRef.componentInstance.tagAdded.subscribe((message) => {
      this.toastr.success(message, null, ToasterOptions);
      this.refreshCourse.emit(this.course.id);
    });
  }

  downloadLesson(lessonTitle, lessonVideo) {
    const downloadModalRef = this.modalService.open(DownloadComponent, {
      windowClass: 'download-modal'
    });

    downloadModalRef.componentInstance.lessonName = lessonTitle;
    downloadModalRef.componentInstance.lessonSource = lessonVideo;
  }

  previewContent() {
    const previewModalRef = this.modalService.open(PreviewComponent, {
      windowClass: 'download-modal'
    });
    previewModalRef.componentInstance.courseId = this.course.id;
  }

  addContributors() {
    const contributorsModelRef = this.modalService.open(AddContributorComponent, {
      windowClass: 'contributor-modal',
      scrollable: true
    });

    contributorsModelRef.componentInstance.courseTitle = this.course.title;
    contributorsModelRef.componentInstance.description = this.course.description;
    contributorsModelRef.componentInstance.courseId = this.course.id;
    contributorsModelRef.componentInstance.courseImage = this.course.image;
    contributorsModelRef.componentInstance.contributorActionCompleted.subscribe((result) => {
      this.refreshCourse.emit(this.course.id);
    });
  }

  showQuizOptions(lesson: Lesson) {
    const quizModelRef = this.modalService.open(AddQuizComponent, {
      windowClass: 'quiz-modal'
    });
    quizModelRef.componentInstance.course = this.course;
    quizModelRef.componentInstance.lesson = lesson;
    quizModelRef.componentInstance.quizQuestionAdded.subscribe(() => {
      this.toastr.success('Quiz item successfully added!!', null, ToasterOptions);
      this.refreshCourse.emit(this.course.id);
    });
  }

  addLesson() {
    let lessonModelRef = this.modalService.open(CreateCourseLessonComponent, {
      windowClass: 'course-lesson-modal',
      size: 'lg',
      backdrop: 'static'
    });

    lessonModelRef.componentInstance.courseId = this.course.id;
    lessonModelRef.componentInstance.isComplete.subscribe((resp) => {
      if (resp.success === true) {
        this.refreshCourse.emit(this.course.id);
        this.toastr.success('Lesson successfully added', null, ToasterOptions);
      } else {
        this.toastr.success('Lesson title already exists', null, errorToasterOption);
      }
    });
  }

  editLesson(lesson: Lesson) {
    let lessonModelRef = this.modalService.open(CreateCourseLessonComponent, {
      windowClass: 'course-lesson-modal',
      size: 'lg',
      backdrop: 'static'
    });

    lessonModelRef.componentInstance.lesson = lesson;
    lessonModelRef.componentInstance.isComplete.subscribe(() => {
      this.refreshCourse.emit(this.course.id);
      this.toastr.success('Lesson successfully edited', null, ToasterOptions);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.courseDetails.lessons, event.previousIndex, event.currentIndex);
    this.orderedLessons = this.courseDetails.lessons;
    this.lessonBeingMoved = this.courseDetails.lessons[0];

    const orderModalRef = this.modalService.open(OrderLessonCompletedComponent, {
      windowClass: 'contributor-modal'
    });
    orderModalRef.componentInstance.lessonBeingMoved = this.lessonBeingMoved;
    orderModalRef.componentInstance.orderedLessons = this.orderedLessons;
  }

  confirmTagRemoval(course, tag) {
    const removeTagModalRef = this.modalService.open(ConfirmTagRemovalComponent, {
      windowClass: 'contributor-modal'
    });
    removeTagModalRef.componentInstance.tag = tag;

    removeTagModalRef.componentInstance.confirmTagRemoval.subscribe(() => {
      this.tagsService.removeTag(course, tag).then(() => {
        this.toastr.success('Tag has been removed', null, ToasterOptions);
        this.refreshCourse.emit(course.id);
      });
    });
  }

  turnCourseLevelInterfaceIntoArray() {
    let levels = [];
    this.courseLevel = this.course.courseLevel;

    for (let level in this.levelInterfaceObjects) {
      levels.push(level);
    }

    this.courseLevels = levels.filter((level) => level !== this.course.courseLevel);
  }
}

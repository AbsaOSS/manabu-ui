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
import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LessonService } from 'src/app/services/lesson-service';
import { Lesson } from 'src/app/models/Lessons';

@Component({
  selector: 'app-delete-lesson',
  templateUrl: './delete-lesson.component.html',
  styleUrls: ['../add-quiz/add-quiz.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DeleteLessonComponent implements OnInit {
  @Input() lesson: Lesson;
  @Output() deleteConfirmed: EventEmitter<null> = new EventEmitter<null>();

  constructor(public activeModal: NgbActiveModal, private lessonService: LessonService) {}

  ngOnInit() {
  }

  deleteLesson() {
    this.lessonService.deleteLesson(this.lesson).then((resp) => {
      this.deleteConfirmed.emit();
      this.activeModal.dismiss();
    })

  }

}

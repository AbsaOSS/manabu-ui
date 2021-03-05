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
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-add-tags',
  templateUrl: './add-tags.component.html',
  styleUrls: ['../add-quiz/add-quiz.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddTagsComponent implements OnInit {
  @Input() courseId: string;
  @Output() tagAdded: EventEmitter<string> = new EventEmitter<string>();
  tagName = '';
  constructor(public activeModal: NgbActiveModal, private courseService: CourseService) {}

  ngOnInit() {}

  addTag() {
    this.courseService.addTagtoCourse(this.courseId, this.tagName).then(resp => {
      this.tagAdded.emit(resp.message);
      this.tagName = '';
      this.activeModal.dismiss();
    });
  }
}

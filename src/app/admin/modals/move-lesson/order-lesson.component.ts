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
import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LessonService } from 'src/app/services/lesson-service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToasterOptions } from 'src/app/models/toasterOptions';

@Component({
  selector: 'app-order-lesson',
  templateUrl: './order-lesson.component.html',
  styleUrls: ['../../../admin/modals/add-quiz/add-quiz.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderLessonCompletedComponent implements OnInit {
  @Input() lessonBeingMoved
  @Input() orderedLessons
  constructor(
    public activeModal: NgbActiveModal,
    public lessonService :LessonService,
    private toastr: ToastrService 
    ) {}

  ngOnInit() {
      
  }
  
  orderLessons(){
    this.lessonService.orderLesson(this.lessonBeingMoved,this.orderedLessons).then(()=> {
        this.toastr.success('lessons successfully moved', null, ToasterOptions);
    });
    this.activeModal.dismiss();
  }

}
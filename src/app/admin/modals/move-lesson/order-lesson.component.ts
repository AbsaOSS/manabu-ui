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
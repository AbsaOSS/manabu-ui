import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-course-add',
  templateUrl: './confirm-course-add.component.html',
  styleUrls: ['../add-quiz/add-quiz.component.scss']
})
export class ConfirmCourseAddComponent implements OnInit {
  @Input() course;
  @Output() confirmAddCourse: EventEmitter<null> = new EventEmitter<null>();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  reAddItem() {
    this.confirmAddCourse.emit();
    this.activeModal.dismiss();
  }
}

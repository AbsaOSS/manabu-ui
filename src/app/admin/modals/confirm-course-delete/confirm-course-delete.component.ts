import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-course-delete',
  templateUrl: './confirm-course-delete.component.html',
  styleUrls: ['../add-quiz/add-quiz.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmCourseDeleteComponent implements OnInit {
  @Input() course;
  @Output() confirmDeleteCourse: EventEmitter<null> = new EventEmitter<null>();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  archiveItem() {
    this.confirmDeleteCourse.emit();
    this.activeModal.dismiss();
  }
}

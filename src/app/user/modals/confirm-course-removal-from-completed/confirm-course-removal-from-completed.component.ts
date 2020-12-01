import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-course-removal-from-completed',
  templateUrl: './confirm-course-removal-from-completed.component.html',
  styleUrls: ['../../../admin/modals/add-quiz/add-quiz.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmCourseRemovalFromCompletedComponent implements OnInit {
  @Input() course;
  @Output() confirmCourseRemoval: EventEmitter<null> = new EventEmitter<null>();
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  removeCourse() {
    this.confirmCourseRemoval.emit();
    this.activeModal.dismiss();
  }
}

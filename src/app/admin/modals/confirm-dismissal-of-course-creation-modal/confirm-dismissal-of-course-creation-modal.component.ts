import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dismissal-of-course-creation-modal',
  templateUrl: './confirm-dismissal-of-course-creation-modal.component.html',
  styleUrls: ['../add-quiz/add-quiz.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmDismissalOfCourseCreationModalComponent implements OnInit {
  @Output() confirmCourseProgressTermination: EventEmitter<null> = new EventEmitter<null>();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  confirmProgressTermination() {
    this.confirmCourseProgressTermination.emit();
    this.activeModal.dismiss();
  }
}

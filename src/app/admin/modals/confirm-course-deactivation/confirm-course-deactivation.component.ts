import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-course-deactivation',
  templateUrl: './confirm-course-deactivation.component.html',
  styleUrls: ['../add-quiz/add-quiz.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmCourseDeactivationComponent implements OnInit {
  @Input() course;
  @Output() confirmCoursedeActivation: EventEmitter<null> = new EventEmitter<null>();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  deActivateCourse() {
    this.confirmCoursedeActivation.emit();
    this.activeModal.dismiss();
  }
}

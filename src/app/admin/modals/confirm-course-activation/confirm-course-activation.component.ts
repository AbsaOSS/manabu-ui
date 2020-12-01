import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-course-activation',
  templateUrl: './confirm-course-activation.component.html',
  styleUrls: ['../add-quiz/add-quiz.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmCourseActivationComponent implements OnInit {
  @Input() course;
  @Input() refresh;

  @Output() confirmCourseActivation: EventEmitter<null> = new EventEmitter<null>();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  activateCourse() {
    this.confirmCourseActivation.emit();
    this.activeModal.dismiss(); 
  }
refreshPage(){
  this.activeModal.dismiss(); 
  this.refresh
}
}

import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rating',
  templateUrl: './rate-course.component.html',
  styleUrls: ['rate-course.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RateCourse implements OnInit {
  @Input() course;
  @Output() addRating: EventEmitter<null> = new EventEmitter<null>();
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

  AddRatingCourse() {
    this.addRating.emit();
    this.activeModal.dismiss();
  }
}
import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rating',
  templateUrl: './reviews.component.html',
  styleUrls: ['reviews.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReviewsComponent implements OnInit {
  @Input() reviews;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}

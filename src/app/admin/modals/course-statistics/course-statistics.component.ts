import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-course-statistics',
  templateUrl: './course-statistics.component.html',
  styleUrls: ['./course-statistics.component.scss']
})
export class CourseStatisticsComponent implements OnInit {

  @Input() graphDisplayValues;
  @Input() showYAxis;
  @Input() showXAxis;
  @Input() showGridLines;
  @Input() colorScheme;
  @Input() showLabels;
  @Input() gradient;
  @Input() animations;
  @Input() courseLength;
  @Input() courseItems;



  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}

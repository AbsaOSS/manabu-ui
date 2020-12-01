import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-brief-course-overview',
  templateUrl: './brief-course-overview.component.html',
  styleUrls: ['./brief-course-overview.component.scss']
})
export class BriefCourseOverviewComponent implements OnInit {
  @Input() description: string;
  @Input() courseTitle: string;
  @Input() courseImage: string;
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}

import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['../add-quiz/add-quiz.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DownloadComponent implements OnInit {
  @Input() lessonName;
  @Input() lessonSource;
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}

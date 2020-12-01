import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StatisticsService } from '../../../services/statistics.service';
import IndicatorState from 'src/app/models/LoadingStates';

@Component({
  selector: 'app-super-admin-course-statistics-view',
  templateUrl: './super-admin-course-statistics-view.component.html',
  styleUrls: ['./super-admin-course-statistics-view.component.scss']
})
export class SuperAdminCourseStatisticsViewComponent implements OnInit {
  @Input() courseId;
  users;
  IndicatorState = IndicatorState;
  loadingIndicator: IndicatorState;

  constructor(public activeModal: NgbActiveModal, private userCourseStats: StatisticsService) {}

  ngOnInit() {
    this.loadingIndicator = IndicatorState.LOADING;
    this.userCourseStats.getUserCourseStats(this.courseId).then((resp) => {
      this.users = resp;
      this.loadingIndicator = IndicatorState.LOADED;
    });
  }
}

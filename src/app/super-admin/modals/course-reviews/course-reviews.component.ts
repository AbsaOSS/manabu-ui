import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseService } from 'src/app/services/course.service';
import IndicatorState from 'src/app/models/LoadingStates';

@Component({
  selector: 'app-course-reviews',
  templateUrl: './course-reviews.component.html',
  styleUrls: ['./course-reviews.component.scss']
})
export class CourseReviewsComponent implements OnInit {
  @Input() courseId;
  courseReviews;
  IndicatorState = IndicatorState;
  loadingIndicator: IndicatorState;

  constructor(public activeModal: NgbActiveModal, private courseService: CourseService) {}

  ngOnInit() {
    this.getCourseReviews(this.courseId);
  }

  getCourseReviews(courseId) {
    this.loadingIndicator = IndicatorState.LOADING;
    this.courseService.getAllReviews(courseId).then((response) => {
      this.courseReviews = response.getAllReviewsAssociatedWithCourse;
      this.loadingIndicator = IndicatorState.LOADED;
    });
  }
}

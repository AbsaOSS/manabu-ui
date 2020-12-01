import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-add-tags',
  templateUrl: './add-tags.component.html',
  styleUrls: ['../add-quiz/add-quiz.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddTagsComponent implements OnInit {
  @Input() courseId: string;
  @Output() tagAdded: EventEmitter<string> = new EventEmitter<string>();
  tagName = '';
  constructor(public activeModal: NgbActiveModal, private courseService: CourseService) {}

  ngOnInit() {}

  addTag() {
    this.courseService.addTagtoCourse(this.courseId, this.tagName).then(resp => {
      this.tagAdded.emit(resp.message);
      this.tagName = '';
      this.activeModal.dismiss();
    });
  }
}

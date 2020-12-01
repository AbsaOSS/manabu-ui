import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LessonService } from 'src/app/services/lesson-service';
import { Lesson } from 'src/app/models/Lessons';

@Component({
  selector: 'app-delete-lesson',
  templateUrl: './delete-lesson.component.html',
  styleUrls: ['../add-quiz/add-quiz.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DeleteLessonComponent implements OnInit {
  @Input() lesson: Lesson;
  @Output() deleteConfirmed: EventEmitter<null> = new EventEmitter<null>();

  constructor(public activeModal: NgbActiveModal, private lessonService: LessonService) {}

  ngOnInit() {
  }

  deleteLesson() {
    this.lessonService.deleteLesson(this.lesson).then((resp) => {
      this.deleteConfirmed.emit();
      this.activeModal.dismiss();
    })

  }

}

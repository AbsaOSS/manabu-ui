/*
 * Copyright 2020 ABSA Group Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from 'src/app/models/Course';
import { Quiz, MultipleChoiceQuiz, TrueOrFalseQuiz } from 'src/app/models/Quiz';
import { ToasterOptions } from 'src/app/models/toasterOptions';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/services/course.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RateCourse } from '../modals/rate-course/rate-course.component';
import { QuizItem } from 'src/app/models/QuizItem';
import { CourseHelperService } from 'src/app/services/course-helper.service';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss']
})
export class QuizDetailsComponent implements OnInit {
  @Input() quiz;
  @Input() course: Course;
  @Input() courseIsComplete: boolean;
  @Input() quizItem: QuizItem;
  @Input() quizNumber;
  @Input() lessonNumber;
  @Input() hideNext;
  @Output() nextClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() previousClicked: EventEmitter<number> = new EventEmitter<number>();
  multipleChoiceSelectedAnswer: boolean;
  answerGiven: boolean;
  options = [];
  trueOrFalseOptions = [
    {
      text: 'True',
      value: true
    },
    {
      text: 'False',
      value: false
    }
  ];

  constructor(
    private courseHelperService: CourseHelperService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.checkQuizType(this.quiz);
    this.courseHelperService.loadQuiz$.subscribe((quiz) => {
      this.quiz = quiz;
      this.checkQuizType(quiz);
      this.answerGiven = null;
    });
  }

  checkQuizType(quiz) {
    if (quiz.questionType === 'MultipleChoice') {
      this.options = [
        {
          text: quiz.option1,
          value: quiz.option1
        },
        {
          text: quiz.option2,
          value: quiz.option2
        },
        {
          text: quiz.option3,
          value: quiz.option3
        },
        {
          text: quiz.option4,
          value: quiz.option4
        }
      ];
    } else {
      this.options = this.trueOrFalseOptions;
    }
  }

  loadNextItem() {
    this.nextClicked.emit(this.quizItem);
  }

  loadPreviousItem() {
    this.previousClicked.emit(this.quizNumber - 1);
  }

  selectTrueFalse(option, answer) {
    if (option === answer) {
      alert(answer);
    }
  }

  completeCourse() {
    this.courseService
      .courseCompletion(this.course)
      .then((resp) => {
        this.rateCourse(this.course);
      })
      .catch((e) => {});
  }

  rateCourse(course) {
    const addRatingModalref = this.modalService.open(RateCourse, {
      windowClass: 'contributor-modal'
    });
    addRatingModalref.componentInstance.course = course;
  }

  checked(value) {
    this.multipleChoiceSelectedAnswer = value;
  }

  checkRadioAnswer() {
    if (this.multipleChoiceSelectedAnswer.toString() === this.quiz.answer) {
      this.answerGiven = true;
      this.multipleChoiceSelectedAnswer = undefined;
    } else {
      this.answerGiven = false;
    }
  }
}

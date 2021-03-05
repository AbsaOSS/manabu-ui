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
import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuizOptions } from 'src/app/models/QuizOptions';
import { Quizservice } from 'src/app/services/quiz-service';
import { Lesson } from 'src/app/models/Lessons';

export enum QuizSteps {
  Step1 = 1,
  Step2Bool = 2,
  Step2Multi = 3,
}

export enum QuizTypes {
  bool = 1,
  multi = 2,
}

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddQuizComponent implements OnInit {
  @Input() course;
  @Input() lesson: Lesson;
  @Output() quizQuestionAdded: EventEmitter<null> = new EventEmitter<null>();
  quizSteps = QuizSteps;
  quizReady = false;
  boolQuestion = '';
  multiQuestion = '';

  selectedQuiz: QuizOptions = {
    step: QuizSteps.Step1,
    type: '',
    boolStep: {
      question: '',
      selection: '',
    },
    multiStep: {
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      selection: '',
    },
  };

  constructor(public activeModal: NgbActiveModal, private quizService: Quizservice) {}

  ngOnInit() {
    this.quizReady = true;
  }

  gotoStep1() {
    this.selectedQuiz.step = QuizSteps.Step1;
    this.selectedQuiz.type = '';
  }

  gotoStep2() {
    if (this.selectedQuiz.type === QuizTypes.bool.toString()) {
      this.selectedQuiz.step = QuizSteps.Step2Bool;
    } else {
      this.selectedQuiz.step = QuizSteps.Step2Multi;
    }
  }

  selectQuizType(value) {
    this.selectedQuiz.type = value;
  }

  selectedBoolOption(value) {
    this.selectedQuiz.boolStep.selection = value;
  }

  saveTrueOrFalseQuestion() {
    this.quizService.saveTrueOrFalseQuestion(this.course.id, this.lesson.id, this.selectedQuiz).then((resp) => {
      this.quizQuestionAdded.emit();
      this.activeModal.dismiss();
    });
  }

  saveMultipleChoiceQuestion() {
    this.quizService.saveMultipleChoiceQuestion(this.course.id, this.lesson.id, this.selectedQuiz).then((resp) => {
      this.quizQuestionAdded.emit();
      this.activeModal.dismiss();
    });
  }
}

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
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from 'src/app/app.config';
import { QuizOptions } from '../models/QuizOptions';

@Injectable()
export class Quizservice {
  protected apiServer = AppConfig.settings.apiServer;

  constructor(private http: HttpClient) {}

    saveTrueOrFalseQuestion(courseId: string, lessonId: string, quiz: QuizOptions) {
      let url = this.apiServer.root + 'quizes/courses/' + courseId + '/lessons/' + lessonId + '/' + this.apiServer.quiz.postTrueOrFalse;
    let data = {
        question: quiz.boolStep.question,
        answer: quiz.boolStep.selection,
        courseId: courseId,
        lessonId: lessonId,
    };
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.post<any>(url, data, options).toPromise<any>();
  }

  saveMultipleChoiceQuestion(courseId: string, lessonId: string, quiz: QuizOptions) {
    let url = this.apiServer.root + 'quizes/' + courseId + '/lessons/' + lessonId + '/' + this.apiServer.quiz.postMultipleChoice;
    let data = {
        question: quiz.multiStep.question,
        option1: quiz.multiStep.option1,
        option2: quiz.multiStep.option2,
        option3: quiz.multiStep.option3,
        option4: quiz.multiStep.option4,
        answer: quiz.multiStep.selection,
        courseId: courseId,
        lessonId: lessonId,
    };
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.post<any>(url, data, options).toPromise<any>();
  }
}

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
import { Title } from '@angular/platform-browser';
import { Course } from '../models/Course';
import { Observable, Subject } from 'rxjs';
import { Lesson } from '../models/Lessons';
import { Quiz } from '../models/Quiz';

@Injectable()
export class CourseHelperService {
  loadLesson$: Observable<Lesson>;
  loadQuiz$: Observable<Quiz>;

  private loadLesson = new Subject<any>();
  private loadedQuiz = new Subject<any>();

  constructor() {
    this.loadLesson$ = this.loadLesson.asObservable();
    this.loadQuiz$ = this.loadedQuiz.asObservable();
  }

  onLessonLoaded(data) {
    this.loadLesson.next(data);
  }

  onQuizLoaded(data) {
    this.loadedQuiz.next(data);
  }
}

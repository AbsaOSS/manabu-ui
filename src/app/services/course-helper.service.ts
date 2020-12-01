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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from 'src/app/app.config';
import { Lesson } from '../models/Lessons';

@Injectable()
export class LessonService {
  protected apiServer = AppConfig.settings.apiServer;

  constructor(private http: HttpClient) {}

  addLesson(lesson: Lesson) {
    let url = this.apiServer.lesson.addLesson;
    let data = {
      title: lesson.title,
      type: lesson.type,
      course: lesson.course,
      markdown: lesson.markdown,
      duration: lesson.durationInSeconds
    };

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.post<any>(url, data, options).toPromise<any>();
  }

  editLesson(lesson: Lesson) {
    let url =
      this.apiServer.root + 'admin/' + lesson.course + '/lessons/' + lesson.id + '/' + this.apiServer.lesson.editLesson;
    let data = {
      title: lesson.title,
      type: lesson.type,
      markdown: lesson.markdown,
      duration: lesson.durationInSeconds
    };
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.post<any>(url, data, options).toPromise<any>();
  }

  deleteLesson(lesson: Lesson) {
    let url = this.apiServer.lesson.deleteLesson + lesson.course + '/lessons/' + lesson.id;

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.delete<any>(url, options).toPromise<any>();
  }

  uploadFile(lesson: Lesson, fileExtension: string) {
    let url = this.apiServer.lesson.fileUploadPath;
    let data = {
      lessonId: lesson.id,
      course: lesson.course,
      fileExtension: fileExtension
    };

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.post<any>(url, data, options).toPromise<any>();
  }

  orderLesson(lessonMoved:any,orderLesson:any) {
    let url = this.apiServer.lesson.orderLesson;
    let data = {
      lessonBeingMoved: lessonMoved,
      orderedLessons: orderLesson
    };
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.put<any>(url, data, options).toPromise<any>();
  }

  recordProgress(courseId: string, lessonId: string, progress) {
    let url = this.apiServer.lesson.recordLessonProgress + courseId + '/lessons/' + lessonId + '/record-progress';

    let data = {
      progress
    };
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.post<any>(url, data, options).toPromise<any>();
  }

  markLessonCompleted(lessonId: string, courseId: string) {
    let url = this.apiServer.lesson.markLessonCompleted + lessonId + '/' + courseId;

    let data = {};
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.put<any>(url, data, options).toPromise<any>();
  }

  getCourseLessons(courseId: string) {
    let url = this.apiServer.lesson.getCourseLessons + courseId;

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.get(url, options).toPromise<any>();
  }

  initiateCourse(courseId: string) {
    let url = this.apiServer.lesson.initiateCourse + courseId;

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.get(url, options).toPromise<any>();
  }

  loadNextLesson(courseId: string, lessonId: string) {
    let url = this.apiServer.lesson.loadNextLesson + courseId + '/' + lessonId;

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.get(url, options).toPromise<any>();
  }

  loadPreviousLesson(courseId: string, lessonId: string) {
    let url = this.apiServer.lesson.loadPreviousLesson + courseId + '/' + lessonId;

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.get(url, options).toPromise<any>();
  }

  getLesson(courseId: string, lessonId: string) {
    let url = this.apiServer.lesson.getLesson + courseId + '/' + lessonId;

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.get(url, options).toPromise<any>();
  }

  getLessonMarkdown(lessonId: string) {
    let url = this.apiServer.lesson.getLessonMarkdown + lessonId;

    const options: any = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.get(url, options).toPromise<any>();
  }
}

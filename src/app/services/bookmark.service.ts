import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from 'src/app/app.config';

@Injectable()
export class BookMarkService {
  protected apiServer = AppConfig.settings.apiServer;

  constructor(private http: HttpClient) {}

  bookMarkLesson(duration, courseId: string, lessonId: string) {
    let url = this.apiServer.bookmark.bookmarkLesson;
    let data = {
      duration,
      courseId,
      lessonId
    };
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.post<any>(url, data, options).toPromise<any>();
  }

  getBookMarksforLesson(lessonId:string) {
    let url = this.apiServer.bookmark.getLessonBookmarks + lessonId;
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.get<any>(url, options).toPromise<any>();
  }
}

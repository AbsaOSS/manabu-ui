import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from 'src/app/app.config';

@Injectable()
export class ContributorService {
  protected apiServer = AppConfig.settings.apiServer;

  constructor(private http: HttpClient) {}

  deleteContributor(authorId, courseId, lessonId) {
    let url = this.apiServer.contributor.deleteContributor + authorId + '/' + courseId + '/' + lessonId;
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {},
    };
    return this.http.delete<any>(url, options).toPromise<any>();
  }

  addContributor(courseId, lessonId, emailAddress) {
    let url = this.apiServer.contributor.addContributor + courseId + '/' + lessonId;
    let data = {
      email: emailAddress,
    };
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {},
    };
    return this.http.post<any>(url, data, options).toPromise<any>();
  }
}

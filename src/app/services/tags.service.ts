import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from 'src/app/app.config';

@Injectable()
export class TagsService {
  protected apiServer = AppConfig.settings.apiServer;

  constructor(private http: HttpClient) {}

  removeTag(course, tag) {
    let url = this.apiServer.tags.removeTag + tag.id + '/' + course.id;

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };

    return this.http.delete<any>(url, options).toPromise<any>();
  }
}

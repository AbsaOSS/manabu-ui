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

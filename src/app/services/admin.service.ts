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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppConfig } from 'src/app/app.config';

@Injectable()
export class AdminService {
  protected apiServer = AppConfig.settings.apiServer;
  accessUserView$: Observable<boolean>;
  private accessUserView = new Subject<any>();

  constructor(private http: HttpClient) {
    this.accessUserView$ = this.accessUserView.asObservable();
  }

  setAdminHeader(adminHeader: boolean) {
    this.accessUserView.next(adminHeader);
  }

  setAdminKeyView() {
    localStorage.setItem('adminView', 'true');
  }

  adminViewKey() {
    return localStorage.getItem('adminView');
  }

  async switchAdminViewKeys() {
    let currentView = localStorage.getItem('adminView');
    currentView === 'true' ? localStorage.setItem('adminView', 'false') : localStorage.setItem('adminView', 'true');
  }

  adminProfile() {
    let url = this.apiServer.admin.getAdminProfile;
    const options: any = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };

    return this.http.get(url, options).toPromise<any>();
  }

  sidePanelData() {
    let url = this.apiServer.admin.getAdminSidePanelContent;
    const options: any = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };

    return this.http.get(url, options).toPromise<any>();
  }

  adminPersonalInfo() {
    let url = this.apiServer.admin.adminPersonalInfo;
    const options: any = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };

    return this.http.get(url, options).toPromise<any>();
  }

  getAllUsers(courseId: string) {
    let url = this.apiServer.admin.getAllUsers + courseId;
    const options: any = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };

    return this.http.get(url, options).toPromise<any>();
  }
}

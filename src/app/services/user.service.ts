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
export class UserService {
  protected apiServer = AppConfig.settings.apiServer;

  constructor(private http: HttpClient) {}

  getUserInfo() {
    let url = this.apiServer.user.getUserInfo;
    const options: any = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };

    return this.http.get(url, options).toPromise<any>();
  }

  getUserPersonalInfo() {
    let url = this.apiServer.user.userPersonalInfo;
    const options: any = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };

    return this.http.get(url, options).toPromise<any>();
  }

  updateUserPersonalInformation(updatedUserInfo) {
    let url = this.apiServer.user.updateUserPersonalInfo + updatedUserInfo.id;

    let data = updatedUserInfo;

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };

    return this.http.put<any>(url, data, options).toPromise<any>();
  }

  adminPermissionRequest() {
    let url = this.apiServer.user.requestAdminPrivillege;
    let data = {};

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.post<any>(url, data, options).toPromise<any>();
  }
}

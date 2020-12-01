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

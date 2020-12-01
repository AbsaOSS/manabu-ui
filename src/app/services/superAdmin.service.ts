import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/app.config';

@Injectable()
export class SuperAdminService {
  protected apiServer = AppConfig.settings.apiServer;

  constructor(private http: HttpClient) {}

  getSuperAdminViewData() {
    let url = this.apiServer.superAdmin.getSuperAdminViewData;
    const options: any = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };

    return this.http.get(url, options).toPromise<any>();
  }

  userAdminPermissionApproval(requestId: string) {
    let url = this.apiServer.superAdmin.userAdminRequestPermissionApproval + requestId;
    let data = {};

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.post<any>(url, data, options).toPromise<any>();
  }

  approveAuthorContributionRequest(requestId: string, userId: string, courseId: string) {
    let url = this.apiServer.superAdmin.approveAuthorContributionRequest + requestId + '/' + userId + '/' + courseId;
    let data = {};

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.post<any>(url, data, options).toPromise<any>();
  }
}

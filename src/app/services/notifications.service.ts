import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppConfig } from 'src/app/app.config';

@Injectable()
export class NotificationService {
  protected apiServer = AppConfig.settings.apiServer;
  constructor(private http: HttpClient) {}

  getContributionRequests(): Promise<any> {
    let url = this.apiServer.notifications.getContributionRequsts;
    const options: any = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };

    return this.http.get(url, options).toPromise<any>();
  }

  markContributionRequestsAsRead() {
    let url = this.apiServer.notifications.markContributionRequestAsRead;

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.put<any>(url, options).toPromise<any>();
  }

  contributionRequestStatus(): Promise<any> {
    let url = this.apiServer.notifications.contributionRequestStatus;
    const options: any = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };

    return this.http.get(url, options).toPromise<any>();
  }

  getNotifications(): Promise<any> {
    let url = this.apiServer.notifications.notifications;
    const options: any = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };

    return this.http.get(url, options).toPromise<any>();
  }
}

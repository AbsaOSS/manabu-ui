import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/app.config';

@Injectable()
export class ContributionRequestService {
  protected apiServer = AppConfig.settings.apiServer;

  constructor(private http: HttpClient) {}

  addContributor(contributorsList, contributorsMetaList) {
    let url = this.apiServer.courseContributionRequests.addContributor;
    let data = {
      contributors: contributorsList,
      contributorsMetaData: contributorsMetaList
    };

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.post<any>(url, data, options).toPromise<any>();
  }

  acceptContributionRequest(contributionRequestId: string) {
    let url = this.apiServer.courseContributionRequests.acceptContributionRequest + contributionRequestId;
    let data = {};

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.post<any>(url, data, options).toPromise<any>();
  }

  rejectContributionRequest(contributionRequestId: string) {
    let url = this.apiServer.courseContributionRequests.rejectContributionRequest + contributionRequestId;
    let data = {};

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.post<any>(url, data, options).toPromise<any>();
  }

  deleteContributionRequestStatus(contributionRequestId: string) {
    let url = this.apiServer.courseContributionRequests.deleteContributionRequestStatus + contributionRequestId;
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.delete<any>(url, options).toPromise<any>();
  }
}
